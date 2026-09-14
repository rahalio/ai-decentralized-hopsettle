import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDispute_Body = z
  .object({
    channelId: z.string(),
    accountingEntryId: z.string().optional(),
    claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
    claimedBytes: z.number().int().optional(),
    note: z.string().max(2000).optional(),
  })
  .passthrough();
const resolveDispute_Body = z
  .object({
    resolutionNote: z.string().max(2000),
    escalateQuarantine: z.boolean().optional().default(false),
  })
  .passthrough();
const DisputeStatus = z.enum([
  'open',
  'evidence_submitted',
  'resolved',
  'escalated_quarantine',
  'expired',
]);
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
const DisputeId = z.string();
const Dispute = z
  .object({
    disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
    channelId: z.string(),
    accountingEntryId: z.string().optional(),
    status: z.enum([
      'open',
      'evidence_submitted',
      'resolved',
      'escalated_quarantine',
      'expired',
    ]),
    claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
    claimedBytes: z.number().int().optional(),
    accountedBytes: z.number().int().optional(),
    resolutionNote: z.string().optional(),
    evidenceExportUrl: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DisputeListData = z
  .object({
    items: z.array(
      z
        .object({
          disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
          channelId: z.string(),
          accountingEntryId: z.string().optional(),
          status: z.enum([
            'open',
            'evidence_submitted',
            'resolved',
            'escalated_quarantine',
            'expired',
          ]),
          claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
          claimedBytes: z.number().int().optional(),
          accountedBytes: z.number().int().optional(),
          resolutionNote: z.string().optional(),
          evidenceExportUrl: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
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
const DisputeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
              channelId: z.string(),
              accountingEntryId: z.string().optional(),
              status: z.enum([
                'open',
                'evidence_submitted',
                'resolved',
                'escalated_quarantine',
                'expired',
              ]),
              claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
              claimedBytes: z.number().int().optional(),
              accountedBytes: z.number().int().optional(),
              resolutionNote: z.string().optional(),
              evidenceExportUrl: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const DisputeCreateRequest = z
  .object({
    channelId: z.string(),
    accountingEntryId: z.string().optional(),
    claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
    claimedBytes: z.number().int().optional(),
    note: z.string().max(2000).optional(),
  })
  .passthrough();
const DisputeResponse = z
  .object({
    data: z
      .object({
        disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
        channelId: z.string(),
        accountingEntryId: z.string().optional(),
        status: z.enum([
          'open',
          'evidence_submitted',
          'resolved',
          'escalated_quarantine',
          'expired',
        ]),
        claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
        claimedBytes: z.number().int().optional(),
        accountedBytes: z.number().int().optional(),
        resolutionNote: z.string().optional(),
        evidenceExportUrl: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const DisputeEvidenceExport = z
  .object({
    disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
    signatureSlice: z.array(
      z
        .object({
          packetId: z.string(),
          bpsSignature: z.string(),
          chsSignature: z.string(),
          bytes: z.number().int(),
        })
        .partial()
        .passthrough()
    ),
    exportedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DisputeEvidenceExportResponse = z
  .object({
    data: z
      .object({
        disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
        signatureSlice: z.array(
          z
            .object({
              packetId: z.string(),
              bpsSignature: z.string(),
              chsSignature: z.string(),
              bytes: z.number().int(),
            })
            .partial()
            .passthrough()
        ),
        exportedAt: z.string().datetime({ offset: true }),
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
const DisputeResolveRequest = z
  .object({
    resolutionNote: z.string().max(2000),
    escalateQuarantine: z.boolean().optional().default(false),
  })
  .passthrough();

export const schemas: any = {
  createDispute_Body,
  resolveDispute_Body,
  DisputeStatus,
  Problem,
  DisputeId,
  Dispute,
  DisputeListData,
  ResponseMeta,
  DisputeListResponse,
  DisputeCreateRequest,
  DisputeResponse,
  DisputeEvidenceExport,
  DisputeEvidenceExportResponse,
  DisputeResolveRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/disputes',
    alias: 'listDisputes',
    requestFormat: 'json',
    parameters: [
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum([
            'open',
            'evidence_submitted',
            'resolved',
            'escalated_quarantine',
            'expired',
          ])
          .optional(),
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
                  disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  channelId: z.string(),
                  accountingEntryId: z.string().optional(),
                  status: z.enum([
                    'open',
                    'evidence_submitted',
                    'resolved',
                    'escalated_quarantine',
                    'expired',
                  ]),
                  claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
                  claimedBytes: z.number().int().optional(),
                  accountedBytes: z.number().int().optional(),
                  resolutionNote: z.string().optional(),
                  evidenceExportUrl: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    method: 'post',
    path: '/v1/disputes',
    alias: 'createDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDispute_Body,
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            channelId: z.string(),
            accountingEntryId: z.string().optional(),
            status: z.enum([
              'open',
              'evidence_submitted',
              'resolved',
              'escalated_quarantine',
              'expired',
            ]),
            claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
            claimedBytes: z.number().int().optional(),
            accountedBytes: z.number().int().optional(),
            resolutionNote: z.string().optional(),
            evidenceExportUrl: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
        status: 400,
        description: `Malformed request`,
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
    path: '/v1/disputes/:disputeId',
    alias: 'getDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            channelId: z.string(),
            accountingEntryId: z.string().optional(),
            status: z.enum([
              'open',
              'evidence_submitted',
              'resolved',
              'escalated_quarantine',
              'expired',
            ]),
            claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
            claimedBytes: z.number().int().optional(),
            accountedBytes: z.number().int().optional(),
            resolutionNote: z.string().optional(),
            evidenceExportUrl: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/disputes/:disputeId/evidence-export',
    alias: 'exportDisputeEvidence',
    requestFormat: 'json',
    parameters: [
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            signatureSlice: z.array(
              z
                .object({
                  packetId: z.string(),
                  bpsSignature: z.string(),
                  chsSignature: z.string(),
                  bytes: z.number().int(),
                })
                .partial()
                .passthrough()
            ),
            exportedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/disputes/:disputeId/resolve',
    alias: 'resolveDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: resolveDispute_Body,
      },
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            channelId: z.string(),
            accountingEntryId: z.string().optional(),
            status: z.enum([
              'open',
              'evidence_submitted',
              'resolved',
              'escalated_quarantine',
              'expired',
            ]),
            claimantRole: z.enum(['buyer', 'seller', 'superpeer']),
            claimedBytes: z.number().int().optional(),
            accountedBytes: z.number().int().optional(),
            resolutionNote: z.string().optional(),
            evidenceExportUrl: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
