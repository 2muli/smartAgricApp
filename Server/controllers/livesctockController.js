import { db } from "../connectdb.js";


export const addLivestock = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { type, breed, age, healthStatus, vaccinationHistory } = req.body;
    const user_id = req.user.id;

    if (!type || !breed || !age || !healthStatus || !vaccinationHistory || !user_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
        INSERT INTO livestock 
        (farmerId, type, breed, age, healthStatus, vaccinationHistory) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [user_id, type, breed, age, healthStatus, vaccinationHistory], (err, result) => {
        if (err) {
            console.error("Error adding livestock:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Livestock added successfully" });
    });
};

export const getMyLivestock = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found." });
    }

    const user_id = req.user.id;
    const q = "SELECT * FROM livestock WHERE farmerId = ? ORDER BY type ASC";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching livestock.", error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No livestock found for this user." });
        }

        return res.status(200).json(result);
    });
};


export const updateLivestock = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { type, breed, age, healthStatus, vaccinationHistory } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    const checkQuery = "SELECT farmerId FROM livestock WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error verifying livestock ownership!" });
        if (result.length === 0) return res.status(404).json({ message: "Livestock not found!" });

        if (result[0].farmerId !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own livestock!" });
        }

        const updateQuery = `
            UPDATE livestock SET type = ?, breed = ?, age = ?, healthStatus = ?, vaccinationHistory = ? 
            WHERE id = ?
        `;
        db.query(updateQuery, [type, breed, age, healthStatus, vaccinationHistory, id], (updateErr) => {
            if (updateErr) return res.status(500).json({ message: "Error occurred during livestock update!" });
            return res.status(200).json({ message: "Livestock updated successfully!" });
        });
    });
};


export const deleteLivestock = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const user_id = req.user.id;

    const checkQuery = "SELECT farmerId FROM livestock WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error verifying livestock ownership!" });
        if (result.length === 0) return res.status(404).json({ message: "Livestock not found!" });

        if (result[0].farmerId !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own livestock!" });
        }

        const deleteQuery = "DELETE FROM livestock WHERE id = ?";
        db.query(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json({ message: "Error occurred during livestock deletion!" });
            return res.status(200).json({ message: "Livestock deleted successfully!" });
        });
    });
};


export const getMyLivestockNumber = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const user_id = req.user.id;
    const q = "SELECT COUNT(*) as livestockNumber FROM livestock WHERE farmerId = ?";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Error occurred during livestock count fetching:", err);
            return res.status(500).json({ message: "Error occurred during livestock fetching!" });
        }

        return res.status(200).json(result[0]);
    });
};
export const getLiveStockById = async (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM livestock WHERE id = ?";
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).json("Error occurred during crop fetching!");
      return res.status(200).json(result);
    });
  };
