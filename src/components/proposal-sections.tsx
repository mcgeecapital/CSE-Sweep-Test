import {
  COMPANY,
  METHODOLOGY,
  RATES,
  ZONES,
  formatFeet,
  formatMiles,
  formatUsd,
  totals,
  zoneCost,
  zoneLinearFeet,
} from "@/lib/proposal-data";
import { WorkMap } from "@/components/work-map";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const t = totals();

export function ProposalDocument() {
  return (
    <div className="bg-[#eef3ef]">
      <Hero />
      <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <ScopeSection />
        <MapSection />
        <PricingSection />
        <MethodologySection />
        <ScheduleSection />
        <TermsSection />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <header className="relative min-h-[100svh] overflow-hidden">
      {/* Atmospheric field — Lowcountry marsh / pine, not flat white */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(45, 110, 90, 0.35), transparent 55%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196, 95, 26, 0.12), transparent 50%),
            linear-gradient(165deg, #0a221c 0%, #143d32 42%, #1a4f42 70%, #0f2e24 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23ffffff' stroke-width='0.4' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dominant map plane — edge to edge under content */}
      <div className="animate-map-reveal absolute inset-x-0 bottom-0 top-[28%] opacity-40 sm:top-[22%] sm:opacity-50">
        <div className="mx-auto h-full max-w-6xl px-2">
          <MiniMapBackdrop />
        </div>
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-4 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10">
        <div className="animate-rise flex items-start justify-between gap-4">
          <p className="font-display text-2xl tracking-tight text-[#e8f2ec] sm:text-3xl md:text-4xl">
            Carolina Sweep
            <span className="block text-lg font-normal tracking-wide text-[#9ec9b8] sm:text-xl">
              Environmental
            </span>
          </p>
          <p className="max-w-[10rem] text-right text-[11px] leading-snug text-[#8fb5a6] sm:max-w-none sm:text-xs">
            Proposal {COMPANY.proposalId}
            <br />
            {COMPANY.validThrough}
          </p>
        </div>

        <div className="animate-rise-delay max-w-2xl pt-16 sm:pt-8">
          <h1 className="font-display text-3xl leading-[1.1] text-[#f2faf6] sm:text-5xl md:text-[3.25rem]">
            Street sweep for Sun City — south of 278
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#b5d4c6] sm:text-lg">
            One complete pass across every association street beneath Highway
            278, priced by neighborhood cluster and golf corridor from the
            community map.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#c5d94e] px-6 text-sm font-semibold text-[#0f2e24] transition hover:bg-[#d4e66a]"
            >
              View investment — {formatUsd(t.grandTotal)}
            </a>
            <a
              href="#map"
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#6a9a88]/60 bg-transparent px-6 text-sm font-medium text-[#e8f2ec] transition hover:border-[#9ec9b8] hover:bg-white/5"
            >
              Open work map
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function MiniMapBackdrop() {
  return (
    <svg viewBox="0 0 900 500" className="h-full w-full" aria-hidden>
      <path
        className="animate-boundary"
        d="M80 40 C200 20, 500 25, 720 60 C800 120, 820 280, 760 400 C650 480, 300 490, 120 420 C40 340, 30 140, 80 40 Z"
        fill="none"
        stroke="#c5d94e"
        strokeWidth="2"
        strokeDasharray="6 4"
        opacity="0.7"
      />
      <path d="M0 50 L900 58" stroke="#9aa3ab" strokeWidth="10" opacity="0.5" />
      <ellipse cx="400" cy="280" rx="90" ry="70" fill="#5a8f3c" opacity="0.35" />
      <rect x="140" y="100" width="120" height="160" rx="8" fill="#0d7a6f" opacity="0.4" />
      <rect x="280" y="90" width="140" height="180" rx="8" fill="#1a8f82" opacity="0.4" />
      <rect x="450" y="100" width="130" height="150" rx="8" fill="#0e6b8a" opacity="0.4" />
      <rect x="520" y="320" width="140" height="100" rx="8" fill="#2b6e9e" opacity="0.4" />
      <path d="M320 60 L340 420" stroke="#c45f1a" strokeWidth="5" opacity="0.6" />
    </svg>
  );
}

function ScopeSection() {
  return (
    <section className="scroll-mt-8 py-16 sm:py-20" id="scope">
      <dl className="mb-14 grid grid-cols-2 gap-4 border-b border-[#c5d4cc] pb-10 sm:grid-cols-4">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[#5a7a6c]">
            Centerline miles
          </dt>
          <dd className="mt-1 font-display text-2xl tabular-nums text-[#0f2e24]">
            {formatMiles(t.centerlineMiles)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[#5a7a6c]">
            Linear feet
          </dt>
          <dd className="mt-1 font-display text-2xl tabular-nums text-[#0f2e24]">
            {formatFeet(t.linearFeet)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[#5a7a6c]">
            Curb miles
          </dt>
          <dd className="mt-1 font-display text-2xl tabular-nums text-[#0f2e24]">
            {t.curbMiles.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-[#5a7a6c]">
            Work zones
          </dt>
          <dd className="mt-1 font-display text-2xl tabular-nums text-[#0f2e24]">
            {ZONES.length}
          </dd>
        </div>
      </dl>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a6c]">
        Scope of work
      </p>
      <h2 className="mt-2 font-display text-3xl text-[#0f2e24] sm:text-4xl">
        Entire Sun City street network south of Highway 278
      </h2>
      <p className="mt-4 max-w-2xl text-[#3d5248]">
        Prepared for {COMPANY.preparedFor}. Work is limited to association-maintained
        streets inside the community boundary (orange dotted line on the source
        Google Maps view), excluding state highways 278 and 170 and all streets
        north of 278.
      </p>
      <ul className="mt-8 space-y-3 text-[#2a3d34]">
        {[
          "Mechanical / regenerative-air sweep of both gutters on every listed centerline mile",
          "Neighborhood courts, cul-de-sacs, and loops in residential (white-block) zones",
          "Collector roads through golf and wooded (green) corridors, including Hidden Cypress access streets",
          "Primary spines: Sun City Blvd and Del Webb Blvd within the south-of-278 boundary",
          "Haul-off and lawful disposal of collected debris; post-sweep photo log by zone",
        ].map((item) => (
          <li key={item} className="flex gap-3 text-sm sm:text-base">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d7a6f]"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MapSection() {
  return (
    <section className="scroll-mt-8 py-8 sm:py-12" id="map">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a6c]">
        Work map
      </p>
      <h2 className="mt-2 font-display text-3xl text-[#0f2e24] sm:text-4xl">
        Proposed sweep areas
      </h2>
      <p className="mt-3 max-w-2xl text-[#3d5248]">
        Repurposed from the Sun City Hilton Head community map. Letter zones match
        the pricing table. Green fills mark golf / wooded corridors; teal and blue
        mark dense residential street fabric; orange marks primary collectors.
      </p>
      <div className="mt-8 overflow-hidden rounded-lg border border-[#c5d4cc] bg-[#f7faf7] p-2 sm:p-4">
        <WorkMap />
      </div>
      <Legend />
    </section>
  );
}

function Legend() {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#3d5248]">
      {ZONES.map((z) => (
        <li key={z.id} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: z.color }}
          />
          {z.shortLabel} · {z.name}
        </li>
      ))}
    </ul>
  );
}

function PricingSection() {
  return (
    <section className="scroll-mt-8 py-16 sm:py-20" id="pricing">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a6c]">
        Investment
      </p>
      <h2 className="mt-2 font-display text-3xl text-[#0f2e24] sm:text-4xl">
        Cost by work area
      </h2>
      <p className="mt-3 max-w-2xl text-[#3d5248]">
        Residential zones at {formatUsd(RATES.residential)}/centerline mile · golf
        corridor at {formatUsd(RATES.golf)}/mi · primary collectors at{" "}
        {formatUsd(RATES.arterial)}/mi. Each mile includes both gutters in one
        continuous pass.
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-[#c5d4cc] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Zone</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Miles</TableHead>
              <TableHead className="text-right">Linear ft</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ZONES.map((z) => (
              <TableRow key={z.id}>
                <TableCell>
                  <span
                    className="mr-2 inline-block h-2.5 w-2.5 rounded-sm align-middle"
                    style={{ backgroundColor: z.color }}
                  />
                  <span className="font-medium">{z.shortLabel}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground sm:inline sm:mt-0 sm:ml-2">
                    {z.name}
                  </span>
                </TableCell>
                <TableCell className="capitalize text-muted-foreground">
                  {z.kind}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {z.centerlineMiles.toFixed(1)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {zoneLinearFeet(z).toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatUsd(z.ratePerMile)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatUsd(zoneCost(z))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-[#c5d4cc] bg-white p-5 text-sm">
          <Row label="Sweep subtotal" value={formatUsd(t.sweepSubtotal)} />
          <Row label="Mobilization" value={formatUsd(t.mobilization)} />
          <Row
            label="Debris haul & disposal"
            value={formatUsd(t.debrisDisposal)}
          />
          <Separator className="my-2" />
          <Row
            label="Total proposed investment"
            value={formatUsd(t.grandTotal)}
            strong
          />
        </div>
        <div className="rounded-lg border border-[#c5d4cc] bg-[#0f2e24] p-5 text-[#e8f2ec]">
          <p className="text-xs uppercase tracking-wider text-[#7aa897]">
            Summary
          </p>
          <p className="mt-2 font-display text-3xl tabular-nums">
            {formatUsd(t.grandTotal)}
          </p>
          <p className="mt-2 text-sm text-[#9ec9b8]">
            {formatMiles(t.centerlineMiles)} centerline ·{" "}
            {formatFeet(t.linearFeet)} · {t.curbMiles.toFixed(1)} curb-miles ·{" "}
            {ZONES.length} zones south of Hwy 278
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className={strong ? "font-semibold text-[#0f2e24]" : "text-[#4a5c54]"}>
        {label}
      </span>
      <span
        className={`tabular-nums ${strong ? "font-semibold text-[#0f2e24]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function MethodologySection() {
  return (
    <section className="scroll-mt-8 py-16 sm:py-20" id="methodology">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a6c]">
        How we measured
      </p>
      <h2 className="mt-2 font-display text-3xl text-[#0f2e24] sm:text-4xl">
        Scale, boundary, and street length
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Metric
          title="Map scale"
          body={`Source screenshot scale bar = ${METHODOLOGY.scaleBarFeet.toLocaleString()} ft. Used to size the work map and cross-check cluster footprints (~${METHODOLOGY.mapWidthMilesApprox} mi east–west × ~${METHODOLOGY.mapDepthMilesApprox} mi north–south south of 278).`}
        />
        <Metric
          title="Published inventory"
          body={`Association reporting cites ~${METHODOLOGY.communityRoadMilesPublished} miles of internal Sun City roads. This proposal uses ${(METHODOLOGY.southOf278Share * 100).toFixed(0)}% of that network for streets south of Hwy 278 inside the orange boundary → ${formatMiles(t.centerlineMiles)}.`}
        />
        <Metric
          title="Zone split"
          body="White / light residential fabric = dense curb miles (Zones A, B, D, E). Green golf and wooded fills = fewer, longer collectors (Zone C). Named spines priced separately (Zone F)."
        />
      </div>
      <ol className="mt-10 list-decimal space-y-2 pl-5 text-sm text-[#3d5248]">
        {METHODOLOGY.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ol>
    </section>
  );
}

function Metric({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-xl text-[#0f2e24]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#3d5248]">{body}</p>
    </div>
  );
}

function ScheduleSection() {
  return (
    <section className="scroll-mt-8 py-16 sm:py-20" id="schedule">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a6c]">
        Field plan
      </p>
      <h2 className="mt-2 font-display text-3xl text-[#0f2e24] sm:text-4xl">
        Suggested sequence
      </h2>
      <ol className="mt-8 space-y-6">
        {[
          {
            day: "Day 1",
            title: "West & central-west residential",
            detail: "Zones A–B — densest street fabric, early start for quiet courts.",
          },
          {
            day: "Day 2",
            title: "Golf corridor + Del Webb east",
            detail: "Zones C–D — Hidden Cypress collectors, then central-east neighborhoods.",
          },
          {
            day: "Day 3",
            title: "Southeast + primary collectors",
            detail: "Zones E–F — Okatie-edge streets, then Sun City / Del Webb spines and punch-list.",
          },
        ].map((step) => (
          <li key={step.day} className="flex gap-4 sm:gap-6">
            <span className="w-16 shrink-0 font-display text-lg text-[#0d7a6f]">
              {step.day}
            </span>
            <div>
              <p className="font-medium text-[#0f2e24]">{step.title}</p>
              <p className="mt-1 text-sm text-[#3d5248]">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-[#5a7a6c]">
        Schedule assumes weekday daytime windows coordinated with association
        security and gate access. Weather delays shift the sequence without
        changing zone pricing.
      </p>
    </section>
  );
}

function TermsSection() {
  return (
    <section className="scroll-mt-8 border-t border-[#c5d4cc] py-16 sm:py-20" id="terms">
      <h2 className="font-display text-2xl text-[#0f2e24]">Proposal notes</h2>
      <ul className="mt-4 space-y-2 text-sm text-[#3d5248]">
        <li>
          This document is a demonstration proposal built from the attached Google
          Maps community screenshot for Carolina Sweep Environmental.
        </li>
        <li>
          Street lengths are engineering estimates from published road inventory
          and scale-calibrated map apportionment — not a surveyed CAD takeoff.
          Final contract mileage can be reconciled with association GIS or a joint
          ride-along.
        </li>
        <li>
          Quote valid through {COMPANY.validThrough}. Payment: 40% mobilization,
          balance on completion and zone photo log.
        </li>
        <li>
          Exclusions: private driveways, golf cart paths, parking lots not on the
          association street inventory, and work north of Highway 278.
        </li>
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1a4f42] bg-[#0a221c] px-4 py-10 text-center text-sm text-[#7aa897]">
      <p className="font-display text-lg text-[#e8f2ec]">
        Carolina Sweep Environmental
      </p>
      <p className="mt-1">{COMPANY.tagline}</p>
      <p className="mt-4 text-xs">
        {COMPANY.proposalId} · {COMPANY.location} · Demo proposal for capability
        review
      </p>
    </footer>
  );
}
