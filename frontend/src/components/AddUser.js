import React, { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils.js";


const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [catatan, setCatatan] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/users`, {
                name,
                email,
                gender,
                catatan
            })
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const styles = {
        container: {
            backgroundColor: "#f5e6ca", // Warna pastel coklat
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
        },
        formContainer: {
            backgroundColor: "#fff8e1",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)",
            width: "50%",
        },
        title: {
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#6c584c",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "1px",
        },
        label: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#6c584c",
            marginBottom: "5px",
            display: "block",
        },
        input: {
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #c5a880",
            borderRadius: "6px",
            marginBottom: "15px",
            outline: "none",
            transition: "border 0.3s ease",
        },
        inputFocus: {
            borderColor: "#d4a373",
        },
        select: {
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #c5a880",
            borderRadius: "6px",
            marginBottom: "15px",
            backgroundColor: "white",
        },
        buttonSave: {
            width: "100%",
            backgroundColor: "#a67c52",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s ease",
        },
        buttonSaveHover: {
            backgroundColor: "#8d6a4b",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>➕ Add New Notes</h2>
                <form onSubmit={saveUser}>
                    <label style={styles.label}>Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama"
                    />

                    <label style={styles.label}>Email</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan Email"
                    />

                    <label style={styles.label}>Gender</label>
                    <select
                        style={styles.select}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <label style={styles.label}>Catatan</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        placeholder="Tuliskan Catatan Anda"
                    />

                    <button
                        type="submit"
                        style={styles.buttonSave}
                        onMouseOver={(e) =>
                            (e.target.style.backgroundColor = styles.buttonSaveHover.backgroundColor)
                        }
                        onMouseOut={(e) =>
                            (e.target.style.backgroundColor = styles.buttonSave.backgroundColor)
                        }
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;