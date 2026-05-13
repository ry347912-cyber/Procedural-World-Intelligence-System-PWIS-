// Procedural World Generation Utilities

/**
 * Seeded pseudo-random number generator (LCG)
 */
export class SeededRandom {
  constructor(seed = Date.now()) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min, max) {
    return this.next() * (max - min) + min;
  }

  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
}

/**
 * Biome types and their properties
 */
export const BIOMES = {
  VOID_EXPANSE: {
    id: "VOID_EXPANSE",
    name: "Void Expanse",
    color: "#020408",
    accent: "#00d4ff",
    temperature: -273,
    humidity: 0,
    stability: 0.1,
    resources: ["dark_matter", "quantum_foam"],
    description: "Primordial emptiness between realities",
  },
  NEURAL_FOREST: {
    id: "NEURAL_FOREST",
    name: "Neural Forest",
    color: "#0a1628",
    accent: "#10b981",
    temperature: 22,
    humidity: 65,
    stability: 0.7,
    resources: ["synaptic_fiber", "memory_crystal", "cognitive_resin"],
    description: "Dense network of living data pathways",
  },
  CRYSTAL_WASTES: {
    id: "CRYSTAL_WASTES",
    name: "Crystal Wastes",
    color: "#1a0a2e",
    accent: "#7c3aed",
    temperature: -40,
    humidity: 5,
    stability: 0.4,
    resources: ["quantum_crystal", "phase_dust", "temporal_shard"],
    description: "Frozen fields of computational mineral",
  },
  DATA_OCEAN: {
    id: "DATA_OCEAN",
    name: "Data Ocean",
    color: "#001525",
    accent: "#00d4ff",
    temperature: 4,
    humidity: 100,
    stability: 0.6,
    resources: ["raw_data", "signal_ore", "byte_coral"],
    description: "Infinite sea of unprocessed information",
  },
  PLASMA_PEAKS: {
    id: "PLASMA_PEAKS",
    name: "Plasma Peaks",
    color: "#1a0500",
    accent: "#f59e0b",
    temperature: 5000,
    humidity: 0,
    stability: 0.2,
    resources: ["fusion_core", "plasma_vein", "energy_crystal"],
    description: "Volcanic mountains of raw energy",
  },
  QUANTUM_MEADOW: {
    id: "QUANTUM_MEADOW",
    name: "Quantum Meadow",
    color: "#001a10",
    accent: "#34d399",
    temperature: 18,
    humidity: 55,
    stability: 0.85,
    resources: ["probability_seed", "quantum_bloom", "entangled_root"],
    description: "Fields where reality exists in superposition",
  },
  CORRUPTED_ZONE: {
    id: "CORRUPTED_ZONE",
    name: "Corrupted Zone",
    color: "#1a0a0a",
    accent: "#ef4444",
    temperature: 0,
    humidity: 30,
    stability: 0.05,
    resources: ["error_fragment", "null_ore", "glitch_crystal"],
    description: "Regions where the simulation has broken down",
  },
};

/**
 * Intelligence Entity types
 */
export const ENTITY_TYPES = {
  SENTINEL: {
    id: "SENTINEL",
    name: "Sentinel",
    role: "Guardian",
    color: "#00d4ff",
    aggression: 0.2,
    intelligence: 0.8,
    speed: 0.6,
    description: "Patrol and protect designated zones",
  },
  HARVESTER: {
    id: "HARVESTER",
    name: "Harvester",
    role: "Resource Collector",
    color: "#10b981",
    aggression: 0.1,
    intelligence: 0.5,
    speed: 0.4,
    description: "Extract and process environmental resources",
  },
  ARCHITECT: {
    id: "ARCHITECT",
    name: "Architect",
    role: "World Builder",
    color: "#7c3aed",
    aggression: 0.0,
    intelligence: 0.95,
    speed: 0.3,
    description: "Redesign and construct new terrain features",
  },
  PREDATOR: {
    id: "PREDATOR",
    name: "Predator",
    role: "Apex Hunter",
    color: "#ef4444",
    aggression: 0.9,
    intelligence: 0.7,
    speed: 0.9,
    description: "Hunt and eliminate corrupted entities",
  },
  ORACLE: {
    id: "ORACLE",
    name: "Oracle",
    role: "Prediction Engine",
    color: "#f59e0b",
    aggression: 0.0,
    intelligence: 1.0,
    speed: 0.1,
    description: "Analyze patterns and forecast world events",
  },
  NEXUS: {
    id: "NEXUS",
    name: "Nexus",
    role: "Hub Intelligence",
    color: "#a855f7",
    aggression: 0.1,
    intelligence: 0.9,
    speed: 0.2,
    description: "Coordinate multiple entity networks",
  },
};

