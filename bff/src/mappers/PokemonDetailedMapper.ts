import { ResponseSchemaType } from '~/plugins/routes/pokemon/pokemonDetailedRoute'

type typesType = {
    type: string
}

type statsType = {
  value: number,
  name: string,
}

type evolutionType = {
  name: string,
  url: string,
}

export class PokemonDetailedMapper {
  static mapDetailedPokemonToFrontend = (
    id: number,
    name: string,
    image: string,
    height: number,
    weight: number,
    types: typesType[],
    stats: statsType[],
    // evolution: evolutionType[],

  ): ResponseSchemaType => {
    return {
      id: id,
      name: name,
      image: image,
      height: height,
      weight: weight,
      types: types,
      stats: stats,
      // evolution: evolution
    }
  }
}
