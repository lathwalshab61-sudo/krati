# FORENSICA LIMS — Full-Stack Execution Guide

This document explains how to run the **Backend API Server** and **Frontend Web Application** concurrently or independently.

---

## ⚡ Quick Start: Run Both Together (Single Command)

You can launch both the **Backend API (Port 5000)** and **Frontend UI (Port 5173)** simultaneously using any of the following options:

### Option 1: Via npm command (Recommended)
```bash
npm run dev:all
```

### Option 2: Via Windows Batch File
Double-click `run_all.bat` in the project root folder, or run:
```cmd
.\run_all.bat
```

Once started:
- **Frontend UI:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

Press `Ctrl + C` in the terminal to stop both servers at once.

---

## 🖥️ Running in Separate Terminals (Independent Processes)

If you prefer watching independent server logs or debugging separately:

### Terminal 1: Backend Server
```bash
# Start backend on http://localhost:5000
npm run dev:backend
# or: node server/server.js
```

### Terminal 2: Frontend Client
```bash
# Start Vite development server on http://localhost:5173
npm run dev:frontend
# or: npm run dev
```

---

## 🌐 Network Ports & API Routing

| Service | Port | Description |
| :--- | :--- | :--- |
| **Frontend UI (Vite)** | `http://localhost:5173` | React 19 + Tailwind CSS Application |
| **Backend API (Node.js)** | `http://localhost:5000` | Forensic LIMS REST API Server |
| **Proxy Route** | `/api/*` | Vite automatically forwards `/api` requests to port 5000 |

### Available API Endpoints

- `GET /api/health` — Service health check & uptime status
- `GET /api/stats` — Forensic metrics (case count, evidence count, DNA profiles)
- `GET /api/cases` — Retrieve list of forensic cases
- `GET /api/cases/:id` — Retrieve details for a specific case
- `POST /api/cases` — Register a new crime scene case
- `POST /api/cases/:id/evidence` — Add collected evidence item with barcode
- `GET /api/officers` — Retrieve active forensic examiner directory

---

## 📦 Production Build & Preview

```bash
# 1. Build optimized frontend production bundle
npm run build

# 2. Preview production build locally
npm run preview
```
