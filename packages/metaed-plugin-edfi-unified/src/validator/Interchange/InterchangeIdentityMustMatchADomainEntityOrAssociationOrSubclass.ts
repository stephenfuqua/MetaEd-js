import { MetaEdEnvironment, ValidationFailure, Interchange, InterchangeItem, ModelType } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const validTypes: ModelType[] = ['association', 'associationSubclass', 'descriptor', 'domainEntity', 'domainEntitySubclass'];

const validTypeNames: string = [
  'Abstract Entity',
  'Association',
  'Association Subclass',
  'Descriptor',
  'Domain Entity',
  'Domain Entity Subclass',
].join(', ');

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  (getAllEntitiesOfType(metaEd, 'interchange') as Array<Interchange>).forEach((interchange: Interchange) => {
    if (interchange.identityTemplates.length === 0) return;
    interchange.identityTemplates.forEach((item: InterchangeItem) => {
      const foundEntity = getEntityForNamespaces(
        item.metaEdName,
        [interchange.namespace, ...interchange.namespace.dependencies],
        ...validTypes,
      );
      if (foundEntity != null) return;
      failures.push({
        validatorName: 'InterchangeIdentityMustMatchADomainEntityOrAssociationOrSubclass',
        category: 'error',
        message: `Interchange identity template ${item.metaEdName} does not match any declared ${validTypeNames}`,
        sourceMap: item.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
