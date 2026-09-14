import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listStatements(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/settlement/statements${q}`)));
  },
  getStatement(statementId: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/settlement/statements/${statementId}`)
    );
  },
  exportStatement(statementId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/settlement/statements/${statementId}/export`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const settlementService = makeService(raw, "settlement");
