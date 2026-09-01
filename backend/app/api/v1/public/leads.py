from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from starlette.datastructures import UploadFile

from app.api.deps import get_db
from app.core.config import settings
from app.core.limiter import limiter
from app.schemas.lead import LeadCreateResponse
from app.services.lead_service import LeadService

router = APIRouter(tags=["leads"])


def _client_meta(request: Request) -> tuple[str | None, str | None]:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        ip = forwarded.split(",")[0].strip()
    elif request.client:
        ip = request.client.host
    else:
        ip = None
    user_agent = request.headers.get("user-agent")
    return ip, user_agent


async def _parse_body(request: Request) -> tuple[dict, list[UploadFile]]:
    content_type = request.headers.get("content-type", "")

    if "multipart/form-data" in content_type:
        form = await request.form()
        raw: dict = {}
        files: list[UploadFile] = []

        for key, value in form.multi_items():
            if isinstance(value, UploadFile):
                if value.filename:
                    files.append(value)
            else:
                raw[key] = value

        return raw, files

    if "application/json" in content_type or not content_type:
        try:
            data = await request.json()
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid JSON body.",
            ) from exc
        if not isinstance(data, dict):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="JSON body must be an object.",
            )
        return data, []

    raise HTTPException(
        status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
        detail="Supported content types: application/json, multipart/form-data.",
    )


@router.post(
    "/leads",
    response_model=LeadCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact, consultation, or proposal lead",
)
@limiter.limit(settings.LEADS_RATE_LIMIT)
async def create_lead(
    request: Request,
    db: Session = Depends(get_db),
) -> LeadCreateResponse:
    raw, files = await _parse_body(request)
    ip, user_agent = _client_meta(request)
    service = LeadService(db)
    return service.submit(raw, files or None, ip_address=ip, user_agent=user_agent)
