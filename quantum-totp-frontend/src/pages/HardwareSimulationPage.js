import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiWifi,
    FiLock,
    FiUnlock,
    FiShield,
    FiCheckCircle,
    FiServer,
    FiCpu,
} from "react-icons/fi";
import {
    MdSensors,
    MdOutlineElectricBolt,
    MdOutlineDoorFront,
} from "react-icons/md";
import { RiSignalTowerFill } from "react-icons/ri";
import { GiCircuitry } from "react-icons/gi";

// ─── Stage Configuration ────────────────────────────────────────────────────
const STAGES = [
    {
        id: 0,
        key: "auth_signal",
        label: "Secure Signal Dispatched",
        sublabel: "Authentication server transmits encrypted handshake",
        icon: FiServer,
        color: "#00f0ff",
        glowColor: "rgba(0,240,255,0.45)",
    },
    {
        id: 1,
        key: "kyber",
        label: "CRYSTALS-Kyber KEM Active",
        sublabel: "Post-quantum key encapsulation in progress",
        icon: FiShield,
        color: "#00f0ff",
        glowColor: "rgba(0,240,255,0.45)",
    },
    {
        id: 2,
        key: "esp32",
        label: "ESP32 Signal Received",
        sublabel: "Microcontroller decapsulates shared secret",
        icon: FiCpu,
        color: "#facc15",
        glowColor: "rgba(250,204,21,0.4)",
    },
    {
        id: 3,
        key: "servo",
        label: "Servo Motor Activated",
        sublabel: "Actuator rotates to disengage deadbolt",
        icon: GiCircuitry,
        color: "#facc15",
        glowColor: "rgba(250,204,21,0.4)",
    },
    {
        id: 4,
        key: "lock",
        label: "Smart Lock Released",
        sublabel: "Magnetic latch disengaged — bolt retracted",
        icon: FiUnlock,
        color: "#22c55e",
        glowColor: "rgba(34,197,94,0.45)",
    },
    {
        id: 5,
        key: "door",
        label: "Laboratory Door Opening",
        sublabel: "Access pathway cleared for authorised personnel",
        icon: MdOutlineDoorFront,
        color: "#22c55e",
        glowColor: "rgba(34,197,94,0.45)",
    },
    {
        id: 6,
        key: "granted",
        label: "ACCESS GRANTED",
        sublabel: "Authorised Personnel May Enter",
        icon: FiCheckCircle,
        color: "#22c55e",
        glowColor: "rgba(34,197,94,0.7)",
    },
];

const STAGE_DURATION = 1800; // ms per stage

// ─── Utility: Neon Text ─────────────────────────────────────────────────────
const NeonText = ({ children, color = "#00f0ff", className = "" }) => (
    <span
        className={className}
        style={{
            color,
            textShadow: `0 0 8px ${color}, 0 0 20px ${color}80`,
        }}
    >
    {children}
  </span>
);

// ─── Animated Signal Particle ────────────────────────────────────────────────
const SignalParticle = ({ color, delay = 0 }) => (
    <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
            background: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            top: "50%",
            left: 0,
            translateY: "-50%",
        }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{
            duration: 1.2,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    />
);

