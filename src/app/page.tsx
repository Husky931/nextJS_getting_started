import { ReportForm } from "@/components/ReportForm";
import { Report } from "@/lib/reportTypes";
import { supabasePublic } from "@/lib/supabasePublic";

export const dynamic = "force-dynamic";

async function getApprovedReports(): Promise<Report[]> {
  const { data, error } = await supabasePublic
    .from("reports")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as Report[];
}

export default async function Home() {
  const reports = await getApprovedReports();

  return (
    <div className="min-h-screen bg-primary px-6 py-12 text-ink">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Alibaba Scam Reports
          </p>
          <h1 className="text-3xl font-semibold">
            Community reports on suspicious sellers
          </h1>
          <p className="max-w-2xl text-sm text-muted">
            Submit a report if you encountered fraud or suspicious activity. New
            entries are reviewed before appearing publicly.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">Submit a report</h2>
          <ReportForm />
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Approved reports</h2>
            <p className="text-xs text-muted">{reports.length} total</p>
          </div>
          {reports.length === 0 ? (
            <p className="text-sm text-muted">
              No approved reports yet. Check back soon.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reports.map((report) => (
                <article
                  key={report.id}
                  className="flex flex-col gap-3 rounded border border-border bg-surface p-4"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{report.product_name}</h3>
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
                  <p className="text-xs text-muted">
                    Submitted on {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
