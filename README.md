Use `graphiql-explorer` in your Koa app.

## Installation

```
npm install koa-graphql-explorer
```

## Usage

```
const graphiqlExplorer = require('koa-graphiql-explorer')
const Koa = require('koa')

const app = new Koa()

app.use(graphiqlExplorer({
  mountPoint: '/graphiql',
  graphqlEndpoint: '/graphql', 
  defaultQuery: `query MyQuery {}`
}))

```

