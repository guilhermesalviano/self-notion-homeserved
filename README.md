# CoreDash
CoreDash is a lightweight, self-hosted personal dashboard designed to breathe new life into older hardware. It runs as a centralized server on a repurposed laptop and serves a touch-optimized interface to a wall-mounted tablet.

## 🚀 Overview
The project is built to handle personal automation, system monitoring, and habit tracking, all while staying within the constraints of low-cost, "home lab" style hardware.

### My stack
#### Hardware Stack
- Server: Samsung RV415 (Repurposed Notebook)
- Client Interface: Generic Android Tablet
- Mounting: Wall-mounted with a motion-sensing wake-up trigger.

#### Software Stack
- OS/Management: CasaOS running on Debian.
- Frontend: Next.js (App Router) with a custom "Bloom-UI" component library.
- Client App: Fully Kiosk Browser (configured for motion detection using the tablet camera).

## 🛠 Development
#### Prerequisites
Node.js (LTS version)

Docker & Docker Compose

#### Run the Web App
To start the frontend development server:

```Bash
cd apps/web
npm run dev
```
#### Mock Services
To run the backend services and mock APIs using Docker Compose:
```Bash
docker compose up --build
```
The mock will run all external apis with mock data, using mockserver image, it will make the start easier and simpler.

## 📦 Deployment
CoreDash is designed to be deployed via Docker.

1. Build the image locally or via CI/CD.
2. Deploy the container within CasaOS for easy management and monitoring.
3. Access the dashboard via the local IP on your network.

## 🚧 Status
[x] Core Dashboard Layout
[x] CasaOS Integration
[ ] Weather/News API Integration
[ ] Habit Tracker Module (In Progress)