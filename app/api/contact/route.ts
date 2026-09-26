import { NextResponse } from "next/server";

/**
 * Contact / booking endpoint.
 * If RESEND_API_KEY and CONTACT_TO are set, the enquiry is emailed via Resend.
 * Otherwise it is logged on the server (useful in development).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill every field.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 160);
  const company = String(body.company ?? "").trim().slice(0, 160);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const topics = Array.isArray(body.topics) ? body.topics.map(String).slice(0, 20) : [];
  const source = String(body.source ?? "website").slice(0, 40);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please add your name and a valid work email." }, { status: 422 });
  }

  const text = [
    `New enquiry from secureknots.com (${source})`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Phone: ${phone || "—"}`,
    `Topics: ${topics.join(", ") || "—"}`,
    ``,
    message || "(no message)",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (key && to) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "SecureKnots Website <website@secureknots.com>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: email,
        subject: `Enquiry: ${name}${company ? ` — ${company}` : ""}`,
        text,
      }),
    });
    if (!r.ok) {
      console.error("Resend error", r.status, await r.text());
      return NextResponse.json({ error: "We couldn't send that just now. Please email us directly." }, { status: 502 });
    }
  } else {
    console.info(text);
  }

  return NextResponse.json({ ok: true });
}
