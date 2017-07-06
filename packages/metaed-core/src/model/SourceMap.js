// @flow
import R from 'ramda';
import type { ParserRuleContext } from 'antlr4/ParserRuleContext';

export type SourceMap = {
  line: number,
  column: number,
  tokenText: string,
}

export function newSourceMap(): SourceMap {
  return {
    line: 0,
    column: 0,
    tokenText: 'unknown',
  };
}

export const NoSourceMap: SourceMap = Object.assign(newSourceMap(), {
  tokenText: 'NoSourceMap',
});

const memoizedSourceMapFactory =
  R.memoize((line: number, column: number, tokenText: string): SourceMap => ({ line, column, tokenText }));

export function sourceMapFrom(context: ParserRuleContext): SourceMap {
  if (context.exception || context.start == null) return NoSourceMap;
  return memoizedSourceMapFactory(context.start.line, context.start.column, context.start.text == null ? '' : context.start.text);
}
