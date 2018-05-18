// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  AssociationBuilder,
  AssociationSubclassBuilder,
  NamespaceInfoBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/UpcomingImprovements/SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupportedV2';

describe('when an association subclass subclasses StudentProgramAssociation', () => {
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

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []));

    const entity = metaEd.entity.association.get(baseEntityName);
    const subclass = metaEd.entity.associationSubclass.get(subclassName);

    metaEd.dataStandardVersion = '2.0.0';

    if (entity && subclass) subclass.baseEntity = entity;
    failures = validate(metaEd);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when an association subclass subclasses a non-StudentProgramAssociation association', () => {
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

      .sendToListener(new NamespaceInfoBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []));

    const entity = metaEd.entity.association.get(baseEntityName);
    const subclass = metaEd.entity.associationSubclass.get(subclassName);

    metaEd.dataStandardVersion = '2.0.0';

    if (entity && subclass) subclass.baseEntity = entity;

    failures = validate(metaEd);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('SubclassingAnyAssociationExceptStudentProgramAssociationIsUnsupportedV2');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot(
      'when a association subclass subclasses a non-StudentProgramAssociation association should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when a association subclass subclasses a non-StudentProgramAssociation association should have validation failure -> sourceMap',
    );
  });
});
