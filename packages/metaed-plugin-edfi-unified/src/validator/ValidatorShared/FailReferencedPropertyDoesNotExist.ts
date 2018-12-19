import R from 'ramda';
import { SourceMap, ValidationFailure, ModelBase, Namespace } from 'metaed-core';
import {
  findReferencedProperty,
  matchAll,
  matchAllButFirstAsIdentityProperties,
  matchAllIdentityReferenceProperties,
} from './FindReferencedProperty';

export function failReferencedPropertyDoesNotExist(
  validatorName: string,
  namespaces: Array<Namespace>,
  entity: ModelBase,
  propertyPath: Array<string>,
  pairedMergePropertyName: string,
  sourceMap: SourceMap,
  failures: Array<ValidationFailure>,
) {
  const matchingProperty = findReferencedProperty(namespaces, entity, [pairedMergePropertyName], matchAll());
  if (!matchingProperty) return;

  const filter =
    matchingProperty.isOptionalCollection || matchingProperty.isRequiredCollection
      ? matchAllIdentityReferenceProperties()
      : matchAllButFirstAsIdentityProperties();

  const propertyContext = findReferencedProperty(namespaces, entity, propertyPath, filter);
  if (!propertyContext) {
    failures.push({
      validatorName,
      category: 'error',
      message: `Merge statement ${propertyPath.join(
        '.',
      )} must be a valid path. Either the path is not to a mergeable type, or no property '${R.last(
        propertyPath,
      )}' was found`,
      sourceMap,
      fileMap: null,
    });
  }
}
