import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const fetchCrops = async () => {
  try {
    const response = await axios.get('http://localhost:8800/server/crops/getCrop', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Return empty array if no crops found
    } else {
      throw error;
    }
  }
};

const deleteCrop = async (id) => {
  await axios.delete(`http://localhost:8800/server/crops/deleteCrop/${id}`, {
    withCredentials: true,
  });
};

const Crops = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: crops = [], isLoading, isError, error } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });

  const { mutate: deleteCropMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries(['crops']);
      toast.success('Crop deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting crop:', error);
      toast.error('Failed to delete crop.');
    },
  });

  if (isLoading) return <span>Loading crops...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const rowsPerPage = 10;
  const totalPages = Math.ceil(crops.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = crops.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="min-h-[calc(100vh-2rem)]">
      <div className="page-title">
        <h1>Crops</h1>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Link to="/addCrop">
          <button className="btn btn-success bi bi-plus">Add Crop</button>
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Crop Type</th>
            <th>Planting Date</th>
            <th>Harvest Date</th>
            <th>Yield</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={row.id}>
                <th>{index + 1}</th>
                <td>{row.cropType}</td>
                <td>{row.plantingDate}</td>
                <td>{row.harvestDate}</td>
                <td>{row.yields}</td>
                <td>
                  <div className="d-flex flex-row justify-content-start">
                    <Link to={`/editCrop/${row.id || "#"}`}>
                      <button className="btn btn-primary btn-sm me-2">
                        <i className="d-none d-sm-inline bi bi-pencil"></i> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteCropMutation(row.id)}
                      className="btn btn-danger btn-sm"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No Crop found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages).keys()].map((num) => (
              <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Crops;
