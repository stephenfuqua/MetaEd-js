// @flow
import type { State } from '../State';
import { validate as choicePropertyMustMatchAChoice } from '../validator/ChoiceProperty/ChoicePropertyMustMatchAChoice';
import { validate as commonPropertyMustMatchACommon } from '../validator/CommonProperty/CommonPropertyMustMatchACommon';
import { validate as mostEntitiesCannotHaveSameName } from '../validator/CrossEntity/MostEntitiesCannotHaveSameName';
import { validate as domainEntityMustContainAnIdentity } from '../validator/DomainEntity/DomainEntityMustContainAnIdentity';
import { validate as domainEntityMustContainNoMoreThanOneUniqueIdColumn } from '../validator/DomainEntity/DomainEntityMustContainNoMoreThanOneUniqueIdColumn';
import type { Repository } from '../model/Repository';
import type { PropertyType } from '../model/property/PropertyType';
import type { EntityProperty } from '../model/property/EntityProperty';
import type { ValidationFailure } from '../validator/ValidationFailure';

export function execute(state: State): State {
  const validators: Array<((Repository, Map<PropertyType, Array<EntityProperty>>) => Array<ValidationFailure>)> = [];

  validators.push(choicePropertyMustMatchAChoice);
  validators.push(commonPropertyMustMatchACommon);
  validators.push(mostEntitiesCannotHaveSameName);
  validators.push(domainEntityMustContainAnIdentity);
  validators.push(domainEntityMustContainNoMoreThanOneUniqueIdColumn);

  validators.forEach(validator => {
    if (state.repository != null && state.propertyIndex != null) {
      validator(state.repository, state.propertyIndex);
    }
  });

  return state;
}
