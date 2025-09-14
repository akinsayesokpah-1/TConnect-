# TConnect Quickstart 🚀

## Frontend
- React app in `frontend/`
- Auto deploys to GitHub Pages: https://akinsayesokpah-1.github.io/TConnect

## Backend
- Express app in `backend/`
- Run with Docker Compose: `docker compose up -d`

## Monitoring
- Prometheus: http://localhost:9090
- Alertmanager: http://localhost:9093
- Grafana: http://localhost:3000 (default admin/admin)

## GitHub Actions
- `.github/workflows/frontend.yml` → builds + deploys frontend
- `.github/workflows/deploy.yml` → builds + runs backend stack
