from sqlalchemy.orm import Session

from models.module_model import Module
from schemas.module_schema import (
    ModuleCreate,
    ModuleUpdate,
)



def create_module(
    db: Session,
    course_id,
    module: ModuleCreate,
):

    new_module = Module(
        course_id=course_id,
        **module.model_dump()
    )


    db.add(new_module)

    db.commit()

    db.refresh(new_module)


    return new_module





def get_modules_by_course(
    db: Session,
    course_id,
):

    return (
        db.query(Module)
        .filter(Module.course_id == course_id)
        .order_by(Module.order)
        .all()
    )





def get_module_by_id(
    db: Session,
    module_id,
):

    return (
        db.query(Module)
        .filter(Module.id == module_id)
        .first()
    )





def update_module(
    db: Session,
    module: Module,
    module_data: ModuleUpdate,
):

    for key,value in module_data.model_dump(
        exclude_unset=True
    ).items():

        setattr(module,key,value)


    db.commit()

    db.refresh(module)

    return module





def delete_module(
    db: Session,
    module: Module,
):

    db.delete(module)

    db.commit()