import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listPolicies(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/pricing/policies${q}`)));
  },
  getPolicy(policyId: string) {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/pricing/policies/${policyId}`));
  },
  createPolicy(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/pricing/policies`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  previewPath(body: Record<string, unknown>) {
    return unwrap<Record<string, unknown>>(apiClient.post(`/v1/pricing/path-preview`, { body }));
  },
};

export const pricingService = makeService(raw, "pricing");
