from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from services.analytics_service import (
    get_analytics_stats
)

from schemas.analytics_schema import (
    AnalyticsResponse
)


router = APIRouter()


@router.get(
    "/analytics",
    response_model=AnalyticsResponse
)
def analytics(
    db: Session = Depends(get_db)
):

    return get_analytics_stats(db)