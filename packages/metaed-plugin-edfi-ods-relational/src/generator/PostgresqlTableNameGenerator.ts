import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import hash from 'hash.js';
import { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';

type ComponentInfo = {
  nameComponent: string;
  truncatedLength: number;
};

function populateTruncatedLengths(availableLength: number, components: ComponentInfo[]) {
  // ignore if already allocated
  const uncalculatedComponents: ComponentInfo[] = components.filter(component => component.truncatedLength === 0);
  if (uncalculatedComponents.length === 0) return;

  const evenLength = Math.floor(availableLength / uncalculatedComponents.length);
  let contributedLengthFromShorterComponents = 0;
  let countOfLongerComponents = 0;

  // gather statistics
  uncalculatedComponents.forEach(component => {
    if (component.nameComponent.length <= evenLength) {
      contributedLengthFromShorterComponents += evenLength - component.nameComponent.length;
    } else {
      countOfLongerComponents += 1;
    }
  });

  if (contributedLengthFromShorterComponents === 0) {
    // no more help from shorter components, need to truncate everything
    uncalculatedComponents.forEach(component => {
      component.truncatedLength = Math.floor(evenLength);
    });
  } else {
    // can take smaller ones as is, larger ones wait for next round
    uncalculatedComponents.forEach(component => {
      if (component.nameComponent.length <= evenLength) {
        component.truncatedLength = component.nameComponent.length;
      }
    });
  }

  populateTruncatedLengths(
    countOfLongerComponents * evenLength + contributedLengthFromShorterComponents,
    uncalculatedComponents,
  );
}

export function postgresqlTableName(tableNameComponents: string[]): string {
  const overallMaxLength = 63;
  const untruncatedName = tableNameComponents.join('');
  if (untruncatedName.length <= overallMaxLength) return untruncatedName;

  const componentInfos: ComponentInfo[] = tableNameComponents.map(nameComponent => ({ nameComponent, truncatedLength: 0 }));

  const maxLengthBeforeHash = 56;
  populateTruncatedLengths(maxLengthBeforeHash, componentInfos);
  const tableNameBeforeHash = componentInfos.reduce(
    (acc, current) => acc + current.nameComponent.substring(0, current.truncatedLength),
    '',
  );
  return `${tableNameBeforeHash}-${hash
    .sha256()
    .update(tableNameComponents.join(''))
    .digest('hex')
    .substring(0, 6)}`;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: GeneratedOutput[] = [];

  const templateBuffer = fs.readFileSync(path.join(__dirname, 'templates', 'postgresqlTableNames.hbs'));
  const templateFunction: (Object) => string = handlebars.create().compile(templateBuffer.toString());

  metaEd.namespace.forEach(namespace => {
    const tableNames = namespace.data.edfiOds.odsSchema.tables.map(table => ({
      original: table.name,
      originalLength: table.name.length,
      originalTooLong: table.name.length > 63,
      components: table.nameComponents,
      numberOfComponents: table.nameComponents.length,
      truncated: postgresqlTableName(table.nameComponents),
      truncatedLength: postgresqlTableName(table.nameComponents).length,
    }));

    const generatedResult: string = templateFunction({
      tableNames,
    });

    results.push({
      name: 'PostgreSQL Table Naming',
      namespace: namespace.namespaceName,
      folderName: '/Database/PostgreSQL/',
      fileName: `${namespace.namespaceName}-postgresql.table.names.txt`,
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOds.PostgresqlTableNameGenerator',
    generatedOutput: results,
  };
}
