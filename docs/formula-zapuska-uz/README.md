# Formula Zapuska — infografik qo'llanma (o'zbek tilida, A3)

4 ta manba PDF bitta hujjatga yig'ilgan, o'zbek tiliga (B1 daraja) o'girilgan va
sxemalar, grafiklar, ikonkalar bilan to'ldirilgan.

| Fayl | Nima |
|---|---|
| `formula-zapuska-uz-a3.pdf` | **Bosmaga tayyor fayl.** A3 (297 × 420 mm), 12 bet |
| `formula-zapuska-uz-a3.html` | Manba. Matn va grafiklarni tahrirlash uchun |

## Ichida nima bor

| Bet | Bo'lim | Grafika | Manba |
|---|---|---|---|
| 1 | Muqova, mundarija | 5 bosqichli yo'l sxemasi | — |
| 2 | **Bosh sxema — zapusk qanday ishlaydi** | sotuv voronkasi, doxodimost, narx zinapoyasi, sotuv oynasi | umumlashtirilgan |
| 3–4 | **Zapusklar lug'ati** — 19 ta so'z | har so'zga ikonka, progrev shkalasi, PLF sxemasi | «Словарь запусков» |
| 5 | **CustDev savollari** — 16 ta savol | «A nuqta → to'siqlar → B nuqta» | «Вопросы для CustDev-a» |
| 6–7 | **Produkt kontsepti** — 8 punktli andoza | 8 punkt lentasi, 4 haftalik zinapoya, tarif solishtiruvi | «Пример концепта продукта» |
| 8–11 | **GPT-sotuvlar** — prompt-shablonlar | 4 qadam sxemasi, segmentatsiya, e'tirozlar xaritasi, avtovoronka taymlayni | «GPT-продажи» |
| 12 | Yakun — butun qo'llanma bitta betda | yo'l xaritasi + 6 ta qoida | — |

Bo'limlar tartibi o'zgartirilgan: avval lug'at beriladi, chunki qolgan uchta
bo'limda o'sha so'zlar ishlatiladi.

## Ranglar — Claude uslubi

Qog'oz — ivory (`#FAF9F5`), asosiy rang — Claude'ning terrakota "clay" rangi
(`#D97757`). Palitra `dataviz` validatori bilan tekshirilgan (barcha tekshiruvlar PASS):

| Rol | Qiymat |
|---|---|
| Qog'oz (ivory / bone) | `#FAF9F5` |
| Matn (slate dark / medium) | `#191919` · `#40403E` |
| Bezak akkenti — Claude clay | `#D97757` |
| Matn akkenti — chuqur clay | `#A8462A` (kontrast 5.6:1) |
| Och tin / ivory medium | `#F6E7DE` · `#F2EFE7` |

- **Ordinal shkala** (bosqichlar, voronka, zinapoyalar):
  `#E0937A → #D97757 → #C05C3C → #96442B → #632D1C`.
  Yorug'lik bo'yicha monoton — shuning uchun **oq-qora printerda ham** bosqichlar
  tartibi to'g'ri o'qiladi.
- **Kategorial** (faqat e'tirozlar xaritasida, 3 ta): `#CC6644 · #00897B · #6C5CE0`.
  CVD-tekshiruvi ogohlantirish (warn) polosasida, shuning uchun har bir blok
  **yozuv bilan belgilangan** va legenda qo'shilgan — rang hech qachon yolg'iz
  ma'no tashimaydi.
- Ikki xil clay ishlatilgani bejiz emas: yorqin `#D97757` matn uchun kontrastdan
  o'tmaydi (2.99:1), shuning uchun chiziq va to'ldirishlarda turadi; matnda esa
  chuqurroq `#A8462A` ishlatiladi.
- Qora fon ataylab ishlatilmagan — A3 da kartrijni ko'p yeydi va qog'ozdan
  yomon o'qiladi.

## Qanday chop etish kerak

1. `formula-zapuska-uz-a3.pdf` faylini oching.
2. Printer sozlamalarida: **qog'oz — A3**, **orientatsiya — portret (vertikal)**.
3. Masshtab: **100%** yoki «Actual size». «Fit to page» ni **tanlamang** —
   aks holda o'lcham buziladi.
4. Ranglarni chop etishni yoqing (Chrome'da «Background graphics»), aks holda
   sxemalardagi to'ldirishlar chiqmaydi.
5. Hujjatning o'z chekkasi 16 mm — qo'shimcha «margin» kerak emas.

12-betni alohida chop etib devorga osib qo'yish mumkin — u yerda butun qo'llanma
qisqacha jamlangan.

## HTML dan PDF ni qayta yig'ish

```bash
chromium --headless --no-pdf-header-footer \
  --print-to-pdf=formula-zapuska-uz-a3.pdf \
  file://$PWD/formula-zapuska-uz-a3.html
```

Har bir bet HTML da alohida `<section class="page">` bo'lib turadi va balandligi
qat'iy 420 mm (`overflow:hidden`). **Matn qo'shsangiz, bet to'lib ketmayotganini
albatta tekshiring** — ortiqcha matn ko'rinmay qoladi. Tekshirish uchun:

```bash
pdftoppm -png -r 60 formula-zapuska-uz-a3.pdf bet   # har betni rasmga aylantirib ko'rish
```

Barcha grafikalar — HTML ichidagi inline SVG. Tashqi rasm yoki shrift yo'q,
shuning uchun fayl internetsiz ham to'g'ri ochiladi. Ikonkalar hujjat boshidagi
`<defs>` sprayti ichida, `<use href="#ic-...">` orqali chaqiriladi.
