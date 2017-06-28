// @flow
import SharedDecimalBuilder from '../../../../../src/core/builder/SharedDecimalBuilder';
import MetaEdTextBuilder from '../../../../core/MetaEdTextBuilder';
import { repositoryFactory } from '../../../../../src/core/model/Repository';
import type { Repository } from '../../../../../src/core/model/Repository';
import { validate } from '../../../../../src/plugin/unified/validator/SharedSimple/SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits';
import type { ValidationFailure } from '../../../../../src/core/validator/ValidationFailure';

describe('when validating shared decimal with total digits greater than decimal places', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedDecimal('EntityName')
      .withDocumentation('PropertyDocumentation')
      .withTotalDigits('10')
      .withDecimalPlaces('2')
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new SharedDecimalBuilder(repository.entity, []));

    failures = validate(repository);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating shared decimal with same decimal places and total digits', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedDecimal('EntityName')
      .withDocumentation('PropertyDocumentation')
      .withTotalDigits('10')
      .withDecimalPlaces('10')
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new SharedDecimalBuilder(repository.entity, []));

    failures = validate(repository);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when validating shared decimal with decimal places greater than total digits', () => {
  const repository: Repository = repositoryFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartSharedDecimal('EntityName')
      .withDocumentation('PropertyDocumentation')
      .withTotalDigits('10')
      .withDecimalPlaces('11')
      .withEndSharedDecimal()
      .withEndNamespace()
      .sendToListener(new SharedDecimalBuilder(repository.entity, []));

    failures = validate(repository);
  });

  it('should build one shared decimal', () => {
    expect(repository.entity.sharedDecimal.size).toBe(1);
  });

  it('should have validation failures', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when validating shared decimal property with decimal places greater than total digits -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when validating shared decimal property with decimal places greater than total digits -> sourceMap');
  });
});
