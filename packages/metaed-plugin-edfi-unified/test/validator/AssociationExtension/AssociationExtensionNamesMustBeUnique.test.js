// @flow
import { newMetaEdEnvironment, MetaEdTextBuilder, AssociationExtensionBuilder, NamespaceBuilder } from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/AssociationExtension/AssociationExtensionNamesMustBeUnique';

describe('when entities in same namespace have different names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociationExtension('ValidName1')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()

      .withStartAssociationExtension('ValidName2')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build two associationExtension', () => {
    expect(coreNamespace.entity.associationExtension.size).toBe(2);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when entities in same namespace have identical names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()

      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build one associationExtension because TopLevelEntityBuilder will not let it get that far', () => {
    expect(coreNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures because of TopLevelEntityBuilder', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when associationExtensions in separate dependency-linked namespaces have identical names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .withBeginNamespace('extension', 'Extension')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespace = metaEd.namespace.get('extension');
    // $FlowIgnore - null check
    extensionNamespace.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one associationExtension in core namespace', () => {
    expect(coreNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should build one associationExtension in extension namespace', () => {
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have validation failures for each entity', () => {
    expect(failures).toHaveLength(2);

    expect(failures[0].validatorName).toBe('AssociationExtensionNamesMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot();
    expect(failures[0].sourceMap).toMatchSnapshot();

    expect(failures[1].validatorName).toBe('AssociationExtensionNamesMustBeUnique');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot();
    expect(failures[1].sourceMap).toMatchSnapshot();
  });
});

describe('when associationExtensions in non-dependency-linked namespaces have identical names', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;
  let extensionNamespacea: any = null;
  let extensionNamespaceb: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociationExtension('NotADuplicate')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .withBeginNamespace('extensiona', 'Extensiona')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .withBeginNamespace('extensionb', 'Extensionb')
      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    extensionNamespacea = metaEd.namespace.get('extensiona');
    extensionNamespaceb = metaEd.namespace.get('extensionb');
    // $FlowIgnore - null check
    extensionNamespacea.dependencies.push(coreNamespace);
    // $FlowIgnore - null check
    extensionNamespaceb.dependencies.push(coreNamespace);

    failures = validate(metaEd);
  });

  it('should build one core associationExtension', () => {
    expect(coreNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should build one extension1 associationExtension', () => {
    expect(extensionNamespacea.entity.associationExtension.size).toBe(1);
  });

  it('should build one extension2 associationExtension', () => {
    expect(extensionNamespaceb.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});
