/**
 * Staking Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/staking.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FloatAlert = components["schemas"]["FloatAlert"];
export type FloatAlertListData = components["schemas"]["FloatAlertListData"];
export type FloatAlertSeverity = components["schemas"]["FloatAlertSeverity"];
export type StakingAccount = components["schemas"]["StakingAccount"];
export type StakingAccountId = components["schemas"]["StakingAccountId"];
export type PauseOffersRequest = components["schemas"]["PauseOffersRequest"];
export type TopUpRequest = components["schemas"]["TopUpRequest"];
export type Alert = operations["listFloatAlerts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordStakingTopUpRequestInput = NonNullable<operations["recordStakingTopUp"]["requestBody"]>["content"]["application/json"];
export type PauseNewChannelOffersRequestInput = NonNullable<operations["pauseNewChannelOffers"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetStakingAccountParams = operations["getStakingAccount"]["parameters"]["path"];
export type RecordStakingTopUpParams = operations["recordStakingTopUp"]["parameters"]["path"];
export type PauseNewChannelOffersParams = operations["pauseNewChannelOffers"]["parameters"]["path"];
export type ListFloatAlertsParams = operations["listFloatAlerts"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetStakingAccountResponse = operations["getStakingAccount"]["responses"]["200"]["content"]["application/json"];
export type RecordStakingTopUpResponse = operations["recordStakingTopUp"]["responses"]["200"]["content"]["application/json"];
export type PauseNewChannelOffersResponse = operations["pauseNewChannelOffers"]["responses"]["200"]["content"]["application/json"];
export type ListFloatAlertsResponse = operations["listFloatAlerts"]["responses"]["200"]["content"]["application/json"];


