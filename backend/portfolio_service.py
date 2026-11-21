"""Pure Python portfolio service powering both FastAPI and the local CLI bridge."""

from __future__ import annotations

import json
import re
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DATA_DIR = Path(__file__).resolve().parent / "data"
CONTACTS_FILE = DATA_DIR / "contacts.json"

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

PORTFOLIO_DATA: dict[str, Any] = {
    "name": "M. Baji",
    "headline": "Student Portfolio | CSE — Artificial Intelligence & Machine Learning",
    "portraitUrl": "/assets/aistudio/Professional_Black_Suit_Headshot_eeb6b428.png",
    "location": "Vijayawada, Andhra Pradesh, India",
    "academicProgramme": "Undergraduate Engineering — CSE-AIML",
    "focusAreas": ["Technology", "AI/ML", "Software", "Game Development"],
    "email": "nnjj10601@gmail.com",
    "motto": "Learning. Building. Innovating.",
    "profile": (
        "I am M. Baji, a Computer Science and Engineering student specializing in "
        "Artificial Intelligence and Machine Learning. I am interested in technology, "
        "software development, AI, game development, and creative digital solutions. "
        "I enjoy exploring new technologies and turning ideas into practical projects."
    ),
    "careerObjective": (
        "To build strong skills in programming, software engineering, and AI/ML, "
        "and use them to develop useful applications and original interactive experiences. "
        "My long-term aim is to become a capable software developer and contribute to "
        "meaningful technology projects."
    ),
    "skills": [
        {
            "id": "programming-fundamentals",
            "title": "Programming fundamentals",
            "area": "Core Engineering",
            "summary": "Building clean logical structures, data handling, and algorithmic problem-solving habits in Python and TypeScript.",
        },
        {
            "id": "ai-ml",
            "title": "Artificial Intelligence & Machine Learning",
            "area": "Specialization",
            "summary": "Studying foundational machine learning concepts, pattern reasoning, and intelligent application workflows.",
        },
        {
            "id": "web-development",
            "title": "Web development",
            "area": "Full-Stack",
            "summary": "Creating responsive interfaces with TypeScript and CSS backed by FastAPI REST endpoints.",
        },
        {
            "id": "game-development",
            "title": "Game development",
            "area": "Interactive Media",
            "summary": "Designing original interactive worlds, narrative progression, and action-adventure player systems.",
        },
        {
            "id": "logical-thinking",
            "title": "Logical thinking & problem solving",
            "area": "Methodology",
            "summary": "Breaking open-ended requirements into clear, testable steps through experimentation and iteration.",
        },
        {
            "id": "ui-ux",
            "title": "UI/UX and design thinking",
            "area": "Product Design",
            "summary": "Mapping user journeys, reducing friction in everyday digital services, and structuring clear layouts.",
        },
    ],
    "projects": [
        {
            "id": "smart-bike-rental",
            "title": "Smart College & Urban Bike Rental Platform",
            "category": "Design Thinking",
            "year": "2026",
            "role": "Product & UX Concept",
            "summary": (
                "A design-thinking project exploring a convenient digital bike-rental "
                "experience for college students and urban users, with a focus on easy "
                "access and user-friendly booking."
            ),
            "highlights": [
                "Mapped campus-to-city commute friction points for undergraduate students.",
                "Designed a streamlined pickup, reservation, and return flow for rapid daily access.",
                "Structured transparent student pricing and station availability indicators.",
            ],
            "focusTags": ["Design Thinking", "Mobility UX", "Booking Workflow"],
            "visualType": "mobility",
        },
        {
            "id": "genesis-india",
            "title": "GENESIS: INDIA",
            "category": "Game Concept",
            "year": "2026",
            "role": "Narrative & World Designer",
            "summary": (
                "An original futuristic game concept inspired by action-adventure "
                "experiences, with an emphasis on an original storyline, character "
                "development, and world-building."
            ),
            "highlights": [
                "Authored an original sci-fi narrative arc grounded in futuristic Indian settings.",
                "Defined protagonist progression, faction lore, and atmospheric environmental zones.",
                "Outlined core action-adventure exploration loops and encounter pacing.",
            ],
            "focusTags": ["World-Building", "Character Design", "Action-Adventure"],
            "visualType": "game",
        },
        {
            "id": "samsung-smart-tv",
            "title": "Samsung Smart TV - Academic Report",
            "category": "Research",
            "year": "2026",
            "role": "Technical Researcher",
            "summary": (
                "An academic report exploring smart television technology, its "
                "features, components, and everyday applications."
            ),
            "highlights": [
                "Examined display panel architecture, processing units, and smart operating ecosystems.",
                "Documented connectivity protocols, voice interfaces, and home automation integration.",
                "Evaluated everyday consumer usability and practical household applications.",
            ],
            "focusTags": ["Consumer Tech", "Hardware Systems", "Technical Writing"],
            "visualType": "hardware",
        },
    ],
    "learningAndDevelopment": (
        "I am continuously building my knowledge in computer science concepts, "
        "programming, project planning, communication, presentation skills, and "
        "creative problem solving. I value learning through practice, experimentation, "
        "and feedback."
    ),
    "futureGoals": [
        "Strengthen programming and software development skills",
        "Learn advanced AI/ML concepts",
        "Build real-world projects",
        "Develop original games and interactive experiences",
        "Contribute to innovative technology solutions",
    ],
    "personalStatement": (
        "I believe learning is a continuous process. Every project and challenge is "
        "an opportunity to improve. My goal is not only to learn technology, but also "
        "to understand it, experiment with it, and use it to create something meaningful."
    ),
}


