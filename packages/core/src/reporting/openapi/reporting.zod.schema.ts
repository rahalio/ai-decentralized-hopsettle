import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ChannelReconciliationReport = z
  .object({
    superpeerId: z.string(),
    meshAttachmentId: z.string().optional(),
    accountingMismatchRate: z.number(),
    openChannels: z.number().int(),
    divergedEntries: z.number().int().optional(),
    packetsSettled: z.number().int().optional(),
    packetsTransmitted: z.number().int().optional(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ChannelReconciliationReportResponse = z
  .object({
    data: z
      .object({
        superpeerId: z.string(),
        meshAttachmentId: z.string().optional(),
        accountingMismatchRate: z.number(),
        openChannels: z.number().int(),
        divergedEntries: z.number().int().optional(),
        packetsSettled: z.number().int().optional(),
        packetsTransmitted: z.number().int().optional(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const RelayAttributionRow = z
  .object({
    relayMeshId: z.string(),
    channelId: z.string(),
    forwardedBytes: z.number().int(),
    estimatedRmesh: z.number().optional(),
    compensationEnabled: z.boolean().optional(),
  })
  .passthrough();
const RelayAttributionReport = z
  .object({
    items: z.array(
      z
        .object({
          relayMeshId: z.string(),
          channelId: z.string(),
          forwardedBytes: z.number().int(),
          estimatedRmesh: z.number().optional(),
          compensationEnabled: z.boolean().optional(),
        })
        .passthrough()
    ),
    compensationEnabled: z.boolean(),
    meshAttachmentId: z.string().optional(),
  })
  .passthrough();
const RelayAttributionReportResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              relayMeshId: z.string(),
              channelId: z.string(),
              forwardedBytes: z.number().int(),
              estimatedRmesh: z.number().optional(),
              compensationEnabled: z.boolean().optional(),
            })
            .passthrough()
        ),
        compensationEnabled: z.boolean(),
        meshAttachmentId: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  Problem,
  ChannelReconciliationReport,
  ResponseMeta,
  ChannelReconciliationReportResponse,
  RelayAttributionRow,
  RelayAttributionReport,
  RelayAttributionReportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/reports/channel-reconciliation',
    alias: 'getChannelReconciliationReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'superpeerId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'meshAttachmentId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            superpeerId: z.string(),
            meshAttachmentId: z.string().optional(),
            accountingMismatchRate: z.number(),
            openChannels: z.number().int(),
            divergedEntries: z.number().int().optional(),
            packetsSettled: z.number().int().optional(),
            packetsTransmitted: z.number().int().optional(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/reports/relay-attribution',
    alias: 'getRelayAttributionReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'meshAttachmentId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'relayMeshId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  relayMeshId: z.string(),
                  channelId: z.string(),
                  forwardedBytes: z.number().int(),
                  estimatedRmesh: z.number().optional(),
                  compensationEnabled: z.boolean().optional(),
                })
                .passthrough()
            ),
            compensationEnabled: z.boolean(),
            meshAttachmentId: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
