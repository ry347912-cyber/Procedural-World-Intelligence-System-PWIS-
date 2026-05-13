import { useState, useEffect, useCallback, useRef } from "react";
import { generateWorld } from "../utils/worldGen.js";

export function useWorldSimulation() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 999999));
  const [world, setWorld] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);

  // Generate world from seed
  const generateNewWorld = useCallback((newSeed) => {
    const s = newSeed ?? Math.floor(Math.random() * 999999);
    setSeed(s);
    const w = generateWorld(s);
    setWorld(w);
    setTick(0);
    setSelectedRegion(null);
  }, []);

  // Initialize on mount
  useEffect(() => {
    generateNewWorld(seed);
  }, []);

  // Simulation tick
  const simulationTick = useCallback(() => {
    setTick((t) => t + 1);
    setWorld((prev) => {
      if (!prev) return prev;
      // Evolve world state on each tick
      return {
        ...prev,
        stats: {
          ...prev.stats,
          processingLoad: Math.min(
            1,
            Math.max(0.1, prev.stats.processingLoad + (Math.random() - 0.5) * 0.05)
          ),
          memoryUsage: Math.min(
            1,
            Math.max(0.1, prev.stats.memoryUsage + (Math.random() - 0.5) * 0.03)
          ),
          networkLatency:
            Math.max(1, prev.stats.networkLatency + Math.floor((Math.random() - 0.5) * 10)),
          corruptionLevel: Math.min(
            1,
            Math.max(0, prev.stats.corruptionLevel + (Math.random() - 0.52) * 0.01)
          ),
        },
        regions: prev.regions.map((region) => ({
          ...region,
          stability: Math.min(
            1,
            Math.max(0, region.stability + (Math.random() - 0.5) * 0.02)
          ),
          entities: region.entities.map((entity) => ({
            ...entity,
            energy: Math.min(1, Math.max(0, entity.energy + (Math.random() - 0.4) * 0.05)),
            x: Math.min(100, Math.max(0, entity.x + (Math.random() - 0.5) * 3)),
            y: Math.min(100, Math.max(0, entity.y + (Math.random() - 0.5) * 3)),
          })),
        })),
      };
    });
  }, []);

  // Start/stop simulation loop
  useEffect(() => {
    if (isRunning) {
      const interval = 1000 / speed;
      intervalRef.current = setInterval(simulationTick, interval);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, speed, simulationTick]);

  const toggleSimulation = useCallback(() => {
    setIsRunning((r) => !r);
  }, []);

  return {
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
  };
}
