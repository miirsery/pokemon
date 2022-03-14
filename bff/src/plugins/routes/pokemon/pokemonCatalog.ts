import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify'

type Pokemon = {
  name: string,
  url: string
}
export const PokemonCatalog: Pokemon[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/'
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/'
  },
]
const catalogSchema = Type.Array(
  Type.Object({
    count: Type.Optional(Type.Number()),
    name: Type.Optional(Type.String()),
    url: Type.Optional(Type.String())
  })
)
const ResponseSchema = Type.Object({
  results: catalogSchema
})

export type ResponseSchemaType = Static<typeof ResponseSchema>

const pokemonListRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: undefined
  }>(
    '/api/catalog',
    {
      schema: {
        response: {
          200: ResponseSchema,
        },
      }
    },
    async (req, repl) => {
      try {
        await repl.send({
          results: PokemonCatalog
        })
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}
export default pokemonListRoute
