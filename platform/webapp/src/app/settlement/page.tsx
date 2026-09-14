"use client";

import { useQuery } from "@tanstack/react-query";
import { settlementService } from "@/services/domains/settlement";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";

export default function SettlementPage() {
  const q = useQuery({
    queryKey: ["settlement"],
    queryFn: () => settlementService.listStatements(),
    retry: false,
  });

  const rows = (q.data || []).map((row) => [
    String(row.statementId ?? row.id ?? "—"),
    String(row.period ?? "—"),
    String(row.meshAttachmentId ?? "—"),
    String(row.netRmesh ?? "—"),
    String(row.channelsClosed ?? "—"),
  ]);

  return (
    <>
      <PageHeader
        title="Settlement statements"
        subtitle="Period RMESH/ETH movements tied to channel close events for finance audit."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      <Banner tone="signal">Exported statements are immutable archive records.</Banner>
      {q.isError ? <Banner tone="block">{formatProblem(q.error)}</Banner> : null}
      <DataTable
        columns={["Statement", "Period", "Attachment", "Net RMESH", "Closes"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No closes in this period."}
      />
    </>
  );
}
