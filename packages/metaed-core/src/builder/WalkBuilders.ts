import antlr4 from 'antlr4';
import { MetaEdGrammarListener } from '../grammar/gen/MetaEdGrammarListener';
import { State } from '../State';
import { nextMacroTask } from '../Utility';
import { AssociationBuilder } from './AssociationBuilder';
import { AssociationExtensionBuilder } from './AssociationExtensionBuilder';
import { AssociationSubclassBuilder } from './AssociationSubclassBuilder';
import { ChoiceBuilder } from './ChoiceBuilder';
import { CommonBuilder } from './CommonBuilder';
import { CommonExtensionBuilder } from './CommonExtensionBuilder';
import { DecimalTypeBuilder } from './DecimalTypeBuilder';
import { DescriptorBuilder } from './DescriptorBuilder';
import { DomainBuilder } from './DomainBuilder';
import { DomainEntityBuilder } from './DomainEntityBuilder';
import { DomainEntityExtensionBuilder } from './DomainEntityExtensionBuilder';
import { DomainEntitySubclassBuilder } from './DomainEntitySubclassBuilder';
import { EnumerationBuilder } from './EnumerationBuilder';
import { IntegerTypeBuilder } from './IntegerTypeBuilder';
import { InterchangeBuilder } from './InterchangeBuilder';
import { NamespaceBuilder } from './NamespaceBuilder';
import { SharedDecimalBuilder } from './SharedDecimalBuilder';
import { SharedIntegerBuilder } from './SharedIntegerBuilder';
import { SharedStringBuilder } from './SharedStringBuilder';
import { StringTypeBuilder } from './StringTypeBuilder';

export async function execute(state: State): Promise<void> {
  const builders: MetaEdGrammarListener[] = [];

  // NamespaceBuilder goes first, all others have a dependency on it
  builders.push(new NamespaceBuilder(state.metaEd, state.validationFailure));

  builders.push(new AssociationBuilder(state.metaEd, state.validationFailure));
  builders.push(new AssociationExtensionBuilder(state.metaEd, state.validationFailure));
  builders.push(new AssociationSubclassBuilder(state.metaEd, state.validationFailure));
  builders.push(new ChoiceBuilder(state.metaEd, state.validationFailure));
  builders.push(new CommonBuilder(state.metaEd, state.validationFailure));
  builders.push(new CommonExtensionBuilder(state.metaEd, state.validationFailure));
  builders.push(new DecimalTypeBuilder(state.metaEd, state.validationFailure));
  builders.push(new DescriptorBuilder(state.metaEd, state.validationFailure));
  builders.push(new DomainBuilder(state.metaEd, state.validationFailure));
  builders.push(new DomainEntityBuilder(state.metaEd, state.validationFailure));
  builders.push(new DomainEntityExtensionBuilder(state.metaEd, state.validationFailure));
  builders.push(new DomainEntitySubclassBuilder(state.metaEd, state.validationFailure));
  builders.push(new EnumerationBuilder(state.metaEd, state.validationFailure));
  builders.push(new IntegerTypeBuilder(state.metaEd, state.validationFailure));
  builders.push(new InterchangeBuilder(state.metaEd, state.validationFailure));
  builders.push(new SharedDecimalBuilder(state.metaEd, state.validationFailure));
  builders.push(new SharedIntegerBuilder(state.metaEd, state.validationFailure));
  builders.push(new SharedStringBuilder(state.metaEd, state.validationFailure));
  builders.push(new StringTypeBuilder(state.metaEd, state.validationFailure));

  const parseTreeWalker = new antlr4.tree.ParseTreeWalker();

  // eslint-disable-next-line no-restricted-syntax
  for (const builder of builders) {
    parseTreeWalker.walk(builder, state.parseTree);
    await nextMacroTask();
  }
}
