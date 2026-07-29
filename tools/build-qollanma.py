#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Zapusk qo'llanmasi — A3 bosma hujjatni yig'uvchi skript.

Uchta manba prezentatsiyasini bitta A3 hujjatga birlashtiradi:
  1. "Анализ аудитории и Custdev"      -> 1-BO'LIM
  2. "Пример анализа анкеты ЦА"        -> 2-BO'LIM (grafiklar)
  3. "Разбор моего запуска"            -> 3-BO'LIM

Ishga tushirish:  python3 tools/build-qollanma.py
Natija:           public/qollanma/index.html
"""

import math
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "qollanma", "index.html")

# ---------------------------------------------------------------- palitra ----
# Kategorik palitra dataviz validatoridan o'tgan (light, surface #FBF7EF):
#   Lightness band PASS · Chroma floor PASS · CVD separation PASS
#   Normal-vision floor PASS · Contrast: gold/green <3:1 -> har bir bo'lak
#   to'g'ridan-to'g'ri belgilangan (relief rule bajarilgan).
S1 = "#00889B"   # teal
S2 = "#C9A227"   # gold  (brend rangi)
S3 = "#7D3C98"   # violet
S4 = "#B03A2E"   # rust
S5 = "#2A78D6"   # blue
S6 = "#1BAF7A"   # green
SERIES = [S1, S2, S3, S4, S5, S6]

INK = "#14110C"
INK2 = "#4A453B"
MUTED = "#8A8377"
LINE = "#DED5C4"
CREAM = "#FBF7EF"
DEEP = "#0E1A1F"
GOLD = "#C9A227"

# teal ordinal ramp (yorug' qadam 2:1 dan yorug'roq emas)
RAMP = ["#7FC4CE", "#4FADBB", "#2699A9", "#00889B", "#026F7E", "#045763"]


# ------------------------------------------------------------- diagrammar ----
def donut(data, size=300, thickness=46, cx=None, cy=None):
    """data: [(label, percent, color)] -> aylana diagramma + bo'lak ustidagi %."""
    r_out = size / 2 - 6
    r = r_out - thickness / 2
    cx = cx or size / 2
    cy = cy or size / 2
    circ = 2 * math.pi * r
    parts = []
    acc = 0.0
    labels = []
    for label, pct, color in data:
        seg = circ * pct / 100.0
        parts.append(
            f'<circle cx="{cx}" cy="{cy}" r="{r:.2f}" fill="none" stroke="{color}" '
            f'stroke-width="{thickness}" stroke-dasharray="{seg:.2f} {circ - seg:.2f}" '
            f'stroke-dashoffset="{-circ * acc / 100.0:.2f}" '
            f'transform="rotate(-90 {cx} {cy})"/>'
        )
        # 2px yuza tirqishi — qo'shni bo'laklar orasida
        mid = acc + pct / 2.0
        ang = math.radians(mid * 3.6 - 90)
        lx = cx + r * math.cos(ang)
        ly = cy + r * math.sin(ang)
        if pct >= 4.5:
            labels.append(
                f'<text x="{lx:.1f}" y="{ly:.1f}" class="dl" text-anchor="middle" '
                f'dominant-baseline="central">{fmt(pct)}%</text>'
            )
        acc += pct
    # bo'laklar orasidagi ingichka yuza halqasi
    seps = []
    acc = 0.0
    for _, pct, _ in data:
        ang = math.radians(acc * 3.6 - 90)
        x1 = cx + (r - thickness / 2) * math.cos(ang)
        y1 = cy + (r - thickness / 2) * math.sin(ang)
        x2 = cx + (r + thickness / 2) * math.cos(ang)
        y2 = cy + (r + thickness / 2) * math.sin(ang)
        seps.append(
            f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
            f'stroke="{CREAM}" stroke-width="2.5"/>'
        )
        acc += pct
    return (
        f'<svg viewBox="0 0 {size} {size}" class="donut" role="img">'
        + "".join(parts)
        + "".join(seps)
        + "".join(labels)
        + "</svg>"
    )


def fmt(v):
    s = f"{v:.1f}".rstrip("0").rstrip(".")
    return s.replace(".", ",")


def legend(data, note=None):
    rows = "".join(
        f'<li><i style="background:{c}"></i><span class="lg-t">{l}</span>'
        f'<b class="lg-v">{fmt(p)}%</b></li>'
        for l, p, c in data
    )
    n = f'<p class="lg-note">{note}</p>' if note else ""
    return f'<ul class="legend">{rows}</ul>{n}'


def pie_block(title, data, note=None, kicker=None, size=270):
    """Doira tepada, izoh pastda — tor ustunda ham yorliqlar sinmaydi."""
    k = f'<span class="ch-kick">{kicker}</span>' if kicker else ""
    return f"""<figure class="chart">
  <figcaption class="ch-head">{k}<h4>{title}</h4></figcaption>
  <div class="ch-body">{donut(data, size=size)}</div>
  {legend(data, note)}
</figure>"""


def nice_axis(v):
    """Yumaloq maksimum va bo'linmalar sonini tanlaydi (o'q belgilari butun bo'lsin)."""
    exp = 10 ** math.floor(math.log10(v))
    for m in (1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10):
        top = m * exp
        if top >= v:
            for steps in (5, 4, 3, 6):
                tick = top / steps
                if abs(tick - round(tick)) < 1e-9:
                    return top, steps
    return v, 4


def hbars(rows, maxv=None, color=S1, width=760, rowh=30, unit=""):
    """rows: [(label, value, pct)] — gorizontal ustunlar, uchida to'g'ridan-to'g'ri yorliq."""
    rows = sorted(rows, key=lambda r: -r[1])
    maxv, steps = nice_axis(maxv or max(r[1] for r in rows))
    labw = 292
    barw = width - labw - 120
    h = rowh * len(rows) + 26
    out = []
    # to'r chiziqlari
    for i in range(steps + 1):
        x = labw + barw * i / steps
        out.append(
            f'<line x1="{x:.1f}" y1="6" x2="{x:.1f}" y2="{rowh*len(rows)+6}" '
            f'stroke="{LINE}" stroke-width="1"/>'
        )
        out.append(
            f'<text x="{x:.1f}" y="{rowh*len(rows)+22}" class="ax" '
            f'text-anchor="middle">{int(maxv*i/steps)}</text>'
        )
    for i, (label, val, pct) in enumerate(rows):
        y = 6 + i * rowh
        bw = barw * val / maxv
        out.append(
            f'<text x="{labw-12}" y="{y+rowh/2}" class="bl" text-anchor="end" '
            f'dominant-baseline="central">{label}</text>'
        )
        out.append(
            f'<rect x="{labw}" y="{y+5}" width="{bw:.1f}" height="{rowh-12}" '
            f'rx="4" fill="{color}"/>'
        )
        out.append(
            f'<text x="{labw+bw+9:.1f}" y="{y+rowh/2}" class="bv" '
            f'dominant-baseline="central">{val}{unit} · {fmt(pct)}%</text>'
        )
    return (
        f'<svg viewBox="0 0 {width} {h}" class="hbar" role="img">'
        + "".join(out)
        + "</svg>"
    )


def bar_block(title, rows, kicker=None, maxv=None, color=S1, note=None, unit=""):
    k = f'<span class="ch-kick">{kicker}</span>' if kicker else ""
    n = f'<p class="ch-note">{note}</p>' if note else ""
    return f"""<figure class="chart wide">
  <figcaption class="ch-head">{k}<h4>{title}</h4></figcaption>
  {hbars(rows, maxv=maxv, color=color, unit=unit)}{n}
</figure>"""


def stat(value, label, sub=None, tone=""):
    s = f'<span class="st-sub">{sub}</span>' if sub else ""
    return (
        f'<div class="stat {tone}"><b class="st-v">{value}</b>'
        f'<span class="st-l">{label}</span>{s}</div>'
    )


# ---------------------------------------------------------------- ikonkalar --
def icon(name, c=GOLD):
    """Sodda chiziqli SVG ikonkalar (tashqi fayllarsiz)."""
    p = {
        "search": '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 L21 21"/>',
        "chat": '<path d="M3 5h18v12H9l-6 5z"/>',
        "chart": '<path d="M3 21h18"/><rect x="5" y="11" width="4" height="7"/>'
                 '<rect x="11" y="6" width="4" height="12"/><rect x="17" y="9" width="4" height="9"/>',
        "rocket": '<path d="M12 2c4 3 6 7 6 12l-3 3H9l-3-3C6 9 8 5 12 2z"/>'
                  '<circle cx="12" cy="10" r="2"/><path d="M9 17l-3 5 5-2M15 17l3 5-5-2"/>',
        "target": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>'
                  '<circle cx="12" cy="12" r="1.4"/>',
        "funnel": '<path d="M3 4h18l-7 8v8l-4-2v-6z"/>',
        "money": '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',
        "note": '<path d="M6 3h9l5 5v13H6z"/><path d="M15 3v5h5"/><path d="M9 13h7M9 17h5"/>',
        "warn": '<path d="M12 3 22 20H2z"/><path d="M12 10v5M12 17.5v.5"/>',
        "check": '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
        "layers": '<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',
        "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
        "people": '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/>'
                  '<circle cx="17.5" cy="9" r="2.6"/><path d="M16 14.4c3 .2 5.5 2.3 5.5 5.6"/>',
        "mail": '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2.5 6.5 12 13l9.5-6.5"/>',
        "spark": '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',
        "book": '<path d="M3 4.5h6a3 3 0 0 1 3 3v12a2.4 2.4 0 0 0-2.4-2.4H3z"/>'
                '<path d="M21 4.5h-6a3 3 0 0 0-3 3v12a2.4 2.4 0 0 1 2.4-2.4H21z"/>',
    }[name]
    return (
        f'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="{c}" '
        f'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{p}</svg>'
    )


# ------------------------------------------------------------------- CSS -----
CSS = """
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
:root{
  --ink:@INK@; --ink2:@INK2@; --muted:@MUTED@; --line:@LINE@;
  --cream:@CREAM@; --deep:@DEEP@; --gold:@GOLD@;
  --s1:@S1@; --s2:@S2@; --s3:@S3@; --s4:@S4@; --s5:@S5@; --s6:@S6@;
  --serif:Charter,"Bitstream Charter","Liberation Serif",Georgia,"Times New Roman",serif;
  --sans:"Liberation Sans","DejaVu Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;
}
body{background:#6b6a66;font-family:var(--sans);color:var(--ink);
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}

/* ---------- A3 varaq ---------- */
@page{size:A3 portrait;margin:0}
.sheet{
  position:relative;width:297mm;height:420mm;overflow:hidden;
  background:var(--cream);margin:0 auto 10mm;padding:20mm 18mm 16mm;
  display:flex;flex-direction:column;
}
@media print{
  body{background:#fff}
  .sheet{margin:0;box-shadow:none;page-break-after:always;break-after:page}
  .sheet:last-child{page-break-after:auto;break-after:auto}
  .noprint{display:none !important}
}
.sheet::after{content:"";position:absolute;inset:8mm;border:1px solid rgba(20,17,12,.08);
  pointer-events:none}
.sheet.dark{background:var(--deep);color:#F3EEE2}
.sheet.dark::after{border-color:rgba(201,162,39,.28)}

/* ---------- kolontitul ---------- */
.run{display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1.5px solid var(--ink);padding-bottom:3mm;margin-bottom:7mm;flex:0 0 auto}
.run .r-l{font:700 10.5pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase}
.run .r-r{font:400 9.5pt/1 var(--sans);color:var(--ink2);letter-spacing:.06em}
.run .r-r b{color:var(--gold)}
.foot{margin-top:auto;padding-top:4mm;border-top:1px solid var(--line);
  display:flex;justify-content:space-between;align-items:center;flex:0 0 auto;
  font:400 8.5pt/1 var(--sans);color:var(--muted);letter-spacing:.06em}
.foot b{color:var(--ink);font-size:11pt}

/* ---------- tipografika ---------- */
h1,h2,h3,h4{margin:0;font-family:var(--serif);font-weight:700;letter-spacing:-.01em}
h2.sec{font-size:30pt;line-height:1.03;margin:0 0 4mm}
h3{font-size:16.5pt;line-height:1.12;margin:0 0 2.5mm}
h4{font-size:11.5pt;line-height:1.15}
p{margin:0 0 2.6mm;font-size:10.2pt;line-height:1.5;color:var(--ink2)}
.lead{font-size:12pt;line-height:1.45;color:var(--ink)}
b,strong{color:var(--ink)}
.kick{display:inline-block;font:700 8.5pt/1 var(--sans);letter-spacing:.18em;
  text-transform:uppercase;color:var(--gold);margin-bottom:2.5mm}
.rule{height:2px;background:var(--ink);margin:0 0 5mm}
.rule.g{background:var(--gold)}

/* ---------- panjara ---------- */
.grid{display:grid;gap:6mm}
.g2{grid-template-columns:1fr 1fr}
.g3{grid-template-columns:repeat(3,1fr)}
.g4{grid-template-columns:repeat(4,1fr)}
.g21{grid-template-columns:1.35fr 1fr}
.g12{grid-template-columns:1fr 1.35fr}
.flow{flex:1 1 auto;display:flex;flex-direction:column;gap:5mm;min-height:0;
  justify-content:space-between}

/* ---------- kartochkalar ---------- */
.card{background:#fff;border:1px solid var(--line);border-radius:3mm;padding:5mm 5.5mm;
  position:relative}
.card.tint{background:#F6F1E4}
.card.ink{background:var(--deep);color:#F3EEE2;border-color:var(--deep)}
.card.ink p,.card.ink li{color:#CFC7B5}
.card.ink b,.card.ink strong{color:#fff}
.card.gold{background:#FBF3D8;border-color:#E7D28C}
.card h4{margin-bottom:2.5mm;display:flex;align-items:center;gap:2.2mm}
.card p:last-child,.card ul:last-child{margin-bottom:0}
.ico{width:15px;height:15px;flex:0 0 auto}
.card.ink .ico{stroke:var(--gold)}

/* ---------- ro'yxatlar ---------- */
ul.ticks{list-style:none;margin:0;padding:0}
ul.ticks li{position:relative;padding-left:6.5mm;margin-bottom:2mm;
  font-size:9.9pt;line-height:1.42;color:var(--ink2)}
ul.ticks li::before{content:"";position:absolute;left:0;top:1.55mm;width:2.6mm;height:2.6mm;
  border-radius:50%;background:var(--gold)}
ul.ticks.sq li::before{border-radius:0;transform:rotate(45deg)}
ul.ticks.x li::before{background:var(--s4)}
ul.ticks.ok li::before{background:var(--s6)}
ol.steps{list-style:none;margin:0;padding:0;counter-reset:st}
ol.steps li{counter-increment:st;position:relative;padding-left:9mm;margin-bottom:2.6mm;
  font-size:9.9pt;line-height:1.42;color:var(--ink2)}
ol.steps li::before{content:counter(st,decimal-leading-zero);position:absolute;left:0;top:0;
  font:700 9pt/1.5 var(--sans);color:var(--gold);letter-spacing:.04em}
.dl-list{margin:0;font-size:9.9pt;line-height:1.42}
.dl-list dt{font-weight:700;color:var(--ink);margin-top:2.4mm}
.dl-list dt:first-child{margin-top:0}
.dl-list dd{margin:0 0 0;color:var(--ink2)}

/* ---------- statistika plitkalari ---------- */
.stats{display:grid;gap:4mm}
.stat{background:#fff;border:1px solid var(--line);border-radius:3mm;padding:4mm 4.5mm}
.stat .st-v{display:block;font:700 24pt/1 var(--serif);color:var(--ink);letter-spacing:-.02em}
.stat .st-l{display:block;font:700 8.5pt/1.25 var(--sans);letter-spacing:.1em;
  text-transform:uppercase;color:var(--gold);margin-top:2mm}
.stat .st-sub{display:block;font-size:9pt;line-height:1.35;color:var(--ink2);margin-top:1.8mm}
.stat.ink{background:var(--deep);border-color:var(--deep)}
.stat.ink .st-v{color:#fff}.stat.ink .st-sub{color:#CFC7B5}
.stat.gold{background:#FBF3D8;border-color:#E7D28C}

/* ---------- diagrammalar ---------- */
.chart{margin:0;background:#fff;border:1px solid var(--line);border-radius:3mm;padding:4.5mm 5mm}
.chart.wide{padding-bottom:3mm}
.ch-head{margin-bottom:3mm}
.ch-kick{display:block;font:700 7.5pt/1 var(--sans);letter-spacing:.16em;
  text-transform:uppercase;color:var(--gold);margin-bottom:1.6mm}
.ch-body{display:flex;align-items:center;justify-content:center;margin-bottom:3mm}
.donut{width:52mm;height:52mm;flex:0 0 auto}
.hbar{width:100%;height:auto}
.ch-note,.lg-note{font-size:8.6pt;line-height:1.4;color:var(--ink2);margin:2.5mm 0 0}
svg text.dl{font:700 8px var(--sans);fill:#fff}
svg text.ax{font:400 8.5px var(--sans);fill:@MUTED@}
svg text.bl{font:400 10.5px var(--sans);fill:@INK2@}
svg text.bv{font:700 10.5px var(--sans);fill:@INK@}
ul.legend{list-style:none;margin:0;padding:0}
ul.legend li{display:flex;align-items:baseline;gap:2mm;font-size:9pt;line-height:1.28;
  padding:1.2mm 0;border-bottom:1px solid #F0EADC;color:var(--ink2)}
ul.legend li:last-child{border-bottom:0}
ul.legend i{width:2.6mm;height:2.6mm;border-radius:.6mm;flex:0 0 auto;
  position:relative;top:.2mm}
.lg-t{flex:1 1 auto}
.lg-v{font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums}

/* ---------- maxsus bloklar ---------- */
.quote{border-left:3px solid var(--gold);padding:1mm 0 1mm 5mm;margin:0;
  font:italic 400 11.5pt/1.42 var(--serif);color:var(--ink)}
.callout{background:var(--deep);color:#F3EEE2;border-radius:3mm;padding:5mm 5.5mm}
.callout .kick{color:var(--gold)}
.callout p,.callout dd,.callout ul.ticks li,.callout ol.steps li,
.card.ink ul.ticks li,.card.ink ol.steps li{color:#CFC7B5}
.callout p{margin-bottom:0}
.callout p+p{margin-top:2.4mm}
.callout strong,.callout b,.callout h3,.callout h4,.callout dt{color:#fff}
.callout table.tbl td{color:#CFC7B5;border-bottom-color:rgba(255,255,255,.14)}
.callout table.tbl td:first-child{color:#fff}
.tag{display:inline-block;font:700 8pt/1 var(--sans);letter-spacing:.08em;
  text-transform:uppercase;padding:1.6mm 2.6mm;border-radius:1.4mm;
  background:#F0E7CE;color:#7A611A;margin:0 1.4mm 1.4mm 0}
.tag.d{background:var(--deep);color:var(--gold)}
table.tbl{width:100%;border-collapse:collapse;font-size:9.4pt}
table.tbl th{text-align:left;font:700 8pt/1 var(--sans);letter-spacing:.1em;
  text-transform:uppercase;color:var(--gold);padding:0 2mm 2mm 0;
  border-bottom:1.5px solid var(--ink)}
table.tbl td{padding:2.2mm 2mm 2.2mm 0;border-bottom:1px solid var(--line);
  color:var(--ink2);vertical-align:top}
table.tbl td:first-child{color:var(--ink);font-weight:700;width:34%}
table.tbl tr:last-child td{border-bottom:0}

/* ---------- muqova ---------- */
.cover{justify-content:space-between}
.cv-top{display:flex;justify-content:space-between;align-items:flex-start;
  border-bottom:1px solid rgba(201,162,39,.35);padding-bottom:4mm}
.cv-top span{font:700 9.5pt/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;
  color:var(--gold)}
.cv-title{font-family:var(--serif);font-weight:700;font-size:70pt;line-height:.94;
  letter-spacing:-.025em;color:#fff;margin:0}
.cv-title em{font-style:normal;color:var(--gold);display:block}
.cv-sub{font-size:14pt;line-height:1.4;color:#CFC7B5;max-width:150mm;margin:6mm 0 0}
.cv-mods{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:9mm}
.cv-mod{border-top:2px solid var(--gold);padding-top:3.5mm}
.cv-mod b{display:block;font:700 8.5pt/1 var(--sans);letter-spacing:.16em;color:var(--gold);
  margin-bottom:2.4mm}
.cv-mod span{font:400 11pt/1.32 var(--serif);color:#F3EEE2}
.cv-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;
  border-top:1px solid rgba(201,162,39,.35);padding-top:5mm}
.cv-stats div b{display:block;font:700 26pt/1 var(--serif);color:var(--gold)}
.cv-stats div span{display:block;font-size:9.4pt;line-height:1.32;color:#CFC7B5;margin-top:1.6mm}

/* ---------- yo'riqnoma paneli (bosilmaydi) ---------- */
.noprint{max-width:297mm;margin:8mm auto;padding:5mm 6mm;background:#fff;
  border-radius:3mm;border:1px solid var(--line);font-size:10.5pt;line-height:1.5;color:var(--ink2)}
.noprint h4{font-size:12pt;margin-bottom:2mm}
.noprint kbd{background:#F0EADC;border-radius:1mm;padding:.4mm 1.4mm;font:700 9.5pt var(--sans);
  color:var(--ink)}
"""
for _k, _v in dict(INK=INK, INK2=INK2, MUTED=MUTED, LINE=LINE, CREAM=CREAM,
                   DEEP=DEEP, GOLD=GOLD, S1=S1, S2=S2, S3=S3, S4=S4, S5=S5,
                   S6=S6).items():
    CSS = CSS.replace("@" + _k + "@", _v)


