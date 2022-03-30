import { PokemonSchemaType } from '~/plugins/routes/pokemon/pokemonDetailedRoute'

type statsType = {
  baseStat: number,
  name: string,
}
type ablitilesType = {
  name: string,
  url: string
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
    types: string[],
    stats: statsType[],
    abilities: ablitilesType[]
    // evolution: evolutionType[],

  ): PokemonSchemaType => {
    return {
      id: id,
      name: name,
      image: image,
      height: height,
      weight: weight,
      types: types.map(item => item['type']),
      stats: stats.map(item =>
        ({ baseStat: item['base_stat'], name: item['stat']['name'] })
      ),
      abilities: abilities.map(item => item['ability'])
      // evolution: evolution
    }
  }
}
