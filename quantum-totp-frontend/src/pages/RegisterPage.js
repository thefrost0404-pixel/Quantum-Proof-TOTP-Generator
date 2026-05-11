import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const BASE_URL = "http://localhost:8080/auth";

    const registerUser = async () => {
        const res = await fetch(
            `${BASE_URL}/register?username=${username}&password=${password}`,
            {
                method: "POST"
            }
        );

        const data = await res.text();
        setResponse(data);

        if (res.ok) {
            setTimeout(() => {
                navigate("/secret");
            }, 1500);
        }
    };

    return (
        <div
            style={{
                background: "#0a192f",
                color: "white",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <FaUserPlus size={90} color="cyan" />

            <h1 style={{ marginTop: "20px" }}>User Registration</h1>

            <input
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "10px", margin: "10px", width: "250px" }}
            />

            <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "10px", margin: "10px", width: "250px" }}
            />

            <button
                onClick={registerUser}
                style={{
                    padding: "12px 25px",
                    background: "cyan",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                }}
            >
                Register
            </button>

            <p style={{ marginTop: "20px" }}>{response}</p>
        </div>
    );
}

export default RegisterPage;