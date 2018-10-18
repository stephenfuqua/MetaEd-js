// @flow
import R from 'ramda';
import type { MetaEdEnvironment, EnhancerResult, TopLevelEntity, SemVer } from 'metaed-core';
import { getAllEntitiesOfType, orderByProp, V2Only, versionSatisfies } from 'metaed-core';
import type { TopLevelEntityEdfiXsd } from '../../model/TopLevelEntity';
import type { NamespaceEdfiXsd } from '../../model/Namespace';
import type { EnumerationBase, EnumerationBaseEdfiXsd } from '../../model/EnumerationBase';
import type { SimpleTypeBase, SimpleTypeBaseEdfiXsd } from '../../model/SimpleTypeBase';
import type { SchemaContainer } from '../../model/schema/SchemaContainer';
import { newSchemaContainer } from '../../model/schema/SchemaContainer';
import type { SchemaSection } from '../../model/schema/SchemaSection';
import { newSchemaSection } from '../../model/schema/SchemaSection';
import { newAnnotation } from '../../model/schema/Annotation';
import { newAttribute } from '../../model/schema/Attribute';
import { newElement } from '../../model/schema/Element';
import { NoComplexType, newComplexType } from '../../model/schema/ComplexType';
import { NoSimpleType } from '../../model/schema/SimpleType';
import { NoEnumerationSimpleType } from '../../model/schema/EnumerationSimpleType';
import {
  createCodeValueSimpleType,
  createTimeIntervalSimpleType,
  createCurrencySimpleType,
  createPercentSimpleType,
} from './BaseSimpleTypeCreator';
import { typeGroupBase } from './AddComplexTypesBaseEnhancer';

const enhancerName: string = 'AddSchemaContainerEnhancerV2';
const targetVersions: SemVer = V2Only;

const complexTypesFrom = R.chain((x: TopLevelEntity) => ((x.data.edfiXsd: any): TopLevelEntityEdfiXsd).xsd_ComplexTypes);
const referenceTypesFrom = R.map((x: TopLevelEntity) => ((x.data.edfiXsd: any): TopLevelEntityEdfiXsd).xsd_ReferenceType);
const simpleTypesFrom = R.map((x: SimpleTypeBase) => ((x.data.edfiXsd: any): SimpleTypeBaseEdfiXsd).xsd_SimpleType);
const enumerationSimpleTypesFrom = R.map(
  (x: EnumerationBase) => ((x.data.edfiXsd: any): EnumerationBaseEdfiXsd).xsd_EnumerationSimpleType,
);
const manyReferenceTypesFrom = R.chain((x: TopLevelEntity) => {
  const edfiXsd = ((x.data.edfiXsd: any): TopLevelEntityEdfiXsd);
  return [edfiXsd.xsd_IdentityType, edfiXsd.xsd_LookupType, edfiXsd.xsd_ReferenceType];
});

const removeNoComplexType = R.filter(x => x !== NoComplexType);
const removeNoSimpleType = R.filter(x => x !== NoSimpleType);
const removeNoEnumerationSimpleType = R.filter(x => x !== NoEnumerationSimpleType);

const inNamespace = namespace => R.filter(x => x.namespace.namespaceName === namespace.namespaceName);