def get_portfolio() -> dict[str, Any]:
    """Return the complete portfolio credential payload."""
    return PORTFOLIO_DATA


def get_projects(category: str | None = None) -> list[dict[str, Any]]:
    """Return projects optionally filtered by category."""
    projects = PORTFOLIO_DATA["projects"]
    if not category or category.strip().lower() == "all":
        return projects
    target = category.strip().lower()
    return [p for p in projects if p["category"].lower() == target]


def _ensure_storage() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not CONTACTS_FILE.exists():
        CONTACTS_FILE.write_text("[]", encoding="utf-8")


def list_contacts() -> list[dict[str, Any]]:
    """Read stored contact inquiries from disk."""
    _ensure_storage()
    try:
        raw = CONTACTS_FILE.read_text(encoding="utf-8")
        data = json.loads(raw)
        return data if isinstance(data, list) else []
    except (OSError, json.JSONDecodeError):
        return []


def validate_contact_payload(payload: dict[str, Any]) -> dict[str, str]:
    """Validate contact inquiry fields and return field-level errors if invalid."""
    errors: dict[str, str] = {}
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    subject = str(payload.get("subject", "")).strip()
    message = str(payload.get("message", "")).strip()

    if len(name) < 2:
        errors["name"] = "Please enter your name (at least 2 characters)."
    if not email or not EMAIL_PATTERN.match(email):
        errors["email"] = "Please enter a valid email address."
    if len(subject) < 3:
        errors["subject"] = "Please provide a short subject (at least 3 characters)."
    if len(message) < 10:
        errors["message"] = "Please write a message of at least 10 characters."

    return errors


def save_contact_submission(payload: dict[str, Any]) -> tuple[bool, dict[str, Any]]:
    """Validate and persist a contact inquiry in JSON storage."""
    errors = validate_contact_payload(payload)
    if errors:
        return False, {"error": "Validation failed", "fields": errors}

    _ensure_storage()
    submissions = list_contacts()
    record = {
        "id": str(uuid.uuid4()),
        "name": str(payload.get("name", "")).strip(),
        "email": str(payload.get("email", "")).strip(),
        "subject": str(payload.get("subject", "")).strip(),
        "message": str(payload.get("message", "")).strip(),
        "receivedAt": datetime.now(timezone.utc).isoformat(),
    }
    submissions.insert(0, record)
    CONTACTS_FILE.write_text(
        json.dumps(submissions[:100], indent=2),
        encoding="utf-8",
    )
    return True, record


def _cli() -> int:
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Missing command"}))
        return 1

    cmd = sys.argv[1]
    if cmd == "health":
        print(
            json.dumps(
                {
                    "status": "ok",
                    "runtime": f"Python {sys.version.split()[0]}",
                    "framework": "FastAPI-compatible service",
                }
            )
        )
        return 0
    if cmd == "portfolio":
        print(json.dumps(get_portfolio()))
        return 0
    if cmd == "projects":
        category = sys.argv[2] if len(sys.argv) > 2 else None
        print(json.dumps({"projects": get_projects(category)}))
        return 0
    if cmd == "contacts":
        print(json.dumps({"messages": list_contacts()}))
        return 0
    if cmd == "submit-contact":
        raw_input = sys.stdin.read()
        try:
            payload = json.loads(raw_input or "{}")
        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid JSON body"}))
            return 2
        ok, result = save_contact_submission(payload)
        print(json.dumps(result))
        return 0 if ok else 2

    print(json.dumps({"error": f"Unknown command: {cmd}"}))
    return 1


if __name__ == "__main__":
    raise SystemExit(_cli())
