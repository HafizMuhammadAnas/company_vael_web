from fastapi import APIRouter

from app.api.v1.admin import leads

admin_router = APIRouter()
admin_router.include_router(leads.router)
