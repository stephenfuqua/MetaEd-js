import { PhysicalNames } from './PhysicalNames';

export interface EntityIdentifier {
  identifierName: string;
  constraintNames?: PhysicalNames;
  identifyingPropertyNames: string[];
  isPrimary: boolean;
  isUpdatable: boolean;
}
