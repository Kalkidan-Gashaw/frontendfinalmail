import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/Home/BackButton";
import { useState } from "react";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .delete(`https://backendfinalmail.onrender.com/books/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="p-4 d-flex align-items-center justify-content-center container style=height: 100vh flex-column display-4 mb-5">
        Loading...
      </div>
    );
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Delete Book</h1>
      <div className="d-flex flex-column flex-justify-center border border-danger rounded-xl p-5">
        <h5 className="display-5 my-5 text-center">
          Are You Sure You Want to delete this book?
        </h5>

        <button
          className="p-4 btn btn-danger text-white m-8"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
