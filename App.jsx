import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorldSimulation } from "./hooks/useWorldSimulation.js";
import Header from "./components/Header.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import WorldMap from "./components/WorldMap.jsx";
import RegionDetail from "./components/RegionDetail.jsx";
import EventLog from "./components/EventLog.jsx";
import SeedControl from "./components/SeedControl.jsx";
import SpeedControl from "./components/SpeedControl.jsx";

export default function App() {
  const {
    world,
    seed,
    tick,
    isRunning,
    speed,
    selectedRegion,
    setSelectedRegion,
    setSpeed,
    generateNewWorld,
    toggleSimulation,
  } = useWorldSimulation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        world={world}
        tick={tick}
        isRunning={isRunning}
        onToggle={toggleSimulation}
        onGenerate={generateNewWorld}
        seed={seed}
      />

      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4 max-w-[1600px] mx-auto w-full">
        {/* Left sidebar */}
        <aside className="flex flex-col gap-4">
          <StatsPanel world={world} />
          <SeedControl currentSeed={seed} onGenerate={generateNewWorld} />
          <SpeedControl speed={speed} onSetSpeed={setSpeed} isRunning={isRunning} />
        </aside>

        {/* Center — World Map */}
        <section className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {world ? (
              <motion.div
                key={world.seed}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <WorldMap
                  world={world}
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="panel corner-bracket h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 border-2 border-[#00d4ff] rotate-45 mx-auto mb-4"
                    animate={{ rotate: [45, 90, 45] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-[10px] font-mono text-[rgba(0,212,255,0.6)] tracking-widest">
                    INITIALIZING WORLD...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Right sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="flex-1 min-h-[300px]">
            <RegionDetail region={selectedRegion} />
          </div>
          <EventLog events={world?.events ?? []} />
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,212,255,0.1)] px-6 py-2 flex items-center justify-between">
        <div className="text-[8px] font-mono text-[rgba(255,255,255,0.2)] tracking-widest">
          PWIS v1.0.0 · PROCEDURAL WORLD INTELLIGENCE SYSTEM
        </div>
        <div className="text-[8px] font-mono text-[rgba(255,255,255,0.2)] tracking-widest">
          © 2024 · ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
}
