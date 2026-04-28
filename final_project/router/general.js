const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios"); // Required for Tasks 10-13

// Task 6: Register new user (Ye code general.js me update karein)
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });

      // Yahan json response me 'data' add kar diya gaya hai
      return res.status(200).json({
        message: "User successfully registered. Now you can login",
        data: {
          username: username,
          password: password,
        },
      });
    } else {
      return res.status(400).json({ message: "User already exists!" });
    }
  }
  return res.status(400).json({
    message: "Unable to register user. Username and password are required.",
  });
});

// ========================================================
// TASKS 1-4 CONVERTED TO TASKS 10-13 (PROMISES & ASYNC/AWAIT)
// ========================================================

// Task 1 & 10: Get the book list available in the shop using Promises
public_users.get("/", function (req, res) {
  let getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });

  getBooks
    .then((bks) => {
      return res.status(200).send(JSON.stringify(bks, null, 4));
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error fetching books" });
    });
});

// Task 2 & 11: Get book details based on ISBN using Promises
public_users.get("/isbn/:isbn", function (req, res) {
  let getBookByISBN = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBookByISBN
    .then((book) => {
      return res.status(200).json(book);
    })
    .catch((err) => {
      return res.status(404).json({ message: err });
    });
});

// Task 3 & 12: Get book details based on author using Async/Await
public_users.get("/author/:author", async function (req, res) {
  try {
    const author = req.params.author;
    const booksByAuthor = await new Promise((resolve, reject) => {
      let result = [];
      for (let key in books) {
        if (books[key].author === author) {
          result.push(books[key]);
        }
      }
      if (result.length > 0) {
        resolve(result);
      } else {
        reject("Author not found");
      }
    });
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Task 4 & 13: Get all books based on title using Async/Await
public_users.get("/title/:title", async function (req, res) {
  try {
    const title = req.params.title;
    const booksByTitle = await new Promise((resolve, reject) => {
      let result = [];
      for (let key in books) {
        if (books[key].title === title) {
          result.push(books[key]);
        }
      }
      if (result.length > 0) {
        resolve(result);
      } else {
        reject("Title not found");
      }
    });
    return res.status(200).json(booksByTitle);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// // Task 1: Get the book list available in the shop
// public_users.get("/", function (req, res) {
//   res.send(JSON.stringify(books, null, 4));
// });

// // Task 2: Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   const isbn = req.params.isbn;
//   if (books[isbn]) {
//     return res.status(200).json(books[isbn]);
//   } else {
//     return res.status(404).json({ message: "Book not found" });
//   }
// });

// // Task 3: Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   const author = req.params.author;
//   let booksByAuthor = [];
//   for (let key in books) {
//     if (books[key].author === author) {
//       booksByAuthor.push(books[key]);
//     }
//   }
//   if (booksByAuthor.length > 0) {
//     return res.status(200).json(booksByAuthor);
//   } else {
//     return res.status(404).json({ message: "Author not found" });
//   }
// });

// // Task 4: Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   const title = req.params.title;
//   let booksByTitle = [];
//   for (let key in books) {
//     if (books[key].title === title) {
//       booksByTitle.push(books[key]);
//     }
//   }
//   if (booksByTitle.length > 0) {
//     return res.status(200).json(booksByTitle);
//   } else {
//     return res.status(404).json({ message: "Title not found" });
//   }
// });

// Task 5: Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// ========================================================
// TASKS 10 - 13: Using Promises & Async/Await with Axios
// ========================================================

// Task 10: Get all books using Async/Await
public_users.get("/async-get-books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 11: Get book details by ISBN using Promises
public_users.get("/promise-isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  axios
    .get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching book details" });
    });
});

// Task 12: Get book details by Author using Async/Await
public_users.get("/async-author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details by author" });
  }
});

// Task 13: Get book details by Title using Async/Await
public_users.get("/async-title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details by title" });
  }
});

module.exports.general = public_users;
