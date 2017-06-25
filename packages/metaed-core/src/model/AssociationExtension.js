// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class AssociationExtensionSourceMap extends TopLevelEntitySourceMap {}

export class AssociationExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | AssociationExtensionSourceMap;
}

export function associationExtensionFactory(): AssociationExtension {
  return Object.assign(new AssociationExtension(), defaultTopLevelEntity(), {
    type: 'associationExtension',
    typeHumanizedName: 'Association Extension',
    sourceMap: new AssociationExtensionSourceMap(),
  });
}

export const asAssociationExtension = (x: ModelBase): AssociationExtension => ((x: any): AssociationExtension);
