import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";

const BooksTable = ({ books }) => {
  return (
    <table className="table-striped table table-md my-4">
      <thead className="">
        <tr>
          <th className="border fs-5 text-center">No</th>
          <th className="border fs-5 text-center">Title</th>
          <th className="border fs-5 text-center">Author</th>
          <th className="border fs-5 text-center">Publish Year</th>
          <th className="border fs-5 text-center">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="">
            <td className="border fs-5 text-center"> {index + 1}</td>
            <td className="border fs-5 text-center"> {book.title}</td>
            <td className="border fs-5 text-center"> {book.author}</td>
            <td className="border fs-5 text-center"> {book.publishyear}</td>

            <td className="border fs-5 text-center">
              <div className="d-flex justify-content-center gap-x-4 align-items-center">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="mx-3" />
                </Link>

                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="mx-3" />
                </Link>

                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="mx-3" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
