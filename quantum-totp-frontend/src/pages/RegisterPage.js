import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white flex justify-center items-center px-6 relative overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white/10 border border-cyan-400 p-10 rounded-3xl shadow-[0_0_30px_cyan] w-full max-w-md text-center z-10"
            >
                <FaUserPlus className="text-cyan-400 text-6xl mx-auto mb-6" />

                <h1 className="text-3xl font-bold mb-4">
                    Create Secure Identity
                </h1>

                <p className="text-gray-300 mb-6">
                    Register before generating your quantum-secured credentials.
                </p>

                <input
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-black"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg mb-4 text-black"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={registerUser}
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-xl"
                >
                    Register
                </motion.button>

                {response && (
                    <p className="mt-4 text-green-400 font-semibold">
                        {response}
                    </p>
                )}

                {/* Back button */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 flex items-center gap-2 mx-auto text-cyan-400 hover:text-white"
                >
                    <FaArrowLeft />
                    Back to Home
                </button>
            </motion.div>
        </motion.div>
    );
}

export default RegisterPage;