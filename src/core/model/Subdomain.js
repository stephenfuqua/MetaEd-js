// @flow
import { Domain, domainFactory } from './Domain';
import type { SourceMap } from './SourceMap';
import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { DomainItem } from './DomainItem';

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

export function subdomainFactory(): Subdomain {
  return Object.assign(new Subdomain(), {
    type: 'subdomain',
    typeHumanizedName: 'Subdomain',
    domainItems: [],
    entities: [],
    parent: domainFactory(),
    parentMetaEdName: '',
    position: 0,
    sourceMap: new SubdomainSourceMap(),
  });
}
