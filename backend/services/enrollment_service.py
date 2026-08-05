from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.course_model import Course
from models.enrollment_model import Enrollment

from models.enrollment_model import Enrollment
from models.course_model import Course


def enroll_course(
    db: Session,
    course_id,
    user_id,
):
    course = (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    existing = (
        db.query(Enrollment)
        .filter(
            Enrollment.course_id == course_id,
            Enrollment.user_id == user_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already enrolled",
        )

    enrollment = Enrollment(
        course_id=course_id,
        user_id=user_id,
    )

    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)

    return enrollment


def get_my_courses(
    db,
    user_id
):

    records = (
        db.query(
            Enrollment,
            Course
        )
        .join(
            Course,
            Enrollment.course_id == Course.id
        )
        .filter(
            Enrollment.user_id == user_id
        )
        .all()
    )


    result = []


    for enrollment, course in records:

        result.append({

            "id": enrollment.id,
            "course_id": course.id,
            "title": course.title,
            "description": course.description,
            "thumbnail": course.thumbnail,
            "progress": 0,
            "is_completed": False,
            "enrolled_at": enrollment.created_at

        })


    return result

def delete_enrollment(
    db: Session,
    enrollment,
):
    db.delete(enrollment)
    db.commit()


def get_enrollment_by_id(
    db: Session,
    enrollment_id: int
):
    return (
        db.query(Enrollment)
        .filter(Enrollment.id == enrollment_id)
        .first()
    )