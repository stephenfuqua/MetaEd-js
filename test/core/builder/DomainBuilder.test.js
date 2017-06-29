// @noflow
import DomainBuilder from '../../../src/core/builder/DomainBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { metaEdEnvironmentFactory } from '../../../src/core/MetaEdEnvironment';
import type { MetaEdEnvironment } from '../../../src/core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../src/core/validator/ValidationFailure';

describe('when building domain in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.domain.get(domainName)).toBeDefined();
    expect(metaEd.entity.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].referencedType).toBe('domainEntity');
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have footer documentation', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).footerDocumentation).toBe(footerDocumentation);
  });
});

describe('when building domain with association item', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];

  const domainName: string = 'DomainName';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('EntityDocumentation')
      .withAssociationDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].referencedType).toBe('association');
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });
});

describe('when building domain with common item', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];

  const domainName: string = 'DomainName';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('EntityDocumentation')
      .withCommonDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].referencedType).toBe('common');
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });
});

describe('when building domain with inline common item', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];

  const domainName: string = 'DomainName';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('EntityDocumentation')
      .withInlineCommonDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].referencedType).toBe('inlineCommon');
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });
});

describe('when building domain with descriptor item', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];

  const domainName: string = 'DomainName';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace('namespace', 'ProjectExtension')
      .withStartDomain(domainName, '1')
      .withDocumentation('EntityDocumentation')
      .withDescriptorDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation('FooterDocumentation')
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].referencedType).toBe('descriptor');
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });
});

describe('when building duplicate domains', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()

      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.domain.get(domainName)).toBeDefined();
    expect(metaEd.entity.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have two validation failures', () => {
    expect(validationFailures).toHaveLength(2);
  });

  it('should have validation failures for each entity', () => {
    expect(validationFailures[0].validatorName).toBe('DomainBuilder');
    expect(validationFailures[0].category).toBe('error');
    expect(validationFailures[0].message).toMatchSnapshot('when building duplicate domains should have validation failures for each entity -> Domain 1 message');
    expect(validationFailures[0].sourceMap).toMatchSnapshot('when building duplicate domains should have validation failures for each entity -> Domain 1 sourceMap');

    expect(validationFailures[1].validatorName).toBe('DomainBuilder');
    expect(validationFailures[1].category).toBe('error');
    expect(validationFailures[1].message).toMatchSnapshot('when building duplicate domains should have validation failures for each entity -> Domain 2 message');
    expect(validationFailures[1].sourceMap).toMatchSnapshot('when building duplicate domains should have validation failures for each entity -> Domain 2 sourceMap');
  });
});

describe('when building subdomain in extension namespace', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(subdomainPosition);
  });
});