function baseSchemaSection() {
  const schemaSection: SchemaSection = Object.assign(newSchemaSection(), {
    sectionAnnotation: Object.assign(newAnnotation(), {
      documentation: '===== Base Types (borrowed from NEIM standards) =====',
    }),
  });

  const complexObjectType = Object.assign(newComplexType(), {
    name: 'ComplexObjectType',
    isAbstract: true,
    annotation: Object.assign(newAnnotation(), {
      documentation: 'This is the base type from which all entity elements are extended.',
      typeGroup: typeGroupBase,
    }),
    attributes: [
      Object.assign(newAttribute(), {
        name: 'id',
        type: 'xs:ID',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'The XML ID associated with the complex object.',
        }),
      }),
    ],
  });
  schemaSection.complexTypes.push(complexObjectType);

  const descriptorReferenceType = Object.assign(newComplexType(), {
    name: 'DescriptorReferenceType',
    baseType: 'ReferenceType',
    annotation: Object.assign(newAnnotation(), {
      documentation:
        'Provides references for descriptors during interchange. Use XML IDREF to reference a descriptor record that is included in the interchange. To lookup when already loaded, specify the full URI or the final segment of the URI.',
      typeGroup: typeGroupBase,
    }),
    items: [
      Object.assign(newElement(), {
        name: 'CodeValue',
        type: 'CodeValue',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'A globally unique identifier within this descriptor type.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'Namespace',
        type: 'URI',
        minOccurs: '0',
        annotation: Object.assign(newAnnotation(), {
          documentation:
            'An optional globally unique namespace that identifies this descriptor set. If supplied, the author is strongly encouraged to use the Universal Resource Identifier (http, ftp, file, etc.) for the source of the descriptor definition. Best practice is for this source to be the descriptor file itself, so that it can be machine-readable and be fetched in real-time, if necessary. Actual usage of this element for matching descriptors will be system-specific.',
        }),
      }),
    ],
  });
  schemaSection.complexTypes.push(descriptorReferenceType);

  const descriptorType = Object.assign(newComplexType(), {
    name: 'DescriptorType',
    baseType: 'ComplexObjectType',
    isAbstract: true,
    annotation: Object.assign(newAnnotation(), {
      documentation: 'This is the base for the Descriptor type.',
      typeGroup: typeGroupBase,
    }),
    items: [
      Object.assign(newElement(), {
        name: 'CodeValue',
        type: 'CodeValue',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'A code or abbreviation that is used to refer to the descriptor.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'ShortDescription',
        type: 'ShortDescription',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'A shortened description for the descriptor.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'Description',
        type: 'Description',
        minOccurs: '0',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'The description of the descriptor.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'EffectiveBeginDate',
        type: 'xs:date',
        minOccurs: '0',
        annotation: Object.assign(newAnnotation(), {
          documentation:
            'The beginning date of the period when the descriptor is in effect. If omitted, the default is immediate effectiveness.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'EffectiveEndDate',
        type: 'xs:date',
        minOccurs: '0',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'The end date of the period when the descriptor is in effect.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'PriorDescriptor',
        type: 'DescriptorReferenceType',
        minOccurs: '0',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'Immediately prior to the date in Effective Date, the reference to the equivalent descriptor.',
        }),
      }),
      Object.assign(newElement(), {
        name: 'Namespace',
        type: 'URI',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'A globally unique identifier for this descriptor.',
        }),
      }),
    ],
  });
  schemaSection.complexTypes.push(descriptorType);

  const referenceType = Object.assign(newComplexType(), {
    name: 'ReferenceType',
    annotation: Object.assign(newAnnotation(), {
      documentation: 'This is the base type for association references.',
      typeGroup: typeGroupBase,
    }),
    attributes: [
      Object.assign(newAttribute(), {
        name: 'id',
        type: 'xs:ID',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'The XML ID associated with this complex object.',
        }),
      }),
      Object.assign(newAttribute(), {
        name: 'ref',
        type: 'xs:IDREF',
        annotation: Object.assign(newAnnotation(), {
          documentation: 'The XML IDREF that references the object associated with this object.',
        }),
      }),
    ],
  });
  schemaSection.complexTypes.push(referenceType);

  return schemaSection;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  if (!versionSatisfies(metaEd.dataStandardVersion, targetVersions)) return { enhancerName, success: true };

  metaEd.namespace.forEach(namespace => {
    const versionString = metaEd.dataStandardVersion;
    const schemaContainer: SchemaContainer = Object.assign(newSchemaContainer(), {
      isExtension: namespace.isExtension,
      schemaAnnotation: Object.assign(newAnnotation(), {
        documentation: namespace.isExtension
          ? `===== Ed-Fi ${versionString} Extensions =====`
          : `===== Ed-Fi-Core Version ${versionString} ====`,
      }),
    });

    const complexTypesForEntitiesOfType = R.pipe(
      getAllEntitiesOfType,
      inNamespace(namespace),
      complexTypesFrom,
      removeNoComplexType,
      orderByProp('name'),
    );

    // Domain Entities
    const domainEntitiesSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Domain Entities =====',
      }),
      complexTypes: complexTypesForEntitiesOfType(metaEd, 'domainEntity', 'domainEntityExtension', 'domainEntitySubclass'),
    });
    schemaContainer.sections.push(domainEntitiesSection);

    // Descriptors
    const descriptorsSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Descriptors =====',
      }),
      complexTypes: complexTypesForEntitiesOfType(metaEd, 'descriptor'),
    });
    schemaContainer.sections.push(descriptorsSection);

    // Associations
    const associationsSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Associations =====',
      }),
      complexTypes: complexTypesForEntitiesOfType(metaEd, 'association', 'associationExtension', 'associationSubclass'),
    });
    schemaContainer.sections.push(associationsSection);

    // Base Types
    if (!namespace.isExtension) schemaContainer.sections.push(baseSchemaSection());

    // Extended Reference Types
    const manyReferenceTypesForEntitiesOfType = R.pipe(
      getAllEntitiesOfType,
      inNamespace(namespace),
      manyReferenceTypesFrom,
      removeNoComplexType,
      orderByProp('name'),
    );

    const extendedReferencesSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Extended Reference Types =====',
      }),
      complexTypes: manyReferenceTypesForEntitiesOfType(
        metaEd,
        'association',
        'associationExtension',
        'associationSubclass',
        'domainEntity',
        'domainEntityExtension',
        'domainEntitySubclass',
      ),
    });
    schemaContainer.sections.push(extendedReferencesSection);

    // Extended Descriptor Reference Types
    const referenceTypesForEntitiesOfType = R.pipe(
      getAllEntitiesOfType,
      inNamespace(namespace),
      referenceTypesFrom,
      removeNoComplexType,
      orderByProp('name'),
    );

    const descriptorExtendedReferencesSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Extended Descriptor Reference Types =====',
      }),
      complexTypes: referenceTypesForEntitiesOfType(metaEd, 'descriptor'),
    });
    schemaContainer.sections.push(descriptorExtendedReferencesSection);

    // Common Types
    const commonTypesSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Common Types =====',
      }),
      complexTypes: complexTypesForEntitiesOfType(metaEd, 'common', 'commonExtension'),
    });
    schemaContainer.sections.push(commonTypesSection);

    // Enumerations and Enumerated Collections
    const enumerationSimpleTypesForEntitiesOfType = R.pipe(
      getAllEntitiesOfType,
      inNamespace(namespace),
      enumerationSimpleTypesFrom,
      removeNoEnumerationSimpleType,
      orderByProp('name'),
    );

    const enumerationsSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Enumerations and Enumerated Collections =====',
      }),
      simpleTypes: enumerationSimpleTypesForEntitiesOfType(
        metaEd,
        'enumeration',
        'mapTypeEnumeration',
        'schoolYearEnumeration',
      ),
    });
    schemaContainer.sections.push(enumerationsSection);

    // String Simple Types
    const simpleTypesForEntitiesOfType = R.pipe(
      getAllEntitiesOfType,
      inNamespace(namespace),
      simpleTypesFrom,
      removeNoSimpleType,
    );

    const stringSimpleTypes = simpleTypesForEntitiesOfType(metaEd, 'stringType');
    if (!namespace.isExtension) {
      stringSimpleTypes.push(createCodeValueSimpleType(), createTimeIntervalSimpleType());
    }

    const stringSimpleTypesSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== String Simple Types =====',
      }),
      simpleTypes: orderByProp('name')(stringSimpleTypes),
    });

    schemaContainer.sections.push(stringSimpleTypesSection);

    // Numeric Simple Types
    const numericSimpleTypes = simpleTypesForEntitiesOfType(metaEd, 'decimalType', 'integerType');
    if (!namespace.isExtension) {
      numericSimpleTypes.push(createCurrencySimpleType(), createPercentSimpleType());
    }

    const numericSimpleTypesSection: SchemaSection = Object.assign(newSchemaSection(), {
      sectionAnnotation: Object.assign(newAnnotation(), {
        documentation: '===== Numeric Simple Types =====',
      }),
      simpleTypes: orderByProp('name')(numericSimpleTypes),
    });

    schemaContainer.sections.push(numericSimpleTypesSection);

    ((namespace.data.edfiXsd: any): NamespaceEdfiXsd).xsd_Schema = schemaContainer;
  });

  return {
    enhancerName,
    success: true,
  };
}
