from fastapi import APIRouter

from app.api.v1.public import health

api_router = APIRouter()

# Public routes (no auth required)
api_router.include_router(health.router, prefix="/public")

# Auth and admin routers are wired in later phases:
# api_router.include_router(auth.router, prefix="/auth")
# api_router.include_router(admin_router, prefix="/admin")
