import { newDomain } from './Domain';
import { Domain } from './Domain';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { DomainItem } from './DomainItem';
import { ModelBase } from './ModelBase';

export interface SubdomainSourceMap extends TopLevelEntitySourceMap {
  domainItems: Array<SourceMap>;
  entities: Array<SourceMap>;
  parent: SourceMap;
  parentMetaEdName: SourceMap;
  position: SourceMap;
}

/**
 *
 */
export function newSubdomainSourceMap(): SubdomainSourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    domainItems: [],
    entities: [],
    parent: NoSourceMap,
    parentMetaEdName: NoSourceMap,
    position: NoSourceMap,
  };
}

export interface Subdomain extends TopLevelEntity {
  sourceMap: SubdomainSourceMap;
  domainItems: Array<DomainItem>;
  entities: Array<TopLevelEntity>;
  parent: Domain;
  parentMetaEdName: string;
  position: number;
}

/**
 *
 */
export function newSubdomain(): Subdomain {
  return {
    ...newTopLevelEntity(),
    type: 'subdomain',
    typeHumanizedName: 'Subdomain',
    domainItems: [],
    entities: [],
    parent: newDomain(),
    parentMetaEdName: '',
    position: 0,
    sourceMap: newSubdomainSourceMap(),
  };
}

/**
 *
 */
export const asSubdomain = (x: ModelBase): Subdomain => x as Subdomain;
