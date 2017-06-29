// @flow
import antlr4 from 'antlr4';
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

export function executeAssociationBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new AssociationBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeAssociationExtensionBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new AssociationExtensionBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeAssociationSubclassBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new AssociationSubclassBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeChoiceBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new ChoiceBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeCommonBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new CommonBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeCommonExtensionBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new CommonExtensionBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeDescriptorBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DescriptorBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeDomainBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeDomainEntityBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainEntityBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeDomainEntityExtensionBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainEntityExtensionBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeDomainEntitySubclassBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainEntitySubclassBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeEnumerationBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new EnumerationBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeInterchangeBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new InterchangeBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeNamespaceInfoBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new NamespaceInfoBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeSharedDecimalBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new SharedDecimalBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeSharedIntegerBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new SharedIntegerBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}

export function executeSharedStringBuilder(state: State): State {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new SharedStringBuilder(state.metaEd, state.validationFailure), state.parseTree);
  return state;
}
