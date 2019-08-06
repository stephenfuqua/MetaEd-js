import winston from 'winston';
import { versionSatisfies, GeneratedOutput, GeneratorResult, MetaEdEnvironment, PluginEnvironment } from 'metaed-core';
import { dataPath, fileNameFor, registerPartials, structurePath, template } from './OdsGeneratorBase';

winston.configure({ transports: [new winston.transports.Console()], format: winston.format.cli() });

export async function generateTables(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const { targetTechnologyVersion } = metaEd.plugin.get('edfiOdsPostgresql') as PluginEnvironment;

  const results: GeneratedOutput[] = [];

  metaEd.namespace.forEach(namespace => {
    const generatedResult: string = template().table({
      tables: namespace.data.edfiOdsPostgresql.odsSchema.tables,
      useDatetime2: versionSatisfies(targetTechnologyVersion, '>=3.1.1'),
    });

    results.push({
      name: 'ODS SQL Server Tables',
      namespace: namespace.namespaceName,
      folderName: structurePath,
      fileName: fileNameFor('0020', namespace, 'Tables'),
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsPostgresql.TablesGenerator',
    generatedOutput: results,
  };
}

export async function generateForeignKeys(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: GeneratedOutput[] = [];

  metaEd.namespace.forEach(namespace => {
    const generatedResult: string = template().foreignKey({
      foreignKeys: namespace.data.edfiOdsPostgresql.odsSchema.foreignKeys,
    });

    results.push({
      name: 'ODS Foreign Keys',
      namespace: namespace.namespaceName,
      folderName: structurePath,
      fileName: fileNameFor('0030', namespace, 'ForeignKeys'),
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsPostgresql.ForeignKeyGenerator',
    generatedOutput: results,
  };
}

export async function generateExtendedProperties(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: GeneratedOutput[] = [];

  metaEd.namespace.forEach(namespace => {
    const generatedResult: string = template().extendedProperties({
      tables: namespace.data.edfiOdsPostgresql.odsSchema.tables,
    });

    results.push({
      name: 'ODS SQL Server Extended Properties',
      namespace: namespace.namespaceName,
      folderName: structurePath,
      fileName: fileNameFor('0050', namespace, 'ExtendedProperties'),
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsPostgresql.ExtendedPropertiesGenerator',
    generatedOutput: results,
  };
}

export async function generateEnumerations(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: GeneratedOutput[] = [];

  metaEd.namespace.forEach(namespace => {
    const generatedResult: string = template().enumerationRow({
      enumerationRows: namespace.data.edfiOdsPostgresql.odsSchema.enumerationRows,
    });

    results.push({
      name: 'ODS SQL Server Enumerations',
      namespace: namespace.namespaceName,
      folderName: dataPath,
      fileName: fileNameFor('0010', namespace, 'Enumerations'),
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsPostgresql.EnumerationsGenerator',
    generatedOutput: results,
  };
}

export async function generateSchoolYears(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  const results: GeneratedOutput[] = [];

  metaEd.namespace.forEach(namespace => {
    const generatedResult: string = template().schoolYearEnumerationRow({
      schoolYearEnumerationRows: namespace.data.edfiOdsPostgresql.odsSchema.schoolYearEnumerationRows,
    });

    results.push({
      name: 'ODS SQL Server School Years',
      namespace: namespace.namespaceName,
      folderName: dataPath,
      fileName: fileNameFor('0020', namespace, 'SchoolYears'),
      resultString: generatedResult,
      resultStream: null,
    });
  });

  return {
    generatorName: 'edfiOdsPostgresql.SchoolYearsGenerator',
    generatedOutput: results,
  };
}

export async function generate(metaEd: MetaEdEnvironment): Promise<GeneratorResult> {
  registerPartials();
  const results: GeneratedOutput[] = [];

  const tablesResult: GeneratorResult = await generateTables(metaEd);
  const foreignKeysResult: GeneratorResult = await generateForeignKeys(metaEd);
  const extendedPropertiesResult: GeneratorResult = await generateExtendedProperties(metaEd);
  const enumerationsResult: GeneratorResult = await generateEnumerations(metaEd);
  const schoolYearsResult: GeneratorResult = await generateSchoolYears(metaEd);

  const generatorResults: GeneratorResult[] = [
    tablesResult,
    foreignKeysResult,
    extendedPropertiesResult,
    enumerationsResult,
    schoolYearsResult,
  ];

  generatorResults.forEach((result: GeneratorResult) => results.push(...result.generatedOutput));

  return {
    generatorName: 'edfiOdsPostgresql.OdsGenerator',
    generatedOutput: results,
  };
}
