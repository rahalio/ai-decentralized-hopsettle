"use client";

import { useQuery } from "@tanstack/react-query";
import { channelsService } from "@/services/domains/channels";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";

export default function ChannelsPage() {
  const q = useQuery({
    queryKey: ["channels"],
    queryFn: () => channelsService.listChannels(),
    retry: false,
  });

  const rows = (q.data || []).map((row) => [
    String(row.channelId ?? row.id ?? "—"),
    String(row.direction ?? row.role ?? "—"),
    String(row.status ?? "—"),
    String(row.rmeshBalance ?? "—"),
    String(row.ethBalance ?? "—"),
  ]);

  return (
    <>
      <PageHeader
        title="Channel lifecycle"
        subtitle="Discover, open, monitor, and close buyer↔superpeer↔seller channels with contract-backed checks."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      <Banner tone="signal">Run GET_ALL discovery before open. Float below minimum blocks create.</Banner>
      {q.isError ? (
        <Banner tone="block">{formatProblem(q.error)} — connect API or seed sandbox agent.</Banner>
      ) : null}
      <DataTable
        columns={["Channel", "Direction", "Status", "RMESH", "ETH"]}
        rows={rows}
        empty={q.isLoading ? "Loading channels…" : "No channels yet. Connect first superpeer agent."}
      />
    </>
  );
}