// ─── Arrow Connector ─────────────────────────────────────────────────────────
const ArrowConnector = ({ active, color = "#facc15" }) => (
    <div className="relative flex items-center justify-center h-8 w-20 mx-1 overflow-hidden">
        {/* Track */}
        <div
            className="absolute inset-y-0 my-auto h-px w-full"
            style={{ background: `${color}30` }}
        />
        {/* Animated fill */}
        {active && (
            <motion.div
                className="absolute left-0 my-auto h-px"
                style={{ background: color, boxShadow: `0 0 6px ${color}`, top: "50%" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
            />
        )}
        {/* Arrow head */}
        <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: `8px solid ${active ? color : color + "30"}`,
                filter: active ? `drop-shadow(0 0 4px ${color})` : "none",
            }}
            animate={active ? { x: [0, 3, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
        />
        {/* Particles */}
        {active && (
            <>
                <SignalParticle color={color} delay={0} />
                <SignalParticle color={color} delay={0.4} />
                <SignalParticle color={color} delay={0.8} />
            </>
        )}
    </div>
);

// ─── Stage Node ──────────────────────────────────────────────────────────────
const StageNode = ({ stage, state }) => {
    // state: 'idle' | 'active' | 'done'
    const Icon = stage.icon;
    const isActive = state === "active";
    const isDone = state === "done";
    const lit = isActive || isDone;

    return (
        <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Icon box */}
            <motion.div
                className="relative flex items-center justify-center w-16 h-16 rounded-xl border"
                style={{
                    borderColor: lit ? stage.color : "#ffffff18",
                    background: lit ? `${stage.color}12` : "#0a0a0f",
                    boxShadow: lit
                        ? `0 0 18px ${stage.glowColor}, inset 0 0 10px ${stage.color}18`
                        : "none",
                }}
                animate={
                    isActive
                        ? {
                            boxShadow: [
                                `0 0 12px ${stage.glowColor}`,
                                `0 0 30px ${stage.glowColor}`,
                                `0 0 12px ${stage.glowColor}`,
                            ],
                        }
                        : {}
                }
                transition={{ repeat: Infinity, duration: 1.1 }}
            >
                <Icon
                    size={28}
                    style={{
                        color: lit ? stage.color : "#ffffff30",
                        filter: lit ? `drop-shadow(0 0 6px ${stage.color})` : "none",
                        transition: "all 0.4s",
                    }}
                />
                {/* Done tick */}
                {isDone && (
                    <motion.div
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "#22c55e" }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                        <FiCheckCircle size={10} color="#000" />
                    </motion.div>
                )}
                {/* Active pulse ring */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{ border: `2px solid ${stage.color}` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 0] }}
                        transition={{ repeat: Infinity, duration: 1.1 }}
                    />
                )}
            </motion.div>

            {/* Label */}
            <div className="text-center max-w-[88px]">
                <p
                    className="text-xs font-semibold leading-tight"
                    style={{
                        color: lit ? stage.color : "#ffffff30",
                        textShadow: lit ? `0 0 8px ${stage.color}80` : "none",
                        transition: "all 0.4s",
                        fontFamily: "'Courier New', monospace",
                    }}
                >
                    {stage.label}
                </p>
            </div>
        </motion.div>
    );
};

