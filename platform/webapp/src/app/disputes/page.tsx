"use client";

import { useQuery } from "@tanstack/react-query";
import { disputesService } from "@/services/domains/disputes";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";

export default function DisputesPage() {
  const q = useQuery({
    queryKey: ["disputes"],
    queryFn: () => disputesService.list(),
    retry: false,
  });

  const rows = (q.data || []).map((row) => [
    String(row.disputeId ?? "—"),
    String(row.channelId ?? "—"),
    String(row.status ?? "—"),
    String(row.claimantRole ?? "—"),
    String(row.claimedBytes ?? "—"),
    String(row.accountedBytes ?? "—"),
  ]);

  return (
    <>
      <PageHeader
        title="Disputes workspace"
        subtitle="Buyer/seller volume disagreements with exportable BPS/CHS signature evidence."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      <Banner tone="float">Dual-pane evidence: claimant vs superpeer log.</Banner>
      {q.isError ? <Banner tone="block">{formatProblem(q.error)}</Banner> : null}
      <DataTable
        columns={["Dispute", "Channel", "Status", "Claimant", "Claimed", "Accounted"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No open disputes."}
      />
    </>
  );
}
