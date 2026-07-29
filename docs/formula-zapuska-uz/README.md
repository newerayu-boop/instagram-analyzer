# Formula Zapuska — to'liq qo'llanma (o'zbek tilida, A3)

4 ta manba PDF bitta hujjatga yig'ilgan va o'zbek tiliga (B1 daraja) o'girilgan.

| Fayl | Nima |
|---|---|
| `formula-zapuska-uz-a3.pdf` | **Bosmaga tayyor fayl.** A3 (297 × 420 mm), 10 bet |
| `formula-zapuska-uz-a3.html` | Manba. Matnni tahrirlash uchun |

## Ichida nima bor

| Bet | Bo'lim | Manba |
|---|---|---|
| 1 | Muqova va mundarija | — |
| 2–3 | **Zapusklar lug'ati** — 19 ta asosiy so'z | «Словарь запусков» |
| 4 | **CustDev savollari** — 16 ta savol + maslahatlar | «Вопросы для CustDev-a» |
| 5–6 | **Produkt kontsepti namunasi** — 8 punktli andoza | «Пример концепта продукта» |
| 7–9 | **GPT-sotuvlar: vebinardan voronkagacha** — prompt-shablonlar | «GPT-продажи» |
| 10 | Amaliyot, natija va butun qo'llanma bitta sahifada | — |

Bo'limlar tartibi o'zgartirilgan: avval lug'at beriladi, chunki qolgan uchta
bo'limda o'sha so'zlar ishlatiladi.

## Qanday chop etish kerak

1. `formula-zapuska-uz-a3.pdf` faylini oching.
2. Printer sozlamalarida: **qog'oz — A3**, **orientatsiya — portret (vertikal)**.
3. Masshtab: **100%** yoki «Actual size». «Fit to page» ni **tanlamang** —
   aks holda o'lcham buziladi.
4. Hujjatning o'z chekkasi 17 mm — shuning uchun qo'shimcha «margin» kerak emas.

Fayl allaqachon aniq A3 o'lchamda tayyorlangan, hech narsa qirqilmaydi.

## HTML dan PDF ni qayta yig'ish

Matnni `formula-zapuska-uz-a3.html` da tahrirlagandan keyin:

```bash
chromium --headless --no-pdf-header-footer \
  --print-to-pdf=formula-zapuska-uz-a3.pdf \
  file://$PWD/formula-zapuska-uz-a3.html
```

Har bir bet HTML da alohida `<section class="page">` bo'lib turadi va balandligi
qat'iy 420 mm. Matn qo'shsangiz, bet to'lib ketmayotganini tekshiring.
