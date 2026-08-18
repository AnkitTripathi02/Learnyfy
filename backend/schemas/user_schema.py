from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserProfileUpdate(BaseModel):
    full_name: str = Field(
        ...,
        min_length=3,
        max_length=100
    )

    email: EmailStr

    profile_image: Optional[str] = None