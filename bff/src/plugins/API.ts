import fp from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'
import * as routes from './routes/index'

const apiPlugin: FastifyPluginCallback = (fastify, _options, next) => {
  fastify.addHook('onRequest', (req, reply, done) => {
    reply.header('x-request-id', req.id)

    done()
  })

  Object.entries(routes).forEach(([_, route]) => {
    route(fastify)
  })

  next()
}

export default fp(apiPlugin, { name: 'api' })
