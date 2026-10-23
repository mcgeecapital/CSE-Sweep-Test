"use client";

import { useState } from "react";
import { ZONES, type SweepZone } from "@/lib/proposal-data";
import { cn } from "@/lib/utils";

const zoneById = Object.fromEntries(ZONES.map((z) => [z.id, z])) as Record<
  string,
  SweepZone
>;

/** Stylized work map: Sun City Hilton Head south of Hwy 278. */
export function WorkMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 900 720"
        className="h-auto w-full"
        role="img"
        aria-label="Proposed street sweep zones south of Highway 278 in Sun City Hilton Head"
      >
        <defs>
          <pattern
            id="fairway"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill="#c5d9b8" />
            <path
              d="M0 12 L12 0"
              stroke="#a8c49a"
              strokeWidth="0.6"
              opacity="0.5"
            />
          </pattern>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodColor="#0f2e24"
              floodOpacity="0.12"
            />
          </filter>
          <linearGradient id="skyWash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dce8e2" />
            <stop offset="100%" stopColor="#e8efe6" />
          </linearGradient>
        </defs>

        {/* Map ground */}
        <rect width="900" height="720" fill="url(#skyWash)" />

        {/* Outside community / wetlands east */}
        <path
          d="M780 180 C820 220, 860 280, 880 360 C890 420, 870 520, 820 600 C780 660, 720 700, 640 710 L900 710 L900 180 Z"
          fill="#b8cfc4"
          opacity="0.55"
        />

        {/* Community boundary (orange dotted — matches source map) */}
        <path
          d="M70 175
             C90 155, 160 145, 240 150
             L520 155
             C600 150, 680 160, 740 190
             C790 230, 810 300, 800 380
             C790 480, 760 560, 700 620
             C620 690, 480 710, 360 700
             C240 685, 140 640, 90 560
             C50 480, 40 360, 55 280
             C60 230, 55 195, 70 175 Z"
          fill="#f4f7f2"
          stroke="#e87a2e"
          strokeWidth="3"
          strokeDasharray="7 5"
          filter="url(#soft)"
        />

        {/* Hwy 278 — northern cut line */}
        <path
          d="M20 168 L880 175"
          stroke="#5a6570"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M20 168 L880 175"
          stroke="#9aa3ab"
          strokeWidth="4"
          strokeDasharray="18 14"
        />
        <text
          x="450"
          y="155"
          textAnchor="middle"
          className="fill-[#3d464e]"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em" }}
        >
          HIGHWAY 278 · FORDING ISLAND RD
        </text>
        <text
          x="450"
          y="140"
          textAnchor="middle"
          className="fill-[#6b757e]"
          style={{ fontSize: 10, letterSpacing: "0.04em" }}
        >
          NORTHERN LIMIT OF PROPOSED WORK — SWEEP AREA BELOW THIS LINE
        </text>

        {/* Golf / wooded fills */}
        <ellipse cx="420" cy="480" rx="110" ry="95" fill="url(#fairway)" />
        <ellipse cx="560" cy="420" rx="85" ry="70" fill="url(#fairway)" />
        <ellipse cx="300" cy="560" rx="70" ry="55" fill="url(#fairway)" />
        <text
          x="420"
          y="485"
          textAnchor="middle"
          fill="#3d5c32"
          style={{ fontSize: 11, fontWeight: 600 }}
        >
          Hidden Cypress
        </text>
        <text
          x="420"
          y="500"
          textAnchor="middle"
          fill="#3d5c32"
          style={{ fontSize: 10 }}
        >
          Golf Club
        </text>

        {/* Zone fills — clickable */}
        <ZoneShape
          id="west-residential"
          active={active}
          onSelect={setActive}
          d="M95 220 C120 200, 180 195, 230 210 L250 320 C240 380, 200 420, 150 430 C100 420, 80 350, 85 280 Z"
        />
        <ZoneShape
          id="central-west"
          active={active}
          onSelect={setActive}
          d="M250 220 C300 200, 360 210, 390 250 L400 380 C370 420, 320 440, 270 420 C240 390, 235 300, 250 220 Z"
        />
        <ZoneShape
          id="hidden-cypress"
          active={active}
          onSelect={setActive}
          d="M340 400 C390 370, 470 375, 520 410 C540 450, 520 520, 460 545 C400 555, 340 520, 330 460 Z"
        />
        <ZoneShape
          id="del-webb-east"
          active={active}
          onSelect={setActive}
          d="M430 220 C490 200, 560 210, 600 250 L620 360 C600 400, 540 420, 490 400 C450 370, 430 300, 430 220 Z"
        />
        <ZoneShape
          id="southeast"
          active={active}
          onSelect={setActive}
          d="M480 520 C540 500, 620 510, 680 560 C700 600, 660 660, 580 670 C520 665, 470 620, 465 570 Z"
        />

        {/* Street texture inside residential zones */}
        <g opacity="0.55" stroke="#dfe6e2" strokeWidth="1.2" fill="none">
          {/* West grid */}
          <path d="M120 240 Q150 250 180 245 Q200 280 170 310 Q140 340 130 370" />
          <path d="M150 230 Q175 260 160 300 Q145 340 155 390" />
          <path d="M190 250 Q210 280 200 330 Q185 370 195 400" />
          <path d="M110 280 Q140 290 170 285 Q200 300 190 340" />
          {/* Central-west dense */}
          <path d="M270 240 Q300 255 330 250 Q350 290 320 330 Q290 360 300 400" />
          <path d="M290 230 Q320 270 310 320 Q295 370 315 410" />
          <path d="M340 250 Q360 290 345 340 Q330 380 350 420" />
          <path d="M260 290 Q295 300 330 295 Q360 320 340 360" />
          <path d="M280 350 Q310 360 340 355 Q365 380 350 405" />
          {/* Del Webb east */}
          <path d="M460 240 Q500 255 540 250 Q570 290 550 340 Q520 370 530 400" />
          <path d="M480 230 Q520 270 510 330 Q495 380 520 405" />
          <path d="M540 250 Q570 300 555 360" />
          <path d="M450 300 Q490 310 530 305 Q560 340 545 370" />
          {/* Southeast */}
          <path d="M520 540 Q560 555 600 550 Q640 580 620 620 Q580 645 560 640" />
          <path d="M540 530 Q580 570 570 610 Q555 645 580 655" />
          <path d="M600 560 Q630 600 610 640" />
          {/* Golf corridor roads */}
          <path
            d="M360 430 Q420 450 480 440 Q520 470 500 510"
            stroke="#8faf7a"
            strokeWidth="2"
          />
          <path
            d="M380 480 Q430 500 470 490"
            stroke="#8faf7a"
            strokeWidth="1.8"
          />
        </g>

        {/* Arterials on top */}
        <ZoneShape
          id="arterials"
          active={active}
          onSelect={setActive}
          d="M310 175 L325 175 L340 620 L320 625 Z"
          strokeOnly
        />
        <path
          d="M310 175 L325 620"
          stroke={zoneById.arterials.color}
          strokeWidth={active === "arterials" ? 8 : 5}
          strokeLinecap="round"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActive("arterials")}
          onMouseLeave={() => setActive(null)}
          onClick={() =>
            setActive((a) => (a === "arterials" ? null : "arterials"))
          }
        />
        <path
          d="M400 210 Q480 280 560 320 Q620 360 650 420"
          stroke={zoneById.arterials.color}
          strokeWidth={active === "arterials" ? 6 : 4}
          fill="none"
          strokeLinecap="round"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActive("arterials")}
          onMouseLeave={() => setActive(null)}
          onClick={() =>
            setActive((a) => (a === "arterials" ? null : "arterials"))
          }
        />

        {/* Road labels */}
        <text
          x="300"
          y="390"
          fill="#c45f1a"
          style={{ fontSize: 10, fontWeight: 700 }}
          transform="rotate(-88 300 390)"
        >
          Sun City Blvd
        </text>
        <text
          x="520"
          y="300"
          fill="#c45f1a"
          style={{ fontSize: 10, fontWeight: 600 }}
          transform="rotate(28 520 300)"
        >
          Del Webb Blvd
        </text>

        {/* Hwy 170 hint */}
        <path
          d="M700 560 Q780 620 820 700"
          stroke="#7a858e"
          strokeWidth="6"
          fill="none"
        />
        <text x="760" y="650" fill="#5a6570" style={{ fontSize: 9 }}>
          Hwy 170
        </text>

        {/* Scale bar */}
        <g transform="translate(70, 660)">
          <line
            x1="0"
            y1="0"
            x2="95"
            y2="0"
            stroke="#1c1917"
            strokeWidth="3"
          />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#1c1917" strokeWidth="2" />
          <line
            x1="95"
            y1="-6"
            x2="95"
            y2="6"
            stroke="#1c1917"
            strokeWidth="2"
          />
          <text x="47" y="18" textAnchor="middle" style={{ fontSize: 11 }}>
            2,000 ft
          </text>
          <text
            x="47"
            y="32"
            textAnchor="middle"
            fill="#6b757e"
            style={{ fontSize: 9 }}
          >
            matched to source map scale
          </text>
        </g>

        {/* Zone letter callouts */}
        {CALL_OUTS.map((c) => (
          <g key={c.id}>
            <circle
              cx={c.x}
              cy={c.y}
              r={14}
              fill={zoneById[c.id].color}
              className="cursor-pointer"
              onMouseEnter={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive((a) => (a === c.id ? null : c.id))}
            />
            <text
              x={c.x}
              y={c.y + 4}
              textAnchor="middle"
              fill="#fff"
              style={{ fontSize: 12, fontWeight: 700, pointerEvents: "none" }}
            >
              {zoneById[c.id].shortLabel.replace("Zone ", "")}
            </text>
          </g>
        ))}

        {/* North of 278 excluded hatch */}
        <text
          x="200"
          y="100"
          fill="#8a939b"
          style={{ fontSize: 11, fontStyle: "italic" }}
        >
          North of 278 — not in this proposal
        </text>
      </svg>

      {/* Active zone tooltip */}
      <div
        className={cn(
          "mt-4 rounded-md border border-[#c5d4cc] bg-white/90 px-4 py-3 transition-opacity",
          active ? "opacity-100" : "opacity-70"
        )}
      >
        {active && zoneById[active] ? (
          <ActiveZoneDetail zone={zoneById[active]} />
        ) : (
          <p className="text-sm text-[#4a5c54]">
            Hover or tap a lettered zone on the map to see street length and
            proposed cost for that area.
          </p>
        )}
      </div>
    </div>
  );
}

