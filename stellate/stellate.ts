import { Config } from 'stellate'

const config: Config = {
  config: {
    name: 'local-dev',
    schema: 'http://localhost:1337/graphql',
    originUrl: 'http://localhost:1337/graphql',
    passThroughOnly: false,
    rules: [
      {
        description: 'Cache all queries',
        maxAge: 900,
        swr: 900,
        scope: 'PUBLIC',
        types: ['Query'],
      },
    ],
  },
}

export default config