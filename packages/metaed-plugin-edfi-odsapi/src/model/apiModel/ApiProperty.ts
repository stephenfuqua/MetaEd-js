import { ApiPropertyType } from './ApiPropertyType';
import { PhysicalNames } from './PhysicalNames';

export interface ApiProperty {
  propertyName: string;
  propertyType: ApiPropertyType;
  columnNames?: PhysicalNames;
  description: string;
  isIdentifying: boolean;
  isServerAssigned: boolean;
  isDeprecated?: boolean;
  deprecationReasons?: string[];
}
