import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";

function SecretPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [secret, setSecret] = useState("");

    const BASE_URL = "http://localhost:8080/auth";

    const generateSecret = async () => {
        const res = await fetch(
            `${BASE_URL}/generate?username=${username}`,
            {
                method: "POST"
            }
        );

        const data = await res.text();
        setSecret(data);
    };

    return (
        <div
            style={{
                background: "#112240",
                color: "white",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}
        >
            <FaKey size={90} color="cyan" />

            <h1 style={{ marginTop: "20px" }}>Generate TOTP Secret</h1>

            <p>
                Enter your username and generate your secret key for Google Authenticator
            </p>

            <input
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    padding: "10px",
                    margin: "10px",
                    width: "250px"
                }}
            />

            <button
                onClick={generateSecret}
                style={{
                    padding: "12px 25px",
                    background: "cyan",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                }}
            >
                Generate Secret
            </button>

            {secret && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Your Secret Key:</h3>
                    <p style={{ color: "cyan", fontWeight: "bold" }}>{secret}</p>

                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            marginTop: "20px",
                            padding: "12px 25px",
                            background: "limegreen",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    >
                        Proceed to Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default SecretPage;