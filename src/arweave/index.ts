import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch'
import { gql } from './gql-client-generated'
import { logger } from '../logger'

const GET_TRANSACTIONS_QUERY = gql(/* GraphQL */ `
  query GET_TRANSACTIONS_QUERY(
    $signerAddresses: [String!]
    $dataFeedIds: [String!]
    $timestamps: [String!]
    $first: Int = 100
    $cursor: String
  ) {
    transactions(
      first: $first
      after: $cursor
      tags: [
        { name: "type", values: ["redstone-oracles"] }
        { name: "timestamp", values: $timestamps }
        { name: "dataServiceId", values: ["redstone-primary-prod"] }
        { name: "signerAddress", values: $signerAddresses }
        { name: "dataFeedId", values: $dataFeedIds }
      ]
    ) {
      edges {
        cursor
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }
`)

export type TransactionsParams = {
  dataFeedIds: string[]
  timestamps: number[]
  cursor?: string
  first?: number
}

export class TransactionService {
  private static instance: TransactionService
  private readonly gqlClient: ApolloClient<NormalizedCacheObject>
  private readonly signerAddresses: string[]

  private constructor() {
    if (!process.env.ARWEAVE_GQL_URL) {
      logger.error('ARWEAVE_GQL_URL is not defined')
      throw new Error('ARWEAVE_GQL_URL is not defined')
    }
    const signerAddresses = process.env.SIGNER_ADDRESSES?.split(',')
    if (!signerAddresses?.length) {
      logger.error('SIGNER_ADDRESSES is not defined')
      throw new Error('SIGNER_ADDRESSES is not defined')
    }
    this.signerAddresses = signerAddresses
    this.gqlClient = new ApolloClient({
      link: createHttpLink({
        uri: process.env.ARWEAVE_GQL_URL,
        fetch,
      }),
      cache: new InMemoryCache(),
    })
  }

  static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService()
    }
    return TransactionService.instance
  }

  async getTransactions(params: TransactionsParams) {
    return await this.gqlClient.query({
      query: GET_TRANSACTIONS_QUERY,
      variables: {
        ...params,
        timestamps: params.timestamps.map((timestamp) => timestamp.toString()),
        signerAddresses: this.signerAddresses,
      },
    })
  }
}
