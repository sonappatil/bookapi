# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows users to register, log in, add books, submit reviews, and search for books.

---

## 🚀 Features

- 🔐 User Authentication with JWT
- 📚 Book Management
  - Add new books
  - Fetch book details with reviews and average rating
  - Filter by author or genre
- ✍️ Review System
  - One review per user per book
  - Update and delete your own reviews
- 🔎 Search books by title or author (case-insensitive, partial match)
- 🔁 Pagination support on book and review listings

---

## 🛠 Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration

---

## 📂 Project Structure

book-review-api/
 ├── src
     ├── controllers/ # Route Handlers
     │ ├── authController.js
     │ ├── bookController.js
     │ └── reviewController.js
     ├── models/ # Mongoose Schemas
     │ ├──  User.js
     │ ├── Book.js
     │ └── Review.js
     ├── routes/ # Express Routers
     │ ├── authRoutes.js
     │ ├── bookRoutes.js
     │ └── reviewRoutes.js
     ├── middlewares/ # JWT auth middleware
     │ └── authMiddleware.js
     ├── server.js # Entry Point
     ├── config.js # Config Loader
└── README.md
├── .env # Environment Variables

📦 Setup Instructions
1. Clone the repo
1. git clone https://github.com/sonappatil/bookapi.git
2. cd book-review-api
3. cd src

2. Install dependencies
1. npm install

3. Set up .env file
   Create a .env file in the root directory and add values as shown above.

4. Start MongoDB
   Make sure MongoDB is running locally or provide a connection string to a remote cluster.

5. Start the server
npm run dev
OR
node server.js

📬 API Endpoints
🔐 Authentication
1. POST /api/signup – Register a new user
2. POST /api/login – Login and receive a JWT token

📚 Books
1. POST /api/books/postbook – Add a new book (auth required)
2. GET /api/books/ – Get all books (pagination, filter by author or genre)
3. GET /api/books/:id – Get details of a book (includes average rating + paginated reviews)

✍️ Reviews
1. POST /api/books/:id/reviews – Submit a review for a book (auth required, one per book per user)
2. PUT /api/reviews/:id – Update your own review
3. DELETE /api/reviews/:id – Delete your own review

🔍 Search
1. GET /api/books/search?query=harry – Search books by title or author (case-insensitive, partial match)
