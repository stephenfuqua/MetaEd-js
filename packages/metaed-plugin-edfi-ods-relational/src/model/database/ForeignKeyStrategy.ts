/* eslint-disable class-methods-use-this, no-use-before-define */
import { Column } from './Column';

export class ForeignKeyStrategy {
  myDecoratedStrategy: ForeignKeyStrategy;

  static foreignColumnRename(foreignColumnName: string): ForeignKeyStrategy {
    return new RenameForeignColumn(ForeignKeyStrategyDefault, foreignColumnName);
  }

  static foreignColumnCascade(deleteCascade: boolean, updateCascade: boolean): ForeignKeyStrategy {
    if (deleteCascade && updateCascade) return ForeignKeyStrategyUpdateDeleteCascade;
    if (deleteCascade) return ForeignKeyStrategyDeleteCascade;
    if (updateCascade) return ForeignKeyStrategyUpdateCascade;
    return ForeignKeyStrategyDefault;
  }

  hasDeleteCascade() {
    return false;
  }

  hasUpdateCascade() {
    return false;
  }

  parentColumnName(column: Column) {
    return column.name;
  }

  foreignColumnName(column: Column) {
    return column.name;
  }
}

class AddDeleteCascade extends ForeignKeyStrategy {
  constructor(decoratedStrategy: ForeignKeyStrategy) {
    super();
    this.myDecoratedStrategy = decoratedStrategy;
  }

  hasDeleteCascade() {
    return true;
  }

  hasUpdateCascade() {
    return this.myDecoratedStrategy.hasUpdateCascade();
  }

  parentColumnName(column: Column) {
    return this.myDecoratedStrategy.parentColumnName(column);
  }

  foreignColumnName(column: Column) {
    return this.myDecoratedStrategy.foreignColumnName(column);
  }
}

class AddUpdateCascade extends ForeignKeyStrategy {
  constructor(decoratedStrategy: ForeignKeyStrategy) {
    super();
    this.myDecoratedStrategy = decoratedStrategy;
  }

  hasDeleteCascade() {
    return this.myDecoratedStrategy.hasDeleteCascade();
  }

  hasUpdateCascade() {
    return true;
  }

  parentColumnName(column: Column) {
    return this.myDecoratedStrategy.parentColumnName(column);
  }

  foreignColumnName(column: Column) {
    return this.myDecoratedStrategy.foreignColumnName(column);
  }
}

class RenameForeignColumn extends ForeignKeyStrategy {
  myForeignColumnName: string;

  constructor(decoratedStrategy: ForeignKeyStrategy, foreignColumnName: string) {
    super();
    this.myDecoratedStrategy = decoratedStrategy;
    this.myForeignColumnName = foreignColumnName;
  }

  hasDeleteCascade() {
    return this.myDecoratedStrategy.hasDeleteCascade();
  }

  hasUpdateCascade() {
    return this.myDecoratedStrategy.hasUpdateCascade();
  }

  parentColumnName(column: Column) {
    return this.myDecoratedStrategy.parentColumnName(column);
  }

  // @ts-ignore,
  foreignColumnName(column: Column) {
    return this.myForeignColumnName;
  }
}

export const ForeignKeyStrategyDefault: ForeignKeyStrategy = new ForeignKeyStrategy();
export const ForeignKeyStrategyDeleteCascade: ForeignKeyStrategy = new AddDeleteCascade(ForeignKeyStrategyDefault);
export const ForeignKeyStrategyUpdateCascade: ForeignKeyStrategy = new AddUpdateCascade(ForeignKeyStrategyDefault);
export const ForeignKeyStrategyUpdateDeleteCascade: ForeignKeyStrategy = new AddUpdateCascade(
  ForeignKeyStrategyDeleteCascade,
);
