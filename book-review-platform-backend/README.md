# Book Review Platform Backend

## Overview

This is the backend for the Book Review Platform, a project built as part of a 48-hour assignment. The platform allows users to register, log in, add books, write and view reviews, and see average ratings for each book. The backend is built with Node.js, Express, and MongoDB.

---

## Features

- User registration and login (JWT authentication)
- Add new books (title, author, genre)
- View a paginated and filterable list of all books
- View book details, including all reviews and average rating
- Add reviews and ratings (1-5 stars) to any book
- See average rating per book on both list and detail pages
- Secure routes: only logged-in users can add books or reviews

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Cookie-based session for tokens

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd book-review-platform-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ACCESS_TOKEN_SECRET=<your-access-token-secret>
     REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
     CORS_ORIGIN=http://localhost:5173
     PORT=8000
     ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8000` by default.

---

## API Endpoints

### Auth & User
- `POST /api/v1/users/register` — Register a new user
- `POST /api/v1/users/login` — Login and receive tokens
- `POST /api/v1/users/logout` — Logout (requires authentication)
- `POST /api/v1/users/refresh-token` — Refresh access token
- `GET /api/v1/users/me` — Get current user info (requires authentication)
- `POST /api/v1/users/update-password` — Change password (requires authentication)
- `PATCH /api/v1/users/update-account` — Update account details (requires authentication)

### Books
- `GET /api/v1/books` — List all books (supports `author`, `genre`, `page`, `limit` as query params)
- `GET /api/v1/books/:id` — Get book details (includes reviews and average rating)
- `POST /api/v1/books` — Add a new book (requires authentication)

### Reviews
- `GET /api/v1/books/:bookId/reviews` — List all reviews for a book
- `POST /api/v1/books/:bookId/reviews` — Add a review to a book (requires authentication)

---

## Architecture Decisions

- **Separation of Concerns:** Controllers, models, and routes are organized by feature for clarity and maintainability.
- **JWT Authentication:** Used for stateless, secure authentication. Refresh tokens are stored in the database for added security.
- **MongoDB:** Chosen for its flexibility and ease of use with Mongoose ODM.
- **Validation:** All required fields are validated on the backend. Ratings are strictly between 1 and 5.
- **RESTful API:** Endpoints follow REST conventions for clarity and frontend compatibility.

---
