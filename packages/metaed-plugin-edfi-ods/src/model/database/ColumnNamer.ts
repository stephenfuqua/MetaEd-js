import { appendOverlapping } from '../../enhancer/table/TableNaming';

export type ColumnNamer = () => string;

export function defaultColumnNamer(parentContext: string, roleName: string, baseName: string): () => string {
  return () => appendOverlapping(parentContext, appendOverlapping(roleName, baseName));
}

export function roleNameIgnoringColumnNamer(parentContext: string, baseName: string): () => string {
  return () => appendOverlapping(parentContext, baseName);
}
