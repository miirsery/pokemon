<template>
  <aside class="pokemon-sidebar">
    <h3 class="pokemon-sidebar__title subtitle" @click="getPokemonList">
      Последнее просмотренное
    </h3>
    <div class="pokemon-sidebar__wrapper">
      <div class="pokemon-sidebar__top">
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
        >
          <div class="pokemon-sidebar__item-img">
            <img :src="pokemon.image" :alt="pokemon.name" />
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
import { defineComponent, ref, onMounted, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
export default defineComponent({
  props: {
    isUpdated: Boolean,
  },
  emits: ['updateValue', 'getPokemon'],
  setup(props, { emit }) {
    type PokemonType = {
      pokemon: {
        id: number
        name: string
        img: string
      }
    }
    let pokemonList: any = {}
    let pokemonListValues = ref<PokemonType[]>()

    const getPokemonList = async () => {
      pokemonList = JSON.parse(localStorage.getItem('pokemon-list'))
      pokemonListValues.value = pokemonList
      await emit('updateValue', false)
    }

    watch(
      () => props.isUpdated,
      (val, _) => {
        if (val) {
          getPokemonList()
        }
      }
    )

    getPokemonList()

    if (pokemonList) {
      pokemonListValues.value = pokemonList
    }

    const handleClearPokemonList = (): void => {
      localStorage.removeItem('pokemon-list')
      pokemonListValues.value = []
    }
    onMounted(() => {
      emit('updateValue', false)
    })
    return {
      pokemonListValues,
      pokemonList,
      getPokemonList,
      handleClearPokemonList,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-sidebar {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    width: 300px;
    height: 600px;

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
    margin: 1rem 0;
    font-weight: 700;
    cursor: pointer;
  }

  &__top {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-bottom: 1px solid $color-accent;
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
