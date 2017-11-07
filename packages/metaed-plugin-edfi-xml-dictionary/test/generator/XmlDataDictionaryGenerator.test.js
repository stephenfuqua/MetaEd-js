// @flow
import { readWorkbook } from '../../src/model/Workbook';
import type { Workbook } from '../../src/model/Workbook';
import type { GeneratorResult } from '../../../metaed-core/src/generator/GeneratorResult';
import { generateFromXsd as xmlDataDictionaryFromXsd } from '../../src/generator/XmlDataDictionaryGenerator';

function rowToString(obj, value, i) {
  if (i > 0) return `${obj}, ${value}`;
  return value;
}
describe('when generating xlsx workbook from xsd', () => {
  let workbook: Workbook;
  beforeAll(() => {
    const xml = `<?xml version="1.0" encoding="UTF-8">
<!-- (c)2015 Ed-Fi Alliance, LLC. All Rights Reserved. -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://ed-fi.org/0200" xmlns:ann="http://ed-fi.org/annotation" targetNamespace="http://ed-fi.org/0200" elementFormDefault="qualified" attributeFormDefault="unqualified">
    <xs:import namespace="http://ed-fi.org/annotation" schemaLocation="SchemaAnnotation.xsd"/>
    <xs:simpleType name="AddressLine">
        <xs:annotation>
            <xs:documentation>A line of an address.</xs:documentation>
            <xs:appinfo>
                <ann:TypeGroup>Simple</ann:TypeGroup>
           </xs:appinfo>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:minLength value = "1" />
            <xs:maxLength value = "150" />
        </xs:restriction>
  </xs:simpleType>
    <xs:simpleType name="BehaviorMapType">
        <xs:annotation>
            <xs:documentation>This descriptor holds the categories of behavior describing a discipline incident.</xs:documentation>
            <xs:appinfo>
                <ann:TypeGroup>Enumeration</ann:TypeGroup>
            </xs:appinfo>
        </xs:annotation>
        <xs:restriction base="xs:token">
            <xs:enumeration value="State Offense"/>
            <xs:enumeration value="School Violation"/>
            <xs:enumeration value="School Code of Conduct"/>
            <xs:enumeration value="Other"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:complexType name="ComplexObjectType" abstract="true">
        <xs:annotation>
            <xs:documentation>This is the base type from which all entity elements are extended.</xs:documentation>
            <xs:appinfo>
                <ann:TypeGroup>Base</ann:TypeGroup>
            </xs:appinfo>
        </xs:annotation>
        <xs:attribute name="id" type="xs:ID">
            <xs:annotation>
                <xs:documentation>The XML ID associated with the complex object.</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="TestComplexType">
        <xs:annotation>
            <xs:documentation>test complex type documentation.</xs:documentation>
            <xs:appinfo>
                <ann:TypeGroup>Domain Entity</ann:TypeGroup>
                <ann:EdFiId>536</ann:EdFiId>
            </xs:appinfo>
        </xs:annotation>
        <xs:complexContent>
            <xs:extension base="ComplexObjectType">
                <xs:sequence>
                    <xs:element name="SchoolReference" type="SchoolReferenceType" minOccurs="0">
                        <xs:annotation>
                            <xs:documentation>Relates the academic week to an existing School.</xs:documentation>
                            <xs:appinfo>
                                <ann:EdFiId>2435</ann:EdFiId>
                            </xs:appinfo>
                        </xs:annotation>
                    </xs:element>
                    <xs:element name="WeekIdentifier" type="WeekIdentifier" maxOccurs="unbounded">
                        <xs:annotation>
                            <xs:documentation>The school label for the week.</xs:documentation>
                            <xs:appinfo>
                                <ann:EdFiId>1204</ann:EdFiId>
                            </xs:appinfo>
                        </xs:annotation>
                    </xs:element>
                    <xs:element name="BeginDate" type="xs:date" minOccurs="0" maxOccurs="unbounded">
                        <xs:annotation>
                            <xs:documentation>The start date for the academic week.</xs:documentation>
                            <xs:appinfo>
                                <ann:EdFiId>1200</ann:EdFiId>
                            </xs:appinfo>
                        </xs:annotation>
                    </xs:element>
                    <xs:element name="EndDate" type="xs:date">
                        <xs:annotation>
                            <xs:documentation>The end date for the academic week.</xs:documentation>
                            <xs:appinfo>
                                <ann:EdFiId>1202</ann:EdFiId>
                            </xs:appinfo>
                        </xs:annotation>
                    </xs:element>
                    <xs:element name="TotalInstructionalDays" type="xs:int">
                        <xs:annotation>
                            <xs:documentation>The total instructional days during the academic week.</xs:documentation>
                            <xs:appinfo>
                                <ann:EdFiId>1203</ann:EdFiId>
                            </xs:appinfo>
                        </xs:annotation>
                    </xs:element>
                </xs:sequence>
            </xs:extension>
        </xs:complexContent>
    </xs:complexType>
</xs:schema>`;

    const xsdGeneratorResults: GeneratorResult = {
      generatorName: 'none',
      generatedOutput: [{
        resultString: xml,
        resultStream: null,
        name: 'mock',
        folderName: 'mock',
        fileName: 'mock',
      }],
    };
    const generatorResults: GeneratorResult = xmlDataDictionaryFromXsd(xsdGeneratorResults);
    const resultStream = ((generatorResults.generatedOutput[0].resultStream: any): Buffer);
    workbook = readWorkbook(resultStream, 'buffer');
  });
  it('should have three worksheets', () => {
    expect(workbook.sheets.length).toBe(3);
  });
  it('should have three sheets with the correct names', () => {
    expect(workbook.sheets[0].name).toBe('Elements');
    expect(workbook.sheets[1].name).toBe('Complex Types');
    expect(workbook.sheets[2].name).toBe('Simple Types');
  });
  it('should have an Elements sheet with the correct headers', () => {
    expect(workbook.sheets[0].rows[0].headers[0]).toBe('Name');
    expect(workbook.sheets[0].rows[0].headers[1]).toBe('Type');
    expect(workbook.sheets[0].rows[0].headers[2]).toBe('Parent Type');
    expect(workbook.sheets[0].rows[0].headers[3]).toBe('Cardinality');
    expect(workbook.sheets[0].rows[0].headers[4]).toBe('Description');
  });
  it('should have an Complex Types sheet with the correct headers', () => {
    expect(workbook.sheets[1].rows[0].headers[0]).toBe('Name');
    expect(workbook.sheets[1].rows[0].headers[1]).toBe('Description');
  });
  it('should have an Simple Types sheet with the correct headers', () => {
    expect(workbook.sheets[2].rows[0].headers[0]).toBe('Name');
    expect(workbook.sheets[2].rows[0].headers[1]).toBe('Restrictions');
    expect(workbook.sheets[2].rows[0].headers[2]).toBe('Description');
  });
  it('should have an Elements sheet with the correct rows', () => {
    expect(workbook.sheets[0].rows[0].values.reduce(rowToString)).toBe('BeginDate, xs:date, TestComplexType, minOccurs: 0\nmaxOccurs: unbounded\n, The start date for the academic week.');
    expect(workbook.sheets[0].rows[1].values.reduce(rowToString)).toBe('EndDate, xs:date, TestComplexType, , The end date for the academic week.');
    expect(workbook.sheets[0].rows[2].values.reduce(rowToString)).toBe('SchoolReference, SchoolReferenceType, TestComplexType, minOccurs: 0\n, Relates the academic week to an existing School.');
    expect(workbook.sheets[0].rows[3].values.reduce(rowToString)).toBe('TotalInstructionalDays, xs:int, TestComplexType, , The total instructional days during the academic week.');
    expect(workbook.sheets[0].rows[4].values.reduce(rowToString)).toBe('WeekIdentifier, WeekIdentifier, TestComplexType, maxOccurs: unbounded\n, The school label for the week.');
  });
  it('should have a complex types sheet with the correct rows', () => {
    expect(workbook.sheets[1].rows[0].values.reduce(rowToString)).toBe('ComplexObjectType, This is the base type from which all entity elements are extended.');
    expect(workbook.sheets[1].rows[1].values.reduce(rowToString)).toBe('TestComplexType, test complex type documentation.');
  });
  it('should have a simple types sheet with the correct rows', () => {
    expect(workbook.sheets[2].rows[0].values.reduce(rowToString)).toBe('AddressLine, minLength: 1\nmaxLength: 150\n, A line of an address.');
    expect(workbook.sheets[2].rows[1].values.reduce(rowToString)).toBe('BehaviorMapType, State Offense\nSchool Violation\nSchool Code of Conduct\nOther\n, This descriptor holds the categories of behavior describing a discipline incident.');
  });
});

