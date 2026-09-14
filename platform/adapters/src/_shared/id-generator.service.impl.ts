/**
 * ID Generator Service Implementation — Hopsettle prefixes.
 */

import type { DomainCode } from '@hopsettle/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@hopsettle/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@hopsettle/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  chnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.channels);
  }
  acctId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.accounting);
  }
  prcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pricing);
  }
  stkId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.staking);
  }
  stlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.settlement);
  }
  rptId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reporting);
  }
  dspId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disputes);
  }
  topoId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.topology);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
