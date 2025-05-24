import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";
import { jwtDecode } from "jwt-decode";  // tetap sama

const Dashboard = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            window.location.href = "/";
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // dalam detik
            const timeLeft = decoded.exp - now;

            if (timeLeft <= 0) {
                localStorage.removeItem("accessToken");
                window.location.href = "/";
                return;
            }

            const logoutTimer = setTimeout(() => {
                localStorage.removeItem("accessToken");
                window.location.href = "/";
            }, timeLeft * 1000);

            getNotes();

            return () => clearTimeout(logoutTimer);
        } catch (err) {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
        }
    }, []);

    const getNotes = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASE_URL}/notes`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(response.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal mengambil data",
                text: error.response?.data?.message || "Terjadi kesalahan saat mengambil data catatan.",
            });
        }
    };

    const deleteNote = async (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a65a33", // coklat gelap
            cancelButtonColor: "#bfb5a2",  // coklat pastel lembut
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("accessToken");
                    await axios.delete(`${BASE_URL}/notes/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
                    setNotes(notes.filter(note => note.id !== id));
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal menghapus",
                        text: error.response?.data?.message || "Terjadi kesalahan saat menghapus data.",
                    });
                }
            }
        });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5efe6", // coklat pastel sangat lembut
                padding: "2rem 1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "960px",
                    backgroundColor: "#fffaf0", // putih krem lembut
                    borderRadius: "14px",
                    boxShadow: "0 8px 16px rgba(166, 138, 115, 0.25)",
                    padding: "2rem",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: "1.8rem",
                        color: "#8b5e3c", // coklat tua
                        marginBottom: "1.5rem",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                >
                    Daftar Catatan
                </h2>

                <div style={{ marginBottom: "1.5rem", textAlign: "right" }}>
                    <Link
                        to={`/add`}
                        style={{
                            backgroundColor: "#d9b48f",
                            color: "#4a2e14",
                            padding: "0.5rem 1.2rem",
                            borderRadius: "24px",
                            fontWeight: "600",
                            textDecoration: "none",
                            boxShadow: "0 4px 8px rgba(213, 165, 112, 0.4)",
                            transition: "background-color 0.3s ease",
                            userSelect: "none",
                            display: "inline-block",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#c89a6e")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#d9b48f")}
                    >
                        Tambah Catatan
                    </Link>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#a65a33", color: "#fff", borderRadius: "12px" }}>
                            <th style={thStyle}>No</th>
                            <th style={thStyle}>Tanggal</th>
                            <th style={thStyle}>Kategori</th>
                            <th style={thStyle}>Isi Catatan</th>
                            <th style={thStyle}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{
                                    textAlign: "center",
                                    padding: "1.5rem",
                                    color: "#a67c52",
                                    fontStyle: "italic",
                                }}>
                                    Belum terdapat catatan. Silakan melakukan input catatan.
                                </td>
                            </tr>
                        ) : (
                            notes.map((note, index) => (
                                <tr key={note.id} style={{ backgroundColor: "#f9f1e9", borderRadius: "12px" }}>
                                    <td style={tdCenterStyle}>{index + 1}</td>
                                    <td style={tdCenterStyle}>{note.date ? note.date.substring(0, 10) : ""}</td>
                                    <td style={tdCenterStyle}>{note.tittle}</td>
                                    <td style={{ padding: "0.5rem 1rem", color: "#5c4033" }}>{note.content}</td>
                                    <td style={tdCenterStyle}>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                                            <Link
                                                to={`/edit/${note.id}`}
                                                style={{
                                                    backgroundColor: "#c89a6e",
                                                    color: "#4a2e14",
                                                    borderRadius: "8px",
                                                    padding: "0.3rem 0.8rem",
                                                    fontSize: "0.9rem",
                                                    textDecoration: "none",
                                                    boxShadow: "0 2px 6px rgba(200, 154, 110, 0.5)",
                                                    userSelect: "none",
                                                    transition: "background-color 0.3s ease",
                                                }}
                                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b37f4e")}
                                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#c89a6e")}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                style={{
                                                    backgroundColor: "#d9946c",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    padding: "0.3rem 0.8rem",
                                                    fontSize: "0.9rem",
                                                    color: "#4a2e14",
                                                    cursor: "pointer",
                                                    boxShadow: "0 2px 6px rgba(217, 148, 108, 0.5)",
                                                    transition: "background-color 0.3s ease",
                                                    userSelect: "none",
                                                }}
                                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b06e42")}
                                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#d9946c")}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles for table headers and cells
const thStyle = {
    padding: "0.8rem 1rem",
    textAlign: "center",
    borderRadius: "12px 12px 0 0",
    fontWeight: "600",
    fontSize: "1rem",
    userSelect: "none",
};

const tdCenterStyle = {
    padding: "0.7rem 1rem",
    textAlign: "center",
    color: "#6b4c34",
    verticalAlign: "middle",
};

export default Dashboard;
