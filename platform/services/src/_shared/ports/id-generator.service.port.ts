/**
 * IdGeneratorService Port — Hopsettle domain prefixes.
 */

import type { DomainCode } from '@hopsettle/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  chnId(): string;
  acctId(): string;
  prcId(): string;
  stkId(): string;
  stlId(): string;
  rptId(): string;
  dspId(): string;
  topoId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
