from fastapi import APIRouter, Depends

from models.user_model import User
from utils.auth import get_current_user

router = APIRouter()


@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "message": "Profile fetched successfully",
        "data": {
            "id": str(current_user.id),
            "full_name": current_user.full_name,
            "email": current_user.email,
            "role": current_user.role,
        },
    }