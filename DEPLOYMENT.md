# Deployment Guide — M. Baji Personal Portfolio

This portfolio pairs a **TypeScript + React + Tailwind CSS** frontend with a **Python FastAPI** backend (`backend/main.py`).

## 1. Local Development (Two Terminals)

### Terminal 1 — Python FastAPI Backend
```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

FastAPI interactive API docs will be available at:
- Swagger UI: `http://localhost:8000/docs`
- Portfolio JSON: `http://localhost:8000/api/portfolio`

### Terminal 2 — TypeScript + Vite Frontend
```bash
npm install
npm run dev
```
> When running Vite standalone against FastAPI on port `8000`, proxy `/api` requests in `vite.config.ts` or set `VITE_API_BASE_URL=http://localhost:8000`.

---

## 2. Single-Container Production Build (Docker)

Build the TypeScript/CSS bundle and serve it directly from FastAPI:

```bash
docker build -t mbaji-portfolio .
docker run -p 8000:8000 mbaji-portfolio
```

Open `http://localhost:8000` in your browser.

---

## 3. Cloud Hosting (Render, Railway, or Google Cloud Run)

### Option A — Render / Railway (Native Python + Node Build)
1. **Build Command**:
   ```bash
   npm ci && npm run build && pip install -r backend/requirements.txt
   ```
2. **Start Command**:
   ```bash
   uvicorn backend.main:app --host 0.0.0.0 --port $PORT
   ```
3. **Environment Variables**:
   - `CORS_ORIGINS=*` (or your custom domain, e.g. `https://mbaji.dev`)

### Option B — Google Cloud Run (Docker)
```bash
gcloud run deploy mbaji-portfolio \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## 4. API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service status check |
| `GET` | `/api/portfolio` | Full structured resume & credentials |
| `GET` | `/api/projects?category=All` | Filterable project list |
| `POST` | `/api/contact` | Validated contact inquiry submission |
| `GET` | `/api/contact/messages` | Stored contact inquiries |
