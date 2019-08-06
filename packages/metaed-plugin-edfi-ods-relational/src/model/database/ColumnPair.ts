/** A matching pair of columns in a foreign key relationship */
export interface ColumnPair {
  /** The id of the column on the table that owns the foreign key */
  parentTableColumnId: string;
  /** The id of the column on the target table of a foreign key */
  foreignTableColumnId: string;
}

export function newColumnPair(): ColumnPair {
  return {
    parentTableColumnId: '',
    foreignTableColumnId: '',
  };
}
