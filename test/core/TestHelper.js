// @flow
import antlr4 from 'antlr4';

import { MetaEdGrammar } from '../../src/grammar/gen/MetaEdGrammar';
import type { MetaEdGrammarListener } from '../../src/grammar/gen/MetaEdGrammarListener';
import { BaseLexer } from '../../src/grammar/gen/BaseLexer';
import type { Repository } from '../../src/core/model/Repository';
import { DomainEntity, NoDomainEntity } from '../../src/core/model/DomainEntity';

class TestErrorListener {
  errorMessages: string[];

  constructor() {
    antlr4.error.ErrorListener.call(this);
    this.errorMessages = [];
  }

  syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, message: string) {
    const tokenText = offendingSymbol && offendingSymbol.text ? offendingSymbol.text : '';
    this.errorMessages.push(`${message}, column: ${column}, line: ${line}, token: ${tokenText}`);
  }
}

export function listen(metaEdText: string, listener: MetaEdGrammarListener): string[] {
  const testErrorListener = new TestErrorListener();
  const lexer = new BaseLexer(new antlr4.InputStream(metaEdText));
  const parser = new MetaEdGrammar(new antlr4.CommonTokenStream(lexer, undefined));
  lexer.removeErrorListeners();
  lexer.addErrorListener(testErrorListener);
  parser.removeErrorListeners();
  parser.addErrorListener(testErrorListener);
  const parserContext = parser.metaEd();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, parserContext);
  return testErrorListener.errorMessages;
}

export function domainEntityFrom(repository: Repository, metaEdName: string): DomainEntity {
  const result = repository.entity.domainEntity.get(metaEdName);
  return result || NoDomainEntity;
}

