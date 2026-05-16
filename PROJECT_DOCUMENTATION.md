# ByteQuest AI - OTT Churn Prediction

## 🚀 Project Overview
ByteQuest AI is a full-stack "OTT Agent" designed for streaming platforms to predict user churn and recommend personalized retention strategies. It uses machine learning to identify at-risk users based on their behavioral patterns.

---

## 🛠 Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud)
- **AI/ML**: TensorFlow.js (Sequential Neural Network)
- **Deployment**: Vercel (Experimental Services Architecture)

---

## 🧠 AI Brain (The Model)
The system uses a **3-layer Sequential Neural Network** built with TensorFlow.js.
- **Inputs**:
  - `lastActiveDays`: Recency of user activity.
  - `watchHours`: Engagement level (hours per week).
  - `paymentDelay`: Billing history (days late).
- **Output**: A Risk Score (0-100%) categorized into LOW, MEDIUM, and HIGH risk.
- **Action Engine**: Based on the risk score, the AI recommends specific retention tactics (e.g., 50% coupons for HIGH risk).

---

## 📖 Key Features & Improvements
- **Real-time AI Dashboard**: Visualizes churn distribution and recent predictions.
- **Show/Hide Password**: Enhanced security and UX on the login page.
- **Custom Branding**: Premium ByteQuest logo and custom favicon.
- **One-Click Seeding**: `/api/seed` endpoint to quickly populate the database.
- **Explainable Strategy**: Detailed "Execution Steps" for each recommended retention action.

---

## 🚀 Deployment Guide (Vercel)
The project is optimized for Vercel using the `experimentalServices` configuration.

### 1. Environment Variables
You must add the following variables in Vercel:
- `MONGODB_URI`: Your MongoDB Atlas connection string.
- `NODE_ENV`: `production`

### 2. MongoDB Setup
- Ensure your MongoDB Atlas IP Whitelist includes `0.0.0.0/0`.
- Use a database user with Read/Write permissions.

---

## 📂 Project Structure
- `/frontend`: React application (UI/UX)
- `/backend`: Node.js server and AI logic
- `vercel.json`: Deployment configuration for multi-service hosting.

---

## 🧪 Development Commands
- `npm run dev` (in frontend): Start UI
- `node server.js` (in backend): Start API
- `node seed.js` (in backend): Populate local DB
- Visit `/api/seed`: Populate Cloud DB

---

**Developed by TEAM INFINITY**
