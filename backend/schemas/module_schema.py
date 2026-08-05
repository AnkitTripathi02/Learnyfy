from pydantic import BaseModel, ConfigDict
from uuid import UUID
from typing import Optional
from datetime import datetime



class ModuleCreate(BaseModel):

    title: str
    description: Optional[str] = None
    order: int = 0



class ModuleUpdate(BaseModel):

    title: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None



class ModuleResponse(BaseModel):

    id: UUID
    course_id: UUID
    title: str
    description: Optional[str]
    order: int
    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )