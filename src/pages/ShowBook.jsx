import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/Home/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
// To track if the user is authorized to view the book

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      navigate("/");
      return;
    }

    setLoading(true);
    axios
      .get(`https://backendfinalmail.onrender.com/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchedBook = res.data;
        console.log(fetchedBook);
        setBook(fetchedBook);

        // // Check if the book belongs to the logged-in user
        // const userId = JSON.parse(atob(token.split(".")[1])).id; // Decode the token to get userId
        // if ((fetchedBook.id = userId)) {
        //   setAuthorized(false);
        //   navigate("/unauthorized"); // Redirect to an unauthorized page
        // } else {
        //   setBook(fetchedBook);
        // }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="p-4 d-flex align-items-center justify-content-center vh-100">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="p-4 d-flex align-items-center justify-content-center vh-100">
        <h2>You are not authorized to view this book.</h2>
      </div>
    );
  }

  return (
    <div className="m-4 p-4 d-flex align-items-center justify-around container flex-column">
      <BackButton />
      <h1 className="my-4">Show Book</h1>
      <div className="border border- rounded rounded-xl p-4">
        <div className="my-4">
          <span className="border p-1 rounded mx-2">Id</span>
          <span>: {book._id}</span>
        </div>
        <div className="my-4">
          <span className="border p-1 rounded mx-2">Title</span>
          <span>: {book.title}</span>
        </div>
        <div className="my-4">
          <span className="border p-1 rounded mx-2">Author</span>
          <span>: {book.author}</span>
        </div>
        <div className="my-4">
          <span className="border p-1 rounded mx-2">Publish Year</span>
          <span>: {book.publishyear}</span>
        </div>
        <div className="my-4">
          <span className="border p-1 rounded mx-2">Create Time</span>
          <span>: {new Date(book.createdAt).toLocaleString()}</span>
        </div>
        <div className="my-4">
          <span className="border p-1 rounded mx-2">Last Update Time</span>
          <span>: {new Date(book.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