# ----------------------------------------------------------------- varaq -----
SHEETS = []


def sheet(inner, run_left="", run_right="", dark=False, cover=False):
    cls = "sheet" + (" dark" if dark else "") + (" cover" if cover else "")
    n = len(SHEETS) + 1
    if cover:
        SHEETS.append(f'<section class="{cls}">{inner}</section>')
        return
    head = (
        f'<header class="run"><span class="r-l">{run_left}</span>'
        f'<span class="r-r">{run_right}</span></header>'
    )
    foot = (
        f'<footer class="foot"><span>ZAPUSK QO\'LLANMASI · {run_left}</span>'
        f'<b>{n:02d}</b></footer>'
    )
    SHEETS.append(f'<section class="{cls}">{head}<div class="flow">{inner}</div>{foot}</section>')


# ============================================================== 1. MUQOVA ====
sheet(cover=True, dark=True, inner=f"""
<div class="cv-top">
  <span>To'liq qo'llanma · 2026</span>
  <span>3 bo'lim · 14 sahifa · A3</span>
</div>

<div>
  <h1 class="cv-title">ZAPUSK<em>TIZIMI</em></h1>
  <p class="cv-sub">Auditoriyani tushunishdan tortib rekord sotuvgacha —
  bitta hujjatda. Uchta darsning barcha ma'lumotlari, real raqamlar va
  tayyor qadamlar bilan.</p>

  <svg viewBox="0 0 900 150" style="width:100%;height:auto;margin-top:10mm">
    <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{GOLD}" stop-opacity=".15"/>
      <stop offset=".5" stop-color="{GOLD}" stop-opacity="1"/>
      <stop offset="1" stop-color="{GOLD}" stop-opacity=".15"/>
    </linearGradient></defs>
    <path d="M0 120 C 180 120, 200 30, 330 30 S 520 120, 660 120 S 830 40, 900 40"
          fill="none" stroke="url(#gg)" stroke-width="2.5"/>
    <path d="M0 138 C 200 138, 230 62, 360 62 S 560 132, 700 132 S 850 66, 900 66"
          fill="none" stroke="{GOLD}" stroke-opacity=".28" stroke-width="1.2"/>
    <circle cx="330" cy="30" r="7" fill="{GOLD}"/>
    <circle cx="660" cy="120" r="7" fill="{GOLD}"/>
    <circle cx="330" cy="30" r="17" fill="none" stroke="{GOLD}" stroke-opacity=".45"/>
    <circle cx="660" cy="120" r="17" fill="none" stroke="{GOLD}" stroke-opacity=".45"/>
    <circle cx="120" cy="118" r="4" fill="{GOLD}" fill-opacity=".6"/>
    <circle cx="860" cy="52" r="4" fill="{GOLD}" fill-opacity=".6"/>
  </svg>

  <div class="cv-mods">
    <div class="cv-mod"><b>1-BO'LIM</b>
      <span>Auditoriya tahlili va Custdev</span></div>
    <div class="cv-mod"><b>2-BO'LIM</b>
      <span>Anketa tahlili: jonli misol va raqamlar</span></div>
    <div class="cv-mod"><b>3-BO'LIM</b>
      <span>Zapusk razbori: rejadan sotuvgacha</span></div>
  </div>
</div>

<div class="cv-stats">
  <div><b>1&nbsp;900</b><span>Bitta zapuskda yig'ilgan anketa</span></div>
  <div><b>5&ndash;15%</b><span>Anketa to'ldirilishining normasi</span></div>
  <div><b>7/10</b><span>Qayta yig'ilgandan keyingi custdev bron</span></div>
  <div><b>3</b><span>Mahsulot yo'lining bosqichi</span></div>
</div>
""")


# ======================================================= 2. MUNDARIJA ========
sheet(run_left="Mundarija", run_right="Bu qo'llanma <b>nima beradi</b>", inner=f"""
<div class="grid g12">
  <div>
    <span class="kick">Boshlashdan oldin</span>
    <h2 class="sec">Uch dars —<br>bitta tizim</h2>
    <div class="rule"></div>
    <p class="lead">Bu hujjat uchta alohida darsdan yig'ilgan. Ular alohida qaralganda —
    shunchaki foydali maslahatlar. Birga qaralganda — ishlaydigan tizim.</p>
    <p>Mantiq juda ham sodda. Avval <b>odamlarni tushunasiz</b> (1-bo'lim).
    Keyin tushunganingizni <b>raqamlar bilan tekshirasiz</b> (2-bo'lim).
    Shundan keyingina <b>zapusk qilasiz</b> (3-bo'lim). Tartibni buzsangiz,
    kontent ham, reklama ham bo'sh ketadi.</p>

    <div class="callout" style="margin-top:5mm">
      <span class="kick">Asosiy fikr</span>
      <p><strong>Sotuv kontentdan boshlanmaydi.</strong> Sotuv odamning
      qanaqa so'zlar bilan gapirishini bilishdan boshlanadi. Siz o'sha so'zlarni
      faqat suhbat orqali olasiz — boshqa yo'li yo'q.</p>
    </div>
  </div>

  <div>
    <table class="tbl">
      <tr><th>Sahifa</th><th>Mavzu</th></tr>
      <tr><td>03</td><td><b>1-BO'LIM.</b> Auditoriya anketasi: nima uchun kerak,
        nima so'raladi, qanday xulosa chiqariladi</td></tr>
      <tr><td>04&ndash;05</td><td>Custdev: kimni tanlash, qanday chaqirish, nima so'rash,
        oldindan to'lovga qanday yopish · &laquo;Belkurak&raquo; texnikasi</td></tr>
      <tr><td>06</td><td>Mahsulot va offerni kuchaytirish · 10 qadam · 1-uy vazifasi</td></tr>
      <tr><td>07&ndash;09</td><td><b>2-BO'LIM.</b> Real anketa tahlili:
        9 ta diagramma va ulardan chiqadigan xulosalar</td></tr>
      <tr><td>10</td><td><b>3-BO'LIM.</b> Strategiya, taymlayn va kontekstli kontent</td></tr>
      <tr><td>11</td><td>Voronka, trafik va anketalar qayerdan keladi</td></tr>
      <tr><td>12</td><td>Bron, lid-magnit va faol bosqich</td></tr>
      <tr><td>13</td><td>Instagram'da progrev: CTA va stories qoidalari</td></tr>
      <tr><td>14</td><td>Telegram'da progrev, razborlar va direct</td></tr>
      <tr><td>15</td><td>Yopiq prezentatsiya, sotuv oynalari, xulosa</td></tr>
    </table>
  </div>
</div>

<div>
  <span class="kick">Yo'l xaritasi</span>
  <svg viewBox="0 0 980 128" style="width:100%;height:auto">
    <line x1="122" y1="46" x2="858" y2="46" stroke="{LINE}" stroke-width="2"/>
    {"".join(
      f'<g><circle cx="{122+i*245:.0f}" cy="46" r="21" fill="{DEEP}"/>'
      f'<text x="{122+i*245:.0f}" y="46" text-anchor="middle" dominant-baseline="central" '
      f'style="font:700 15px var(--sans);fill:{GOLD}">0{i+1}</text>'
      f'<text x="{122+i*245:.0f}" y="90" text-anchor="middle" '
      f'style="font:700 15px var(--sans);fill:{INK}">{t}</text>'
      f'<foreignObject x="{122+i*245-110:.0f}" y="98" width="220" height="30">'
      f'<div xmlns="http://www.w3.org/1999/xhtml" style="font:400 12.5px/1.3 var(--sans);'
      f'color:{INK2};text-align:center">{s}</div></foreignObject></g>'
      for i,(t,s) in enumerate([
        ("Anketa","Katta segmentlarni ko'rasiz"),
        ("Custdev","Aniq og'riq va so'zlarni olasiz"),
        ("Apgreyd","Mahsulot va offerni kuchaytirasiz"),
        ("Zapusk","Kontent va sotuvga qo'yasiz"),
      ]))}
  </svg>
</div>

<div class="grid g3">
  <div class="card"><h4>{icon('search')}Aniqlik</h4>
    <p>Taxmin qilishni to'xtatasiz. Har bir qadamda auditoriyaning
    real so'zlariga tayanasiz.</p></div>
  <div class="card"><h4>{icon('layers')}Kuchli mahsulot</h4>
    <p>Mahsulotingizga aynan nima yetishmayotganini bilib olasiz va uni qo'shasiz.</p></div>
  <div class="card"><h4>{icon('money')}Barqaror sotuv</h4>
    <p>Har zapuskda kamida 5&ndash;10 ta shaxsiy sotuv — boshqa sotuv oynalaridan
    tashqari.</p></div>
</div>

<div class="card tint">
  <h4>{icon('book')}Qo'llanmada uchraydigan so'zlar</h4>
  <p>Bu sohada ko'p so'zlar rus va ingliz tilidan kirgan. Ularni tarjima qilmaymiz —
  chunki hamma shunday gapiradi. Lekin ma'nosini bir marta aniq kelishib olaylik:</p>
  <div class="grid g3" style="gap:6mm;margin-top:3mm">
    <dl class="dl-list">
      <dt>Zapusk</dt><dd>Mahsulotni belgilangan muddatda sotish uchun qilinadigan
        to'liq kampaniya.</dd>
      <dt>Auditoriya</dt><dd>Sizni kuzatib boradigan odamlar.</dd>
      <dt>Segment</dt><dd>Auditoriyaning bir-biriga o'xshash qismi.</dd>
      <dt>Custdev</dt><dd>Potensial mijoz bilan qilinadigan suhbat-tadqiqot.</dd>
      <dt>Anketa</dt><dd>Auditoriyaga beriladigan savollar ro'yxati.</dd>
    </dl>
    <dl class="dl-list">
      <dt>Lid-magnit (LM)</dt><dd>Aloqa ma'lumoti evaziga beriladigan bepul
        foydali material.</dd>
      <dt>Voronka</dt><dd>Odam bepul materialdan xaridgacha o'tadigan yo'l.</dd>
      <dt>Progrev</dt><dd>Xariddan oldin ishonch va qiziqishni oshiruvchi kontent.</dd>
      <dt>Offer</dt><dd>Taklif: odam nima oladi va qanday yo'l bilan.</dd>
      <dt>CTA</dt><dd>Harakatga chaqiruv: «yozing», «+ qo'ying».</dd>
    </dl>
    <dl class="dl-list">
      <dt>Bron</dt><dd>Sotuv boshlanishidan oldin joyni band qilish.</dd>
      <dt>Kvalifikatsiya</dt><dd>Odam sizga mos keladimi — shuni tekshirish.</dd>
      <dt>Ajiotaj</dt><dd>Talab yuqoriligini ko'rsatuvchi jonlanish.</dd>
      <dt>Razbor</dt><dd>Bitta odamning ishini ochiq tahlil qilish.</dd>
      <dt>Qamrov</dt><dd>Kontentingizni ko'rgan odamlar soni.</dd>
    </dl>
  </div>
</div>
""")


