from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from services.admin_dashboard_service import get_dashboard_stats
from schemas.admin_dashboard_schema import DashboardResponse


router = APIRouter()


@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def dashboard(
    db: Session = Depends(get_db)
):
    return get_dashboard_stats(db)