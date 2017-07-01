// @flow
import type { SourceMap } from './SourceMap';
import { ModelBase, ModelBaseSourceMap } from './ModelBase';

export class DecimalTypeSourceMap extends ModelBaseSourceMap {
  documentationInherited: ?SourceMap;
  totalDigits: ?SourceMap;
  decimalPlaces: ?SourceMap;
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class DecimalType extends ModelBase {
  generatedSimpleType: boolean;
  documentationInherited: boolean;
  typeHumanizedName: string;
  totalDigits: string;
  decimalPlaces: string;
  minValue: string;
  maxValue: string;
  sourceMap: DecimalTypeSourceMap;
}

export function decimalTypeFactory(): DecimalType {
  return Object.assign(new DecimalType(), {
    type: 'decimalType',
    typeHumanizedName: 'Decimal Type',
    totalDigits: '',
    decimalPlaces: '',
    minValue: '',
    maxValue: '',
    sourceMap: new DecimalTypeSourceMap(),
  });
}

export const NoDecimalType: DecimalType = Object.assign(decimalTypeFactory(), {
  metaEdName: 'NoDecimalType',
});
