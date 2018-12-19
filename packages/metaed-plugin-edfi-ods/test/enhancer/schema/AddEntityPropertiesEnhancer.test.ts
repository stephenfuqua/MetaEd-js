import { newIntegerProperty, newMetaEdEnvironment, newNamespace } from 'metaed-core';
import { IntegerProperty, MetaEdEnvironment, Namespace } from 'metaed-core';
import { enhance } from '../../../src/model/property/EntityProperty';

describe('when PropertyEnhancer enhances integer property', () => {
  const integerPropertyName = 'IntegerPropertyName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: integerPropertyName,
    });

    metaEd.propertyIndex.integer.push(integerProperty);
    enhance(metaEd);
  });

  it('should have ods name', () => {
    expect(integerProperty.data.edfiOds.odsName).toBe(integerPropertyName);
  });

  it('should have empty ods context prefix', () => {
    expect(integerProperty.data.edfiOds.odsContextPrefix).toBe('');
  });

  it('should have false ods is collection', () => {
    expect(integerProperty.data.edfiOds.odsIsCollection).toBe(false);
  });
});

describe('when PropertyEnhancer enhances property with required collection', () => {
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    const integerPropertyName = 'IntegerPropertyName';
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: integerPropertyName,
      isRequiredCollection: true,
    });

    metaEd.propertyIndex.integer.push(integerProperty);
    enhance(metaEd);
  });

  it('should have true ods is collection', () => {
    expect(integerProperty.data.edfiOds.odsIsCollection).toBe(true);
  });
});

describe('when PropertyEnhancer enhances property with optional collection', () => {
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    const integerPropertyName = 'IntegerPropertyName';
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: integerPropertyName,
      isOptionalCollection: true,
    });

    metaEd.propertyIndex.integer.push(integerProperty);
    enhance(metaEd);
  });

  it('should have true ods is collection', () => {
    expect(integerProperty.data.edfiOds.odsIsCollection).toBe(true);
  });
});

describe('when PropertyEnhancer enhances property with context', () => {
  const integerPropertyName = 'IntegerPropertyName';
  const contextName = 'ContextName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: integerPropertyName,
      withContext: contextName,
    });

    metaEd.propertyIndex.integer.push(integerProperty);
    enhance(metaEd);
  });

  it('should have ods name prefixed with context', () => {
    expect(integerProperty.data.edfiOds.odsName).toBe(contextName + integerPropertyName);
  });

  it('should have ods context prefix', () => {
    expect(integerProperty.data.edfiOds.odsContextPrefix).toBe(contextName);
  });
});

describe('when PropertyEnhancer enhances property with shortened context', () => {
  const integerPropertyName = 'IntegerPropertyName';
  const contextName = 'ContextName';
  const shortenToName = 'shortenToName';
  let integerProperty: IntegerProperty;

  beforeAll(() => {
    const namespace: Namespace = { ...newNamespace(), namespaceName: 'edfi' };
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    metaEd.namespace.set(namespace.namespaceName, namespace);
    integerProperty = Object.assign(newIntegerProperty(), {
      metaEdName: integerPropertyName,
      withContext: contextName,
      shortenTo: shortenToName,
    });

    metaEd.propertyIndex.integer.push(integerProperty);
    enhance(metaEd);
  });

  it('should have ods name prefixed with context', () => {
    expect(integerProperty.data.edfiOds.odsName).toBe(contextName + integerPropertyName);
  });

  it('should have ods context prefix with shortened name', () => {
    expect(integerProperty.data.edfiOds.odsContextPrefix).toBe(shortenToName);
  });
});
