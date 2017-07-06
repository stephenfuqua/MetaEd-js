// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, newTopLevelEntity } from './TopLevelEntity';
import type { ModelBase } from './ModelBase';

export class AssociationSubclassSourceMap extends TopLevelEntitySourceMap {}

export class AssociationSubclass extends TopLevelEntity {
  sourceMap: TopLevelEntitySourceMap | AssociationSubclassSourceMap;
}

export function newAssociationSubclass(): AssociationSubclass {
  return Object.assign(new AssociationSubclass(), newTopLevelEntity(), {
    type: 'associationSubclass',
    typeHumanizedName: 'Association Subclass',
    sourceMap: new AssociationSubclassSourceMap(),
  });
}

export const asAssociationSubclass = (x: ModelBase): AssociationSubclass => ((x: any): AssociationSubclass);
