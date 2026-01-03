import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

const adminPassword = process.env.ADMIN_PASSWORD;

function isAuthorized(request: Request) {
  if (!adminPassword) {
    return false;
  }
  const header = request.headers.get("x-admin-password");
  return header === adminPassword;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("reports")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to load reports." },
      { status: 500 },
    );
  }

  return NextResponse.json({ data });
}
