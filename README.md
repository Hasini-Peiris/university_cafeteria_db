# university_cafeteria_db

# UniCafe — University Cafeteria Pre-Order System

## Project Title

**University Cafeteria Pre-Order System — Full-Stack RESTful Application**

A complete full-stack solution built with a **Node.js + Express.js + MongoDB** backend REST API and a **React.js** frontend interface. The system enables university students and staff to browse the live cafeteria menu, place meal pre-orders online, and manage orders digitally — eliminating physical queue times, reducing food waste, and modernising cafeteria operations campus-wide.

---

## Problem Description

University cafeterias face significant operational challenges during peak hours:

- Long queues during lunch breaks cause students to miss classes or skip meals.
- Food waste occurs due to over-preparation without knowing actual demand in advance.
- Students have no visibility into meal availability before arriving at the cafeteria.
- Manual, paper-based processes result in no digital record of orders or transactions.
- Unpredictable order volumes make it difficult for staff to manage preparation efficiently.

---

## Proposed Solution

This project delivers a **RESTful API backend** paired with a **React.js frontend** that solves every problem above:

- Students browse the live digital menu and **place pre-orders online** well in advance
- Cafeteria staff gain **real-time visibility** into incoming orders for accurate meal preparation
- A **pickup-time model** removes the need to queue physically at the counter
- MongoDB maintains a **structured, searchable database** of users, menu items, and orders
- **UUID-based order IDs** ensure every transaction is uniquely and reliably tracked
- A **React.js frontend** connects directly to all API endpoints — delivering a clean, usable interface for students and staff through Vibe Coding (AI-assisted development with Cursor IDE)
- Applying middleware-based validation and a clean MVC architecture for maintainability.


---

## Features

### Backend API

- User Management - Register, view, update, and delete student and staff accounts 
- Menu Management - Add and manage cafeteria menu items with pricing and availability status
- Order Management - Place, view, update, and cancel pre-orders with unique tracking IDs
- MVC Architecture - Clean separation across Models, Controllers, Routes, and Middleware
- Middleware Layer - Request validation and centralised error handling on all routes 
- UUID Order IDs - Unique identifiers generated per order (e.g. `ORD-550e8400-e29b`)
- Environment Config - Secure `.env` for database credentials and port settings
- Auto-reload - Nodemon restarts server automatically on any file change

### Frontend — React.js (Vibe Coding)

Menu Browser - View all available items with live prices, categories, and availability status
- Order Form - Select items, set a pickup time, and submit pre-orders through the UI |
- Order Dashboard - Track, update status, and cancel orders — full CRUD via interface
- API Integration - All UI actions connect to backend endpoints via Axios
- Responsive UI - Clean, usable layout for both students and cafeteria staff
- Vibe Coding - Built using Cursor IDE with AI-assisted (prompt-based) development

---

## Technologies Used

### Backend

| Technology  | Version | Purpose                                   |
|-------------|---------|-------------------------------------------|
| Node.js     | 18.x    | JavaScript runtime environment            |
| Express.js  | 5.2.1   | Web framework for building RESTful routes |
| MongoDB     | —       | NoSQL database for persistent data storage|
| Mongoose    | 9.6.1   | ODM library for MongoDB schema modeling   |
| dotenv      | 17.4.2  | Environment variable management           |
| uuid        | 14.0.0  | Generating unique order identifiers       |
| body-parser | 2.2.2   | Parsing incoming JSON request bodies      |
| nodemon     | 3.1.14  | Development server with hot reload        |

### Frontend

| Technology  | Version | Purpose                                                   |
|-------------|---------|-----------------------------------------------------------|
| React.js    | 18.x    | Frontend UI framework                                     |
| Axios       | latest  | HTTP requests to the backend REST APIs                    |
| React Router| v6      | Client-side page navigation                               |
| Cursor IDE  |    -    | Vibe Coding (AI-assisted) development       environment   |

### Tools & Platforms

