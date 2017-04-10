// @flow
import type { ParserRuleContext } from 'antlr4/ParserRuleContext';
import type { NamespaceInfo } from './NamespaceInfo';
import type { ModelType } from './ModelType';

export type SourceMap = {
  line: number;
  column: number;
  length: number;
}

export function sourceMapFrom(context: ParserRuleContext): SourceMap {
  return {
    line: context.start.line,
    column: context.start.column,
    length: context.getText().length,
  };
}

export class ModelBaseSourceMap {
  type: ?SourceMap;
  documentation: ?SourceMap;
  metaEdName: ?SourceMap;
  metaEdId: ?SourceMap;
  namespaceInfo: ?SourceMap;
}

export class ModelBase {
  type: ModelType;
  documentation: string;
  metaEdName: string;
  metaEdId: string;
  namespaceInfo: NamespaceInfo;
}
