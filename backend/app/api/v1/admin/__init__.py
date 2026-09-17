from fastapi import APIRouter

from app.api.v1.admin import clients, faqs, google_reviews, insights, leads, projects

admin_router = APIRouter()
admin_router.include_router(leads.router)
admin_router.include_router(projects.router)
admin_router.include_router(clients.router)
admin_router.include_router(insights.router)
admin_router.include_router(google_reviews.router)
admin_router.include_router(faqs.router)