| Tool          | Purpose                                    |
|---------------|--------------------------------------------|
| Postman       | API endpoint testing and collection export |
| GitHub        | Version control and repository hosting     |
| MongoDB Atlas | Cloud-hosted NoSQL database cluster        |

---

## Project Structure

```
university_cafeteria_db/
│
├── controllers/
│   ├── userController.js
│   ├── menuController.js
│   └── orderController.js
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   ├── User.js
│   ├── MenuItem.js
│   └── Order.js
│
├── routes/
│   ├── userRoutes.js
│   ├── menuRoutes.js
│   └── orderRoutes.js
│
├── frontend/
|    ├── public/
|    ├── src/
|    ├── .gitignore
|    ├── README.md
|    ├── eslint.config.js
|    ├── index.html
|    ├── package-lock.json
|    ├── package.json
|    ├── vite.config.js
|  
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## API Endpoints

Base URL: `http://localhost:8000/api`

---

### Users

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | /api/users     | Register a new user       |
| GET    | /api/users     | Get all users             |
| GET    | /api/users/:id | Get a specific user by ID |
| PUT    | /api/users/:id | Update user details       |
| DELETE | /api/users/:id | Delete a user account     |

**Register a New User**

Request:
```http
POST /api/users
Content-Type: application/json

{
  "name": "Hasini Peiris",
  "email": "hasini@university.lk",
  "role": "student",
  "studentId": "CS/2021/001"
}
```

Response `201 Created`:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "Hasini Peiris",
    "email": "hasini@university.lk",
    "role": "student",
    "studentId": "CS/2021/001",
    "createdAt": "2025-05-15T08:30:00.000Z"
  }
}
```

---

### Menu Items

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | /api/menu     | Add a new menu item      |
| GET    | /api/menu     | Get all menu items       |
| GET    | /api/menu/:id | Get a specific menu item |
| PUT    | /api/menu/:id | Update a menu item       |
| DELETE | /api/menu/:id | Remove a menu item       |

**Add a Menu Item**

Request:
```http
POST /api/menu
Content-Type: application/json

{
  "name": "Rice and Curry",
  "price": 250,
  "category": "Main Course",
  "available": true,
  "description": "Rice with dhal and three vegetable sides"
}
```

Response `201 Created`:
```json
{
  "success": true,
  "message": "Menu item added successfully",
  "data": {
    "_id": "664f1c3b4d5e6f7a8b9c0e1f",
    "name": "Rice and Curry",
    "price": 250,
    "category": "Main Course",
    "available": true
  }
}
```

**Get All Menu Items**

Request:
```http
GET /api/menu
```

Response `200 OK`:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "664f1c3b4d5e6f7a8b9c0e1f",
      "name": "Rice and Curry",
      "price": 250,
      "category": "Main Course",
      "available": true
    },
    {
      "_id": "664f1d4c5e6f7a8b9c0f2g3h",
      "name": "Egg Sandwich",
      "price": 120,
      "category": "Short Eats",
      "available": true
    }
  ]
}
```

---

### Orders

| Method | Endpoint        | Description                |
|--------|-----------------|----------------------------|
| POST   | /api/orders     | Place a new pre-order      |
| GET    | /api/orders     | Get all orders             |
| GET    | /api/orders/:id | Get a specific order by ID |
| PUT    | /api/orders/:id | Update order status        |
| DELETE | /api/orders/:id | Cancel an order            |

**Place an Order**

Request:
```http
POST /api/orders
Content-Type: application/json

{
  "userId": "664f1a2b3c4d5e6f7a8b9c0d",
  "items": [
    { "menuItemId": "664f1c3b4d5e6f7a8b9c0e1f", "quantity": 1 },
    { "menuItemId": "664f1d4c5e6f7a8b9c0f2g3h", "quantity": 2 }
  ],
  "pickupTime": "2025-05-15T12:30:00.000Z"
}
```

