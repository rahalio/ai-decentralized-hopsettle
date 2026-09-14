/**
 * Channels Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/channels.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChannelDirection = components["schemas"]["ChannelDirection"];
export type ChannelDiscoveryResult = components["schemas"]["ChannelDiscoveryResult"];
export type ChannelId = components["schemas"]["ChannelId"];
export type ChannelListData = components["schemas"]["ChannelListData"];
export type ChannelRole = components["schemas"]["ChannelRole"];
export type ChannelStatus = components["schemas"]["ChannelStatus"];
export type MeshId = components["schemas"]["MeshId"];
export type PaymentChannel = components["schemas"]["PaymentChannel"];
export type SuperpeerKind = components["schemas"]["SuperpeerKind"];
export type ChannelCloseRequest = components["schemas"]["ChannelCloseRequest"];
export type ChannelOpenRequest = components["schemas"]["ChannelOpenRequest"];
export type Channel = operations["listPaymentChannels"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenPaymentChannelRequestInput = NonNullable<operations["openPaymentChannel"]["requestBody"]>["content"]["application/json"];
export type DiscoverPaymentChannelsRequestInput = NonNullable<operations["discoverPaymentChannels"]["requestBody"]>["content"]["application/json"];
export type ClosePaymentChannelRequestInput = NonNullable<operations["closePaymentChannel"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPaymentChannelsParams = NonNullable<operations["listPaymentChannels"]["parameters"]["query"]>;
export type GetPaymentChannelParams = operations["getPaymentChannel"]["parameters"]["path"];
export type ClosePaymentChannelParams = operations["closePaymentChannel"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPaymentChannelsResponse = operations["listPaymentChannels"]["responses"]["200"]["content"]["application/json"];
export type OpenPaymentChannelResponse = operations["openPaymentChannel"]["responses"]["201"]["content"]["application/json"];
export type DiscoverPaymentChannelsResponse = operations["discoverPaymentChannels"]["responses"]["200"]["content"]["application/json"];
export type GetPaymentChannelResponse = operations["getPaymentChannel"]["responses"]["200"]["content"]["application/json"];
export type ClosePaymentChannelResponse = operations["closePaymentChannel"]["responses"]["202"]["content"]["application/json"];


