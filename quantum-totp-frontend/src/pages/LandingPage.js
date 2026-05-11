import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                background: "linear-gradient(to right, #0a192f, #112240)",
                color: "white",
                minHeight: "100vh",
                padding: "50px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {/* Lock Icon */}
            <FaLock size={100} color="cyan" style={{ marginBottom: "20px" }} />

            {/* Main Title */}
            <h1
                style={{
                    fontSize: "3rem",
                    color: "cyan",
                    marginBottom: "20px"
                }}
            >
                Quantum Proof Authentication System
            </h1>

            {/* Description */}
            <p
                style={{
                    fontSize: "1.2rem",
                    maxWidth: "900px",
                    marginBottom: "20px"
                }}
            >
                Traditional encryption systems like <strong>RSA</strong> are vulnerable
                to future quantum attacks through <strong>Shor’s Algorithm</strong>,
                which can break integer factorization-based cryptography.
            </p>

            <p
                style={{
                    fontSize: "1.2rem",
                    maxWidth: "900px",
                    marginBottom: "20px"
                }}
            >
                Our project integrates <strong>CRYSTALS-Kyber</strong>, a
                post-quantum cryptographic algorithm selected by NIST, based on
                lattice cryptography and resistant to quantum attacks.
            </p>

            <p
                style={{
                    fontSize: "1.2rem",
                    maxWidth: "900px",
                    marginBottom: "30px"
                }}
            >
                Combined with <strong>TOTP authentication</strong>, secure hashing,
                and future <strong>IoT Smart Lock integration</strong>, this system
                creates a future-ready authentication platform.
            </p>

            {/* Get Started Button */}
            <button
                onClick={() => navigate("/register")}
                style={{
                    padding: "15px 35px",
                    background: "cyan",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem"
                }}
            >
                Get Started
            </button>
        </div>
    );
}

export default LandingPage;