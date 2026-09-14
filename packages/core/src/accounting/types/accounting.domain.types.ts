/**
 * Accounting Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/accounting.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AccountingEntryId = components["schemas"]["AccountingEntryId"];
export type AccountingEntryListData = components["schemas"]["AccountingEntryListData"];
export type PacketAccountingEntry = components["schemas"]["PacketAccountingEntry"];
export type PacketAccountingEntryIngest = components["schemas"]["PacketAccountingEntryIngest"];
export type PacketType = components["schemas"]["PacketType"];
export type ReconcileStatus = components["schemas"]["ReconcileStatus"];
export type MarkReviewedRequest = components["schemas"]["MarkReviewedRequest"];
export type AccountingEntry = operations["listAccountingEntries"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IngestAccountingEntryRequestInput = NonNullable<operations["ingestAccountingEntry"]["requestBody"]>["content"]["application/json"];
export type MarkAccountingEntryReviewedRequestInput = NonNullable<operations["markAccountingEntryReviewed"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAccountingEntriesParams = NonNullable<operations["listAccountingEntries"]["parameters"]["query"]>;
export type MarkAccountingEntryReviewedParams = operations["markAccountingEntryReviewed"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAccountingEntriesResponse = operations["listAccountingEntries"]["responses"]["200"]["content"]["application/json"];
export type IngestAccountingEntryResponse = operations["ingestAccountingEntry"]["responses"]["201"]["content"]["application/json"];
export type MarkAccountingEntryReviewedResponse = operations["markAccountingEntryReviewed"]["responses"]["200"]["content"]["application/json"];


