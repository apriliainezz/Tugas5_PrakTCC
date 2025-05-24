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
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(cors({
    credentials: true, origin:
        "http://localhost:3000"
}));
app.use(express.json());

app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);

// Sinkronisasi database dan jalankan server
(async () => {
  try {
    await db.sync(); // Gunakan db.sync({ force: true }) jika perlu reset tabel
    console.log("Database synced!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server connected on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB Sync Error:", error);
  }
})();
