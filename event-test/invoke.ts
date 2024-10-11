import event from './event.json'
import { lambdaHandler } from '../src/app'

// eslint-disable-next-line
lambdaHandler(event as any)
  .then(console.log)
  .catch(console.error)