Response `201 Created`:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "_id": "664f2e5d6f7a8b9c0g1h2i3j",
    "orderId": "ORD-550e8400-e29b",
    "userId": "664f1a2b3c4d5e6f7a8b9c0d",
    "items": [
      { "menuItemId": "664f1c3b4d5e6f7a8b9c0e1f", "quantity": 1 },
      { "menuItemId": "664f1d4c5e6f7a8b9c0f2g3h", "quantity": 2 }
    ],
    "totalAmount": 490,
    "status": "pending",
    "pickupTime": "2025-05-15T12:30:00.000Z",
    "createdAt": "2025-05-15T08:45:00.000Z"
  }
}
```

**Update Order Status**

Request:
```http
PUT /api/orders/664f2e5d6f7a8b9c0g1h2i3j
Content-Type: application/json

{
  "status": "ready"
}
```

Response `200 OK`:
```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "_id": "664f2e5d6f7a8b9c0g1h2i3j",
    "status": "ready"
  }
}
```

---

## Setup Instructions

### Prerequisites

Ensure the following are installed before proceeding:

- Node.js v18 or higher — https://nodejs.org
- npm v9 or higher (included with Node.js)
- MongoDB — local installation or a MongoDB Atlas cloud cluster

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Hasini-Peiris/university_cafeteria_db.git
cd university_cafeteria_db
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env` file in the root directory of the project:

```bash
touch .env
```

Add the following variables to the `.env` file:

```
PORT=8000
MONGO_URL = "mongodb://localhost:27017/university_cafeteria_db"
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/university_cafeteria?retryWrites=true&w=majority
```

---

## How to Run the Project

### Start the Backend

Start the development server using the following command:

```bash
npm start
```

The server runs with nodemon, which automatically restarts on any file change. Once started, the terminal should display:

```
Server running on http://localhost:8000
MongoDB connected successfully
```

---

### Start the Frontend

Open a **new terminal**, navigate to the frontend folder, and run:

```bash
cd frontend
npm install
npm run dev
```

The React app launches at:

```
http://localhost:5173
```

> The frontend connects automatically to the backend at `http://localhost:8000/api` via the `VITE_API_URL` environment variable.

---

### Testing the API

Endpoints can be tested using any of the following tools:

- Postman — https://www.postman.com
- Insomnia — https://insomnia.rest
- curl (command line)

Example curl request:

```bash
curl http://localhost:8000/api/menu
```

---

## Environment Variables

### Backend — root `.env`

| Variable  | Description                   |
|-----------|-------------------------------|
| PORT      | Port the server listens on    |
| MONGO_URI | MongoDB connection string     |

### Frontend — `frontend/.env`

| Variable               | Description | Default       |
|------------------------|-------------|---------------|
| `REACT_APP_API_URL`    | Base URL of the backend API |

---

## System Summary

| Metric                  | Value                                        |
|-------------------------|----------------------------------------------|
| Total API Endpoints     |   15                                         |
| MongoDB Collections     |   3   — Users, Menu Items, Orders            |
| HTTP Methods            |   POST . GET . PUT . DELETE                  |
| Architecture            |   MVC (Model-View-Controller)                |
| Frontend Framework      | React.js v18                                 |
| Development Approach    | Vibe Coding — Cursor IDE + AI assistance     |
| Order Tracking Format   |   UUID   — `ORD-550e8400-e29b`               |
| Backend Port            |   8000                                       |
| Frontend Port           |   5173                                       |

---

## Future Enhancements

- JWT authentication and role-based authorization
- QR-code based order pickup verification
- Online payment gateway integration
- Email notifications for order readiness
- Admin analytics dashboard
- Mobile application support

---

## Author

Hasini Peiris

| Student ID     | 2022/ICT/12                                                |
| Module         | IT2234 — Web Services & Technology                         |
| Assignment     | ICA-03 . 2nd Year IT . 2025                                |
| GitHub         | https://github.com/Hasini-Peiris                           |
| Repository     | https://github.com/Hasini-Peiris/university_cafeteria_db   |

---

