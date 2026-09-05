# VAELKODE

Full-stack marketing site + lead admin for VAELKODE — an AI-first digital engineering company.

- **Frontend:** React 18 + Vite + TypeScript
- **Backend:** Python + FastAPI (layered: routers → services → repositories → models)
- **Database:** MySQL 8
- **Auth:** JWT (access + refresh) with role-based access control (admin / editor / viewer)

## Project structure

```
vaelkode/
├── backend/          FastAPI application
│   ├── app/
│   │   ├── api/      Routers (controllers): public, admin, auth
│   │   ├── core/     Config, security, settings
│   │   ├── db/       SQLAlchemy session + base
│   │   ├── models/   ORM models
│   │   ├── schemas/  Pydantic request/response models
│   │   ├── services/ Business logic
│   │   ├── repositories/ Data access
│   │   └── seeds/    Seed data (wireframe content)
│   ├── alembic/      Database migrations
│   └── tests/
└── frontend/         React SPA
    └── src/
        ├── components/  UI + section components
        ├── pages/       Route pages
        ├── layouts/     Public / Admin layouts
        ├── hooks/       Custom hooks
        ├── services/    API client
        ├── router/      React Router config
        ├── styles/      Design tokens (from wireframe) + global CSS
        └── types/       Shared TS types
```

## Local development

### Prerequisites
- Python 3.12+ (tested on 3.14)
- Node 20+ (tested on 25)
- MySQL 8 running locally

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy ..\.env.example ..\.env   # then edit DB credentials
alembic upgrade head
python -m app.seeds.seed        # load initial content
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000` — docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Environment variables

See `.env.example` for all required variables.
