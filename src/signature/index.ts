import { recoverSignerAddress, deserializeSignedPackage } from '@redstone-finance/protocol'
import { getOracleRegistryState, getSignersForDataServiceId } from '@redstone-finance/sdk'
import { DataPackage } from '../data-package'

// // const oracleRegistry = await getOracleRegistryState()
// // const redstonePrimaryNodesAddresses = getSignersForDataServiceId(oracleRegistry, 'redstone-primary-prod')

// export function validateSignature(dataPackage: DataPackage) {
//   const signerAddress = recoverSignerAddress(deserializeSignedPackage(dataPackage))
//   return redstonePrimaryNodesAddresses.includes(signerAddress)
// }

export class SignatureService {
  private static instance: SignatureService
  private redstonePrimaryNodesAddresses: string[] = []

  private constructor() {}

  static async getInstance() {
    if (!SignatureService.instance) {
      SignatureService.instance = new SignatureService()
      const oracleRegistry = await getOracleRegistryState()
      SignatureService.instance.redstonePrimaryNodesAddresses = getSignersForDataServiceId(
        oracleRegistry,
        'redstone-primary-prod',
      )
    }
    return SignatureService.instance
  }

  async validateSignature(dataPackage: DataPackage) {
    const signerAddress = recoverSignerAddress(deserializeSignedPackage(dataPackage))
    return this.redstonePrimaryNodesAddresses.includes(signerAddress)
  }
}
