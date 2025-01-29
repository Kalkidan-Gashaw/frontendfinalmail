import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/Home/BackButton";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishYear] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleSaveBook = async () => {
    const token = localStorage.getItem("token");

    if (!title || !author || !publishyear) {
      enqueueSnackbar("Please fill in all fields.", {
        variant: "error",
      });
      return;
    }

    const data = {
      title,
      author,
      publishyear,
    };
    setLoading(true);
    axios
      .post("https://backendfinalmail.onrender.com/books", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error creating book: ", error);
        enqueueSnackbar("An error occurred. Please try again.", {
          variant: "error",
        });
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
    <div className="p-4 d-flex align-items-center justify-content-center container style=height: 100vh flex-column log bg-light">
      <BackButton />
      <h1 className="my-4">Create Book</h1>
      <div className="p-4">
        <label className="mx-4">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mx-4 px-4 py-2"
        />
      </div>
      <div className="my-4">
        <label className="mx-4">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mx-4 px-4 py-2"
        />
      </div>
      <div className="my-4">
        <label className="mx-2">Publish Year</label>
        <input
          type="number"
          value={publishyear}
          onChange={(e) => setPublishYear(e.target.value)}
          className="mx-4 px-4 py-2"
        />
      </div>

      <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>
        Save
      </button>
    </div>
  );
};

export default CreateBooks;
