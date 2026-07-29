# Real Savdo Bo'limi — amaliy qo'llanma (A3)

To'rtta manba hujjati bitta bosma qo'llanmaga yig'ilgan. Til — **o'zbekcha (lotin), B1 daraja**:
qisqa gaplar, tanish biznes atamalari, har bir atama lug'atda tushuntirilgan.

## Fayllar

| Fayl | Nima uchun |
|---|---|
| `real-savdo-bolimi-A3.pdf` | **Bosmaxonaga beriladigan fayl.** 16 bet, A3 vertikal, tayyor. |
| `real-savdo-bolimi-A3.html` | Manba. Matn yoki dizaynni o'zgartirish uchun shuni tahrirlang. |
| `build-pdf.py` | HTML → A3 PDF. Tahrirdan keyin qayta yig'ish uchun. |

## Bosmaxonaga nima deyish kerak

> «**A3, vertikal (portrait), rangli, 100% masshtab (Fit to page — YO'Q), ikki tomonlama,
> qisqa chekka bo'yicha buriladi.**»

- Format: **A3 (297 × 420 mm)**, vertikal.
- Chekkalar faylga kiritilgan (13 mm yon, 15 mm past) — **bleed (chiqindi) kerak emas**.
- Qog'oz: matt 120–160 g/m². Muqova beti uchun 200–250 g/m² yaxshi chiqadi.
- 1-bet (muqova) to'q rangli — rangli bosishni tanlang, aks holda qora quyuq chiqmaydi.

## Tarkibi

| Bet | Bo'lim | Manba |
|---|---|---|
| 1–2 | Muqova, mundarija, yo'riqnoma | — |
| 3–10 | **Savdo texnologiyasi** — 13 ta mavzu: piramida, skript g'ildiragi, 8 bosqich, faktlar yig'ish, prezentatsiya, oldindan yopish, yopish, e'tirozlar, apseyl, trening, o'yinlar, tasdiqlash, teginish nuqtalari | `realnyyotdelprodazh_25` (Modul 3) |
| 11 | **Ommaviy suhbat anketasi** — 5 savol, ball qo'yish tizimi | `realnyyotdelprodazh_12` |
| 12 | **Telefoniya** — Sipuni va Zadarma IP solishtiruvi | `realnyyotdelprodazh_9` |
| 13–14 | **Salohiyatni baholash (PiF)** — 9 ko'rsatkich, diagramma, tavsiyalar | `realnyyotdelprodazh_23` |
| 15–16 | **Lug'at** — barcha atamalar | Modul 3 glossariysi |

12 ta chizma va grafik bor — hammasi SVG, ya'ni A3 da ham aniq chiqadi, "pikselga" bo'linmaydi.

## Qayta yig'ish

```bash
pip install playwright
python3 build-pdf.py
```

Chromium topilmasa:

```bash
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome python3 build-pdf.py
```

## Tahrirlashda diqqat

Har bir bet — HTML dagi bitta `<section class="page">`. Bet balandligi cheklangan:
**392 mm (≈1482 px)**. Matn qo'shsangiz, bet oshib ketishi va bo'sh bet paydo bo'lishi mumkin.
Tekshirish uchun har bir `.page` ning balandligini o'lchang va 1482 px dan oshmasligiga ishonch hosil qiling
(`build-pdf.py` dan keyin PDF bet soni 16 ta bo'lib qolishi kerak).
