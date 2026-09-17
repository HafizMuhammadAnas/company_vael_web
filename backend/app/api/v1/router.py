from fastapi import APIRouter

from app.api.v1.admin import admin_router
from app.api.v1.auth import router as auth_router
from app.api.v1.public import clients as public_clients
from app.api.v1.public import faqs as public_faqs
from app.api.v1.public import google_reviews as public_reviews
from app.api.v1.public import health, insights as public_insights, leads
from app.api.v1.public import projects as public_projects

api_router = APIRouter()

api_router.include_router(health.router, prefix="/public")
api_router.include_router(leads.router, prefix="/public")
api_router.include_router(public_projects.router, prefix="/public")
api_router.include_router(public_clients.router, prefix="/public")
api_router.include_router(public_insights.router, prefix="/public")
api_router.include_router(public_reviews.router, prefix="/public")
api_router.include_router(public_faqs.router, prefix="/public")
api_router.include_router(auth_router, prefix="/auth")
api_router.include_router(admin_router, prefix="/admin")
