<template>
  <div class="catalog">
    <div class="catalog__container catalog__wrapper">
      <h2 class="catalog__title heading-title">Каталог покемонов</h2>
      <div class="catalog__content">
        <div class="catalog__items" ref="pokemons">
          <div
            class="catalog__item"
            v-for="pokemon in pokemonList"
            :key="pokemon.name"
          >
            <pokemon
              :name="pokemon.name"
              :id="pokemon.id"
              :img="pokemon.img"
              :types="pokemon.types"
              class="catalog__pokemon"
            />
          </div>
        </div>
      </div>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="50"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Pokemon from '@/components/Pokemon.vue'

export default defineComponent({
  name: 'pokemonCatalog',
  components: {
    Pokemon,
  },
  setup() {
    type typesType = {
      [index: string]: string
    }
    interface IPokemon {
      name: string
      id: number | string
      img: string
      types: typesType[]
    }
    const pokemonList = [
      {
        name: 'Bulba',
        id: 0o01,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        types: [
          {
            name: 'Grass',
          },
          {
            name: 'Poison',
          },
        ],
      },
      {
        name: 'ivysaur',
        id: 2,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'Something',
          },
        ],
      },
      {
        name: 'venusaur',
        id: 3,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'chlorophyll',
          },
        ],
      },
      {
        name: 'Bulba',
        id: 4,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        types: [
          {
            name: 'Grass',
          },
          {
            name: 'Poison',
          },
        ],
      },
      {
        name: 'ivysaur',
        id: 5,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'Something',
          },
        ],
      },
      {
        name: 'venusaur',
        id: 6,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'chlorophyll',
          },
        ],
      },
      {
        name: 'Bulba',
        id: 7,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        types: [
          {
            name: 'Grass',
          },
          {
            name: 'Poison',
          },
        ],
      },
      {
        name: 'ivysaur',
        id: 8,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'Something',
          },
        ],
      },
      {
        name: 'venusaur',
        id: 110,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'chlorophyll',
          },
        ],
      },
      {
        name: 'Bulba',
        id: 110,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png',
        types: [
          {
            name: 'Grass',
          },
          {
            name: 'Poison',
          },
        ],
      },
      {
        name: 'ivysaur',
        id: 10,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'Something',
          },
        ],
      },
      {
        name: 'venusaur',
        id: 11,
        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png',
        types: [
          {
            name: 'Overgrow',
          },
          {
            name: 'chlorophyll',
          },
        ],
      },
    ]
    return {
      pokemonList,
    }
  },
})
</script>

<style scoped lang="scss">
.catalog {
  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    max-width: 45%;
    gap: 30px;
  }

  &__content {
    background-color: #fff;
  }
}
</style>
