import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaArrowLeft, FaFingerprint } from "react-icons/fa";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

function SecretPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [secret, setSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const BASE_URL = "http://localhost:8080/auth";

    const generateSecret = async () => {
        setLoading(true);

        const res = await fetch(
            `${BASE_URL}/generate?username=${username}`,
            {
                method: "POST"
            }
        );

        const data = await res.text();

        setTimeout(() => {
            setSecret(data);
            setLoading(false);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white flex justify-center items-center px-6 relative overflow-hidden"
        >
            {/* Background glows */}
            <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white/10 border border-green-400 p-10 rounded-3xl shadow-[0_0_30px_lime] w-full max-w-lg text-center z-10"
            >
                <FaKey className="text-green-400 text-6xl mx-auto mb-6" />

                <h1 className="text-3xl font-bold mb-4">
                    Generate Authentication Secret
                </h1>

                <p className="text-gray-300 mb-6">
                    Create your Google Authenticator secret for secure OTP verification.
                </p>

                <input
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-black"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateSecret}
                    className="w-full bg-green-500 text-black font-bold py-3 rounded-xl"
                >
                    Generate Secret
                </motion.button>

                {loading && (
                    <div className="mt-6">
                        <ClipLoader color="#00ffff" size={50} />
                        <p className="mt-4 text-cyan-300">
                            Generating secure credentials...
                        </p>
                    </div>
                )}

                {secret && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6"
                    >
                        <FaFingerprint className="text-cyan-400 text-4xl mx-auto mb-4" />

                        <h3 className="text-xl font-bold mb-3">
                            Your Secret Key
                        </h3>

                        <p className="text-cyan-300 break-all">
                            {secret}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 bg-red-500 px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
                        >
                            Proceed to OTP Verification
                        </button>
                    </motion.div>
                )}

                <button
                    onClick={() => navigate("/register")}
                    className="mt-6 flex items-center gap-2 mx-auto text-green-400 hover:text-white"
                >
                    <FaArrowLeft />
                    Back
                </button>
            </motion.div>
        </motion.div>
    );
}

export default SecretPage;