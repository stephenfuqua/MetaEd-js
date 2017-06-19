// @flow
import antlr4 from 'antlr4';
import type { ValidationFailure } from '../core/validator/ValidationFailure';

export default class MetaEdErrorListener {
  _messageCollection: ValidationFailure[];

  constructor(messageCollection: ValidationFailure[]) {
    antlr4.error.ErrorListener.call(this);
    this._messageCollection = messageCollection;
  }

  syntaxError(recognizer: any, offendingSymbol: any, concatenatedLineNumber: number, characterPosition: number, message: string) {
    this._messageCollection.push({
      validatorName: 'MetaEdErrorListener',
      category: 'error',
      message,
      sourceMap: {
        line: concatenatedLineNumber,
        column: characterPosition,
        tokenText: offendingSymbol && offendingSymbol.text ? offendingSymbol.text : '',
      },
      fileMap: null,
    });
  }

  getMessageCollection(): ValidationFailure[] {
    return this._messageCollection;
  }
}
