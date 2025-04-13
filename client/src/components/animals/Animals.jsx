import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchAnimals = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8800/server/livestock/getLivestock",
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Return empty array on 404
    } else {
      throw error; // Rethrow for other errors
    }
  }
};

const deleteLivestock = async (id) => {
  await axios.delete(
    `http://localhost:8800/server/livestock/deleteLivestock/${id}`,
    {
      withCredentials: true,
    }
  );
};

const Animals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: livestocks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["livestocks"],
    queryFn: fetchAnimals,
  });

  const { mutate: deleteLivestockMutation, isLoading: isDeleting } =
    useMutation({
      mutationFn: deleteLivestock,
      onSuccess: () => {
        queryClient.invalidateQueries(["livestocks"]);
        alert("Crop deleted successfully!");
      },
      onError: (error) => {
        console.error("Error deleting crop:", error);
        alert("Failed to delete crop.");
      },
    });

  if (isLoading) return <span>Loading livestocks...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  // Pagination Logic
  const rowsPerPage = 10;
  const totalPages = Math.ceil((livestocks?.length || 0) / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = livestocks.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <div className="pagetitle">
        <h1>Animals</h1>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Link to="/addLivestock">
          <button className="btn btn-success bi bi-plus">Add Animal</button>
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Animal Type</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Health Status</th>
            <th>Vaccination History</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={row.id}>
                <th>{index + 1}</th>
                <td>{row.type}</td>
                <td>{row.breed}</td>
                <td>{row.age}</td>
                <td>{row.healthStatus}</td>
                <td>{row.vaccinationHistory}</td>
                <td>
                  <div className="d-flex flex-row justify-content-start">
                    <Link to={`/editLivestock/${row.id || "#"}`}>
                      <button className="btn btn-primary btn-sm me-2">
                        <i className="d-none d-sm-inline bi bi-pencil"></i> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteLivestockMutation(row.id)}
                      className="btn btn-danger btn-sm"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No crop found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((num) => (
              <li
                key={num}
                className={`page-item ${
                  currentPage === num + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Animals;
