// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  NamespaceBuilder,
  AssociationBuilder,
  AssociationExtensionBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/AbstractEntity/AbstractGeneralStudentProgramAssociationMustNotBeExtended';

describe('when validating association additions', () => {
  const metaEd: MetaEdEnvironment = { ...newMetaEdEnvironment(), dataStandardVersion: '3.0.0' };
  const associationName: string = 'AssociationName';
  let coreNamespace: Namespace;
  let extensionNamespace: Namespace;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const coreNamespaceName: string = 'edfi';
    const extensionNamespaceName: string = 'extension';

    MetaEdTextBuilder.build()
      .withBeginNamespace(coreNamespaceName)
      .withStartAssociation(associationName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName1', 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extensionNamespaceName)
      .withStartAssociationExtension(associationName)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName2', 'Documentation')
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get(coreNamespaceName);
    extensionNamespace = metaEd.namespace.get(extensionNamespaceName);
    extensionNamespace.dependencies = [coreNamespace];

    failures = validate(metaEd);
  });

  it('should build association and association extension', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating abstract GeneralStudentProgramAssociation additions', () => {
  const metaEd: MetaEdEnvironment = { ...newMetaEdEnvironment(), dataStandardVersion: '3.0.0' };
  const generalStudentProgramAssociation: string = 'GeneralStudentProgramAssociation';
  let coreNamespace: Namespace;
  let extensionNamespace: Namespace;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    const coreNamespaceName: string = 'edfi';
    const extensionNamespaceName: string = 'extension';

    MetaEdTextBuilder.build()
      .withBeginNamespace(coreNamespaceName)
      .withStartAssociation(generalStudentProgramAssociation)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName1', 'Documentation')
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace(extensionNamespaceName)
      .withStartAssociationExtension(generalStudentProgramAssociation)
      .withDocumentation('Documentation')
      .withIntegerIdentity('PropertyName2', 'Documentation')
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get(coreNamespaceName);
    extensionNamespace = metaEd.namespace.get(extensionNamespaceName);
    extensionNamespace.dependencies = [coreNamespace];

    failures = validate(metaEd);
  });

  it('should build abstract entity and domain entity extension', () => {
    expect(coreNamespace.entity.association.size).toBe(1);
    expect(extensionNamespace.entity.associationExtension.size).toBe(1);
  });

  it('should have one validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures).toMatchSnapshot();
  });
});
