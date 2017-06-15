// @flow
import type { ParserRuleContext } from 'antlr4/ParserRuleContext';

export type SourceMap = {
  line: number;
  column: number;
  tokenText: string;
}

export function sourceMapFrom(context: ParserRuleContext): SourceMap {
  if (context.start == null) {
    return {
      line: 0,
      column: 0,
      tokenText: '',
    };
  }

  return {
    line: context.start.line,
    column: context.start.column,
    tokenText: context.start.text == null ? '' : context.start.text,
  };
}
