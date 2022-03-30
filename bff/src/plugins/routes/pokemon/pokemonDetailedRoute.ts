import { Static, Type }  from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonDetailedMapper } from '../../../mappers/PokemonDetailedMapper'

const ParamsSchema = Type.Object({
  id: Type.Optional(Type.Number())
})

const PokemonStatsSchema = Type.Object({
  value: Type.Number(),
  name: Type.String()
})

const PokemonEvolutionSchema = Type.Object({
  name: Type.String(),
  url: Type.String()
})

const PokemonSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  image: Type.String(),
  height: Type.Number(),
  weight: Type.Number(),
  types: Type.Array(Type.Object({
    type: Type.String()
  })),
  stats: Type.Array(PokemonStatsSchema),
  // evolution: Type.Array(PokemonEvolutionSchema)
})

export type ResponseSchemaType = Static<typeof PokemonSchema>

const pokemonDetailedRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Params: Static<typeof ParamsSchema>
  }>(
    '/api/pokemon/:id',
    {
      schema: {
        params: ParamsSchema,
        response: {
          200: PokemonSchema
        }
      }
    },
    async (req, repl) => {
      try {
        const id = req.params.id
        if (id) {
          const  { data } = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const pokemonDetailed: ResponseSchemaType[] = []
          pokemonDetailed.push(PokemonDetailedMapper.mapDetailedPokemonToFrontend(
            data.id,
            data.name,
            data.sprites.other['official-artwork']['front_default'],
            data.height,
            data.weight,
            data.types['type'],
            data.stats,
          ))
          console.log(pokemonDetailed)
          await repl.send({
            pokemonDetailed
          })
        }
      }
      catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default pokemonDetailedRoute
