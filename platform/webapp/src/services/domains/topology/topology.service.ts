import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listAttachments() {
    return asItems(await unwrap(apiClient.get(`/v1/topology/attachments`)));
  },
  snapshot(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/topology/snapshot${q}`));
  },
  async listQuarantine() {
    return asItems(await unwrap(apiClient.get(`/v1/topology/quarantine`)));
  },
  quarantine(meshId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/topology/quarantine/${meshId}`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  release(meshId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/topology/quarantine/${meshId}/release`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const topologyService = makeService(raw, "topology");
