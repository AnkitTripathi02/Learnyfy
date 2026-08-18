from pydantic import BaseModel, EmailStr, Field


class ProfileUpdate(BaseModel):
    full_name: str = Field(
        ...,
        min_length=3,
        max_length=100
    )

    email: EmailStr


class PasswordUpdate(BaseModel):
    current_password: str = Field(
        ...,
        min_length=1
    )

    new_password: str = Field(
        ...,
        min_length=1,
        max_length=20
    )