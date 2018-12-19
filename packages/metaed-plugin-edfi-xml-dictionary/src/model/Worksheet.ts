// !cols is a special excel property that holds the column width in pixels
export type Worksheet = {
  name: string;
  rows: Array<any>;
  '!cols': Array<any> | null;
};

export function newWorksheet(name: string): Worksheet {
  return {
    name,
    rows: [],
    '!cols': [],
  };
}
