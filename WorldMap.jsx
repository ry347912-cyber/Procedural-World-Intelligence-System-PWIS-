import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIOMES, ENTITY_TYPES } from "../utils/worldGen.js";

const BIOME_SYMBOLS = {
  VOID_EXPANSE: "◌",
  NEURAL_FOREST: "⋮",
  CRYSTAL_WASTES: "◇",
  DATA_OCEAN: "≈",
  PLASMA_PEAKS: "▲",
  QUANTUM_MEADOW: "✦",
  CORRUPTED_ZONE: "✕",
};

function RegionCard({ region, isSelected, onClick }) {
  const biome = BIOMES[region.biome];
  const stabilityColor =
    region.stability > 0.65
      ? "#10b981"
      : region.stability > 0.35
      ? "#f59e0b"
      : "#ef4444";

  return (
    <motion.div
      onClick={() => onClick(region)}
      className={`relative cursor-pointer border rounded p-3 transition-all ${
        isSelected
          ? "border-[#00d4ff] bg-[rgba(0,212,255,0.08)]"
          : "border-[rgba(0,212,255,0.1)] bg-[rgba(10,22,40,0.6)] hover:border-[rgba(0,212,255,0.3)] hover:bg-[rgba(0,212,255,0.04)]"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Biome indicator */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="text-xl leading-none"
            style={{ color: biome.accent }}
          >
            {BIOME_SYMBOLS[region.biome]}
          </span>
          <div>
            <div className="text-[10px] font-mono text-white font-medium">
              {region.name}
            </div>
            <div className="text-[8px] font-mono tracking-widest" style={{ color: biome.accent }}>
              {biome.name.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="text-right">
          {!region.discovered && (
            <span className="text-[8px] font-mono text-[rgba(255,255,255,0.3)] tracking-widest">
              UNEXPLORED
            </span>
          )}
          {region.threat > 0.7 && (
            <span className="text-[8px] font-mono text-[#ef4444] tracking-widest ml-1">
              ⚠ HOSTILE
            </span>
          )}
        </div>
      </div>

      {/* Mini stability bar */}
      <div className="progress-bar mt-1">
        <div
          className="h-full rounded transition-all duration-500"
          style={{
            width: `${region.stability * 100}%`,
            background: stabilityColor,
            boxShadow: `0 0 4px ${stabilityColor}66`,
          }}
        />
      </div>

      {/* Entity count */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1">
          {region.entities.slice(0, 5).map((entity, i) => {
            const entityType = ENTITY_TYPES[entity.type];
            return (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: entity.active ? entityType.color : "rgba(255,255,255,0.2)",
                  boxShadow: entity.active ? `0 0 4px ${entityType.color}` : "none",
                }}
                title={entity.name}
              />
            );
          })}
          {region.entities.length > 5 && (
            <span className="text-[8px] text-[rgba(255,255,255,0.4)] font-mono ml-1">
              +{region.entities.length - 5}
            </span>
          )}
        </div>
        <div className="text-[8px] font-mono text-[rgba(255,255,255,0.4)]">
          {Math.round(region.stability * 100)}% stable
        </div>
      </div>

      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-[#00d4ff] rounded pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export default function WorldMap({ world, selectedRegion, onSelectRegion }) {
  const [filter, setFilter] = useState("ALL");

  if (!world) return null;

  const biomeKeys = ["ALL", ...new Set(world.regions.map((r) => r.biome))];
  const filtered =
    filter === "ALL"
      ? world.regions
      : world.regions.filter((r) => r.biome === filter);

  return (
    <div className="panel corner-bracket p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[10px] font-display text-[#10b981] tracking-[3px] uppercase">
            World Map
          </span>
        </div>
        <div className="text-[9px] font-mono text-[rgba(255,255,255,0.4)]">
          {filtered.length} SECTORS
        </div>
      </div>

      {/* Biome filter */}
      <div className="flex gap-1 flex-wrap mb-4">
        {biomeKeys.map((key) => {
          const biome = BIOMES[key];
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-[8px] font-mono tracking-widest px-2 py-1 border rounded transition-all ${
                filter === key
                  ? "border-[#00d4ff] text-[#00d4ff] bg-[rgba(0,212,255,0.1)]"
                  : "border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.3)]"
              }`}
              style={
                filter === key && biome
                  ? { borderColor: biome.accent, color: biome.accent }
                  : {}
              }
            >
              {key === "ALL" ? "ALL" : BIOMES[key]?.name.split(" ")[0] ?? key}
            </button>
          );
        })}
      </div>

      {/* Region grid */}
      <div className="overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 pr-1">
        <AnimatePresence>
          {filtered.map((region) => (
            <RegionCard
              key={region.id}
              region={region}
              isSelected={selectedRegion?.id === region.id}
              onClick={onSelectRegion}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
