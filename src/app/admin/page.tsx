"use client";

import { useState } from "react";

import { Report } from "@/lib/reportTypes";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const fetchReports = async () => {
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/reports", {
      headers: {
        "x-admin-password": password,
      },
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Unauthorized or failed to load reports.");
      return;
    }

    const payload = await response.json();
    setReports(payload.data || []);
    setStatus("idle");
  };

  const updateReport = async (id: string, nextStatus: "approved" | "rejected") => {
    const response = await fetch(`/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Failed to update report.");
      return;
    }

    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-primary px-6 py-12 text-ink">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Admin review</h1>
          <p className="text-sm text-muted">
            Enter the admin password to review pending reports.
          </p>
        </header>

        <section className="flex flex-col gap-3 rounded border border-border bg-surface p-4">
          <label className="flex flex-col gap-1 text-sm">
            Admin password
            <input
              className="rounded border border-border px-3 py-2"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded bg-ink px-4 py-2 text-sm font-medium text-white"
              type="button"
              onClick={fetchReports}
              disabled={!password || status === "loading"}
            >
              {status === "loading" ? "Loading..." : "Unlock"}
            </button>
            <button
              className="rounded border border-border px-4 py-2 text-sm"
              type="button"
              onClick={() => {
                setPassword("");
                setReports([]);
                setMessage("");
                setStatus("idle");
              }}
            >
              Clear
            </button>
          </div>
          {message ? <p className="text-sm text-danger">{message}</p> : null}
        </section>

        <section className="flex flex-col gap-4">
          {reports.length === 0 ? (
            <p className="text-sm text-muted">No pending reports.</p>
          ) : (
            reports.map((report) => (
              <article
                key={report.id}
                className="flex flex-col gap-3 rounded border border-border bg-surface p-4"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{report.product_name}</h2>
                  <p className="text-sm text-muted">
                    {report.seller_name} · {report.platform}
                  </p>
                  <p className="text-sm text-muted">
                    {report.currency} {report.total_price} · Qty {report.quantity}
                  </p>
                </div>
                <p className="text-sm text-ink">{report.details}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <a
                    className="text-accent underline"
                    href={report.seller_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Seller link
                  </a>
                  <a
                    className="text-accent underline"
                    href={report.product_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Product link
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded bg-success px-3 py-2 text-sm font-medium text-white"
                    type="button"
                    onClick={() => updateReport(report.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="rounded bg-danger px-3 py-2 text-sm font-medium text-white"
                    type="button"
                    onClick={() => updateReport(report.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
