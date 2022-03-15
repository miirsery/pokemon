import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'

const CatalogSchema = Type.Object({
  count: Type.Optional(Type.Number()),
  next: Type.Optional(Type.String()),
  previous: Type.Optional(Type.String()),

  meta: Type.Optional(Type.Object({
    totalPages: Type.Number(),
    currentPage: Type.Number()
  })),

  results: Type.Optional(Type.Array(
    Type.Object({
      name: Type.Optional(Type.String()),
      url: Type.Optional(Type.String()),
      totalPages: Type.Optional(Type.Number())
    })
  ))
})

const QueryParameterSchema = Type.Object({
  limit: Type.Number(),
  offset: Type.Number()
})

const ResponseSchema = Type.Object({
  data: CatalogSchema
})

// temp pagination
const pagination = (_count: number, _limit: number, _offset: number ) => {
  let totalPages = Math.ceil(_count / _limit)
  let currentPage: number = Math.ceil(_offset / _limit )
  return { totalPages, currentPage }
}
export type QueryParameterSchemaType = Static<typeof QueryParameterSchema>
export type ResponseSchemaType = Static<typeof ResponseSchema>

const pokemonCatalogRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: QueryParameterSchemaType
  }>(
    '/api/catalog',
    {
      schema: {
        response: {
          200: ResponseSchema,
        },
      }
    },
    async (req,repl) => {
      try {
        const { data } = await fastify.axios.get('https://pokeapi.co/api/v2/pokemon', {
          params: {
            ...req.query,
          }
        })
        await repl.send({
          data,
        })
        pagination(data.count, req.query.limit, req.query.offset)
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}
export default pokemonCatalogRoute

