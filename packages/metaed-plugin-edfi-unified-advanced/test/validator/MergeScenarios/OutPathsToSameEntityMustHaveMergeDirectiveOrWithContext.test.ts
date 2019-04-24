import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  DomainEntityBuilder,
  DomainEntityExtensionBuilder,
  DomainEntitySubclassBuilder,
  MetaEdEnvironment,
  NamespaceBuilder,
  ValidationFailure,
} from 'metaed-core';
import {
  outReferencePathEnhancer,
  domainEntityReferenceEnhancer,
  domainEntityExtensionBaseClassEnhancer,
  domainEntitySubclassBaseClassEnhancer,
} from 'metaed-plugin-edfi-unified';
import { validate } from '../../../src/validator/MergeScenarios/OutPathsToSameEntityMustHaveMergeDirectiveOrWithContext';

describe('when domain entity has no multiple out paths to the same entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE2', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build two domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(2);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity has two out paths to the same entity but do not start with identities', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE2a', 'doc', true, false)
      .withDomainEntityProperty('DE2b', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity has two out paths to the same entity that start with identities but are not identities all the way', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withDomainEntityIdentity('DE2b', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity has two out paths to the same entity that start with identities and are identities all the way', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withDomainEntityIdentity('DE2b', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have two validation failures', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('OutPathsToSameEntityMustHaveMergeDirectiveOrWithContext');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchInlineSnapshot(
      `"Ambiguous merge paths exist from DE1.DE2a to DE3. Paths are [DE2a.DE3] [DE2b.DE3].  Either add a merge directive, use 'with context', or change the model."`,
    );
    expect(failures[0].sourceMap).toMatchInlineSnapshot(`
Object {
  "column": 18,
  "line": 5,
  "tokenText": "DE2a",
}
`);
  });
});

describe('when domain entity has two out paths to the same entity and only one starts with identities and both are identities the rest of the way', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withDomainEntityProperty('DE2b', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have two validation failures', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('OutPathsToSameEntityMustHaveMergeDirectiveOrWithContext');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchInlineSnapshot(
      `"Ambiguous merge paths exist from DE1.DE2a to DE3. Paths are [DE2a.DE3] [DE2b.DE3].  Either add a merge directive, use 'with context', or change the model."`,
    );
    expect(failures[0].sourceMap).toMatchInlineSnapshot(`
Object {
  "column": 18,
  "line": 5,
  "tokenText": "DE2a",
}
`);
  });
});

describe('when domain entity has two out paths to the same entity and only one starts with identities and both are not identities the rest of the way', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withDomainEntityProperty('DE2b', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity extension has out paths without referencing same entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let extensionNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('Extension')
      .withStartDomainEntityExtension('EdFi.DE1')
      .withDomainEntityProperty('EdFi.DE2b', 'doc', true, false)
      .withEndDomainEntityExtension()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    extensionNamespace = metaEd.namespace.get('Extension');
    extensionNamespace.dependencies = [coreNamespace];
    domainEntityExtensionBaseClassEnhancer(metaEd);
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(3);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity extension has out paths to the same entity as base and only base path starts with identities and both are identities the rest of the way', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let extensionNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('Extension')
      .withStartDomainEntityExtension('EdFi.DE1')
      .withDomainEntityProperty('EdFi.DE2b', 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityExtensionBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    extensionNamespace = metaEd.namespace.get('Extension');
    extensionNamespace.dependencies = [coreNamespace];
    domainEntityExtensionBaseClassEnhancer(metaEd);
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should build one domain entity extension', () => {
    expect(extensionNamespace.entity.domainEntityExtension.size).toBe(1);
  });

  it('should have two validation failures', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('OutPathsToSameEntityMustHaveMergeDirectiveOrWithContext');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchInlineSnapshot(
      `"Ambiguous merge paths exist from DE1.DE2b to DE3. Paths are [DE2b.DE3] [DE2a.DE3].  Either add a merge directive, use 'with context', or change the model."`,
    );
    expect(failures[0].sourceMap).toMatchInlineSnapshot(`
Object {
  "column": 23,
  "line": 33,
  "tokenText": "DE2b",
}
`);
  });
});

describe('when domain entity subclass has out paths without referencing same entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let extensionNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('Extension')
      .withStartDomainEntitySubclass('DES1', 'EdFi.DE1')
      .withDomainEntityProperty('EdFi.DE2b', 'doc', true, false)
      .withEndDomainEntityExtension()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    extensionNamespace = metaEd.namespace.get('Extension');
    extensionNamespace.dependencies = [coreNamespace];
    domainEntitySubclassBaseClassEnhancer(metaEd);
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build three domain entities in core', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(3);
  });

  it('should build one domain entity in extension', () => {
    expect(extensionNamespace.entity.domainEntity.size).toBe(1);
  });

  it('should build one domain entity subclass', () => {
    expect(extensionNamespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should have no validation failures', () => {
    expect(failures).toHaveLength(0);
  });
});

describe('when domain entity subclass has out paths to the same entity as base and only base path starts with identities and both are identities the rest of the way', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;
  let extensionNamespace: any = null;
  let failures: Array<ValidationFailure>;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE2a', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2a')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityIdentity('DE3', 'doc')
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .withBeginNamespace('Extension')
      .withStartDomainEntitySubclass('DES1', 'EdFi.DE1')
      .withDocumentation('doc')
      .withDomainEntityProperty('EdFi.DE2b', 'doc', true, false)
      .withEndDomainEntityExtension()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntitySubclassBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    extensionNamespace = metaEd.namespace.get('Extension');
    extensionNamespace.dependencies = [coreNamespace];
    domainEntitySubclassBaseClassEnhancer(metaEd);
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
    failures = validate(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should build one domain entity subclass', () => {
    expect(extensionNamespace.entity.domainEntitySubclass.size).toBe(1);
  });

  it('should have two validation failures', () => {
    expect(failures).toHaveLength(2);
    expect(failures[0].validatorName).toBe('OutPathsToSameEntityMustHaveMergeDirectiveOrWithContext');
    expect(failures[0].category).toBe('error');
    expect(failures[0].message).toMatchInlineSnapshot(
      `"Ambiguous merge paths exist from DES1.DE2b to DE3. Paths are [DE2b.DE3] [DE2a.DE3].  Either add a merge directive, use 'with context', or change the model."`,
    );
    expect(failures[0].sourceMap).toMatchInlineSnapshot(`
Object {
  "column": 23,
  "line": 35,
  "tokenText": "DE2b",
}
`);
  });
});

// TODO: additional testing ideas

describe('when domain entity has three out paths to the same entity and only one starts with identities and all are identities all the way', () => {});

describe('when domain entity has three out paths to the same entity and only one starts with identities and one is not identities the rest of the way', () => {});

describe('when domain entity has two out paths to the same entity and both are non-identity collections', () => {});

describe('when domain entity has two out paths to the same entity that start with identities and are identities all the way and one has a with context', () => {});

describe('when domain entity has two out paths to the same entity that start with identities and are identities all the way and one has a merge directive', () => {});

describe('when domain entity has three out paths to the same entity and only one starts with identity and are identities all the way and only one has a merge directive', () => {});

// shared string
// with context examples
