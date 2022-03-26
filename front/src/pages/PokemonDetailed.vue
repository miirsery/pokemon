<template>
  <div class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <div class="pokemon-detailed__img">
        <img :src="img" :alt="name" />
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
      type: Number,
      required: true,
    },
  },
  setup() {
    const pokemon = {
      id: 37,
      name: 'Pokemon',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png',
    }

    const currentPokemon = {
      pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.img,
      },
    }

    let oldPokemonList = JSON.parse(localStorage.getItem('pokemon'))

    onMounted(() => {
      if (oldPokemonList) {
        oldPokemonList[`pokemon-${pokemon.id}`] = currentPokemon.pokemon
        localStorage.setItem('pokemon', JSON.stringify(oldPokemonList))

        if (Object.keys(oldPokemonList).length >= 6) {
          let newList = Object.values(oldPokemonList)
          newList.shift()
          localStorage.setItem(`pokemon`, JSON.stringify(newList))
        }
      } else {
        currentPokemon[`pokemon-${pokemon.id}`] = currentPokemon.pokemon
        delete currentPokemon['pokemon']
        localStorage.setItem(`pokemon`, JSON.stringify(currentPokemon))
      }
    })
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