# ================================================ 3. 1-BO'LIM · ANKETA =======
sheet(run_left="1-bo'lim · Auditoriya anketasi", run_right="Odamlarni <b>katta chiziqlar</b> bilan ko'rish",
inner=f"""
<div class="grid g21">
  <div>
    <span class="kick">01 &mdash; Birinchi qadam</span>
    <h2 class="sec">Auditoriya<br>anketasi</h2>
    <div class="rule g"></div>
    <p class="lead">Anketa &mdash; bu auditoriyangizning &laquo;aholi ro'yxati&raquo;.
    U sizga chuqur og'riqlarni bermaydi. U boshqa narsani beradi:
    <b>sizda qanaqa katta guruhlar bor va ular nechta</b>.</p>
    <p>Chuqur og'riqlarni qazishdan oldin shuni bilib olish kerak.
    Aks holda siz butun kontentni bor-yo'g'i 10% odamga qaratib qo'yasiz.</p>
  </div>
  <div class="stats g2 grid" style="align-content:start">
    {stat("5&ndash;15%", "To'ldirish normasi", "Qamrovingizdan shuncha odam anketani to'ldirsa — bu yaxshi natija", tone="gold")}
    {stat("1&ndash;2", "Marta yilda", "Anketa tez-tez kerak emas. Yiliga bir-ikki marta yetadi", tone="ink")}
  </div>
</div>

<div class="grid g3">
  <div class="card"><h4>{icon('note')}Anketada nima so'raysiz</h4>
    <ul class="ticks">
      <li>Yoshi</li><li>Bolalari bormi</li>
      <li>Qancha vaqtdan beri obuna</li>
      <li>Oylik daromadi</li>
      <li>Kasbi va hozirgi ishi</li>
      <li>20 ta og'riqdan qaysilari o'ziniki</li>
      <li>20 ta istakdan qaysilari o'ziniki</li>
    </ul></div>
  <div class="card"><h4>{icon('people')}Nima uchun aynan shular</h4>
    <p>Ikkita savolga javob olish uchun:</p>
    <ul class="ticks sq">
      <li><b>Mening auditoriyamda qanaqa segmentlar bor?</b>
        Nechta &laquo;o'z mahsuloti borlar&raquo;? Nechta yangi boshlovchi?</li>
      <li><b>Qaysi og'riq va istak eng ko'p uchraydi?</b>
        20 tadan top-5 tasini ajratasiz.</li>
    </ul>
    <p style="margin-top:2.5mm">Mana shu ikki javob butun kontent rejangizni belgilaydi.</p></div>
  <div class="card"><h4>{icon('chart')}Qayerda yig'asiz</h4>
    <ul class="ticks">
      <li>Google Forms</li><li>Typeform</li><li>Telegram-bot</li>
    </ul>
    <p style="margin-top:2.5mm"><b>Qanday tarqatasiz:</b> botdagi bazaga xabar,
    stories, kanaldagi postlar. Uchtasini birga ishlating &mdash; bittasi kam.</p></div>
</div>

<div class="grid g2">
  <div class="card tint">
    <h4>{icon('layers')}Misol: bitta nisha &mdash; uchta segment</h4>
    <p>Aytaylik, ekspert nafas mashqlari bo'yicha dars beradi. Uning obunachilari
    bir xil emas:</p>
    <table class="tbl" style="margin-top:3mm">
      <tr><td>Muammosi borlar</td><td>Sog'ligi uchun yechim qidiryapti</td></tr>
      <tr><td>Shifokorlar</td><td>Kasbi uchun yangi metod qidiryapti</td></tr>
      <tr><td>Yordamchi mutaxassislar</td><td>Xizmatiga qo'shimcha qilmoqchi</td></tr>
      <tr><td>O'zi uchun qiziqqanlar</td><td>Shunchaki qiziq, sotib olmaydi</td></tr>
    </table>
    <p style="margin-top:3mm">Savol bitta: <b>ularning har biri nechta?</b>
    Javobni bilmasangiz, offeringiz eng katta guruhga tegmay ketadi.</p>
  </div>

  <div style="display:flex;flex-direction:column;gap:6mm">
    <div class="card gold">
      <h4>{icon('warn')}Eng ko'p uchraydigan xato</h4>
      <p class="lead" style="font-family:var(--serif)">Anketa yig'ildi &mdash;
      lekin undan xulosa chiqarilmadi.</p>
      <p>Bu bekorga qilingan ish. Har bir savol bo'yicha o'zingizga ayting:
      <b>&laquo;Bu menga nima beryapti?&raquo;</b> Javob bo'lmasa &mdash; savol keraksiz edi.</p>
    </div>
    <div class="card">
      <h4>{icon('spark')}Anketasiz ham bo'ladimi?</h4>
      <p>Ha, tezkor variant bor. Uni <b>&laquo;tizzada tahlil&raquo;</b> deyishadi:</p>
      <ol class="steps">
        <li>Stories'da savol berasiz va odamlarni ajratasiz
          (kim yangi boshlovchi, kim tajribali).</li>
        <li>Eng maqsadli javob berganlarni direct'da alohida nazoratga olasiz.</li>
        <li>Ularning ro'yxatini yig'ib borasiz &mdash; keyin custdev'ga aynan
          shularni chaqirasiz.</li>
      </ol>
    </div>
  </div>
</div>

<div class="card">
  <h4>{icon('note')}Anketa savollari namunasi</h4>
  <p>Quyidagi ro'yxatni o'zingizning nishangizga moslab oling. Savollar ikki
  guruhga bo'linadi &mdash; <b>kim</b> va <b>nima kerak</b>.</p>
  <div class="grid g4" style="gap:5mm;margin-top:3mm">
    <div>
      <b class="tag">A &mdash; Kim</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>Yoshingiz nechada?</li>
        <li>Turmush qurganmisiz? Bolangiz bormi?</li>
        <li>Qaysi shaharda yashaysiz?</li>
        <li>Hozir nima ish qilasiz?</li>
      </ul>
    </div>
    <div>
      <b class="tag">B &mdash; Qancha vaqt</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>Menga qachondan beri obunasiz?</li>
        <li>Mendan biror narsa sotib olganmisiz?</li>
        <li>Shu mavzuda boshqa kurs o'tganmisiz?</li>
      </ul>
    </div>
    <div>
      <b class="tag">C &mdash; Og'riqlar</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>20 ta og'riqdan qaysilari sizga tegishli? (belgilang)</li>
        <li>Hozir eng qiynayotgan narsa nima?</li>
        <li>Nima uchun hali natija yo'q deb o'ylaysiz?</li>
      </ul>
    </div>
    <div>
      <b class="tag">D &mdash; Istaklar va pul</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>20 ta istakdan qaysilari sizniki?</li>
        <li>Bir yildan keyin qanday natija istaysiz?</li>
        <li>Hozirgi oylik daromadingiz qancha?</li>
      </ul>
    </div>
  </div>
  <p style="margin-top:3.5mm"><b>Maslahat:</b> og'riq va istaklarni ochiq savol
  qilib bermang. Tayyor ro'yxat bering va &laquo;belgilang&raquo; deng &mdash;
  shunda javoblarni sanab, reyting qilib chiqasiz.</p>
</div>
""")


# ============================================== 4. 1-BO'LIM · CUSTDEV ========
sheet(run_left="1-bo'lim · Custdev", run_right="Suhbat &mdash; <b>gipotezani tekshirishning eng tez yo'li</b>",
inner=f"""
<div class="grid g12">
  <div>
    <span class="kick">02 &mdash; Ikkinchi qadam</span>
    <h2 class="sec">Custdev:<br>jonli suhbat</h2>
    <div class="rule g"></div>
    <p class="lead">Custdev &mdash; bu potensial mijoz bilan qilinadigan suhbat.
    Maqsadi bitta: uning haqiqiy ehtiyojini bilish.</p>
    <p>Buni deyarli hamma qiladi, lekin <b>yaxshi qiladiganlar juda kam</b>.
    Farqi shunda: yaxshi custdev'dan keyin siz progrevni ham, vebinarni ham,
    sotuvni ham aniqroq qilasiz.</p>
    <p class="quote" style="margin-top:4mm">Custdev &mdash; gipotezangiz umuman
    to'g'rimi yoki yo'qmi, buni tez tekshirish usuli.</p>
  </div>

  <div class="card ink">
    <h4>{icon('funnel')}Hayotdan olingan misol</h4>
    <svg viewBox="0 0 460 190" style="width:100%;height:auto;margin:2mm 0 3mm">
      <text x="0" y="14" style="font:700 12px var(--sans);fill:{GOLD}">1-URINISH</text>
      <rect x="0" y="24" width="200" height="34" rx="4" fill="#2B3A40"/>
      <text x="12" y="46" style="font:700 15px var(--sans);fill:#fff">20 ta suhbat</text>
      <rect x="0" y="64" width="42" height="34" rx="4" fill="{S4}"/>
      <text x="52" y="86" style="font:700 15px var(--sans);fill:#fff">4 ta bron</text>
      <text x="0" y="118" style="font:400 12.5px var(--sans);fill:#CFC7B5">
        Offer ham, ma'no ham mutlaqo tegmadi.</text>

      <text x="250" y="14" style="font:700 12px var(--sans);fill:{GOLD}">QAYTA YIG'ILGANDAN KEYIN</text>
      <rect x="250" y="24" width="100" height="34" rx="4" fill="#2B3A40"/>
      <text x="262" y="46" style="font:700 15px var(--sans);fill:#fff">10 ta</text>
      <rect x="250" y="64" width="70" height="34" rx="4" fill="{S6}"/>
      <text x="330" y="86" style="font:700 15px var(--sans);fill:#fff">7 ta bron</text>
      <text x="250" y="118" style="font:400 12.5px var(--sans);fill:#CFC7B5">
        Offer va ma'no bog'lanishi topildi.</text>

      <line x1="0" y1="140" x2="460" y2="140" stroke="{GOLD}" stroke-opacity=".4"/>
      <text x="0" y="172" style="font:700 30px var(--serif);fill:{GOLD}">80 mln+</text>
      <text x="150" y="172" style="font:400 13px var(--sans);fill:#CFC7B5">yakuniy zapusk natijasi</text>
    </svg>
    <p>Mahsulot g'oyasi yaxshi edi. Lekin birinchi 20 ta suhbat ko'rsatdiki,
    offer noto'g'ri. Uni qayta yig'ishdi &mdash; va keyingi 10 ta suhbatdan 7 tasi
    bron bilan tugadi.</p>
  </div>
</div>

<div class="grid g3">
  <div class="card">
    <h4>{icon('target')}Kimni tanlaysiz</h4>
    <p><b>Asosiy e'tibor &mdash; hech narsa sotib olmaganlarga.</b> Ularni
    obuna muddati bo'yicha ajrating:</p>
    <ul class="ticks">
      <li>1&ndash;3 oy oldin obuna bo'lganlar</li>
      <li>3&ndash;6 oy</li>
      <li>6&ndash;12 oy</li>
      <li>Bir yildan ko'p</li>
      <li>Va alohida &mdash; sotib olganlar</li>
    </ul>
  </div>
  <div class="card gold">
    <h4>{icon('warn')}Klassik xato</h4>
    <p>Eng sodiq va eng puldor obunachilarni tanlash.</p>
    <ul class="ticks x" style="margin-top:2.5mm">
      <li><b>Plyusi:</b> ular baribir sotib olishadi.</li>
      <li><b>Minusi:</b> tanlov noto'g'ri chiqadi. Ular butun auditoriyangizni
        ifodalamaydi.</li>
    </ul>
    <p style="margin-top:2.5mm"><b>To'g'risi:</b> auditoriyangizning
    <b>o'rta va quyi</b> qismini suhbatga chaqiring. Haqiqat o'sha yerda.</p>
  </div>
  <div class="card">
    <h4>{icon('people')}Misol: SMM kursi</h4>
    <p>150 ming so'mlik SMM-menejerlar kursi. Ustuvor segmentlar:</p>
    <ul class="ticks sq">
      <li>Umuman SMM bilan shug'ullanmaydiganlar</li>
      <li>20&ndash;50 ming topayotgan yangi SMM-menejerlar</li>
    </ul>
    <p style="margin-top:2.5mm"><b>Amalda shunday bo'ladi:</b><br>
    5 ta suhbat &mdash; noldan boshlamoqchi bo'lganlar bilan.<br>
    5 ta suhbat &mdash; 30 mingdan ko'p topayotganlar bilan.<br>
    Ikkalasiga ham yangi va eski obunachilarni qo'shing.</p>
  </div>
</div>

<div class="grid g2">
  <div class="card tint">
    <h4>{icon('chat')}Qanday chaqirasiz</h4>
    <p>Uchta manba ishlaydi:</p>
    <ol class="steps">
      <li>Auditoriya anketasini to'ldirganlar ro'yxatidan.</li>
      <li>Stories'ga javob yozganlardan.</li>
      <li>Bazaga to'g'ridan-to'g'ri murojaat qilib.</li>
    </ol>
    <p style="margin-top:3mm"><b>Stories uchun tayyor matn:</b></p>
    <p class="quote">Mahsulotimni yangilayapman va kontentni kuchaytiryapman.
    Shuning uchun menga obuna bo'lgan odamlar bilan shaxsan gaplashmoqchiman.
    Oyiga 30 mingdan ko'p topayotgan amaldagi fotograflar, menga yozing &mdash;
    ayniqsa yaqinda obuna bo'lganlaringiz.</p>
  </div>
  <div style="display:flex;flex-direction:column;gap:6mm">
    <div class="card">
      <h4>{icon('clock')}Kim o'tkazadi va qancha vaqt</h4>
      <table class="tbl">
        <tr><td>Kim o'tkazadi</td><td>Siz o'zingiz + ssenarist yoki kontent-menejer.
          Ba'zan topshirsangiz ham bo'ladi &mdash; lekin butunlay emas</td></tr>
        <tr><td>Nechta odam</td><td>Har bir segmentdan 2&ndash;3 kishi.
          Segment kattaroq bo'lsa &mdash; 5&ndash;10 kishi</td></tr>
        <tr><td>Qancha vaqt</td><td>Bitta suhbatga 30&ndash;40 daqiqa ajrating.
          Qisqartirmang</td></tr>
      </table>
    </div>
    <div class="callout">
      <span class="kick">Eslatib qo'yamiz</span>
      <p>Custdev'ni ssenaristga topshirib, keyin faqat jadvaldagi natijaga qarash &mdash;
      <strong>eng katta yo'qotish</strong>. Siz odamning ovozini, to'xtalishini,
      qanaqa so'z tanlashini eshitishingiz kerak. Jadvalda bu yo'q.</p>
    </div>
  </div>
</div>
""")


