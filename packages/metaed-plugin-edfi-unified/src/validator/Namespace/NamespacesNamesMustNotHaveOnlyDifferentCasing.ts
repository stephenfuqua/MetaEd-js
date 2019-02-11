import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

const differOnlyInCaseFunction = (name: string, index: number, array: Array<string>) => {
  const found: string | undefined = array.find(
    (nameInFind: string, indexInFind: number) =>
      indexInFind !== index && nameInFind !== name && nameInFind.toLowerCase() === name.toLowerCase(),
  );
  return found != null;
};

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  const namespaceNames: Array<string> = Array.from(metaEd.namespace.keys());
  const duplicateNames: Array<string> = Array.from(namespaceNames.filter(differOnlyInCaseFunction));

  duplicateNames.forEach(duplicateName => {
    failures.push({
      validatorName: 'NamespacesNamesMustNotHaveOnlyDifferentCasing',
      category: 'error',
      message: `${duplicateName} is a project name that differs only in case from another name.  Make the casing the same to indicate the same namespace or choose a different name.`,
      sourceMap: null,
      fileMap: null,
    });
  });

  return failures;
}
