/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Elementen: { // root type
    eenheidtype: string; // String!
    hecode: number; // Int!
    heprijspereenheid: number; // Float!
    hoofdelementnaam: string; // String!
    id: number; // Int!
    omschrijving: string; // String!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  VastgoedObj: { // root type
    adress: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    energielabel: string; // String!
    gbo: number; // Int!
    id: number; // Int!
    marktwaarde: number; // Int!
    naam: string; // String!
    postcode: string; // String!
    stad: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Elementen: { // field return type
    eenheidtype: string; // String!
    elementGegevens: NexusGenRootTypes['VastgoedObj'][]; // [VastgoedObj!]!
    hecode: number; // Int!
    heprijspereenheid: number; // Float!
    hoofdelementnaam: string; // String!
    id: number; // Int!
    omschrijving: string; // String!
  }
  Mutation: { // field return type
    deleteRecord: NexusGenRootTypes['VastgoedObj'] | null; // VastgoedObj
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    postpand: NexusGenRootTypes['VastgoedObj']; // VastgoedObj!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updaterecord: NexusGenRootTypes['VastgoedObj'] | null; // VastgoedObj
    voegelementtoe: NexusGenRootTypes['Elementen']; // Elementen!
  }
  Query: { // field return type
    vastgoedgegevens: Array<NexusGenRootTypes['VastgoedObj'] | null>; // [VastgoedObj]!
  }
  User: { // field return type
    email: string; // String!
    gebruikerData: NexusGenRootTypes['VastgoedObj'][]; // [VastgoedObj!]!
    id: number; // Int!
    name: string; // String!
  }
  VastgoedObj: { // field return type
    adress: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    elementlijst: NexusGenRootTypes['Elementen'] | null; // Elementen
    energielabel: string; // String!
    gbo: number; // Int!
    id: number; // Int!
    marktwaarde: number; // Int!
    naam: string; // String!
    postcode: string; // String!
    postedBy: NexusGenRootTypes['User'] | null; // User
    stad: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Elementen: { // field return type name
    eenheidtype: 'String'
    elementGegevens: 'VastgoedObj'
    hecode: 'Int'
    heprijspereenheid: 'Float'
    hoofdelementnaam: 'String'
    id: 'Int'
    omschrijving: 'String'
  }
  Mutation: { // field return type name
    deleteRecord: 'VastgoedObj'
    login: 'AuthPayload'
    postpand: 'VastgoedObj'
    signup: 'AuthPayload'
    updaterecord: 'VastgoedObj'
    voegelementtoe: 'Elementen'
  }
  Query: { // field return type name
    vastgoedgegevens: 'VastgoedObj'
  }
  User: { // field return type name
    email: 'String'
    gebruikerData: 'VastgoedObj'
    id: 'Int'
    name: 'String'
  }
  VastgoedObj: { // field return type name
    adress: 'String'
    createdAt: 'DateTime'
    elementlijst: 'Elementen'
    energielabel: 'String'
    gbo: 'Int'
    id: 'Int'
    marktwaarde: 'Int'
    naam: 'String'
    postcode: 'String'
    postedBy: 'User'
    stad: 'String'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    deleteRecord: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    postpand: { // args
      adress: string; // String!
      energielabel: string; // String!
      gbo: number; // Int!
      marktwaarde: number; // Int!
      naam: string; // String!
      postcode: string; // String!
      stad: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    updaterecord: { // args
      adress: string; // String!
      energielabel: string; // String!
      gbo: number; // Int!
      id: number; // Int!
      marktwaarde: number; // Int!
      naam: string; // String!
      postcode: string; // String!
      stad: string; // String!
    }
    voegelementtoe: { // args
      eenheidtype: string; // String!
      hecode: number; // Int!
      heprijspereenheid: number; // Float!
      hoofdelementnaam: string; // String!
      omschrijving: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}