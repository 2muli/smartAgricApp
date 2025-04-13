import { db } from "../connectdb.js";
export const addCrop = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { cropType, plantingDate, harvestDate, yields } = req.body;
    const user_id = req.user.id;

    if (!cropType || !plantingDate || !harvestDate || !yields || !user_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
        INSERT INTO crops 
        (farmerId, cropType, plantingDate, harvestDate, yields) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [user_id, cropType, plantingDate, harvestDate, yields], (err, result) => {
        if (err) {
            console.error("Error adding produce:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Produce added successfully" });
    });
};
export const getMyCrops = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found." });
    }

    const user_id = req.user.id;
    const q = "SELECT * FROM crops WHERE farmerId = ? ORDER BY cropType";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching crops.", error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No crops found for this user." });
        }

        return res.status(200).json(result);
    });
};

export const updateCrop = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user information found" });
    }
  
    const { cropType, plantingDate, harvestDate, yields } = req.body; // 'yields' must match frontend key
    const { id } = req.params;
    const user_id = req.user.id;
  
    const checkQuery = "SELECT farmerId FROM crops WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error verifying crop ownership!" });
      if (result.length === 0) return res.status(404).json({ message: "Crop not found!" });
  
      if (result[0].farmerId !== user_id) {
        return res.status(403).json({ message: "Unauthorized: You can only update your own crops!" });
      }
  
      const updateQuery = `
        UPDATE crops SET cropType = ?, plantingDate = ?, harvestDate = ?, yields = ? 
        WHERE id = ?
      `;
  
      db.query(updateQuery, [cropType, plantingDate, harvestDate, yields, id], (updateErr) => {
        if (updateErr) return res.status(500).json({ message: "Error occurred during crop update!" });
        return res.status(200).json({ message: "Crop updated successfully!" });
      });
    });
  };
  
export const deleteCrop = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const user_id = req.user.id;

    // First, check if the crop exists and belongs to the logged-in user
    const checkQuery = "SELECT farmerId FROM crops WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error verifying crop ownership!" });
        if (result.length === 0) return res.status(404).json({ message: "Crop not found!" });

        // Verify ownership
        if (result[0].farmerId !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own crops!" });
        }

        // Proceed with deletion
        const deleteQuery = "DELETE FROM crops WHERE id = ?";
        db.query(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json({ message: "Error occurred during crop deletion!" });
            return res.status(200).json({ message: "Crop deleted successfully!" });
        });
    });
};

export const getMyCropNumber = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const user_id = req.user.id;
    const q = "SELECT COUNT(*) as cropNumber FROM crops WHERE farmerId = ?";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Error occurred during crop count fetching:", err);
            return res.status(500).json({ message: "Error occurred during crop fetching!" });
        }

        return res.status(200).json(result[0]); // Return only the count object
    });
};
// export const getCropByid = async (req, res) => {
//     const { id } = req.params;
//     const q = "SELECT * FROM crops WHERE id = ?";
//     try {
//         db.query(q, [id], (err, result) => {
//             if (err) return res.status(500).json("Error occurred during crop fetching!");
//             return res.status(200).json(result);
//         });
//     } catch (error) {
//         console.log("Error occurred during crop fetching: ", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
export const getCropByid = async (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM crops WHERE id = ?";
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json("Error occurred during crop fetching!");
      return res.status(200).json(result);
    });
  };
