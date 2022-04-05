import {
  PokemonSchemaType,
  PokemonEvolutionType
} from '~/plugins/routes/pokemon/pokemonDetailedRoute'

type StatsType = {
  baseStat: number,
  name: string,
}
type AbilitiesType = {
  name: string,
  url: string
}

type PokemonGeneraType = {
  genus: string,
}

export class PokemonDetailedMapper {
  static mapDetailedPokemonToFrontend = (
    id: number,
    name: string,
    image: string,
    height: number,
    weight: number,
    types: string[],
    stats: StatsType[],
    abilities: AbilitiesType[],
    genders: string[],
    genera: PokemonGeneraType[],
    evolution: PokemonEvolutionType[],
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
      abilities: abilities.map(item => item['ability']),
      genders: genders,
      genera: genera.filter(item =>
        (item['language'].name === 'en' && item.genus)),
      evolution: evolution
    }
  }
}
