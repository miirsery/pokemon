import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonDetailedAbilityMapper } from '~/mappers/PokemonDetailedAbilityMapper'

const DescriptionSchema = Type.String()

const ResponseSchema = Type.Object({
  description: DescriptionSchema
})

export type ResponseSchemaType = Static<typeof ResponseSchema>
export type DescriptionType = Static<typeof DescriptionSchema>

type ParamsSchemaType = {
  id: string | number
}

const PokemonDetailedAbilityRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Params: ParamsSchemaType
  }>(
    '/api/ability/:id',
    {
      schema: {
        response: {
          200: ResponseSchema
        },
      }
    },
    async (req, repl) => {
      try {
        const id = req.params.id
        const pokemonAbility = await fastify.axios.get(`https://pokeapi.co/api/v2/ability/${id}/`)
        const pokemonAbilityItem = PokemonDetailedAbilityMapper.mapPokemonDetailedAbilityToFrontend(
          pokemonAbility.data['flavor_text_entries']
        )
        await repl.send({
          description: pokemonAbilityItem
        })
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default PokemonDetailedAbilityRoute
