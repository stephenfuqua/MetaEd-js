// @flow
function quoteCorrection(rawDocumentation: string): string {
  return rawDocumentation.substr(1, rawDocumentation.length - 2).replace('""', '"');
}

export function squareBracketRemoval(metaEdIdWithBrackets: string) {
  return metaEdIdWithBrackets.substr(1, metaEdIdWithBrackets.length - 2);
}

function extractText(contextWithText: any): string {
  if (contextWithText.TEXT() == null || contextWithText.TEXT().exception != null) {
    return '';
  }
  return quoteCorrection(contextWithText.TEXT().getText());
}

export const extractShortDescription = extractText;
export const extractDocumentation = extractText;
