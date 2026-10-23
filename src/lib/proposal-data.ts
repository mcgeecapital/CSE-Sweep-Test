/** Street-sweep proposal data for Sun City Hilton Head (south of Hwy 278). */

export type ZoneKind = "residential" | "golf" | "arterial";

export interface SweepZone {
  id: string;
  name: string;
  shortLabel: string;
  kind: ZoneKind;
  description: string;
  /** Centerline miles estimated for proposed sweep. */
  centerlineMiles: number;
  /** Rate per centerline mile (both gutters, one complete pass). */
  ratePerMile: number;
  color: string;
  fill: string;
}

export const COMPANY = {
  name: "Carolina Sweep Environmental",
  tagline: "Street sweeping · Stormwater compliance · Lowcountry communities",
  proposalId: "CSE-SCHH-2026-001",
  preparedFor: "Sun City Hilton Head Community Association",
  jobTitle: "Full Community Street Sweep — South of Highway 278",
  location: "Okatie / Bluffton, South Carolina",
  validThrough: "November 30, 2026",
} as const;

export const METHODOLOGY = {
  scaleBarFeet: 2000,
  communityRoadMilesPublished: 80,
  /** Share of internal street network south of Hwy 278, from map apportionment. */
  southOf278Share: 0.78,
  mapWidthMilesApprox: 2.8,
  mapDepthMilesApprox: 2.0,
  notes: [
    "Google Maps screenshot scale bar reads 2,000 ft (bottom-right of source map).",
    "Sun City Hilton Head Association materials cite approximately 80 miles of internal roads community-wide.",
    "Visual apportionment of the street network places ~78% of centerline length south of Highway 278 (Fording Island Rd), inside the community boundary (orange dotted line on source map).",
    "Zones were drawn from residential clusters (light/white blocks) versus golf and wooded corridors (green fills), plus named collectors such as Sun City Blvd and Del Webb Blvd.",
    "Linear feet = centerline miles × 5,280. Pricing assumes one complete dual-gutter pass with regenerative-air or mechanical broom equipment.",
  ],
} as const;

/** Rates: commercial HOA one-time sweep (SC / Southeast). */
export const RATES = {
  residential: 172,
  golf: 148,
  arterial: 195,
  mobilization: 850,
  debrisDisposal: 1200,
} as const;

export const ZONES: SweepZone[] = [
  {
    id: "west-residential",
    name: "West Residential Cluster",
    shortLabel: "Zone A",
    kind: "residential",
    description:
      "Dense cul-de-sac and loop streets west of Sun City Blvd, including neighborhoods near Red Dam Rd and the western community gate.",
    centerlineMiles: 11.2,
    ratePerMile: RATES.residential,
    color: "#0d7a6f",
    fill: "rgba(13, 122, 111, 0.35)",
  },
  {
    id: "central-west",
    name: "Central-West Neighborhoods",
    shortLabel: "Zone B",
    kind: "residential",
    description:
      "Highest street density south of 278 — white-block residential fabric between Sun City Blvd and the Hidden Cypress golf edge.",
    centerlineMiles: 14.8,
    ratePerMile: RATES.residential,
    color: "#1a8f82",
    fill: "rgba(26, 143, 130, 0.38)",
  },
  {
    id: "hidden-cypress",
    name: "Hidden Cypress Golf Corridor",
    shortLabel: "Zone C",
    kind: "golf",
    description:
      "Lower-density collector and perimeter roads threading green golf / wooded fills around Hidden Cypress Golf Club. Fewer streets, longer runs.",
    centerlineMiles: 6.4,
    ratePerMile: RATES.golf,
    color: "#5a8f3c",
    fill: "rgba(90, 143, 60, 0.4)",
  },
  {
    id: "del-webb-east",
    name: "Del Webb / Central-East",
    shortLabel: "Zone D",
    kind: "residential",
    description:
      "Residential street network along and east of Del Webb Blvd — loops, courts, and connectors in the central-east white blocks.",
    centerlineMiles: 13.6,
    ratePerMile: RATES.residential,
    color: "#0e6b8a",
    fill: "rgba(14, 107, 138, 0.36)",
  },
  {
    id: "southeast",
    name: "Southeast / Okatie Edge",
    shortLabel: "Zone E",
    kind: "residential",
    description:
      "Southern and southeastern residential pockets approaching Hwy 170 / Okatie Parkway, inside the orange community boundary.",
    centerlineMiles: 10.2,
    ratePerMile: RATES.residential,
    color: "#2b6e9e",
    fill: "rgba(43, 110, 158, 0.36)",
  },
  {
    id: "arterials",
    name: "Primary Collectors",
    shortLabel: "Zone F",
    kind: "arterial",
    description:
      "Sun City Blvd, Del Webb Blvd spines, and other multi-lane collectors that link neighborhood clusters (excluded from residential zone totals).",
    centerlineMiles: 6.2,
    ratePerMile: RATES.arterial,
    color: "#c45f1a",
    fill: "rgba(196, 95, 26, 0.4)",
  },
];

export function zoneCost(zone: SweepZone): number {
  return zone.centerlineMiles * zone.ratePerMile;
}

export function zoneLinearFeet(zone: SweepZone): number {
  return Math.round(zone.centerlineMiles * 5280);
}

export function totals() {
  const sweepSubtotal = ZONES.reduce((sum, z) => sum + zoneCost(z), 0);
  const centerlineMiles = ZONES.reduce((sum, z) => sum + z.centerlineMiles, 0);
  const linearFeet = Math.round(centerlineMiles * 5280);
  const curbMiles = centerlineMiles * 2;
  const grandTotal =
    sweepSubtotal + RATES.mobilization + RATES.debrisDisposal;
  return {
    centerlineMiles,
    linearFeet,
    curbMiles,
    sweepSubtotal,
    mobilization: RATES.mobilization,
    debrisDisposal: RATES.debrisDisposal,
    grandTotal,
  };
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

export function formatMiles(n: number): string {
  return `${n.toFixed(1)} mi`;
}

export function formatFeet(n: number): string {
  return new Intl.NumberFormat("en-US").format(n) + " ft";
}
