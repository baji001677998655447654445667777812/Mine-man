"""FastAPI backend for M. Baji's personal portfolio website."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field

from backend.portfolio_service import (
    get_portfolio,
    get_projects,
    list_contacts,
    save_contact_submission,
)

BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=160)
    message: str = Field(..., min_length=10, max_length=3000)


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    receivedAt: str


app = FastAPI(
    title="M. Baji Portfolio API",
    description="FastAPI backend serving resume credentials, projects, and contact inquiries for M. Baji.",
    version="1.0.0",
)

allowed_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "M. Baji Portfolio FastAPI",
        "framework": "FastAPI",
    }


@app.get("/api/portfolio")
def read_portfolio() -> dict:
    return get_portfolio()


@app.get("/api/projects")
def read_projects(category: Optional[str] = Query(default=None)) -> dict:
    return {"projects": get_projects(category)}


@app.post("/api/contact", response_model=ContactResponse, status_code=201)
def create_contact(payload: ContactRequest) -> dict:
    ok, result = save_contact_submission(payload.model_dump())
    if not ok:
        raise HTTPException(status_code=422, detail=result)
    return result


@app.get("/api/contact/messages")
def read_contact_messages() -> dict:
    return {"messages": list_contacts()}


if DIST_DIR.exists():
    assets_dir = DIST_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str) -> FileResponse:
        candidate = DIST_DIR / full_path
        if full_path and candidate.exists() and candidate.is_file():
            return FileResponse(str(candidate))
        return FileResponse(str(DIST_DIR / "index.html"))
