"use client";

import Link from "next/link";
import { useRole } from "@/contexts/role-context";
import { Banner, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";

export default function HomePage() {
  const { role, meshAttachment } = useRole();

  if (role === "seller") {
    return (
      <>
        <PageHeader
          title="Seller home"
          subtitle="Publish rates and watch CHS acknowledgements on your seller channels."
        />
        <Banner tone="signal">Mesh attachment: {meshAttachment}</Banner>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          <Panel>
            <h2 style={h2}>My rates</h2>
            <p style={p}>Seller-set per-MB / per-packet without breaking BPS semantics.</p>
            <Link href="/pricing">
              <PrimaryButton>Edit rates</PrimaryButton>
            </Link>
          </Panel>
          <Panel>
            <h2 style={h2}>Seller channels</h2>
            <p style={p}>Superpeer→seller channel balances and close preview.</p>
            <Link href="/channels">
              <PrimaryButton>Open channels</PrimaryButton>
            </Link>
          </Panel>
        </div>
      </>
    );
  }

  if (role === "buyer") {
    return (
      <>
        <PageHeader
          title="Buyer home"
          subtitle="See path charges including superpeer markup before DATA is paid."
        />
        <Banner tone="float">Gateway or hole-punch failure blocks paid paths.</Banner>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          <Panel>
            <h2 style={h2}>Path charges</h2>
            <p style={p}>Hop stack: seller rate + markup + relay share.</p>
            <Link href="/pricing">
              <PrimaryButton>Explain path</PrimaryButton>
            </Link>
          </Panel>
          <Panel>
            <h2 style={h2}>Disputes</h2>
            <p style={p}>Export signature evidence when accounted volume diverges.</p>
            <Link href="/disputes">
              <PrimaryButton>Open disputes</PrimaryButton>
            </Link>
          </Panel>
        </div>
      </>
    );
  }

  if (role === "relay") {
    return (
      <>
        <PageHeader
          title="Relay home"
          subtitle="Attributed forwarded bytes when relay compensation is enabled."
        />
        <Link href="/reporting">
          <PrimaryButton>View attribution</PrimaryButton>
        </Link>
      </>
    );
  }

  if (role === "finance") {
    return (
      <>
        <PageHeader
          title="Finance home"
          subtitle="Period RMESH/ETH movements tied to channel close events."
        />
        <Link href="/settlement">
          <PrimaryButton>Settlement statements</PrimaryButton>
        </Link>
      </>
    );
  }

  if (role === "admin") {
    return (
      <>
        <PageHeader
          title="Platform quarantine"
          subtitle="Quarantine MeshIDs whose signature accounting diverges."
        />
        <Banner tone="block">Negative-path reject when contract queries fail.</Banner>
        <Link href="/topology">
          <PrimaryButton>Quarantine board</PrimaryButton>
        </Link>
      </>
    );
  }

  if (role === "app_superpeer") {
    return (
      <>
        <PageHeader
          title="App superpeer home"
          subtitle="Distinct trust boundary and channel policies from token superpeers."
        />
        <Link href="/pricing">
          <PrimaryButton>App policies</PrimaryButton>
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Superpeer home"
        subtitle="Can you fund new channels, and are open channels reconciling packet accounting?"
        actions={
          <Link href="/channels">
            <PrimaryButton>Open channel</PrimaryButton>
          </Link>
        }
      />
      <Banner tone="float">
        Float below minimum blocks new channel offers (BR-4, BR-7). Attachment:{" "}
        {meshAttachment}.
      </Banner>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)" }}>
        <Panel>
          <h2 style={h2}>Float health</h2>
          <p style={p}>RMESH above minimum + ETH gas headroom.</p>
          <Link href="/staking">Monitor staking →</Link>
        </Panel>
        <Panel>
          <h2 style={h2}>Channels</h2>
          <p style={p}>Buyer→superpeer and superpeer→seller open counts.</p>
          <Link href="/channels">Lifecycle →</Link>
        </Panel>
        <Panel>
          <h2 style={h2}>Mismatch rail</h2>
          <p style={p}>BPS/CHS divergence within tolerance.</p>
          <Link href="/accounting">Reconcile →</Link>
        </Panel>
      </div>
    </>
  );
}

const h2: React.CSSProperties = {
  margin: "0 0 8px",
  fontFamily: "var(--font-display)",
  fontSize: 18,
};
const p: React.CSSProperties = {
  margin: "0 0 14px",
  color: "var(--color-steel)",
  fontSize: 14,
};
