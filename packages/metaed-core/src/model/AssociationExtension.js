// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class AssociationExtensionSourceMap extends TopLevelEntitySourceMap {}

export class AssociationExtension extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | AssociationExtensionSourceMap;
}

export function newAssociationExtension(): AssociationExtension {
  return Object.assign(new AssociationExtension(), newTopLevelEntity(), {
    type: 'associationExtension',
    typeHumanizedName: 'Association Extension',
    sourceMap: new AssociationExtensionSourceMap(),
  });
}

export const asAssociationExtension = (x: ModelBase): AssociationExtension => ((x: any): AssociationExtension);
