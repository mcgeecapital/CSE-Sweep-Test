import type { ReactNode } from "react";
import Image from "next/image";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const t = totals();

const TOC = [
  { href: "#summary", label: "Executive summary" },
  { href: "#scope", label: "Scope of work" },
  { href: "#map", label: "Work map" },
  { href: "#pricing", label: "Investment" },
  { href: "#methodology", label: "Measurement" },
  { href: "#schedule", label: "Field plan" },
  { href: "#terms", label: "Notes" },
] as const;

export function ProposalDocument() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <Cover />
      <div className="mx-auto flex max-w-6xl gap-10 px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <aside className="toc-sidebar sticky top-8 hidden h-fit w-48 shrink-0 lg:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
            Contents
          </p>
          <nav className="mt-3 flex flex-col gap-1.5 border-l border-[#d0dceb] pl-3">
            {TOC.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#475569] transition hover:text-[#1a6fc4]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 rounded-lg border border-[#d0dceb] bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
              Contact
            </p>
            <a
              href={`tel:${COMPANY.phone.replace(/\./g, "")}`}
              className="mt-1 block text-sm font-medium text-[#1a6fc4]"
            >
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="mt-0.5 block break-all text-xs text-[#64748b]"
            >
              {COMPANY.email}
            </a>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-16 sm:space-y-20">
          <SummarySection />
          <ScopeSection />
          <MapSection />
          <PricingSection />
          <MethodologySection />
          <ScheduleSection />
          <TermsSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}

function Cover() {
  return (
    <header className="relative overflow-hidden border-b border-[#c5d4e8] bg-[#0a1628]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 80% 20%, rgba(32, 128, 224, 0.45), transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 90%, rgba(32, 112, 208, 0.25), transparent 50%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 24h48M24 0v48' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-between px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="animate-rise flex items-start justify-between gap-4">
          <Image
            src="/brand/logo-mark.png"
            alt="Clean Sweep Environmental"
            width={220}
            height={144}
            className="h-14 w-auto sm:h-20"
            priority
          />
          <div className="text-right text-[11px] leading-relaxed text-[#8ba3c4] sm:text-xs">
            <p>Proposal {COMPANY.proposalId}</p>
            <p>Valid through {COMPANY.validThrough}</p>
          </div>
        </div>

        <div className="animate-rise-delay max-w-2xl pb-6 pt-20 sm:pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6eb0f0]">
            Street sweeping proposal
          </p>
          <h1 className="mt-3 font-display text-3xl leading-[1.12] tracking-tight text-white sm:text-5xl md:text-[3.15rem]">
            Sun City Hilton Head — south of Highway 278
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#b6c9e0] sm:text-lg">
            A complete dual-gutter street sweep of association roads beneath
            Fording Island Rd, mapped and priced by neighborhood and golf
            corridor from the community plan.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="inline-flex h-11 items-center justify-center rounded-md bg-[#2080e0] px-6 text-sm font-semibold text-white transition hover:bg-[#3b92ea]"
            >
              View investment — {formatUsd(t.grandTotal)}
            </a>
            <a
              href="#map"
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#4a6a90] bg-transparent px-6 text-sm font-medium text-[#e2eaf4] transition hover:border-[#6eb0f0] hover:bg-white/5"
            >
              Open work map
            </a>
          </div>
        </div>

        <p className="animate-rise-delay-2 text-xs text-[#7a93b0]">
          Prepared for {COMPANY.preparedFor} · {COMPANY.location}
        </p>
      </div>
    </header>
  );
}