const CALL_OUTS: { id: string; x: number; y: number }[] = [
  { id: "west-residential", x: 155, y: 300 },
  { id: "central-west", x: 320, y: 300 },
  { id: "hidden-cypress", x: 430, y: 470 },
  { id: "del-webb-east", x: 530, y: 300 },
  { id: "southeast", x: 580, y: 590 },
  { id: "arterials", x: 360, y: 200 },
];

function ZoneShape({
  id,
  d,
  active,
  onSelect,
  strokeOnly,
}: {
  id: string;
  d: string;
  active: string | null;
  onSelect: (id: string | null) => void;
  strokeOnly?: boolean;
}) {
  const zone = zoneById[id];
  const isActive = active === id;
  if (strokeOnly) return null;
  return (
    <path
      d={d}
      fill={zone.fill}
      stroke={zone.color}
      strokeWidth={isActive ? 3 : 1.5}
      className="cursor-pointer transition-all"
      opacity={active && !isActive ? 0.45 : 1}
      onMouseEnter={() => onSelect(id)}
      onMouseLeave={() => onSelect(null)}
      onClick={() => onSelect(isActive ? null : id)}
    />
  );
}

function ActiveZoneDetail({ zone }: { zone: SweepZone }) {
  const cost = zone.centerlineMiles * zone.ratePerMile;
  const feet = Math.round(zone.centerlineMiles * 5280);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6b757e]">
          {zone.shortLabel}
        </p>
        <p className="font-display text-lg text-[#0f2e24]">{zone.name}</p>
        <p className="mt-1 max-w-xl text-sm text-[#4a5c54]">{zone.description}</p>
      </div>
      <div className="text-right text-sm">
        <p className="tabular-nums text-[#0f2e24]">
          <span className="font-semibold">{zone.centerlineMiles.toFixed(1)}</span>{" "}
          centerline mi · {feet.toLocaleString()} ft
        </p>
        <p className="tabular-nums text-[#0f2e24]">
          ${zone.ratePerMile}/mi →{" "}
          <span className="font-semibold">
            {cost.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}
