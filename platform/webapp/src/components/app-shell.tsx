"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useRole, type OperatorRole } from "@/contexts/role-context";
import type { ReactNode } from "react";

const NAV: Record<OperatorRole, { href: string; label: string }[]> = {
  superpeer: [
    { href: "/", label: "Home" },
    { href: "/channels", label: "Channels" },
    { href: "/accounting", label: "Accounting" },
    { href: "/pricing", label: "Pricing" },
    { href: "/staking", label: "Staking" },
    { href: "/topology", label: "Topology" },
    { href: "/settlement", label: "Settlement" },
    { href: "/disputes", label: "Disputes" },
  ],
  app_superpeer: [
    { href: "/", label: "App home" },
    { href: "/channels", label: "Channels" },
    { href: "/pricing", label: "Policies" },
    { href: "/topology", label: "Trust boundary" },
  ],
  seller: [
    { href: "/", label: "Seller home" },
    { href: "/pricing", label: "My rates" },
    { href: "/channels", label: "Seller channels" },
    { href: "/accounting", label: "CHS ack" },
  ],
  buyer: [
    { href: "/", label: "Buyer home" },
    { href: "/pricing", label: "Path charges" },
    { href: "/channels", label: "Buyer channels" },
    { href: "/disputes", label: "Disputes" },
  ],
  relay: [
    { href: "/", label: "Relay home" },
    { href: "/reporting", label: "Attribution" },
    { href: "/channels", label: "Paths" },
  ],
  finance: [
    { href: "/", label: "Finance home" },
    { href: "/settlement", label: "Statements" },
    { href: "/reporting", label: "Reconciliation" },
  ],
  admin: [
    { href: "/", label: "Admin home" },
    { href: "/topology", label: "Quarantine" },
    { href: "/disputes", label: "Disputes" },
    { href: "/accounting", label: "Divergence" },
  ],
};

const ROLES: { id: OperatorRole; label: string }[] = [
  { id: "superpeer", label: "Superpeer" },
  { id: "app_superpeer", label: "App superpeer" },
  { id: "seller", label: "Seller" },
  { id: "buyer", label: "Buyer" },
  { id: "relay", label: "Relay" },
  { id: "finance", label: "Finance" },
  { id: "admin", label: "Admin" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { role, setRole, meshAttachment, setMeshAttachment } = useRole();
  const items = NAV[role];

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          background: "var(--color-ops-900)",
          borderRight: "1px solid var(--color-ops-700)",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--color-brand)",
              letterSpacing: "0.04em",
            }}
          >
            Hopsettle
          </div>
          <div style={{ color: "var(--color-steel)", fontSize: 12, marginTop: 4 }}>
            Mesh hop clearing
          </div>
        </div>

        <label style={{ display: "grid", gap: 6, fontSize: 12, color: "var(--color-steel)" }}>
          Workspace
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as OperatorRole)}
            style={{
              background: "var(--color-ops-950)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-ops-700)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 10px",
            }}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6, fontSize: 12, color: "var(--color-steel)" }}>
          Mesh attachment
          <select
            value={meshAttachment}
            onChange={(e) => setMeshAttachment(e.target.value)}
            style={{
              background: "var(--color-ops-950)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-ops-700)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 10px",
            }}
          >
            <option>Dhaka</option>
            <option>Vancouver</option>
            <option>Khulna</option>
          </select>
        </label>

        <nav style={{ display: "grid", gap: 4 }}>
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(active && "active")}
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
                  color: active ? "var(--color-ops-950)" : "var(--color-ink)",
                  background: active ? "var(--color-signal)" : "transparent",
                  fontWeight: active ? 600 : 400,
                  transition: `background var(--motion-signal)`,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", fontSize: 12, color: "var(--color-steel)" }}>
          Signing keys stay off-browser. Policy-gated open/close only.
        </div>
      </aside>

      <main style={{ padding: "28px 32px" }}>
        <motion.div
          key={pathname + role}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
