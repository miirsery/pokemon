<template>
  <div class="catalog">
    <div class="catalog__container catalog__wrapper">
      <h2 class="catalog__title heading-title">Каталог покемонов</h2>
      <div class="catalog__content">
        <div class="catalog__items" ref="pokemons">
          <div class="catalog__item">
            <pokemon class="catalog__pokemon" />
          </div>
          <div class="catalog__item">
            <pokemon class="catalog__pokemon" />
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
    return {}
  },
})
</script>

<style scoped lang="scss">
.catalog {
  &__content {
    background-color: #fff;
  }
}
</style>