# ========================================= 5. 1-BO'LIM · SUHBAT NATIJASI =====
sheet(run_left="1-bo'lim · Suhbat natijasi", run_right="Suhbatdan <b>oldindan to'lovgacha</b>",
inner=f"""
<div class="grid g21">
  <div>
    <span class="kick">Suhbatdan nima olib chiqasiz</span>
    <h2 class="sec">Bitta suhbat &mdash;<br>sakkizta javob</h2>
    <div class="rule"></div>
    <div class="grid g2" style="gap:4mm">
      <ol class="steps">
        <li><b>Auditoriyangizni chuqurroq tushunasiz.</b></li>
        <li><b>Odamning eng &laquo;yonayotgan&raquo; muammosi nima</b> &mdash;
          buni bilib olasiz.</li>
        <li><b>Nima uchun unda ishlar yurishmayapti</b> &mdash; sababini eshitasiz.</li>
        <li><b>U muammoni qanday hal qilmoqchi</b> &mdash; rejasini bilasiz.</li>
      </ol>
      <ol class="steps" start="5" style="counter-reset:st 4">
        <li><b>Uning eng katta istagi nima</b> &mdash; ideal natijasini eshitasiz.</li>
        <li><b>E'tirozlarini yig'asiz:</b> nega ilgari sotib olmagan,
          nega ishonmaydi.</li>
        <li><b>Mahsulotingizni yechim sifatida taklif qilasiz</b> &mdash;
          aynan u aytgan muammolarga.</li>
        <li><b>Oldindan to'lovga yopasiz.</b></li>
      </ol>
    </div>
    <div class="card gold" style="margin-top:5mm">
      <h4>{icon('money')}Oldindan to'lov qanday bo'ladi</h4>
      <div class="grid g3" style="gap:4mm">
        <div><b style="font:700 17pt/1 var(--serif)">3&ndash;5 ming</b>
          <p style="margin-top:1.5mm">Ramziy summa. Qaytarib berish mumkinligini
          aytib qo'ying &mdash; bu qo'rquvni oladi.</p></div>
        <div><b style="font:700 17pt/1 var(--serif)">Bonus</b>
          <p style="margin-top:1.5mm">Juda sotmoqchi bo'lsangiz, oldindan to'lovga
          bonus qo'shing.</p></div>
        <div><b style="font:700 17pt/1 var(--serif)">Rad etsa</b>
          <p style="margin-top:1.5mm">Bu ham natija. Rad javobning sababi &mdash;
          sizga kerak bo'lgan eng qimmatli ma'lumot.</p></div>
      </div>
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:6mm">
    <div class="card ink">
      <h4>{icon('spark')}&laquo;Belkurak&raquo; texnikasi</h4>
      <p>Har bir zapuskda <strong>o'z qo'lingiz bilan 5&ndash;10 ta sotuv</strong>
      qilishni qoida qiling. Boshqa barcha sotuv oynalaridan tashqari.</p>
      <p>Bu nima beradi:</p>
      <ul class="ticks ok" style="margin-top:2.5mm">
        <li>Zapusk boshidayoq tushum dinamikasi paydo bo'ladi</li>
        <li>Siz doim ma'nolardan xabardor bo'lasiz</li>
        <li>Bozorni his qilib turasiz</li>
        <li>Sotuv bo'limi va diagnostlar uchun tayyor material yaratasiz:
          ma'no, format, tezis, yozuvlar</li>
      </ul>
    </div>
    <div class="card">
      <h4>{icon('note')}Yozib borish qoidasi</h4>
      <p class="lead" style="font-family:var(--serif)">1 suhbat = 1 konspekt.</p>
      <p>Anketa va custdev'dan chiqqan barcha ma'nolarni bitta joyga &mdash;
      <b>ma'nolar xaritasiga</b> ko'chiring. Keyin har bir og'riq yoki istak
      yoniga yozing: uni qanday yopish mumkin?</p>
    </div>
  </div>
</div>

<div class="grid g2">
  <div class="card tint">
    <h4>{icon('chart')}Custdev &mdash; kontent uchun yoqilg'i</h4>
    <ul class="ticks">
      <li><b>Bitta suhbat = bir kunlik kontent.</b></li>
      <li><b>Odamlarning so'zlari bilan gapiring.</b> Ularning iborasini
        o'zgartirmang &mdash; to'g'ridan-to'g'ri oling va sarlavhaga qo'ying.
        Postda, rilsda, stories'da, videoda.</li>
      <li><b>&laquo;Ko'z o'rganib qolishi&raquo;dan qutqaradi.</b> Ekspert o'z
        mavzusiga shu qadar o'rganib qoladiki, oddiy narsani tushuntirishni
        unutadi. Suhbat buni tuzatadi.</li>
    </ul>
    <p style="margin-top:3mm"><b>Eng muhimi:</b> custdev natijalari jadvalda
    qolib ketmasin. Ular kontentga va sotuvga chiqishi kerak.</p>
  </div>

  <div class="card">
    <h4>{icon('warn')}Custdev'dagi 7 ta tipik xato</h4>
    <ul class="ticks x">
      <li>O'tkazdik, &laquo;nimadir tushundik&raquo; &mdash; lekin aniq xulosa yo'q.</li>
      <li>&laquo;O'ylab ko'raman&raquo; degan javobni qabul qilib qo'yish.
        Bu &mdash; rad javob. Ortidagi asl sababni chiqarish kerak.</li>
      <li>Keyingi zapuskda custdev qilmaslik &mdash; &laquo;biz allaqachon
        qilgandik&raquo; deb.</li>
      <li>Ssenaristga topshirib, natijani faqat jadvalda ko'rish.</li>
      <li>Suhbat zo'r o'tdi, lekin oldindan to'lovni so'rashga jur'at yetmadi.</li>
      <li>Faqat eng sodiq va eng puldorlar bilan gaplashish.</li>
      <li>Xulosa chiqarmaslik va kontentga aylantirmaslik.</li>
    </ul>
  </div>
</div>

<div class="card tint">
  <h4>{icon('chat')}Suhbat rejasi: yuqoridagi 8 ta natijani qanday olasiz</h4>
  <p>Har bir natija ostida &mdash; shu natijani beradigan savollar. Ketma-ketlikni
  buzmang: avval odamni gapirtiring, offerni <b>eng oxirida</b> ayting.</p>
  <div class="grid g4" style="gap:5mm;margin-top:3mm">
    <div>
      <b class="tag">1 &mdash; Tanishuv va holat</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>O'zingiz haqingizda qisqacha gapirib bering.</li>
        <li>Hozir ishlaringiz qanday ketyapti?</li>
        <li>Bir kuningiz qanday o'tadi?</li>
      </ul>
    </div>
    <div>
      <b class="tag">2 &mdash; Og'riq</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>Hozir sizni eng ko'p nima qiynayapti?</li>
        <li>Nima uchun hali natija yo'q deb o'ylaysiz?</li>
        <li>Buni hal qilish uchun nima qilib ko'rgansiz?</li>
        <li>Nega ishlamadi?</li>
      </ul>
    </div>
    <div>
      <b class="tag">3 &mdash; Istak va reja</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>Ideal natija siz uchun qanaqa ko'rinadi?</li>
        <li>Unga qanday yetmoqchisiz?</li>
        <li>Erishsangiz, hayotingizda nima o'zgaradi?</li>
      </ul>
    </div>
    <div>
      <b class="tag">4 &mdash; E'tiroz va yopish</b>
      <ul class="ticks" style="margin-top:2.5mm">
        <li>Mendan ilgari nega sotib olmagansiz?</li>
        <li>Nima sizni to'xtatib turgan edi?</li>
        <li>Mana shu muammolarni yechadigan dasturim bor &mdash; aytib beraymi?</li>
        <li>Joyni band qilamizmi? Bron 3&ndash;5 ming, qaytarsa bo'ladi.</li>
      </ul>
    </div>
  </div>
  <p style="margin-top:3.5mm"><b>Muhim:</b> odam &laquo;o'ylab ko'raman&raquo; desa,
  suhbatni tugatmang. So'rang: <b>&laquo;Ayting-chi, aynan nimasi shubha
  tug'diryapti?&raquo;</b> Aynan shu javob &mdash; sizga kerak bo'lgan asosiy ma'lumot.</p>
</div>
""")


# ================================= 6. 1-BO'LIM · MAHSULOT VA OFFER ===========
sheet(run_left="1-bo'lim · Mahsulot va offer", run_right="Yig'ilgan ma'lumotni <b>ishga qo'yish</b>",
inner=f"""
<div class="grid g2">
  <div>
    <span class="kick">03 &mdash; Uchinchi qadam</span>
    <h2 class="sec">Mahsulot va<br>offerni kuchaytirish</h2>
    <div class="rule g"></div>
    <p class="lead">Bu ikkitasi har xil narsa. Ko'pchilik ularni aralashtirib
    yuboradi &mdash; va shu yerda yutqazadi.</p>
    <dl class="dl-list" style="margin-top:4mm">
      <dt>Mahsulot apgreydi = mijoz uchun qiymat</dt>
      <dd>O'zingizga ikkita savol bering. Agar narx <b>uch barobar</b> bo'lganida,
      mahsulotda nima bo'lishi kerak edi? Va: odam davom etmasligi <b>ahmoqlik</b>
      bo'lishi uchun unda nima bo'lishi kerak?</dd>
      <dt style="margin-top:3mm">Offer apgreydi = shu qiymatni yetkazish</dt>
      <dd>Bu qiymatni sotuvda va kontentda qanday aytasiz. Formulasi oddiy:
      <b>natija + yo'l</b>.</dd>
    </dl>
  </div>
  <div class="card tint">
    <h4>{icon('layers')}Misolda ko'ramiz</h4>
    <table class="tbl">
      <tr><th>Oddiy variant</th><th>Kuchaytirilgan variant</th></tr>
      <tr><td style="color:var(--ink2);font-weight:400">
        <b>Mahsulot:</b> ovqatlanish dasturi<br>
        <b>Offer:</b> bir oylik sog'lom ratsion</td>
        <td><b>Mahsulot:</b> tibbiy kartangiz, tahlillaringiz va
        kasalliklaringizga qarab har oy tuziladigan individual ratsion<br>
        <b>Offer:</b> stresssiz ozing va 20 yil ko'proq yashang</td></tr>
    </table>
    <p style="margin-top:4mm"><b>Yana ikkita misol:</b></p>
    <ul class="ticks">
      <li><b>Munosabatlar psixologiyasi kursi</b> &rarr; birinchi haftada barcha
        o'tmish munosabatlaringiz tarixini yig'amiz va muammoli
        naqshlarni topamiz.</li>
      <li><b>Tadbirkorlar uchun mentorlik</b> &rarr; mening jamoam (yurist,
        moliyachi, produktolog) kompaniyangizni tekshiradi va yozma
        tavsiyalar beradi.</li>
    </ul>
  </div>
</div>

<div class="card">
  <h4>{icon('rocket')}Offerni ochib berish: &laquo;SMM'dan noldan 50 ming toping&raquo;</h4>
  <p>Offer o'z-o'zidan ishonch uyg'otmaydi. Ishonch <b>yo'lni ko'rsatganda</b> paydo bo'ladi:</p>
  <svg viewBox="0 0 980 124" style="width:100%;height:auto;margin-top:3mm">
    <line x1="9" y1="24" x2="744" y2="24" stroke="{LINE}" stroke-width="2"/>
    {"".join(
      f'<g><circle cx="{i*245+9:.0f}" cy="24" r="9" fill="{c}"/>'
      f'<text x="{i*245:.0f}" y="58" style="font:700 14px var(--sans);fill:{INK}">{a}</text>'
      f'<foreignObject x="{i*245:.0f}" y="66" width="236" height="58">'
      f'<div xmlns="http://www.w3.org/1999/xhtml" '
      f'style="font:400 12.5px/1.36 var(--sans);color:{INK2}">{b}</div></foreignObject></g>'
      for i,(a,b,c) in enumerate([
        ("1&ndash;2-hafta","Bazani o'rganasiz — bu bilimga allaqachon 5 ming to'lashadi. Birinchi mijozlarni qidirasiz.",RAMP[1]),
        ("3&ndash;4-hafta","Jamoa kuzatuvida sinov keysini qilasiz. Portfolioingiz paydo bo'ladi.",RAMP[2]),
        ("4+ hafta","Xizmatlarni qo'shimcha sotasiz. 30 dan ortiq usul bilan 2 ta loyiha topasiz.",RAMP[3]),
        ("5+ hafta","Loyihalarni mening jamoam kuzatuvida bajarasiz. Natija — oyiga 50 ming.",S6),
      ]))}
  </svg>
</div>

<div class="grid g2">
  <div>
    <span class="kick">Qisqacha xulosa</span>
    <h3>1-bo'lim &mdash; 10 qadam</h3>
    <div class="grid g2" style="gap:4mm;margin-top:3mm">
      <div class="card" style="padding:4mm">
        <b class="tag d">01 &mdash; Anketa</b>
        <ol class="steps" style="margin-top:2mm">
          <li>Anketa tuzing: yosh, daromad, og'riq, istak, obuna muddati.</li>
          <li>Ishga tushiring: xabar, stories, post. Norma &mdash; 5&ndash;15%.</li>
          <li>Tahlil qiling: segmentlarni ajrating, top-5 og'riq va istakni toping.</li>
        </ol>
      </div>
      <div class="card" style="padding:4mm">
        <b class="tag d">02 &mdash; Custdev</b>
        <ol class="steps" style="counter-reset:st 3;margin-top:2mm">
          <li>Kimni suhbatga chaqirishni belgilang (sotib olmaganlar).</li>
          <li>Respondentlarni toping (anketa + stories chaqiruvi).</li>
          <li>Suhbatni o'tkazing va oldindan to'lovga yoping.</li>
          <li>Natijani yozing va ma'nolar xaritasiga ko'chiring.</li>
        </ol>
      </div>
      <div class="card" style="padding:4mm">
        <b class="tag d">03 &mdash; Apgreyd</b>
        <ol class="steps" style="counter-reset:st 7;margin-top:2mm">
          <li>Mahsulotni kuchaytiring &mdash; qiymat qo'shing.</li>
          <li>Offerni qayta yozing: aniq natija + aniq yo'l.</li>
        </ol>
      </div>
      <div class="card" style="padding:4mm">
        <b class="tag d">04 &mdash; Joriy qilish</b>
        <ol class="steps" style="counter-reset:st 9;margin-top:2mm">
          <li>Yig'ilgan so'z va ma'nolarni kontentga, sotuvga va
            mahsulotga qo'ying.</li>
        </ol>
      </div>
    </div>
  </div>

  <div class="callout" style="display:flex;flex-direction:column;justify-content:center">
    <span class="kick">1-uy vazifasi</span>
    <p style="font:700 13pt/1.35 var(--serif);color:#fff;margin-bottom:3mm">
      Boshlang'ich daraja</p>
    <ul class="ticks ok">
      <li>5 tadan ko'p custdev o'tkazing. Maqsad &mdash; 5 tadan kamida 3 tasi
        oldindan to'lov bilan tugasin.</li>
      <li>Eng dolzarb ma'nolarning qisqa ro'yxatini tuzing.</li>
    </ul>
    <p style="font:700 13pt/1.35 var(--serif);color:#fff;margin:5mm 0 3mm">
      Yuqori daraja</p>
    <ul class="ticks ok">
      <li>Mahsulotingiz qiymatini oshiradigan 3 tadan ko'p yechim yozing.</li>
      <li>Offerni kuchaytiring va mijoz yo'lini bosqichma-bosqich yozib chiqing.</li>
    </ul>
  </div>
</div>
""")


# ================================== 7. 2-BO'LIM · GRAFIKLAR I ===============
D_OBUNA = [("6 oydan kam", 27.7, S1), ("6 oy &ndash; 1 yil", 28.2, S2),
           ("1&ndash;2 yil", 19.3, S3), ("2 yildan ko'p", 24.8, S4)]
D_DAROMAD = [("Daromad yo'q", 11.8, S1), ("50 minggacha", 25.7, S2),
             ("100 minggacha", 24.5, S3), ("300 minggacha", 21.0, S4),
             ("500 minggacha", 7.7, S5), ("500 mingdan yuqori", 9.3, S6)]
D_IG = [("Yo'q, topmaganman", 37.0, S1), ("Ha, oyiga 50 minggacha", 23.4, S2),
        ("Ha, 100 minggacha", 13.4, S3), ("Ha, 300 minggacha", 11.8, S4),
        ("Ha, 500 minggacha", 5.9, S5), ("Ha, 500 mingdan ko'p", 8.5, S6)]

