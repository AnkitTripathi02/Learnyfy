from sqlalchemy.orm import Session
from sqlalchemy import or_

from models.course_model import Course
from schemas.course_schema import (
    CourseCreate,
    CourseUpdate,
)

def create_course(
    db: Session,
    course: CourseCreate,
):
    new_course = Course(**course.model_dump())

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course

def get_all_courses(
    db: Session,
    search=None,
    category=None,
    level=None,
    language=None,
    price=None,
    duration=None,
):

    query = db.query(Course)

    if search:
        query = query.filter(
            or_(
                Course.title.ilike(f"%{search}%"),
                Course.description.ilike(f"%{search}%"),
            )
        )

    if category:
        query = query.filter(
            Course.category == category
        )

    if level:
        query = query.filter(
            Course.level == level
        )

    if language:
        query = query.filter(
            Course.language == language
        )

    if duration:
        query = query.filter(
            Course.duration == duration
        )

    if price:

        if price == "Free":
            query = query.filter(
                Course.price == 0
            )

        elif price == "Paid":
            query = query.filter(
                Course.price > 0
            )

    return query.all()

def get_course_by_id(
    db: Session,
    course_id,
):
    return (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )

def delete_course(
    db: Session,
    course: Course,
):
    db.delete(course)
    db.commit()

def update_course(
    db: Session,
    course: Course,
    course_data: CourseUpdate,
):

    for key, value in course_data.model_dump(
        exclude_unset=True
    ).items():

        setattr(course, key, value)

    db.commit()
    db.refresh(course)

    return course