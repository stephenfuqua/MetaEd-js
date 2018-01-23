// @flow
import type { DbType } from './DbType';

export type ApiPropertyType = {
  dbType: DbType,
  maxLength: number,
  precision: number,
  scale: number,
  isNullable: boolean,
};
