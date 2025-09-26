import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Fetch animal by ID
const fetchAnimalById = async (id) => {
  const response = await axios.get(`http://localhost:8800/server/livestock/getliveStockById/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Update animal details
const updateAnimal = async ({ id, updatedAnimal }) => {
  const response = await axios.put(`http://localhost:8800/server/livestock/updateLivestock/${id}`, updatedAnimal, {
    withCredentials: true,
  });
  return response.data;
};

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    breed: "",
    age: "",
    healthStatus: "",
    vaccinationHistory: "",
  });

  // Fetch existing animal data
  const { data: animal, isLoading, isError } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => fetchAnimalById(id),
    enabled: !!id,
  });

  // Pre-fill form once data is fetched
  useEffect(() => {
    if (animal && animal.length > 0) {
      const data = animal[0];
      setFormData({
        type: data.type || "",
        breed: data.breed || "",
        age: data.age || "",
        healthStatus: data.healthStatus || "",
        vaccinationHistory: data.vaccinationHistory||"",
        
      });
    }
  }, [animal]);

  // Update mutation
  const { mutate: updateAnimalMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updateAnimal,
    onSuccess: () => {
      toast.success("Animal updated successfully!");
      navigate("/animals");
    },
    onError: (error) => {
      console.error("Error updating animal:", error);
      toast.error("Failed to update animal.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAnimalMutation({ id, updatedAnimal: formData });
  };

  if (isLoading) return <p>Loading animal details...</p>;
  if (isError) return <p>Error fetching animal details.</p>;

  return (
    <div className="details mx-auto p-3" style={{ width: "80vh", maxWidth: "100%" }}>
      <h2 className="text-xl font-semibold mb-3">Edit Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Animal Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Breed</label>
          <input
            type="text"
            className="form-control"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Health Status</label>
          <input
            type="text"
            className="form-control"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
  <label>Vaccination History</label>
  <textarea
    type="text"
    className="form-control"
    name="vaccinationHistory"
    value={formData.vaccinationHistory}
    onChange={handleChange}
  />
</div>

        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditAnimal;
