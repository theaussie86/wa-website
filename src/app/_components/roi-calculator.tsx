"use client";

import { useState, useMemo } from "react";

const WEEKS_PER_MONTH = 4.33;
const ERROR_COST_MULTIPLIER = 1.5;

type InvestmentLevel = "small" | "medium" | "large";

const INVESTMENT_OPTIONS: Record<InvestmentLevel, { label: string; value: number }> = {
  small: { label: "Klein (2.000 - 8.000 €)", value: 5000 },
  medium: { label: "Mittel (8.000 - 25.000 €)", value: 16500 },
  large: { label: "Groß (25.000 - 50.000 €)", value: 37500 },
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
    return "< 1 Monat";
  }
  if (months > 36) {
    return "> 3 Jahre";
  }
  return `${months.toFixed(1)} Monate`;
}

function formatPercent(value: number): string {
  if (value > 1000) {
    return "> 1.000%";
  }
  return `${Math.round(value)}%`;
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
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Eingaben */}
      <div className="space-y-6">
        <h3 className="font-serif text-xl text-primary mb-4">Ihre Ausgangssituation</h3>

        {/* Gesparte Stunden */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="hours" className="text-charcoal/70">
              Gesparte Stunden pro Woche
            </label>
            <span className="font-medium text-primary">{hoursPerWeek}h</span>
          </div>
          <input
            id="hours"
            type="range"
            min="1"
            max="40"
            step="1"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-charcoal/50 mt-1">
            <span>1h</span>
            <span>40h</span>
          </div>
        </div>

        {/* Stundensatz */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="rate" className="text-charcoal/70">
              Interner Stundensatz (inkl. Nebenkosten)
            </label>
            <span className="font-medium text-primary">{hourlyRate} €</span>
          </div>
          <input
            id="rate"
            type="range"
            min="30"
            max="120"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-charcoal/50 mt-1">
            <span>30 €</span>
            <span>120 €</span>
          </div>
        </div>

        {/* Anzahl Mitarbeiter */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="employees" className="text-charcoal/70">
              Betroffene Mitarbeiter
            </label>
            <span className="font-medium text-primary">{employees}</span>
          </div>
          <input
            id="employees"
            type="range"
            min="1"
            max="20"
            step="1"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-charcoal/50 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Fehlerquote */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="errorRate" className="text-charcoal/70">
              Aktuelle Fehlerquote im Prozess
            </label>
            <span className="font-medium text-primary">{errorRate}%</span>
          </div>
          <input
            id="errorRate"
            type="range"
            min="0"
            max="30"
            step="1"
            value={errorRate}
            onChange={(e) => setErrorRate(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-charcoal/50 mt-1">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Investitionssumme */}
        <div>
          <label htmlFor="investment" className="text-charcoal/70 block mb-2">
            Geplante Investition
          </label>
          <select
            id="investment"
            value={investmentLevel}
            onChange={(e) => setInvestmentLevel(e.target.value as InvestmentLevel)}
            className="w-full p-3 border border-primary/20 rounded-sm bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-accent/50"
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
      <div className="bg-primary/5 rounded-sm p-6 lg:p-8 border border-primary/10">
        <h3 className="font-serif text-xl text-primary mb-6">Ihre Ergebnisse</h3>

        <div className="space-y-6">
          {/* Monatliche Ersparnis */}
          <div className="pb-4 border-b border-primary/10">
            <div className="text-charcoal/60 text-sm mb-1">Monatliche Ersparnis</div>
            <div className="font-serif text-3xl md:text-4xl text-primary">
              {formatCurrency(results.totalMonthlySavings)}
            </div>
            <div className="text-xs text-charcoal/50 mt-1">
              {formatCurrency(results.directSavings)} Zeitersparnis + {formatCurrency(results.errorSavings)} Fehlerkosten
            </div>
          </div>

          {/* Amortisation */}
          <div className="pb-4 border-b border-primary/10">
            <div className="text-charcoal/60 text-sm mb-1">Amortisationszeit</div>
            <div className="font-serif text-3xl md:text-4xl text-primary">
              {formatMonths(results.paybackMonths)}
            </div>
            <div className="text-xs text-charcoal/50 mt-1">
              bei {formatCurrency(results.investment)} Investition
            </div>
          </div>

          {/* ROI */}
          <div>
            <div className="text-charcoal/60 text-sm mb-1">ROI nach 12 Monaten</div>
            <div className="font-serif text-3xl md:text-4xl text-accent">
              {formatPercent(results.roi)}
            </div>
            <div className="text-xs text-charcoal/50 mt-1">
              {formatCurrency(results.annualSavings)} Ersparnis pro Jahr
            </div>
          </div>
        </div>

        {/* Quick Insight */}
        {results.paybackMonths <= 6 && (
          <div className="mt-6 p-4 bg-accent/10 rounded-sm border border-accent/20">
            <div className="text-sm text-charcoal/80">
              <strong className="text-accent">Schneller ROI:</strong> Bei diesen Werten amortisiert sich
              die Investition in weniger als 6 Monaten.
            </div>
          </div>
        )}
        {results.paybackMonths > 12 && results.paybackMonths <= 36 && (
          <div className="mt-6 p-4 bg-primary/10 rounded-sm border border-primary/20">
            <div className="text-sm text-charcoal/80">
              <strong className="text-primary">Tipp:</strong> Bei längerer Amortisationszeit lohnt sich
              oft ein kleineres Pilotprojekt als Einstieg.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
