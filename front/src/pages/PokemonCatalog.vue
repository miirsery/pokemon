<template>
  <pokemon-catalog-preloader v-if="isLoading" />
  <div v-else class="pokemon-catalog">
    <div class="pokemon-catalog__container pokemon-catalog__wrapper">
      <div class="pokemon-catalog__top">
        <h2 class="pokemon-catalog__title heading-title">Каталог покемонов</h2>
      </div>
      <div class="pokemon-catalog__content">
        <div class="pokemon-catalog__items">
          <div
            class="pokemon-catalog__item"
            v-for="pokemon in pokemonList.values"
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
        :total="totalPages * limit"
        @current-change="handleChangeCurrentPage"
        class="pokemon-catalog__pagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  defineAsyncComponent,
} from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { pokemonAPI } from '@/api/pokemon.api'

export default defineComponent({
  name: 'PokemonCatalog',
  components: {
    PokemonCard,
    PokemonCatalogPreloader: defineAsyncComponent(
      () => import('@/components/PokemonCatalogPreloader.vue')
    ),
  },
  setup() {
    type PokemonListType = {
      values: [
        {
          abilities: string[]
          id: number
          image: string
          name: string
          url: string
        }
      ]
    }

    const currentPage = ref<Number>()
    const totalPages = ref<Number>()
    const isLoading = ref(true)

    const limit = 10
    let offset = 0

    const pokemonList = reactive<{ values: PokemonListType[] }>({
      values: [],
    })

    const getPokemonList = async (): Promise<void> => {
      const [, pokemonListData] = await pokemonAPI.getPokemonList(offset, limit)

      pokemonList.values = pokemonListData.pokemonList
      totalPages.value = pokemonListData.meta.totalPages
      isLoading.value = false
    }

    const scrollToTop = (): void => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    const handleChangeCurrentPage = (val: number): void => {
      offset = limit * val - limit
      currentPage.value = val
      pokemonList.values = []
      isLoading.value = true

      getPokemonList()
      scrollToTop()
    }

    onMounted(() => {
      getPokemonList()
    })

    return {
      currentPage,
      totalPages,
      isLoading,
      limit,
      pokemonList,
      handleChangeCurrentPage,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-catalog {
  width: 1300px;
  min-height: 100vh;

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
    min-height: 100vh;
  }

  &__pagination {
    margin: 2rem auto;
    max-width: 25%;
  }
}
</style>
