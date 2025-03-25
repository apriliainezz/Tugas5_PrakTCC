import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const UserList = () => {
    const [users, setUser] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = async () => {
        const response = await axios.get(`${BASE_URL}/users`);
        setUser(response.data);
    }
    
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }


    const styles = {
        container: {
            backgroundColor: "#f5e6ca",
            minHeight: "100vh",
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        tableContainer: {
            backgroundColor: "#fff8e1", 
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)",
            width: "85%",
        },
        headerContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
        },
        headerTitle: {
            fontSize: "28px",
            fontWeight: "bold",
            color: "#6c584c",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "1px",
        },
        buttonAdd: {
            backgroundColor: "#a67c52",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
        },
        buttonAddHover: {
            backgroundColor: "#8d6a4b",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
        },
        th: {
            backgroundColor: "#d4a373",
            color: "white",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            borderBottom: "2px solid #b08968",
        },
        td: {
            padding: "12px",
            borderBottom: "1px solid #c5a880",
            fontSize: "14px",
            color: "#6c584c",
        },
        trHover: {
            backgroundColor: "#faedcd",
            transition: "background 0.3s ease",
        },
        buttonEdit: {
            backgroundColor: "#6c584c",
            color: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            marginRight: "5px",
            cursor: "pointer",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "background 0.3s ease",
        },
        buttonEditHover: {
            backgroundColor: "#5a4b3c",
        },
        buttonDelete: {
            backgroundColor: "#b56576",
            color: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "background 0.3s ease",
        },
        buttonDeleteHover: {
            backgroundColor: "#9b4e64",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.tableContainer}>
                {/* Header dengan tombol Add New Notes */}
                <div style={styles.headerContainer}>
                    <h2 style={styles.headerTitle}>📋 DAILY NOTES</h2>
                    <Link 
                        to="add" 
                        style={styles.buttonAdd}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonAddHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.buttonAdd.backgroundColor)}
                    >
                        📌 Add New Notes
                    </Link>
                </div>

                {/* Tabel */}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>No</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Gender</th>
                            <th style={styles.th}>Catatan</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr 
                                key={user.id} 
                                style={{ ...styles.td, cursor: "pointer" }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{user.name}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>{user.gender}</td>
                                <td style={styles.td}>{user.catatan}</td>
                                <td style={styles.td}>
                                    <Link 
                                        to={`edit/${user.id}`} 
                                        style={styles.buttonEdit}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonEditHover.backgroundColor)}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.buttonEdit.backgroundColor)}
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <button 
                                        onClick={() => deleteUser(user.id)} 
                                        style={styles.buttonDelete}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonDeleteHover.backgroundColor)}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.buttonDelete.backgroundColor)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default UserList;
