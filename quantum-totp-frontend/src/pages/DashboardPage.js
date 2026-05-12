import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaShieldAlt,
    FaFingerprint,
    FaAtom,
    FaCloud,
    FaMicrochip
} from "react-icons/fa";

import { motion } from "framer-motion";

function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white px-6 py-10 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>
            <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-20 top-1/2 left-1/2"></div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center relative z-10"
            >
                <FaShieldAlt className="text-cyan-400 text-7xl mx-auto mb-6 drop-shadow-[0_0_20px_cyan]" />

                <h1 className="text-5xl font-bold text-cyan-400 mb-4">
                    Authentication Complete
                </h1>

                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    User identity has been verified through TOTP authentication and
                    quantum-secure communication has been successfully established
                    using CRYSTALS-Kyber.
                </p>
            </motion.div>

            {/* Security Status */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 relative z-10">

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 border border-green-400 p-6 rounded-2xl text-center shadow-[0_0_20px_lime]"
                >
                    <FaFingerprint className="text-green-400 text-4xl mx-auto mb-3" />
                    <h2 className="font-bold text-xl">TOTP Verified</h2>
                    <p className="text-gray-300 text-sm mt-2">
                        Identity confirmed
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 border border-cyan-400 p-6 rounded-2xl text-center shadow-[0_0_20px_cyan]"
                >
                    <FaAtom className="text-cyan-400 text-4xl mx-auto mb-3" />
                    <h2 className="font-bold text-xl">Kyber KEM Active</h2>
                    <p className="text-gray-300 text-sm mt-2">
                        Quantum-secure communication established
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 border border-red-400 p-6 rounded-2xl text-center shadow-[0_0_20px_red]"
                >
                    <FaCloud className="text-red-400 text-4xl mx-auto mb-3" />
                    <h2 className="font-bold text-xl">Cloud Verified</h2>
                    <p className="text-gray-300 text-sm mt-2">
                        Credentials synced successfully
                    </p>
                </motion.div>
            </div>

            {/* Hardware Transition */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-16 relative z-10"
            >
                <FaMicrochip className="text-yellow-400 text-6xl mx-auto mb-6 drop-shadow-[0_0_20px_yellow]" />

                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                    Hardware Layer Initiated
                </h2>

                <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                    The authentication system has completed its role.
                    The following processes now happen inside the smart lock hardware:
                    secure signal transmission → ESP32 processing →
                    servo motor activation → restricted laboratory access.
                </p>

                <motion.button
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 0px 30px yellow"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/hardware")}
                    className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold"
                >
                    Enter Hardware Simulation →
                </motion.button>
            </motion.div>
        </div>
    );
}

export default DashboardPage;