import antlr4 from 'antlr4';
import BaseLexer from './gen/BaseLexer';
import MetaEdGrammar from './gen/MetaEdGrammar';
import { BailErrorStrategy } from 'antlr4/error/ErrorStrategy';

export default class ParseTreeBuilder {

  constructor(metaEdErrorListener) {
    this.metaEdErrorListener = metaEdErrorListener;
  }

  withContext(metaEdFileIndex, errorMessageCollection) {
    this.metaEdErrorListener.withContext(metaEdFileIndex, errorMessageCollection);
  }

  buildParseTree(metaEdContents) {
    try {
      return this.errorIgnoringParser(metaEdContents).metaEd();
    } catch (parseCanceledException) {
      return this.errorListeningParser(metaEdContents).metaEd();
    }
  }

  buildTopLevelEntity(metaEdContents) {
    try {
      return this.errorIgnoringParser(metaEdContents).topLevelEntity();
    } catch (parseCanceledException) {
      return this.errorListeningParser(metaEdContents).topLevelEntity();
    }
  }

  errorListeningParser(metaEdContents) {
    const lexer = new BaseLexer.BaseLexer(new antlr4.InputStream(metaEdContents));
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new MetaEdGrammar.MetaEdGrammar(tokens);
    lexer.addErrorListener(this.metaEdErrorListener);
    parser.removeErrorListeners();
    parser.addErrorListener(this.metaEdErrorListener);
    return parser;
  }

  errorIgnoringParser(metaEdContents) {
    const lexer = new BaseLexer.BaseLexer(new antlr4.InputStream(metaEdContents));
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new MetaEdGrammar.MetaEdGrammar(tokens);
    parser.Interpreter.PredictionMode = antlr4.Atn.PredictionMode.Sll;
    parser.Interpreter.tail_call_preserves_sll = false;
    parser.ErrorHandler = new BailErrorStrategy();
    return parser;
  }
}
