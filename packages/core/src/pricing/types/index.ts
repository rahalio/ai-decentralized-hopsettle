/**
 * Pricing Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/pricing.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PathChargePreview = components["schemas"]["PathChargePreview"];
export type PricingPolicy = components["schemas"]["PricingPolicy"];
export type PricingPolicyCreate = components["schemas"]["PricingPolicyCreate"];
export type PricingPolicyId = components["schemas"]["PricingPolicyId"];
export type PricingPolicyListData = components["schemas"]["PricingPolicyListData"];
export type PricingPolicyStatus = components["schemas"]["PricingPolicyStatus"];
export type PricingRole = components["schemas"]["PricingRole"];
export type PricingUnit = components["schemas"]["PricingUnit"];
export type PathChargePreviewRequest = components["schemas"]["PathChargePreviewRequest"];
export type Policy = operations["listPricingPolicies"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePricingPolicyRequestInput = NonNullable<operations["createPricingPolicy"]["requestBody"]>["content"]["application/json"];
export type PreviewPathChargesRequestInput = NonNullable<operations["previewPathCharges"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPricingPoliciesParams = NonNullable<operations["listPricingPolicies"]["parameters"]["query"]>;
export type GetPricingPolicyParams = operations["getPricingPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPricingPoliciesResponse = operations["listPricingPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreatePricingPolicyResponse = operations["createPricingPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetPricingPolicyResponse = operations["getPricingPolicy"]["responses"]["200"]["content"]["application/json"];
export type PreviewPathChargesResponse = operations["previewPathCharges"]["responses"]["200"]["content"]["application/json"];


