from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes.home import router as home_router
from src.routes.users import router as users_router
from src.routes.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home_router, tags=["Home"])
app.include_router(users_router, prefix="/users", tags=["User"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
