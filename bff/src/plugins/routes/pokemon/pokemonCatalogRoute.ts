import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import {
  PokemonCatalogMapper
} from '~/mappers/PokemonCatalogMapper'

const PaginationSchema = Type.Object({
  totalPages: Type.Number(),
})

const QueryParameterSchema = Type.Object({
  limit: Type.Number(),
  offset: Type.Number()
})

const DetailedPokemonSchema = Type.Object({
  image: Type.String(),
  urL: Type.String(),
  id: Type.Number(),
  name: Type.String(),
  types: Type.Array(Type.String())
})

const ResponseSchema = Type.Object({
  meta: PaginationSchema,
  pokemonList: Type.Array(DetailedPokemonSchema),
  totalPages: Type.Optional(Type.Number()),
  success: Type.Boolean(),
})

export type PaginationSchemaType = Static<typeof PaginationSchema>
export type QueryParameterSchemaType = Static<typeof QueryParameterSchema>
export type DetailedPokemonSchemaType = Static<typeof DetailedPokemonSchema>

type ResponseSchemaType = Static<typeof ResponseSchema>

const pokemonCatalogRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: QueryParameterSchemaType
  }>(
    '/api/pokemon',
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

        const pokemonList: DetailedPokemonSchemaType[] = []
        for (const item of data.results) {
          const { data } = await fastify.axios.get(item.url)
          pokemonList.push(PokemonCatalogMapper.mapDetailedCatalogToFrontend(
            item.url,
            data.sprites.other['official-artwork'].front_default,
            data.id,
            data.name,
            data.types
          ))
        }

        const meta = PokemonCatalogMapper.mapPaginationToFrontend(
          data.count,
          req.query.limit,
          req.query.offset
        )

        await repl.send({
          pokemonList,
          meta,
          success: true
        })
      } catch (e) {
        fastify.log.error(e)
        repl.send({
          success: false
        })
      }
    }
  )
}
export default pokemonCatalogRoute
