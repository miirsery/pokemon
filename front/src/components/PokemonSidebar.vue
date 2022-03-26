<template>
  <aside class="pokemon-sidebar" @click="$emit('close')">
    <div class="pokemon-sidebar__wrapper" @click.stop>
      <div class="pokemon-sidebar__top">
        <button @click="$emit('close')">X</button>
        <h3 class="pokemon-sidebar__title">Последнее просмотренное</h3>
      </div>
      <ul class="pokemon-sidebar__menu">
        <router-link
          class="pokemon-sidebar__item"
          v-for="pokemon in filteredListValues"
          :key="pokemon.name"
          :to="{ name: 'PokemonDetailed', params: { id: pokemon.id } }"
          @click="this.$emit('close')"
        >
          <div class="pokemon-sidebar__item-img">
            <img :src="pokemon.img" :alt="pokemon.name" />
          </div>
          <div class="pokemon__info">
            <p class="pokemon__info-id subtitle">№{{ pokemon.id }}</p>
            <p class="pokemon__info-title subtitle">{{ pokemon.name }}</p>
          </div>
        </router-link>
      </ul>
      <button class="pokemon-sidebar__clear" @click="clearPokemonList">
        Отчистить
      </button>
    </div>
  </aside>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    type PokemonType = {
      pokemon: {
        id: number
        name: string
        img: string
      }
    }
    let pokemonList = JSON.parse(localStorage.getItem('pokemon'))
    let pokemonListValues = ref<PokemonType[]>([])
    let filteredListValues = ref<PokemonType[]>([])
    if (pokemonList) {
      pokemonListValues.value = pokemonList
      filteredListValues.value = Object.values(
        pokemonListValues.value
      ).reverse()
    }
    const clearPokemonList = () => {
      localStorage.removeItem('pokemon')
      filteredListValues.value.length = 0
    }
    return {
      clearPokemonList,
      filteredListValues,
    }
  },
})
</script>

<style scoped lang="scss">
button {
  font-size: 18px;
}

.pokemon-sidebar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  &__wrapper {
    position: fixed;
    right: 10%;
    top: 50%;
    z-index: 120;
    overflow: auto;
    border-radius: 10px;
    width: 350px;
    max-height: 650px;
    background-color: rgba(210, 206, 206, 0.98);
    transform: translateY(-50%);
    transition: scrollbar-color 0.3s ease-out;

    &::-webkit-scrollbar-thumb {
      border: 5px solid #8278ee;
      border-radius: 100px;
      background-clip: content-box;
      background-color: #8070d4;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #8278ee;
    }

    &::-webkit-scrollbar {
      width: 0.5em;
    }

    &::-webkit-scrollbar-track {
      margin: 0.5rem 1rem;
      border-radius: 100px;
      padding: 5px 0;
      background-color: #e4e4e4;
    }

    &:hover {
      scrollbar-color: #aca3f8;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  &__item {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid #fff;
    padding: 15px;
    color: $color-dark-gray;

    &-img {
      margin-right: 2rem;
      width: 140px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:last-child {
      margin-bottom: 2rem;
    }
  }

  &__clear {
    position: absolute;
    right: 10px;
    bottom: 5px;
  }
}

.pokemon {
  &__info {
    &-id {
      font-weight: 300;
      font-size: 1rem;
      color: $color-dark-gray;
    }
  }
}
</style>
