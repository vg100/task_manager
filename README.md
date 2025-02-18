# Task Manager - Full Stack Project

This repository contains both the **frontend** (React Native) and **backend** (Node.js/Express) code for TaskManager.

---

## 📂 Project Structure
```
taskmanager/
│── backend/   # Backend code (Node.js, Express, MongoDB)
│   ├── src/
│   ├── package.json
│   ├── index.js
│
│── frontend/  # Frontend code (React/React Native)
│   ├── src/
│   ├── package.json
│   ├── index.js
│
│── .gitignore
│── README.md
```

---

## 🚀 Getting Started


### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in both `backend/` and `frontend/` directories:


## 🏃 Running the Application

### Backend (Node.js)
```sh
cd backend
npm start
```

### Frontend (React/React Native)
```sh
cd frontend
npm start
```
---

## 🔗 API Routes (Backend)

#### Authentication (JWT-based)
| Method | Route | Description |
|--------|----------------|-----------------------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Authenticate user and return JWT |

#### Task Management (Protected Routes - Requires JWT)
| Method | Route | Description |
|--------|----------------|-----------------------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks for the logged-in user |
| GET | `/tasks/:id` | Get a specific task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---


Happy Coding! 🎉




