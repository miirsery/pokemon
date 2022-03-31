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

const PokemonEvolutionSchema =
  Type.Object({
    id: Type.Number(),
    name: Type.String(),
    image: Type.String(),
    types: Type.Array(Type.String()),
    stage: Type.Number()
  })

const PokemonGeneraSchema = Type.Object({
  genus: Type.String(),
})
const PokemonSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  image: Type.String(),
  height: Type.Number(),
  weight: Type.Number(),
  types: Type.Array(PokemonTypesType),
  stats: Type.Array(PokemonStatsSchema),
  abilities: Type.Array(PokemonAbilities),
  genders: Type.Array(Type.String()),
  genera: Type.Array(PokemonGeneraSchema),
  evolution: Type.Array(PokemonEvolutionSchema),
})

const responseSchema = Type.Object({
  pokemon: PokemonSchema,
  success: Type.Boolean()
})
export type PokemonSchemaType = Static<typeof PokemonSchema>
export type ResponseSchemaType = Static<typeof responseSchema>
type PokemonEvolutionType = Static<typeof PokemonEvolutionSchema>

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
          const pokemonGenera = pokemonSpecies.data.genera
          const evolutionChain: PokemonEvolutionType[] =
            await getEvolutionChain(
              pokemonEvolutionChainUrl.data.chain,
              fastify
            )

          const genders = await getPokemonGender(pokemonData.data.name, fastify)

          const pokemonDetailed = PokemonDetailedMapper.mapDetailedPokemonToFrontend(
            pokemonData.data.id,
            pokemonData.data.name,
            pokemonData.data.sprites.other['official-artwork']['front_default'],
            pokemonData.data.height,
            pokemonData.data.weight,
            pokemonData.data.types,
            pokemonData.data.stats,
            pokemonData.data.abilities,
            genders,
            pokemonGenera,
            evolutionChain,
          )
          await repl.send({
            pokemon: pokemonDetailed,
            success: true,
          })
        }
      }
      catch (e) {
        fastify.log.error(e)
        repl.send({
          success: false
        })
      }
    }
  )
}

const getPokemonGender = async (name: string, fastify): Promise<string[]> => {
  let gender: string[] = []

  const maleGender = await fastify.axios.get('https://pokeapi.co/api/v2/gender/1/')
  const femaleGender = await fastify.axios.get('https://pokeapi.co/api/v2/gender/2/')

  const pokemonListMale = maleGender.data.pokemon_species_details
  const pokemonListFemale = femaleGender.data.pokemon_species_details

  const isPokemonGenderMale = () =>
    (pokemonListMale.filter(pokemon => pokemon['pokemon_species'].name === name).length > 0)

  const isPokemonGenderFemale = () =>
    (pokemonListFemale.filter(pokemon => pokemon['pokemon_species'].name === name).length > 0)


  if (isPokemonGenderMale()) {
    gender.push('male-gender')
  }

  if (isPokemonGenderFemale()) {
    gender.push('female-gender')
  }

  return gender
}

async function getEvolutionChain(evolvesTo, fastify): Promise<PokemonEvolutionType[]> {
  const evolutionChainCompleted: PokemonEvolutionType[]= []
  await getEvolveStage(evolvesTo, 0)

  async function getEvolveStage(evolvesTo, stage) {
    for(let item in evolvesTo) {
      if(typeof(evolvesTo[item]) === 'object') {
        if (item == 'evolves_to') {
          await getEvolveStage(evolvesTo[item], ++stage)
        }
        else {
          await getEvolveStage(evolvesTo[item], stage)
        }
      } else {
        if (typeof(evolvesTo[item]) == 'string' && evolvesTo[item].includes('pokemon-species'))
        {
          const pokemonSpecies = await fastify.axios.get(evolvesTo[item])
          const id = pokemonSpecies.data.id
          const pokemon = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const name = pokemon.data.name
          const image = pokemon.data.sprites.other['official-artwork'].front_default
          const types = pokemon.data.types.map((item) => item.type.name)

          const evolution = {
            id: id,
            name: name,
            image: image,
            types: types,
            stage: stage,
          }

          evolutionChainCompleted.push(evolution)
        }
      }
    }
  }

  return evolutionChainCompleted
}


export default pokemonDetailedRoute
