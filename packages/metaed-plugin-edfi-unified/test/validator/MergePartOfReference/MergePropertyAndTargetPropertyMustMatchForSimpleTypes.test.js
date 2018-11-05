// @flow
import {
  DomainEntityBuilder,
  DomainEntitySubclassBuilder,
  NamespaceBuilder,
  newMetaEdEnvironment,
  MetaEdTextBuilder,
} from 'metaed-core';
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { validate } from '../../../src/validator/MergePartOfReference/MergePropertyAndTargetPropertyMustMatch';

describe('when validating merge property name and types match', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    const domainEntityName1: string = 'DomainEntityName1';
    const stringIdentityName: string = 'StringIdentityName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('doc')
      .withSharedStringIdentity(stringIdentityName, stringIdentityName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DomainEntityName2')
      .withDocumentation('doc')
      .withSharedStringIdentity(stringIdentityName, stringIdentityName, 'doc')
      .withDomainEntityIdentity(domainEntityName1, 'doc')
      .withMergePartOfReference(`${domainEntityName1}.${stringIdentityName}`, stringIdentityName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating merge property type mismatch', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    const domainEntityName1: string = 'DomainEntityName1';
    const stringIdentityName: string = 'StringIdentityName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('doc')
      .withSharedIntegerIdentity(stringIdentityName, stringIdentityName, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DomainEntityName2')
      .withDocumentation('doc')
      .withSharedStringIdentity(stringIdentityName, stringIdentityName, 'doc')
      .withDomainEntityIdentity(domainEntityName1, 'doc')
      .withMergePartOfReference(`${domainEntityName1}.${stringIdentityName}`, stringIdentityName)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(2);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('MergePropertyAndTargetPropertyMustMatch');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot(
      'when validating merge property type mismatch should have validation failure -> message ',
    );
    expect(failures[0].sourceMap).toMatchSnapshot(
      'when validating merge property type mismatch should have validation failure -> sourceMap',
    );
  });
});

describe('when validating merge of doubly nested domain entity with domain entity properties', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    const domainEntityName1: string = 'DomainEntityName1';
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntityName3: string = 'DomainEntityName3';
    const integerName: string = 'IntegerName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(domainEntityName1)
      .withDocumentation('DomainEntityDocumentation')
      .withSharedIntegerIdentity(integerName, integerName, 'IntegerIdentityDocumentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('DomainEntityDocumentation')
      .withDomainEntityIdentity(domainEntityName1, 'DomainEntityIdentityDocumentation')
      .withEndDomainEntity()

      .withStartDomainEntity(domainEntityName3)
      .withDocumentation('DomainEntityDocumentation')
      .withDomainEntityIdentity(domainEntityName2, 'DomainEntityIdentityDocumentation')
      .withEndDomainEntity()

      .withStartDomainEntity('DomainEntityName4')
      .withDocumentation('DomainEntityDocumentation')
      .withSharedIntegerIdentity(integerName, integerName, 'DomainEntityPropertyDocumentation')
      .withDomainEntityIdentity(domainEntityName3, 'DomainEntityPropertyDocumentation')
      .withMergePartOfReference(
        `${domainEntityName3}.${domainEntityName2}.${domainEntityName1}.${integerName}`,
        `${integerName}`,
      )
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating merge of domain entity and domain entity subclass properties of base entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let failures: Array<ValidationFailure>;
  let coreNamespace: any = null;

  beforeAll(() => {
    const sharedIntegerEntityName1: string = 'SharedIntegerEntityName1';
    const domainEntityName2: string = 'DomainEntityName2';
    const domainEntityName3: string = 'DomainEntityName3';
    const domainEntitySubclassName: string = 'DomainEntitySubclassName';

    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')

      .withStartDomainEntity(domainEntityName2)
      .withDocumentation('DomainEntityDocumentation')
      .withSharedIntegerIdentity(sharedIntegerEntityName1, sharedIntegerEntityName1, 'DomainEntityDocumentation')
      .withEndDomainEntity()

      .withStartDomainEntitySubclass(domainEntitySubclassName, domainEntityName2)
      .withDocumentation('DomainEntityDocumentation')
      .withIntegerIdentity('IntegerIdentityName2', 'IntegerIdentityDocumentation')
      .withEndDomainEntitySubclass()

      .withStartDomainEntity(domainEntityName3)
      .withDocumentation('DomainEntityDocumentation')
      .withSharedIntegerIdentity(sharedIntegerEntityName1, sharedIntegerEntityName1, 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DomainEntityName4')
      .withDocumentation('DomainEntityDocumentation')
      .withDomainEntityIdentity(domainEntitySubclassName, 'DomainEntityPropertyDocumentation')
      .withDomainEntityIdentity(domainEntityName3, 'DomainEntityPropertyDocumentation')
      .withMergePartOfReference(
        `${domainEntityName3}.${sharedIntegerEntityName1}`,
        `${domainEntitySubclassName}.${sharedIntegerEntityName1}`,
      )
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('edfi');
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(3);
  });

  it('should build one domain entity subclass', () => {
    expect(coreNamespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});
