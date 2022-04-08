import {
  DetailedPokemonSchemaType,
  PaginationSchemaType
} from '~/plugins/routes/pokemon/pokemonCatalogRoute'

type PokemonTypesType = {
  ability: {
    name: string
  }
}

export class PokemonCatalogMapper {
  static mapPaginationToFrontend = (
    count: number,
    limit: number,
    offset: number
  ): PaginationSchemaType => {
    const totalPages = Math.ceil(count / limit)

    return { totalPages }
  }
  static mapDetailedCatalogToFrontend = (
    url: string,
    image: string,
    id: number,
    name: string,
    types: PokemonTypesType[]
  ): DetailedPokemonSchemaType => {
    return {
      image: image,
      urL: url,
      id: id,
      name: name,
      types: types.map((item) => item['type'].name)
    }
  }
}
