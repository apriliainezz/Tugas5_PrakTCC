import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";

const pastelBrown = {
  light: "#F3E9DC",
  main: "#C1A57B",
  dark: "#8B6D3C",
  text: "#5A4631",
  border: "#D7C4A3",
  placeholder: "#A8947B",
};

const EditNote = () => {
  const [date, setDate] = useState("");
  const [tittle, setTittle] = useState("Kuliner"); // tetap gunakan 'tittle'
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getNoteById = async () => {
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

        const response = await axios.get(`${BASE_URL}/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDate(response.data.date ? response.data.date.substring(0, 10) : "");
        setTittle(response.data.tittle);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error.response?.data || error.message);
        Swal.fire({
          title: "Gagal Mengambil Data!",
          text: error.response?.data?.message || "Terjadi kesalahan saat mengambil data catatan.",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/dashboard");
      }
    };

    getNoteById();
  }, [id, navigate]);

  const updateNote = async (e) => {
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

    Swal.fire({
      title: "Yakin ingin memperbarui catatan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: pastelBrown.main,
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
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

          await axios.put(
            `${BASE_URL}/notes/${id}`,
            { date, tittle, content },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire({
            title: "Berhasil!",
            text: "Catatan berhasil diperbarui.",
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/dashboard");
        } catch (error) {
          console.error("Error updating note:", error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat memperbarui catatan.";
          Swal.fire({
            title: "Gagal!",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: pastelBrown.light,
        minHeight: "100vh",
        padding: "3rem 1rem",
        fontFamily: "'Poppins', sans-serif",
        color: pastelBrown.text,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          maxWidth: 480,
          width: "100%",
          borderRadius: 16,
          padding: "2.5rem 2rem",
          boxShadow: "0 8px 24px rgba(193, 165, 123, 0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: pastelBrown.dark,
            fontWeight: "700",
            fontSize: "1.75rem",
          }}
        >
          Edit Catatan
        </h2>

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.1rem", margin: "3rem 0" }}>Memuat data...</p>
        ) : (
          <form onSubmit={updateNote} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <label style={{ fontWeight: 600 }}>Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                padding: "0.55rem 1rem",
                borderRadius: 10,
                border: `1.5px solid ${pastelBrown.border}`,
                fontSize: "1rem",
                color: pastelBrown.text,
                outlineColor: pastelBrown.main,
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = pastelBrown.main)}
              onBlur={(e) => (e.target.style.borderColor = pastelBrown.border)}
            />

            <label style={{ fontWeight: 600 }}>Kategori</label>
            <select
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
              style={{
                padding: "0.55rem 1rem",
                borderRadius: 10,
                border: `1.5px solid ${pastelBrown.border}`,
                fontSize: "1rem",
                color: pastelBrown.text,
                outlineColor: pastelBrown.main,
                cursor: "pointer",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = pastelBrown.main)}
              onBlur={(e) => (e.target.style.borderColor = pastelBrown.border)}
            >
              <option value="Kuliner">Kuliner</option>
              <option value="Pemasukan / Pengeluaran">Pemasukan / Pengeluaran</option>
              <option value="Kuliah">Kuliah</option>
              <option value="Perasaan">Perasaan</option>
            </select>

            <label style={{ fontWeight: 600 }}>Isi Catatan</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Masukkan catatan Anda..."
              required
              style={{
                padding: "0.55rem 1rem",
                borderRadius: 10,
                border: `1.5px solid ${pastelBrown.border}`,
                fontSize: "1rem",
                color: pastelBrown.text,
                outlineColor: pastelBrown.main,
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = pastelBrown.main)}
              onBlur={(e) => (e.target.style.borderColor = pastelBrown.border)}
            />

            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                style={{
                  flex: 1,
                  padding: "0.65rem 0",
                  borderRadius: 10,
                  border: `2px solid ${pastelBrown.main}`,
                  backgroundColor: "#fff",
                  color: pastelBrown.main,
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = pastelBrown.main;
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.color = pastelBrown.main;
                }}
              >
                Kembali
              </button>

              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "0.65rem 0",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: pastelBrown.main,
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = pastelBrown.dark)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = pastelBrown.main)}
              >
                Update Catatan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditNote;
