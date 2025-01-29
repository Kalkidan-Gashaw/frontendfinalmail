import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import BooksTable from "../components/Home/BooksTable";
import "../App.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  // const usernameLocal = localStorage.getItem("User");
  const token = localStorage.getItem("token");

  // Redirect to login page if no token is present
  if (!token) {
    navigate("/");
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("https://backendfinalmail.onrender.com/books", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token with the request
        },
      })

      .then((res) => {
        setBooks(res.data.data);
        console.log("data", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div className="d-flex align-items-center justify-content-center container p-4 style=height: 100vh flex-column">
      <div className="flex justify-between items-center">
        <h1 className="lead display-4 mt-5">Books List</h1>
        <Link to="/books/create">
          <CiSquarePlus className="display-5" />
        </Link>
        <span className="mx-2 fs-4">Welcome!</span>
      
        <button className="btn btn-primary my-3" onClick={handleLogOut}>
          Log Out
        </button>
      </div>

      <BooksTable books={books} />
    </div>
  );
};

export default Home;