sheet(run_left="2-bo'lim · Anketa tahlili", run_right="Real anketa &mdash; <b>2 250 ta javob</b>",
inner=f"""
<div class="grid g21">
  <div>
    <span class="kick">Jonli misol</span>
    <h2 class="sec">Anketa nima<br>ko'rsatadi</h2>
    <div class="rule g"></div>
    <p class="lead">Quyida real bloggerning real anketasi. Uni o'qish
    orqali siz asosiy narsani o'rganasiz: <b>diagrammadan qanday xulosa
    chiqariladi</b>.</p>
    <p>Chunki diagramma o'zi hech narsa demaydi. Uning yonida har doim
    javob turishi kerak: <b>&laquo;Demak, men nima qilishim kerak?&raquo;</b></p>
  </div>
  <div class="stats g2 grid" style="align-content:start">
    {stat("70%+", "Yarim yildan ko'p obuna", "Ular zapusk mavzusini biladi. Ularni yangilik bilan hayratlantirish kerak", tone="gold")}
    {stat("44%", "Bir yildan ko'p obuna", "Qaror qabul qilish uchun ularga vaqt kerak. Ularni &laquo;pishitib&raquo; borish lozim", tone="ink")}
  </div>
</div>

<div class="grid g3">
  {pie_block("Auditoriya qachondan beri obuna?", D_OBUNA, kicker="1-diagramma")}
  {pie_block("Auditoriyaning oylik daromadi", D_DAROMAD, kicker="2-diagramma")}
  {pie_block("Instagram orqali pul topgan?", D_IG, kicker="3-diagramma")}
</div>

<div class="grid g3">
  <div class="card">
    <h4>{icon('check')}Obuna muddatidan nima kelib chiqadi</h4>
    <p>70% dan ortiq odam yarim yildan ko'p obuna. Demak, ular zapusk nima
    ekanini biladi va kamida bir marta progrevni ko'rgan.</p>
    <p><b>Xulosa:</b> eski gaplar ish bermaydi. Ularga yangi narsa kerak.</p>
    <p>44% odam esa bir yildan ko'p obuna, lekin hali sotib olmagan. Ular
    &laquo;pishgan&raquo;, faqat qarorga bir narsa yetmayapti.
    <b>Ularni oxirigacha olib borish kerak.</b></p>
  </div>
  <div class="card">
    <h4>{icon('money')}Daromaddan nima kelib chiqadi</h4>
    <p><b>37,5%</b> &mdash; &laquo;kun ko'rish&raquo; darajasidagi daromad yoki
    ota-ona/turmush o'rtog'ining yordami. Bu qiziqarli hayot kechirish uchun
    yetarli emas.</p>
    <p><b>71,2%</b> &mdash; 50 mingdan 300 minggacha topadi. Bu qismda pul bor.
    Ular o'z ehtiyojlarini yopa oladi, lekin katta xarid uchun jamg'arish kerak.</p>
    <p><b>Xulosa:</b> asosiy massa uchun narx muhim. Bo'lib to'lash va
    tarif zinapoyasi shart.</p>
  </div>
  <div class="card">
    <h4>{icon('spark')}Tajribadan nima kelib chiqadi</h4>
    <p><b>63%</b> odam Instagram orqali pul topib ko'rgan. Ya'ni ularni
    &laquo;bu yerda pul bor&raquo; deb ishontirish shart emas &mdash;
    ular buni o'z tajribasida ko'rgan.</p>
    <p><b>Xulosa:</b> ularga boshqa narsani isbotlash kerak &mdash;
    <b>xuddi shu vaqt sarfi bilan ancha ko'p topsa bo'ladi</b>.
    Ko'proq ishlash emas, boshqacha ishlash haqida gapiring.</p>
  </div>
</div>

<div class="card tint">
  <h4>{icon('layers')}Uch diagrammani birga qo'ysak, portret chiqadi</h4>
  <p>Alohida raqamlar kam narsa aytadi. Ularni birlashtiring &mdash; va oldingizda
  aniq bir odam paydo bo'ladi. Aynan shu odamga gapirasiz:</p>
  <div class="grid g4" style="gap:5mm;margin-top:3mm">
    <div class="card" style="padding:4mm"><b class="tag">Kim</b>
      <p style="margin-top:2mm">Bir yildan ortiq obuna. Sizni yaxshi biladi,
      progrevlaringizni ko'rgan.</p></div>
    <div class="card" style="padding:4mm"><b class="tag">Puli</b>
      <p style="margin-top:2mm">Oyiga 50&ndash;300 ming. Pul bor, lekin
      katta xarid uchun o'ylab ko'radi.</p></div>
    <div class="card" style="padding:4mm"><b class="tag">Tajribasi</b>
      <p style="margin-top:2mm">Instagram'dan pul topib ko'rgan. Buni
      unga isbotlash shart emas.</p></div>
    <div class="card" style="padding:4mm"><b class="tag">Nima kerak</b>
      <p style="margin-top:2mm">Ko'proq ishlash emas &mdash; boshqacha ishlash.
      Va tayyor, tushunarli tizim.</p></div>
  </div>
  <p style="margin-top:3.5mm"><b>Mana shu to'rt jumla</b> &mdash; sizning
  offeringizning asosi. Ularsiz har qanday matn taxminga aylanadi.</p>
</div>
""")


# ================================== 8. 2-BO'LIM · GRAFIKLAR II ==============
D_BILIM = [("Nol &mdash; mohiyatini bilaman, tafsilotni yo'q", 39.0, S1),
           ("Yangi boshlovchi &mdash; urinib ko'rdim, uncha chiqmadi", 26.6, S2),
           ("O'rta &mdash; tajriba bor, 1 mln gacha zapusk", 23.2, S3),
           ("O'rtadan yuqori &mdash; 1&ndash;10 mln zapusk", 9.4, S4),
           ("Profi &mdash; 10 mln+ zapusk", 1.8, S5)]
D_REJA = [("Ha, rejalashtiryapman", 37.4, S1), ("Allaqachon shug'ullanaman", 30.2, S2),
          ("Xohlayman, lekin qanday kelishni bilmayman", 28.7, S3),
          ("Yo'q, rejam yo'q", 3.7, S4)]
R_MAVZU = [
    ("Progrev va stories'da sotuv", 1224, 54.5),
    ("Obunachi yig'ish va reklama", 1220, 54.3),
    ("Noldan natijagacha strategiya", 1007, 44.8),
    ("O'z-o'zini zapusk qilish", 958, 42.7),
    ("Zapuskning texnik qismi", 899, 40.0),
    ("Xizmatlarni qanday sotish", 797, 35.5),
    ("Nima va qanday suratga olish", 737, 32.8),
    ("Sotuvchi vebinar yig'ish", 737, 32.8),
    ("Endi boshlayapman &mdash; hammasi kerak", 702, 31.3),
    ("Blogni noldan yuritish", 597, 26.6),
    ("Produser bo'lish va mijoz topish", 433, 19.3),
    ("Nisha va mahsulot tanlash", 378, 16.8),
]

sheet(run_left="2-bo'lim · Anketa tahlili", run_right="Odamlar <b>nimani bilishmaydi</b> va <b>nimani xohlashadi</b>",
inner=f"""
<div class="grid g2">
  {pie_block("Zapusk mavzusidagi bilim darajasi", D_BILIM, kicker="4-diagramma",
             note="Yangi boshlovchilar va o'rtachalar birgalikda &mdash; 49,8%. Bu juda katta ulush.")}
  {pie_block("Zapusk kasbi bo'yicha rejalar", D_REJA, kicker="5-diagramma",
             note="66,1% odam o'qishga tayyor: tajribasi kam, lekin hayotini o'zgartirishni xohlaydi.")}
</div>

<div class="grid g2">
  <div class="card tint">
    <h4>{icon('check')}Bilim darajasidan nima kelib chiqadi</h4>
    <p><b>49,8%</b> &mdash; yangi boshlovchilar va o'rtachalar. Diqqatni
    aynan shu guruhga qaratish kerak.</p>
    <p>Ularda muammo bor, lekin ular natija olmaydi. Nima uchun? Sabab
    aniq: <b>&laquo;o'zim bilaman, lekin nega natija yo'q&raquo;</b> degan holat.
    Ularga mavzuni oddiy tilda tushuntirish kerak &mdash; qiyinlashtirmasdan.</p>
  </div>
  <div class="card tint">
    <h4>{icon('note')}Rejalardan nima kelib chiqadi</h4>
    <p><b>39%</b> odam tafsilotlarni umuman bilmaydi. Ularga batafsil
    materiallar kerak: zapusk nima, u qanday ishlaydi.</p>
    <p><b>Yechim:</b> uzun gorizontal rolik yoki klub-kanal
    &mdash; kasbning mohiyatini tushuntiruvchi video.</p>
  </div>
</div>

{bar_block("Auditoriya qaysi mavzular haqida eshitishni xohlaydi", R_MAVZU,
  kicker="6-diagramma · javoblar soni va ulushi", unit="",
  note="Eng kam qiziqish: o'z nishasi va mahsulotini tanlash (16,8%) hamda produser bo'lish (19,3%). "
       "Ko'pchilik o'z nishasini allaqachon tanlagan deb hisoblaydi.")}
""")


R_MAQSAD = [
    ("Muntazam sayohat qilish", 1450, 64.6),
    ("Pul haqida tashvishlanmaslik", 1434, 63.8),
    ("Katta kapital to'plash", 1421, 63.3),
    ("Qulay turmush: uy, mashina, klinika", 1253, 55.8),
    ("Kvartira va mashina sotib olish", 1345, 59.9),
    ("Ota-onaga yordam berish", 1011, 45.0),
    ("Mashhur va tanilgan bo'lish", 945, 42.1),
    ("Xavfsizlik va imkoniyatlar", 852, 37.9),
    ("Qo'shimcha daromad olish", 676, 30.1),
    ("Ishdan bo'shash", 308, 13.7),
]

# ================================= 9. 2-BO'LIM · GRAFIKLAR III ==============
sheet(run_left="2-bo'lim · Anketa tahlili", run_right="Odamlar <b>aslida nimani xohlaydi</b>",
inner=f"""
<div class="grid g3">
  <div class="card"><h4>{icon('target')}TOP-3 so'rov</h4>
    <ol class="steps">
      <li><b>Progrev va stories'da sotuv.</b> Eng qiziqarli mavzu &mdash;
        va shu bilan birga eng ko'p pul olib keladigan mavzu.</li>
      <li><b>Obunachi yig'ish va reklama.</b> Aynan shu &laquo;birinchi tashrif
        kartasi&raquo;. Alohida modul qilsa bo'ladi.</li>
      <li><b>Noldan natijagacha strategiya.</b> 44% odam natijaga qanday
        yetishni bilmaydi.</li>
    </ol></div>
  <div class="card"><h4>{icon('chat')}Odamlarni eng ko'p qiziqtirgan savollar</h4>
    <ul class="ticks">
      <li>Progrev: g'oya, kreativ, ma'no, voronka, konversiya</li>
      <li>Mijoz qidirish va u bilan kelishuv</li>
      <li>Sotuv: qo'ng'iroqda qanaqa savol berish, yuqori narxda qanday sotish</li>
      <li>Jamoa va rollarni taqsimlash</li>
      <li>Tizim: zapuskni to'g'ri jarayonlarga bo'lish</li>
      <li>Jadval: qachon obunachi yig'ib, qachon zapusk qilish</li>
      <li>Motivatsiya: tashlab qo'ymaslik va qo'rqmaslik</li>
    </ul></div>
  <div class="card gold"><h4>{icon('warn')}Nima to'sqinlik qilyapti</h4>
    <ol class="steps">
      <li><b>Mijoz topa olmaslikdan qo'rquv</b></li>
      <li><b>Vaqt yetishmasligi</b></li>
      <li><b>Juda murakkab ko'rinishi</b></li>
      <li><b>Kurslarning qimmatligi</b></li>
    </ol>
    <p style="margin-top:3mm">Diqqat qiling: <b>pul birinchi o'rinda emas</b>.
    Asosiy to'siq &mdash; qo'rquv va tushunmovchilik. Demak, kontentda
    ham aynan shularni yopish kerak.</p></div>
</div>
{bar_block("Auditoriyaga yaqin maqsadlar", R_MAQSAD,
  kicker="7-diagramma · javoblar soni va ulushi", color=S1,
  note="Yakka javoblar: to'yga jamg'arish, qarzni yopish, boshqa mamlakatga ko'chish, "
       "bolaga eng yaxshisini berish, xayriya bilan shug'ullanish.")}

<div class="grid g21">
  <div class="card ink">
    <h4>{icon('spark')}Bu jadvaldan asosiy xulosa</h4>
    <p>Diqqat bilan qarang. Birinchi o'rinda <strong>&laquo;ishdan bo'shash&raquo;
    emas</strong> (bor-yo'g'i 13,7%). Birinchi o'rinda &mdash;
    <strong>sayohat, xotirjamlik va jamg'arma</strong>.</p>
    <p>Bu nimani anglatadi? Odamlar sizdan &laquo;kurs&raquo; sotib olmaydi.
    Ular <strong>boshqacha hayot</strong> sotib oladi.</p>
    <p style="margin-top:3mm">Shuning uchun offeringizda va kontentingizda
    faqat kasb haqida gapirmang. <strong>Odam nimaga erishishini</strong>
    ko'rsating &mdash; uning o'z so'zlari bilan.</p>
  </div>
  <div>
    <span class="kick">Amaliyot</span>
    <h3>Raqamlardan xulosa qanday chiqariladi</h3>
    <p>Har bir diagrammani uch bosqichda o'qing. Bu oddiy, lekin ko'pchilik
    birinchi bosqichda to'xtab qoladi.</p>
    <div class="grid g3" style="gap:4mm;margin-top:4mm">
      <div class="card" style="padding:4mm"><b class="tag">01 &mdash; Nima</b>
        <p style="margin-top:2mm">Raqamni o'qiysiz.<br>
        <i>&laquo;44% odam bir yildan ko'p obuna&raquo;</i></p></div>
      <div class="card" style="padding:4mm"><b class="tag">02 &mdash; Nima uchun</b>
        <p style="margin-top:2mm">Sababini topasiz.<br>
        <i>&laquo;Ular pishgan, lekin bir narsa yetmayapti&raquo;</i></p></div>
      <div class="card" style="padding:4mm"><b class="tag">03 &mdash; Nima qilaman</b>
        <p style="margin-top:2mm">Harakatga aylantirasiz.<br>
        <i>&laquo;Yakuniy e'tirozlarni yopadigan kontent kerak&raquo;</i></p></div>
    </div>
    <p style="margin-top:4mm"><b>Uchinchi bosqichsiz butun ish behuda.</b> Agar
    tahlilingiz &laquo;44% odam bir yildan ko'p obuna&raquo; degan jumlada tugasa &mdash;
    siz hech narsa qilmadingiz. Diagramma faqat <b>rejaga aylanganda</b> qiymatga
    ega bo'ladi.</p>
  </div>
</div>
""")


