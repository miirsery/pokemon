import { PaginationSchemaType } from '~/plugins/routes/pokemon/pokemonCatalogRoute'

export class PokemonMapper {
  static test = (pokemons: any) => {
    return {

    }
  }

  static mapPaginationToFrontend = (
    count: number,
    limit: number,
    offset: number
  ): PaginationSchemaType => {
    const totalPages = Math.ceil(count / limit)
    const currentPage: number = Math.ceil(offset / limit )

    return { totalPages, currentPage }
  }
}
