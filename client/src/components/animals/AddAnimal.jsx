import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const AddAnimal = () => {
  const { userDetails, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    breed: "",
    age: "",
    healthStatus: "",
    vaccinationHistory: "",
  });

  // Redirect if not authenticated
  if (!userDetails) {
    logout();
    navigate("/login");
    return null;
  }

  // Handle field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/server/livestock/addLivestock",
        { ...formData, farmerId: userDetails.id },
        { withCredentials: true }
      );
      toast.success("Animal added successfully!");
      navigate("/animals"); // Redirect to animal list
    } catch (error) {
      console.error("Error adding animal:", error);
      toast.error("Failed to add animal.");
    }
  };

  return (
    <div
      className="details mx-auto p-3"
      style={{
        width: "80vh",
        maxWidth: "100%",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 2rem)",
      }}
    >
      <h2 className="text-xl font-semibold mb-3">Add Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="type">Animal Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            placeholder="e.g., Cow"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            className="form-control"
            id="breed"
            name="breed"
            placeholder="e.g., Friesian"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            placeholder="e.g., 3"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="healthStatus">Health Status</label>
          <input
            type="text"
            className="form-control"
            id="healthStatus"
            name="healthStatus"
            placeholder="e.g., Healthy"
            value={formData.healthStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="vaccinationHistory">Vaccination History</label>
          <textarea
            className="form-control"
            id="vaccinationHistory"
            name="vaccinationHistory"
            placeholder="e.g., Vaccinated for FMD"
            value={formData.vaccinationHistory}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-2"
        >
          Save Animal
        </button>
      </form>
    </div>
  );
};

export default AddAnimal;
