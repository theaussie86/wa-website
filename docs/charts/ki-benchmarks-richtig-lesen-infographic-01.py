"""Infografik: SWE-bench Verified vs METR Time Horizon.

Quellen:
  SWE-bench Verified (vendor-reported):
    Claude Opus 4.5   80.9%  (2025-11-24)
    Claude Opus 4.6   80.8%  (2026-02-05)
    Gemini 3.1 Pro    80.6%  (2026-02-19, Google model card, "single attempt")
  METR Horizon v1.1 (p50, Minuten, 95% CI) - metr.org/assets/benchmark_results_1_1.yaml
    Claude Opus 4.5   293.0  [161.7,  623.7]
    Claude Opus 4.6   718.8  [316.7, 3633.8]
    Gemini 3.1 Pro    384.1  [233.5,  694.8]
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import FixedLocator, NullLocator

SURFACE = "#FCFCFB"
INK = "#1A1A18"
INK_MUTED = "#6B6B66"
GRID = "#E4E3DF"

# validierte kategoriale Palette (dataviz validator, light, alle Checks PASS)
COLORS = {
    "Claude Opus 4.5": "#4A72D4",
    "Claude Opus 4.6": "#DE7B00",
    "Gemini 3.1 Pro": "#0F9D8F",
}

MODELS = ["Claude Opus 4.5", "Claude Opus 4.6", "Gemini 3.1 Pro"]
SWE = {"Claude Opus 4.5": 80.9, "Claude Opus 4.6": 80.8, "Gemini 3.1 Pro": 80.6}
# Stunden
HORIZON = {
    "Claude Opus 4.5": (293.0 / 60, 161.7 / 60, 623.7 / 60),
    "Claude Opus 4.6": (718.8 / 60, 316.7 / 60, 3633.8 / 60),
    "Gemini 3.1 Pro": (384.1 / 60, 233.5 / 60, 694.8 / 60),
}

plt.rcParams["font.family"] = ["Helvetica Neue", "Helvetica", "Arial", "DejaVu Sans"]

fig, (axL, axR) = plt.subplots(
    1, 2, figsize=(12, 6.8), dpi=100, gridspec_kw={"width_ratios": [1, 1.15], "wspace": 0.16}
)
fig.patch.set_facecolor(SURFACE)

ypos = {m: len(MODELS) - 1 - i for i, m in enumerate(MODELS)}


def style(ax):
    ax.set_facecolor(SURFACE)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(GRID)
    ax.tick_params(axis="x", colors=INK_MUTED, labelsize=11, length=0, pad=8)
    ax.tick_params(axis="y", length=0)
    ax.set_ylim(-0.7, len(MODELS) - 0.3)
    ax.xaxis.grid(True, color=GRID, linewidth=1)
    ax.set_axisbelow(True)


# ---------- links: SWE-bench, volle 0-100-Achse (keine getrimmte Achse) ----------
style(axL)
axL.set_xlim(0, 104)
axL.xaxis.set_major_locator(FixedLocator([0, 25, 50, 75, 100]))
axL.set_xticklabels(["0", "25", "50", "75", "100"])

for m in MODELS:
    y = ypos[m]
    axL.plot([0, SWE[m]], [y, y], color=COLORS[m], linewidth=2, alpha=0.30,
             solid_capstyle="round", zorder=2)
    axL.plot(SWE[m], y, "o", markersize=11, color=COLORS[m],
             markeredgecolor=SURFACE, markeredgewidth=2, zorder=3)
    axL.text(SWE[m] + 3.5, y, f"{SWE[m]:.1f} %".replace(".", ","), va="center",
             ha="left", fontsize=12.5, color=INK, fontweight="bold")

axL.set_yticks(list(ypos.values()))
axL.set_yticklabels([m for m in MODELS], fontsize=12.5, color=INK)
axL.set_title("SWE-bench Verified\nAnteil gelöster Tickets, in Prozent", fontsize=13.5, color=INK,
              fontweight="bold", loc="left", pad=16, linespacing=1.5)

# ---------- rechts: METR Horizont, log, mit 95%-CI ----------
style(axR)
axR.set_xscale("log")
axR.set_xlim(2, 70)
axR.xaxis.set_major_locator(FixedLocator([2, 5, 10, 20, 50]))
axR.xaxis.set_minor_locator(NullLocator())
axR.set_xticklabels(["2 h", "5 h", "10 h", "20 h", "50 h"])
axR.set_yticks([])

for m in MODELS:
    y = ypos[m]
    p50, lo, hi = HORIZON[m]
    axR.plot([lo, hi], [y, y], color=COLORS[m], linewidth=2, alpha=0.30,
             solid_capstyle="round", zorder=2)
    for cap in (lo, hi):
        axR.plot([cap, cap], [y - 0.11, y + 0.11], color=COLORS[m], linewidth=2,
                 alpha=0.30, zorder=2)
    axR.plot(p50, y, "o", markersize=11, color=COLORS[m],
             markeredgecolor=SURFACE, markeredgewidth=2, zorder=3)
    axR.text(p50, y + 0.26, f"{p50:.1f} h".replace(".", ","), va="bottom", ha="center",
             fontsize=12.5, color=INK, fontweight="bold", zorder=4)

axR.set_title("METR Time Horizon\nAufgabenlänge bei 50 % Erfolg, in Stunden", fontsize=13.5,
              color=INK, fontweight="bold", loc="left", pad=16, linespacing=1.5)
fig.text(0.5, 0.960,
         "Gleicher Benchmark-Wert, völlig andere Ausdauer",
         fontsize=19, color=INK, fontweight="bold", ha="center")
fig.text(0.5, 0.905,
         "Drei Modelle liegen im Benchmark 0,3 Prozentpunkte auseinander - im Horizont Faktor 2,4.",
         fontsize=12.5, color=INK_MUTED, ha="center")

fig.text(0.008, 0.022,
         "Balken = 95%-Konfidenzintervall, Log-Skala.   Quellen: SWE-bench Verified - Herstellerangaben (Anthropic, Google Model Card). METR Horizon v1.1, metr.org.\n"
         "Die Konfidenzintervalle überlappen - der Horizont-Abstand ist ein Hinweis, kein harter Beleg.",
         fontsize=9.5, color=INK_MUTED, ha="left", linespacing=1.5)

fig.subplots_adjust(left=0.135, right=0.985, top=0.755, bottom=0.165)
out = "/private/tmp/claude-501/-Users-cweissteiner-WA-Apps-wa-website/9f5a8cdf-86c4-4b15-b6a6-b971670f0810/scratchpad/horizon.png"
fig.savefig(out, facecolor=SURFACE)
print("ok", out)
