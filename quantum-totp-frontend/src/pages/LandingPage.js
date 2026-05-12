import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaLock,
    FaShieldAlt,
    FaAtom,
    FaCloud,
    FaArrowLeft
} from "react-icons/fa";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function LandingPage() {
    const navigate = useNavigate();
    const [selectedFeature, setSelectedFeature] = useState(null);

    const featureInfo = {
        totp: {
            title: "TOTP Security",
            content:
                "Authorized personnel must verify their identity using Google Authenticator. Every login attempt requires a dynamic OTP that expires quickly, preventing unauthorized access."
        },

        kyber: {
            title: "CRYSTALS-Kyber Encryption",
            content:
                "After OTP verification, our backend performs real CRYSTALS-Kyber KEM operations including key generation, encapsulation and decapsulation to protect communication from future quantum attacks."
        },

        vault: {
            title: "Restricted Smart Lock Access",
            content:
                "After successful verification, a secure signal is sent to smart locks installed in restricted laboratories, confidential office spaces, and research zones where only authorized personnel can enter."
        }
    };

    if (selectedFeature) {
        const feature = featureInfo[selectedFeature];

        return (
            <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
                <div className="bg-white/10 border border-cyan-400 p-10 rounded-2xl max-w-3xl text-center shadow-[0_0_30px_cyan]">
                    <h1 className="text-4xl font-bold mb-6 text-cyan-300">
                        {feature.title}
                    </h1>

                    <p className="text-lg text-gray-300 leading-relaxed">
                        {feature.content}
                    </p>

                    <button
                        onClick={() => setSelectedFeature(null)}
                        className="mt-8 bg-red-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transition"
                    >
                        <FaArrowLeft />
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 overflow-hidden relative"
        >
            {/* Background Glow Effects */}
            <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>
            <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-20 top-1/2 left-1/2"></div>

            {/* Hero Section */}
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className="text-center max-w-5xl z-10"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 3
                    }}
                >
                    <FaLock className="text-cyan-400 text-8xl mx-auto mb-6 drop-shadow-[0_0_20px_cyan]" />
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cyan-400 drop-shadow-[0_0_25px_cyan]">
                    Restricted Laboratory Access System
                </h1>

                <TypeAnimation
                    sequence={[
                        "Unauthorized personnel are denied access",
                        2000,
                        "Only verified users can enter secure zones",
                        2000,
                        "Quantum-secured smart locks protect restricted labs",
                        2000
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-2xl text-green-400 font-semibold drop-shadow-[0_0_15px_lime]"
                />

                <p className="text-lg text-gray-300 mt-6 mb-8 max-w-4xl mx-auto">
                    Sensitive research laboratories, confidential office spaces and
                    restricted rooms require stronger protection. Our system ensures that
                    only authorized personnel can unlock these areas through TOTP
                    verification, quantum-secure communication and smart lock integration.
                </p>

                <motion.button
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 0px 25px cyan"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/register")}
                    className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg"
                >
                    Request Access
                </motion.button>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl z-10">

                <div
                    onClick={() => setSelectedFeature("totp")}
                    className="cursor-pointer bg-white/5 border border-green-400 p-6 rounded-2xl text-center hover:scale-105 transition"
                >
                    <FaShieldAlt className="text-green-400 text-4xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-green-300">
                        TOTP Verification
                    </h2>
                </div>

                <div
                    onClick={() => setSelectedFeature("kyber")}
                    className="cursor-pointer bg-white/5 border border-cyan-400 p-6 rounded-2xl text-center hover:scale-105 transition"
                >
                    <FaAtom className="text-cyan-400 text-4xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-cyan-300">
                        Quantum Encryption
                    </h2>
                </div>

                <div
                    onClick={() => setSelectedFeature("vault")}
                    className="cursor-pointer bg-white/5 border border-red-400 p-6 rounded-2xl text-center hover:scale-105 transition"
                >
                    <FaCloud className="text-red-400 text-4xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-red-300">
                        Smart Lock Access
                    </h2>
                </div>
            </div>
        </motion.div>
    );
}

export default LandingPage;