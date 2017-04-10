// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class CommonExtensionSourceMap extends TopLevelEntitySourceMap {}

export class CommonExtension extends TopLevelEntity {
  sourceMap: CommonExtensionSourceMap;
}

export function commonExtensionFactory(): CommonExtension {
  return Object.assign(new CommonExtension(), defaultTopLevelEntity(), {
    type: 'commonExtension',
    typeGroupHumanizedName: 'common extension',
    sourceMap: new CommonExtensionSourceMap(),
  });
}
