from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID


from database import get_db


from schemas.module_schema import (
    ModuleCreate,
    ModuleUpdate,
    ModuleResponse,
)


from services.module_service import (
    create_module,
    get_modules_by_course,
    get_module_by_id,
    update_module,
    delete_module,
)



router = APIRouter()



@router.post(
    "/courses/{course_id}/modules",
    response_model=ModuleResponse
)
def create_new_module(
    course_id: UUID,
    module: ModuleCreate,
    db: Session = Depends(get_db),
):

    return create_module(
        db,
        course_id,
        module
    )




@router.get(
    "/courses/{course_id}/modules",
    response_model=list[ModuleResponse]
)
def get_course_modules(
    course_id: UUID,
    db: Session = Depends(get_db),
):

    return get_modules_by_course(
        db,
        course_id
    )




@router.put(
    "/modules/{module_id}",
    response_model=ModuleResponse
)
def update_existing_module(
    module_id: UUID,
    module_data: ModuleUpdate,
    db: Session = Depends(get_db),
):

    module = get_module_by_id(
        db,
        module_id
    )


    if not module:
        raise HTTPException(
            status_code=404,
            detail="Module not found"
        )


    return update_module(
        db,
        module,
        module_data
    )




@router.delete(
    "/modules/{module_id}"
)
def delete_existing_module(
    module_id: UUID,
    db: Session = Depends(get_db),
):

    module = get_module_by_id(
        db,
        module_id
    )


    if not module:
        raise HTTPException(
            status_code=404,
            detail="Module not found"
        )


    delete_module(
        db,
        module
    )


    return {
        "message":"Module deleted successfully"
    }