# ================================= 10. 3-BO'LIM · STRATEGIYA ================
sheet(run_left="3-bo'lim · Strategiya", run_right="Zapusk <b>rejadan</b> boshlanadi",
inner=f"""
<div class="grid g21">
  <div>
    <span class="kick">Uchinchi bo'lim</span>
    <h2 class="sec">Zapusk razbori:<br>boshidan oxirigacha</h2>
    <div class="rule g"></div>
    <p class="lead">Bu &mdash; real zapuskning ochiq razbori. Nima ishladi,
    nima ishlamadi &mdash; hammasi boricha.</p>
    <p>Razborning ikkita vazifasi bor. <b>Birinchisi &mdash; qattiq xulosalar:</b>
    qanaqa vosita ishladi, qanaqasi yo'q. <b>Ikkinchisi &mdash; yumshoq xulosalar:</b>
    ma'nolar va kelajak uchun fikrlar. Bugungi xulosa keyingi uch yilga ta'sir qiladi.</p>
  </div>
  <div class="card ink">
    <h4>{icon('warn')}Kirish sharoiti</h4>
    <p style="font:700 13pt/1.3 var(--serif);color:#fff">Bozor barcha yillar
    ichida eng og'ir holatda edi.</p>
    <p style="margin-top:3mm">Odamga sotib olish uchun <strong>besh barobar
    ko'p dalil</strong> kerak bo'lib qoldi.</p>
    <p style="margin-top:3mm">Demak, bitta yechim bor: <strong>hamma narsani
    majburan kuchaytirish</strong>.</p>
    <p class="quote" style="border-color:{GOLD};color:#fff;margin-top:4mm">
    Savol shunday qo'yildi: sotib olishning 5 barobar qiyinlashganini
    qoplash uchun men nima qilishim kerak?</p>
  </div>
</div>

<div class="grid g2">
  <div class="card">
    <h4>{icon('note')}0-bosqich. Rejalashtirish savollari</h4>
    <p>Har bir yangi zapuskni shu to'rt savoldan boshlang:</p>
    <ol class="steps">
      <li><b>O'tgan safar nima eng yaxshi ishladi?</b> Uni qanday takrorlab,
        yana kuchaytirsa bo'ladi?</li>
      <li><b>Qanaqa yangi element qo'shaman?</b> (voronka)</li>
      <li><b>Mahsulotni qanday kuchaytiraman?</b> (offer)</li>
      <li><b>Qanday qilib ko'proq aktiv yig'aman?</b> (baza, obunachi, anketa)</li>
    </ol>
    <p style="margin-top:3mm">Amalda bu beshta yo'nalishga bo'linadi:</p>
    <div style="margin-top:2mm">
      <span class="tag d">Strategiya</span><span class="tag d">Voronka</span>
      <span class="tag d">Trafik</span><span class="tag d">Mahsulot</span>
      <span class="tag d">Progrev</span>
    </div>
  </div>
  <div class="card gold">
    <h4>{icon('target')}Boshlanishdagi asosiy vazifalar</h4>
    <ul class="ticks sq">
      <li><b>Yangi narsa qilish.</b> Bu zapusk oldingisidan farq qilishi kerak.
        Aks holda odam &laquo;buni ko'rganman&raquo; deydi.</li>
      <li><b>Kontentni erta boshlash.</b> Hozir progrev uchun ancha ko'p
        vaqt kerak. Bir oy yetmaydi.</li>
      <li><b>Voronka samaradorligini oshirish.</b> Ya'ni xarid sikli
        qisqarishi kerak &mdash; odam tezroq qaror qilsin.</li>
    </ul>
    <p style="margin-top:3mm"><b>Voronkaning maqsadi bitta jumlada:</b>
    X sarfla va X ishlab top. Ya'ni faol progrevsiz ham o'zini qoplaydigan
    tizim qurish.</p>
  </div>
</div>

<div>
  <span class="kick">Taymlayn &mdash; zapusk 9 oy davom etdi</span>
  <svg viewBox="0 0 980 168" style="width:100%;height:auto">
    <line x1="20" y1="34" x2="960" y2="34" stroke="{LINE}" stroke-width="2"/>
    {"".join(
      f'<g><rect x="{20+i*188:.0f}" y="26" width="176" height="16" rx="8" fill="{RAMP[i]}"/>'
      f'<text x="{20+i*188:.0f}" y="16" style="font:700 12.5px var(--sans);fill:{GOLD}">{m}</text>'
      f'<text x="{20+i*188:.0f}" y="62" style="font:700 14px var(--sans);fill:{INK}">{t}</text>'
      f'<foreignObject x="{20+i*188:.0f}" y="70" width="176" height="96">'
      f'<div xmlns="http://www.w3.org/1999/xhtml" '
      f'style="font:400 12.5px/1.36 var(--sans);color:{INK2}">{d}</div></foreignObject></g>'
      for i,(m,t,d) in enumerate([
        ("SENTYABR","Strategiya","Custdev'lar. Zapusk g'oyasi shakllanadi. Avval o'zingiz bilan, keyin jamoa bilan, keyin tashqi ishtirokchilar bilan."),
        ("OKTYABR–DEK.","Kontekstli kontent","Syujet chiziqlari boshlanadi. Voronka quriladi. Bitta keng og'riq = bitta postlar seriyasi."),
        ("YANVAR","Yangi lid-magnit","Yangi lid-magnitga reklama. Telegram ichida mini-ilova. Nishalar bo'yicha razborlar."),
        ("FEVRAL–MART","Faol bosqich","Custdev, lid-magnit e'loni, progrev, 3 ta razbor, yopiq prezentatsiya."),
        ("APREL–MAY","Sotuv oynalari","Yopiq prezentatsiya, efir, keyin &laquo;Tomoshabin&raquo; tarifi bo'yicha oxirgi oyna."),
      ]))}
  </svg>
</div>

<div class="card tint">
  <h4>{icon('layers')}Kontekstli kontent formulasi</h4>
  <p><b>Bitta keng og'riq = bitta postlar seriyasi.</b> Bu maksimal ulashish
  va faollik beradi. Ketma-ketlik shunday:</p>
  <svg viewBox="0 0 980 84" style="width:100%;height:auto;margin-top:3mm">
    {"".join(
      f'<g><rect x="{i*200:.0f}" y="6" width="176" height="72" rx="5" fill="#fff" '
      f'stroke="{LINE}"/>'
      f'<rect x="{i*200:.0f}" y="6" width="4" height="72" rx="2" fill="{RAMP[i+1]}"/>'
      f'<foreignObject x="{i*200+14:.0f}" y="14" width="152" height="60">'
      f'<div xmlns="http://www.w3.org/1999/xhtml" '
      f'style="font:700 12.5px/1.32 var(--sans);color:{INK}">{t}</div></foreignObject></g>'
      + (f'<path d="M{i*200+180:.0f} 42 h12" stroke="{GOLD}" stroke-width="2"/>'
         f'<polygon points="{i*200+196:.0f},42 {i*200+188:.0f},38 {i*200+188:.0f},46" fill="{GOLD}"/>'
         if i < 4 else '')
      for i,t in enumerate([
        "Og'riqni ochuvchi post",
        "Og'riqni kuchaytirish",
        "Ekspert podkast yoki post",
        "Men va o'quvchilarim buni qanday hal qilamiz &mdash; keyslar",
        "Ekspert maqola yoki mini lid-magnit",
      ]))}
  </svg>
</div>

<div class="grid g3">
  <div class="card"><h4>{icon('layers')}Syujet chiziqlari</h4>
    <p>Progrev &mdash; bu alohida postlar emas. Bu <b>davom etadigan hikoya</b>.
    Odam ertaga nima bo'lishini bilgisi keladi.</p>
    <p>Bu zapuskda ikkita chiziq yuritildi: Telegram'da &mdash; ukasi va uning
    zapusklari haqidagi hikoya; Instagram'da &mdash; bazadagi chellenj.</p>
    <p><b>Qoida:</b> bitta ekranga bitta chiziq. Ikkitasini birga yuritsangiz,
    ikkalasi ham yo'qoladi.</p></div>
  <div class="card"><h4>{icon('clock')}Nega bunchalik erta boshlanadi</h4>
    <p>Sentyabrda boshlangan ish may oyida pul keltiradi. Sababi oddiy: odamga
    sotib olish uchun <b>besh barobar ko'p dalil</b> kerak.</p>
    <p>Dalillarni bir haftada bermaysiz. Ular oy sayin to'planadi:
    post, podkast, keys, efir, razbor.</p>
    <p><b>Xulosa:</b> e'londan oldin kamida 3&ndash;4 oy muntazam kontent
    bo'lishi kerak.</p></div>
  <div class="card gold"><h4>{icon('check')}O'zingizni tekshiring</h4>
    <ul class="ticks ok">
      <li>Keyingi zapuskim oldingisidan nimasi bilan farq qiladi?</li>
      <li>Qanaqa yangi element qo'shyapman?</li>
      <li>Kontentni qachon boshlayman &mdash; sanasi bormi?</li>
      <li>Voronkam trafikni qoplaydimi?</li>
      <li>Qanaqa syujet chizig'ini yuritaman?</li>
    </ul></div>
</div>
""")


# =============================== 11. 3-BO'LIM · VORONKA VA TRAFIK ===========
D_SOTIB = [("Bir oy va undan kam", 23.0, S1), ("3&ndash;4 oy", 11.0, S2),
           ("Yarim yilcha", 17.0, S3), ("Bir yil", 20.0, S4),
           ("Bir yildan ko'p", 29.0, S5)]
D_ANKETA = [("Kontent", 39.9, S1), ("Baza bo'yicha ishlash", 33.2, S2),
            ("Trafik voronkalari", 26.9, S3)]

sheet(run_left="3-bo'lim · Voronka va trafik", run_right="Ikki bosqichda <b>1 900 ta anketa</b>",
inner=f"""
<div class="grid g2">
  <div class="card">
    <h4>{icon('funnel')}1-bosqich. Eski materiallarga trafik</h4>
    <p>Zapusk eski lid-magnitlar va eski postlarga reklama berishdan boshlandi.
    Kanallar: Telegram Ads va Yandex Direct.</p>
    <p><b>Reklama aynan qanaqa postlarga berildi:</b></p>
    <ul class="ticks">
      <li>6 000 qamrov bilan 200 mln zapuskning razbori</li>
      <li>Yiliga 10 mln dan 100 mln gacha o'sish bo'yicha 5 ta maslahat</li>
      <li>Zapusk o'sishiga qanaqa omillar ta'sir qiladi</li>
      <li>Boshqa ekspertning zapusk razbori</li>
    </ul>
    <p style="margin-top:3mm"><b>Nima uchun aynan postlar?</b> Chunki post
    &mdash; bu allaqachon isbotlangan material. Qaysi post yaxshi ishlashini
    ko'rasiz va shu ma'noni keyin kuchaytirasiz.</p>
  </div>
  <div class="card">
    <h4>{icon('rocket')}2-bosqich. Yangi lid-magnitga trafik</h4>
    <p>Yangi yildan keyin qaysi mavzu yaxshi ishlashi ko'rindi. Shundan keyin
    trafikka yangi kirishlar va yangi ma'nolar qo'shildi.</p>
    <ul class="ticks ok">
      <li><b>Telegram ichida mini-ilova.</b> Bosilgandan keyin bot faollashadi.
        Offer sodda: barcha razbor va efirlar bitta joyda.</li>
      <li><b>Nishalar bo'yicha razborlar.</b> 5 ta asosiy nisha tahlil qilindi
        va o'sha kanallardan xuddi shu tamoyil bilan trafik quyildi.</li>
      <li><b>Yangi lid-magnit.</b> Mavsumlar orasida zapuskning 3 bosqichli
        modeli haqida.</li>
    </ul>
    <p class="quote" style="margin-top:4mm">Lid-magnitning maqsadi &mdash;
    bir yil davomida ishlab turishi.</p>
  </div>
</div>

<div class="grid g3">
  {pie_block("Sotib olganlar qancha vaqt obuna bo'lgan", D_SOTIB, kicker="8-diagramma",
    note="Bundan tashqari sotib olganlarning 15% &mdash; oldingi oqim o'quvchilari.")}
  {pie_block("1 900 ta anketa qayerdan keldi", D_ANKETA, kicker="9-diagramma",
    note="Kontent 759 ta · Baza 630 ta · Trafik voronkalari 511 ta anketa berdi.")}
  <div class="card gold">
    <h4>{icon('chart')}Bu raqamlar nimani ko'rsatadi</h4>
    <p><b>29%</b> sotib olganlar &mdash; bir yildan ko'p obuna bo'lganlar.
    <b>23%</b> esa &mdash; bir oy ichida obuna bo'lganlar.</p>
    <p><b>Xulosa:</b> ikkala uchi ham ishlaydi. Yangi trafik ham sotib oladi,
    eski baza ham. Lekin o'rtadagilar (3&ndash;4 oy, atigi 11%) &mdash;
    eng zaif joy. Ular bilan alohida ishlash kerak.</p>
    <p style="margin-top:3mm"><b>Anketalar bo'yicha:</b> uchala manba ham
    taxminan teng ulush berdi. Demak, bittasiga tayanib qolmang &mdash;
    uchalasini birga yuriting.</p>
  </div>
</div>

<div class="grid g21">
  <div class="card tint">
    <h4>{icon('people')}O'quvchilarga qanday sotildi</h4>
    <div class="grid g2" style="gap:4mm">
      <ul class="ticks">
        <li>Bir qismi o'zi yozdi va so'radi</li>
        <li>Direct va g'amxo'rlik xizmati orqali shaxsiy offerlar</li>
        <li>O'quv kanallarida e'lonlar</li>
        <li>Elektron pochtaga xat</li>
      </ul>
      <ul class="ticks">
        <li>Kontentda &mdash; maxsus shartlarni bilish uchun yozishga chaqiruv</li>
        <li>Sotuv bo'limi eski xaridorlarga yangi oqimni taklif qildi</li>
      </ul>
    </div>
    <p style="margin-top:3mm"><b>Uchta muhim qoida:</b></p>
    <ul class="ticks sq">
      <li>O'quvchilarga sotishni <b>sotuv boshlanishiga yaqin</b> boshlagan
        ma'qul &mdash; juda erta emas.</li>
      <li>Avval <b>nima yangilik borligi</b> tushunarli bo'lsin. Narx offeri
        undan keyin keladi.</li>
      <li>O'tgan safarga nisbatan <b>xarid sikli uzaydi</b>. Buni hisobga oling.</li>
    </ul>
  </div>
  <div style="display:flex;flex-direction:column;gap:5mm">
    <div class="card ink">
      <h4>{icon('check')}&laquo;Tebranish&raquo; davri natijasi</h4>
      <ul class="ticks ok">
        <li>Doim ko'z oldida bo'ldim</li>
        <li>Trafikni qoplaydigan voronka paydo bo'ldi &mdash; bu o'zi
          yangi mavzu bo'ldi</li>
        <li>Telegram va Instagram qamrovi yuqori va o'sib boruvchi</li>
        <li>1 900 ta anketa yig'ildi</li>
      </ul>
    </div>
    <div class="card">
      <h4>{icon('warn')}Ochiq aytamiz &mdash; minuslar ham bo'ldi</h4>
      <ul class="ticks x">
        <li>Voronkaning keyingi qismi o'ylanmagan edi</li>
        <li>Bron offeri xom edi</li>
        <li>Barcha kvalifikatsiyalar yo'q edi</li>
        <li>Sotuv boshida kuchli offer qanday bo'lishi tushunilmagan edi</li>
      </ul>
      <p style="margin-top:3mm">Sabab oddiy: hamma narsa sinov tartibida
      qilindi va vaqt oralig'i juda uzun bo'lib ketdi.</p>
    </div>
  </div>
</div>
""")


