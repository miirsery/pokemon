import { Static, Type }  from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonDetailedMapper } from '../../../mappers/PokemonDetailedMapper'

const ParamsSchema = Type.Object({
  id: Type.Optional(Type.Number())
})

const PokemonStatsSchema = Type.Object({
  baseStat: Type.Optional(Type.Number()),
  name: Type.String()
})

const pokemonTypesType = Type.Object( {
  name: Type.String(),
})

const pokemonAbilities = Type.Object({
  name: Type.String(),
  url: Type.String(),
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
  types: Type.Array(pokemonTypesType),
  stats: Type.Array(PokemonStatsSchema),
  abilities: Type.Array(pokemonAbilities)
  // evolution: Type.Array(PokemonEvolutionSchema)
})

const responseSchema = Type.Object({
  pokemon: PokemonSchema
})
export type PokemonSchemaType = Static<typeof PokemonSchema>
export type ResponseSchemaType = Static<typeof responseSchema>

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
          200: responseSchema
        }
      }
    },
    async (req, repl) => {
      try {
        const id = req.params.id
        if (id) {
          const { data } = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const pokemonDetailed =
            PokemonDetailedMapper.mapDetailedPokemonToFrontend(
              data.id,
              data.name,
              data.sprites.other['official-artwork']['front_default'],
              data.height,
              data.weight,
              data.types,
              data.stats,
              data.abilities,
            )
          for (const item of pokemonDetailed.abilities) {
            const { data } = await fastify.axios.get(item.url)
            console.log(data)
          }
          // const { abilities } = await fastify.get()

          await repl.send({
            pokemon: pokemonDetailed
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
