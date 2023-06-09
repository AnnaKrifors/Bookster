import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "./BookList";
import LogOutBtn from "./LogOutBtn";
import { buildFetchOptions } from "../util";
import "../stylesheet/pages/_AdminView.scss";

//handles the functionality to add a new book to the existing API using a helper function to check your role
function AdminBooks({ setUsername, setLoggedIn }) {
  const navigate = useNavigate();
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookQuantity, setNewBookQuantity] = useState("");

  const handleAddNewBook = async () => {
    try {
      const body = {
        title: newBookTitle,
        author: newBookAuthor,
        quantity: newBookQuantity,
      };
      const options = buildFetchOptions(body, "POST");
      const response = await fetch("http://localhost:3000/admin/books", options);

      if (response.ok) {
        // Book added successfully to the fetched route
        console.log("New book added successfully");
        // Resets the input fields
        setNewBookTitle("");
        setNewBookAuthor("");
        setNewBookQuantity("");
      } else {
        console.log("Error adding new book");
      }
    } catch (error) {
      console.log("Error adding new book:", error);
    }
  };

  return (
    <div className="admin-books-container">
      <header>
        <h2>Welcome Admin, {localStorage.getItem("username")}!</h2>
        <LogOutBtn setUsername={setUsername} setLoggedIn={setLoggedIn} />
      </header>
      <div>
        <div className="input-container">
          <input
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            placeholder="Book Title"
          />
          <input
            type="text"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            placeholder="Author"
          />
          <input
            type="number"
            value={newBookQuantity}
            onChange={(e) => setNewBookQuantity(parseInt(e.target.value))}
            placeholder="Quantity"
          />
          <button onClick={handleAddNewBook}>Add New Book</button>
        </div>
        <div className="input-container-btns">
          <button onClick={() => {sessionStorage.removeItem("version"); navigate("/books")}}>Books</button>
          <button onClick={() => navigate("/admin/users")}>Users</button>
        </div>
      </div>
      <BookList loggedIn={true} onPurchase={() => {}} />
    </div>
  );
}

export default AdminBooks;