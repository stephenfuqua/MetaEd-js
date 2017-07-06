// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { DomainItem } from './DomainItem';
import type { SourceMap } from './SourceMap';
import type { Subdomain } from './Subdomain';
import type { ModelBase } from './ModelBase';

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

export function newDomain(): Domain {
  return Object.assign(new Domain(), newTopLevelEntity(), {
    type: 'domain',
    typeHumanizedName: 'Domain',
    domainItems: [],
    entities: [],
    footerDocumentation: '',
    subdomains: [],
    sourceMap: new DomainSourceMap(),
  });
}

export const NoDomain: Domain = Object.assign(newDomain(), {
  metaEdName: 'NoDomain',
});

export const asDomain = (x: ModelBase): Domain => ((x: any): Domain);
export const asDomainBase = (x: ModelBase): Domain | Subdomain => ((x: any): Domain | Subdomain);