describe('when building domain with no domain name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = '';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build choice', () => {
    expect(metaEd.entity.domain.size).toBe(0);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with lowercase domain name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'domainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(metaEd.entity.domain.get('Name')).toBeDefined();
    expect(metaEd.entity.domain.get('Name').metaEdName).toBe('Name');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.domain.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get('Name').metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.domain.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get('Name').documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get('Name').domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get('Name').domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get('Name').domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have footer documentation', () => {
    expect(metaEd.entity.domain.get('Name').domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get('Name').footerDocumentation).toBe(footerDocumentation);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with no documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.domain.get(domainName)).toBeDefined();
    expect(metaEd.entity.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get(domainName).documentation).toBe('');
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have footer documentation', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).footerDocumentation).toBe(footerDocumentation);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with no domain item', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.domain.get(domainName)).toBeDefined();
    expect(metaEd.entity.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have no domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(0);
  });

  it('should not have footer documentation', () => {
    expect(metaEd.entity.domain.get(domainName).footerDocumentation).toBe('');
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with no text in footer documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = '\r\nfooter documentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withTrailingText(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.domain.get(domainName)).toBeDefined();
    expect(metaEd.entity.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should not have footer documentation', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).footerDocumentation).toBe('');
  });

  it('should have missing text error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withTrailingText(trailingText)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one domain', () => {
    expect(metaEd.entity.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.domain.get(domainName)).toBeDefined();
    expect(metaEd.entity.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.domain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.domain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with no subdomain name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = '';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should not build subdomain', () => {
    expect(metaEd.entity.domain.size).toBe(0);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with lowercase subdomain name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'domainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository but with lowercase prefix ignored', () => {
    expect(metaEd.entity.subdomain.get('Name')).toBeDefined();
    expect(metaEd.entity.subdomain.get('Name').metaEdName).toBe('Name');
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have parent domain', () => {
    expect(metaEd.entity.subdomain.get('Name').parentMetaEdName).toBe(parentDomainName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get('Name').namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get('Name').metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get('Name').namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.subdomain.get('Name').documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get('Name').domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get('Name').domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get('Name').domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get('Name').position).toBe(subdomainPosition);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with no parent domain name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, '', domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should not have parent domain', () => {
    expect(metaEd.entity.subdomain.get(domainName).parentMetaEdName).toBe('');
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(subdomainPosition);
  });

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with lowercase parent domain name', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'parentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have parent domain but with lowercase prefix ignored', () => {
    expect(metaEd.entity.subdomain.get(domainName).parentMetaEdName).toBe('DomainName');
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(subdomainPosition);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with no documentation', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have parent domain', () => {
    expect(metaEd.entity.subdomain.get(domainName).parentMetaEdName).toBe(parentDomainName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe('');
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(subdomainPosition);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with no domain item', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have parent domain', () => {
    expect(metaEd.entity.subdomain.get(domainName).parentMetaEdName).toBe(parentDomainName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have no domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(0);
  });

  it('should have position but with the number ignored', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(0);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with no unsigned int in position', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: string = '\r\nposition';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withTrailingText(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have parent domain', () => {
    expect(metaEd.entity.subdomain.get(domainName).parentMetaEdName).toBe(parentDomainName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position with default value', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(0);
  });

  it('should have missing unsigned int error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with invalid trailing text', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withTrailingText(trailingText)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(metaEd.entity.subdomain.get(domainName)).toBeDefined();
    expect(metaEd.entity.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have no validation failures', () => {
    expect(validationFailures).toHaveLength(0);
  });

  it('should have parent domain', () => {
    expect(metaEd.entity.subdomain.get(domainName).parentMetaEdName).toBe(parentDomainName);
  });

  it('should have namespace', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have project extension', () => {
    expect(metaEd.entity.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have no documentation', () => {
    expect(metaEd.entity.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(metaEd.entity.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(metaEd.entity.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get(domainName).position).toBe(subdomainPosition);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain source map', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have type', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have namespaceInfo', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.namespaceInfo).toBeDefined();
  });

  it('should have domainItems', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.domainItems).toHaveLength(1);
  });

  it('should have footerDocumentation', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap.footerDocumentation).toBeDefined();
  });

  it('should have line, column, text', () => {
    expect(metaEd.entity.domain.get(domainName).sourceMap).toMatchSnapshot();
  });
});

describe('when building subdomain source map', () => {
  const metaEd: MetaEdEnvironment = metaEdEnvironmentFactory();
  const validationFailures: Array<ValidationFailure> = [];
  const namespace: string = 'namespace';

  const subdomainName: string = 'SubdomainName';
  const parentDomainName: string = 'ParentDomainName';
  const metaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(metaEd, validationFailures);

    MetaEdTextBuilder.build()
      .withBeginNamespace(namespace)
      .withStartSubdomain(subdomainName, parentDomainName, metaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should build one subdomain', () => {
    expect(metaEd.entity.subdomain.size).toBe(1);
  });

  it('should have type', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.type).toBeDefined();
  });

  it('should have documentation', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.documentation).toBeDefined();
  });

  it('should have metaEdName', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.metaEdName).toBeDefined();
  });

  it('should have metaEdId', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.metaEdId).toBeDefined();
  });

  it('should have namespaceInfo', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.namespaceInfo).toBeDefined();
  });

  it('should have domainItems', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.domainItems).toHaveLength(1);
  });

  it('should have parent', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.parent).toBeDefined();
  });

  it('should have parentMetaEdName', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.parentMetaEdName).toBeDefined();
  });

  it('should have position', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap.position).toBeDefined();
  });

  it('should have line, column, text', () => {
    expect(metaEd.entity.subdomain.get(subdomainName).sourceMap).toMatchSnapshot();
  });
});
