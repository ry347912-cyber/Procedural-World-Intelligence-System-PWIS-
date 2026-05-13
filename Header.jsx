import React from "react";
import { motion } from "framer-motion";

export default function Header({ world, tick, isRunning, onToggle, onGenerate, seed }) {
  return (
    <header className="border-b border-[rgba(0,212,255,0.15)] px-6 py-3 flex items-center justify-between bg-[rgba(2,4,8,0.95)] backdrop-blur-xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <motion.div
            className="w-8 h-8 border-2 border-[#00d4ff] rotate-45"
            animate={{ rotate: isRunning ? [45, 90, 45] : 45 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-2 bg-[#00d4ff] opacity-20 rotate-45" />
        </div>
        <div>
          <h1 className="font-display text-[#00d4ff] text-sm font-bold tracking-[3px] text-glow flicker">
            PWIS
          </h1>
          <p className="text-[9px] text-[rgba(0,212,255,0.5)] tracking-[2px] font-mono uppercase">
            Procedural World Intelligence System
          </p>
        </div>
      </div>

      {/* Center status */}
      <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-[rgba(0,212,255,0.6)] tracking-widest">
        <div className="flex items-center gap-2">
          <span className={`status-dot ${isRunning ? "status-active" : "status-warning"}`} />
          <span>{isRunning ? "SIMULATING" : "STANDBY"}</span>
        </div>
        <div className="text-[rgba(255,255,255,0.3)]">|</div>
        <div>
          TICK: <span className="text-[#00d4ff]">{String(tick).padStart(6, "0")}</span>
        </div>
        {world && (
          <>
            <div className="text-[rgba(255,255,255,0.3)]">|</div>
            <div className="truncate max-w-[180px]">
              WORLD: <span className="text-[#10b981]">{world.name}</span>
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="btn-primary text-[10px] px-4 py-2"
        >
          {isRunning ? "⏸ PAUSE" : "▶ RUN"}
        </button>
        <button
          onClick={() => onGenerate()}
          className="btn-primary text-[10px] px-4 py-2"
          style={{ borderColor: "#7c3aed", color: "#7c3aed" }}
        >
          ⟳ REGENERATE
        </button>
        <div className="hidden lg:block text-[9px] text-[rgba(0,212,255,0.4)] font-mono">
          SEED:{" "}
          <span className="text-[rgba(0,212,255,0.7)]">{seed}</span>
        </div>
      </div>
    </header>
  );
}