// ─── Door Unlock Animation ───────────────────────────────────────────────────
const DoorAnimation = ({ unlocked }) => {
    return (
        <div className="relative flex items-end justify-center" style={{ height: 160, width: 220 }}>
            {/* Door frame */}
            <div
                className="absolute inset-0 rounded-t-lg border-2"
                style={{
                    borderColor: unlocked ? "#22c55e" : "#ff3b3b",
                    boxShadow: unlocked
                        ? "0 0 24px rgba(34,197,94,0.5), inset 0 0 16px rgba(34,197,94,0.1)"
                        : "0 0 24px rgba(255,59,59,0.5), inset 0 0 16px rgba(255,59,59,0.1)",
                    background: "#050508",
                    transition: "all 0.6s",
                }}
            />
            {/* Door panel */}
            <motion.div
                className="absolute inset-y-0 left-2 rounded-t-md border"
                style={{
                    width: 96,
                    originX: 0,
                    borderColor: unlocked ? "#22c55e80" : "#ff3b3b80",
                    background: unlocked ? "rgba(34,197,94,0.06)" : "rgba(255,59,59,0.06)",
                }}
                animate={{ rotateY: unlocked ? -75 : 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.2 }}
            />
            {/* Lock icon on door */}
            <motion.div
                className="absolute"
                style={{ right: 28, top: "40%" }}
                animate={{ color: unlocked ? "#22c55e" : "#ff3b3b" }}
                transition={{ duration: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {unlocked ? (
                        <motion.span
                            key="unlocked"
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <FiUnlock
                                size={28}
                                style={{
                                    color: "#22c55e",
                                    filter: "drop-shadow(0 0 8px #22c55e)",
                                }}
                            />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="locked"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <FiLock
                                size={28}
                                style={{
                                    color: "#ff3b3b",
                                    filter: "drop-shadow(0 0 8px #ff3b3b)",
                                }}
                            />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
            {/* Status label */}
            <motion.p
                className="absolute -bottom-7 w-full text-center text-xs font-bold tracking-widest"
                style={{
                    color: unlocked ? "#22c55e" : "#ff3b3b",
                    textShadow: unlocked
                        ? "0 0 10px #22c55e"
                        : "0 0 10px #ff3b3b",
                    fontFamily: "'Courier New', monospace",
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
            >
                {unlocked ? "UNLOCKED" : "LOCKED"}
            </motion.p>
        </div>
    );
};

// ─── Servo Dial ──────────────────────────────────────────────────────────────
const ServoDial = ({ active }) => (
    <div className="flex flex-col items-center gap-2">
        <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{
                background: "#0a0a0f",
                border: `2px solid ${active ? "#facc15" : "#ffffff20"}`,
                boxShadow: active ? "0 0 18px rgba(250,204,21,0.4)" : "none",
                transition: "all 0.4s",
            }}
        >
            {/* Tick marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                    key={deg}
                    className="absolute w-0.5 h-2 rounded"
                    style={{
                        background: active ? "#facc1550" : "#ffffff15",
                        transform: `rotate(${deg}deg) translateY(-22px)`,
                        transformOrigin: "center 22px",
                    }}
                />
            ))}
            {/* Arm */}
            <motion.div
                className="absolute w-1 rounded-full"
                style={{
                    height: 18,
                    background: active ? "#facc15" : "#ffffff30",
                    boxShadow: active ? "0 0 8px #facc15" : "none",
                    bottom: "50%",
                    left: "50%",
                    transformOrigin: "bottom center",
                    marginLeft: -2,
                }}
                animate={{ rotate: active ? 120 : 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.1 }}
            />
            {/* Center dot */}
            <div
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                    background: active ? "#facc15" : "#ffffff30",
                    boxShadow: active ? "0 0 8px #facc15" : "none",
                }}
            />
        </div>
        <span
            className="text-xs tracking-widest"
            style={{
                color: active ? "#facc15" : "#ffffff30",
                fontFamily: "'Courier New', monospace",
                textShadow: active ? "0 0 8px #facc15" : "none",
            }}
        >
      SERVO
    </span>
    </div>
);

// ─── Scan Line Overlay ───────────────────────────────────────────────────────
const ScanLines = () => (
    <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
            background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        }}
    />
);

// ─── Hex Grid Background ─────────────────────────────────────────────────────
const HexBackground = () => (
    <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32z' fill='none' stroke='%2300f0ff08' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V52l28-16 28 16v32z' fill='none' stroke='%2300f0ff08' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 100px",
        }}
    />
);

// ─── Corner Brackets ─────────────────────────────────────────────────────────
const CornerBrackets = ({ color = "#00f0ff" }) => (
    <>
        {[
            { top: 0, left: 0, rotate: 0 },
            { top: 0, right: 0, rotate: 90 },
            { bottom: 0, right: 0, rotate: 180 },
            { bottom: 0, left: 0, rotate: 270 },
        ].map((pos, i) => (
            <div
                key={i}
                className="absolute w-6 h-6"
                style={{
                    ...pos,
                    borderTop: i < 2 ? `2px solid ${color}` : "none",
                    borderBottom: i >= 2 ? `2px solid ${color}` : "none",
                    borderLeft: i % 3 === 0 ? `2px solid ${color}` : "none",
                    borderRight: i % 2 === 1 ? `2px solid ${color}` : "none",
                    filter: `drop-shadow(0 0 4px ${color})`,
                    transform: `rotate(${pos.rotate}deg)`,
                }}
            />
        ))}
    </>
);

