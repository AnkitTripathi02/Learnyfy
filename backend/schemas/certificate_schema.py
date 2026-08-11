from pydantic import BaseModel

class CertificateResponse(BaseModel):
    student_name: str
    course_name: str
    instructor_name: str
    completion_date: str
    certificate_id: str