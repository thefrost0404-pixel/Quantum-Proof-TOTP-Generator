import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaShieldAlt,
    FaArrowLeft,
    FaFingerprint
} from "react-icons/fa";

import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const BASE_URL = "http://localhost:8080/auth";

    const verifyOtp = async () => {
        setLoading(true);

        try {
            const res = await fetch(
                `${BASE_URL}/verify?username=${username}&otp=${otp}`,
                {
                    method: "POST"
                }
            );

            const data = await res.json();

            setTimeout(() => {
                setLoading(false);

                if (data.status === "Quantum Secure Session Established") {

                    localStorage.setItem(
                        "kyberData",
                        JSON.stringify(data)
                    );

                    setResponse(
                        "✅ Identity Verified. Quantum Secure Session Established."
                    );

                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 1500);

                } else {
                    setResponse("❌ Invalid OTP.");
                }

            }, 2000);

        } catch (error) {
            setLoading(false);
            setResponse("Verification failed.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white flex justify-center items-center px-6 relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white/10 border border-red-400 p-10 rounded-3xl shadow-[0_0_30px_red] w-full max-w-lg text-center z-10"
            >
                <FaShieldAlt className="text-red-400 text-6xl mx-auto mb-6" />

                <h1 className="text-3xl font-bold mb-4">
                    Final Authentication Check
                </h1>

                <p className="text-gray-300 mb-6">
                    Enter your OTP to authorize secure vault access.
                </p>

                <input
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-black"
                />

                <input
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-black"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={verifyOtp}
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-xl"
                >
                    Verify OTP
                </motion.button>

                {loading && (
                    <div className="mt-6">
                        <ClipLoader color="#00ffff" size={50} />
                        <p className="mt-4 text-cyan-300">
                            Verifying identity...
                        </p>
                    </div>
                )}

                {response && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6"
                    >
                        <FaFingerprint className="text-green-400 text-4xl mx-auto mb-4" />

                        <p className="text-green-400 font-bold">
                            {response}
                        </p>
                    </motion.div>
                )}

                <button
                    onClick={() => navigate("/secret")}
                    className="mt-6 flex items-center gap-2 mx-auto text-red-300 hover:text-white"
                >
                    <FaArrowLeft />
                    Back
                </button>
            </motion.div>
        </motion.div>
    );
}

export default LoginPage;