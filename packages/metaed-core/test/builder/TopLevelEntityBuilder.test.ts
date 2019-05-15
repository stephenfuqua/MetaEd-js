import { DomainEntityBuilder } from '../../src/builder/DomainEntityBuilder';
import { NamespaceBuilder } from '../../src/builder/NamespaceBuilder';
import { MetaEdTextBuilder } from '../../src/grammar/MetaEdTextBuilder';
import { newMetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { NoSourceMap } from '../../src/model/SourceMap';
import { getDomainEntity } from '../TestHelper';
import { asAssociationProperty } from '../../src/model/property/AssociationProperty';
import { asCommonProperty } from '../../src/model/property/CommonProperty';
import { asDecimalProperty } from '../../src/model/property/DecimalProperty';
import { asDomainEntityProperty } from '../../src/model/property/DomainEntityProperty';
import { asIntegerProperty } from '../../src/model/property/IntegerProperty';
import { asReferentialProperty } from '../../src/model/property/ReferentialProperty';
import { asSharedStringProperty } from '../../src/model/property/SharedStringProperty';
import { asShortProperty } from '../../src/model/property/ShortProperty';
import { asStringProperty } from '../../src/model/property/StringProperty';
import { AssociationPropertySourceMap } from '../../src/model/property/AssociationProperty';
import { CommonPropertySourceMap } from '../../src/model/property/CommonProperty';
import { DecimalPropertySourceMap } from '../../src/model/property/DecimalProperty';
import { DomainEntityPropertySourceMap } from '../../src/model/property/DomainEntityProperty';
import { IntegerPropertySourceMap } from '../../src/model/property/IntegerProperty';
import { ReferentialPropertySourceMap } from '../../src/model/property/ReferentialProperty';
import { ShortPropertySourceMap } from '../../src/model/property/ShortProperty';
import { StringPropertySourceMap } from '../../src/model/property/StringProperty';
import { MetaEdEnvironment } from '../../src/MetaEdEnvironment';
import { ValidationFailure } from '../../src/validator/ValidationFailure';

// AssociationProperty
describe('when building association property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'association';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have association property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have names', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].metaEdName).toBe(propertyName);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].fullPropertyName).toBe(propertyName);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

describe('when building association property with weak reference', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'association';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false)
      .withIsWeakReference(true)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have association property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });

  it('should have isWeak', (): void => {
    expect(asAssociationProperty(getDomainEntity(namespace.entity, entityName).properties[0]).isWeak).toBe(true);
  });

  it('should have source map for isWeak with line, column, text', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as AssociationPropertySourceMap).isWeak,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as AssociationPropertySourceMap).isWeak,
    ).not.toBe(NoSourceMap);
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as AssociationPropertySourceMap).isWeak,
    ).toMatchSnapshot();
  });
});

// BooleanProperty
describe('when building boolean property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'boolean';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withBooleanProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have boolean property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// ChoiceProperty
describe('when building choice property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'choice';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withChoiceProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have choice property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// CommonProperty
describe('when building common property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'common';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withCommonProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have common property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

describe('when building common property with extension override', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'common';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withCommonExtensionOverrideProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have common property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });

  it('should have isExtensionOverride', (): void => {
    expect(asCommonProperty(getDomainEntity(namespace.entity, entityName).properties[0]).isExtensionOverride).toBe(true);
  });

  it('should have source map for isExtensionOverride with line, column, text', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as CommonPropertySourceMap).isExtensionOverride,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as CommonPropertySourceMap).isExtensionOverride,
    ).not.toBe(NoSourceMap);
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as CommonPropertySourceMap).isExtensionOverride,
    ).toMatchSnapshot();
  });
});

