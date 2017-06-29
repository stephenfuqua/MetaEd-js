// @flow
import DomainEntityBuilder from '../../../../../src/core/builder/DomainEntityBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../src/core/MetaEdEnvironment';
import { validate } from '../../../../../src/plugin/unified/validator/DomainEntity/DomainEntityMustContainAnIdentity';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating domain entity with identity fields', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc1')
      .withStringIdentity('Property1', 'doc2', '100')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one domain entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating domain entity with no identity fields', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const entityName: string = 'EntityName';
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartDomainEntity(entityName)
      .withDocumentation('doc1')
      .withStringProperty('Property1', 'doc2', true, false, '100')
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one domain entity', () => {
    expect(metaEd.entity.domainEntity.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('DomainEntityMustContainAnIdentity');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating domain entity with no identity fields -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating domain entity with no identity fields -> sourceMap');
  });
});
