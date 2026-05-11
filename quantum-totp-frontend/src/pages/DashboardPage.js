import React from "react";
import { FaShieldAlt } from "react-icons/fa";

function DashboardPage() {
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
                textAlign: "center",
                padding: "20px"
            }}
        >
            <FaShieldAlt size={100} color="cyan" />

            <h1 style={{ marginTop: "20px" }}>
                Authentication Successful
            </h1>

            <p style={{ marginTop: "15px", maxWidth: "700px" }}>
                Welcome to the Quantum Proof Security Dashboard. Your identity has been
                verified using Time-Based One-Time Password authentication combined with
                post-quantum cryptographic principles.
            </p>

            <div
                style={{
                    marginTop: "30px",
                    background: "#1e3a5f",
                    padding: "25px",
                    borderRadius: "15px",
                    width: "500px"
                }}
            >
                <h3>Security Status</h3>

                <p>
                    🔐 TOTP Verification:
                    <span style={{ color: "limegreen" }}> Successful</span>
                </p>

                <p>
                    ⚛ Quantum Security Layer:
                    <span style={{ color: "cyan" }}> Kyber Enabled</span>
                </p>

                <p>
                    🧮 Hashing Algorithm:
                    <span style={{ color: "orange" }}> SHA-256 Active</span>
                </p>

                <p>
                    ☁ Cloud Database:
                    <span style={{ color: "lightgreen" }}> Supabase PostgreSQL Connected</span>
                </p>
            </div>

            <div style={{ marginTop: "30px" }}>
                <button
                    style={{
                        padding: "15px 30px",
                        background: "cyan",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                    onClick={() =>
                        alert("Future scope includes IoT Smart Lock Integration")
                    }
                >
                    View Future Enhancements
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;