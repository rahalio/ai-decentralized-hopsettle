import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  getAccount(meshId: string) {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/staking/accounts/${meshId}`));
  },
  topUp(meshId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/staking/accounts/${meshId}/top-up`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  pauseOffers(meshId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/staking/accounts/${meshId}/pause-offers`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  async listAlerts(meshId: string) {
    return asItems(await unwrap(apiClient.get(`/v1/staking/accounts/${meshId}/alerts`)));
  },
};

export const stakingService = makeService(raw, "staking");