// ─── Terminal Log Line ────────────────────────────────────────────────────────
const TerminalLine = ({ text, color = "#00f0ff", delay = 0 }) => (
    <motion.div
        className="font-mono text-xs flex gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.3 }}
    >
        <span style={{ color: "#ffffff40" }}>{">"}</span>
        <span style={{ color }}>{text}</span>
    </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export default function HardwareSimulationPage() {
    const [currentStage, setCurrentStage] = useState(-1);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [logs, setLogs] = useState([]);
    const timerRef = useRef(null);

    const LOG_MESSAGES = [
        { text: "Initiating secure channel...", color: "#00f0ff" },
        { text: "CRYSTALS-Kyber KEM: Encapsulating shared secret...", color: "#00f0ff" },
        { text: "Public key transmitted [4096-bit lattice]", color: "#00f0ff" },
        { text: "ESP32 received ciphertext — decapsulating...", color: "#facc15" },
        { text: "Shared secret verified [SHA3-256 hash match]", color: "#facc15" },
        { text: "Servo PWM signal: 90° → 180°", color: "#facc15" },
        { text: "GPIO 18 HIGH — deadbolt retracted", color: "#22c55e" },
        { text: "Magnetic sensor: OPEN", color: "#22c55e" },
        { text: "Access granted. Identity confirmed.", color: "#22c55e" },
    ];

    const startSimulation = () => {
        setStarted(true);
        setCurrentStage(0);
        setLogs([]);
    };

    const resetSimulation = () => {
        clearTimeout(timerRef.current);
        setStarted(false);
        setCompleted(false);
        setCurrentStage(-1);
        setLogs([]);
    };

    useEffect(() => {
        if (!started || currentStage < 0) return;

        // Add log
        if (currentStage < LOG_MESSAGES.length) {
            setLogs((prev) => [...prev, LOG_MESSAGES[currentStage]]);
        }

        if (currentStage >= STAGES.length - 1) {
            // Final stage
            timerRef.current = setTimeout(() => setCompleted(true), STAGE_DURATION);
            return;
        }

        timerRef.current = setTimeout(
            () => setCurrentStage((s) => s + 1),
            STAGE_DURATION
        );

        return () => clearTimeout(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStage, started]);

    const stageState = (idx) => {
        if (currentStage < 0) return "idle";
        if (idx < currentStage) return "done";
        if (idx === currentStage) return "active";
        return "idle";
    };

    const doorUnlocked = currentStage >= 4;
    const servoActive = currentStage === 3 || currentStage > 3;

    // Top row stages: 0,1,2,3  |  Bottom row: 4,5,6
    const topRow = STAGES.slice(0, 4);
    const bottomRow = STAGES.slice(4, 7);

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#03030a" }}
        >
            {/* Backgrounds */}
            <HexBackground />
            <ScanLines />

            {/* Ambient glows */}
            <div
                className="pointer-events-none fixed"
                style={{
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)",
                    top: "-200px",
                    left: "-100px",
                }}
            />
            <div
                className="pointer-events-none fixed"
                style={{
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
                    bottom: "-150px",
                    right: "-80px",
                }}
            />

            {/* ── Header ── */}
            <motion.div
                className="relative z-10 flex flex-col items-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-1">
                    <RiSignalTowerFill
                        size={22}
                        style={{ color: "#00f0ff", filter: "drop-shadow(0 0 6px #00f0ff)" }}
                    />
                    <span
                        className="text-xs tracking-[0.3em] uppercase"
                        style={{
                            color: "#00f0ff",
                            fontFamily: "'Courier New', monospace",
                            textShadow: "0 0 10px #00f0ff",
                        }}
                    >
            Restricted Laboratory Access System
          </span>
                    <RiSignalTowerFill
                        size={22}
                        style={{ color: "#00f0ff", filter: "drop-shadow(0 0 6px #00f0ff)" }}
                    />
                </div>
                <h1
                    className="text-3xl font-black tracking-tight"
                    style={{
                        color: "#fff",
                        fontFamily: "'Courier New', monospace",
                        textShadow: "0 0 20px rgba(0,240,255,0.4)",
                    }}
                >
                    HARDWARE{" "}
                    <NeonText color="#00f0ff">SIMULATION</NeonText>
                </h1>
                <div
                    className="mt-1 h-px w-64"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, #00f0ff, transparent)",
                        boxShadow: "0 0 8px #00f0ff",
                    }}
                />
            </motion.div>

            {/* ── Main Panel ── */}
            <motion.div
                className="relative z-10 w-full max-w-4xl mx-auto px-4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div
                    className="relative rounded-2xl border p-6"
                    style={{
                        borderColor: "#00f0ff22",
                        background: "rgba(3,3,10,0.85)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 0 40px rgba(0,240,255,0.08), inset 0 0 60px rgba(0,240,255,0.03)",
                    }}
                >
                    <CornerBrackets color="#00f0ff" />

                    {/* ── Pipeline: Top Row ── */}
                    <div className="flex items-center justify-center flex-wrap gap-y-6 mb-6">
                        {topRow.map((stage, i) => (
                            <React.Fragment key={stage.id}>
                                <StageNode stage={stage} state={stageState(stage.id)} />
                                {i < topRow.length - 1 && (
                                    <ArrowConnector
                                        active={currentStage > stage.id}
                                        color={i < 2 ? "#00f0ff" : "#facc15"}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Downward arrow to row 2 */}
                    <div className="flex justify-center mb-4">
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="w-px h-8"
                                style={{
                                    background:
                                        currentStage >= 4
                                            ? "linear-gradient(180deg,#facc15,#22c55e)"
                                            : "#ffffff18",
                                    boxShadow:
                                        currentStage >= 4 ? "0 0 6px #22c55e" : "none",
                                }}
                                animate={
                                    currentStage >= 4
                                        ? { boxShadow: ["0 0 4px #22c55e", "0 0 14px #22c55e", "0 0 4px #22c55e"] }
                                        : {}
                                }
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            />
                            <div
                                style={{
                                    borderLeft: "6px solid transparent",
                                    borderRight: "6px solid transparent",
                                    borderTop: `8px solid ${currentStage >= 4 ? "#22c55e" : "#ffffff18"}`,
                                    filter: currentStage >= 4 ? "drop-shadow(0 0 4px #22c55e)" : "none",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Pipeline: Bottom Row ── */}
                    <div className="flex items-center justify-center gap-x-0 mb-8">
                        {bottomRow.map((stage, i) => (
                            <React.Fragment key={stage.id}>
                                <StageNode stage={stage} state={stageState(stage.id)} />
                                {i < bottomRow.length - 1 && (
                                    <ArrowConnector
                                        active={currentStage > stage.id}
                                        color="#22c55e"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* ── Hardware Visualisers ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* ESP32 */}
                        <motion.div
                            className="relative rounded-xl border p-4 flex flex-col items-center gap-3"
                            style={{
                                borderColor: currentStage >= 2 ? "#facc1540" : "#ffffff10",
                                background: currentStage >= 2 ? "rgba(250,204,21,0.04)" : "rgba(10,10,15,0.6)",
                                boxShadow: currentStage >= 2 ? "0 0 20px rgba(250,204,21,0.15)" : "none",
                                transition: "all 0.5s",
                            }}
                        >
                            <FiCpu
                                size={36}
                                style={{
                                    color: currentStage >= 2 ? "#facc15" : "#ffffff20",
                                    filter: currentStage >= 2 ? "drop-shadow(0 0 8px #facc15)" : "none",
                                    transition: "all 0.5s",
                                }}
                            />
                            <p
                                className="text-xs tracking-widest text-center"
                                style={{
                                    color: currentStage >= 2 ? "#facc15" : "#ffffff30",
                                    fontFamily: "'Courier New', monospace",
                                    textShadow: currentStage >= 2 ? "0 0 8px #facc15" : "none",
                                }}
                            >
                                ESP32 CONTROLLER
                            </p>
                            {currentStage >= 2 && (
                                <motion.div
                                    className="flex gap-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: "#facc15" }}
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.25 }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Servo */}
                        <motion.div
                            className="relative rounded-xl border p-4 flex flex-col items-center gap-3"
                            style={{
                                borderColor: servoActive ? "#facc1540" : "#ffffff10",
                                background: servoActive ? "rgba(250,204,21,0.04)" : "rgba(10,10,15,0.6)",
                                boxShadow: servoActive ? "0 0 20px rgba(250,204,21,0.15)" : "none",
                                transition: "all 0.5s",
                            }}
                        >
                            <ServoDial active={servoActive} />
                            <p
                                className="text-xs tracking-widest"
                                style={{
                                    color: servoActive ? "#facc15" : "#ffffff30",
                                    fontFamily: "'Courier New', monospace",
                                    textShadow: servoActive ? "0 0 8px #facc15" : "none",
                                }}
                            >
                                MOTOR ACTUATOR
                            </p>
                        </motion.div>

                        {/* Door */}
                        <motion.div
                            className="relative rounded-xl border p-4 flex flex-col items-center gap-3 pb-10"
                            style={{
                                borderColor: doorUnlocked ? "#22c55e40" : "#ff3b3b40",
                                background: doorUnlocked
                                    ? "rgba(34,197,94,0.04)"
                                    : "rgba(255,59,59,0.04)",
                                boxShadow: doorUnlocked
                                    ? "0 0 20px rgba(34,197,94,0.15)"
                                    : "0 0 20px rgba(255,59,59,0.12)",
                                transition: "all 0.5s",
                            }}
                        >
                            <DoorAnimation unlocked={doorUnlocked} />
                        </motion.div>
                    </div>

                    {/* ── Terminal Log ── */}
                    <div
                        className="relative rounded-xl border p-4 overflow-hidden"
                        style={{
                            borderColor: "#00f0ff18",
                            background: "rgba(0,0,0,0.6)",
                            minHeight: 100,
                            maxHeight: 130,
                            overflow: "auto",
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-5 flex items-center px-3 gap-2"
                            style={{ background: "#00f0ff12", borderBottom: "1px solid #00f0ff20" }}
                        >
                            <div className="w-2 h-2 rounded-full" style={{ background: "#ff3b3b" }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: "#facc15" }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                            <span
                                className="text-xs ml-2"
                                style={{ color: "#00f0ff60", fontFamily: "'Courier New', monospace" }}
                            >
                SYSTEM LOG — LIVE FEED
              </span>
                        </div>
                        <div className="mt-5 flex flex-col gap-1">
                            <AnimatePresence>
                                {!started && (
                                    <motion.p
                                        className="font-mono text-xs"
                                        style={{ color: "#ffffff30" }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {">"} Awaiting simulation trigger...
                                    </motion.p>
                                )}
                                {logs.map((log, i) => (
                                    <TerminalLine key={i} text={log.text} color={log.color} delay={0} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── CTA / Access Granted Overlay ── */}
            <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
                {!started && !completed && (
                    <motion.button
                        onClick={startSimulation}
                        className="relative px-10 py-3 rounded-lg font-bold text-sm tracking-widest uppercase overflow-hidden"
                        style={{
                            background: "transparent",
                            border: "2px solid #00f0ff",
                            color: "#00f0ff",
                            fontFamily: "'Courier New', monospace",
                            boxShadow: "0 0 20px rgba(0,240,255,0.25)",
                            textShadow: "0 0 8px #00f0ff",
                        }}
                        whileHover={{
                            boxShadow: "0 0 30px rgba(0,240,255,0.5)",
                            background: "rgba(0,240,255,0.08)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <MdOutlineElectricBolt className="inline mr-2" size={16} />
                        Initiate Simulation
                    </motion.button>
                )}

                {started && !completed && (
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#00f0ff" }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 0.9 }}
                        />
                        <span
                            style={{
                                color: "#00f0ff80",
                                fontFamily: "'Courier New', monospace",
                                fontSize: 11,
                                letterSpacing: "0.2em",
                            }}
                        >
              SIMULATION RUNNING
            </span>
                    </motion.div>
                )}
            </div>

            {/* ── ACCESS GRANTED Full-Screen Overlay ── */}
            <AnimatePresence>
                {completed && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                        style={{ background: "rgba(3,3,10,0.97)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HexBackground />
                        <ScanLines />

                        {/* Radial burst */}
                        <motion.div
                            className="absolute"
                            style={{
                                width: 700,
                                height: 700,
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)",
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />

                        {/* Ring 1 */}
                        <motion.div
                            className="absolute border rounded-full"
                            style={{ width: 300, height: 300, borderColor: "#22c55e30" }}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.8, 1.05, 1], opacity: [0, 1, 0.4] }}
                            transition={{ duration: 1.2, delay: 0.1 }}
                        />
                        {/* Ring 2 */}
                        <motion.div
                            className="absolute border rounded-full"
                            style={{ width: 450, height: 450, borderColor: "#22c55e20" }}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.6, 1.05, 1], opacity: [0, 0.6, 0.2] }}
                            transition={{ duration: 1.4, delay: 0.2 }}
                        />

                        {/* Checkmark */}
                        <motion.div
                            className="relative flex items-center justify-center w-28 h-28 rounded-full mb-6"
                            style={{
                                background: "rgba(34,197,94,0.1)",
                                border: "2px solid #22c55e",
                                boxShadow:
                                    "0 0 40px rgba(34,197,94,0.5), inset 0 0 20px rgba(34,197,94,0.1)",
                            }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                        >
                            <FiCheckCircle
                                size={52}
                                style={{
                                    color: "#22c55e",
                                    filter: "drop-shadow(0 0 12px #22c55e)",
                                }}
                            />
                        </motion.div>

                        <motion.h2
                            className="text-6xl font-black tracking-tighter mb-3"
                            style={{
                                fontFamily: "'Courier New', monospace",
                                color: "#22c55e",
                                textShadow:
                                    "0 0 20px rgba(34,197,94,0.8), 0 0 60px rgba(34,197,94,0.4)",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            ACCESS GRANTED
                        </motion.h2>

                        <motion.div
                            className="h-px w-96 mb-4"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, #22c55e, transparent)",
                                boxShadow: "0 0 12px #22c55e",
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        />

                        <motion.p
                            className="text-lg tracking-widest uppercase mb-2"
                            style={{
                                fontFamily: "'Courier New', monospace",
                                color: "#ffffff80",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            Authorised Personnel May Enter
                        </motion.p>

                        <motion.p
                            className="text-xs tracking-widest"
                            style={{
                                fontFamily: "'Courier New', monospace",
                                color: "#22c55e60",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ delay: 1.1, duration: 2, repeat: Infinity }}
                        >
                            ● DOOR OPEN ● QUANTUM-SAFE SESSION ACTIVE ●
                        </motion.p>

                        <motion.button
                            onClick={resetSimulation}
                            className="mt-10 px-8 py-2.5 rounded-lg text-xs tracking-widest uppercase"
                            style={{
                                border: "1px solid #22c55e40",
                                color: "#22c55e80",
                                fontFamily: "'Courier New', monospace",
                                background: "transparent",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            whileHover={{
                                borderColor: "#22c55e",
                                color: "#22c55e",
                                boxShadow: "0 0 16px rgba(34,197,94,0.3)",
                            }}
                        >
                            ↺ Run Again
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
