"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { identityService } from "@/services/domains/identity";
import { PrimaryButton } from "@/components/ops-ui";

const inputStyle: React.CSSProperties = {
  background: "var(--color-ops-950)",
  border: "1px solid var(--color-ops-700)",
  borderRadius: "var(--radius-sm)",
  padding: "10px 12px",
  color: "var(--color-ink)",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@demo.local");
  const [password, setPassword] = useState("sandbox-admin-8");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const session = await identityService.login({ email, password });
      const token = (session as { accessToken?: string }).accessToken;
      if (token) localStorage.setItem("hopsettle_access_token", token);
      localStorage.setItem("hopsettle_api_key", "hopsettle_demo_local_dev_key");
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: "min(420px, 100%)",
          background: "var(--color-ops-900)",
          border: "1px solid var(--color-ops-700)",
          borderRadius: "var(--radius-md)",
          padding: 28,
          display: "grid",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 700,
              color: "var(--color-brand)",
            }}
          >
            Hopsettle
          </div>
          <p style={{ margin: "10px 0 0", color: "var(--color-steel)" }}>
            Settle every mesh hop
          </p>
        </div>
        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>
        {error ? (
          <div style={{ color: "var(--color-block)", fontSize: 13 }}>{error}</div>
        ) : null}
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Enter console"}
        </PrimaryButton>
      </motion.form>
    </div>
  );
}
