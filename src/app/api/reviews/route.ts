import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.REVIEW_NOTIFY_EMAIL ?? "brianrobt@pm.me";
const WEBHOOK_URL = process.env.REVIEW_WEBHOOK_URL;

const MAX_QUOTE_LENGTH = 2000;
const MIN_QUOTE_LENGTH = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const recentSubmissions = new Map<string, number[]>();

type ReviewPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  quote?: unknown;
  website?: unknown;
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

async function deliverReview(fields: {
  name: string;
  email: string;
  company: string;
  quote: string;
}): Promise<boolean> {
  const subject = `New client review from ${fields.name}`;
  const message = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company || "(not provided)"}`,
    "",
    fields.quote,
  ].join("\n");

  if (WEBHOOK_URL) {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        subject,
        message,
        source: "brianrobt.com/reviews",
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
        company: fields.company,
        message: fields.quote,
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

  let body: ReviewPayload;
  try {
    body = (await request.json()) as ReviewPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (asTrimmedString(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const company = asTrimmedString(body.company);
  const quote = asTrimmedString(body.quote);

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (company.length > 120) {
    return NextResponse.json({ error: "Company name is too long." }, { status: 400 });
  }
  if (quote.length < MIN_QUOTE_LENGTH || quote.length > MAX_QUOTE_LENGTH) {
    return NextResponse.json(
      {
        error: `Please write a review between ${MIN_QUOTE_LENGTH} and ${MAX_QUOTE_LENGTH} characters.`,
      },
      { status: 400 },
    );
  }

  try {
    const delivered = await deliverReview({ name, email, company, quote });
    if (!delivered) {
      return NextResponse.json(
        { error: "Could not send your review. Please email me instead." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Could not send your review. Please email me instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
