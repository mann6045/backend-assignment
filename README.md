# 🚀 Backend Developer Intern Project Assignment

## Scalable REST API with Authentication & Role-Based Access

This repository contains the completed full-stack project assignment, consisting of a secure, scalable Node.js/Express backend API and a supporting React frontend UI.

---

## ✨ Core Features Implemented

| Feature Area | Details |
| :--- | :--- |
| **Backend Framework** | Node.js (Express.js) |
| **Database** | PostgreSQL (managed via Prisma ORM) |
| **Authentication** | User Registration, Login, and **JWT** generation/validation. |
| **Authorization (RBAC)** | **Role-Based Access Control** implemented on the Task entity (User can only manage own tasks; Admin can manage all tasks). |
| **Entity CRUD** | Full **CRUD** (Create, Read, Update, Delete) for the **Task** entity. |
| **Frontend UI** | **React.js** (built with Vite) for testing all APIs and showing the protected dashboard. |
| **Security** | Password hashing (`bcrypt`), JWT token handling, and input validation. |

---

## 🛠️ Project Structure

The project is organized into two primary folders:

1.  **`backend-intern-project/`**: Contains the Node.js/Express server code, Prisma schema, and API logic.
2.  **`frontend-intern-ui/`**: Contains the React application code and styling.

---

## ⚙️ Setup and Installation Guide

Follow these steps to get both the backend API and the frontend UI running locally.

### Prerequisites

* **Node.js** (v18+) and **npm**
* **PostgreSQL** database server running locally

### 1. Database Setup

1.  **Configure `.env`:** Navigate to the `backend-intern-project` directory. Create a file named **`.env`** and add your configuration variables:

    ```env
    PORT=3000
    # Replace with your actual database user, password, and created database name
    DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/backend_intern_db"
    JWT_SECRET=YOUR_VERY_STRONG_SECRET_KEY
    ```

2.  **Install Prisma Client:**
    ```bash
    cd backend-intern-project
    npm install
    ```

3.  **Run Migrations:** Apply the database schema (User and Task tables) to your PostgreSQL instance:
    ```bash
    npx prisma migrate dev --name init_schema
    ```

### 2. Backend Installation & Run

1.  **Install Dependencies:** (If not already done in the database step)
    ```bash
    cd backend-intern-project
    npm install
    ```
2.  **Start the Backend Server:**
    ```bash
    npm run dev
    ```
    The API will be running at `http://localhost:3000`.

### 3. Frontend Installation & Run

1.  **Navigate to Frontend:**
    ```bash
    cd ../frontend-intern-ui
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Frontend UI:**
    ```bash
    npm run dev
    ```
    The UI will open in your browser (usually at `http://localhost:5173`).

---

## 🔑 API Endpoints

The frontend UI automatically uses these endpoints, but they are also available for testing via Postman.

| Method | Endpoint | Description | Requires Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Create a new user account. | No |
| **POST** | `/api/v1/auth/login` | Log in and receive a JWT token. | No |
| **POST** | `/api/v1/tasks` | Create a new task (linked to the logged-in user). | **Yes (JWT)** |
| **GET** | `/api/v1/tasks` | Retrieve all tasks owned by the logged-in user. | **Yes (JWT)** |
| **PUT** | `/api/v1/tasks/:id` | Update an existing task. (Requires ownership or Admin role) | **Yes (JWT)** |
| **DELETE** | `/api/v1/tasks/:id` | Delete a task. (Requires ownership or Admin role) | **Yes (JWT)** |

---

## 📈 Scalability Note

To handle future high traffic and growth, the architecture is designed for readiness in several key areas:

1.  **Microservices:** The modular structure (Auth, Task Controllers) is primed for decomposition into independent microservices.
2.  **Caching:** Redis should be integrated for caching read-heavy operations (e.g., frequently accessed task lists) to reduce primary database load.
3.  **Horizontal Scaling:** The stateless nature of the JWT authentication allows the Express server instances to be easily deployed behind a **Load Balancer** for distributing traffic and ensuring high availability.

---

### **Thank You!**
*Submitted by MANN PATEL*
