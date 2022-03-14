import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

type Pokemon = {
  id: number,
  number: string,
  name: string,
  description: string
}

export const pokemon: Pokemon[] = [
  {
    id: 1,
    number: '001',
    name: 'Bulbasaur',
    description: 'There is a plant seed on its back right from the day this Pokémon' +
      ' is born. The seed slowly grows larger.'
  },
  {
    id: 2,
    number: '002',
    name: 'Ivysaur',
    description: 'When the bulb on its back grows large, it appears' +
      ' to lose the ability to stand on its hind legs.'
  },
  {
    id: 3,
    number: '003',
    name: 'Venusaur',
    description: 'Its plant blooms when it is absorbing solar' +
      ' energy. It stays on the move to seek sunlight.'
  },
  {
    id: 4,
    number: '004',
    name: 'Charmander',
    description: 'It has a preference for hot things. When it' +
      ' rains, steam is said to spout from the tip of its tail.'
  }
]

const PokemonListSchema = Type.Array(
  Type.Object({
    id: Type.Optional(Type.Number()),
    number: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    description: Type.Optional(Type.String())
  })
)

const ResponseSchema = Type.Object({
  pokemon: PokemonListSchema,
})
export type ResponseSchemaType = Static<typeof ResponseSchema>

const pokemonListRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: undefined
  }>(
    '/api/pokemon',
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
          pokemon: pokemon
        })
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default pokemonListRoute
