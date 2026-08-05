from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from schemas.auth_schema import UserSignup, UserLogin
from services.auth_service import signup_user, login_user
from utils.response import success_response

router = APIRouter()

@router.post("/signup")
def signup(
    user: UserSignup,
    db: Session = Depends(get_db),
):
    new_user = signup_user(db, user)

    return success_response(
        message="User registered successfully.",
        status_code=status.HTTP_201_CREATED,
        data={
            "id": str(new_user.id),
            "full_name": new_user.full_name,
            "email": new_user.email,
            "role": new_user.role,
        },
    )


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    result = login_user(
        db,
        user.email,
        user.password,
    )

    return success_response(
        message="Login successful.",
        data=result,
    )