# ============================= 12. 3-BO'LIM · BRON, LM, FAOL BOSQICH ========
sheet(run_left="3-bo'lim · Bron va lid-magnit", run_right="Sotuvni <b>sotuv boshlanishidan oldin</b> boshlash",
inner=f"""
<div class="grid g2">
  <div>
    <span class="kick">Bron</span>
    <h3>Bron offeri qanday o'sib bordi</h3>
    <p>Bron &mdash; bu odam sotuv rasmiy boshlanishidan oldin joyni band qilishi.
    Uning offeri uch bosqichda kuchaydi:</p>
    <div style="margin-top:4mm">
      {"".join(
        f'<div class="card" style="padding:4mm;margin-bottom:3mm;'
        f'border-left:4px solid {RAMP[i+2]}">'
        f'<b class="tag">{i+1}-daraja</b>'
        f'<p style="margin:2mm 0 0;font:700 11.5pt/1.3 var(--serif);color:{INK}">{t}</p></div>'
        for i,t in enumerate([
          "&laquo;Eng yaxshi narxni band qiling&raquo;",
          "&laquo;Eng yaxshi narxni band qiling&raquo; + oldindan o'qitish",
          "&laquo;Eng yaxshi narxni band qiling&raquo; + oldindan o'qitish + Zoom + shaxsiy menejer",
        ]))}
    </div>
    <p><b>Nimani ko'rish kerak:</b> narx o'zgarmadi. O'zgargan narsa &mdash;
    odam pul evaziga olayotgan <b>qiymat</b>. Har bosqichda unga ko'proq
    narsa berildi.</p>
  </div>

  <div class="card ink">
    <h4>{icon('funnel')}Yopiq sotuvning yakuniy sxemasi</h4>
    <svg viewBox="0 0 460 250" style="width:100%;height:auto;margin:3mm 0">
      {"".join(
        f'<g><rect x="0" y="{i*46:.0f}" width="460" height="34" rx="5" fill="#1B2A31"/>'
        f'<rect x="0" y="{i*46:.0f}" width="5" height="34" rx="2.5" fill="{GOLD}"/>'
        f'<foreignObject x="16" y="{i*46+7:.0f}" width="430" height="26">'
        f'<div xmlns="http://www.w3.org/1999/xhtml" '
        f'style="font:400 13px/1.45 var(--sans);color:#F3EEE2">{t}</div></foreignObject>'
        + (f'<path d="M230 {i*46+36:.0f} v6" stroke="{GOLD}" stroke-width="1.5"/>'
           f'<polygon points="230,{i*46+45:.0f} 226,{i*46+38:.0f} 234,{i*46+38:.0f}" fill="{GOLD}"/>'
           if i < 4 else '')
        + '</g>'
        for i,t in enumerate([
          "<b>Kiruvchi so'rov</b> — odam o'zi yozdi yoki chaqiruvni ko'rdi",
          "<b>Anketa</b> — u to'ldiradi",
          "<b>Kvalifikatsiya</b> — u bizga mos keladimi, tekshiramiz",
          "<b>Bron offeri</b> + oldindan o'qitish (direct yoki sotuv bo'limi)",
          "<b>Menejer kuzatuvi</b> — sotuv boshlanguncha",
        ]))}
    </svg>
    <p>Yo'lning istalgan joyida <strong>qo'shimcha to'lov uchun kuchli
    offer</strong> berilsa &mdash; bu ideal holat.</p>
    <p style="margin-top:3.5mm"><strong>Nega bu ishlaydi?</strong> Odam pul
    to'lagandan keyin qarorini o'zgartirmaydi. U endi &laquo;o'ylab
    ko'raman&raquo; demaydi &mdash; u allaqachon ichkarida.</p>
    <ul class="ticks ok" style="margin-top:3mm">
      <li>Sotuv boshlanishidan oldin tushum paydo bo'ladi</li>
      <li>Nechta joy ketishini oldindan bilasiz</li>
      <li>Menejer har bir odam bilan alohida ishlaydi</li>
      <li>Sotuv kuni ajiotaj tayyor holda keladi</li>
    </ul>
  </div>
</div>

<div class="grid g21">
  <div class="card tint">
    <h4>{icon('note')}Lid-magnitning tuzilishi</h4>
    <p>Lid-magnit bir yil ishlashi uchun ichida shular bo'lishi kerak:</p>
    <div class="grid g2" style="gap:4mm;margin-top:3mm">
      <ol class="steps">
        <li><b>Offer</b> &mdash; masalan, muntazam sotuv va rekord zapuskning
          3 bosqichli tizimi.</li>
        <li><b>Storitelling</b> &mdash; shaxsiy hikoya.</li>
        <li><b>Foyda va ekspertlik</b> &mdash; lekin to'liq yo'riqnoma emas.
          Offerni 3 bosqich orqali ochib berasiz.</li>
        <li><b>Har bosqichda 5&ndash;10 ta og'riq, istak yoki trigger.</b></li>
        <li><b>Keyslar.</b></li>
      </ol>
      <ol class="steps" style="counter-reset:st 5">
        <li><b>Boshida &mdash; oxirigacha ko'rish sababi</b> va belgi
          qo'yganlarga bonus.</li>
        <li><b>Dasturni yechim sifatida sotish.</b></li>
        <li><b>Dastur offeri:</b> kimga kerak va u qanday o'tadi.</li>
        <li><b>Anketaga chaqiruv.</b></li>
        <li><b>Belgi qo'yish va direct'ga yozishga chaqiruv</b> &mdash;
          bu abadiy voronka beradi.</li>
      </ol>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:5mm">
    <div class="card">
      <h4>{icon('layers')}Faol bosqich (fevral&ndash;mart)</h4>
      <ol class="steps">
        <li>Custdev'lar</li>
        <li>Lid-magnit e'loni</li>
        <li>Progrev (Instagram va Telegram)</li>
        <li>3 ta razbor</li>
        <li>Yopiq prezentatsiya = vebinar</li>
        <li>Qo'shimcha sotuvlar</li>
      </ol>
    </div>
    <div class="card gold">
      <h4>{icon('target')}Bu bosqichning asosiy vazifasi</h4>
      <p><b>Maksimal miqdorda anketa yig'ish.</b> Va aynan shu anketalar ustiga
      kuchli progrev va sotuv jarayonini qurish.</p>
    </div>
  </div>
</div>

<div class="grid g3">
  <div class="card"><h4>{icon('spark')}Custdev nima berdi</h4>
    <p>Eng asosiy natija &mdash; <b>hozirgi paytdagi eng dolzarb mavzu,
    istak va og'riqlar aniqlandi</b>.</p>
    <p>Masalan, kutilganidan ancha ko'proq chiqqan ikkita narsa:
    <b>joriy qilish qiyinligi</b> va <b>qanday o'sishni bilmaslik</b>.</p>
    <p>Shundan keyin mahsulot offeri butunlay qayta yig'ildi:
    <b>1 &rarr; 2 &rarr; 3-bosqich + natija</b> formatida.</p></div>
  <div class="card"><h4>{icon('chat')}Lid-magnit e'loni</h4>
    <p><b>Formula:</b> post + o'sha postning ulashilishi (pullik, o'quvchilardan,
    bepul).</p>
    <p><b>Mexanikasi:</b> odam kod so'zni yozadi &rarr; botga tushadi &rarr;
    voronka ishlaydi &rarr; Telegram'ga o'tkaziladi.</p></div>
  <div class="card"><h4>{icon('people')}Ishlagan yangi gipoteza</h4>
    <p><b>Diagnostlar va ekspertlarni jalb qilish.</b> Ikkita shart bilan:</p>
    <ul class="ticks ok">
      <li>Ular <b>kam sonli</b> bo'lsin</li>
      <li>Lekin <b>samaradorligi yuqori</b> &mdash; mahsulotni chuqur
        biladiganlar</li>
    </ul>
    <p style="margin-top:3mm"><b>Universal bog'lanish:</b> custdev'ga chaqiruv
    &rarr; ekspertga uzatish.</p></div>
</div>
""")


# =============================== 13. 3-BO'LIM · INSTAGRAM ===================
sheet(run_left="3-bo'lim · Instagram'da progrev", run_right="Har bir kontent birligida &mdash; <b>o'z chaqiruvi</b>",
inner=f"""
<div class="grid g21">
  <div>
    <span class="kick">Instagram</span>
    <h2 class="sec">Progrev:<br>nima ishladi</h2>
    <div class="rule g"></div>
    <p class="lead">Bitta qoida hamma narsani hal qildi: <b>zapuskning har
    bosqichida o'z chaqiruvi (CTA) bo'ldi</b>.</p>
    <p>Deyarli hech bir kontent chaqiruvsiz chiqmadi. Sababi oddiy &mdash;
    har bir harakatdan maksimal foyda olish kerak edi.</p>
  </div>
  <div class="card ink">
    <h4>{icon('target')}Odamlarni qayerga chaqirdik</h4>
    <ul class="ticks ok">
      <li>Lid-magnitga</li>
      <li>Razborlarga</li>
      <li>Oldindan yozilish anketasiga</li>
      <li>Telegram'ga o'tishga</li>
      <li>Intervyu va podkastlarga (uzun kontent)</li>
    </ul>
  </div>
</div>

<div class="grid g2">
  <div class="card">
    <h4>{icon('spark')}Qamrovni o'ldirmaslik uchun</h4>
    <p>Havolali chaqiruvlar boshqa chaqiruvlar bilan <b>navbatlashtirildi</b>:</p>
    <ul class="ticks">
      <li>&laquo;Stories'ga + qo'ying&raquo;</li>
      <li>&laquo;Direct'ga so'z yozing&raquo;</li>
      <li>&laquo;Shu stories'ga javob bering&raquo;</li>
    </ul>
    <p style="margin-top:3mm">Bu ikki foyda beradi: qamrov tushmaydi va odam
    <b>direct orqali voronkaga kiradi</b> &mdash; bu esa jonli aloqa.</p>
    <p style="margin-top:3mm"><b>Muhim qoida:</b> asosiy chaqiruvlar uchun
    <b>bitta stories</b> ajratildi. Lid-magnit olish, anketa to'ldirish,
    razborga tushish &mdash; har biriga alohida. Shunda chaqiruv
    yo'qolmaydi va maksimal qamrov oladi.</p>
  </div>
  <div class="card">
    <h4>{icon('clock')}Stories chiziqlari bilan ishlash</h4>
    <ul class="ticks sq">
      <li><b>Kechagi stories bilan kesishtirmaslik.</b> Yo kechagilari
        tugashini kutdik, yo o'chirib, biroz pauza qilib, yangisini qo'ydik.
        Ba'zan bu qamrovni jonlantirdi.</li>
      <li><b>Birinchi stories ustida alohida o'ylash.</b> Hazil, mem,
        provokatsiya, shaxsiy narsa yoki klikbeyt. Keyin pauza &mdash;
        va asosiy chiziq chiqadi.</li>
      <li><b>Rilsdan stories'ga oqim.</b> Masalan, rilsda aytamiz: tor
        nishada obunachini 100 so'mdan arzonga olib keladigan mexanika bor.
        Mexanikaning o'zini esa stories'da beramiz.</li>
    </ul>
  </div>
</div>

<div class="grid g21">
  <div class="card gold">
    <h4>{icon('rocket')}Auditoriyani Telegram'ga o'tkazish</h4>
    <p>Bu muntazam qilindi &mdash; va bu kelajakka qilingan investitsiya edi.</p>
    <p><b>Nima uchun bu ishlaydi:</b></p>
    <ul class="ticks ok">
      <li>Telegram'da e'lonlarni odamlar yaxshiroq ko'radi</li>
      <li>Va yaxshiroq javob qaytaradi</li>
    </ul>
    <p style="margin-top:3mm"><b>Natija:</b> bu zapuskda Telegram'dan
    kelgan maqsadli harakatlar ulushi Instagram'dan kelganidan
    <b>sezilarli darajada yuqori</b> bo'ldi.</p>
  </div>
  <div class="callout">
    <span class="kick">Axborot shovqinini yorib o'tish</span>
    <p style="font:700 14pt/1.3 var(--serif);color:#fff">Oddiy sarlavha
    ishlamaydi. Odamning ko'zi unga tushmaydi ham.</p>
    <p style="margin-top:3mm">Ishlagan narsalar: <strong>oddiy bo'lmagan
    sarlavhalar, hazil, jonli iboralar, memlar, ismi bilan murojaat</strong>.
    Ayniqsa Telegram-botda bu kuchli ta'sir qildi.</p>
    <p style="margin-top:3mm">Odam o'z ismini ko'rganda to'xtaydi. Bu
    eng arzon va eng ishonchli usul.</p>
  </div>
</div>

<div class="card">
  <h4>{icon('layers')}Bitta stories kuni qanday quriladi</h4>
  <p>Tartib muhim. Quyidagi ketma-ketlik qamrovni saqlaydi va chaqiruvni
  yo'qotmaydi:</p>
  <svg viewBox="0 0 980 92" style="width:100%;height:auto;margin-top:3mm">
    {"".join(
      f'<g><rect x="{i*167:.0f}" y="6" width="146" height="78" rx="5" fill="#fff" '
      f'stroke="{LINE}"/>'
      f'<rect x="{i*167:.0f}" y="6" width="4" height="78" rx="2" fill="{c}"/>'
      f'<text x="{i*167+14:.0f}" y="26" style="font:700 12px var(--sans);'
      f'fill:{GOLD}">{i+1:02d}</text>'
      f'<foreignObject x="{i*167+14:.0f}" y="32" width="122" height="50">'
      f'<div xmlns="http://www.w3.org/1999/xhtml" '
      f'style="font:400 12px/1.3 var(--sans);color:{INK2}"><b style="color:{INK}">{t}</b><br>{d}</div>'
      f'</foreignObject></g>'
      for i,(t,d,c) in enumerate([
        ("Ilgak","Hazil, mem yoki shaxsiy narsa",RAMP[1]),
        ("Pauza","Biroz kutasiz",RAMP[2]),
        ("Mavzu","Kunning asosiy chizig'i",RAMP[3]),
        ("Foyda","Aniq maslahat yoki mexanika",RAMP[3]),
        ("CTA","Bitta stories — bitta chaqiruv",GOLD),
        ("Javob","Kelgan javoblarni ko'rsatasiz",RAMP[4]),
      ]))}
  </svg>
  <div class="grid g2" style="gap:6mm;margin-top:4mm">
    <p style="margin:0"><b>Nega oxirida javoblar?</b> Odamlar boshqalarning
    javobini ko'rsa, o'zi ham yozgisi keladi. Bu ajiotajning eng arzon usuli.</p>
    <p style="margin:0"><b>Nega bitta stories — bitta chaqiruv?</b> Ikkita
    chaqiruv qo'ysangiz, odam ikkilanadi va hech qaysisini bajarmaydi.</p>
  </div>
</div>
""")


