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
const SettlementStatementId = z.string();
const SettlementLineKind = z.enum(['open', 'account', 'close', 'adjustment']);
const SettlementLineItem = z
  .object({
    kind: z.enum(['open', 'account', 'close', 'adjustment']),
    channelId: z.string(),
    rmesh: z.number(),
    eth: z.number().optional(),
    occurredAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const SettlementStatement = z
  .object({
    statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
    period: z.string(),
    meshAttachmentId: z.string().optional(),
    netRmesh: z.number(),
    netEth: z.number().optional(),
    channelsClosed: z.number().int(),
    lineItems: z
      .array(
        z
          .object({
            kind: z.enum(['open', 'account', 'close', 'adjustment']),
            channelId: z.string(),
            rmesh: z.number(),
            eth: z.number().optional(),
            occurredAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough()
      )
      .optional(),
    exported: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SettlementStatementListData = z
  .object({
    items: z.array(
      z
        .object({
          statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
          period: z.string(),
          meshAttachmentId: z.string().optional(),
          netRmesh: z.number(),
          netEth: z.number().optional(),
          channelsClosed: z.number().int(),
          lineItems: z
            .array(
              z
                .object({
                  kind: z.enum(['open', 'account', 'close', 'adjustment']),
                  channelId: z.string(),
                  rmesh: z.number(),
                  eth: z.number().optional(),
                  occurredAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            )
            .optional(),
          exported: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
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
const SettlementStatementListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
              period: z.string(),
              meshAttachmentId: z.string().optional(),
              netRmesh: z.number(),
              netEth: z.number().optional(),
              channelsClosed: z.number().int(),
              lineItems: z
                .array(
                  z
                    .object({
                      kind: z.enum(['open', 'account', 'close', 'adjustment']),
                      channelId: z.string(),
                      rmesh: z.number(),
                      eth: z.number().optional(),
                      occurredAt: z
                        .string()
                        .datetime({ offset: true })
                        .optional(),
                    })
                    .passthrough()
                )
                .optional(),
              exported: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
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
const SettlementStatementResponse = z
  .object({
    data: z
      .object({
        statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
        period: z.string(),
        meshAttachmentId: z.string().optional(),
        netRmesh: z.number(),
        netEth: z.number().optional(),
        channelsClosed: z.number().int(),
        lineItems: z
          .array(
            z
              .object({
                kind: z.enum(['open', 'account', 'close', 'adjustment']),
                channelId: z.string(),
                rmesh: z.number(),
                eth: z.number().optional(),
                occurredAt: z.string().datetime({ offset: true }).optional(),
              })
              .passthrough()
          )
          .optional(),
        exported: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
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
  SettlementStatementId,
  SettlementLineKind,
  SettlementLineItem,
  SettlementStatement,
  SettlementStatementListData,
  ResponseMeta,
  SettlementStatementListResponse,
  SettlementStatementResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/settlement/statements',
    alias: 'listSettlementStatements',
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'meshAttachmentId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'cursor',
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
                  statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  period: z.string(),
                  meshAttachmentId: z.string().optional(),
                  netRmesh: z.number(),
                  netEth: z.number().optional(),
                  channelsClosed: z.number().int(),
                  lineItems: z
                    .array(
                      z
                        .object({
                          kind: z.enum([
                            'open',
                            'account',
                            'close',
                            'adjustment',
                          ]),
                          channelId: z.string(),
                          rmesh: z.number(),
                          eth: z.number().optional(),
                          occurredAt: z
                            .string()
                            .datetime({ offset: true })
                            .optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  exported: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
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
    path: '/v1/settlement/statements/:statementId',
    alias: 'getSettlementStatement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'statementId',
        type: 'Path',
        schema: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string(),
            meshAttachmentId: z.string().optional(),
            netRmesh: z.number(),
            netEth: z.number().optional(),
            channelsClosed: z.number().int(),
            lineItems: z
              .array(
                z
                  .object({
                    kind: z.enum(['open', 'account', 'close', 'adjustment']),
                    channelId: z.string(),
                    rmesh: z.number(),
                    eth: z.number().optional(),
                    occurredAt: z
                      .string()
                      .datetime({ offset: true })
                      .optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exported: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
      {
        status: 404,
        description: `Resource not found`,
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
    method: 'post',
    path: '/v1/settlement/statements/:statementId/export',
    alias: 'exportSettlementStatement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'statementId',
        type: 'Path',
        schema: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            statementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string(),
            meshAttachmentId: z.string().optional(),
            netRmesh: z.number(),
            netEth: z.number().optional(),
            channelsClosed: z.number().int(),
            lineItems: z
              .array(
                z
                  .object({
                    kind: z.enum(['open', 'account', 'close', 'adjustment']),
                    channelId: z.string(),
                    rmesh: z.number(),
                    eth: z.number().optional(),
                    occurredAt: z
                      .string()
                      .datetime({ offset: true })
                      .optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exported: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
      {
        status: 404,
        description: `Resource not found`,
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
