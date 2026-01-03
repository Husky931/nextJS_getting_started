"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

const initialState = {
  platform: "alibaba",
  seller_name: "",
  seller_url: "",
  product_name: "",
  product_url: "",
  quantity: "",
  total_price: "",
  currency: "",
  industry: "",
  details: "",
};

export function ReportForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
        total_price: Number(form.total_price),
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus("error");
      setMessage(payload?.error || "Could not submit report.");
      return;
    }

    setStatus("success");
    setMessage("Report submitted. It will appear after review.");
    setForm(initialState);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-3">
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Platform
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            placeholder="alibaba"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Industry
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder="Electronics"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Seller (company) name
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="seller_name"
            value={form.seller_name}
            onChange={handleChange}
            placeholder="Company name"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Seller (company) URL
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="seller_url"
            value={form.seller_url}
            onChange={handleChange}
            placeholder="https://"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Product name
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            placeholder="Item name"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Product URL
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="product_url"
            value={form.product_url}
            onChange={handleChange}
            placeholder="https://"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Quantity
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            type="number"
            min="0"
            step="1"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Total price
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="total_price"
            value={form.total_price}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.01"
            required
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm sm:w-[48%]">
          Currency
          <input
            className="rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            placeholder="USD"
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        Details
        <textarea
          className="min-h-[120px] rounded border border-border bg-surface px-3 py-2 text-ink placeholder:text-muted"
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="What happened?"
          required
        />
      </label>
      <button
        className="w-full rounded cursor-pointer bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit report"}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-danger" : "text-success"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
