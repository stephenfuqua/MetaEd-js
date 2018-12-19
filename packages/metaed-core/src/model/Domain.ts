import deepFreeze from 'deep-freeze';
import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { DomainItem } from './DomainItem';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { Subdomain } from './Subdomain';
import { ModelBase } from './ModelBase';

export interface DomainSourceMap extends TopLevelEntitySourceMap {
  domainItems: Array<SourceMap>;
  entities: Array<SourceMap>;
  footerDocumentation: SourceMap;
  subdomains: Array<SourceMap>;
}

/**
 *
 */
export function newDomainSourceMap(): DomainSourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    domainItems: [],
    entities: [],
    footerDocumentation: NoSourceMap,
    subdomains: [],
  };
}

export interface Domain extends TopLevelEntity {
  sourceMap: DomainSourceMap;
  domainItems: Array<DomainItem>;
  entities: Array<TopLevelEntity>;
  footerDocumentation: string;
  subdomains: Array<Subdomain>;
}

/**
 *
 */
export function newDomain(): Domain {
  return {
    ...newTopLevelEntity(),
    type: 'domain',
    typeHumanizedName: 'Domain',
    domainItems: [],
    entities: [],
    footerDocumentation: '',
    subdomains: [],
    sourceMap: newDomainSourceMap(),
  };
}

/**
 *
 */
export const NoDomain: Domain = deepFreeze({
  ...newDomain(),
  metaEdName: 'NoDomain',
});

/**
 *
 */
export const asDomain = (x: ModelBase): Domain => x as Domain;

/**
 *
 */
export const asDomainBase = (x: ModelBase): Domain | Subdomain => x as Domain | Subdomain;
