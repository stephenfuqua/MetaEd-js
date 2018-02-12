// @flow
import type { MetaEdPlugin } from 'metaed-core';
import { newMetaEdPlugin } from 'metaed-core';
import { validatorList } from './validator/ValidatorList';
import { enhancerList } from './enhancer/EnhancerList';
import { generate as DomainMetadataGenerator } from './generator/domainMetadata/DomainMetadataGenerator';
import { generate as ApiModelGenerator } from './generator/apiModel/ApiModelGenerator';

export function initialize(): MetaEdPlugin {
  return Object.assign(newMetaEdPlugin(), {
    validator: validatorList(),
    enhancer: enhancerList(),
    generator: [DomainMetadataGenerator, ApiModelGenerator],
  });
}