/**
 * Generate a procedural world configuration
 */
export function generateWorld(seed) {
  const rng = new SeededRandom(seed);
  const biomeKeys = Object.keys(BIOMES);
  const entityKeys = Object.keys(ENTITY_TYPES);

  const worldSize = rng.nextInt(8, 16);
  const regions = [];

  for (let i = 0; i < worldSize; i++) {
    const biomeKey = rng.pick(biomeKeys);
    const biome = BIOMES[biomeKey];
    const entityCount = rng.nextInt(2, 8);
    const entities = [];

    for (let j = 0; j < entityCount; j++) {
      const entityKey = rng.pick(entityKeys);
      const entityType = ENTITY_TYPES[entityKey];
      entities.push({
        id: `entity_${i}_${j}`,
        type: entityKey,
        name: `${entityType.name} ${String.fromCharCode(65 + j)}`,
        health: rng.nextFloat(0.3, 1.0),
        energy: rng.nextFloat(0.2, 1.0),
        x: rng.nextFloat(0, 100),
        y: rng.nextFloat(0, 100),
        active: rng.next() > 0.2,
        behavior: rng.pick(["PATROL", "IDLE", "HUNT", "BUILD", "HARVEST"]),
      });
    }

    const resourceCount = rng.nextInt(2, 5);
    const resources = [];
    for (let k = 0; k < resourceCount; k++) {
      const res = rng.pick(biome.resources);
      resources.push({
        type: res,
        amount: rng.nextFloat(0.1, 1.0),
        rate: rng.nextFloat(0.01, 0.1),
      });
    }

    regions.push({
      id: `region_${i}`,
      name: `Sector ${String.fromCharCode(65 + (i % 26))}-${Math.floor(i / 26) + 1}`,
      biome: biomeKey,
      entities,
      resources,
      stability: biome.stability + rng.nextFloat(-0.1, 0.1),
      discovered: rng.next() > 0.4,
      threat: rng.nextFloat(0, 1),
      coordinates: {
        x: rng.nextInt(0, 999),
        y: rng.nextInt(0, 999),
        z: rng.nextInt(0, 99),
      },
    });
  }

  const totalEntities = regions.reduce((acc, r) => acc + r.entities.length, 0);
  const avgStability =
    regions.reduce((acc, r) => acc + r.stability, 0) / regions.length;
  const discoveredCount = regions.filter((r) => r.discovered).length;

  return {
    seed,
    name: generateWorldName(rng),
    version: "2.4.7",
    created: Date.now(),
    regions,
    stats: {
      totalRegions: worldSize,
      totalEntities,
      discoveredRegions: discoveredCount,
      avgStability: Math.min(1, Math.max(0, avgStability)),
      corruptionLevel: rng.nextFloat(0.05, 0.35),
      processingLoad: rng.nextFloat(0.4, 0.95),
      memoryUsage: rng.nextFloat(0.3, 0.9),
      networkLatency: rng.nextInt(2, 150),
    },
    events: generateEvents(rng, regions),
  };
}

/**
 * Generate a world name
 */
