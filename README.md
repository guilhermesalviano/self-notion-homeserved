# CoreDash
CoreDash is a lightweight, self-hosted personal dashboard designed to breathe new life into older hardware.

<p align="center">
  <img src="https://raw.githubusercontent.com/guilhermesalviano/casaos-coredash/main/apps/web/public/logo.png" width="120" />
</p>

## 🚀 Overview
Built for personal automation, system monitoring, and habit tracking, CoreDash is optimized for low-cost, "home lab" style hardware.

### My Current Stack

#### Hardware
| Item                    | Specification                          | Technology                  |
|-------------------------|----------------------------------------|-----------------------------|
| **Server**              | Samsung RV415                          |  Debian - CasaOS            |
| **Client Device**       | Generic Android Tablet                 |  Fully Kiosk Browser        |

## 🛠 Development
#### Prerequisites
- Node.js (LTS version)
- Docker & Docker Compose

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

1. Pull the image locally or within your CasaOS dashboard.
2. Configure Environment Variables (.env) with your specific settings.
3. Deploy and access the dashboard via the local IP on your network.