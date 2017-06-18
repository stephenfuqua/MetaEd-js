// @flow
import { Domain, domainFactory } from './Domain';
import type { SourceMap } from './SourceMap';
import { TopLevelEntity } from './TopLevelEntity';
import { DomainItem } from './DomainItem';

export class SubdomainSourceMap {
  type: ?SourceMap;
  domainItems: ?Array<SourceMap>;
  entities: ?Array<SourceMap>;
  footerDocumentation: ?SourceMap;
  parent: ?SourceMap;
  parentMetaEdName: ?SourceMap;
  position: ?SourceMap;
}

export class Subdomain extends TopLevelEntity {
  domainItems: Array<DomainItem>;
  entities: Array<TopLevelEntity>;
  footerDocumentation: string;
  parent: Domain;
  parentMetaEdName: string;
  position: number;
  sourceMap: SubdomainSourceMap;
}

export function subdomainFactory(): Subdomain {
  return Object.assign(new Subdomain(), {
    type: 'subdomain',
    typeGroupHumanizedName: 'Subdomain',
    domainItems: [],
    entities: [],
    footerDocumentation: '',
    parent: domainFactory(),
    parentMetaEdName: '',
    position: 0,
    sourceMap: new SubdomainSourceMap(),
  });
}
