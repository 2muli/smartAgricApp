import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const AddCrop = () => {
  const { userDetails, logout } = useAuth(); // ✅ Get logged-in farmer details
  const navigate = useNavigate();

  // 🌱 Form State
  const [formData, setFormData] = useState({
    crop_name: "",
    quantity: "",
    location: "",
    price: "",
    harvest_date: "",
  });

  // ✅ Ensure the user is logged in
  if (!userDetails) {
    logout();
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🌱 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/server/crops/addCrop",
        { ...formData, farmer_id: userDetails.id }, // ✅ Attach Farmer ID
        { withCredentials: true }
      );
      toast.success("Produce added successfully!");
      navigate("/crops"); // Redirect back to the produce list
    } catch (error) {
      console.error("Failed to add produce:", error);
      toast.error("Error adding produce.");
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
        <h2 className="text-xl font-semibold mb-3">Add Crop</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email1">Crop Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="type like maize"
              name='cropType'
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email2">Planting Date</label>
            <input
              type="date"
              className="form-control"
              name="plantingDate"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email3">Harveting Date</label>
            <input
              type="date"
              className="form-control"
              name='harvestDate'
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email4">Yield</label>
            <input
              type="text"
              className="form-control"
              placeholder="like 2kg"
              name='yields'
              onChange={handleChange}

            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
          >
            Save 
          </button>
        </form>
      </div>
    );
  };
  
  export default AddCrop;
  