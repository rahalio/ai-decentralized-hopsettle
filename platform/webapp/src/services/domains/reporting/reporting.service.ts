import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { unwrap } from "@/services/shared/http";

const raw = {
  reconciliation(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/reports/channel-reconciliation${q}`)
    );
  },
  relayAttribution(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/reports/relay-attribution${q}`)
    );
  },
};

export const reportingService = makeService(raw, "reporting");