// CurrencyProperty
describe('when building currency property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'currency';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withCurrencyProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have currency property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// DateProperty
describe('when building date property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'date';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDateProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have date property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// Datetime Property
describe('when building datetime property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'datetime';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDatetimeProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have datetime property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// DecimalProperty
describe('when building decimal property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'decimal';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const totalDigits = '6';
  const decimalPlaces = '2';
  const minValue = '100';
  const maxValue = '1000';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDecimalProperty(propertyName, propertyDocumentation, true, false, totalDigits, decimalPlaces, minValue, maxValue)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have integer property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
  });

  it('should have hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].hasRestriction).toBe(true);
  });

  it('should have source map for hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).not.toBe(NoSourceMap);
  });

  it('should have totalDigits', (): void => {
    expect(asDecimalProperty(getDomainEntity(namespace.entity, entityName).properties[0]).totalDigits).toBe(totalDigits);
  });

  it('should have source map for totalDigits', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).totalDigits,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).totalDigits,
    ).not.toBe(NoSourceMap);
  });

  it('should have decimalPlaces', (): void => {
    expect(asDecimalProperty(getDomainEntity(namespace.entity, entityName).properties[0]).decimalPlaces).toBe(decimalPlaces);
  });

  it('should have source map for decimalPlaces', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).decimalPlaces,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).decimalPlaces,
    ).not.toBe(NoSourceMap);
  });

  it('should have minValue', (): void => {
    expect(asDecimalProperty(getDomainEntity(namespace.entity, entityName).properties[0]).minValue).toBe(minValue);
  });

  it('should have source map for minValue', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).minValue,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).minValue,
    ).not.toBe(NoSourceMap);
  });

  it('should have maxValue', (): void => {
    expect(asDecimalProperty(getDomainEntity(namespace.entity, entityName).properties[0]).maxValue).toBe(maxValue);
  });

  it('should have source map for maxValue', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).maxValue,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DecimalPropertySourceMap).maxValue,
    ).not.toBe(NoSourceMap);
  });

  it('should have source map with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap).toMatchSnapshot();
  });
});

// DescriptorProperty
describe('when building descriptor property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'descriptor';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDescriptorProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have descriptor property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// DomainEntityProperty
describe('when building domain entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'domainEntity';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDomainEntityElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have domain entity property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

describe('when building domain entity property with weak reference', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'domainEntity';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDomainEntityElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withIsWeakReference(true)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have domain entity property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });

  it('should have isWeak', (): void => {
    expect(asDomainEntityProperty(getDomainEntity(namespace.entity, entityName).properties[0]).isWeak).toBe(true);
  });

  it('should have source map for isWeak with line, column, text', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DomainEntityPropertySourceMap).isWeak,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DomainEntityPropertySourceMap).isWeak,
    ).not.toBe(NoSourceMap);
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as DomainEntityPropertySourceMap).isWeak,
    ).toMatchSnapshot();
  });
});

// DurationProperty
describe('when building duration property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'duration';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withDurationProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have duration property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// EntityProperty
// TODO: add fullPropertyName source map
describe('when building required entity properties', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'entityDocumentation';
  const propertyType = 'association';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const metaEdId = '1';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, true, false, false, null, metaEdId)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have association property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have association property in property index', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0]).toBe(metaEd.propertyIndex.association[0]);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have documentation', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].documentation).toBe(propertyDocumentation);
  });

  it('should have metaEdName', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].metaEdName).toBe(propertyName);
  });

  it('should have metaEdId', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].metaEdId).toBe(metaEdId);
  });

  it('should have namespace', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].namespace).toBeDefined();
  });

  it('should have parentEntityName', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].parentEntityName).toBe(entityName);
  });

  it('should have parentEntity', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].parentEntity).toBeDefined();
  });

  it('should have isRequired', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].isRequired).toBe(true);
  });

  it('should have source map for type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
  });

  it('should have source map for documentation', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.documentation).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.documentation).not.toBe(NoSourceMap);
  });

  it('should have source map for metaEdName', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.metaEdName).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.metaEdName).not.toBe(NoSourceMap);
  });

  it('should have source map for metaEdId', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.metaEdId).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.metaEdId).not.toBe(NoSourceMap);
  });

  it('should have source map for parentEntityName', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.parentEntityName).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.parentEntityName).not.toBe(NoSourceMap);
  });

  it('should have source map for parentEntity', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.parentEntity).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.parentEntity).not.toBe(NoSourceMap);
  });

  it('should have source map for isRequired', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isRequired).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isRequired).not.toBe(NoSourceMap);
  });

  it('should have source map with line, column, text for each property', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap).toMatchSnapshot();
  });
});

