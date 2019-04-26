import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import hash from 'hash.js';
import { GeneratedOutput, GeneratorResult, MetaEdEnvironment } from 'metaed-core';

function maxComponentLength(tableNameComponents: Array<string>, maxLengthBeforeHash: number): number {
  const evenLength = Math.floor(maxLengthBeforeHash / tableNameComponents.length);
  let totalLengthOfShorterComponents = 0;
  let countOfLongerComponents = 0;
  tableNameComponents.forEach(nameComponent => {
    if (nameComponent.length < evenLength) {
      totalLengthOfShorterComponents += nameComponent.length;
    } else {
      countOfLongerComponents += 1;
    }
  });
  return Math.floor((maxLengthBeforeHash - totalLengthOfShorterComponents) / countOfLongerComponents);
}

function truncatedTableName(tableNameComponents: Array<string>): string {
  const maxLengthBeforeHash = 55;
  const componentLength = maxComponentLength(tableNameComponents, maxLengthBeforeHash);
  const tableNameBeforeHash = tableNameComponents.reduce((acc, current) => acc + current.substring(0, componentLength), '');
  return `${tableNameBeforeHash}-${hash
    .sha256()
    .update(tableNameBeforeHash)
    .digest('hex')
    .substring(0, 6)}`;
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: Array<GeneratedOutput> = [];

  const templateBuffer = fs.readFileSync(path.join(__dirname, 'templates', 'postgresqlTableNames.hbs'));
  const templateFunction: (Object) => string = handlebars.create().compile(templateBuffer.toString());

  metaEd.namespace.forEach(namespace => {
    const tableNames = namespace.data.edfiOds.odsSchema.tables.map(table => ({
      original: table.name,
      originalLength: table.name.length,
      originalTooLong: table.name.length > 63,
      components: table.nameComponents,
      numberOfComponents: table.nameComponents.length,
      truncated: truncatedTableName(table.nameComponents),
      truncatedAgain: truncatedTableName(table.nameComponents),
      truncatedLength: truncatedTableName(table.nameComponents).length,
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
