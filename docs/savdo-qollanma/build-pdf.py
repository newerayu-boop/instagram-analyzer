#!/usr/bin/env python3
"""
Qo'llanmani A3 PDF ga aylantiradi (bosmaxona uchun).

Ishlatish:
    pip install playwright
    python3 build-pdf.py

Chromium topilmasa, CHROME_PATH env o'zgaruvchisini bering:
    CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome python3 build-pdf.py
"""
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent.resolve()
SRC = HERE / "real-savdo-bolimi-A3.html"
OUT = HERE / "real-savdo-bolimi-A3.pdf"

CANDIDATES = [
    os.environ.get("CHROME_PATH"),
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
]


def find_chrome():
    for c in CANDIDATES:
        if c and pathlib.Path(c).exists():
            return c
    return None  # playwright's own bundled browser


def main():
    if not SRC.exists():
        sys.exit(f"Manba fayl topilmadi: {SRC}")

    chrome = find_chrome()
    with sync_playwright() as p:
        launch = {"executable_path": chrome} if chrome else {}
        browser = p.chromium.launch(**launch)
        page = browser.new_page()
        page.goto(SRC.as_uri(), wait_until="networkidle")
        page.emulate_media(media="print")
        page.pdf(
            path=str(OUT),
            format="A3",
            landscape=False,
            print_background=True,
            prefer_css_page_size=True,
        )
        browser.close()

    print(f"Tayyor: {OUT}  ({OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
