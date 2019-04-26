export function prependroleNameToMetaEdName(metaEdName: string, roleName: string) {
  return roleName + metaEdName;
}

export function escapeSqlSingleQuote(string: string): string {
  return string.replace(/'/g, "''");
}