function SummarySection() {
  return (
    <section className="scroll-mt-10" id="summary">
      <SectionEyebrow>Executive summary</SectionEyebrow>
      <h2 className="mt-2 font-display text-3xl text-[#0a1628] sm:text-4xl">
        One sweep. Six zones. Clear numbers.
      </h2>
      <p className="mt-4 max-w-2xl text-[#475569]">{COMPANY.about}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Centerline miles" value={formatMiles(t.centerlineMiles)} />
        <MetricCard label="Linear feet" value={formatFeet(t.linearFeet)} />
        <MetricCard label="Curb miles" value={t.curbMiles.toFixed(1)} />
        <MetricCard label="Proposed total" value={formatUsd(t.grandTotal)} highlight />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <InfoCard
          title="Boundary"
          body="Association streets inside the orange community line, south of Hwy 278 only. Highways 278 and 170 excluded."
        />
        <InfoCard
          title="Method"
          body={`Scale bar ${METHODOLOGY.scaleBarFeet.toLocaleString()} ft + published ~${METHODOLOGY.communityRoadMilesPublished}-mile road inventory, apportioned south of 278.`}
        />
        <InfoCard
          title="Delivery"
          body="Three field days by zone sequence, with debris haul-off and a photo log at completion."
        />
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={
        highlight
          ? "border-[#1a6fc4] bg-[#1a6fc4] text-white shadow-none"
          : "border-[#d0dceb] bg-white shadow-none"
      }
    >
      <CardHeader className="pb-2 pt-4">
        <CardTitle
          className={`text-[11px] font-semibold uppercase tracking-wider ${highlight ? "text-[#c5ddf8]" : "text-[#64748b]"}`}
        >
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p
          className={`font-display text-2xl tabular-nums ${highlight ? "text-white" : "text-[#0a1628]"}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="border-[#d0dceb] bg-white shadow-none">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="font-display text-lg text-[#0a1628]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 text-sm leading-relaxed text-[#475569]">
        {body}
      </CardContent>
    </Card>
  );
}

function ScopeSection() {
  return (
    <section className="scroll-mt-10" id="scope">
      <SectionEyebrow>Scope of work</SectionEyebrow>
      <h2 className="mt-2 font-display text-3xl text-[#0a1628] sm:text-4xl">
        What CSE will sweep
      </h2>
      <p className="mt-3 max-w-2xl text-[#475569]">
        Mechanical / regenerative-air sweep of both gutters on every listed
        centerline mile, coordinated with association gate access.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {[
          "Neighborhood courts, cul-de-sacs, and loops in residential (white-block) zones",
          "Collector roads through golf and wooded (green) corridors around Hidden Cypress",
          "Primary spines: Sun City Blvd and Del Webb Blvd within the south-of-278 boundary",
          "Haul-off and lawful disposal of collected debris; post-sweep photo log by zone",
        ].map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-lg border border-[#d0dceb] bg-white p-4 text-sm text-[#334155]"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2080e0]"
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
    <section className="scroll-mt-10" id="map">
      <SectionEyebrow>Work map</SectionEyebrow>
      <h2 className="mt-2 font-display text-3xl text-[#0a1628] sm:text-4xl">
        Proposed sweep areas
      </h2>
      <p className="mt-3 max-w-2xl text-[#475569]">
        Repurposed from the Sun City Hilton Head community map. Letter zones
        match the pricing table. Green fills mark golf / wooded corridors; blues
        mark dense residential fabric; orange marks primary collectors.
      </p>
      <Card className="mt-8 overflow-hidden border-[#d0dceb] bg-white p-2 shadow-none sm:p-4">
        <WorkMap />
      </Card>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ZONES.map((z) => (
          <div
            key={z.id}
            className="flex items-start gap-3 rounded-lg border border-[#d0dceb] bg-white px-3 py-3"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white"
              style={{ backgroundColor: z.color }}
            >
              {z.shortLabel.replace("Zone ", "")}
            </span>
            <div>
              <p className="text-sm font-medium text-[#0a1628]">{z.name}</p>
              <p className="text-xs text-[#64748b]">
                {z.centerlineMiles.toFixed(1)} mi · {formatUsd(zoneCost(z))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="scroll-mt-10" id="pricing">
      <SectionEyebrow>Investment</SectionEyebrow>
      <h2 className="mt-2 font-display text-3xl text-[#0a1628] sm:text-4xl">
        Cost by work area
      </h2>
      <p className="mt-3 max-w-2xl text-[#475569]">
        Residential at {formatUsd(RATES.residential)}/centerline mile · golf
        corridor at {formatUsd(RATES.golf)}/mi · primary collectors at{" "}
        {formatUsd(RATES.arterial)}/mi. Each mile includes both gutters in one
        continuous pass.
      </p>

      <Card className="mt-8 overflow-hidden border-[#d0dceb] bg-white shadow-none">
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
                  <span className="mt-0.5 block text-xs text-muted-foreground sm:ml-2 sm:mt-0 sm:inline">
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
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="border-[#d0dceb] bg-white p-5 shadow-none">
          <div className="space-y-2 text-sm">
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
        </Card>
        <Card className="border-[#1a6fc4] bg-[#0a1628] p-5 text-white shadow-none">
          <p className="text-[11px] uppercase tracking-wider text-[#8ba3c4]">
            Summary
          </p>
          <p className="mt-2 font-display text-3xl tabular-nums">
            {formatUsd(t.grandTotal)}
          </p>
          <p className="mt-2 text-sm text-[#9eb4d0]">
            {formatMiles(t.centerlineMiles)} centerline ·{" "}
            {formatFeet(t.linearFeet)} · {t.curbMiles.toFixed(1)} curb-miles ·{" "}
            {ZONES.length} zones south of Hwy 278
          </p>
        </Card>
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
      <span className={strong ? "font-semibold text-[#0a1628]" : "text-[#64748b]"}>
        {label}
      </span>
      <span
        className={`tabular-nums ${strong ? "font-semibold text-[#0a1628]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function MethodologySection() {
  return (
    <section className="scroll-mt-10" id="methodology">
      <SectionEyebrow>Measurement</SectionEyebrow>
      <h2 className="mt-2 font-display text-3xl text-[#0a1628] sm:text-4xl">
        Scale, boundary, and street length
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <InfoCard
          title="Map scale"
          body={`Source screenshot scale bar = ${METHODOLOGY.scaleBarFeet.toLocaleString()} ft. Used to size the work map and cross-check cluster footprints (~${METHODOLOGY.mapWidthMilesApprox} mi east–west × ~${METHODOLOGY.mapDepthMilesApprox} mi north–south south of 278).`}
        />
        <InfoCard
          title="Published inventory"
          body={`Association reporting cites ~${METHODOLOGY.communityRoadMilesPublished} miles of internal Sun City roads. This proposal uses ${(METHODOLOGY.southOf278Share * 100).toFixed(0)}% of that network for streets south of Hwy 278 inside the orange boundary → ${formatMiles(t.centerlineMiles)}.`}
        />
        <InfoCard
          title="Zone split"
          body="White / light residential fabric = dense curb miles (Zones A, B, D, E). Green golf and wooded fills = fewer, longer collectors (Zone C). Named spines priced separately (Zone F)."
        />
      </div>
      <ol className="mt-8 list-decimal space-y-2 rounded-lg border border-[#d0dceb] bg-white p-5 pl-10 text-sm text-[#475569]">
        {METHODOLOGY.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ol>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className="scroll-mt-10" id="schedule">
      <SectionEyebrow>Field plan</SectionEyebrow>
      <h2 className="mt-2 font-display text-3xl text-[#0a1628] sm:text-4xl">
        Suggested sequence
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            day: "Day 1",
            title: "West & central-west",
            detail: "Zones A–B — densest street fabric, early start for quiet courts.",
          },
          {
            day: "Day 2",
            title: "Golf + Del Webb east",
            detail: "Zones C–D — Hidden Cypress collectors, then central-east neighborhoods.",
          },
          {
            day: "Day 3",
            title: "Southeast + collectors",
            detail: "Zones E–F — Okatie-edge streets, then Sun City / Del Webb spines and punch-list.",
          },
        ].map((step) => (
          <Card key={step.day} className="border-[#d0dceb] bg-white shadow-none">
            <CardHeader className="pb-2 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1a6fc4]">
                {step.day}
              </p>
              <CardTitle className="font-display text-xl text-[#0a1628]">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 text-sm text-[#475569]">
              {step.detail}
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#64748b]">
        Schedule assumes weekday daytime windows coordinated with association
        security and gate access. Weather delays shift the sequence without
        changing zone pricing.
      </p>
    </section>
  );
}

function TermsSection() {
  return (
    <section className="scroll-mt-10" id="terms">
      <SectionEyebrow>Proposal notes</SectionEyebrow>
      <h2 className="mt-2 font-display text-2xl text-[#0a1628]">Terms & caveats</h2>
      <Card className="mt-6 border-[#d0dceb] bg-white p-5 shadow-none">
        <ul className="space-y-3 text-sm text-[#475569]">
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
          <li>
            Demo proposal for capability review — built from the attached Google Maps
            community screenshot for {COMPANY.name}.
          </li>
        </ul>
      </Card>
    </section>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1a6fc4]">
      {children}
    </p>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1a2d4a] bg-[#0a1628] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={120}
            height={79}
            className="h-10 w-auto opacity-90"
          />
          <div>
            <p className="font-display text-lg text-white">{COMPANY.name}</p>
            <p className="text-xs text-[#8ba3c4]">{COMPANY.tagline}</p>
          </div>
        </div>
        <div className="text-sm text-[#8ba3c4]">
          <p>{COMPANY.phone}</p>
          <p>{COMPANY.email}</p>
          <a
            href={COMPANY.website}
            className="text-[#6eb0f0] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            cleansweep-environmental.com
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-center text-[11px] text-[#5a7394]">
        {COMPANY.proposalId} · {COMPANY.location}
      </p>
    </footer>
  );
}
