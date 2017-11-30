// @flow
export function escapeForMarkdownTableContent(s: string): string {
  let result = s;
  if (!result) return result;
  result = result.replace('|', '\\|');
  result = result.replace('\r\n', '<br/>');
  result = result.replace('\n', '<br/>');
  result = result.replace('\r', '<br/>');
  return result;
}
