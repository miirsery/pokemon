import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'

const ResponseSchema = Type.Object({
  description: Type.String()
})

const ParamsSchema = Type.Object({
  id: Type.Optional(Type.Number())
})

type ResponseSchemaType = Static<typeof ResponseSchema>
type ParamsSchemaType = Static<typeof ParamsSchema>

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
        console.log(id)
        await repl.send({
          id
        })
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default PokemonDetailedAbilityRoute
