"use client";

import { useState, useMemo } from "react";

const WEEKS_PER_MONTH = 4.33;
const ERROR_COST_MULTIPLIER = 1.5;

type InvestmentLevel = "small" | "medium" | "large";

const INVESTMENT_OPTIONS: Record<InvestmentLevel, { label: string; value: number }> = {
  small: { label: "Klein, 2.000 bis 8.000 €", value: 5000 },
  medium: { label: "Mittel, 8.000 bis 25.000 €", value: 16500 },
  large: { label: "Groß, 25.000 bis 50.000 €", value: 37500 },
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonths(months: number): string {
  if (months < 1) {
    return "unter 1 Monat";
  }
  if (months > 36) {
    return "über 3 Jahre";
  }
  return `${months.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Monate`;
}

function formatPercent(value: number): string {
  if (value > 1000) {
    return "über 1.000 %";
  }
  return `${Math.round(value)} %`;
}

export function ROICalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(60);
  const [employees, setEmployees] = useState(2);
  const [errorRate, setErrorRate] = useState(10);
  const [investmentLevel, setInvestmentLevel] = useState<InvestmentLevel>("medium");

  const results = useMemo(() => {
    const investment = INVESTMENT_OPTIONS[investmentLevel].value;

    // Direkte Zeitersparnis pro Monat
    const directSavings = hoursPerWeek * WEEKS_PER_MONTH * hourlyRate * employees;

    // Fehlerkosten-Ersparnis (Fehler verursachen 1.5x den normalen Aufwand)
    const errorSavings = directSavings * (errorRate / 100) * ERROR_COST_MULTIPLIER;

    // Gesamtersparnis pro Monat
    const totalMonthlySavings = directSavings + errorSavings;

    // Amortisationszeit in Monaten
    const paybackMonths = totalMonthlySavings > 0 ? investment / totalMonthlySavings : Infinity;

    // ROI nach 12 Monaten
    const annualSavings = totalMonthlySavings * 12;
    const roi = investment > 0 ? ((annualSavings - investment) / investment) * 100 : 0;

    return {
      directSavings,
      errorSavings,
      totalMonthlySavings,
      paybackMonths,
      roi,
      annualSavings,
      investment,
    };
  }, [hoursPerWeek, hourlyRate, employees, errorRate, investmentLevel]);

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
      {/* Eingaben */}
      <div className="space-y-6">
        <h2 className="type-display mb-2 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.05]">Dein Ablauf heute</h2>

        {/* Gesparte Stunden */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="hours" className="text-[15.5px] text-charcoal/85">
              Stunden pro Woche, die er kostet
            </label>
            <span className="font-semibold tabular-nums text-primary">{hoursPerWeek}h</span>
          </div>
          <input
            id="hours"
            type="range"
            min="1"
            max="40"
            step="1"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full cursor-pointer accent-accent-600"
          />
          <div className="flex justify-between mt-1 text-[12.5px] tabular-nums text-charcoal/75">
            <span>1h</span>
            <span>40h</span>
          </div>
        </div>

        {/* Stundensatz */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="rate" className="text-[15.5px] text-charcoal/85">
              Interner Stundensatz mit Nebenkosten
            </label>
            <span className="font-semibold tabular-nums text-primary">{hourlyRate} €</span>
          </div>
          <input
            id="rate"
            type="range"
            min="30"
            max="120"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full cursor-pointer accent-accent-600"
          />
          <div className="flex justify-between mt-1 text-[12.5px] tabular-nums text-charcoal/75">
            <span>30 €</span>
            <span>120 €</span>
          </div>
        </div>

        {/* Anzahl Mitarbeiter */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="employees" className="text-[15.5px] text-charcoal/85">
              Beteiligte Leute
            </label>
            <span className="font-semibold tabular-nums text-primary">{employees}</span>
          </div>
          <input
            id="employees"
            type="range"
            min="1"
            max="20"
            step="1"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full cursor-pointer accent-accent-600"
          />
          <div className="flex justify-between mt-1 text-[12.5px] tabular-nums text-charcoal/75">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Fehlerquote */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="errorRate" className="text-[15.5px] text-charcoal/85">
              Anteil, der nachgearbeitet werden muss
            </label>
            <span className="font-semibold tabular-nums text-primary">{errorRate}%</span>
          </div>
          <input
            id="errorRate"
            type="range"
            min="0"
            max="30"
            step="1"
            value={errorRate}
            onChange={(e) => setErrorRate(Number(e.target.value))}
            className="w-full cursor-pointer accent-accent-600"
          />
          <div className="flex justify-between mt-1 text-[12.5px] tabular-nums text-charcoal/75">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Investitionssumme */}
        <div>
          <label htmlFor="investment" className="mb-2 block text-[15.5px] text-charcoal/85">
            Geplante Investition
          </label>
          <select
            id="investment"
            value={investmentLevel}
            onChange={(e) => setInvestmentLevel(e.target.value as InvestmentLevel)}
            className="w-full rounded-[2px] border border-charcoal/30 bg-white p-3 text-[16px] text-charcoal hover:border-charcoal/50"
          >
            {Object.entries(INVESTMENT_OPTIONS).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnisse */}
      <div aria-live="polite" className="rounded-[2px] bg-pappe p-6 lg:p-8">
        <h2 className="type-display mb-6 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.05]">Was dabei rauskommt</h2>

        <div className="space-y-6">
          {/* Monatliche Ersparnis */}
          <div className="border-b border-primary/15 pb-5">
            <div className="type-label mb-1 text-[12px] text-charcoal/75">Was der Ablauf heute kostet, pro Monat</div>
            <div className="type-display text-[clamp(2rem,3.4vw,2.6rem)] leading-none tabular-nums text-primary">
              {formatCurrency(results.totalMonthlySavings)}
            </div>
            <div className="mt-1.5 text-[13.5px] text-charcoal/75">
              {formatCurrency(results.directSavings)} Arbeitszeit plus {formatCurrency(results.errorSavings)} Nacharbeit
            </div>
          </div>

          {/* Amortisation */}
          <div className="border-b border-primary/15 pb-5">
            <div className="type-label mb-1 text-[12px] text-charcoal/75">Investition gedeckt nach</div>
            <div className="type-display text-[clamp(2rem,3.4vw,2.6rem)] leading-none tabular-nums text-primary">
              {formatMonths(results.paybackMonths)}
            </div>
            <div className="mt-1.5 text-[13.5px] text-charcoal/75">
              bei {formatCurrency(results.investment)} Investition
            </div>
          </div>

          {/* ROI */}
          <div>
            <div className="type-label mb-1 text-[12px] text-charcoal/75">Rechnerischer ROI nach 12 Monaten</div>
            <div className="type-display text-[clamp(2rem,3.4vw,2.6rem)] leading-none tabular-nums text-primary">
              {formatPercent(results.roi)}
            </div>
            <div className="mt-1.5 text-[13.5px] text-charcoal/75">
              {formatCurrency(results.annualSavings)} Aufwand pro Jahr, der wegfallen könnte
            </div>
          </div>
        </div>

        {/* Quick Insight */}
        {results.paybackMonths <= 6 && (
          <p className="mt-6 rounded-[2px] bg-accent-100 p-4 text-[15px] leading-[1.55] text-ink">
            Bei diesen Werten wäre die Investition in unter sechs Monaten gedeckt. Prüf trotzdem
            zuerst, ob der Ablauf reif ist und ob ihn danach alle benutzen.
          </p>
        )}
        {results.paybackMonths > 12 && results.paybackMonths <= 36 && (
          <p className="mt-6 rounded-[2px] bg-white p-4 text-[15px] leading-[1.55] text-charcoal/85">
            Dauert es länger als ein Jahr, ist ein kleinerer erster Schritt meist die bessere Wahl.
          </p>
        )}
      </div>
    </div>
  );
}
