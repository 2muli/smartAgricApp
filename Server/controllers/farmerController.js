import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "../connectdb.js";

dotenv.config();


export const register = (req, res) => {
  try {
    const { firstName, secondName, email, contact, password, location } = req.body;

    const checkQuery = "SELECT * FROM users WHERE email = ? OR contact = ?";
    db.query(checkQuery, [email, contact], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Error occurred!" });
      }

      if (results.length > 0) {
        const existingUser = results[0];
        if (existingUser.email === email) {
          return res.status(400).json({ field: "email", message: "Email already taken" });
        }
        if (existingUser.contact === contact) {
          return res.status(400).json({ field: "contact", message: "Phone number already taken" });
        }
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const insertQuery = `
        INSERT INTO users (firstName, secondName, email, contact, password, location)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(insertQuery, [firstName, secondName, email, contact, hashedPassword, location], (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ message: "Registration failed" });
        }
        return res.status(200).json({ message: "User registered successfully!" });
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
  export const login = (req, res) => {
    try {
        const q = "SELECT * FROM users WHERE contact = ?";
        db.query(q, [req.body.contact], async (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "An error occurred while accessing the database." });
            }

            if (data.length === 0) {
                return res.status(404).json({ message: "User not found!" });
            }

            const user = data[0];
            const checkPassword = await bcrypt.compare(req.body.password, user.password);
            if (!checkPassword) {
                return res.status(401).json({ message: "Wrong phone number or password!" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            // Set the token in cookies
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure you use https in production
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
            });

            const { password, ...otherDetails } = user;
            return res.status(200).json({ token, details: { ...otherDetails } });
        });
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
};

  export const LoggedUserDetails = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) => {
            if (err) {
                console.error("❌ Error fetching user:", err);
                return res.status(500).json({ message: "An error occurred!" });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: "User not found!" });
            }
  
            const { password: _, ...otherDetails } = result[0];
            return res.status(200).json({ details: otherDetails });
        });
    } catch (error) {
        console.error("❌ Unexpected error in LoggedUserDetails:", error);
        return res.status(500).json({ message: "An error occurred!" });
    }
  };
  
  /** ============================
   *  🚪 Logout User
   ============================= */
  export const logout = (req, res) => {
    try {
      if (!req.cookies.access_token) {
        return res.status(200).json({ message: "You were already logged out!" });
      }
  
      // Clear cookie properly
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        path: "/",
      });
  
      return res.status(200).json({ message: "User has been logged out!" });
    } catch (error) {
      console.error("Error during logout:", error);
      return res.status(500).json({ message: "An error occurred while logging out." });
    }
  };
  
  /** ============================
   *  🛡️ Verify Token Middleware
   ============================= */
  export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token; // ✅ Use optional chaining to prevent errors
  
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No authentication token found" });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        db.query("SELECT id, contact   FROM users WHERE id = ?", [decoded.id], (err, result) => {
            if (err) {
                console.error("❌ Database Error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (result.length === 0) {
                return res.status(403).json({ message: "Invalid user" });
            }
            req.user = result[0]; // ✅ Attach user data to request
            next();
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
  };