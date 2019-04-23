import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  DomainEntityBuilder,
  NamespaceBuilder,
  MetaEdEnvironment,
} from 'metaed-core';
import { enhance as outReferencePathEnhancer } from '../../src/enhancer/OutReferencePathEnhancer';
import { enhance as domainEntityReferenceEnhancer } from '../../src/enhancer/property/DomainEntityReferenceEnhancer';

describe('when domain entity has single reference to a second domain entity', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;

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
  });

  it('should build two domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(2);
  });

  it('should have DE1 with out path to DE2', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('DE2')
  });

  it('should have DE2 with no out paths', () => {
    expect(coreNamespace.entity.domainEntity.get('DE2').outReferencePaths).toHaveLength(0);
  });
});

describe('when domain entity has single reference to a second domain entity with reference to a third', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE2', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2')
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
  });

  it('should build three domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(3);
  });

  it('should have DE1 with out path to DE3', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(2);
    expect(outReferencePath[0].metaEdName).toBe('DE2')
    expect(outReferencePath[1].metaEdName).toBe('DE3')
  });

  it('should have DE2 with out path to DE3', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE2');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('DE3')
  });

  it('should have DE3 with no out paths', () => {
    expect(coreNamespace.entity.domainEntity.get('DE3').outReferencePaths).toHaveLength(0);
  });
});

describe('when domain entity has dual references to domain entities with reference to another', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;

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
      .withDomainEntityProperty('DE3a', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2b')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3b', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE3a')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE3b')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
  });

  it('should build five domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(5);
  });

  it('should have DE1 with out path to DE3a', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(2);
    const outReferencePathA = outReferencePaths[0];
    expect(outReferencePathA).toHaveLength(2);
    expect(outReferencePathA[0].metaEdName).toBe('DE2a')
    expect(outReferencePathA[1].metaEdName).toBe('DE3a')
  });

  it('should have DE1 with out path to DE3b', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(2);
    const outReferencePathB = outReferencePaths[1];
    expect(outReferencePathB).toHaveLength(2);
    expect(outReferencePathB[0].metaEdName).toBe('DE2b')
    expect(outReferencePathB[1].metaEdName).toBe('DE3b')
  });

  it('should have DE2a with out path to DE3a', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE2a');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('DE3a')
  });

  it('should have DE2b with out path to DE3b', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE2b');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('DE3b')
  });

  it('should have DE3a with no out paths', () => {
    expect(coreNamespace.entity.domainEntity.get('DE3a').outReferencePaths).toHaveLength(0);
  });

  it('should have DE3b with no out paths', () => {
    expect(coreNamespace.entity.domainEntity.get('DE3b').outReferencePaths).toHaveLength(0);
  });
});

describe('when domain entity has dual references to domain entities with reference to another that is the same (diamond)', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;

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
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have DE1 with 1st out path to DE3', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(2);
    const outReferencePathA = outReferencePaths[0];
    expect(outReferencePathA).toHaveLength(2);
    expect(outReferencePathA[0].metaEdName).toBe('DE2a')
    expect(outReferencePathA[1].metaEdName).toBe('DE3')
  });

  it('should have DE1 with 2nd out path to DE3', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(2);
    const outReferencePathB = outReferencePaths[1];
    expect(outReferencePathB).toHaveLength(2);
    expect(outReferencePathB[0].metaEdName).toBe('DE2b')
    expect(outReferencePathB[1].metaEdName).toBe('DE3')
  });

  it('should have DE2a with out path to DE3', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE2a');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('DE3')
  });

  it('should have DE2b with out path to DE3', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE2b');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('DE3')
  });

  it('should have DE3 with no out paths', () => {
    expect(coreNamespace.entity.domainEntity.get('DE3').outReferencePaths).toHaveLength(0);
  });
});

describe('when model has a leaf attached to a cycle', () => {
  const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
  let coreNamespace: any = null;

  beforeAll(() => {
    MetaEdTextBuilder.build()
      .withBeginNamespace('EdFi')
      .withStartDomainEntity('DE1')
      .withDocumentation('doc')
      .withDomainEntityProperty('Leaf', 'doc', true, false)
      .withDomainEntityProperty('DE2', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE2')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE3', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('DE3')
      .withDocumentation('doc')
      .withDomainEntityProperty('DE1', 'doc', true, false)
      .withEndDomainEntity()

      .withStartDomainEntity('Leaf')
      .withDocumentation('doc')
      .withBooleanProperty('PropertyName', 'doc', true, false)
      .withEndDomainEntity()
      .withEndNamespace()

      .sendToListener(new NamespaceBuilder(metaEd, []))
      .sendToListener(new DomainEntityBuilder(metaEd, []));

    coreNamespace = metaEd.namespace.get('EdFi');
    domainEntityReferenceEnhancer(metaEd);
    outReferencePathEnhancer(metaEd);
  });

  it('should build four domain entities', () => {
    expect(coreNamespace.entity.domainEntity.size).toBe(4);
  });

  it('should have DE1 with out path direct to Leaf', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE1');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(1);
    expect(outReferencePath[0].metaEdName).toBe('Leaf')
  });

  it('should have DE2 with out path to Leaf via DE3 -> DE1', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE2');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(3);
    expect(outReferencePath[0].metaEdName).toBe('DE3');
    expect(outReferencePath[1].metaEdName).toBe('DE1');
    expect(outReferencePath[2].metaEdName).toBe('Leaf');
  });

  it('should have DE3 with out path to Leaf via DE1', () => {
    const { outReferencePaths } = coreNamespace.entity.domainEntity.get('DE3');
    expect(outReferencePaths).toHaveLength(1);
    const outReferencePath = outReferencePaths[0];
    expect(outReferencePath).toHaveLength(2);
    expect(outReferencePath[0].metaEdName).toBe('DE1');
    expect(outReferencePath[1].metaEdName).toBe('Leaf');
  });

  it('should have Leaf with no out paths', () => {
    expect(coreNamespace.entity.domainEntity.get('Leaf').outReferencePaths).toHaveLength(0);
  });
});
