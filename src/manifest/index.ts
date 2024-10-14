import axios from 'axios'
import { logger } from '../logger'

export type Manifest = {
  interval: number
  priceAggregator: string
  defaultSource: string[]
  sourceTimeout: number
  minValidSourcesPercentage: number
  deviationCheck: {
    deviationWithRecentValues: {
      maxPercent: number
      maxDelayMilliseconds: number
    }
  }
  tokens: {
    [key: string]: {
      source: string[]
      deviationCheck?: {
        deviationWithRecentValues: {
          maxPercent: number
          maxDelayMilliseconds: number
        }
      }
      decimals?: number
      priceAggregator?: string
      valueCapConfig?: {
        upper: {
          token?: string
          multiplier?: number
          value?: number
        }
      }
      fixedValue?: number
      _validPackages?: number
    }
  }
  multiPointPackages: {
    [key: string]: string[]
  }
}

export async function getManifest() {
  if (!process.env.MANIFEST_URL) {
    logger.error('MANIFEST_URL is not defined')
    throw new Error('MANIFEST_URL is not defined')
  }
  const response = await axios.get<Manifest>(process.env.MANIFEST_URL)
  return response.data
}
