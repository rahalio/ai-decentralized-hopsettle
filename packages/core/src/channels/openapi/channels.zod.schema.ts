import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openPaymentChannel_Body = z
  .object({
    meshId: z.string().min(1).max(128),
    role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
    direction: z.enum([
      'buyer_to_superpeer',
      'superpeer_to_seller',
      'relay_path',
    ]),
    counterpartyMeshId: z.string().min(1).max(128),
    depositRmesh: z.number().gte(0).optional(),
    superpeerKind: z.enum(['token', 'app']).optional(),
    meshAttachmentId: z.string().optional(),
  })
  .passthrough();
const discoverPaymentChannels_Body = z
  .object({
    meshId: z.string().min(1).max(128),
    counterpartyMeshId: z.string().min(1).max(128).optional(),
  })
  .passthrough();
const closePaymentChannel_Body = z
  .object({ reason: z.string().max(500), force: z.boolean().default(false) })
  .partial()
  .passthrough();
const ChannelRole = z.enum(['buyer', 'seller', 'superpeer', 'relay']);
const ChannelStatus = z.enum([
  'discovered',
  'opening',
  'open',
  'closing',
  'closed',
  'blocked',
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
const ChannelId = z.string();
const MeshId = z.string();
const ChannelDirection = z.enum([
  'buyer_to_superpeer',
  'superpeer_to_seller',
  'relay_path',
]);
const SuperpeerKind = z.enum(['token', 'app']);
const PaymentChannel = z
  .object({
    channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
    meshId: z.string().min(1).max(128),
    counterpartyMeshId: z.string().min(1).max(128).optional(),
    role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
    direction: z.enum([
      'buyer_to_superpeer',
      'superpeer_to_seller',
      'relay_path',
    ]),
    status: z.enum([
      'discovered',
      'opening',
      'open',
      'closing',
      'closed',
      'blocked',
    ]),
    superpeerKind: z.enum(['token', 'app']).optional(),
    rmeshBalance: z.number(),
    ethBalance: z.number(),
    capacityRmesh: z.number().optional(),
    meshAttachmentId: z.string().optional(),
    contractExists: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ChannelListData = z
  .object({
    items: z.array(
      z
        .object({
          channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
          meshId: z.string().min(1).max(128),
          counterpartyMeshId: z.string().min(1).max(128).optional(),
          role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
          direction: z.enum([
            'buyer_to_superpeer',
            'superpeer_to_seller',
            'relay_path',
          ]),
          status: z.enum([
            'discovered',
            'opening',
            'open',
            'closing',
            'closed',
            'blocked',
          ]),
          superpeerKind: z.enum(['token', 'app']).optional(),
          rmeshBalance: z.number(),
          ethBalance: z.number(),
          capacityRmesh: z.number().optional(),
          meshAttachmentId: z.string().optional(),
          contractExists: z.boolean().optional(),
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
const PaymentChannelListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
              meshId: z.string().min(1).max(128),
              counterpartyMeshId: z.string().min(1).max(128).optional(),
              role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
              direction: z.enum([
                'buyer_to_superpeer',
                'superpeer_to_seller',
                'relay_path',
              ]),
              status: z.enum([
                'discovered',
                'opening',
                'open',
                'closing',
                'closed',
                'blocked',
              ]),
              superpeerKind: z.enum(['token', 'app']).optional(),
              rmeshBalance: z.number(),
              ethBalance: z.number(),
              capacityRmesh: z.number().optional(),
              meshAttachmentId: z.string().optional(),
              contractExists: z.boolean().optional(),
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
const ChannelOpenRequest = z
  .object({
    meshId: z.string().min(1).max(128),
    role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
    direction: z.enum([
      'buyer_to_superpeer',
      'superpeer_to_seller',
      'relay_path',
    ]),
    counterpartyMeshId: z.string().min(1).max(128),
    depositRmesh: z.number().gte(0).optional(),
    superpeerKind: z.enum(['token', 'app']).optional(),
    meshAttachmentId: z.string().optional(),
  })
  .passthrough();
const PaymentChannelResponse = z
  .object({
    data: z
      .object({
        channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
        meshId: z.string().min(1).max(128),
        counterpartyMeshId: z.string().min(1).max(128).optional(),
        role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
        direction: z.enum([
          'buyer_to_superpeer',
          'superpeer_to_seller',
          'relay_path',
        ]),
        status: z.enum([
          'discovered',
          'opening',
          'open',
          'closing',
          'closed',
          'blocked',
        ]),
        superpeerKind: z.enum(['token', 'app']).optional(),
        rmeshBalance: z.number(),
        ethBalance: z.number(),
        capacityRmesh: z.number().optional(),
        meshAttachmentId: z.string().optional(),
        contractExists: z.boolean().optional(),
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
const ChannelDiscoveryResult = z
  .object({
    meshId: z.string().min(1).max(128),
    existingChannels: z.array(
      z
        .object({
          channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
          meshId: z.string().min(1).max(128),
          counterpartyMeshId: z.string().min(1).max(128).optional(),
          role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
          direction: z.enum([
            'buyer_to_superpeer',
            'superpeer_to_seller',
            'relay_path',
          ]),
          status: z.enum([
            'discovered',
            'opening',
            'open',
            'closing',
            'closed',
            'blocked',
          ]),
          superpeerKind: z.enum(['token', 'app']).optional(),
          rmeshBalance: z.number(),
          ethBalance: z.number(),
          capacityRmesh: z.number().optional(),
          meshAttachmentId: z.string().optional(),
          contractExists: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    rmeshBalance: z.number(),
    ethBalance: z.number(),
    floatEligible: z.boolean().optional(),
  })
  .passthrough();
const ChannelDiscoveryResponse = z
  .object({
    data: z
      .object({
        meshId: z.string().min(1).max(128),
        existingChannels: z.array(
          z
            .object({
              channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
              meshId: z.string().min(1).max(128),
              counterpartyMeshId: z.string().min(1).max(128).optional(),
              role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
              direction: z.enum([
                'buyer_to_superpeer',
                'superpeer_to_seller',
                'relay_path',
              ]),
              status: z.enum([
                'discovered',
                'opening',
                'open',
                'closing',
                'closed',
                'blocked',
              ]),
              superpeerKind: z.enum(['token', 'app']).optional(),
              rmeshBalance: z.number(),
              ethBalance: z.number(),
              capacityRmesh: z.number().optional(),
              meshAttachmentId: z.string().optional(),
              contractExists: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        rmeshBalance: z.number(),
        ethBalance: z.number(),
        floatEligible: z.boolean().optional(),
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
const ChannelCloseRequest = z
  .object({ reason: z.string().max(500), force: z.boolean().default(false) })
  .partial()
  .passthrough();

export const schemas: any = {
  openPaymentChannel_Body,
  discoverPaymentChannels_Body,
  closePaymentChannel_Body,
  ChannelRole,
  ChannelStatus,
  Problem,
  ChannelId,
  MeshId,
  ChannelDirection,
  SuperpeerKind,
  PaymentChannel,
  ChannelListData,
  ResponseMeta,
  PaymentChannelListResponse,
  ChannelOpenRequest,
  PaymentChannelResponse,
  ChannelDiscoveryResult,
  ChannelDiscoveryResponse,
  ChannelCloseRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/channels',
    alias: 'listPaymentChannels',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'role',
        type: 'Query',
        schema: z.enum(['buyer', 'seller', 'superpeer', 'relay']).optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum([
            'discovered',
            'opening',
            'open',
            'closing',
            'closed',
            'blocked',
          ])
          .optional(),
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
            items: z.array(
              z
                .object({
                  channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  meshId: z.string().min(1).max(128),
                  counterpartyMeshId: z.string().min(1).max(128).optional(),
                  role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
                  direction: z.enum([
                    'buyer_to_superpeer',
                    'superpeer_to_seller',
                    'relay_path',
                  ]),
                  status: z.enum([
                    'discovered',
                    'opening',
                    'open',
                    'closing',
                    'closed',
                    'blocked',
                  ]),
                  superpeerKind: z.enum(['token', 'app']).optional(),
                  rmeshBalance: z.number(),
                  ethBalance: z.number(),
                  capacityRmesh: z.number().optional(),
                  meshAttachmentId: z.string().optional(),
                  contractExists: z.boolean().optional(),
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
    path: '/v1/channels',
    alias: 'openPaymentChannel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openPaymentChannel_Body,
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
            channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            meshId: z.string().min(1).max(128),
            counterpartyMeshId: z.string().min(1).max(128).optional(),
            role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
            direction: z.enum([
              'buyer_to_superpeer',
              'superpeer_to_seller',
              'relay_path',
            ]),
            status: z.enum([
              'discovered',
              'opening',
              'open',
              'closing',
              'closed',
              'blocked',
            ]),
            superpeerKind: z.enum(['token', 'app']).optional(),
            rmeshBalance: z.number(),
            ethBalance: z.number(),
            capacityRmesh: z.number().optional(),
            meshAttachmentId: z.string().optional(),
            contractExists: z.boolean().optional(),
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
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    path: '/v1/channels/:channelId',
    alias: 'getPaymentChannel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'channelId',
        type: 'Path',
        schema: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            meshId: z.string().min(1).max(128),
            counterpartyMeshId: z.string().min(1).max(128).optional(),
            role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
            direction: z.enum([
              'buyer_to_superpeer',
              'superpeer_to_seller',
              'relay_path',
            ]),
            status: z.enum([
              'discovered',
              'opening',
              'open',
              'closing',
              'closed',
              'blocked',
            ]),
            superpeerKind: z.enum(['token', 'app']).optional(),
            rmeshBalance: z.number(),
            ethBalance: z.number(),
            capacityRmesh: z.number().optional(),
            meshAttachmentId: z.string().optional(),
            contractExists: z.boolean().optional(),
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
    path: '/v1/channels/:channelId/close',
    alias: 'closePaymentChannel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: closePaymentChannel_Body,
      },
      {
        name: 'channelId',
        type: 'Path',
        schema: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            meshId: z.string().min(1).max(128),
            counterpartyMeshId: z.string().min(1).max(128).optional(),
            role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
            direction: z.enum([
              'buyer_to_superpeer',
              'superpeer_to_seller',
              'relay_path',
            ]),
            status: z.enum([
              'discovered',
              'opening',
              'open',
              'closing',
              'closed',
              'blocked',
            ]),
            superpeerKind: z.enum(['token', 'app']).optional(),
            rmeshBalance: z.number(),
            ethBalance: z.number(),
            capacityRmesh: z.number().optional(),
            meshAttachmentId: z.string().optional(),
            contractExists: z.boolean().optional(),
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
    path: '/v1/channels/discovery',
    alias: 'discoverPaymentChannels',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: discoverPaymentChannels_Body,
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
            meshId: z.string().min(1).max(128),
            existingChannels: z.array(
              z
                .object({
                  channelId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  meshId: z.string().min(1).max(128),
                  counterpartyMeshId: z.string().min(1).max(128).optional(),
                  role: z.enum(['buyer', 'seller', 'superpeer', 'relay']),
                  direction: z.enum([
                    'buyer_to_superpeer',
                    'superpeer_to_seller',
                    'relay_path',
                  ]),
                  status: z.enum([
                    'discovered',
                    'opening',
                    'open',
                    'closing',
                    'closed',
                    'blocked',
                  ]),
                  superpeerKind: z.enum(['token', 'app']).optional(),
                  rmeshBalance: z.number(),
                  ethBalance: z.number(),
                  capacityRmesh: z.number().optional(),
                  meshAttachmentId: z.string().optional(),
                  contractExists: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            rmeshBalance: z.number(),
            ethBalance: z.number(),
            floatEligible: z.boolean().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
