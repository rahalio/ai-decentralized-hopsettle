/**
 * Topology Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/topology.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type GatewayHealth = components["schemas"]["GatewayHealth"];
export type MeshAttachment = components["schemas"]["MeshAttachment"];
export type MeshAttachmentId = components["schemas"]["MeshAttachmentId"];
export type MeshAttachmentListData = components["schemas"]["MeshAttachmentListData"];
export type MeshRole = components["schemas"]["MeshRole"];
export type QuarantineListData = components["schemas"]["QuarantineListData"];
export type QuarantineRecord = components["schemas"]["QuarantineRecord"];
export type QuarantineStatus = components["schemas"]["QuarantineStatus"];
export type TopologyNode = components["schemas"]["TopologyNode"];
export type TopologySnapshot = components["schemas"]["TopologySnapshot"];
export type QuarantineActionRequest = components["schemas"]["QuarantineActionRequest"];
export type Attachment = operations["listMeshAttachments"]["responses"]["200"]["content"]["application/json"]["data"];
export type Quarantine = operations["listQuarantineRecords"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type QuarantineMeshNodeRequestInput = NonNullable<operations["quarantineMeshNode"]["requestBody"]>["content"]["application/json"];
export type ReleaseQuarantineRequestInput = NonNullable<operations["releaseQuarantine"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetTopologySnapshotParams = NonNullable<operations["getTopologySnapshot"]["parameters"]["query"]>;
export type QuarantineMeshNodeParams = operations["quarantineMeshNode"]["parameters"]["path"];
export type ReleaseQuarantineParams = operations["releaseQuarantine"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMeshAttachmentsResponse = operations["listMeshAttachments"]["responses"]["200"]["content"]["application/json"];
export type GetTopologySnapshotResponse = operations["getTopologySnapshot"]["responses"]["200"]["content"]["application/json"];
export type ListQuarantineRecordsResponse = operations["listQuarantineRecords"]["responses"]["200"]["content"]["application/json"];
export type QuarantineMeshNodeResponse = operations["quarantineMeshNode"]["responses"]["200"]["content"]["application/json"];
export type ReleaseQuarantineResponse = operations["releaseQuarantine"]["responses"]["200"]["content"]["application/json"];


