/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type RangeFilter = {
  max?: InputMaybe<Scalars['Int']['input']>
  min?: InputMaybe<Scalars['Int']['input']>
}

export enum SortOrder {
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IngestedAtAsc = 'INGESTED_AT_ASC',
  IngestedAtDesc = 'INGESTED_AT_DESC',
}

export type TagFilter = {
  match?: InputMaybe<TagMatch>
  name?: InputMaybe<Scalars['String']['input']>
  op?: InputMaybe<TagOperator>
  values?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum TagMatch {
  Exact = 'EXACT',
  FuzzyAnd = 'FUZZY_AND',
  FuzzyOr = 'FUZZY_OR',
  Wildcard = 'WILDCARD',
}

export enum TagOperator {
  Eq = 'EQ',
  Neq = 'NEQ',
}

export type Get_Transactions_QueryQueryVariables = Exact<{
  signerAddresses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
  dataFeedIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
  timestamps?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  cursor?: InputMaybe<Scalars['String']['input']>
}>

export type Get_Transactions_QueryQuery = {
  __typename?: 'Query'
  transactions: {
    __typename?: 'TransactionConnection'
    edges: Array<{
      __typename?: 'TransactionEdge'
      cursor: string
      node: { __typename?: 'Transaction'; id: string; tags: Array<{ __typename?: 'Tag'; name: string; value: string }> }
    }>
  }
}

export const Get_Transactions_QueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GET_TRANSACTIONS_QUERY' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'signerAddresses' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dataFeedIds' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'timestamps' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '100' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cursor' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cursor' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tags' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'StringValue', value: 'type', block: false },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'values' },
                          value: {
                            kind: 'ListValue',
                            values: [{ kind: 'StringValue', value: 'redstone-oracles', block: false }],
                          },
                        },
                      ],
                    },
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'StringValue', value: 'timestamp', block: false },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'values' },
                          value: { kind: 'Variable', name: { kind: 'Name', value: 'timestamps' } },
                        },
                      ],
                    },
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'StringValue', value: 'dataServiceId', block: false },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'values' },
                          value: {
                            kind: 'ListValue',
                            values: [{ kind: 'StringValue', value: 'redstone-primary-prod', block: false }],
                          },
                        },
                      ],
                    },
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'StringValue', value: 'signerAddress', block: false },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'values' },
                          value: { kind: 'Variable', name: { kind: 'Name', value: 'signerAddresses' } },
                        },
                      ],
                    },
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'StringValue', value: 'dataFeedId', block: false },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'values' },
                          value: { kind: 'Variable', name: { kind: 'Name', value: 'dataFeedIds' } },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'cursor' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_Transactions_QueryQuery, Get_Transactions_QueryQueryVariables>
