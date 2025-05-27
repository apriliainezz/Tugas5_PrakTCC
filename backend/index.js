import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/Database.js";

// Import semua model dan asosiasi
import "./models/UserModel.js";
import "./models/NoteModel.js";
import "./models/associations.js"; // Aktifkan relasi antar model

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true, origin:
        "https://frontend-notes-inez-dot-f-08-450706.uc.r.appspot.com"
}));
app.use(express.json());

app.use(UserRoute);

const port = process.env.PORT;

// Sinkronisasi database dan jalankan server
(async () => {
  try {
    await db.sync(); // Gunakan db.sync({ force: true }) jika perlu reset tabel
      console.log("Database synced!");
      
    app.listen(PORT, () => {
      console.log(`Server connected on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB Sync Error:", error);
  }
})();
