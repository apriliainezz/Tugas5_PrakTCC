import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";

const AddNote = () => {
  const [date, setDate] = useState("");
  const [tittle, setTitle] = useState("Kuliner");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const saveNote = async (e) => {
    e.preventDefault();
    if (!date || !tittle || !content) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        Swal.fire({
          title: "Sesi Berakhir!",
          text: "Sesi anda telah berakhir. Silahkan login kembali.",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/");
        return;
      }

      await axios.post(
        `${BASE_URL}/notes`,
        {
          date,
          tittle,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Catatan berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error detail:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.";

      Swal.fire({
        title: "Gagal!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="columns is-centered"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        backgroundColor: "#f7f1e1", // coklat pastel lembut background
        minHeight: "100vh",
      }}
    >
      <div className="column is-half">
        <div
          className="box"
          style={{
            borderRadius: "14px",
            backgroundColor: "#fff5e6", // coklat pastel sangat soft untuk box
            boxShadow: "0 8px 20px rgba(160, 82, 45, 0.12)",
            padding: "2.5rem 3rem",
            border: "1px solid #f0d9b5",
          }}
        >
          <h2
            className="title is-4 has-text-centered"
            style={{
              color: "#a0522d", // coklat tua hangat
              fontWeight: "700",
              letterSpacing: "1.1px",
              marginBottom: "2rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            Tambah Catatan
          </h2>

          <form onSubmit={saveNote}>
            <div className="field">
              <label
                className="label"
                style={{
                  color: "#6b4c3b",
                  fontWeight: "600",
                  fontSize: "1rem",
                  marginBottom: "0.35rem",
                }}
              >
                Tanggal
              </label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={{
                    borderRadius: "8px",
                    borderColor: "#d9b99b",
                    backgroundColor: "#fff9f0",
                    color: "#6b4c3b",
                    fontWeight: "500",
                    padding: "0.6rem 0.9rem",
                    boxShadow: "inset 0 1px 3px rgba(160, 82, 45, 0.1)",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#a0522d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d9b99b")}
                />
              </div>
            </div>

            <div className="field" style={{ marginTop: "1.2rem" }}>
              <label
                className="label"
                style={{
                  color: "#6b4c3b",
                  fontWeight: "600",
                  fontSize: "1rem",
                  marginBottom: "0.35rem",
                }}
              >
                Kategori
              </label>
              <div className="control">
                <div
                  className="select is-fullwidth"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#d9b99b",
                    backgroundColor: "#fff9f0",
                    boxShadow: "inset 0 1px 3px rgba(160, 82, 45, 0.1)",
                  }}
                >
                  <select
                    value={tittle}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      color: "#6b4c3b",
                      fontWeight: "500",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "transparent",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Pemasukan / Pengeluaran">Pemasukan / Pengeluaran</option>
                    <option value="Kuliah">Kuliah</option>
                    <option value="Perasaan">Perasaan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field" style={{ marginTop: "1.2rem" }}>
              <label
                className="label"
                style={{
                  color: "#6b4c3b",
                  fontWeight: "600",
                  fontSize: "1rem",
                  marginBottom: "0.35rem",
                }}
              >
                Isi Catatan
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Masukkan catatan Anda..."
                  required
                  style={{
                    borderRadius: "8px",
                    borderColor: "#d9b99b",
                    backgroundColor: "#fff9f0",
                    color: "#6b4c3b",
                    fontWeight: "500",
                    padding: "0.6rem 0.9rem",
                    boxShadow: "inset 0 1px 3px rgba(160, 82, 45, 0.1)",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#a0522d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d9b99b")}
                />
              </div>
            </div>

            <div
              className="field mt-5 is-flex"
              style={{ justifyContent: "space-between", gap: "1rem" }}
            >
              <button
                type="button"
                className="button"
                onClick={() => navigate("/dashboard")}
                style={{
                  backgroundColor: "#d9b99b",
                  color: "#6b4c3b",
                  fontWeight: "600",
                  borderRadius: "12px",
                  flexGrow: 1,
                  border: "none",
                  padding: "0.65rem 0",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(160, 82, 45, 0.15)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0a373")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d9b99b")}
              >
                Kembali
              </button>

              <button
                type="submit"
                className="button"
                style={{
                  backgroundColor: "#a0522d",
                  color: "#fff5e6",
                  fontWeight: "700",
                  borderRadius: "12px",
                  flexGrow: 1,
                  border: "none",
                  padding: "0.65rem 0",
                  cursor: "pointer",
                  boxShadow: "0 6px 12px rgba(160, 82, 45, 0.3)",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7a3711";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#a0522d";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Simpan Catatan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
