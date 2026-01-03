import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ReportInsert } from "@/lib/reportTypes";

const requiredTextFields = [
  "seller_name",
  "seller_url",
  "product_name",
  "product_url",
  "currency",
  "industry",
  "details",
];

export async function POST(request: Request) {
  let body: ReportInsert;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const errors: string[] = [];

  for (const field of requiredTextFields) {
    const value = body[field as keyof ReportInsert];
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${field} is required.`);
    }
  }

  const quantity = Number(body.quantity);
  const totalPrice = Number(body.total_price);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    errors.push("quantity must be a positive number.");
  }

  if (!Number.isFinite(totalPrice) || totalPrice <= 0) {
    errors.push("total_price must be a positive number.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("reports").insert({
    platform: body.platform?.trim() || "alibaba",
    seller_name: body.seller_name.trim(),
    seller_url: body.seller_url.trim(),
    product_name: body.product_name.trim(),
    product_url: body.product_url.trim(),
    quantity,
    total_price: totalPrice,
    currency: body.currency.trim(),
    industry: body.industry.trim(),
    details: body.details.trim(),
    status: "pending",
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit report." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
