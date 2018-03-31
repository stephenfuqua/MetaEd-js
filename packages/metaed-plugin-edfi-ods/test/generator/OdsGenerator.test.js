// @flow
import R from 'ramda';
import { newMetaEdEnvironment, newNamespaceInfo } from 'metaed-core';
import type { GeneratorResult, MetaEdEnvironment, NamespaceInfo } from 'metaed-core';
import { generate } from '../../src/generator/OdsGenerator';
import { insertUpdateDelete, newTrigger } from '../../src/model/database/Trigger';
import { newSchemaContainer } from '../../src/model/database/SchemaContainer';
import type { Trigger } from '../../src/model/database/Trigger';

describe('when generating output for namespace', () => {
  const namespace: string = 'namespaceName';
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate empty output', () => {
    expect(result.generatorName).toEqual('edfiOds.OdsGenerator');
    expect(R.head(result.generatedOutput).fileName).toBe(`0020-${namespace}-Tables.sql`);
    expect(R.head(result.generatedOutput).namespace).toBe(namespace);
    expect(R.head(result.generatedOutput).folderName).toBe('/Database/SQLServer/ODS/Structure/');
    expect(R.head(result.generatedOutput).name).toBe('ODS Tables');
    expect(R.head(result.generatedOutput).resultStream).toBeNull();
    expect(R.head(result.generatedOutput).resultString).toBe('');
  });
});

describe('when generating output for core namespace', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'edfi';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct file name', () => {
    expect(R.head(result.generatedOutput).fileName).toBe('0020-Tables.sql');
  });
});

describe('when generating output for extension namespace', () => {
  const namespace: string = 'extension';
  const projectExtension: string = 'EXTENSION';
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      projectExtension,
      isExtension: true,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct file name', () => {
    expect(R.head(result.generatedOutput).fileName).toBe(`0020-${projectExtension}-${namespace}-Tables.sql`);
  });
});

describe('when generating triggers for namespace', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'namespaceName';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    const trigger1: Trigger = Object.assign(newTrigger(), {
      schema: namespace,
      name: 'TriggerName',
      tableSchema: 'TableSchemaName',
      tableName: 'TableName',
      body: 'SQLBody',
    });
    namespaceInfo.data.edfiOds.ods_Schema.triggers.push(trigger1);
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct trigger', () => {
    expect(R.head(result.generatedOutput.filter(output => output.name === 'ODS Triggers')).resultString).toMatchSnapshot();
  });
});

describe('when generating insert trigger', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'namespaceName';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    const trigger: Trigger = Object.assign(newTrigger(), {
      schema: namespace,
      name: 'TriggerName',
      tableSchema: 'TableSchemaName',
      tableName: 'TableName',
      isAfter: true,
      onInsert: true,
      insertUpdateDelete: [],
      body: 'SQLBody',
    });
    trigger.insertUpdateDelete = insertUpdateDelete(trigger);
    namespaceInfo.data.edfiOds.ods_Schema.triggers.push(trigger);
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct trigger', () => {
    const triggerOutput = result.generatedOutput.filter(output => output.name === 'ODS Triggers');
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('AFTER'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('INSERT'));
    expect(R.head(triggerOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating update trigger', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'namespaceName';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    const trigger: Trigger = Object.assign(newTrigger(), {
      schema: namespace,
      name: 'TriggerName',
      tableSchema: 'TableSchemaName',
      tableName: 'TableName',
      isAfter: true,
      onUpdate: true,
      insertUpdateDelete: [],
      body: 'SQLBody',
    });
    trigger.insertUpdateDelete = insertUpdateDelete(trigger);
    namespaceInfo.data.edfiOds.ods_Schema.triggers.push(trigger);
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct trigger', () => {
    const triggerOutput = result.generatedOutput.filter(output => output.name === 'ODS Triggers');
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('AFTER'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('UPDATE'));
    expect(R.head(triggerOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating delete trigger', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'namespaceName';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    const trigger: Trigger = Object.assign(newTrigger(), {
      schema: namespace,
      name: 'TriggerName',
      tableSchema: 'TableSchemaName',
      tableName: 'TableName',
      isAfter: true,
      onDelete: true,
      insertUpdateDelete: [],
      body: 'SQLBody',
    });
    trigger.insertUpdateDelete = insertUpdateDelete(trigger);
    namespaceInfo.data.edfiOds.ods_Schema.triggers.push(trigger);
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct trigger', () => {
    const triggerOutput = result.generatedOutput.filter(output => output.name === 'ODS Triggers');
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('AFTER'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('DELETE'));
    expect(R.head(triggerOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating insert, update, delete trigger', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'namespaceName';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    const trigger: Trigger = Object.assign(newTrigger(), {
      schema: namespace,
      name: 'TriggerName',
      tableSchema: 'TableSchemaName',
      tableName: 'TableName',
      isAfter: true,
      onInsert: true,
      onUpdate: true,
      onDelete: true,
      insertUpdateDelete: [],
      body: 'SQLBody',
    });
    trigger.insertUpdateDelete = insertUpdateDelete(trigger);
    namespaceInfo.data.edfiOds.ods_Schema.triggers.push(trigger);
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct trigger', () => {
    const triggerOutput = result.generatedOutput.filter(output => output.name === 'ODS Triggers');
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('AFTER'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('INSERT'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('UPDATE'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('DELETE'));
    expect(R.head(triggerOutput).resultString).toMatchSnapshot();
  });
});

describe('when generating replacement trigger', () => {
  let result: GeneratorResult;

  beforeAll(async () => {
    const metaEd: MetaEdEnvironment = newMetaEdEnvironment();
    const namespace: string = 'namespaceName';
    const namespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
      namespace,
      isExtension: false,
      data: {
        edfiOds: {
          ods_Schema: newSchemaContainer(),
        },
      },
    });
    const trigger: Trigger = Object.assign(newTrigger(), {
      schema: namespace,
      name: 'TriggerName',
      tableSchema: 'TableSchemaName',
      tableName: 'TableName',
      isAfter: false,
      onDelete: true,
      insertUpdateDelete: [],
      body: 'SQLBody',
    });
    trigger.insertUpdateDelete = insertUpdateDelete(trigger);
    namespaceInfo.data.edfiOds.ods_Schema.triggers.push(trigger);
    metaEd.entity.namespaceInfo.push(namespaceInfo);

    result = await generate(metaEd);
  });

  it('should generate correct trigger', () => {
    const triggerOutput = result.generatedOutput.filter(output => output.name === 'ODS Triggers');
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('INSTEAD OF'));
    expect(R.head(triggerOutput).resultString).toEqual(expect.stringMatching('DELETE'));
    expect(R.head(triggerOutput).resultString).toMatchSnapshot();
  });
});
