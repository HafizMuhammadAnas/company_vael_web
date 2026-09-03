from fastapi import APIRouter

from app.api.v1.admin import admin_router
from app.api.v1.auth import router as auth_router
from app.api.v1.public import health, leads

api_router = APIRouter()

api_router.include_router(health.router, prefix="/public")
api_router.include_router(leads.router, prefix="/public")
api_router.include_router(auth_router, prefix="/auth")
api_router.include_router(admin_router, prefix="/admin")