# ================== 14. 3-BO'LIM · TELEGRAM, RAZBORLAR, DIRECT ==============
sheet(run_left="3-bo'lim · Telegram, razborlar, direct", run_right="4&ndash;5 oy davomida <b>haftada 3&ndash;4 marta</b>",
inner=f"""
<div class="grid g3">
  <div class="card">
    <h4>{icon('chat')}Telegram: ta'sir qilgan asosiy elementlar</h4>
    <ul class="ticks">
      <li><b>Muntazam kontent.</b> Haftada 3&ndash;4 marta, 4&ndash;5 oy davomida
        (sentyabrdan yanvargacha). Stories esa ancha kam chiqdi.</li>
      <li><b>13 kunlik voronka.</b> Lid-magnit berilgandan keyin bot
        odamni 13 kun &laquo;isitadi&raquo;. Ichida 3 marta anketa
        to'ldirishga chaqiruv bor.</li>
      <li><b>Erta bronlar.</b> Direct orqali sotuv: lid-magnitdan, razborlardan,
        kontent efirlardan, nishalar bo'yicha keys razborlaridan va botdagi
        isitishdan keladi.</li>
    </ul>
  </div>
  <div class="card">
    <h4>{icon('book')}Kontent formatlari</h4>
    <ul class="ticks">
      <li><b>29 ta ovozli podkast.</b> Auditoriyaning asosiy og'riqlari bo'yicha.
        Har birida e'tiroz yopiladi va mahsulot ochib beriladi.</li>
      <li><b>4 ta efir:</b> 1 tasi kontent efiri, 3 tasi razborlar bilan.
        Har bir efirga alohida progrev qilindi. Razbor yozuvlari
        YouTube'ga chiqarildi.</li>
      <li><b>Formatni almashtirish.</b> Har 1&ndash;2 postda format o'zgardi.</li>
      <li><b>Telegram stories.</b> E'lon, yetib kelish, progrev va sotuv uchun.</li>
      <li><b>Ajiotaj</b> &mdash; har 1&ndash;2 kunda. Keyslar turli formatlarda,
        ochiq tavsiyalar.</li>
    </ul>
  </div>
  <div class="card ink">
    <h4>{icon('layers')}Kunlik vazifa</h4>
    <p style="font:700 12.5pt/1.35 var(--serif);color:#fff">Har kuni bitta
    savol turdi:</p>
    <p class="quote" style="border-color:{GOLD};color:#F3EEE2;margin:3mm 0">
    Botga, asosiy kanalga, razborlar kanaliga, yopiq prezentatsiya kanaliga va
    oldindan o'qitish kanaliga bugun nima qo'yamiz?</p>
    <p style="margin-top:3mm">Mantiq oddiy:</p>
    <p style="font:700 13pt/1.4 var(--serif);color:{GOLD};margin-top:2mm">
    Ko'proq kontent &rarr; ko'proq ma'no &rarr; hamma joyda ko'proq teginish.</p>
    <p style="margin-top:3mm">Bir nechta sotuv oynasi ochildi: erta bronlar,
    yopiq prezentatsiya, asosiy kanal &mdash; faqat bitta tarif emas,
    barcha tariflar bo'yicha.</p>
  </div>
</div>

<div class="grid g2">
  <div class="card tint">
    <h4>{icon('people')}Razborlar qanday tashkil qilindi</h4>
    <ol class="steps">
      <li><b>Alohida Telegram-kanal</b> ochildi &mdash; ro'yxatdan o'tishlar
        shu yerda yig'ildi.</li>
      <li><b>Birinchi razborga</b> anketa to'ldirganlar ichidan tanlandi.</li>
      <li><b>2 va 3-razborga</b> o'quvchilar ham taklif qilindi, ochiq
        chaqiruv ham berildi.</li>
      <li><b>Razbordan oldin progrev</b> qilindi. Keyin yozuvga 2&ndash;4 kun
        yana progrev &mdash; <b>bu juda muhim</b>.</li>
      <li><b>Razborlar kanalining o'zida</b> ham progrev bordi.</li>
    </ol>
    <p style="margin-top:3mm"><b>Bitta razborning tuzilishi:</b> 1 kishi
    razbor uchun + 1 kishi o'quvchi keysi razbori uchun.</p>
    <p><b>Texnikasi &mdash; &laquo;buterbrod&raquo;:</b> maqtov &rarr; tanqid va
    muammo &rarr; yana maqtov va yechim. Odam himoyaga o'tmaydi, boshqalar esa
    o'zini ko'radi.</p>
    <p><b>Qaysi segmentlar razbor qilindi:</b> ekspertlar va produserlar;
    2, 5, 10 va 30 mln+ zapusklar.</p>
  </div>

  <div class="card">
    <h4>{icon('mail')}Direct: qisqacha sxema</h4>
    <svg viewBox="0 0 470 300" style="width:100%;height:auto;margin:2mm 0 3mm">
      {"".join(
        f'<g><rect x="0" y="{i*52:.0f}" width="470" height="40" rx="5" '
        f'fill="{"#F6F1E4" if i%2==0 else "#fff"}" stroke="{LINE}"/>'
        f'<rect x="0" y="{i*52:.0f}" width="4" height="40" rx="2" fill="{RAMP[min(i,5)]}"/>'
        f'<foreignObject x="14" y="{i*52+6:.0f}" width="446" height="32">'
        f'<div xmlns="http://www.w3.org/1999/xhtml" '
        f'style="font:400 12.5px/1.35 var(--sans);color:{INK2}">{t}</div></foreignObject>'
        + (f'<path d="M235 {i*52+42:.0f} v6" stroke="{GOLD}" stroke-width="1.5"/>'
           f'<polygon points="235,{i*52+51:.0f} 231,{i*52+44:.0f} 239,{i*52+44:.0f}" fill="{GOLD}"/>'
           if i < 4 else '')
        + '</g>'
        for i,t in enumerate([
          "<b style='color:#14110C'>Salomlashuv</b> — yangi obunachi, reklamadan kelgan yoki stories'ga javob bergan eski obunachi",
          "<b style='color:#14110C'>Anketaga olib kirish</b> — «Anketa doirasida razbor va efir o'tkazaman, bazaga qo'shaman, shaxsiy keys yuboraman»",
          "<b style='color:#14110C'>Parallel ish</b> — butun anketani jonli efir va razborlarga chaqiramiz, shaxsiy keyslar yuboramiz",
          "<b style='color:#14110C'>Anketa bo'yicha «qizish» darajasini baholaymiz</b>",
          "<b style='color:#14110C'>Qaror</b> — quyida ikki yo'l",
        ]))}
      <g><rect x="0" y="260" width="228" height="38" rx="5" fill="{S6}"/>
        <foreignObject x="12" y="266" width="208" height="30"><div xmlns="http://www.w3.org/1999/xhtml"
        style="font:700 12.5px/1.25 var(--sans);color:#fff">O'rta yoki qizigan → bronga va sotuv bo'limiga</div></foreignObject></g>
      <g><rect x="242" y="260" width="228" height="38" rx="5" fill="{S1}"/>
        <foreignObject x="254" y="266" width="208" height="30"><div xmlns="http://www.w3.org/1999/xhtml"
        style="font:700 12.5px/1.25 var(--sans);color:#fff">Xom → foydali materiallar yuboramiz</div></foreignObject></g>
    </svg>
    <p><b>Muhim:</b> agar &laquo;qizigan&raquo; odam rad qilsa &mdash; u bilan
    <b>&laquo;xom&raquo;dek</b> ishlashda davom etamiz. Uni yo'qotmaymiz.</p>
  </div>
</div>

<div class="grid g21">
  <div class="card tint">
    <h4>{icon('chart')}Telegram bo'yicha raqamlar</h4>
    <div class="stats g4 grid" style="margin-top:3mm">
      {stat("3&ndash;4", "Post haftada", "Sentyabrdan yanvargacha uzluksiz")}
      {stat("13", "Kunlik voronka", "Lid-magnitdan keyingi bot ketma-ketligi")}
      {stat("29", "Ovozli podkast", "Har biri bitta og'riq va bitta e'tirozga")}
      {stat("4", "Efir", "1 ta kontent + 3 ta razbor efiri")}
    </div>
    <p style="margin-top:4mm">Diqqat qiling: bu yerda hech qanday murakkab
    narsa yo'q. Faqat <b>muntazamlik</b>. Haftada 3&ndash;4 post &mdash;
    bu 5 oyda 70 dan ortiq teginish demak.</p>
  </div>
  <div class="card">
    <h4>{icon('book')}Qo'shimcha materiallarda nima bo'ladi</h4>
    <p>Bu qo'llanma asosiy mantiqni beradi. Batafsil razborlar alohida
    fayllarda yig'iladi:</p>
    <div class="grid g2" style="gap:5mm;margin-top:2.5mm">
      <ul class="ticks">
        <li>Telegram progrev razbori: asosiy kanal, yopiq prezentatsiya
          kanali, razborlar kanali, oldindan o'qitish kanali, botga
          yuborilgan xabarlar, Telegram stories</li>
        <li>Instagram progrev razbori: asosiy stories va baza bilan ishlash</li>
        <li>Telegram progrev fishkalari</li>
      </ul>
      <ul class="ticks">
        <li>Telegram botdagi voronka</li>
        <li>Pochta xatlari razbori bilan kanal</li>
        <li>Stories progrevining kunlar bo'yicha razbori (skrinshotlar bilan)</li>
        <li>Direct'da ishlash fishkalari</li>
        <li>Trafik bilan ishlash bosqichlari</li>
        <li>Efirga yetib kelish vositalari</li>
      </ul>
    </div>
  </div>
</div>
""")


# ====================== 15. 3-BO'LIM · PREZENTATSIYA VA XULOSA ==============
sheet(run_left="3-bo'lim · Yopiq prezentatsiya", run_right="Sotuv &mdash; <b>1,5 soatdan keyin</b>",
inner=f"""
<div class="grid g21">
  <div>
    <span class="kick">Yakuniy bosqich</span>
    <h2 class="sec">Yopiq prezentatsiya<br>va sotuv oynalari</h2>
    <div class="rule g"></div>
    <p class="lead">Prezentatsiyaning mantiqi bitta formulaga sig'adi:</p>
    <p style="font:700 15pt/1.35 var(--serif);color:{INK};margin:3mm 0">
      Lid-magnit + progrev + ma'nolar + mahsulot offeri
      <span style="color:{GOLD}">= prezentatsiya</span></p>
    <p>Ya'ni prezentatsiya yangi narsa emas. U &mdash; siz bir necha oy
    davomida aytgan hamma narsaning <b>yig'indisi</b>. Sotuv 1,5 soatdan keyin
    boshlanadi. Mahsulot 3 bosqich orqali ko'rsatiladi.</p>
  </div>
  <div class="grid g2" style="gap:5mm;align-content:start">
    <div class="card gold" style="grid-column:1/-1">
      <h4>{icon('warn')}Prezentatsiyada yopilgan og'riqlar</h4>
      <div class="grid g2" style="gap:3mm">
        <ul class="ticks x">
          <li>Kuchim yo'q, tugab qolish arafasidaman</li>
          <li>Shisha shift &mdash; o'sa olmayapman</li>
          <li>10 barobar ko'p ishlayman, natija esa kamroq</li>
          <li>Yil bo'yicha qanday o'sishni bilmayman</li>
        </ul>
        <ul class="ticks x">
          <li>Aniq reja va grafik yo'q</li>
          <li>Resurs yetmaydi &mdash; odam ham, vaqt ham</li>
          <li>Hammasini sinab ko'rdim &mdash; hech nima ishlamadi</li>
        </ul>
      </div>
    </div>
    <div class="card" style="grid-column:1/-1">
      <h4>{icon('chat')}Va yopilgan e'tirozlar</h4>
      <div class="grid g2" style="gap:3mm">
        <ul class="ticks">
          <li>Charchashni xohlamayman, shundoq ham ish ko'p</li>
          <li>Qo'l yetmaydi, joriy qilish qiyin</li>
        </ul>
        <ul class="ticks">
          <li>Yaxshisi trafikka pul tikaman</li>
          <li>Qoplanmasa-chi? Boshqa kurslarni ham ko'rganman</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="grid g4">
  <div class="card"><h4>{icon('check')}Ishonch va ekspertlik</h4>
    <ul class="ticks">
      <li>Ekspertlik, ahamiyat va yutuqlar keng va qat'iy ko'rsatildi</li>
      <li>Alohida slaydda savollar orqali o'ziga xoslik ochib berildi</li>
      <li>Atrof-muhit va ijtimoiy kapital yorqin ko'rsatildi</li>
      <li>Boshqa mavzular bo'yicha taklif qilingan spikerlar qiymatni oshirdi</li>
    </ul></div>
  <div class="card"><h4>{icon('spark')}Ajiotaj va tanqislik</h4>
    <ul class="ticks">
      <li>Tez qaror qabul qilganlarga kuchli bonuslar</li>
      <li>Joylar nega cheklanganligi asoslab berildi</li>
      <li>Narx tushmaydi, bronlar tanlab olinadi</li>
      <li>Allaqachon qo'shilganlar ko'rsatildi va ular haqida gapirildi</li>
    </ul></div>
  <div class="card"><h4>{icon('layers')}Mahsulotni ko'rsatish</h4>
    <ul class="ticks">
      <li>Mahsulot bosqich sifatida: 1 &rarr; 2 &rarr; 3</li>
      <li>Modullar natija orqali taqdim etildi</li>
      <li>Qisqa muddatli va uzoq muddatli natija birga sotildi</li>
      <li>Oflayn uchrashuvlar va yig'ilishlar ko'rsatildi</li>
    </ul></div>
  <div class="card"><h4>{icon('people')}Keyslar va jonlilik</h4>
    <ul class="ticks">
      <li>Keyslar quruq &laquo;A nuqta &rarr; B nuqta&raquo; emas &mdash;
        og'riq ochib berilgan yorqin hikoyalar</li>
      <li>Har xil keyslar: katta, kichik, produserlar, ekspertlar</li>
      <li>Hazil &mdash; o'zini ochish, shovqinni yorish va ishonch belgisi</li>
      <li>Bozorning hozirgi holati kuchli ochib berildi</li>
    </ul></div>
</div>

<div class="grid g3">
  <div class="card tint">
    <h4>{icon('clock')}4 kundan keyin &mdash; bir soatlik efir</h4>
    <ul class="ticks">
      <li>15 ta slayd: tariflar + e'tirozlar va asosiy savollarga javob</li>
      <li>&laquo;Kichiklar&raquo; misolida mahsulot qanday o'tishi
        barmoq bilan ko'rsatildi</li>
      <li>Savol-javob</li>
    </ul>
    <p style="margin-top:3mm">Efirga hamma taklif qilindi. Ikkilanayotganlarni
    sotuv bo'limi alohida chaqirdi. Keyin yozuvga yo'naltirildi.</p>
  </div>
  <div class="card tint">
    <h4>{icon('money')}Oxirgi oyna: &laquo;Tomoshabin&raquo; tarifi</h4>
    <p><b>Muddat:</b> 7&ndash;10 kun. <b>Maqsad:</b> maksimal lid yig'ib,
    sotuv bo'limiga uzatish.</p>
    <ul class="ticks">
      <li>Ma'nolar aynan shu tarif ostida kuchaytirildi</li>
      <li>Stories'da keng kirishlar: &laquo;Endi faqat Tomoshabin tarifini
        olish mumkin&raquo;, &laquo;Hammasini o'tkazib yuborganlar + qo'ying&raquo;</li>
      <li>Telegram'da keng kirishlar + g'amxo'rlik xizmatiga yozishga
        chaqiruvchi kontent postlari</li>
    </ul>
  </div>
  <div class="card ink">
    <h4>{icon('check')}Yakuniy xulosa</h4>
    <p>Bitta gapda: <strong>bu zapuskda hech qanday sehr bo'lmadi</strong>.</p>
    <p style="margin-top:3mm">Ishlagan narsa &mdash; <strong>ko'p sonli
    teginish</strong>. Har bir kanalda, har kuni, har bir kontent birligida
    o'z chaqiruvi bilan.</p>
    <p style="margin-top:3mm">Va eng muhimi: <strong>hammasi custdev'dan
    boshlandi</strong>. Odamlarning aniq so'zlari bo'lmaganda, bu teginishlarning
    hech biri ishlamas edi.</p>
  </div>
</div>

<div class="callout">
  <div class="grid g21" style="gap:8mm">
    <div>
      <span class="kick">2-uy vazifasi</span>
      <p style="font:700 15pt/1.3 var(--serif);color:#fff;margin-bottom:3mm">
        Bu qo'llanmani o'qib bo'lgach, ikkita ro'yxat yozing</p>
      <ul class="ticks ok">
        <li><b>O'zingizga oladigan yumshoq xulosalar</b> &mdash; kuzatuvlar
          va mantiq. Nimani boshqacha tushundingiz?</li>
        <li><b>Amalga oshiradigan 3&ndash;5 ta eng asosiy yechim</b> &mdash;
          aniq, sanasi bilan.</li>
      </ul>
    </div>
    <div style="border-left:1px solid rgba(201,162,39,.35);padding-left:8mm;
      display:flex;flex-direction:column;justify-content:center">
      <p style="font:700 11pt/1 var(--sans);letter-spacing:.16em;color:{GOLD};
        text-transform:uppercase;margin-bottom:3mm">Eslab qoling</p>
      <p style="font:italic 400 15pt/1.4 var(--serif);color:#fff;margin:0">
        Sayt ham, zapusk ham shablon emas &mdash; ma'no.
        Ma'noni esa siz o'ylab topmaysiz.
        Uni odamlardan eshitasiz.</p>
    </div>
  </div>
</div>
""")


# ------------------------------------------------------------- yig'ish ------
HTML = f"""<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Zapusk tizimi — to'liq qo'llanma (A3)</title>
<style>{CSS}</style>
</head>
<body>
<div class="noprint">
  <h4>Bosib chiqarish uchun</h4>
  <p><kbd>Ctrl</kbd> + <kbd>P</kbd> bosing va shu sozlamalarni tanlang:
  <b>Qog'oz o'lchami — A3</b>, <b>Yo'nalish — Portret (bo'yiga)</b>,
  <b>Chekkalar (Margins) — Yo'q / None</b>,
  <b>Fon grafikasi (Background graphics) — YOQILGAN</b>.
  Jami {len(SHEETS)} varaq.</p>
</div>
{"".join(SHEETS)}
</body>
</html>
"""

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(HTML)
print(f"OK -> {os.path.normpath(OUT)}  ({len(SHEETS)} varaq, {len(HTML)//1024} KB)")