function generateWorldName(rng) {
  const prefixes = [
    "NEXUS", "QUANTUM", "SIGMA", "OMEGA", "ALPHA", "DELTA", "VOID", "PRIME",
    "ECHO", "CIPHER", "MATRIX", "AXIOM", "CORTEX", "HELIX",
  ];
  const suffixes = [
    "PRIME", "ZERO", "ABSOLUTE", "EPOCH", "INFINITE", "CORE", "DEEP",
    "BEYOND", "ULTRA", "HYPER", "TERMINUS", "ORIGIN",
  ];
  const num = rng.nextInt(100, 9999);
  return `${rng.pick(prefixes)}-${rng.pick(suffixes)}-${num}`;
}

/**
 * Generate world events
 */
function generateEvents(rng, regions) {
  const eventTypes = [
    { type: "ANOMALY_DETECTED", severity: "WARNING", prefix: "⚠" },
    { type: "ENTITY_CONFLICT", severity: "ALERT", prefix: "⚡" },
    { type: "RESOURCE_SURGE", severity: "INFO", prefix: "↑" },
    { type: "CORRUPTION_SPREAD", severity: "CRITICAL", prefix: "☠" },
    { type: "STABILITY_RESTORED", severity: "SUCCESS", prefix: "✓" },
    { type: "NEW_PATHWAY", severity: "INFO", prefix: "→" },
    { type: "ENTITY_EVOLVED", severity: "INFO", prefix: "★" },
    { type: "REALITY_BREACH", severity: "CRITICAL", prefix: "!" },
  ];

  const count = rng.nextInt(5, 15);
  const events = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const eventDef = rng.pick(eventTypes);
    const region = rng.pick(regions);
    events.push({
      id: `evt_${i}`,
      ...eventDef,
      region: region.name,
      timestamp: now - rng.nextInt(0, 3600000),
      message: generateEventMessage(eventDef.type, region, rng),
    });
  }

  return events.sort((a, b) => b.timestamp - a.timestamp);
}

function generateEventMessage(type, region, rng) {
  const messages = {
    ANOMALY_DETECTED: [
      `Unclassified energy signature at ${region.name}`,
      `Dimensional fluctuation recorded in ${region.name}`,
      `Unknown entity behavior pattern in ${region.name}`,
    ],
    ENTITY_CONFLICT: [
      `Hostile engagement detected in ${region.name}`,
      `Territory dispute escalating at ${region.name}`,
      `Combat protocols initiated in ${region.name}`,
    ],
    RESOURCE_SURGE: [
      `${region.name} resource yield increased 340%`,
      `Rare material vein discovered in ${region.name}`,
      `Extraction rate optimal in ${region.name}`,
    ],
    CORRUPTION_SPREAD: [
      `Error cascade expanding in ${region.name}`,
      `Null zone growing — ${region.name} compromised`,
      `Data corruption critical in ${region.name}`,
    ],
    STABILITY_RESTORED: [
      `${region.name} stability normalized`,
      `Integrity check passed for ${region.name}`,
      `Patch deployed successfully to ${region.name}`,
    ],
    NEW_PATHWAY: [
      `Wormhole formed between ${region.name} and adjacent sector`,
      `New data conduit established at ${region.name}`,
      `Portal matrix activated in ${region.name}`,
    ],
    ENTITY_EVOLVED: [
      `Evolution event detected in ${region.name}`,
      `Entity upgrade complete at ${region.name}`,
      `Cognitive expansion recorded in ${region.name}`,
    ],
    REALITY_BREACH: [
      `CRITICAL: Reality fabric torn at ${region.name}`,
      `EMERGENCY: Simulation boundary failure in ${region.name}`,
      `ALERT: Dimensional wall collapse imminent at ${region.name}`,
    ],
  };
  return rng.pick(messages[type] || [`Event in ${region.name}`]);
}

/**
 * Format timestamp to relative time
 */
export function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

/**
 * Generate terrain heightmap data for visualization
 */
export function generateHeightmap(seed, size = 20) {
  const rng = new SeededRandom(seed);
  const map = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      // Simple noise simulation
      const val = rng.nextFloat(0, 1);
      row.push(val);
    }
    map.push(row);
  }
  return map;
}
