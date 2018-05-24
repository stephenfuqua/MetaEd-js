// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  AssociationBuilder,
  AssociationSubclassBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { validate } from '../../../src/validator/UpcomingImprovements/SubclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported';

describe('when an association subclass subclasses GeneralStudentProgramAssociation', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const baseEntityName: string = 'GeneralStudentProgramAssociation';
  const subclassName: string = 'SubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(baseEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName1', 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationSubclass(subclassName, baseEntityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get('extension');
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    const entity = coreNamespace.entity.association.get(baseEntityName);
    const subclass = extensionNamespace.entity.associationSubclass.get(subclassName);

    metaEd.dataStandardVersion = '3.0.0';

    if (entity && subclass) subclass.baseEntity = entity;
    failures = validate(metaEd);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when an association subclass subclasses a non-GeneralStudentProgramAssociation association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const baseEntityName: string = 'NotStudentProgramAssociation';
  const subclassName: string = 'SubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(baseEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName1', 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationSubclass(subclassName, baseEntityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get('extension');
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    const entity = coreNamespace.entity.association.get(baseEntityName);
    const subclass = extensionNamespace.entity.associationSubclass.get(subclassName);

    metaEd.dataStandardVersion = '3.0.0';

    if (entity && subclass) subclass.baseEntity = entity;

    failures = validate(metaEd);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('SubclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot(
      'when a association subclass subclasses a non-GeneralStudentProgramAssociation association should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when a association subclass subclasses a non-GeneralStudentProgramAssociation association should have validation failure -> sourceMap',
    );
  });
});

describe('when an association subclass subclasses StudentProgramAssociation association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const baseEntityName: string = 'StudentProgramAssociation';
  const subclassName: string = 'SubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(baseEntityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName1', 'doc', true, false)
      .withEndAssociation()
      .withEndNamespace()

      .withBeginNamespace('extension', 'EXTENSION')
      .withStartAssociationSubclass(subclassName, baseEntityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get('extension');
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    const entity = coreNamespace.entity.association.get(baseEntityName);
    const subclass = extensionNamespace.entity.associationSubclass.get(subclassName);

    metaEd.dataStandardVersion = '3.0.0';

    if (entity && subclass) subclass.baseEntity = entity;

    failures = validate(metaEd);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('SubclassingAnyAssociationExceptGeneralStudentProgramAssociationIsUnsupported');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot(
      'when an association subclass subclasses StudentProgramAssociation association should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when an association subclass subclasses StudentProgramAssociation association should have validation failure -> sourceMap',
    );
  });
});
