import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listChannels(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/channels${q}`)));
  },
  getChannel(channelId: string) {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/channels/${channelId}`));
  },
  openChannel(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/channels`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  discover(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/channels/discovery`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  closeChannel(channelId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/channels/${channelId}/close`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const channelsService = makeService(raw, "channels");
