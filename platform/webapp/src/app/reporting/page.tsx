"use client";

import { useQuery } from "@tanstack/react-query";
import { reportingService } from "@/services/domains/reporting";
import { Banner, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";
import { useRole } from "@/contexts/role-context";

export default function ReportingPage() {
  const { role } = useRole();
  const recon = useQuery({
    queryKey: ["recon"],
    queryFn: () => reportingService.reconciliation(),
    retry: false,
  });
  const relay = useQuery({
    queryKey: ["relay"],
    queryFn: () => reportingService.relayAttribution(),
    retry: false,
  });

  return (
    <>
      <PageHeader
        title={role === "relay" ? "Relay attribution" : "Operator reports"}
        subtitle="Channel reconciliation and relay byte attribution exports."
        actions={
          <PrimaryButton
            onClick={() => {
              recon.refetch();
              relay.refetch();
            }}
          >
            Refresh
          </PrimaryButton>
        }
      />
      {recon.isError ? <Banner tone="block">{formatProblem(recon.error)}</Banner> : null}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        <Panel>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)" }}>Reconciliation</h2>
          <pre style={{ fontFamily: "var(--font-mono)", fontSize: 12, whiteSpace: "pre-wrap" }}>
            {recon.isLoading
              ? "Loading…"
              : JSON.stringify(recon.data || { note: "No report yet" }, null, 2)}
          </pre>
        </Panel>
        <Panel>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)" }}>Relay attribution</h2>
          <pre style={{ fontFamily: "var(--font-mono)", fontSize: 12, whiteSpace: "pre-wrap" }}>
            {relay.isLoading
              ? "Loading…"
              : JSON.stringify(relay.data || { note: "Relay share not enabled" }, null, 2)}
          </pre>
        </Panel>
      </div>
    </>
  );
}
