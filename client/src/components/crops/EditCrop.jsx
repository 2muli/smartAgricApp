import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Fetch crop by ID
const fetchCropById = async (id) => {
  const response = await axios.get(`http://localhost:8800/server/crops/getCropById/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Update crop details
const updateCrop = async ({ id, updatedCrop }) => {
  const response = await axios.put(`http://localhost:8800/server/crops/updateCrop/${id}`, updatedCrop, {
    withCredentials: true,
  });
  return response.data;
};

const EditCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropType: "",
    plantingDate: "",
    harvestDate: "",
    yields: "",
  });

  // Get crop details
  const { data: crop, isLoading, isError } = useQuery({
    queryKey: ["crop", id],
    queryFn: () => fetchCropById(id),
    enabled: !!id,
  });

  // Set form fields when crop data is fetched
  useEffect(() => {
    if (crop && crop.length > 0) {
      const cropData = crop[0];
      setFormData({
        cropType: cropData.cropType || "",
        plantingDate: cropData.plantingDate ? cropData.plantingDate.slice(0, 10) : "",
        harvestDate: cropData.harvestDate ? cropData.harvestDate.slice(0, 10) : "",
        yields: cropData.yields || "",
      });
    }
  }, [crop]);

  const { mutate: updateCropMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updateCrop,
    onSuccess: () => {
      alert("Crop updated successfully!");
      navigate("/crops");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      alert("Failed to update crop.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCropMutation({ id, updatedCrop: formData });
  };

  if (isLoading) return <p>Loading crop details...</p>;
  if (isError) return <p>Error fetching crop details.</p>;

  return (
    <div
      className="details mx-auto p-3"
      style={{
        width: "80vh",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2 className="text-xl font-semibold mb-3">Edit Crop</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Crop Type</label>
          <input
            type="text"
            className="form-control"
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Planting Date</label>
          <input
            type="date"
            className="form-control"
            name="plantingDate"
            value={formData.plantingDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Harvest Date</label>
          <input
            type="date"
            className="form-control"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Yields</label>
          <input
            type="text"
            className="form-control"
            name="yields"
            value={formData.yields}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditCrop;
