import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'

import { pokemon } from './pokemonListRoute'

const PokemonSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  number: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  description: Type.Optional(Type.String())
})

const ResponseSchema = Type.Object({
  pokemon: PokemonSchema,
})
export type ResponseSchemaType = Static<typeof ResponseSchema>

const ParamsSchema = Type.Object({
  id: Type.Optional(Type.Number())
})

const pokemonRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Params: Static<typeof ParamsSchema>
  }>(
    '/api/pokemon/:id',
    {
      schema: {
        params: ParamsSchema,
        response: {
          200: ResponseSchema,
        },
      }
    },
    async (req, repl) => {
      try {
        const id = req.params.id
        if (id) {
          // await fastify.axios.get()
          await repl.send({
            pokemon: pokemon.find(pokemon => pokemon.id === id)
          })
        }
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default pokemonRoute
