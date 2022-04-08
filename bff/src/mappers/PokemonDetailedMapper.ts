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
    genera: string,
    evolution: PokemonEvolutionType[],
  ): PokemonSchemaType => {
    const setGenera = (genera): string => {
      return (genera.map(item =>
        (item['language'].name === 'en' && item.genus.replace('Pokémon', '').trim())
      ).filter(item => item.length > 0))
    }

    const setStats = (stats) => {
      return (stats.map(item => {
        let maxStat = 200
        let currentStat = item['base_stat']
        if (currentStat >= maxStat) {
          currentStat = maxStat
        }
        return {
          baseStat: currentStat, name: item['stat']['name']
        }
      }
      ))
    }

    const setImage = (image) => ((image === null) ? 'no-image' : image)

    return {
      id: id,
      name: name,
      image: setImage(image),
      height: (height / 10),
      weight: (weight / 10),
      types: types.map(item => item['type'].name),
      stats: setStats(stats),
      abilities: abilities.map(item => item['ability']),
      genders: genders,
      genera: setGenera(genera),
      evolution: evolution
    }
  }
}
