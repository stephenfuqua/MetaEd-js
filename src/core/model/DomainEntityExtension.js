// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class DomainEntityExtensionSourceMap extends TopLevelEntitySourceMap {}

export class DomainEntityExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | DomainEntityExtensionSourceMap;
}

export function domainEntityExtensionFactory(): DomainEntityExtension {
  return Object.assign(new DomainEntityExtension(), defaultTopLevelEntity(), {
    type: 'domainEntityExtension',
    typeHumanizedName: 'Domain Entity Extension',
    sourceMap: new DomainEntityExtensionSourceMap(),
  });
}
