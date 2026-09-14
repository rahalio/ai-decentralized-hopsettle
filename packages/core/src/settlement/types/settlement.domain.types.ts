/**
 * Settlement Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/settlement.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type SettlementLineItem = components["schemas"]["SettlementLineItem"];
export type SettlementLineKind = components["schemas"]["SettlementLineKind"];
export type SettlementStatement = components["schemas"]["SettlementStatement"];
export type SettlementStatementId = components["schemas"]["SettlementStatementId"];
export type SettlementStatementListData = components["schemas"]["SettlementStatementListData"];
export type Statement = operations["listSettlementStatements"]["responses"]["200"]["content"]["application/json"]["data"];
export type Export = operations["exportSettlementStatement"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSettlementStatementsParams = NonNullable<operations["listSettlementStatements"]["parameters"]["query"]>;
export type GetSettlementStatementParams = operations["getSettlementStatement"]["parameters"]["path"];
export type ExportSettlementStatementParams = operations["exportSettlementStatement"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSettlementStatementsResponse = operations["listSettlementStatements"]["responses"]["200"]["content"]["application/json"];
export type GetSettlementStatementResponse = operations["getSettlementStatement"]["responses"]["200"]["content"]["application/json"];
export type ExportSettlementStatementResponse = operations["exportSettlementStatement"]["responses"]["200"]["content"]["application/json"];


