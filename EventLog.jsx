import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeAgo } from "../utils/worldGen.js";

const SEVERITY_STYLES = {
  CRITICAL: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
  ALERT: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  WARNING: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.15)",
  },
  INFO: {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.15)",
  },
  SUCCESS: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.05)",
    border: "rgba(16,185,129,0.15)",
  },
};

export default function EventLog({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="panel corner-bracket p-4">
        <div className="text-[rgba(255,255,255,0.3)] text-center text-[10px] font-mono py-4">
          NO EVENTS RECORDED
        </div>
      </div>
    );
  }

  return (
    <div className="panel corner-bracket p-4 scanline">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" style={{ animation: "pulse 1s infinite" }} />
        <span className="text-[10px] font-display text-[#f59e0b] tracking-[3px] uppercase">
          Event Log
        </span>
        <span className="ml-auto text-[9px] font-mono text-[rgba(255,255,255,0.3)]">
          {events.length} EVENTS
        </span>
      </div>

      <div className="space-y-1 overflow-y-auto max-h-64">
        <AnimatePresence>
          {events.map((event, i) => {
            const style = SEVERITY_STYLES[event.severity] || SEVERITY_STYLES.INFO;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-2 p-2 rounded border"
                style={{
                  background: style.bg,
                  borderColor: style.border,
                }}
              >
                <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color: style.color }}>
                  {event.prefix}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-mono text-[rgba(255,255,255,0.8)] leading-relaxed">
                    {event.message}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-[7px] font-mono tracking-widest font-bold"
                      style={{ color: style.color }}
                    >
                      {event.severity}
                    </span>
                    <span className="text-[7px] font-mono text-[rgba(255,255,255,0.3)]">
                      {timeAgo(event.timestamp)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