describe('when building entity property with inherited documentation', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const inheritedDocumentation = 'inherited';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, inheritedDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have documentationInherited', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].documentationInherited).toBe(true);
  });

  it('should not have documentation', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].documentation).toBe('');
  });

  it('should have source map for documentationInherited with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.documentationInherited).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.documentationInherited).not.toBe(
      NoSourceMap,
    );
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.documentationInherited).toMatchSnapshot();
  });
});

describe('when building identity entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyDocumentation = 'PropertyDocumentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withIdentityIndicator()
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have entity identity property', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties).toHaveLength(1);
  });

  it('should have entity source map for identity properties with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).sourceMap.identityProperties).toHaveLength(1);
    expect(getDomainEntity(namespace.entity, entityName).sourceMap.identityProperties).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).sourceMap.identityProperties).toMatchSnapshot();
  });

  it('should have source map for isPartOfIdentity with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.isPartOfIdentity).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.isPartOfIdentity).not.toBe(
      NoSourceMap,
    );
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.isPartOfIdentity).toMatchSnapshot();
  });
});

describe('when building optional entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have isOptional', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].isOptional).toBe(true);
  });

  it('should have source map for isOptional with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isOptional).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isOptional).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isOptional).toMatchSnapshot();
  });
});

describe('when building required collection entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, true, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have isRequiredCollection', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].isRequiredCollection).toBe(true);
  });

  it('should have source map for isRequiredCollection with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isRequiredCollection).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isRequiredCollection).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isRequiredCollection).toMatchSnapshot();
  });
});

describe('when building optional collection entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, true, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have isOptionalCollection', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].isOptionalCollection).toBe(true);
  });

  it('should have source map for isOptionalCollection with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isOptionalCollection).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isOptionalCollection).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.isOptionalCollection).toMatchSnapshot();
  });
});

describe('when building entity property role name', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const contextName = 'ContextName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false, false)
      .roleName(contextName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have roleName', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].roleName).toBe(contextName);
  });

  it('should have names', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].metaEdName).toBe(propertyName);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].fullPropertyName).toBe(
      `${contextName}${propertyName}`,
    );
  });

  it('should have source map for contextName with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.roleName).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.roleName).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.roleName).toMatchSnapshot();
  });
});

describe('when building entity property with shortened context', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const contextName = 'ContextName';
  const shortenToName = 'ShortenToName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationProperty(propertyName, propertyDocumentation, false, false, false)
      .roleName(contextName, shortenToName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have shortenTo', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].shortenTo).toBe(shortenToName);
  });

  it('should have source map for shortenTo with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.shortenTo).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.shortenTo).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.shortenTo).toMatchSnapshot();
  });
});

describe('when building renamed identity entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const baseName = 'BaseName';
  const baseDocumentation = 'BaseDocumentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationElement(baseName)
      .withDocumentation(baseDocumentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withIdentityRenameIndicator(baseName)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have entity identity property', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties).toHaveLength(1);
  });

  it('should have isIdentityRename', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].isIdentityRename).toBe(true);
  });

  it('should have baseKeyName', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].baseKeyName).toBe(baseName);
  });

  it('should have source map for isIdentityRename with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.isIdentityRename).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.isIdentityRename).not.toBe(
      NoSourceMap,
    );
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.isIdentityRename).toMatchSnapshot();
  });

  it('should have source map for baseKeyName with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.baseKeyName).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.baseKeyName).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).identityProperties[0].sourceMap.baseKeyName).toMatchSnapshot();
  });
});

describe('when building queryable entity property ', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyDocumentation = 'PropertyDocumentation';
  const propertyName = 'PropertyName';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withQueryableOnlyPropertyIndicator()
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have entity queryable field', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).queryableFields).toHaveLength(1);
  });

  it('should have entity source map for queryable field with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).sourceMap.queryableFields).toHaveLength(1);
    expect(getDomainEntity(namespace.entity, entityName).sourceMap.queryableFields).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).sourceMap.queryableFields).toMatchSnapshot();
  });

  it('should have source map for isQueryableOnly with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).queryableFields[0].sourceMap.isQueryableOnly).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).queryableFields[0].sourceMap.isQueryableOnly).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).queryableFields[0].sourceMap.isQueryableOnly).toMatchSnapshot();
  });
});

