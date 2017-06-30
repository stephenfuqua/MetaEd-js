// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import { DomainItem } from './DomainItem';
import type { SourceMap } from './SourceMap';
import { Subdomain } from './Subdomain';

export class DomainSourceMap extends TopLevelEntitySourceMap {
  domainItems: Array<SourceMap>;
  entities: Array<SourceMap>;
  footerDocumentation: ?SourceMap;
  subdomains: Array<SourceMap>;

  constructor() {
    super();
    this.domainItems = [];
    this.entities = [];
    this.subdomains = [];
  }
}

export class Domain extends TopLevelEntity {
  domainItems: Array<DomainItem>;
  entities: Array<TopLevelEntity>;
  footerDocumentation: string;
  subdomains: Array<Subdomain>;
  sourceMap: TopLevelEntitySourceMap | DomainSourceMap;
}

export function domainFactory(): Domain {
  return Object.assign(new Domain(), defaultTopLevelEntity(), {
    type: 'domain',
    typeHumanizedName: 'Domain',
    domainItems: [],
    entities: [],
    footerDocumentation: '',
    subdomains: [],
    sourceMap: new DomainSourceMap(),
  });
}

export const NoDomain: Domain = Object.assign(domainFactory(), {
  metaEdName: 'NoDomain',
});

export const asDomain = (x: TopLevelEntity): Domain => ((x: any): Domain);
