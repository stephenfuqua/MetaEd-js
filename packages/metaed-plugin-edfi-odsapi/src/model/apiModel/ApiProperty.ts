import { ApiPropertyType } from './ApiPropertyType';

export type ApiProperty = {
  propertyName: string;
  propertyType: ApiPropertyType;
  description: string;
  isIdentifying: boolean;
  isServerAssigned: boolean;
};
