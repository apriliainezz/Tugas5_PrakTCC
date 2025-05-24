import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        gender,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Silakan login untuk melanjutkan.",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f2e8dc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#fdf7f0",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(139, 94, 60, 0.2)",
          maxWidth: "900px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Kiri: Emoji Beruang */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#e8d8c3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            fontSize: "10rem",
            userSelect: "none",
            color: "#8b5e3c",
          }}
          aria-label="Emoji Beruang"
          role="img"
        >
          🐻
        </div>

        {/* Kanan: Form */}
        <div style={{ flex: 1, padding: "2rem" }}>
          <h2
            className="title is-4 has-text-centered"
            style={{ color: "#8b5e3c", marginBottom: "2rem" }}
          >
            Daftar Akun Baru
          </h2>

          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="label" style={{ color: "#5c4033" }}>
                Nama
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input is-rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  required
                  style={{
                    borderColor: "#d8bca2",
                    backgroundColor: "#fffaf6",
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" style={{ color: "#5c4033" }}>
                Email
              </label>
              <div className="control">
                <input
                  type="email"
                  className="input is-rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  style={{
                    borderColor: "#d8bca2",
                    backgroundColor: "#fffaf6",
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" style={{ color: "#5c4033" }}>
                Jenis Kelamin
              </label>
              <div className="control">
                <div className="select is-rounded is-fullwidth">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{
                      backgroundColor: "#fffaf6",
                      borderColor: "#d8bca2",
                      color: "#5c4033",
                    }}
                  >
                    <option value="" disabled>
                      --Pilih Jenis Kelamin--
                    </option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" style={{ color: "#5c4033" }}>
                Kata Sandi
              </label>
              <div className="control">
                <input
                  type="password"
                  className="input is-rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  required
                  style={{
                    borderColor: "#d8bca2",
                    backgroundColor: "#fffaf6",
                  }}
                />
              </div>
            </div>

            <div className="field mt-4 is-flex is-justify-content-space-between">
              <button
                type="button"
                className="button is-light is-rounded is-flex-grow-1 mx-1"
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "#e8d8c3",
                  color: "#5c4033",
                  border: "1px solid #d8bca2",
                }}
              >
                Kembali
              </button>

              <button
                type="submit"
                className="button is-rounded is-flex-grow-1 mx-1"
                style={{
                  backgroundColor: "#8b5e3c",
                  color: "white",
                  border: "none",
                }}
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