describe('when building shared entity property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withSharedDecimalProperty(propertyName, '', propertyDocumentation, false, false)
      .withEndDomainEntity()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have entity property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have referencedType', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].referencedType).toBe(propertyName);
  });

  it('should have source map for referencedType with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.referencedType).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.referencedType).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.referencedType).toMatchSnapshot();
  });
});

// EnumerationProperty
describe('when building enumeration property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'enumeration';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withEnumerationProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have enumeration property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// InlineCommonProperty
describe('when building inline common property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'inlineCommon';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withInlineCommonProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have inline common property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// IntegerProperty
describe('when building integer property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'integer';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const minValue = '100';
  const maxValue = '1000';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withIntegerProperty(propertyName, propertyDocumentation, true, false, maxValue, minValue)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have integer property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
  });

  it('should have hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].hasRestriction).toBe(true);
  });

  it('should have source map for hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).not.toBe(NoSourceMap);
  });

  it('should have minValue', (): void => {
    expect(asIntegerProperty(getDomainEntity(namespace.entity, entityName).properties[0]).minValue).toBe(minValue);
  });

  it('should have source map for minValue', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as IntegerPropertySourceMap).minValue,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as IntegerPropertySourceMap).minValue,
    ).not.toBe(NoSourceMap);
  });

  it('should have maxValue', (): void => {
    expect(asIntegerProperty(getDomainEntity(namespace.entity, entityName).properties[0]).maxValue).toBe(maxValue);
  });

  it('should have source map for maxValue', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as IntegerPropertySourceMap).maxValue,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as IntegerPropertySourceMap).maxValue,
    ).not.toBe(NoSourceMap);
  });

  it('should have source map with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap).toMatchSnapshot();
  });
});

// MergeDirective
// TODO: add type, sourceProperty, and targetProperty source maps
describe('when building merge directive reference', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const propertyName = 'PropertyName';
  const entityDocumentation = 'Documentation';
  const sourcePropertyPathStrings = 'Entity.Property';
  const targetPropertyPathStrings = 'TargetEntity.TargetProperty';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(propertyName, entityDocumentation, true, false)
      .withMergeDirective(sourcePropertyPathStrings, targetPropertyPathStrings)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have property in merge properties', (): void => {
    expect(asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives).toHaveLength(
      1,
    );
  });

  it('should have sourcePropertyPathStrings', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings,
    ).toHaveLength(2);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings[0],
    ).toBe(sourcePropertyPathStrings.split('.')[0]);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings[1],
    ).toBe(sourcePropertyPathStrings.split('.')[1]);
  });

  it('should have source map for sourcePropertyPathStrings with line, column, text', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0].sourceMap
        .sourcePropertyPathStrings,
    ).toMatchSnapshot();
  });

  it('should have targetPropertyPathStrings', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings,
    ).toHaveLength(2);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings[0],
    ).toBe(targetPropertyPathStrings.split('.')[0]);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings[1],
    ).toBe(targetPropertyPathStrings.split('.')[1]);
  });

  it('should have source map for targetPropertyPathStrings with line, column, text', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0].sourceMap
        .targetPropertyPathStrings,
    ).toMatchSnapshot();
  });
});

