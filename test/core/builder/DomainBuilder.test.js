// @noflow
import DomainBuilder from '../../../src/core/builder/DomainBuilder';
import MetaEdTextBuilder from '../MetaEdTextBuilder';
import { entityRepositoryFactory } from '../../../src/core/model/Repository';
import type { EntityRepository } from '../../../src/core/model/Repository';

describe('when building domain in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

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
    expect(entityRepository.domain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.domain.get(domainName)).toBeDefined();
    expect(entityRepository.domain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.domain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(entityRepository.domain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.domain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct entity documentation', () => {
    expect(entityRepository.domain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(entityRepository.domain.get(domainName).domainItems).toHaveLength(1);
    expect(entityRepository.domain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(entityRepository.domain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have correct footer documentation', () => {
    expect(entityRepository.domain.get(domainName).domainItems).toHaveLength(1);
    expect(entityRepository.domain.get(domainName).footerDocumentation).toBe(footerDocumentation);
  });
});

describe('when building subdomain in extension namespace', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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
    expect(entityRepository.subdomain.size).toBe(1);
  });

  it('should be found in entity repository', () => {
    expect(entityRepository.subdomain.get(domainName)).toBeDefined();
    expect(entityRepository.subdomain.get(domainName).metaEdName).toBe(domainName);
  });

  it('should have correct namespace', () => {
    expect(entityRepository.subdomain.get(domainName).namespaceInfo.namespace).toBe(namespace);
  });

  it('should have correct metaEdId', () => {
    expect(entityRepository.subdomain.get(domainName).metaEdId).toBe(domainMetaEdId);
  });

  it('should have correct project extension', () => {
    expect(entityRepository.subdomain.get(domainName).namespaceInfo.projectExtension).toBe(projectExtension);
  });

  it('should have correct entity documentation', () => {
    expect(entityRepository.subdomain.get(domainName).documentation).toBe(entityDocumentation);
  });

  it('should have one domain item', () => {
    expect(entityRepository.subdomain.get(domainName).domainItems).toHaveLength(1);
    expect(entityRepository.subdomain.get(domainName).domainItems[0].metaEdName).toBe(domainItemName);
    expect(entityRepository.subdomain.get(domainName).domainItems[0].metaEdId).toBe(domainItemMetaEdId);
  });

  it('should have correct position', () => {
    expect(entityRepository.subdomain.get(domainName).position).toBe(subdomainPosition);
  });
});

describe('when building domain with missing domain name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with lowercase domain name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '2';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with missing domain item', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';

  const projectExtension: string = 'ProjectExtension';
  const domainName: string = 'DomainName';
  const domainMetaEdId: string = '1';
  const entityDocumentation: string = 'EntityDocumentation';
  const footerDocumentation: string = 'FooterDocumentation';

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartDomain(domainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withFooterDocumentation(footerDocumentation)
      .withEndDomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with missing text in footer documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have missing text error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building domain with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with missing subdomain name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with lowercase subdomain name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with missing parent domain name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = '';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

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

  it('should have missing id error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with lowercase parent domain name', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with missing documentation', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'parentDomainName';
  const domainMetaEdId: string = '10';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with missing domain item', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const subdomainPosition: number = 1;

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withSubdomainPosition(subdomainPosition)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have mismatched input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with missing unsigned int in position', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
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
    const builder = new DomainBuilder(entityRepository);

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

  it('should have missing unsigned int error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

describe('when building subdomain with invalid trailing text', () => {
  const entityRepository: EntityRepository = entityRepositoryFactory();
  const textBuilder: MetaEdTextBuilder = MetaEdTextBuilder.build();
  const namespace: string = 'namespace';
  const projectExtension: string = 'ProjectExtension';

  const domainName: string = 'DomainName';
  const parentDomainName: string = 'ParentDomainName';
  const domainMetaEdId: string = '10';
  const entityDocumentation: string = 'EntityDocumentation';
  const domainItemName: string = 'DomainItemName';
  const domainItemMetaEdId: string = '20';
  const trailingText: string = '\r\nTrailingText';

  beforeAll(() => {
    const builder = new DomainBuilder(entityRepository);

    textBuilder
      .withBeginNamespace(namespace, projectExtension)
      .withStartSubdomain(domainName, parentDomainName, domainMetaEdId)
      .withDocumentation(entityDocumentation)
      .withDomainEntityDomainItem(domainItemName, domainItemMetaEdId)
      .withTrailingText(trailingText)
      .withEndSubdomain()
      .withEndNamespace()
      .sendToListener(builder);
  });

  it('should have extraneous input error', () => {
    expect(textBuilder.errorMessages).toMatchSnapshot();
  });
});

