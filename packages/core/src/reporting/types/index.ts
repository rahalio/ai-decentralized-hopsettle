/**
 * Reporting Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/reporting.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChannelReconciliationReport = components["schemas"]["ChannelReconciliationReport"];
export type RelayAttributionReport = components["schemas"]["RelayAttributionReport"];
export type RelayAttributionRow = components["schemas"]["RelayAttributionRow"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetChannelReconciliationReportParams = NonNullable<operations["getChannelReconciliationReport"]["parameters"]["query"]>;
export type GetRelayAttributionReportParams = NonNullable<operations["getRelayAttributionReport"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetChannelReconciliationReportResponse = operations["getChannelReconciliationReport"]["responses"]["200"]["content"]["application/json"];
export type GetRelayAttributionReportResponse = operations["getRelayAttributionReport"]["responses"]["200"]["content"]["application/json"];