describe('when building multiple merge property references', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';
  const entityName = 'EntityName';
  const propertyName = 'PropertyName';
  const entityDocumentation = 'Documentation';

  const sourcePropertyPathStrings0 = 'SourcePropertyPath0';
  const targetPropertyPathStrings0 = 'TargetPropertyPath0';
  const sourcePropertyPathStrings1 = 'SourcePropertyPath1';
  const targetPropertyPathStrings1 = 'TargetPropertyPath1';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withDomainEntityProperty(propertyName, entityDocumentation, true, false)
      .withMergeDirective(sourcePropertyPathStrings0, targetPropertyPathStrings0)
      .withMergeDirective(sourcePropertyPathStrings1, targetPropertyPathStrings1)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have multiple properties in merge directives', (): void => {
    expect(asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives).toHaveLength(
      2,
    );
  });

  it('should have sourcePropertyPathStrings and targetPropertyPathStrings for first merge directive', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings[0],
    ).toBe(sourcePropertyPathStrings0);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings[0],
    ).toBe(targetPropertyPathStrings0);
  });

  it('should have source map for first merge directive', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0].sourceMap,
    ).toMatchSnapshot();
  });

  it('should have sourcePropertyPathStrings and targetPropertyPathStrings for second merge directive', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .sourcePropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .targetPropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .sourcePropertyPathStrings[0],
    ).toBe(sourcePropertyPathStrings1);
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .targetPropertyPathStrings[0],
    ).toBe(targetPropertyPathStrings1);
  });

  it('should have source map for second merge directive', (): void => {
    expect(
      asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1].sourceMap,
    ).toMatchSnapshot();
  });
});

describe('when building multiple merge property references for a shared simple type', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';
  const entityName = 'EntityName';
  const propertyName = 'PropertyName';

  const sourcePropertyPathStrings0 = 'SourcePropertyPath0';
  const targetPropertyPathStrings0 = 'TargetPropertyPath0';
  const sourcePropertyPathStrings1 = 'SourcePropertyPath1';
  const targetPropertyPathStrings1 = 'TargetPropertyPath1';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation('doc')
      .withSharedStringProperty(propertyName, propertyName, 'doc', true, false)
      .withMergeDirective(sourcePropertyPathStrings0, targetPropertyPathStrings0)
      .withMergeDirective(sourcePropertyPathStrings1, targetPropertyPathStrings1)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have multiple properties in merge directives', (): void => {
    expect(asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives).toHaveLength(
      2,
    );
  });

  it('should have sourcePropertyPathStrings and targetPropertyPathStrings for first merge directive', (): void => {
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .sourcePropertyPathStrings[0],
    ).toBe(sourcePropertyPathStrings0);
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0]
        .targetPropertyPathStrings[0],
    ).toBe(targetPropertyPathStrings0);
  });

  it('should have source map for first merge directive', (): void => {
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[0].sourceMap,
    ).toMatchSnapshot();
  });

  it('should have sourcePropertyPathStrings and targetPropertyPathStrings for second merge directive', (): void => {
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .sourcePropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .targetPropertyPathStrings,
    ).toHaveLength(1);
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .sourcePropertyPathStrings[0],
    ).toBe(sourcePropertyPathStrings1);
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1]
        .targetPropertyPathStrings[0],
    ).toBe(targetPropertyPathStrings1);
  });

  it('should have source map for second merge directive', (): void => {
    expect(
      asSharedStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives[1].sourceMap,
    ).toMatchSnapshot();
  });
});

// PercentProperty
describe('when building percent property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'percent';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withPercentProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have percent property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// ReferentialProperty
// TODO: add referencedEntity source map
describe('when building referential property with merge directives', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const sourcePropertyPathStrings = 'MergeDirective';
  const targetPropertyPathStrings = 'MergeDirectiveTarget';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withAssociationElement(propertyName)
      .withDocumentation(propertyDocumentation)
      .withMergeDirective(sourcePropertyPathStrings, targetPropertyPathStrings)
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have merge directive', (): void => {
    expect(asReferentialProperty(getDomainEntity(namespace.entity, entityName).properties[0]).mergeDirectives).toHaveLength(
      1,
    );
  });

  it('should have source map for mergeDirectives with line, column, text', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ReferentialPropertySourceMap)
        .mergeDirectives,
    ).not.toBe(NoSourceMap);
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ReferentialPropertySourceMap)
        .mergeDirectives,
    ).toMatchSnapshot();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ReferentialPropertySourceMap)
        .mergeDirectives,
    ).toHaveLength(1);
  });
});

