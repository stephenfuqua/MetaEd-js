// @flow
import antlr4 from 'antlr4';
import { MetaEdGrammarListener } from '../../grammar/gen/MetaEdGrammarListener';
import { repositoryFactory } from '../model/Repository';
import type { State } from '../State';
import AssociationBuilder from '../builder/AssociationBuilder';
import AssociationExtensionBuilder from '../builder/AssociationExtensionBuilder';
import AssociationSubclassBuilder from '../builder/AssociationSubclassBuilder';
import ChoiceBuilder from '../builder/ChoiceBuilder';
import CommonBuilder from '../builder/CommonBuilder';
import CommonExtensionBuilder from '../builder/CommonExtensionBuilder';
import DescriptorBuilder from '../builder/DescriptorBuilder';
import DomainBuilder from '../builder/DomainBuilder';
import DomainEntityBuilder from '../builder/DomainEntityBuilder';
import DomainEntityExtensionBuilder from '../builder/DomainEntityExtensionBuilder';
import DomainEntitySubclassBuilder from '../builder/DomainEntitySubclassBuilder';
import EnumerationBuilder from '../builder/EnumerationBuilder';
import InterchangeBuilder from '../builder/InterchangeBuilder';
import NamespaceInfoBuilder from '../builder/NamespaceInfoBuilder';
import SharedDecimalBuilder from '../builder/SharedDecimalBuilder';
import SharedIntegerBuilder from '../builder/SharedIntegerBuilder';
import SharedStringBuilder from '../builder/SharedStringBuilder';

export function execute(state: State): State {
  state.repository = repositoryFactory();
  const entityRepository = state.repository.entity;
  const propertyRepository = state.repository.property;
  const builders: Array<MetaEdGrammarListener> = [];

  builders.push(new AssociationBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new AssociationExtensionBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new AssociationSubclassBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new ChoiceBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new CommonBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new CommonExtensionBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new DescriptorBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new DomainBuilder(entityRepository, state.validationFailure));
  builders.push(new DomainEntityBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new DomainEntityExtensionBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new DomainEntitySubclassBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new EnumerationBuilder(entityRepository, state.validationFailure, propertyRepository));
  builders.push(new InterchangeBuilder(entityRepository, state.validationFailure));
  builders.push(new NamespaceInfoBuilder(entityRepository, state.validationFailure));
  builders.push(new SharedDecimalBuilder(entityRepository, state.validationFailure));
  builders.push(new SharedIntegerBuilder(entityRepository, state.validationFailure));
  builders.push(new SharedStringBuilder(entityRepository, state.validationFailure));

  builders.forEach(builder => antlr4.tree.ParseTreeWalker.DEFAULT.walk(builder, state.parseTree));
  return state;
}
