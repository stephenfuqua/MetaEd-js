// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class DomainEntityExtensionSourceMap extends TopLevelEntitySourceMap {}

export class DomainEntityExtension extends TopLevelEntity {
  sourceMap: DomainEntityExtensionSourceMap;
}

export function domainEntityExtensionFactory(): DomainEntityExtension {
  return Object.assign(new DomainEntityExtension(), defaultTopLevelEntity(), {
    type: 'domainEntityExtension',
    typeGroupHumanizedName: 'domain entity extension',
    sourceMap: new DomainEntityExtensionSourceMap(),
  });
}