// SchoolYearEnumerationProperty
describe('when building school year enumeration property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'schoolYearEnumeration';
  const propertyName = 'SchoolYear';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withEnumerationProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have school year enumeration property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// SharedDecimalProperty
describe('when building shared decimal property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'sharedDecimal';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withSharedDecimalProperty(propertyName, null, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have shared decimal property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// SharedIntegerProperty
describe('when building shared integer property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'sharedInteger';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withSharedIntegerProperty(propertyName, null, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have shared integer property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// SharedStringProperty
describe('when building shared string property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'sharedString';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withSharedStringProperty(propertyName, null, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have shared string property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// ShortProperty
describe('when building short property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'short';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const minValue = '100';
  const maxValue = '1000';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withShortProperty(propertyName, propertyDocumentation, true, false, maxValue, minValue)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have short property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
  });

  it('should have hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].hasRestriction).toBe(true);
  });

  it('should have source map for hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).not.toBe(NoSourceMap);
  });

  it('should have minValue', (): void => {
    expect(asShortProperty(getDomainEntity(namespace.entity, entityName).properties[0]).minValue).toBe(minValue);
  });

  it('should have source map for minValue', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ShortPropertySourceMap).minValue,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ShortPropertySourceMap).minValue,
    ).not.toBe(NoSourceMap);
  });

  it('should have maxValue', (): void => {
    expect(asShortProperty(getDomainEntity(namespace.entity, entityName).properties[0]).maxValue).toBe(maxValue);
  });

  it('should have source map for maxValue', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ShortPropertySourceMap).maxValue,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as ShortPropertySourceMap).maxValue,
    ).not.toBe(NoSourceMap);
  });

  it('should have source map with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap).toMatchSnapshot();
  });
});

// StringProperty
describe('when building string property', (): void => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'string';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  const minLength = '100';
  const maxLength = '1000';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, []);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withStringProperty(propertyName, propertyDocumentation, true, false, maxLength, minLength)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have string property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
  });

  it('should have hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].hasRestriction).toBe(true);
  });

  it('should have source map for hasRestriction', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.hasRestriction).not.toBe(NoSourceMap);
  });

  it('should have minLength', (): void => {
    expect(asStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).minLength).toBe(minLength);
  });

  it('should have source map for minLength', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as StringPropertySourceMap).minLength,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as StringPropertySourceMap).minLength,
    ).not.toBe(NoSourceMap);
  });

  it('should have maxLength', (): void => {
    expect(asStringProperty(getDomainEntity(namespace.entity, entityName).properties[0]).maxLength).toBe(maxLength);
  });

  it('should have source map for maxLength', (): void => {
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as StringPropertySourceMap).maxLength,
    ).toBeDefined();
    expect(
      (getDomainEntity(namespace.entity, entityName).properties[0].sourceMap as StringPropertySourceMap).maxLength,
    ).not.toBe(NoSourceMap);
  });

  it('should have source map with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap).toMatchSnapshot();
  });
});

// TimeProperty
describe('when building time property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'time';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withTimeProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have time property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});

// YearProperty
describe('when building year property', (): void => {
  const validationFailures: ValidationFailure[] = [];
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  const namespaceName = 'Namespace';

  const entityName = 'EntityName';
  const entityDocumentation = 'Documentation';
  const propertyType = 'year';
  const propertyName = 'PropertyName';
  const propertyDocumentation = 'PropertyDocumentation';
  let namespace: any = null;

  beforeAll(() => {
    const builder = new DomainEntityBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespaceName)
      .withStartDomainEntity(entityName)
      .withDocumentation(entityDocumentation)
      .withYearProperty(propertyName, propertyDocumentation, false, false)
      .withEndDomainEntity()
      .withEndNamespace()
      .sendToListener(new NamespaceBuilder(metaEd, validationFailures))
      .sendToListener(builder);

    namespace = metaEd.namespace.get(namespaceName);
  });

  it('should have year property in entity properties', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties).toHaveLength(1);
  });

  it('should have type', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].type).toBe(propertyType);
  });

  it('should have source map for type with line, column, text', (): void => {
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toBeDefined();
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).not.toBe(NoSourceMap);
    expect(getDomainEntity(namespace.entity, entityName).properties[0].sourceMap.type).toMatchSnapshot();
  });
});
