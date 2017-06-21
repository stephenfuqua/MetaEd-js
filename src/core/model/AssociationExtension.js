// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class AssociationExtensionSourceMap extends TopLevelEntitySourceMap {}

export class AssociationExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | AssociationExtensionSourceMap;
}

export function associationExtensionFactory(): AssociationExtension {
  return Object.assign(new AssociationExtension(), defaultTopLevelEntity(), {
    type: 'associationExtension',
    typeGroupHumanizedName: 'Association Extension',
    sourceMap: new AssociationExtensionSourceMap(),
  });
}
