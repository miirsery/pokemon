import { PokemonSchemaType } from '~/plugins/routes/pokemon/pokemonDetailedRoute'

type statsType = {
  baseStat: number,
  name: string,
}
type abilitiesType = {
  name: string,
  url: string
}

type evolutionType = {
  id: number,
  name: string,
  image: string,
  types: string[],
  stage: number
}
type pokemonGeneraType = {
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
    stats: statsType[],
    abilities: abilitiesType[],
    genders: string[],
    genera: pokemonGeneraType[],
    evolution: evolutionType[],
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
