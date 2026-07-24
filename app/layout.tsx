import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.suniyintellect.uz"),
  title: "Biznesda sunʼiy intellekt — Yusufbay Kadirov | Premium master-klass",
  description:
    "Bir kunlik amaliy master-klass Toshkentda. 4 soat ichida biznesingizga 3 ta AI-xodim joriy qilasiz. 2-avgust, Hyatt Regency.",
  openGraph: {
    title: "Biznesda sunʼiy intellekt — 2 barobar tez natija",
    description:
      "Premium master-klass. 2-avgust, Hyatt Regency, Toshkent. 14:00–18:00.",
    images: ["/expert/hero.jpg"],
  },
};

const langInit = `(function(){try{var l=localStorage.getItem('lang');if(l!=='ru'&&l!=='uz'){l='uz'}document.documentElement.setAttribute('data-lang',l)}catch(e){document.documentElement.setAttribute('data-lang','uz')}})();`;

const metaPixel = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','841684395598362');fbq('track','PageView');`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" data-lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInit }} />
        <script dangerouslySetInnerHTML={{ __html: metaPixel }} />
      </head>
      <body className={`${manrope.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
