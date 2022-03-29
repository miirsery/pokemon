<template>
  <div class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <div class="pokemon-detailed__img">
        <img :src="pokemonDetailed.img" :alt="pokemonDetailed.name" />
      </div>
      <div class="pokemon-detailed__info">
        <h2 class="pokemon-detailed__title subtitle">
          name
          <span>{{ id }}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'PokemonDetailed',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    type DetailedPokemonStatsType = {
      stat: number
      name: string
    }

    type DetailedPokemonType = {
      id: number
      name: string
      img: string
      abilities: string[]
      stats: DetailedPokemonStatsType[]
    }

    type LocalStoragePokemonType = {
      id: number
      name: string
      img: string
    }

    const pokemonDetailed: DetailedPokemonType = {
      id: 44,
      name: 'Pokemon4ik',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png',
      abilities: ['fire', 'storm'],
      stats: [
        {
          stat: 48,
          name: 'hp',
        },
      ],
    }

    const localStoragePokemon: LocalStoragePokemonType = {
      id: pokemonDetailed.id,
      name: pokemonDetailed.name,
      img: pokemonDetailed.img,
    }

    const oldPokemonList = JSON.parse(localStorage.getItem('pokemon-list'))

    onMounted(() => {
      if (oldPokemonList) {
        let newPokemonList = oldPokemonList
        newPokemonList.forEach((pokemon, index) => {
          if (pokemon.id === localStoragePokemon.id) {
            newPokemonList.splice(index, 1)
          }
        })

        newPokemonList.unshift(localStoragePokemon)
        if (newPokemonList.length > 5) {
          newPokemonList.pop()
        }
        localStorage.setItem('pokemon-list', JSON.stringify(newPokemonList))
      } else {
        localStorage.setItem(
          'pokemon-list',
          JSON.stringify([localStoragePokemon])
        )
      }
    })
    return {
      pokemonDetailed,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-detailed {
  &__wrapper {
    display: flex;
    width: 100%;
  }

  &__img {
    max-width: 300px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
