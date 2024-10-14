import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { LambdaInterface } from '@aws-lambda-powertools/commons/types'
import { plainToClass } from 'class-transformer'
import { IsOptional, IsString, validate, IsInt, IsArray, IsDefined, ArrayMinSize } from 'class-validator'
import { logger } from './logger'
import { getManifest } from './manifest'
import { TransactionService } from './arweave'
import { getDataPackage } from './data-package'
import { validateSignature } from './signature'

class BodyParams {
  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  timestamps!: number[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tokens?: string[]
}

class Lambda implements LambdaInterface {
  /**
   *
   * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
   * @param {Object} event - API Gateway Lambda Proxy Input Format
   *
   * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
   * @returns {Object} object - API Gateway Lambda Proxy Output Format
   *
   */
  @logger.injectLambdaContext({
    logEvent: process.env.NODE_ENV === 'xlocal',
  })
  // eslint-disable-next-line
  public async handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      // Validate body
      const bodyParams = plainToClass(BodyParams, JSON.parse(event.body || '{}'))
      const errors = await validate(bodyParams, { whitelist: true })
      if (errors.length) {
        logger.error('validation error', { errors, bodyParams })
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'validation error',
            errors: errors.map((e) => e.constraints),
          }),
        }
      }

      // Get manifest
      const manifest = await getManifest()
      if (!manifest) {
        logger.error('No manifest', { manifest })
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Internal server error',
          }),
        }
      }
      let dataFeedIds: string[]
      if (bodyParams.tokens?.length) {
        dataFeedIds = bodyParams.tokens.filter((token) => manifest.tokens[token])
        if (!dataFeedIds.length) {
          logger.error('No dataFeedIds found in manifest', { dataFeedIds })
          return {
            statusCode: 400,
            body: JSON.stringify({
              message: 'No dataFeedIds found in manifest',
            }),
          }
        }
      } else {
        dataFeedIds = Object.keys(manifest.tokens)
      }

      const transactionService = TransactionService.getInstance()
      const pageSize = 100
      const getNextPage = async (cursor?: string) => {
        const transactions = await transactionService.getTransactions({
          dataFeedIds,
          timestamps: bodyParams.timestamps ?? [Date.now()],
          cursor,
          first: pageSize,
        })
        const edges = transactions.data.transactions.edges
        await Promise.all([
          ...edges.map(async (edge) => {
            const dataFeedId = edge.node.tags.find((tag) => tag.name === 'dataFeedId')?.value
            const dataPackage = await getDataPackage(edge.node.id)
            const isValid = validateSignature(dataPackage)
            if (!isValid || !dataFeedId) {
              return
            }
            manifest.tokens[dataFeedId]._validPackages = (manifest.tokens[dataFeedId]._validPackages ?? 0) + 1
          }),
          edges.length >= pageSize ? await getNextPage(edges[edges.length - 1].cursor) : Promise.resolve(),
        ])
      }
      await getNextPage()
      let validPackages = 0
      const invalidTokens: string[] = []
      dataFeedIds.forEach((dataFeedId) => {
        if (manifest.tokens[dataFeedId]._validPackages) {
          validPackages++
          return
        }
        invalidTokens.push(dataFeedId)
      })
      const validPercentage = (validPackages / dataFeedIds.length) * 100
      const result = validPercentage >= 99 ? 'success' : 'failure'
      return {
        statusCode: 200,
        body: JSON.stringify({
          result,
          invalidTokens,
          totalTokens: dataFeedIds.length,
          validTokens: validPackages,
        }),
      }
    } catch (err) {
      logger.error('error', { err })
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'internal server error',
        }),
      }
    }
  }
}
const handlerClass = new Lambda()
export const lambdaHandler = handlerClass.handler.bind(handlerClass)
