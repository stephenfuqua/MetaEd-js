// !cols is a special excel property that holds the column width in pixels
export interface Worksheet {
  name: string;
  rows: any[];
  '!cols': any[] | null;
}

export function newWorksheet(name: string): Worksheet {
  return {
    name,
    rows: [],
    '!cols': [],
  };
}
