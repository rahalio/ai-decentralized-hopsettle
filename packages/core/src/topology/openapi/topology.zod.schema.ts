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
const MeshAttachmentId = z.string();
const GatewayHealth = z.enum([
  'healthy',
  'degraded',
  'hole_punch_failed',
  'blocked',
]);
const MeshAttachment = z
  .object({
    attachmentId: z.string().regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
    label: z.string(),
    geographyHint: z.string().optional(),
    linkedAttachmentId: z.string().optional(),
    gatewayHealth: z.enum([
      'healthy',
      'degraded',
      'hole_punch_failed',
      'blocked',
    ]),
    superpeerKind: z.enum(['token', 'app']).optional(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const MeshAttachmentListData = z
  .object({
    items: z.array(
      z
        .object({
          attachmentId: z.string().regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
          label: z.string(),
          geographyHint: z.string().optional(),
          linkedAttachmentId: z.string().optional(),
          gatewayHealth: z.enum([
            'healthy',
            'degraded',
            'hole_punch_failed',
            'blocked',
          ]),
          superpeerKind: z.enum(['token', 'app']).optional(),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
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
const MeshAttachmentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              attachmentId: z.string().regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
              label: z.string(),
              geographyHint: z.string().optional(),
              linkedAttachmentId: z.string().optional(),
              gatewayHealth: z.enum([
                'healthy',
                'degraded',
                'hole_punch_failed',
                'blocked',
              ]),
              superpeerKind: z.enum(['token', 'app']).optional(),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
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
const MeshRole = z.enum([
  'MASTER',
  'CLIENT',
  'ROUTER',
  'GATEWAY',
  'SUPERPEER',
  'REMOTEPEER',
]);
const QuarantineStatus = z.enum(['clear', 'quarantined']);
const TopologyNode = z
  .object({
    meshId: z.string(),
    role: z.enum([
      'MASTER',
      'CLIENT',
      'ROUTER',
      'GATEWAY',
      'SUPERPEER',
      'REMOTEPEER',
    ]),
    attachmentId: z
      .string()
      .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    superpeerKind: z.enum(['token', 'app']).optional(),
    quarantineStatus: z.enum(['clear', 'quarantined']).optional(),
  })
  .passthrough();
const TopologySnapshot = z
  .object({
    nodes: z.array(
      z
        .object({
          meshId: z.string(),
          role: z.enum([
            'MASTER',
            'CLIENT',
            'ROUTER',
            'GATEWAY',
            'SUPERPEER',
            'REMOTEPEER',
          ]),
          attachmentId: z
            .string()
            .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          superpeerKind: z.enum(['token', 'app']).optional(),
          quarantineStatus: z.enum(['clear', 'quarantined']).optional(),
        })
        .passthrough()
    ),
    attachments: z.array(
      z
        .object({
          attachmentId: z.string().regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
          label: z.string(),
          geographyHint: z.string().optional(),
          linkedAttachmentId: z.string().optional(),
          gatewayHealth: z.enum([
            'healthy',
            'degraded',
            'hole_punch_failed',
            'blocked',
          ]),
          superpeerKind: z.enum(['token', 'app']).optional(),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    capturedAt: z.string().datetime({ offset: true }),
    ageSeconds: z.number().int().optional(),
  })
  .passthrough();
const TopologySnapshotResponse = z
  .object({
    data: z
      .object({
        nodes: z.array(
          z
            .object({
              meshId: z.string(),
              role: z.enum([
                'MASTER',
                'CLIENT',
                'ROUTER',
                'GATEWAY',
                'SUPERPEER',
                'REMOTEPEER',
              ]),
              attachmentId: z
                .string()
                .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              superpeerKind: z.enum(['token', 'app']).optional(),
              quarantineStatus: z.enum(['clear', 'quarantined']).optional(),
            })
            .passthrough()
        ),
        attachments: z.array(
          z
            .object({
              attachmentId: z.string().regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
              label: z.string(),
              geographyHint: z.string().optional(),
              linkedAttachmentId: z.string().optional(),
              gatewayHealth: z.enum([
                'healthy',
                'degraded',
                'hole_punch_failed',
                'blocked',
              ]),
              superpeerKind: z.enum(['token', 'app']).optional(),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        capturedAt: z.string().datetime({ offset: true }),
        ageSeconds: z.number().int().optional(),
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
const QuarantineRecord = z
  .object({
    meshId: z.string(),
    status: z.enum(['clear', 'quarantined']),
    reason: z.string(),
    mismatchRate: z.number().optional(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const QuarantineListData = z
  .object({
    items: z.array(
      z
        .object({
          meshId: z.string(),
          status: z.enum(['clear', 'quarantined']),
          reason: z.string(),
          mismatchRate: z.number().optional(),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const QuarantineListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              meshId: z.string(),
              status: z.enum(['clear', 'quarantined']),
              reason: z.string(),
              mismatchRate: z.number().optional(),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
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
const QuarantineActionRequest = z
  .object({ reason: z.string().max(1000) })
  .passthrough();
const QuarantineRecordResponse = z
  .object({
    data: z
      .object({
        meshId: z.string(),
        status: z.enum(['clear', 'quarantined']),
        reason: z.string(),
        mismatchRate: z.number().optional(),
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

export const schemas: any = {
  Problem,
  MeshAttachmentId,
  GatewayHealth,
  MeshAttachment,
  MeshAttachmentListData,
  ResponseMeta,
  MeshAttachmentListResponse,
  MeshRole,
  QuarantineStatus,
  TopologyNode,
  TopologySnapshot,
  TopologySnapshotResponse,
  QuarantineRecord,
  QuarantineListData,
  QuarantineListResponse,
  QuarantineActionRequest,
  QuarantineRecordResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/topology/attachments',
    alias: 'listMeshAttachments',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  attachmentId: z
                    .string()
                    .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
                  label: z.string(),
                  geographyHint: z.string().optional(),
                  linkedAttachmentId: z.string().optional(),
                  gatewayHealth: z.enum([
                    'healthy',
                    'degraded',
                    'hole_punch_failed',
                    'blocked',
                  ]),
                  superpeerKind: z.enum(['token', 'app']).optional(),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
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
    path: '/v1/topology/quarantine',
    alias: 'listQuarantineRecords',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  meshId: z.string(),
                  status: z.enum(['clear', 'quarantined']),
                  reason: z.string(),
                  mismatchRate: z.number().optional(),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
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
    path: '/v1/topology/quarantine/:meshId',
    alias: 'quarantineMeshNode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string().max(1000) }).passthrough(),
      },
      {
        name: 'meshId',
        type: 'Path',
        schema: z.string(),
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
            meshId: z.string(),
            status: z.enum(['clear', 'quarantined']),
            reason: z.string(),
            mismatchRate: z.number().optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/topology/quarantine/:meshId/release',
    alias: 'releaseQuarantine',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string().max(1000) }).passthrough(),
      },
      {
        name: 'meshId',
        type: 'Path',
        schema: z.string(),
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
            meshId: z.string(),
            status: z.enum(['clear', 'quarantined']),
            reason: z.string(),
            mismatchRate: z.number().optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/topology/snapshot',
    alias: 'getTopologySnapshot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'attachmentId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            nodes: z.array(
              z
                .object({
                  meshId: z.string(),
                  role: z.enum([
                    'MASTER',
                    'CLIENT',
                    'ROUTER',
                    'GATEWAY',
                    'SUPERPEER',
                    'REMOTEPEER',
                  ]),
                  attachmentId: z
                    .string()
                    .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  superpeerKind: z.enum(['token', 'app']).optional(),
                  quarantineStatus: z.enum(['clear', 'quarantined']).optional(),
                })
                .passthrough()
            ),
            attachments: z.array(
              z
                .object({
                  attachmentId: z
                    .string()
                    .regex(/^mat_[0-9A-HJKMNP-TV-Z]{26}$/),
                  label: z.string(),
                  geographyHint: z.string().optional(),
                  linkedAttachmentId: z.string().optional(),
                  gatewayHealth: z.enum([
                    'healthy',
                    'degraded',
                    'hole_punch_failed',
                    'blocked',
                  ]),
                  superpeerKind: z.enum(['token', 'app']).optional(),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            capturedAt: z.string().datetime({ offset: true }),
            ageSeconds: z.number().int().optional(),
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
