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

const PokemonTypesType = Type.Object( {
  name: Type.String(),
})

const PokemonAbilities = Type.Object({
  name: Type.String(),
  url: Type.String(),
})

const pokemonEvolution =
   Type.Object({
     name: Type.String(),
     id: Type.Number(),
     url: Type.String(),
     image: Type.String()
   })


const PokemonSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  image: Type.String(),
  height: Type.Number(),
  weight: Type.Number(),
  types: Type.Array(PokemonTypesType),
  stats: Type.Array(PokemonStatsSchema),
  abilities: Type.Array(PokemonAbilities)
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
          const pokemonData  = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const pokemonSpecies = await fastify.axios.get(pokemonData.data.species.url)
          const pokemonEvolutionChainUrl
            = await fastify.axios.get(pokemonSpecies.data['evolution_chain'].url)
          const pokemonGenera = pokemonSpecies.data.genra
          // const pokemonGender =
          // const pokemonDetailed =
          //   PokemonDetailedMapper.mapDetailedPokemonToFrontend(
          //     pokemonData.id,
          //     pokemonData.name,
          //     pokemonData.sprites.other['official-artwork']['front_default'],
          //     pokemonData.height,
          //     pokemonData.weight,
          //     pokemonData.types,
          //     pokemonData.stats,
          //     pokemonData.abilities,
          //   )
          await repl.send({
            // pokemon: pokemonDetailed
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
