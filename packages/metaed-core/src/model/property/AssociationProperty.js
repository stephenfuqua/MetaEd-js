// @flow
import { ReferentialProperty, ReferentialPropertySourceMap, newReferentialProperty } from './ReferentialProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityProperty, EntityPropertySourceMap } from './EntityProperty';

export class AssociationPropertySourceMap extends ReferentialPropertySourceMap {
  isWeak: ?SourceMap;
}

export class AssociationProperty extends ReferentialProperty {
  isWeak: boolean;
  sourceMap: EntityPropertySourceMap | ReferentialPropertySourceMap | AssociationPropertySourceMap;
}

export function newAssociationProperty(): AssociationProperty {
  return Object.assign(new AssociationProperty(), newReferentialProperty(), {
    type: 'association',
    isWeak: false,
    sourceMap: new AssociationPropertySourceMap(),
  });
}

export const asAssociationProperty = (x: EntityProperty): AssociationProperty => ((x: any): AssociationProperty);
