import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzju4iwpFmGR8QXqEtlm03-XhQDP7fefyBiSCHhgp2qhCMldTikwFjB89X77vIiKNwR/exec";

export const dynamic = "force-dynamic";

/* Relays a lead to the existing Google Sheets script and, when the env
   vars are configured, duplicates it to a Telegram bot chat. */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const tasks: Promise<unknown>[] = [
    fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      redirect: "follow",
      cache: "no-store",
    }).catch(() => null),
  ];

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    const text = [
      "🆕 Yangi lid — master-klass",
      `Ism: ${params.get("name") || "—"}`,
      `Telefon: ${params.get("phone") || "—"}`,
      `Soha: ${params.get("field") || "—"}`,
      `Tarif: ${params.get("tariff") || "—"} (${params.get("tariff_price") || "—"} so'm)`,
      `Manba: ${params.get("source") || "—"} / ${params.get("medium") || "—"}`,
    ].join("\n");
    tasks.push(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
        cache: "no-store",
      }).catch(() => null)
    );
  }

  await Promise.allSettled(tasks);
  return NextResponse.json({ ok: true });
}
