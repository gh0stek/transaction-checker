import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Transform, plainToClass } from 'class-transformer'
import { IsDateString, IsOptional, IsString, validate, isString } from 'class-validator'

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

class QueryParams {
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  startDate?: Date

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  endDate?: Date

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  token?: string[]
}

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = plainToClass(QueryParams, event.queryStringParameters)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'test',
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    }
  }
}
