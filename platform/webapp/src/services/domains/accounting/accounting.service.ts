import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listEntries(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/accounting/entries${q}`)));
  },
  ingest(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/accounting/entries`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  markReviewed(entryId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/accounting/entries/${entryId}/review`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const accountingService = makeService(raw, "accounting");
