// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class DomainEntityExtensionSourceMap extends TopLevelEntitySourceMap {}

export class DomainEntityExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | DomainEntityExtensionSourceMap;
}

export function newDomainEntityExtension(): DomainEntityExtension {
  return Object.assign(new DomainEntityExtension(), newTopLevelEntity(), {
    type: 'domainEntityExtension',
    typeHumanizedName: 'Domain Entity Extension',
    sourceMap: new DomainEntityExtensionSourceMap(),
  });
}

export const asDomainEntityExtension = (x: ModelBase): DomainEntityExtension => ((x: any): DomainEntityExtension);
