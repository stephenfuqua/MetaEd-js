import { DbType } from './DbType';

export interface ApiPropertyType {
  dbType: DbType;
  maxLength: number;
  precision: number;
  scale: number;
  isNullable: boolean;
}
