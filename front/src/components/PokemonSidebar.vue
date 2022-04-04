<template>
  <aside class="pokemon-sidebar" @click="handleClose">
    <div class="pokemon-sidebar__wrapper" @click.stop>
      <h3 class="pokemon-sidebar__title">Последнее просмотренное</h3>
      <div class="pokemon-sidebar__top">
        <button class="pokemon-sidebar__close" @click="handleClose">X</button>
        <button class="pokemon-sidebar__clear" @click="handleClearPokemonList">
          Отчистить список
        </button>
      </div>
      <ul class="pokemon-sidebar__menu">
        <router-link
          class="pokemon-sidebar__item"
          v-for="pokemon in pokemonListValues"
          :key="pokemon.name"
          :to="{ name: 'PokemonDetailed', params: { id: pokemon.id } }"
          @click="handleClose"
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
    </div>
  </aside>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['close'],
  setup(props, { emit }) {
    type PokemonType = {
      pokemon: {
        id: number
        name: string
        img: string
      }
    }

    const pokemonList: PokemonType[] = JSON.parse(
      localStorage.getItem('pokemon-list')
    )

    const pokemonListValues = ref<PokemonType[]>(pokemonList)
    if (pokemonList) {
      pokemonListValues.value = pokemonList
    }

    const handleClose = (): void => {
      emit('close')
    }

    const handleClearPokemonList = (): void => {
      localStorage.removeItem('pokemon-list')
      pokemonListValues.value = []
    }

    return {
      pokemonListValues,
      pokemonList,
      handleClearPokemonList,
      handleClose,
    }
  },
})
</script>

<style scoped lang="scss">
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
  }

  &__title {
    margin: 1rem 0.5rem 0.5rem;
    font-weight: 700;
    font-size: 18px;
  }

  &__top {
    position: relative;
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
    top: 50%;
    font-size: 0.9rem;
    transform: translateY(-50%);
  }

  &__close {
    font-size: 1.1rem;
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
