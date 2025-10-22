from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import auth,courses,announcement,overview,students,assignments,certificates
# fetchUsers,add_post,delete_cookie,analytics_fetch,edit_user,likes_logic,checkAdmin # your routers

app = FastAPI()

# Allow your frontend origin
origins = [
    "https://socialhub.pxxl.xyz",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8081",
    # "https://socialhub-backend-se80.onrender.com",
    "https://social-hub-frontend-kappa.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# Routers
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(announcement.router)
app.include_router(overview.router)
app.include_router(students.router)
app.include_router(assignments.router)
app.include_router(certificates.router)
# app.include_router(checkAdmin.router)
