import { Logger } from '@aws-lambda-powertools/logger'

export const logger = new Logger({
  environment: process.env.NODE_ENV ?? 'prod',
  logLevel: process.env.NODE_ENV === 'local' ? 'DEBUG' : 'INFO',
})
