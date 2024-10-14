import { config } from 'dotenv'
config({ path: '../../.env' })
import { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  schema: './schema.graphql',
  hooks: { afterOneFileWrite: ['prettier "**/*.ts" --write'] },
  generates: {
    './gql-client-generated/': {
      preset: 'client',
      documents: ['*.{ts,mts}'],
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default codegenConfig
