// @flow
export type Row = {
  header: Array<string>;
  values: Array<string>;
}
export function setRow(row: Row, name: string, value: string) {
  row.header.push(name);
  row.values.push(value);
}
export function newRow(): Row {
  return {
    header: [],
    values: [],
  };
}
export function createRow(row: Row): Object {
  if (row.header.length !== row.values.length) return {};
  const value = {};
  row.values.forEach((col, index) => { value[row.header[index]] = col; });
  return value;
}
