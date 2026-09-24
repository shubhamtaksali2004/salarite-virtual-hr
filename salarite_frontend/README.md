# Salarite Virtual HR + ATS Platform

A real-time HR task management and interview scheduling web application built for the Salarite Intern Technical Assignment. Employers can assign tasks and monitor progress live, while Virtual HRs can execute tasks, update status, and schedule interviews.

---

## 🌐 Live Links

- **Live Frontend Application:** https://salarite-virtual-hr-frontend.vercel.app/
- **Live Backend API Endpoint:** https://salarite-virtual-hr-production.up.railway.app/tasks
- **Interactive API Documentation (Swagger UI):** https://salarite-virtual-hr-production.up.railway.app/docs

---

## ⚙️ Tech Stack & Architecture

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** FastAPI (Python), Uvicorn
- **Database:** MySQL[cite: 4]
- **Real-Time Communication:** WebSockets / Periodic Polling for live status synchronization[cite: 4]
- **Deployment & Hosting:**
  - **Frontend:** Vercel[cite: 4]
  - **Backend:** Railway[cite: 4]

---

## ✨ Features Implemented

1. **Employer Task Assignment Dashboard**
   - Create and delegate HR execution tasks to Virtual HRs[cite: 4].
   - Live dashboard view to track task progress in real time without refreshing[cite: 4].

2. **Virtual HR Task Execution & Updates**
   - View assigned task queues with status indicators (`Pending`, `In Progress`, `Completed`)[cite: 4].
   - One-click task status updates that push live updates to the Employer view[cite: 4].

3. **In-built Interview Scheduling Modal**
   - Schedule interview slots with inbuilt placeholder modes for **Voice**, **Video**, and **Chat** calls[cite: 4].

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- MySQL Server running locally or hosted remotely

### 2. Backend Setup (FastAPI)

```bash
# Clone the repository
git clone [https://github.com/shubhamtaksali2004/salarite-virtual-hr.git](https://github.com/shubhamtaksali2004/salarite-virtual-hr.git)
cd salarite-virtual-hr/salarite_backend

# Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Start the FastAPI development server
uvicorn app.main:app --reload
# Navigate to the frontend folder
cd ../salarite_frontend

# Install dependencies
npm install

# Start the Next.js development server
npm run dev