import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonCatalogMapper } from '../../../mappers/PokemonCatalogMapper'

const PaginationSchema = Type.Object({
  totalPages: Type.Number(),
  currentPage: Type.Number()
})
export type PaginationSchemaType = Static<typeof PaginationSchema>

const ResponseSchema = Type.Object({
  results: Type.Array(
    Type.Object({
      name: Type.String(),
      url: Type.String(),
      totalPages: Type.Optional(Type.Number())
    })
  ),
  meta: PaginationSchema,
})

const QueryParameterSchema = Type.Object({
  limit: Type.Number(),
  offset: Type.Number()
})

export type QueryParameterSchemaType = Static<typeof QueryParameterSchema>
export type ResponseSchemaType = Static<typeof ResponseSchema>

const pokemonCatalogRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: QueryParameterSchemaType
  }>(
    '/api/pokemon-catalog',
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
        const meta = PokemonCatalogMapper.mapPaginationToFrontend(
          data.count,
          req.query.limit,
          req.query.offset
        )

        await repl.send({
          results: data.results,
          meta,
        })
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}
export default pokemonCatalogRoute

