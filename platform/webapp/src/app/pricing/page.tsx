"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pricingService } from "@/services/domains/pricing";
import { Banner, DataTable, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";
import { useRole } from "@/contexts/role-context";

export default function PricingPage() {
  const { role } = useRole();
  const [preview, setPreview] = useState<Record<string, unknown> | null>(null);
  const q = useQuery({
    queryKey: ["pricing"],
    queryFn: () => pricingService.listPolicies(),
    retry: false,
  });

  const rows = (q.data || []).map((row) => [
    String(row.policyId ?? row.id ?? "—"),
    String(row.role ?? "—"),
    String(row.pricePerUnit ?? row.pricePerMb ?? "—"),
    String(row.superpeerMarkupPercent ?? "—"),
    String(row.status ?? "—"),
  ]);

  async function runPreview() {
    try {
      const data = await pricingService.previewPath({ bytes: 1_048_576 });
      setPreview(data);
    } catch (err) {
      setPreview({ error: formatProblem(err) });
    }
  }

  return (
    <>
      <PageHeader
        title={role === "buyer" ? "Path charges" : "Pricing policies"}
        subtitle="Seller rates and superpeer markup without breaking BPS/CHS semantics."
        actions={<PrimaryButton onClick={runPreview}>Simulate path cost</PrimaryButton>}
      />
      <Banner tone="signal">App-superpeer policies stay on a separate trust boundary.</Banner>
      {q.isError ? <Banner tone="block">{formatProblem(q.error)}</Banner> : null}
      <DataTable
        columns={["Policy", "Role", "Price/unit", "Markup %", "Status"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No policies published yet."}
      />
      {preview ? (
        <Panel style={{ marginTop: 16 }}>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)" }}>Path preview</h2>
          <pre style={{ fontFamily: "var(--font-mono)", fontSize: 12, whiteSpace: "pre-wrap" }}>
            {JSON.stringify(preview, null, 2)}
          </pre>
        </Panel>
      ) : null}
    </>
  );
}
