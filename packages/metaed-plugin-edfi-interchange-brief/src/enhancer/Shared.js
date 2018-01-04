// @flow

const newlineRegex = /\r\n|\r|\n/g;

export function escapeForMarkdownTableContent(s: string): string {
  let result = s;
  if (!result) return result;
  result = result.replace('|', '\\|');
  return result.replace(newlineRegex, '<br/>');
}

export function escapeForMarkdownNewLine(s: string): string {
  return s.replace(newlineRegex, '$&$&'); // $& means the whole matched string
}
