import React from "react";
import { motion } from "framer-motion";

const SPEEDS = [
  { label: "0.25×", value: 0.25 },
  { label: "0.5×", value: 0.5 },
  { label: "1×", value: 1 },
  { label: "2×", value: 2 },
  { label: "5×", value: 5 },
  { label: "10×", value: 10 },
];

export default function SpeedControl({ speed, onSetSpeed, isRunning }) {
  return (
    <div className="panel corner-bracket p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isRunning ? "#10b981" : "#f59e0b",
              boxShadow: `0 0 6px ${isRunning ? "#10b981" : "#f59e0b"}`,
            }}
          />
          <span className="text-[10px] font-display text-[rgba(255,255,255,0.7)] tracking-[2px] uppercase">
            Simulation Speed
          </span>
        </div>
        <span className="text-[#00d4ff] text-xs font-mono font-bold">
          {speed}×
        </span>
      </div>
      <div className="flex gap-1">
        {SPEEDS.map(({ label, value }) => (
          <motion.button
            key={value}
            onClick={() => onSetSpeed(value)}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 text-[9px] font-mono py-1.5 border rounded transition-all ${
              speed === value
                ? "border-[#00d4ff] text-[#00d4ff] bg-[rgba(0,212,255,0.12)]"
                : "border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)] hover:border-[rgba(0,212,255,0.3)]"
            }`}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
