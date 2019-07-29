import { ApiPropertyType } from './ApiPropertyType';

export interface ApiProperty {
  propertyName: string;
  propertyType: ApiPropertyType;
  description: string;
  isIdentifying: boolean;
  isServerAssigned: boolean;
  isDeprecated?: boolean;
  deprecationReasons?: string[];
}
