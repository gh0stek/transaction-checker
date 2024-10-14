import axios from 'axios'
import { logger } from '../logger'
import { URL } from 'url'

export type DataPackage = {
  dataPoints: {
    dataFeedId: string
    value: number
    metadata: {
      value: string
      sourceMetadata: {
        [key: string]: {
          tradeInfo?: {
            bidPrice?: number
            askPrice?: number
            volumeInUsd: number
          }
          value: string
        }
      }
      nodeLabel: string
    }
  }[]
  timestampMilliseconds: number
  dataPackageId: string
  signature: string
  dataServiceId: string
  signerAddress: string
  isSignatureValid: boolean
  dataFeedId: string
}

export async function getDataPackage(id: string) {
  if (!process.env.PACKAGES_URL) {
    logger.error('PACKAGES_URL is not defined')
    throw new Error('PACKAGES_URL is not defined')
  }
  const response = await axios.get<DataPackage>(new URL(`/${id}`, process.env.PACKAGES_URL).toString())
  return response.data
}
