import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { db } from './connectdb.js';
import CropRoute from './routes/cropRoute.js';
import FarmerRoute from './routes/farmerRoute.js';
import FertilizerRoute from './routes/fertilizerRoute.js';
import LivestockRoute from './routes/livestockRoute.js';

const app = express();

// ✅ Use only this cors config (delete the other app.use(cors()))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

db.connect((err) => {
  if (err) {
    console.error("Failed To Connect to the Database!", err);
  } else {
    console.log("Connected to database successfully!");
  }
});

app.use("/server/users", FarmerRoute);
app.use("/server/livestock", LivestockRoute);
app.use("/server/fertilizer", FertilizerRoute);
app.use("/server/crops", CropRoute);

app.listen(8800, () => {
  console.log("🚀 Server running on port 8800");
});
