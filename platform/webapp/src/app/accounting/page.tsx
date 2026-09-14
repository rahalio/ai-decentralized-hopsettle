"use client";

import { useQuery } from "@tanstack/react-query";
import { accountingService } from "@/services/domains/accounting";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";

export default function AccountingPage() {
  const q = useQuery({
    queryKey: ["accounting"],
    queryFn: () => accountingService.listEntries(),
    retry: false,
  });

  const rows = (q.data || []).map((row) => [
    String(row.entryId ?? "—"),
    String(row.channelId ?? "—"),
    String(row.packetType ?? "—"),
    String(row.bytes ?? "—"),
    String(row.reconcileStatus ?? "—"),
  ]);

  return (
    <>
      <PageHeader
        title="Packet accounting"
        subtitle="BPS/CHS entries vs channel balance updates within tolerance."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      <Banner tone="float">Divergence → dispute or quarantine. Never edit accounted bytes.</Banner>
      {q.isError ? <Banner tone="block">{formatProblem(q.error)}</Banner> : null}
      <DataTable
        columns={["Entry", "Channel", "Type", "Bytes", "Status"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "Awaiting DATA — no accounting entries yet."}
      />
    </>
  );
}
