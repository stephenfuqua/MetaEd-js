// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';
import { validatorList } from './validator/ValidatorList';
import { enhancerList } from './enhancer/EnhancerList';
import { generate as DomainMetadataGenerator } from './generator/domainMetadata/DomainMetadataGenerator';
import { generate as ApiModelGenerator } from './generator/apiModel/ApiModelGenerator';
import { generate as EducationOrganizationReferenceMetadataGenerator } from './generator/educationOrganizationReferenceMetadata/EducationOrganizationReferenceMetadataGenerator';
import { generate as InterchangeOrderMetadataGenerator } from './generator/interchangeOrderMetadata/InterchangeOrderMetadataGenerator';
import { generate as InterchangeOrderMetadataGeneratorV2 } from './generator/interchangeOrderMetadata/InterchangeOrderMetadataGeneratorV2';

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: validatorList(),
    enhancer: enhancerList(),
    generator: [
      ApiModelGenerator,
      DomainMetadataGenerator,
      EducationOrganizationReferenceMetadataGenerator,
      InterchangeOrderMetadataGenerator,
      InterchangeOrderMetadataGeneratorV2,
    ],
  });
}
