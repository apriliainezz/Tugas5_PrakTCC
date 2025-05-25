import User from "../models/UserModel.js";
import Note from "../models/NoteModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ======================== USER SECTION ========================

// Get all users (ADMIN ONLY biasanya)
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "refresh_token"] }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password", "refresh_token"] }
    });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, gender, password: hashed });
    res.status(201).json({ status: "Success", message: "User registered", data: user });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Login handler
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ status: "Failed", message: "Email atau password salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ status: "Failed", message: "Email atau password salah" });

    const userPlain = user.toJSON();
    const { password: _, refresh_token: __, ...safeUserData } = userPlain;

    const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      status: "Success",
      message: "Login Berhasil",
      accessToken,
      safeUserData
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const userId = req.userId;
    await User.update({ refresh_token: null }, { where: { id: userId } });
    res.status(200).json({ message: "Logout berhasil dan token dibersihkan." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await user.update(req.body);
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================== NOTE SECTION ========================

// Get all notes (by logged in user)
export const getNotes = async (req, res) => {
  try {
    const response = await Note.findAll({
      where: { userId: req.userId }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single note by ID
export const getNoteById = async (req, res) => {
  try {
    const response = await Note.findOne({
      where: { id: req.params.id }
    });
    if (!response) return res.status(404).json({ message: "Note tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new note
export const createNote = async (req, res) => {
  try {
    const { tittle, content, date } = req.body;
    await Note.create({
      tittle,
      content,
      date,
      userId: req.userId
    });
    res.status(201).json({ msg: "Note Created" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal membuat note", detail: error.message });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: "Note tidak ditemukan" });

    await note.update(req.body);
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    await Note.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Note Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
