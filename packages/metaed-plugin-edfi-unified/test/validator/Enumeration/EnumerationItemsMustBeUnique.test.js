// @noflow
import EnumerationBuilder from '../../../../../packages/metaed-core/src/builder/EnumerationBuilder';
import MetaEdTextBuilder from '../../../../../packages/metaed-core/test/MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import { validate } from '../../../src/validator/Enumeration/EnumerationItemsMustBeUnique';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

describe('when enumeration items have different short descriptions', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartEnumeration('EntityName')
      .withDocumentation('EntityDocumentation')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new EnumerationBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one enumeration', () => {
    expect(metaEd.entity.enumeration.size).toBe(1);
  });


  it('should have no validation failures()', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when enumeration items have duplicate short descriptions', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartEnumeration('EntityName')
      .withDocumentation('EntityDocumentation')
      .withEnumerationItem('ShortDescription', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription', 'EnumerationItemDocumentation2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new EnumerationBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one enumeration', () => {
    expect(metaEd.entity.enumeration.size).toBe(1);
  });

  it('should have validation failure', () => {
    expect(failures).toHaveLength(1);
    expect(failures[0].validatorName).toBe('EnumerationItemsMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when enumeration items have duplicate short descriptions should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when enumeration items have duplicate short descriptions should have validation failure -> sourceMap');
  });
});

describe('when enumeration items have multiple duplicate short descriptions', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('edfi')
      .withStartEnumeration('EntityName')
      .withDocumentation('EntityDocumentation')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription1', 'EnumerationItemDocumentation2')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation1')
      .withEnumerationItem('ShortDescription2', 'EnumerationItemDocumentation2')
      .withEndEnumeration()
      .withEndNamespace()
      .sendToListener(new EnumerationBuilder(metaEd, []));

    failures = validate(metaEd);
  });

  it('should build one enumeration', () => {
    expect(metaEd.entity.enumeration.size).toBe(1);
  });

  it('should have multiple validation failure', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('EnumerationItemsMustBeUnique');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchSnapshot('when enumeration items have multiple duplicate short descriptions should have validation failure -> message');
    expect(failures[0].sourceMap).toMatchSnapshot('when enumeration items have multiple duplicate short descriptions should have validation failure -> sourceMap');
    expect(failures[1].validatorName).toBe('EnumerationItemsMustBeUnique');
    expect(failures[1].category).toBe('error');
    expect(failures[1].message).toMatchSnapshot('when enumeration items have multiple duplicate short descriptions should have validation failure -> message');
    expect(failures[1].sourceMap).toMatchSnapshot('when enumeration items have multiple duplicate short descriptions should have validation failure -> sourceMap');
  });
});
