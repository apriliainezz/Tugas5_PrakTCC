import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [catatan, setCatatan] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${BASE_URL}/users/${id}`, {
                name,
                email,
                gender,
                catatan
            });
            navigate("/", { state: { successMessage: "Yeay, Catatan Anda Sudah Terupdate!" } });
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setGender(response.data.gender);
            setCatatan(response.data.catatan);
        } catch (error) {
            console.log(error);
        }
    };

    const styles = {
        container: {
            backgroundColor: "#f5e6ca",
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
            maxWidth: "500px",
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
            backgroundColor: "#fffdf6",
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
        buttonUpdate: {
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
        buttonUpdateHover: {
            backgroundColor: "#8d6a4b",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>🔄 Update Notes</h2>
                <form onSubmit={updateUser}>
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
                        style={styles.buttonUpdate}
                        onMouseOver={(e) =>
                            (e.target.style.backgroundColor = styles.buttonUpdateHover.backgroundColor)
                        }
                        onMouseOut={(e) =>
                            (e.target.style.backgroundColor = styles.buttonUpdate.backgroundColor)
                        }
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;


