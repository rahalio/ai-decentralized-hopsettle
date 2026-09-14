"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OperatorRole =
  | "superpeer"
  | "app_superpeer"
  | "seller"
  | "buyer"
  | "relay"
  | "finance"
  | "admin";

type RoleContextValue = {
  role: OperatorRole;
  setRole: (role: OperatorRole) => void;
  meshAttachment: string;
  setMeshAttachment: (id: string) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<OperatorRole>("superpeer");
  const [meshAttachment, setMeshAttachment] = useState("Dhaka");
  const value = useMemo(
    () => ({ role, setRole, meshAttachment, setMeshAttachment }),
    [role, meshAttachment]
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
