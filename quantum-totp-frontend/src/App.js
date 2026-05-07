import React, { useState } from "react";
import "./App.css";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [signature, setSignature] = useState("");
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
    };

    const generateSecret = async () => {
        const res = await fetch(
            `${BASE_URL}/generate?username=${username}`,
            {
                method: "POST"
            }
        );

        const data = await res.text();
        setResponse(data);
    };

    const verifyOtp = async () => {
        const res = await fetch(
            `${BASE_URL}/verify?username=${username}&otp=${otp}&signature=${signature}`,
            {
                method: "POST"
            }
        );

        const data = await res.text();
        setResponse(data);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Quantum Proof TOTP Generator</h1>

            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={registerUser}>Register User</button>

            <br /><br />

            <button onClick={generateSecret}>Generate Secret</button>

            <br /><br />

            <input
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
            />

            <input
                placeholder="Enter Signature"
                onChange={(e) => setSignature(e.target.value)}
            />

            <button onClick={verifyOtp}>Verify OTP</button>

            <br /><br />

            <h2>{response}</h2>
        </div>
    );
}

export default App;