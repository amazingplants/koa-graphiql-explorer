const Koa = require('koa')
const serve = require("koa-static")
const mount = require("koa-mount")
const addTrailingSlashes = require('koa-add-trailing-slashes')
const compose = require('koa-compose')
const fs = require('fs')

const assets = new Koa()
assets.use(serve(__dirname + "/../build"))

function rewriteIndex(options) {
  return async function(ctx, next) {
    if(ctx.path === `${options.mountPoint}/`) {
      ctx.type = 'text/html'
      const index = await fs.promises.readFile(__dirname + "/../build/index.html", { encoding: 'utf8'})
      ctx.body = index.replace(/\|GRAPHQL_ENDPOINT\|/, options.graphqlEndpoint).replace(/\|DEFAULT_QUERY\|/, options.defaultQuery)
    } else {
      await next()
    }
  }
}    

module.exports = function(options) {
  options = options || {}
  options.mountPoint = options.mountPoint || "/graphiql"
  options.graphqlEndpoint = options.graphqlEndpoint || "/graphql"
  options.defaultQuery = options.defaultQuery || ""
  return compose([
    addTrailingSlashes(),
    rewriteIndex(options),
    mount(options.mountPoint, assets),
  ])
}


