# CyberShield

**An Intelligent AI-Based Cyber Threat Detection and Alert System**

CyberShield is a complete MERN stack university CSE/OOP project. It demonstrates JWT authentication, MongoDB persistence, MVC architecture, OOP threat-analysis classes, risk scoring, alert generation, dashboard analytics, PDF reporting, and safe attack simulation.

## Tech Stack

- Frontend: React.js, Tailwind CSS, Framer Motion, Chart.js, React Router DOM, Axios
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT and bcrypt password hashing
- Architecture: MVC plus OOP service classes

## Folder Structure

```text
CyberShield/
  backend/
    scripts/
      seed.js
    src/
      classes/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
      app.js
      server.js
  frontend/
    src/
      animations/
      charts/
      components/
      context/
      hooks/
      layouts/
      pages/
      services/
      App.jsx
      main.jsx
      index.css
  package.json
  README.md
```

## OOP Concepts Demonstrated

- Class: `User`, `Admin`, `ThreatDetector`, `RiskAnalyzer`, `AlertSystem`, `ThreatLogger`, `DashboardManager`, `AttackSimulator`
- Object: controllers and services instantiate class objects such as `new ThreatDetector()` and `new AttackSimulator()`
- Constructor: all main domain classes initialize state through constructors
- Inheritance: `Admin extends User`
- Encapsulation: private class fields like `#passwordHash` and `#weights`
- Polymorphism: alert classes implement different `format()` behavior for warning and danger alerts
- Abstraction: `BaseThreatAnalyzer` and `SecurityAlert` define abstract contracts
- Modular Design: backend follows models, routes, controllers, middleware, services, classes, and utils

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create environment files:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

3. Start MongoDB locally, or update `backend/.env` with a MongoDB Atlas URI:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cybershield
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

4. Seed demo data:

```bash
npm run seed
```

Demo accounts:

```text
Admin: admin@cybershield.local / Admin@12345
User:  analyst@cybershield.local / User@12345
```

5. Run the full app:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api/health`

## Main Features

- User registration, user login, admin login
- JWT protected routes
- bcrypt password hashing
- Automatic account lockout after repeated failed password attempts
- Suspicious login and brute-force detection
- AI-like risk score calculation
- Low, Medium, High, and Critical threat levels
- Smart alerts and recommendations
- Cinematic threat alert overlay with severity, source IP, score, recommendation, and 20-second WAV warning alarm loop
- Attack simulator for brute-force, unknown-account, and rapid-request demo events
- Dashboard stat cards, live feed, system status, risk meter
- Chart.js line, doughnut, and bar analytics
- Search and filter threat logs
- Alert history with acknowledgment
- PDF threat report download
- Dark/light theme toggle
- Sound alert option
- AI security assistant popup for guided demo explanations
- Presentation Demo button for live university demonstration
- OOP Design page for viva explanation

## University Presentation Flow

Use this sequence during the demo:

1. Open `http://localhost:5173`.
2. Login as admin with `admin@cybershield.local / Admin@12345`.
3. Show the Dashboard stat cards, risk meter, live alerts, charts, and activity feed.
4. Click **Presentation Demo** to generate brute-force, unknown-account, and rapid-request signals.
5. Explain how the risk score, alerts, threat logs, and charts update from backend analysis.
6. Open **OOP Design** from the sidebar and explain the class structure.
7. Open **Analytics** and **Alerts** to show searchable logs and alert history.
8. Download the PDF report from the Dashboard.

Before a clean presentation, reset demo data with:

```bash
npm run seed
```

## Problem Statement

Modern systems receive many login attempts from unknown users, automated scripts, and repeated attackers. A security operations team needs a dashboard that can record login behavior, detect suspicious patterns, calculate risk, create alerts, and summarize incidents visually.

CyberShield solves this by combining a MERN dashboard with OOP-based threat detection logic.

## Objectives

- Detect suspicious authentication behavior.
- Simulate brute-force and abnormal activity for demonstration.
- Calculate AI-like risk scores and threat levels.
- Generate smart alerts and recommendations.
- Present analytics through charts and live activity tables.
- Demonstrate OOP concepts clearly for a CSE project viva.

## System Architecture

```text
React UI
   |
Axios API Service
   |
Express Routes
   |
Controllers
   |
Services
   |
OOP Classes: ThreatDetector, RiskAnalyzer, AlertSystem
   |
Mongoose Models
   |
MongoDB Collections
```

## Threat Detection Flow

```text
Login Attempt
   |
Save to loginAttempts
   |
runThreatPipeline()
   |
ThreatDetector.analyze()
   |
RiskAnalyzer.calculateScore()
   |
Predict Threat Level: Low / Medium / High / Critical
   |
AlertSystem.buildAlert()
   |
ThreatLogger.buildLog()
   |
Dashboard and Analytics Update
```

## Database Collections

- `users`: registered analysts and admins
- `loginAttempts`: successful and failed authentication records
- `alerts`: warning, danger, and critical alert history
- `threatLogs`: categorized threat intelligence events
- `riskAnalysis`: risk score, factors, recommendations, and analysis records

## API Overview

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/admin/login
GET    /api/auth/me

GET    /api/dashboard
GET    /api/dashboard/status

GET    /api/threats/logs
GET    /api/threats/analytics
POST   /api/threats/simulate/bruteforce
POST   /api/threats/simulate/unknown-account
POST   /api/threats/simulate/suspicious-requests

GET    /api/alerts
PATCH  /api/alerts/:id/acknowledge

GET    /api/reports/threat-report
```

## Implementation Guide

1. Backend starts in `backend/src/server.js`, connects to MongoDB, then loads `app.js`.
2. Express routes call controllers in `backend/src/controllers`.
3. Controllers use services and OOP classes for business logic.
4. Login attempts are stored in `loginAttempts`.
5. `runThreatPipeline()` sends each login attempt through `ThreatDetector`.
6. `RiskAnalyzer` calculates a score and predicts the threat level.
7. `AlertSystem` creates warning or danger alert objects.
8. `ThreatLogger` creates threat log payloads.
9. `DashboardManager` aggregates MongoDB data for the dashboard.
10. React pages call APIs through `frontend/src/services/api.js`.
11. Dashboard and analytics pages render Chart.js visualizations.
12. Attack simulator buttons call protected admin API routes and create safe demo events.

## Notes

- `Admin extends User` proves inheritance.
- `#passwordHash` and `#weights` prove encapsulation.
- `BaseThreatAnalyzer` proves abstraction.
- `WarningAlert` and `DangerAlert` formatting prove polymorphism.
- `AttackSimulator` creates demo objects and runs the threat pipeline.
- `DashboardManager` demonstrates modular aggregation logic.
- Account lockout shows practical secure authentication state management inside the user model.

## Future Scope

- Multi-factor authentication for admin accounts.
- Email/SMS notification for critical alerts.
- IP geolocation and VPN/proxy detection.
- WebSocket-based live updates instead of polling.
- Real machine learning model for anomaly scoring.
- Role-based admin panel for alert assignment and incident response.

## Verification

Current local verification completed:

- Frontend production build passed with `npm run build --prefix frontend`
- Backend JavaScript syntax checks passed with `node --check`
- Frontend npm audit passed with 0 vulnerabilities
- Vite dev server started at `http://localhost:5173`
- Browser check confirmed the landing page renders, has no Vite error overlay, has no console errors, and navigation to `/admin-login` works

MongoDB must be running on `127.0.0.1:27017`, or `backend/.env` must point to a MongoDB Atlas URI.
