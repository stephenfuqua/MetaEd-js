import { MetaEdEnvironment, GeneratorResult, SemVer } from 'metaed-core';
import {
  newMetaEdEnvironment,
  MetaEdTextBuilder,
  NamespaceBuilder,
  DomainEntityBuilder,
  EnumerationBuilder,
} from 'metaed-core';
import { initialize as initializeUnifiedPlugin } from 'metaed-plugin-edfi-unified';
import { initialize as initializeOdsRelationalPlugin } from 'metaed-plugin-edfi-ods-relational';
import { initialize as initializeOdsSqlServerPlugin } from 'metaed-plugin-edfi-ods-sqlserver';
import { initialize as initializeXsdPlugin } from 'metaed-plugin-edfi-xsd';
import { initialize as initializeHandbookPlugin } from '../../src/index';
import { generate } from '../../src/generator/MetaEdHandbookAsExcelGenerator';
import { readWorkbook } from '../../src/model/Workbook';
import { Workbook } from '../../src/model/Workbook';

function rowToString(obj, value, i) {
  if (i > 0) return `${obj}, ${value}`;
  return value;
}

describe('when generating a simple sql data dictionary', (): void => {
  const dataStandardVersion: SemVer = '2.0.0';
  const metaEd: MetaEdEnvironment = { ...newMetaEdEnvironment(), dataStandardVersion };

  let generatorResults: GeneratorResult;
  let workbook: Workbook;

  beforeAll(async () => {
    const namespaceBuilder = new NamespaceBuilder(metaEd, []);
    const domainEntityBuilder = new DomainEntityBuilder(metaEd, []);
    const enumerationBuilder = new EnumerationBuilder(metaEd, []);
    MetaEdTextBuilder.build()

      .withBeginNamespace('EdFi')

      .withStartDomainEntity('Entity1')
      .withDocumentation('Entity1 doc')
      .withIntegerIdentity('Entity1Integer', 'Entity1Integer doc')
      .withStringProperty('Entity1String', 'Entity1String doc', true, false, '0', '100')
      .withDateProperty('Entity1DateCollection', 'Entity1DateCollection doc', false, true)
      .withEndDomainEntity()

      .withStartDomainEntity('Entity2')
      .withDocumentation('Entity2 doc')
      .withIntegerIdentity('Entity2Integer', 'Entity2Integer doc')
      .withStringProperty('Entity2String', 'Entity2String doc', true, false, '0', '100')
      .withDateProperty('Entity2DateCollection', 'Entity2DateCollection doc', false, true)
      .withEndDomainEntity()

      .withEndNamespace()

      .sendToListener(namespaceBuilder)
      .sendToListener(enumerationBuilder)
      .sendToListener(domainEntityBuilder);

    initializeUnifiedPlugin().enhancer.forEach(enhance => enhance(metaEd));
    initializeOdsRelationalPlugin().enhancer.forEach(enhance => enhance(metaEd));
    initializeOdsSqlServerPlugin().enhancer.forEach(enhance => enhance(metaEd));
    initializeXsdPlugin().enhancer.forEach(enhance => enhance(metaEd));
    initializeHandbookPlugin().enhancer.forEach(enhance => enhance(metaEd));

    generatorResults = await generate(metaEd);
    workbook = readWorkbook(generatorResults.generatedOutput[0].resultStream, 'buffer');
  });

  it('should generate excel sheet', (): void => {
    expect(generatorResults).toBeDefined();
  });

  it('should have one sheet with the correct names', (): void => {
    expect(workbook.sheets).toHaveLength(1);
    expect(workbook.sheets[0].name).toBe('Ed-Fi Handbook');
  });

  it('should have a Tables sheet with the correct headers', (): void => {
    expect(workbook.sheets[0].rows[0].headers).toHaveLength(9);

    expect(workbook.sheets[0].rows[0].headers[0]).toBe('Ed-Fi ID');
    expect(workbook.sheets[0].rows[0].headers[1]).toBe('Name');
    expect(workbook.sheets[0].rows[0].headers[2]).toBe('Definition');
    expect(workbook.sheets[0].rows[0].headers[3]).toBe('Entity Type');
    expect(workbook.sheets[0].rows[0].headers[4]).toBe('Type Characteristics');
    expect(workbook.sheets[0].rows[0].headers[5]).toBe('Option List');
    expect(workbook.sheets[0].rows[0].headers[6]).toBe('References');
    expect(workbook.sheets[0].rows[0].headers[7]).toBe('XSD');
    expect(workbook.sheets[0].rows[0].headers[8]).toBe('ODS');
  });

  it('should have a Tables sheet with the correct rows', (): void => {
    expect(workbook.sheets[0].rows).toHaveLength(7);
    expect(workbook.sheets[0].rows[0].values.reduce(rowToString)).toBe(
      `36, Currency, U.S. currency in dollars and cents., Currency Base Type, , , , <xs:simpleType name="Currency">
  <xs:annotation>
    <xs:documentation>U.S. currency in dollars and cents.</xs:documentation>
    <xs:appinfo>
      <ann:TypeGroup>Simple</ann:TypeGroup>
    </xs:appinfo>
  </xs:annotation>
  <xs:restriction base="xs:decimal"/>
</xs:simpleType>
, Currency [MONEY]`,
    );
    expect(workbook.sheets[0].rows[1].values.reduce(rowToString)).toBe(
      `, Entity1DateCollection, Entity1DateCollection doc, Date Type, , , Used By:
Entity1.Entity1DateCollection (as optional collection), <xs:complexType name="Entity1DateCollection">
  <xs:annotation>
    <xs:documentation>Entity1DateCollection doc</xs:documentation>
  </xs:annotation>
</xs:complexType>
, Entity1DateCollection [DATE]`,
    );
    expect(workbook.sheets[0].rows[2].values.reduce(rowToString)).toBe(
      `, Entity2DateCollection, Entity2DateCollection doc, Date Type, , , Used By:
Entity2.Entity2DateCollection (as optional collection), <xs:complexType name="Entity2DateCollection">
  <xs:annotation>
    <xs:documentation>Entity2DateCollection doc</xs:documentation>
  </xs:annotation>
</xs:complexType>
, Entity2DateCollection [DATE]`,
    );
    expect(workbook.sheets[0].rows[3].values.reduce(rowToString)).toBe(
      `, Entity1, Entity1 doc, Domain Entity, , , Contains:
Entity1DateCollection (optional collection)
Entity1Integer (identity)
Entity1String (required), <xs:complexType name="Entity1">
  <xs:annotation>
    <xs:documentation>Entity1 doc</xs:documentation>
    <xs:appinfo>
      <ann:TypeGroup>Domain Entity</ann:TypeGroup>
    </xs:appinfo>
  </xs:annotation>
  <xs:complexContent>
    <xs:extension base="ComplexObjectType">
      <xs:sequence>
        <xs:element name="Entity1Integer" type="xs:int">
          <xs:annotation>
            <xs:documentation>Entity1Integer doc</xs:documentation>
          </xs:annotation>

        </xs:element>
        <xs:element name="Entity1String" type="Entity1String">
          <xs:annotation>
            <xs:documentation>Entity1String doc</xs:documentation>
          </xs:annotation>

        </xs:element>
        <xs:element name="Entity1DateCollection" type="xs:date" minOccurs="0" maxOccurs="unbounded">
          <xs:annotation>
            <xs:documentation>Entity1DateCollection doc</xs:documentation>
          </xs:annotation>

        </xs:element>
      </xs:sequence>
    </xs:extension>
  </xs:complexContent>
</xs:complexType>, edfi.Entity1

Entity1Integer [INT] NOT NULL
Entity1String [NVARCHAR](0) NOT NULL
CreateDate [DATETIME] NOT NULL
LastModifiedDate [DATETIME] NOT NULL
Id [UNIQUEIDENTIFIER] NOT NULL

Primary Keys:
Entity1Integer



edfi.Entity1DateCollection

Entity1DateCollection [DATE] NOT NULL
Entity1Integer [INT] NOT NULL
CreateDate [DATETIME] NOT NULL

Primary Keys:
Entity1DateCollection
Entity1Integer


`,
    );
    expect(workbook.sheets[0].rows[4].values.reduce(rowToString)).toBe(
      `, Entity2, Entity2 doc, Domain Entity, , , Contains:
Entity2DateCollection (optional collection)
Entity2Integer (identity)
Entity2String (required), <xs:complexType name="Entity2">
  <xs:annotation>
    <xs:documentation>Entity2 doc</xs:documentation>
    <xs:appinfo>
      <ann:TypeGroup>Domain Entity</ann:TypeGroup>
    </xs:appinfo>
  </xs:annotation>
  <xs:complexContent>
    <xs:extension base="ComplexObjectType">
      <xs:sequence>
        <xs:element name="Entity2Integer" type="xs:int">
          <xs:annotation>
            <xs:documentation>Entity2Integer doc</xs:documentation>
          </xs:annotation>

        </xs:element>
        <xs:element name="Entity2String" type="Entity2String">
          <xs:annotation>
            <xs:documentation>Entity2String doc</xs:documentation>
          </xs:annotation>

        </xs:element>
        <xs:element name="Entity2DateCollection" type="xs:date" minOccurs="0" maxOccurs="unbounded">
          <xs:annotation>
            <xs:documentation>Entity2DateCollection doc</xs:documentation>
          </xs:annotation>

        </xs:element>
      </xs:sequence>
    </xs:extension>
  </xs:complexContent>
</xs:complexType>, edfi.Entity2

Entity2Integer [INT] NOT NULL
Entity2String [NVARCHAR](0) NOT NULL
CreateDate [DATETIME] NOT NULL
LastModifiedDate [DATETIME] NOT NULL
Id [UNIQUEIDENTIFIER] NOT NULL

Primary Keys:
Entity2Integer



edfi.Entity2DateCollection

Entity2DateCollection [DATE] NOT NULL
Entity2Integer [INT] NOT NULL
CreateDate [DATETIME] NOT NULL

Primary Keys:
Entity2DateCollection
Entity2Integer


`,
    );
  });
});
