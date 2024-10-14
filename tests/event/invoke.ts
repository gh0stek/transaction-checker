import event from './event.json'
import { lambdaHandler } from '../../src/app'

event.body = JSON.stringify({
  timestamps: Array.from({ length: 1 }, (_, i) => 1714948960 + i * 10),
})

// eslint-disable-next-line
lambdaHandler(event as any, { awsRequestId: '12342124' } as any)
  .then(console.log)
  .catch(console.error)
