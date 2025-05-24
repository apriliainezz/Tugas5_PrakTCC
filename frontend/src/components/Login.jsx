import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang, ${response.data.safeUserData?.name || "User"}!`,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response?.data?.message || "Terjadi kesalahan saat login.");
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f2e8dc", // warna pastel coklat muda
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div className="column is-half">
        <div
          className="box p-5"
          style={{
            borderRadius: "16px",
            backgroundColor: "#fdf7f0",
            boxShadow: "0 4px 12px rgba(139, 94, 60, 0.2)",
          }}
        >
          <h2 className="title is-4 has-text-centered" style={{ color: "#8b5e3c" }}>
            Login APP Notes Inces
          </h2>

          {msg && (
            <p className="has-text-centered has-text-danger" style={{ marginBottom: "1rem" }}>
              {msg}
            </p>
          )}

          <form onSubmit={loginHandler}>
            <div className="field">
              <label className="label" style={{ color: "#5c4033" }}>Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input is-rounded"
                  placeholder="Masukkan email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    borderColor: "#d8bca2",
                    backgroundColor: "#fffaf6",
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" style={{ color: "#5c4033" }}>Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input is-rounded"
                  placeholder="Masukkan password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderColor: "#d8bca2",
                    backgroundColor: "#fffaf6",
                  }}
                />
              </div>
            </div>

            <div className="field mt-4">
              <button
                type="submit"
                className="button is-rounded is-fullwidth"
                style={{
                  backgroundColor: "#8b5e3c",
                  color: "white",
                  border: "none",
                }}
              >
                Login
              </button>
            </div>
          </form>

          {/* Tombol daftar + tulisan (Register) */}
          <div className="has-text-centered mt-4">
            <button
              className="button is-light is-rounded"
              onClick={() => navigate("/register")}
              style={{
                backgroundColor: "#e8d8c3",
                color: "#5c4033",
                border: "1px solid #d8bca2",
              }}
            >
              Daftar Akun Baru
            </button>
            <p style={{ marginTop: "6px", fontSize: "0.85rem", color: "#7a5c3e" }}>
              (Register)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
