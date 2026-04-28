# Online Book Review Application 📚

A RESTful backend web service built with Node.js and Express.js for an online bookshop. This server-side application allows users to browse a collection of books, view reviews, and manage their own book reviews securely using Session and JWT (JSON Web Token) authentication.

## 🚀 Features

### General Users (Public Access)

- Retrieve a complete list of all available books.
- Search for books by **ISBN**.
- Search for books by **Author** name.
- Search for books by **Title**.
- Fetch and read reviews for any specific book.
- Register as a new user.

### Registered Users (Authenticated Access)

- Secure login using JWT and Express Session.
- Add a new review for a book.
- Modify an existing review (users can only modify their own reviews).
- Delete a review (users can only delete their own reviews).

### Advanced Implementations

- Utilizes **Promises** and **Async/Await** with `axios` for fetching book data seamlessly, demonstrating non-blocking asynchronous programming in Node.js.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the RESTful APIs.
- **JSON Web Token (JWT)**: For secure API authentication and user validation.
- **Express-Session**: For maintaining user login sessions.
- **Axios**: Promise-based HTTP client for the Async/Await implementations.

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/alihassandevnext/expressBookReviews
   cd final_project
   ```

````

2. **Install the dependencies**

   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node index.js
   ```
   The server will start running on `http://localhost:5000`.

## 📡 API Endpoints

### Public Routes

- `GET /` : Get all books
- `GET /isbn/:isbn` : Get book details by ISBN
- `GET /author/:author` : Get book details by Author
- `GET /title/:title` : Get book details by Title
- `GET /review/:isbn` : Get book reviews by ISBN
- `POST /register` : Register a new user

### Authenticated Routes (Requires Login)

- `POST /customer/login` : Login as a registered user
- `PUT /customer/auth/review/:isbn` : Add or modify a review
- `DELETE /customer/auth/review/:isbn` : Delete a review

### Async/Await & Promise Routes (Tasks 10-13)

- `GET /async-get-books` : Get all books using Async/Await
- `GET /promise-isbn/:isbn` : Get book by ISBN using Promises
- `GET /async-author/:author` : Get book by Author using Async/Await
- `GET /async-title/:title` : Get book by Title using Async/Await

## 👨‍💻 Developer

Developed as a final project for the IBM Full-Stack Web Development Course.

```

```
````
