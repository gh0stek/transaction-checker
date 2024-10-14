import { recoverSignerAddress, deserializeSignedPackage } from '@redstone-finance/protocol'
import { getOracleRegistryState, getSignersForDataServiceId } from '@redstone-finance/sdk'
import { DataPackage } from '../data-package'

const oracleRegistry = await getOracleRegistryState()
const redstonePrimaryNodesAddresses = getSignersForDataServiceId(oracleRegistry, 'redstone-primary-prod')

export function validateSignature(dataPackage: DataPackage) {
  const signerAddress = recoverSignerAddress(deserializeSignedPackage(dataPackage))
  return redstonePrimaryNodesAddresses.includes(signerAddress)
}
