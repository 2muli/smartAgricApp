import { db } from "../connectdb.js";

export const addFertilizer = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { Name, boughtQuantity, boughtDate, appliedDate, appliedQuantity } = req.body;
    const user_id = req.user.id;

    if (!Name || !boughtQuantity || !boughtDate || !appliedDate || !appliedQuantity || !user_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
        INSERT INTO fertilizer 
        (farmerId, Name, boughtQuantity, boughtDate, appliedDate, appliedQuantity, createdAt) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(query, [user_id, Name, boughtQuantity, boughtDate, appliedDate, appliedQuantity], (err, result) => {
        if (err) {
            console.error("Error adding fertilizer:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Fertilizer record added successfully" });
    });
};

export const getMyFertilizers = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found." });
    }

    const user_id = req.user.id;
    const q = "SELECT * FROM fertilizer WHERE farmerId = ? ORDER BY boughtDate DESC";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching fertilizer records." });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No fertilizer records found." });
        }

        return res.status(200).json(result);
    });
};

export const updateFertilizer = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { Name, boughtQuantity, boughtDate, appliedDate, appliedQuantity } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    const checkQuery = "SELECT farmerId FROM fertilizer WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error verifying fertilizer ownership!" });
        if (result.length === 0) return res.status(404).json({ message: "Fertilizer record not found!" });

        if (result[0].farmerId !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own fertilizer records!" });
        }

        const updateQuery = `
            UPDATE fertilizer 
            SET Name = ?, boughtQuantity = ?, boughtDate = ?, appliedDate = ?, appliedQuantity = ? 
            WHERE id = ?
        `;
        db.query(updateQuery, [Name, boughtQuantity, boughtDate, appliedDate, appliedQuantity, id], (updateErr) => {
            if (updateErr) return res.status(500).json({ message: "Error occurred during fertilizer update!" });
            return res.status(200).json({ message: "Fertilizer record updated successfully!" });
        });
    });
};
export const deleteFertilizer = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const user_id = req.user.id;

    const checkQuery = "SELECT farmerId FROM fertilizer WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error verifying fertilizer ownership!" });
        if (result.length === 0) return res.status(404).json({ message: "Fertilizer record not found!" });

        if (result[0].farmerId !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own fertilizer records!" });
        }

        const deleteQuery = "DELETE FROM fertilizer WHERE id = ?";
        db.query(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json({ message: "Error occurred during fertilizer deletion!" });
            return res.status(200).json({ message: "Fertilizer record deleted successfully!" });
        });
    });
};

export const getMyFertilizerNumber = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const user_id = req.user.id;
    const q = "SELECT COUNT(*) as fertilizerNumber FROM fertilizer WHERE farmerId = ?";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Error occurred during fertilizer count fetching:", err);
            return res.status(500).json({ message: "Error occurred during fertilizer fetching!" });
        }

        return res.status(200).json(result[0]);
    });
};
