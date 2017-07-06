// @flow
import { Domain, newDomain } from './Domain';
import type { SourceMap } from './SourceMap';
import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { DomainItem } from './DomainItem';
import { ModelBase } from './ModelBase';

export class SubdomainSourceMap extends TopLevelEntitySourceMap {
  domainItems: Array<SourceMap>;
  entities: Array<SourceMap>;
  parent: ?SourceMap;
  parentMetaEdName: ?SourceMap;
  position: ?SourceMap;

  constructor() {
    super();
    this.domainItems = [];
    this.entities = [];
  }
}

export class Subdomain extends TopLevelEntity {
  domainItems: Array<DomainItem>;
  entities: Array<TopLevelEntity>;
  parent: Domain;
  parentMetaEdName: string;
  position: number;
  sourceMap: TopLevelEntitySourceMap | SubdomainSourceMap;
}

export function newSubdomain(): Subdomain {
  return Object.assign(new Subdomain(), {
    type: 'subdomain',
    typeHumanizedName: 'Subdomain',
    domainItems: [],
    entities: [],
    parent: newDomain(),
    parentMetaEdName: '',
    position: 0,
    sourceMap: new SubdomainSourceMap(),
  });
}

export const asSubdomain = (x: ModelBase): Subdomain => ((x: any): Subdomain);
