# Fullstack Serverless Boilerplate (Vite + Express)

Reusable fullstack template built with React (Vite) and Express, optimized for serverless deployment on Vercel.

This project provides a clean architecture foundation to quickly bootstrap fullstack applications with frontend and backend integrated in a single repository.

---

## 🚀 Stack

Frontend:
- React
- Vite

Backend:
- Express (Serverless Function)

Deployment:
- Vercel (Serverless)

---

## 📁 Project Structure

/
├── api/ # Serverless backend (Express)
│ └── index.js
├── src/ # Frontend (React)
├── public/
├── package.json
├── vite.config.js


---

## ⚙️ How It Works

- The frontend is built using Vite.
- The backend runs as a Serverless Function inside `/api`.
- In production, API calls are made using `/api` (no localhost needed).
- Optimized for seamless deployment on Vercel.

---

## 🧪 Run Locally

### 1. Install dependencies

npm install


### 2. Run development server


Frontend will run on:

http://localhost:5173


---

## ☁️ Deploy

This project is configured for deployment on Vercel.

1. Push to GitHub
2. Import repository into Vercel
3. Select **Vite** as Framework Preset
4. Deploy

Serverless functions will automatically run from the `/api` directory.

---

## 📌 Purpose

This boilerplate was created to:

- Speed up fullstack project initialization
- Provide a clean reusable architecture
- Simplify serverless deployment workflow
- Serve as a foundation for dashboards, SaaS apps, and internal tools

---

## 📄 License

MIT