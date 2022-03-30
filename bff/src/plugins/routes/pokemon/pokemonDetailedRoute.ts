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
          const { data } = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

          const evolutionUrl = data.species.url
          const evolutionChain  = await fastify.axios.get(evolutionUrl)

          const evolutionChainData =
            await fastify.axios.get(evolutionChain.data['evolution_chain'].url)

          const firstPokemonDataResponse =
            await fastify.axios.get(evolutionChainData.data.chain.species.url)
              .then(item => item.data)
          const firstPokemonDataResponseUrl
            =  await fastify.axios.get(evolutionChainData.data.chain.species.url)
              .then(item => item.data.varieties.pokemon.url)
          const firstPokemonDataResponseUrlData
            = await fastify.axios.get(firstPokemonDataResponseUrl)

          console.log(firstPokemonDataResponseUrlData)
          const firstPokemonData = {
            name: firstPokemonDataResponse.name,
            id: firstPokemonDataResponse.id
          }
          console.log(firstPokemonData)
          const evolutionPokemonList = {
            first: {
              name: '',
              id: 0,
              url: '',
              image: '',
            }
          }
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
