from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User
from utils.auth import get_current_user

from services.dashboard_service import get_dashboard_stats

router = APIRouter()


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    stats = get_dashboard_stats(
        db=db,
        current_user=current_user,
    )

    return {
        "message": "Dashboard loaded successfully",
        "data": stats,
    }