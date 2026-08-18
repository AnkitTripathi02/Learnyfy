from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

# Models
from models.user_model import User
from models.course_model import Course
from models.module_model import Module
from models.lesson_model import Lesson
from models.enrollment_model import Enrollment
from models.lesson_progress_model import LessonProgress
from models.payment_model import Payment
from routes.user_route import router as user_router

# Routes
from routes.auth_route import router as auth_router
from routes.profile_route import router as profile_router
from routes.dashboard_route import router as dashboard_router
from routes.course_route import router as course_router
from routes.module_route import router as module_router
from routes.lesson_route import router as lesson_router
from routes.enrollment_route import router as enrollment_router
from routes.lesson_progress_route import router as progress_router
from routes.admin_dashboard_route import router as admin_dashboard_router
from routes.certificate_route import router as certificate_router
from routes.payment_route import router as payment_router
from routes.analytics_route import router as analytics_router

from middlewares.logging import log_requests
from utils.exceptions import AppException


app = FastAPI(
    title="LearnyFy API",
    version="1.0.0",
)

#cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middlewares
app.middleware("http")(log_requests)


# Global Exception Handler
@app.exception_handler(AppException)
async def app_exception_handler(
    request: Request,
    exc: AppException,
):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.message,
            "data": None,
        },
    )


# Create Database Tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to LearnyFy Backend 🚀"
    }


# Register Routes
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"],
)

app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"],
)

app.include_router(
    dashboard_router,
    prefix="/api/dashboard",
    tags=["Dashboard"],
)

app.include_router(
    course_router,
    prefix="/api/courses",
    tags=["Courses"],
)

app.include_router(
    module_router,
    prefix="/api",
    tags=["Modules"],
)

app.include_router(
    lesson_router,
    prefix="/api",
    tags=["Lessons"],
)

app.include_router(
    enrollment_router,
    prefix="/api",
    tags=["Enrollment"],
)

app.include_router(
    progress_router,
    prefix="/api",
    tags=["Progress"],
)

app.include_router(
    admin_dashboard_router,
    prefix="/api/admin",
    tags=["Admin Dashboard"],
)

app.include_router(
    certificate_router,
    prefix="/api",
    tags=["Certificate"],
)

app.include_router(
    payment_router,
    prefix="/api",
    tags=["Payments"],
)

app.include_router(
    user_router,
    prefix="/api"
)


app.include_router(
    analytics_router,
    prefix="/api/admin",
    tags=["Admin Analytics"]
)