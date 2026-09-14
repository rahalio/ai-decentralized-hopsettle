"use client";

import { useQuery } from "@tanstack/react-query";
import { stakingService } from "@/services/domains/staking";
import { Banner, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";

const DEMO_MESH = "0xmesh_demo_superpeer";

export default function StakingPage() {
  const q = useQuery({
    queryKey: ["staking", DEMO_MESH],
    queryFn: () => stakingService.getAccount(DEMO_MESH),
    retry: false,
  });

  const account = q.data || {};
  const eligible = Boolean(account.eligibleForNewChannels);

  return (
    <>
      <PageHeader
        title="Staking and float"
        subtitle="Minimum RMESH float eligibility and kill-switch before channel creation stops."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh float</PrimaryButton>}
      />
      {!eligible && !q.isLoading ? (
        <Banner tone="float">Float blocked — cannot offer new channels until top-up.</Banner>
      ) : (
        <Banner tone="signal">Float healthy — new channels may be offered.</Banner>
      )}
      {q.isError ? <Banner tone="block">{formatProblem(q.error)}</Banner> : null}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <Panel>
          <div style={label}>RMESH float</div>
          <div style={kpi}>{String(account.rmeshFloat ?? "—")}</div>
        </Panel>
        <Panel>
          <div style={label}>Minimum</div>
          <div style={kpi}>{String(account.minimumFloat ?? "—")}</div>
        </Panel>
        <Panel>
          <div style={label}>Runway (h)</div>
          <div style={kpi}>{String(account.projectedRunwayHours ?? "—")}</div>
        </Panel>
      </div>
    </>
  );
}

const label: React.CSSProperties = { color: "var(--color-steel)", fontSize: 12 };
const kpi: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 28,
  marginTop: 8,
  color: "var(--color-brand)",
};
