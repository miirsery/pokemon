import {
  DescriptionType
} from '~/plugins/routes/pokemon/pokemonDetailedAbilityRoute'

export class PokemonDetailedAbilityMapper {
  static mapPokemonDetailedAbilityToFrontend = (
    description: DescriptionType[]
  ): string  => {
    let descriptionData = ''
    description.filter(item => {
      if (item['language'].name === 'en') {
        descriptionData = item['flavor_text'].replace('\n', ' ')
      }
    })
    return descriptionData
  }
}
