<template>
  <div class="content">
    <pokemon-header />
    <div class="content__wrapper">
      <router-view @update="updateLocalStorage" />
      <pokemon-sidebar
        @update-value="updateLocalStorage"
        @get-pokemon="getPokemonList"
        :is-updated="isUpdated"
      />
    </div>
  </div>
  <pokemon-footer />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PokemonHeader from '@/components/PokemonHeader.vue'
import PokemonFooter from '@/components/PokemonFooter.vue'
import PokemonSidebar from '@/components/PokemonSidebar.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    PokemonHeader,
    PokemonFooter,
    PokemonSidebar,
  },
  setup() {
    const isUpdated = ref(false)
    const isGetPokemon = ref(false)

    const updateLocalStorage = (value): void => {
      isUpdated.value = value
    }

    const getPokemonList = (value): void => {
      isGetPokemon.value = value
    }

    return {
      updateLocalStorage,
      isUpdated,
      getPokemonList,
    }
  },
})
</script>

<style lang="scss" scoped>
.content {
  position: relative;

  &__wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
