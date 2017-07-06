// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class AssociationSourceMap extends TopLevelEntitySourceMap {}

export class Association extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | AssociationSourceMap;
}

export function newAssociation(): Association {
  return Object.assign(new Association(), newTopLevelEntity(), {
    type: 'association',
    typeHumanizedName: 'Association',
    sourceMap: new AssociationSourceMap(),
  });
}

export const asAssociation = (x: ModelBase): Association => ((x: any): Association);
