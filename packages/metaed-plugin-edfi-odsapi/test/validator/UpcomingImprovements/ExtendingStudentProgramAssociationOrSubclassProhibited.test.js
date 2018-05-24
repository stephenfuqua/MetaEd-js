// @flow
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  AssociationBuilder,
  AssociationSubclassBuilder,
  AssociationExtensionBuilder,
  NamespaceBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { validate } from '../../../src/validator/UpcomingImprovements/ExtendingStudentProgramAssociationOrSubclassProhibited';
import { newPluginEnvironment } from '../../../../metaed-core/src/plugin/PluginEnvironment';

describe('when an association extension extends a non-student program association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName1', 'doc', true, false)
      .withEndAssociation()

      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();

    const entity = coreNamespace.entity.association.get(entityName);
    const extension = coreNamespace.entity.associationExtension.get(entityName);

    if (entity && extension) extension.baseEntity = entity;

    metaEd.plugin.set(
      'edfiOdsApi',
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion: '2.0.0',
      }),
    );
    failures = validate(metaEd);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when an association extension extends student program association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'StudentProgramAssociation';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName1', 'doc', true, false)
      .withEndAssociation()

      .withStartAssociationExtension(entityName)
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();
    const entity = coreNamespace.entity.association.get(entityName);
    const extension = coreNamespace.entity.associationExtension.get(entityName);

    if (entity && extension) extension.baseEntity = entity;

    metaEd.plugin.set(
      'edfiOdsApi',
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion: '2.0.0',
      }),
    );
    failures = validate(metaEd);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('ExtendingStudentProgramAssociationOrSubclassProhibited');
    expect(failures[0].category).toBe('warning');
    expect(failures[0].message).toMatchSnapshot(
      'when an association extension extends student program association should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when an association extension extends student program association should have validation failure -> sourceMap',
    );
  });
});

describe('when an association extension extends a subclass of student program association', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const entityName: string = 'StudentProgramAssociation';
  const coreSubclassName: string = 'CoreSubclassName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartAssociation(entityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName1', 'doc', true, false)
      .withEndAssociation()

      .withStartAssociationSubclass(coreSubclassName, entityName)
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName2', 'doc', true, false)
      .withEndAssociationSubclass()
      .withEndNamespace()

      .withBeginNamespace('extension', 'ProjectExtension')
      .withStartAssociationExtension(coreSubclassName)
      .withBooleanProperty('PropertyName3', 'doc', true, false)
      .withEndAssociationExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new AssociationBuilder(metaEd, []))
      .sendToListener(new AssociationExtensionBuilder(metaEd, []))
      .sendToListener(new AssociationSubclassBuilder(metaEd, []));

    const coreNamespace: ?Namespace = metaEd.namespace.get('edfi');
    if (coreNamespace == null) throw new Error();
    const extensionNamespace: ?Namespace = metaEd.namespace.get('extension');
    if (extensionNamespace == null) throw new Error();
    extensionNamespace.dependencies.push(coreNamespace);

    const entity = coreNamespace.entity.association.get(entityName);
    const coreSubclass = coreNamespace.entity.associationSubclass.get(coreSubclassName);
    const extension = extensionNamespace.entity.associationExtension.get(coreSubclassName);

    if (entity && coreSubclass) coreSubclass.baseEntity = entity;
    if (coreSubclass && extension) extension.baseEntity = coreSubclass;

    metaEd.plugin.set(
      'edfiOdsApi',
      Object.assign(newPluginEnvironment(), {
        targetTechnologyVersion: '2.0.0',
      }),
    );
    failures = validate(metaEd);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('ExtendingStudentProgramAssociationOrSubclassProhibited');
    expect(failures[0].category).toBe('warning');
    expect(failures[0].message).toMatchSnapshot(
      'when an association extension extends a subclass of student program association should have validation failure -> message',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when an association extension extends a subclass of student program association should have validation failure -> sourceMap',
    );
  });
});
