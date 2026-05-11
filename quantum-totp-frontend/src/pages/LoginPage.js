import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [response, setResponse] = useState("");

    const BASE_URL = "http://localhost:8080/auth";

    const verifyOtp = async () => {
        const res = await fetch(
            `${BASE_URL}/verify?username=${username}&otp=${otp}`,
            {
                method: "POST"
            }
        );

        const data = await res.text();
        setResponse(data);

        if (res.ok) {
            setTimeout(() => {
                navigate("/dashboard");
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
                alignItems: "center",
                textAlign: "center"
            }}
        >
            <FaShieldAlt size={90} color="cyan" />

            <h1 style={{ marginTop: "20px" }}>OTP Verification</h1>

            <p>Enter your username and OTP from Google Authenticator</p>

            <input
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    padding: "10px",
                    margin: "10px",
                    width: "250px"
                }}
            />

            <input
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                style={{
                    padding: "10px",
                    margin: "10px",
                    width: "250px"
                }}
            />

            <button
                onClick={verifyOtp}
                style={{
                    padding: "12px 25px",
                    background: "cyan",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                }}
            >
                Verify OTP
            </button>

            <p style={{ marginTop: "20px" }}>{response}</p>
        </div>
    );
}

export default LoginPage;