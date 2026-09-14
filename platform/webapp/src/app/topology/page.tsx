"use client";

import { useQuery } from "@tanstack/react-query";
import { topologyService } from "@/services/domains/topology";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";
import { useRole } from "@/contexts/role-context";

export default function TopologyPage() {
  const { role } = useRole();
  const attachments = useQuery({
    queryKey: ["attachments"],
    queryFn: () => topologyService.listAttachments(),
    retry: false,
  });
  const quarantine = useQuery({
    queryKey: ["quarantine"],
    queryFn: () => topologyService.listQuarantine(),
    retry: false,
  });

  const attachRows = (attachments.data || []).map((row) => [
    String(row.attachmentId ?? "—"),
    String(row.label ?? "—"),
    String(row.geographyHint ?? "—"),
    String(row.gatewayHealth ?? "—"),
    String(row.superpeerKind ?? "—"),
  ]);

  const qRows = (quarantine.data || []).map((row) => [
    String(row.meshId ?? "—"),
    String(row.status ?? "—"),
    String(row.reason ?? "—"),
    String(row.mismatchRate ?? "—"),
  ]);

  return (
    <>
      <PageHeader
        title={role === "admin" ? "Quarantine board" : "Role topology"}
        subtitle="Mesh attachments, gateway health, and app vs token superpeer boundaries."
        actions={
          <PrimaryButton
            onClick={() => {
              attachments.refetch();
              quarantine.refetch();
            }}
          >
            Refresh
          </PrimaryButton>
        }
      />
      <Banner tone="block">Gateway / hole-punch failures are settlement-blocking.</Banner>
      {attachments.isError ? <Banner tone="block">{formatProblem(attachments.error)}</Banner> : null}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Mesh attachments</h2>
      <DataTable
        columns={["ID", "Label", "Geography", "Gateway", "Kind"]}
        rows={attachRows}
        empty={attachments.isLoading ? "Loading…" : "No topology snapshot yet."}
      />
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 24 }}>Quarantine</h2>
      <DataTable
        columns={["MeshID", "Status", "Reason", "Mismatch"]}
        rows={qRows}
        empty={quarantine.isLoading ? "Loading…" : "Healthy mesh — quarantine empty."}
      />
    </>
  );
}
