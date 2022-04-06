import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonDetailedMapper } from '../../../mappers/PokemonDetailedMapper'

const PokemonStatsSchema = Type.Object({
  baseStat: Type.Optional(Type.Number()),
  name: Type.String()
})

const PokemonTypesType = Type.Object({
  name: Type.String(),
})

const PokemonAbilities = Type.Object({
  name: Type.String(),
  url: Type.String(),
})

const PokemonEvolutionSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  image: Type.String(),
  types: Type.Array(Type.String()),
  stage: Type.Number()
})

const StageSchema = Type.Optional(Object({
  stage: PokemonEvolutionSchema
}))


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
  genera: Type.Array(Type.String()),
  evolution: StageSchema,
})

const ResponseSchema = Type.Object({
  pokemon: PokemonSchema,
  success: Type.Boolean()
})

export type PokemonSchemaType = Static<typeof PokemonSchema>
export type ResponseSchemaType = Static<typeof ResponseSchema>
export type PokemonEvolutionType = Static<typeof PokemonEvolutionSchema>

type ParamsType = {
  id: number | string
}

const pokemonDetailedRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Params: ParamsType
  }>(
    '/api/pokemon/:id',
    {
      schema: {
        response: {
          200: ResponseSchema
        }
      }
    },
    async (req, repl) => {
      try {
        const id = req.params.id
        if (id) {
          const pokemonData = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
      } catch (e) {
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
  const genderless = await fastify.axios.get('https://pokeapi.co/api/v2/gender/3/')

  const pokemonListMale = maleGender.data.pokemon_species_details
  const pokemonListFemale = femaleGender.data.pokemon_species_details
  const pokemonListGenderless = genderless.data.pokemon_species_details

  const isPokemonGenderMale = (): boolean =>
    (pokemonListMale.filter(pokemon => pokemon['pokemon_species'].name === name).length > 0)

  const isPokemonGenderFemale = (): boolean =>
    (pokemonListFemale.filter(pokemon => pokemon['pokemon_species'].name === name).length > 0)

  const isPokemonGenderless = (): boolean =>
    (pokemonListGenderless.filter(pokemon => pokemon['pokemon_species'].name === name).length > 0)


  if (isPokemonGenderMale()) {
    gender.push('male-gender')
  }

  if (isPokemonGenderFemale()) {
    gender.push('female-gender')
  }

  if (isPokemonGenderless())
    gender.push('genderless')

  return gender
}

async function getEvolutionChain(evolvesTo, fastify): Promise<any[]> {
  let evolutionChain: any[] = []
  const stage1: any[] = []
  const stage2: any[] = []
  const stage3: any[] = []

  const getAndAddEvolutionPokemon = async (slug: string, stage: number): Promise<void> => {
    const pokemon = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${slug}`)
    if (stage === 1) {
      stage1.push({
        name: pokemon.data.name,
        id: pokemon.data.id,
        image: pokemon.data.sprites.other['official-artwork']['front_default'],
        types:  pokemon.data.types.map(item => item['type']['name']),
        stage: stage
      })
    }
    if (stage === 2) {
      stage2.push({
        name: pokemon.data.name,
        id: pokemon.data.id,
        image: pokemon.data.sprites.other['official-artwork']['front_default'],
        types:  pokemon.data.types.map(item => item['type']['name']),
        stage: stage
      })
    }
    if (stage === 3) {
      stage3.push({
        name: pokemon.data.name,
        id: pokemon.data.id,
        image: pokemon.data.sprites.other['official-artwork']['front_default'],
        types:  pokemon.data.types.map(item => item['type']['name']),
        stage: stage
      })
    }
    evolutionChain = [{ stage: stage1 }, { stage: stage2 }, { stage: stage3 }]
  }
  await getAndAddEvolutionPokemon(evolvesTo.species.name, 1)

  for (const prop of evolvesTo['evolves_to']) {
    await getAndAddEvolutionPokemon(prop.species.name, 2)
    for (const deepProp of prop['evolves_to']) {
      await getAndAddEvolutionPokemon(deepProp.species.name, 3)
    }
  }
  return evolutionChain
}

export default pokemonDetailedRoute
