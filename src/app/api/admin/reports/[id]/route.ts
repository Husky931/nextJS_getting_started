import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ReportStatus } from "@/lib/reportTypes";

const adminPassword = process.env.ADMIN_PASSWORD;

function isAuthorized(request: Request) {
  if (!adminPassword) {
    return false;
  }
  const header = request.headers.get("x-admin-password");
  return header === adminPassword;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { status?: ReportStatus };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (body.status !== "approved" && body.status !== "rejected") {
    return NextResponse.json(
      { error: "status must be approved or rejected." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("reports")
    .update({ status: body.status, updated_at: new Date().toISOString() })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to update report." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
