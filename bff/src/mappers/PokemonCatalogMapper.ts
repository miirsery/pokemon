import {
  DetailedPokemonSchemaType,
  PaginationSchemaType
} from '~/plugins/routes/pokemon/pokemonCatalogRoute'

type abilityType = {
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
    const currentPage = Math.ceil(offset / limit )

    return { totalPages, currentPage }
  }
  static mapDetailedCatalogToFrontend = (
    url: string,
    image: string,
    id: number,
    name: string,
    abilities: abilityType[]
  ): DetailedPokemonSchemaType => {
    return {
      image: image,
      urL: url,
      id: id,
      name: name,
      abilities: abilities.map((item) => item.ability.name)
    }
  }
}
