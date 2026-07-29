# E'tibor × Offer — Timochka + Hormozi (o'zbek tilida, A3)

Ikkita metodika bitta hujjatga yig'ilgan va o'zbek tiliga (B1 daraja) o'girilgan.

| Fayl | Nima |
|---|---|
| `timochka-hormozi-uz-a3.pdf` | **Bosmaga tayyor fayl.** A3 (297 × 420 mm), 12 bet |
| `timochka-hormozi-uz-a3.html` | Manba. Matn va grafiklarni tahrirlash uchun |

## Asosiy g'oya

Ikkala metodika bitta formulaning ikki yarmi:

```
E'TIBOR  ×  OFFER  =  PUL
Timochka    Hormozi
```

Bu **qo'shish emas, ko'paytirish**. Bittasi nolga teng bo'lsa — natija ham nol:

- E'tibor bor, offer yo'q → million ko'rish, nol sotuv
- Offer bor, e'tibor yo'q → zo'r taklif, hech kim ko'rmaydi

## Tuzilishi — har qism alohida betlarda

| Bet | Qism | Nima haqida |
|---|---|---|
| 1 | Muqova | Asosiy formula, mundarija, ikkala muallif haqida |
| 2 | **Bosh sxema** | Ikkala metodika qanday ulanadi + 2 ta tipik xato |
| 3–6 | **1-QISM · Timochka** | Kontent turlari (60/30/10), 6 usul g'oya topish, ssenariy strukturasi, 5 omil, ishlab chiqarish, voronka, raqamlar |
| 7–10 | **2-QISM · Hormozi** | Bozor va narx, qiymat tenglamasi, «katta shlem» offerining 5 qadami, 5 ta kuchaytirgich |
| 11–12 | **3-QISM · Miks** | Offer rilsning qayerida yashaydi, moslik jadvali, umumiy chek-list, 30 kunlik reja |

Har bir qism **alohida ajratkich blok** bilan boshlanadi (katta raqam + muallif nomi),
shuning uchun qayerda ekaningiz doim ko'rinib turadi.

## Ranglar — ikki mualliflik sistemasi

Har bir muallifning o'z rangi bor, shuning uchun 3-qismdagi «miks» ko'zga tashlanadi:

| Rol | Qiymat |
|---|---|
| **TIMOCHKA** — e'tibor | clay `#D97757` · matn `#A8462A` |
| ordinal shkala | `#E0937A → #D97757 → #C05C3C → #96442B → #632D1C` |
| **HORMOZI** — offer | indigo `#4A5FC1` · matn `#3A4796` |
| ordinal shkala | `#9AA3E0 → #7A85D6 → #4A5FC1 → #35459A → #232D6B` |
| Qog'oz / matn | ivory `#FAF9F5` / slate `#191919` |

Hammasi `dataviz` validatori bilan tekshirilgan — barcha tekshiruvlar PASS:

- Clay ↔ indigo juftligi: CVD ΔE **22.6** (maqsad ≥ 8) — rang ko'rishida muammosi
  bo'lganlar uchun ham ishonchli ajraladi.
- Ikkala ordinal shkala yorug'lik bo'yicha **monoton** — shuning uchun bosqichlar
  tartibi **oq-qora printerda ham** to'g'ri o'qiladi.
- Rang hech qayerda yolg'iz ma'no tashimaydi: har bir blok yozuv bilan belgilangan,
  moslik jadvalida legenda bor.

## Manbalar va raqamlar

Hujjatdagi barcha raqamlar manbalardan olingan, o'ylab topilmagan:

- **Timochka:** noldan 7 kunda 2 526 obunachi · oyiga 40 000 · jami 1 mln+ ·
  konversiya ~1% · 60/30/10 nisbati · publikatsiya 17:00 · bir kunda 5–7 rils
- **Hormozi:** oyiga $100 000 → 18 oyda yiliga $28 mln · raqobatchilardan 32 marta
  qimmat · kafolat konversiyani 2–4 marta oshiradi · dedlayn bo'lganda sotuvlarning
  50–60% oxirgi 4 soatda · nom sotuvda 2–3 barobar farq beradi

Sxematik ko'rsatilgan grafikalar (voronka shakli, «bexabar optimizm» egri chizig'i)
`sxematik` deb belgilangan — ular qonuniyatni ko'rsatadi, aniq o'lchangan raqamni emas.

## Qanday chop etish kerak

1. Printer sozlamalarida: **qog'oz — A3**, **orientatsiya — portret**.
2. Masshtab **100%** yoki «Actual size». «Fit to page» ni tanlamang.
3. Ranglarni chop etishni yoqing (Chrome'da «Background graphics»).
4. Hujjatning o'z chekkasi 16 mm — qo'shimcha margin kerak emas.

12-betni alohida chop etib devorga osib qo'yish mumkin.

## HTML dan PDF ni qayta yig'ish

```bash
chromium --headless --no-pdf-header-footer \
  --print-to-pdf=timochka-hormozi-uz-a3.pdf \
  file://$PWD/timochka-hormozi-uz-a3.html
```

Har bir bet alohida `<section class="page">` va balandligi qat'iy 420 mm
(`overflow:hidden`). **Matn qo'shsangiz, bet to'lib ketmayotganini tekshiring** —
ortiqcha matn ko'rinmay qoladi:

```bash
pdftoppm -png -r 60 timochka-hormozi-uz-a3.pdf bet
```

Sahifa mavzusi `class="page t"` (Timochka) yoki `class="page h"` (Hormozi) orqali
almashadi — ichkaridagi `--accent`, `--gold`, `--pale` o'zgaruvchilari avtomatik
mos rangga o'tadi. Barcha grafikalar — inline SVG, tashqi rasm yoki shrift yo'q.
