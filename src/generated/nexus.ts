/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { ServerContext } from "./../server-context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  RegistrationErrorName: "ALREADY_REGISTERED" | "INVALID_UUID"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Defensive: { // root type
    bowDamageTaken?: number | null; // Float
    damageTaken?: number | null; // Float
    deaths?: number | null; // Int
    id?: number | null; // Int
    meleeDamageTaken?: number | null; // Float
    playerUuid?: string | null; // String
  }
  Farming: { // root type
    fishSold?: number | null; // Int
    fishedAnything?: number | null; // Int
    fishedFish?: number | null; // Int
    hayBalesSold?: number | null; // Int
    id?: number | null; // Int
    kingsQuestCompleted?: number | null; // Int
    nightQuestsCompleted?: number | null; // Int
    playerUuid?: string | null; // String
    sewerTreasuresFound?: number | null; // Int
    wheatFarmed?: number | null; // Int
  }
  GameStats: { playerUuid: string };
  Mutation: {};
  Offensive: { // root type
    arrowsHit?: number | null; // Int
    arrowsShot?: number | null; // Int
    assists?: number | null; // Int
    bowDamageDealt?: number | null; // Float
    damageDealt?: number | null; // Float
    highestStreak?: number | null; // Int
    id?: number | null; // Int
    kills?: number | null; // Int
    meleeDamageDealt?: number | null; // Float
    playerUuid?: string | null; // String
    swordHits?: number | null; // Int
  }
  PitStats: { playerUuid: string };
  Player: { // root type
    joinedAt?: string | null; // String
    lastJoin?: string | null; // String
    rank?: string | null; // String
    uuid?: string | null; // String
  }
  Query: {};
  RegistrationError: { // root type
    description?: string | null; // String
    name?: NexusGenEnums['RegistrationErrorName'] | null; // RegistrationErrorName
  }
  RegistrationResponse: { // root type
    error?: NexusGenRootTypes['RegistrationError'] | null; // RegistrationError
    player?: NexusGenRootTypes['Player'] | null; // Player
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Defensive: { // field return type
    bowDamageTaken: number | null; // Float
    damageTaken: number | null; // Float
    deaths: number | null; // Int
    id: number | null; // Int
    meleeDamageTaken: number | null; // Float
    playerUuid: string | null; // String
  }
  Farming: { // field return type
    fishSold: number | null; // Int
    fishedAnything: number | null; // Int
    fishedFish: number | null; // Int
    hayBalesSold: number | null; // Int
    id: number | null; // Int
    kingsQuestCompleted: number | null; // Int
    nightQuestsCompleted: number | null; // Int
    playerUuid: string | null; // String
    sewerTreasuresFound: number | null; // Int
    wheatFarmed: number | null; // Int
  }
  GameStats: { // field return type
    pit: NexusGenRootTypes['PitStats'] | null; // PitStats
  }
  Mutation: { // field return type
    registerPlayer: NexusGenRootTypes['RegistrationResponse'] | null; // RegistrationResponse
  }
  Offensive: { // field return type
    arrowsHit: number | null; // Int
    arrowsShot: number | null; // Int
    assists: number | null; // Int
    bowDamageDealt: number | null; // Float
    damageDealt: number | null; // Float
    highestStreak: number | null; // Int
    id: number | null; // Int
    kills: number | null; // Int
    meleeDamageDealt: number | null; // Float
    playerUuid: string | null; // String
    swordHits: number | null; // Int
  }
  PitStats: { // field return type
    defensive: NexusGenRootTypes['Defensive'] | null; // Defensive
    farming: NexusGenRootTypes['Farming'] | null; // Farming
    offensive: NexusGenRootTypes['Offensive'] | null; // Offensive
  }
  Player: { // field return type
    gameStats: NexusGenRootTypes['GameStats'] | null; // GameStats
    joinedAt: string | null; // String
    lastJoin: string | null; // String
    rank: string | null; // String
    uuid: string | null; // String
  }
  Query: { // field return type
    player: NexusGenRootTypes['Player'] | null; // Player
    players: Array<NexusGenRootTypes['Player'] | null> | null; // [Player]
  }
  RegistrationError: { // field return type
    description: string | null; // String
    name: NexusGenEnums['RegistrationErrorName'] | null; // RegistrationErrorName
  }
  RegistrationResponse: { // field return type
    error: NexusGenRootTypes['RegistrationError'] | null; // RegistrationError
    player: NexusGenRootTypes['Player'] | null; // Player
  }
}

export interface NexusGenFieldTypeNames {
  Defensive: { // field return type name
    bowDamageTaken: 'Float'
    damageTaken: 'Float'
    deaths: 'Int'
    id: 'Int'
    meleeDamageTaken: 'Float'
    playerUuid: 'String'
  }
  Farming: { // field return type name
    fishSold: 'Int'
    fishedAnything: 'Int'
    fishedFish: 'Int'
    hayBalesSold: 'Int'
    id: 'Int'
    kingsQuestCompleted: 'Int'
    nightQuestsCompleted: 'Int'
    playerUuid: 'String'
    sewerTreasuresFound: 'Int'
    wheatFarmed: 'Int'
  }
  GameStats: { // field return type name
    pit: 'PitStats'
  }
  Mutation: { // field return type name
    registerPlayer: 'RegistrationResponse'
  }
  Offensive: { // field return type name
    arrowsHit: 'Int'
    arrowsShot: 'Int'
    assists: 'Int'
    bowDamageDealt: 'Float'
    damageDealt: 'Float'
    highestStreak: 'Int'
    id: 'Int'
    kills: 'Int'
    meleeDamageDealt: 'Float'
    playerUuid: 'String'
    swordHits: 'Int'
  }
  PitStats: { // field return type name
    defensive: 'Defensive'
    farming: 'Farming'
    offensive: 'Offensive'
  }
  Player: { // field return type name
    gameStats: 'GameStats'
    joinedAt: 'String'
    lastJoin: 'String'
    rank: 'String'
    uuid: 'String'
  }
  Query: { // field return type name
    player: 'Player'
    players: 'Player'
  }
  RegistrationError: { // field return type name
    description: 'String'
    name: 'RegistrationErrorName'
  }
  RegistrationResponse: { // field return type name
    error: 'RegistrationError'
    player: 'Player'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    registerPlayer: { // args
      uuid: string; // String!
    }
  }
  Query: {
    player: { // args
      uuid: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

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
  context: ServerContext;
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
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}