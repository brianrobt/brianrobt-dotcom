import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? "brianrobt@pm.me";
const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL ?? process.env.REVIEW_WEBHOOK_URL;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const recentSubmissions = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  business?: unknown;
  city?: unknown;
  website?: unknown;
  problem?: unknown;
  email?: unknown;
  phone?: unknown;
  honey?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (recentSubmissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (stamps.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  recentSubmissions.set(ip, stamps);
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

async function deliverContact(fields: {
  name: string;
  business: string;
  city: string;
  website: string;
  problem: string;
  email: string;
  phone: string;
}): Promise<boolean> {
  const subject = `Site check request from ${fields.name} (${fields.business || fields.city})`;
  const message = [
    `Name: ${fields.name}`,
    `Business: ${fields.business}`,
    `City/area: ${fields.city}`,
    `Website or Google listing: ${fields.website || "(not provided)"}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "(not provided)"}`,
    "",
    "What's not working:",
    fields.problem,
  ].join("\n");

  if (WEBHOOK_URL) {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        subject,
        message,
        source: "brianrobt.com/contact",
      }),
    });
    return response.ok;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        business: fields.business,
        city: fields.city,
        website: fields.website,
        phone: fields.phone,
        message: fields.problem,
        _subject: subject,
        _template: "box",
        _captcha: "false",
        _replyto: fields.email,
      }),
    },
  );
  return response.ok;
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field is "honey" so "website" can be a real form field.
  if (asTrimmedString(body.honey)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name);
  const business = asTrimmedString(body.business);
  const city = asTrimmedString(body.city);
  const website = asTrimmedString(body.website);
  const problem = asTrimmedString(body.problem);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (business.length < 2 || business.length > 120) {
    return NextResponse.json({ error: "Please enter your business name." }, { status: 400 });
  }
  if (city.length < 2 || city.length > 80) {
    return NextResponse.json({ error: "Please enter your city or area." }, { status: 400 });
  }
  if (website.length > 300) {
    return NextResponse.json({ error: "Website or listing link is too long." }, { status: 400 });
  }
  if (problem.length < 10 || problem.length > 2000) {
    return NextResponse.json(
      { error: "Please tell me a bit about what's not working (at least a sentence)." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (phone.length > 40) {
    return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
  }

  try {
    const delivered = await deliverContact({
      name,
      business,
      city,
      website,
      problem,
      email,
      phone,
    });
    if (!delivered) {
      return NextResponse.json(
        { error: "Could not send your message. Please email me instead." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Could not send your message. Please email me instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
