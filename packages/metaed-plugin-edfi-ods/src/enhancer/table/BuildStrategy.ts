/* eslint-disable class-methods-use-this, no-use-before-define */
import { EntityProperty } from 'metaed-core';
import { defaultColumnNamer, withContextIgnoringColumnNamer } from '../../model/database/ColumnNamer';
import { ColumnTransformMakeNull } from '../../model/database/ColumnTransform';
import { ColumnNamer } from '../../model/database/ColumnNamer';
import { ColumnTransform } from '../../model/database/ColumnTransform';

export class BuildStrategy {
  myDecoratedStrategy: BuildStrategy | null;

  constructor(decoratedStrategy: BuildStrategy | null = null) {
    this.myDecoratedStrategy = decoratedStrategy;
  }

  parentContext(): string {
    return this.myDecoratedStrategy != null ? this.myDecoratedStrategy.parentContext() : '';
  }

  leafColumns(strategy: ColumnTransform): ColumnTransform {
    return this.myDecoratedStrategy != null ? this.myDecoratedStrategy.leafColumns(strategy) : strategy;
  }

  columnNamer(inlineContext: string, withContext: string, baseName: string): ColumnNamer {
    return this.myDecoratedStrategy != null
      ? this.myDecoratedStrategy.columnNamer(inlineContext, withContext, baseName)
      : defaultColumnNamer(inlineContext, withContext, baseName);
  }

  buildColumns(property: EntityProperty): boolean {
    return this.myDecoratedStrategy != null ? this.myDecoratedStrategy.buildColumns(property) : true;
  }

  suppressPrimaryKeyCreation(): boolean {
    return this.myDecoratedStrategy != null ? this.myDecoratedStrategy.suppressPrimaryKeyCreation() : false;
  }

  // #region strategy configuration methods
  columnNamerIgnoresWithContext(): BuildStrategy {
    return new ColumnNamerIgnoresWithContextStrategy(this);
  }

  appendParentContext(context: string): BuildStrategy {
    return new AppendParentContextStrategy(this, context);
  }

  appendInlineContext(context: string): BuildStrategy {
    return new AppendInlineContextStrategy(this, context);
  }

  skipPath(eligiblePropertyPaths: Array<Array<string>>): BuildStrategy {
    return new SkipPathStrategy(this, eligiblePropertyPaths);
  }
  // #endregion strategy configuration methods

  static filterOutLeafColumnsNullable(previous: BuildStrategy, current: BuildStrategy | null): void {
    if (current == null) return;
    if (current instanceof MakeLeafColumnNullableStrategy) {
      previous.myDecoratedStrategy = current.myDecoratedStrategy;
      BuildStrategy.filterOutLeafColumnsNullable(previous, current.myDecoratedStrategy);
    } else {
      BuildStrategy.filterOutLeafColumnsNullable(current, current.myDecoratedStrategy);
    }
  }

  static filterOutSuppressPrimaryKeyCreationFromProperties(previous: BuildStrategy, current: BuildStrategy | null): void {
    if (current == null) return;
    if (current instanceof SuppressPrimaryKeyCreationFromPropertiesStrategy) {
      previous.myDecoratedStrategy = current.myDecoratedStrategy;
      BuildStrategy.filterOutSuppressPrimaryKeyCreationFromProperties(previous, current.myDecoratedStrategy);
    } else {
      BuildStrategy.filterOutSuppressPrimaryKeyCreationFromProperties(current, current.myDecoratedStrategy);
    }
  }

  suppressPrimaryKeyCreationFromPropertiesStrategy(): BuildStrategy {
    return new SuppressPrimaryKeyCreationFromPropertiesStrategy(this);
  }

  undoSuppressPrimaryKeyCreationFromProperties(): BuildStrategy {
    if (this instanceof SuppressPrimaryKeyCreationFromPropertiesStrategy) {
      return this.myDecoratedStrategy == null ? this : this.myDecoratedStrategy;
    }
    BuildStrategy.filterOutSuppressPrimaryKeyCreationFromProperties(this, this.myDecoratedStrategy);
    return this;
  }

