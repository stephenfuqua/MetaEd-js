// @flow
import { TopLevelEntity, TopLevelEntitySourceMap, defaultTopLevelEntity } from './TopLevelEntity';

export class AssociationSourceMap extends TopLevelEntitySourceMap {}

export class Association extends TopLevelEntity {
  sourceMap: AssociationSourceMap;
}

export function associationFactory(): Association {
  return Object.assign(new Association(), defaultTopLevelEntity(), {
    type: 'association',
    typeGroupHumanizedName: 'association',
    sourceMap: new AssociationSourceMap(),
  });
}
