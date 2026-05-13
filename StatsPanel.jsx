import React from "react";
import { motion } from "framer-motion";

function StatBar({ label, value, color = "#00d4ff", format = "percent" }) {
  const display =
    format === "percent"
      ? `${Math.round(value * 100)}%`
      : format === "ms"
      ? `${value}ms`
      : value;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] font-mono text-[rgba(255,255,255,0.5)] tracking-widest uppercase">
          {label}
        </span>
        <span className="text-[10px] font-mono" style={{ color }}>
          {display}
        </span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
          animate={{ width: `${Math.round(value * 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function StatsPanel({ world }) {
  if (!world) return null;
  const { stats } = world;

  const stability = world.regions.reduce((a, r) => a + r.stability, 0) / world.regions.length;
  const corruptionColor = stats.corruptionLevel > 0.3 ? "#ef4444" : stats.corruptionLevel > 0.15 ? "#f59e0b" : "#10b981";

  return (
    <div className="panel corner-bracket p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
        <span className="text-[10px] font-display text-[#00d4ff] tracking-[3px] uppercase">
          System Metrics
        </span>
      </div>

      <StatBar label="Processing Load" value={stats.processingLoad} color="#00d4ff" />
      <StatBar label="Memory Usage" value={stats.memoryUsage} color="#7c3aed" />
      <StatBar
        label="World Stability"
        value={stability}
        color={stability > 0.6 ? "#10b981" : stability > 0.35 ? "#f59e0b" : "#ef4444"}
      />
      <StatBar label="Corruption Level" value={stats.corruptionLevel} color={corruptionColor} />

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { label: "Regions", value: stats.totalRegions },
          { label: "Entities", value: stats.totalEntities },
          { label: "Explored", value: `${stats.discoveredRegions}/${stats.totalRegions}` },
          { label: "Latency", value: `${stats.networkLatency}ms` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-[rgba(0,212,255,0.04)] border border-[rgba(0,212,255,0.1)] rounded p-2 text-center"
          >
            <div className="text-[#00d4ff] text-sm font-mono font-bold">{value}</div>
            <div className="text-[8px] text-[rgba(255,255,255,0.4)] tracking-widest uppercase mt-0.5">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
