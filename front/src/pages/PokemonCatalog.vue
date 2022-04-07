<template>
  <div class="pokemon-catalog">
    <div class="pokemon-catalog__container pokemon-catalog__wrapper">
      <div class="pokemon-catalog__top">
        <h2 class="pokemon-catalog__title heading-title">Каталог покемонов</h2>
      </div>
      <div class="pokemon-catalog__content">
        <div class="pokemon-catalog__items">
          <div
            class="pokemon-catalog__item"
            v-for="pokemon in pokemons[0].pokemonList"
            :key="pokemon.name"
          >
            <pokemon-card
              :name="pokemon.name"
              :id="pokemon.id"
              :img="pokemon.image"
              :types="pokemon.types"
              class="pokemon-catalog__pokemon"
            />
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        small
        background
        layout="prev, pager, next"
        :total="pokemons[0].meta.totalPages * 10"
        @sise-change="handleSizeChange"
        @current-change="handleChangeCurrentPage"
        class="pokemon-catalog__pagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'

export default defineComponent({
  name: 'PokemonCatalog',
  components: {
    PokemonCard,
  },
  setup() {
    type MetaType = {
      totalPages: number
      currentPage: number
    }
    type PokemonList = {
      id: number
      name: string
      image: string
      url: string
      types: string[]
    }

    type Pokemon = {
      meta: MetaType
      pokemonList: PokemonList[]
    }

    const pokemons: Pokemon[] = [
      {
        meta: {
          totalPages: 113,
          currentPage: 3,
        },
        pokemonList: [
          {
            id: 31,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png',
            url: 'https://pokeapi.co/api/v2/pokemon/31/',
            name: 'nidoqueen',
            types: ['poison-point', 'rivalry', 'sheer-force'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png',
            url: 'https://pokeapi.co/api/v2/pokemon/32/',
            id: 32,
            name: 'nidoran-m',
            types: ['poison-point', 'rivalry', 'hustle'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png',
            url: 'https://pokeapi.co/api/v2/pokemon/33/',
            id: 33,
            name: 'nidorino',
            types: ['poison-point', 'rivalry', 'hustle'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png',
            url: 'https://pokeapi.co/api/v2/pokemon/34/',
            id: 34,
            name: 'nidoking',
            types: ['poison-point', 'rivalry', 'sheer-force'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png',
            url: 'https://pokeapi.co/api/v2/pokemon/35/',
            id: 35,
            name: 'clefairy',
            types: ['cute-charm', 'magic-guard', 'friend-guard'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png',
            url: 'https://pokeapi.co/api/v2/pokemon/36/',
            id: 36,
            name: 'clefable',
            types: ['cute-charm', 'magic-guard', 'unaware'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png',
            url: 'https://pokeapi.co/api/v2/pokemon/37/',
            id: 37,
            name: 'vulpix',
            types: ['flash-fire', 'drought'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png',
            url: 'https://pokeapi.co/api/v2/pokemon/38/',
            id: 38,
            name: 'ninetales',
            types: ['flash-fire', 'drought'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png',
            url: 'https://pokeapi.co/api/v2/pokemon/39/',
            id: 39,
            name: 'jigglypuff',
            types: ['cute-charm', 'competitive', 'friend-guard'],
          },
          {
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png',
            url: 'https://pokeapi.co/api/v2/pokemon/40/',
            id: 40,
            name: 'wigglytuff',
            types: ['cute-charm', 'competitive', 'frisk'],
          },
        ],
      },
    ]
    const currentPage = ref(pokemons[0].meta.currentPage)

    const handleSizeChange = (val: number): void => {
      currentPage.value = val
    }

    const handleChangeCurrentPage = (val: number): void => {
      currentPage.value = val
    }
    return {
      pokemons,
      currentPage,
      handleChangeCurrentPage,
      handleSizeChange,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-catalog {
  width: 80%;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    margin: 20px;
    border-radius: 10px;
    padding: 10px;
    width: 20%;
  }

  &__content {
    background-color: $color-background;
  }

  &__pagination {
    margin-bottom: 2rem;
  }
}
</style>
