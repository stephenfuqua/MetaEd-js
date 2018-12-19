/* eslint-disable class-methods-use-this, no-use-before-define */
import { appendOverlapping } from '../../shared/Utility';
import { addMergedReferenceContext, cloneColumn } from './Column';
import { Column } from './Column';

export class ColumnTransform {
  myDecoratedStrategy: ColumnTransform | null;

  constructor(decoratedStrategy: ColumnTransform | null = null) {
    this.myDecoratedStrategy = decoratedStrategy;
  }

  static withContext(contextPrefix: string): ColumnTransform {
    return new PrefixWithContext(ColumnTransformUnchanged, contextPrefix);
  }

  static primaryKeyWithContext(contextPrefix: string): ColumnTransform {
    return new PrefixWithContext(ColumnTransformPrimaryKey, contextPrefix);
  }

  static primaryKeyWithContextCollapsible(contextPrefix: string): ColumnTransform {
    return new ColumnTransformPrefixWithContextCollapsible(ColumnTransformPrimaryKey, contextPrefix);
  }

  static primaryKeyWithNewReferenceContext(referenceContext: string): ColumnTransform {
    return new ColumnTransformPrependReferenceContext(ColumnTransformPrimaryKey, referenceContext);
  }

  static primaryKeyWithContextCollapsibleAndNewReferenceContext(
    contextPrefix: string,
    referenceContext: string,
  ): ColumnTransform {
    return new ColumnTransformPrependReferenceContext(
      ColumnTransform.primaryKeyWithContextCollapsible(contextPrefix),
      referenceContext,
    );
  }

  static notNullWithContext(contextPrefix: string): ColumnTransform {
    return new PrefixWithContext(ColumnTransformNotNull, contextPrefix);
  }

  static nullWithContext(contextPrefix: string): ColumnTransform {
    return new PrefixWithContext(ColumnTransformNull, contextPrefix);
  }

  static myInvertStrategies(strategyStack: Array<ColumnTransform>, strategy: ColumnTransform | null): void {
    if (strategy == null) return;
    strategyStack.push(strategy);
    ColumnTransform.myInvertStrategies(strategyStack, strategy.myDecoratedStrategy);
  }

  static myTransformTopOfStack(strategyStack: Array<ColumnTransform>, originalColumns: Array<Column>): Array<Column> {
    if (strategyStack.length === 0) return originalColumns;

    const currentStrategy: ColumnTransform = strategyStack.pop() as ColumnTransform;

    const newColumns: Array<Column> = originalColumns.map(x => cloneColumn(x));
    newColumns.forEach((column: Column) => currentStrategy.transformSingle(column));

    return ColumnTransform.myTransformTopOfStack(strategyStack, newColumns);
  }

  transform(originalColumns: Array<Column>): Array<Column> {
    const invertStrategies = [];
    ColumnTransform.myInvertStrategies(invertStrategies, this);
    return ColumnTransform.myTransformTopOfStack(invertStrategies, originalColumns);
  }

  // @ts-ignore,
  transformSingle(column: Column): void {
    /* noop */
  }
}

export class PrefixWithContext extends ColumnTransform {
  myContextPrefix: string;

  constructor(decoratedStrategy: ColumnTransform, contextPrefix: string) {
    super(decoratedStrategy);
    this.myContextPrefix = contextPrefix != null ? contextPrefix : '';
  }

  transformSingle(column: Column): void {
    column.name = appendOverlapping(this.myContextPrefix, column.name);
  }
}

export class ColumnTransformPrefixWithContextCollapsible extends ColumnTransform {
  myContextPrefix: string;

  constructor(decoratedStrategy: ColumnTransform, contextPrefix: string) {
    super(decoratedStrategy);
    this.myContextPrefix = contextPrefix != null ? contextPrefix : '';
  }

  transformSingle(column: Column): void {
    column.name =
      column.originalContextPrefix === this.myContextPrefix
        ? column.name
        : appendOverlapping(this.myContextPrefix, column.name);
  }
}

export class ColumnTransformPrependReferenceContext extends ColumnTransform {
  myNewReferenceContext: string;

  constructor(decoratedStrategy: ColumnTransform, newReferenceContext: string) {
    super(decoratedStrategy);
    this.myNewReferenceContext = newReferenceContext;
  }

  transformSingle(column: Column): void {
    column.referenceContext = this.myNewReferenceContext + column.referenceContext;
    addMergedReferenceContext(column, column.referenceContext);
  }
}

export class ColumnTransformMakePrimaryKey extends ColumnTransform {
  transformSingle(column: Column): void {
    Object.assign(column, {
      isPartOfPrimaryKey: true,
      isNullable: false,
      isIdentityDatabaseType: false,
    });
  }
}

export class ColumnTransformMakeNotNull extends ColumnTransform {
  transformSingle(column: Column): void {
    Object.assign(column, {
      isPartOfPrimaryKey: false,
      isNullable: false,
      isIdentityDatabaseType: false,
    });
  }
}

export class ColumnTransformMakeNull extends ColumnTransform {
  transformSingle(column: Column): void {
    Object.assign(column, {
      isPartOfPrimaryKey: false,
      isNullable: true,
      isIdentityDatabaseType: false,
    });
  }
}

export const ColumnTransformUnchanged: ColumnTransform = new ColumnTransform();
export const ColumnTransformPrimaryKey: ColumnTransform = new ColumnTransformMakePrimaryKey(ColumnTransformUnchanged);
export const ColumnTransformNotNull: ColumnTransform = new ColumnTransformMakeNotNull(ColumnTransformUnchanged);
export const ColumnTransformNull: ColumnTransform = new ColumnTransformMakeNull(ColumnTransformUnchanged);
