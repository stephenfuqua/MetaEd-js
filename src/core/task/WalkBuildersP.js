// @flow
import antlr4 from 'antlr4';
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

export function setupBuilder(state: State): State {
  state.repository = repositoryFactory();
  state.propertyIndex = new Map();
  return state;
}

export function executeAssociationBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new AssociationBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeAssociationExtensionBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new AssociationExtensionBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeAssociationSubclassBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new AssociationSubclassBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeChoiceBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new ChoiceBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeCommonBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new CommonBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeCommonExtensionBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new CommonExtensionBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeDescriptorBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DescriptorBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeDomainBuilder(state: State): State {
  if (state.repository == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainBuilder(state.repository.entity, state.validationFailure), state.parseTree);
  return state;
}

export function executeDomainEntityBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainEntityBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeDomainEntityExtensionBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainEntityExtensionBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeDomainEntitySubclassBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DomainEntitySubclassBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeEnumerationBuilder(state: State): State {
  if (state.repository == null || state.propertyIndex == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new EnumerationBuilder(state.repository.entity, state.validationFailure, state.propertyIndex), state.parseTree);
  return state;
}

export function executeInterchangeBuilder(state: State): State {
  if (state.repository == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new InterchangeBuilder(state.repository.entity, state.validationFailure), state.parseTree);
  return state;
}

export function executeNamespaceInfoBuilder(state: State): State {
  if (state.repository == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new NamespaceInfoBuilder(state.repository.entity, state.validationFailure), state.parseTree);
  return state;
}

export function executeSharedDecimalBuilder(state: State): State {
  if (state.repository == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new SharedDecimalBuilder(state.repository.entity, state.validationFailure), state.parseTree);
  return state;
}

export function executeSharedIntegerBuilder(state: State): State {
  if (state.repository == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new SharedIntegerBuilder(state.repository.entity, state.validationFailure), state.parseTree);
  return state;
}

export function executeSharedStringBuilder(state: State): State {
  if (state.repository == null) return state;
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new SharedStringBuilder(state.repository.entity, state.validationFailure), state.parseTree);
  return state;
}