  makeLeafColumnsNullable(): BuildStrategy {
    return new MakeLeafColumnNullableStrategy(this);
  }

  undoLeafColumnsNullable(): BuildStrategy {
    if (this instanceof MakeLeafColumnNullableStrategy) {
      return this.myDecoratedStrategy == null ? this : this.myDecoratedStrategy;
    }
    BuildStrategy.filterOutLeafColumnsNullable(this, this.myDecoratedStrategy);
    return this;
  }
}

class AppendParentContextStrategy extends BuildStrategy {
  myParentContextAppend: string;

  constructor(decoratedStrategy: BuildStrategy | null, parentContextAppend: string) {
    super(decoratedStrategy);
    this.myParentContextAppend = parentContextAppend;
  }

  parentContext(): string {
    return super.parentContext() + this.myParentContextAppend;
  }
}

class AppendInlineContextStrategy extends BuildStrategy {
  inlineContextAppend: string;

  constructor(decoratedStrategy: BuildStrategy | null, inlineContextAppend: string) {
    super(decoratedStrategy);
    this.inlineContextAppend = inlineContextAppend;
  }

  parentContext(): string {
    return super.parentContext() + this.inlineContextAppend;
  }
}

class ColumnNamerIgnoresWithContextStrategy extends BuildStrategy {
  columnNamer(inlineContext: string, _withContext: string, baseName: string): ColumnNamer {
    return withContextIgnoringColumnNamer(inlineContext, baseName);
  }
}

class MakeLeafColumnNullableStrategy extends BuildStrategy {
  leafColumns(strategy: ColumnTransform): ColumnTransform {
    return new ColumnTransformMakeNull(strategy);
  }
}

// NOTE: getDecoratedStrategy() returns a reference to the previous decorator rather than itself.
// The result is that if skip path is not called last the skip path decorator is removed from the decorator chain
// and skip path's buildColumns method is never called.
class SkipPathStrategy extends BuildStrategy {
  myEligiblePropertyPaths: Array<Array<string>>;

  onPathPropertyPaths: Array<Array<string>>;

  constructor(decoratedStrategy: BuildStrategy | null, eligiblePropertyPaths: Array<Array<string>>) {
    super(decoratedStrategy);
    this.myEligiblePropertyPaths = eligiblePropertyPaths;
  }

  buildColumns(property: EntityProperty): boolean {
    this.onPathPropertyPaths = this.myEligiblePropertyPaths.filter(x => x.length > 0 && x[0] === property.fullPropertyName);
    return this.onPathPropertyPaths.length === 0 || this.onPathPropertyPaths.some(x => x.length > 1);
  }

  // #region strategy configuration methods
  getDecoratedStrategy(): BuildStrategy | null {
    return this.onPathPropertyPaths != null && this.onPathPropertyPaths.length > 0
      ? new SkipPathStrategy(this.myDecoratedStrategy, this.onPathPropertyPaths.map(x => x.slice(1)))
      : this.myDecoratedStrategy;
  }

  columnNamerIgnoresWithContext(): BuildStrategy {
    const strategy = this.getDecoratedStrategy();
    return new ColumnNamerIgnoresWithContextStrategy(strategy);
  }

  appendParentContext(context: string): BuildStrategy {
    const strategy = this.getDecoratedStrategy();
    return new AppendParentContextStrategy(strategy, context);
  }

  appendInlineContext(context: string): BuildStrategy {
    const strategy = this.getDecoratedStrategy();
    return new AppendInlineContextStrategy(strategy, context);
  }

  skipPath(eligiblePropertyPaths: Array<Array<string>>): BuildStrategy {
    const strategy = this.getDecoratedStrategy();
    return new SkipPathStrategy(strategy, eligiblePropertyPaths);
  }
  // #endregion strategy configuration methods
}

class SuppressPrimaryKeyCreationFromPropertiesStrategy extends BuildStrategy {
  suppressPrimaryKeyCreation(): boolean {
    return true;
  }
}

export const BuildStrategyDefault: BuildStrategy = new BuildStrategy();
