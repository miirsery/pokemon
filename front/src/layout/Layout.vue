<template>
  <div class="content">
    <pokemon-header />
    <div class="content__wrapper">
      <router-view @update="updateLocalStorage" />
      <pokemon-sidebar
        @updateValue="updateLocalStorage"
        :isUpdated="isUpdated"
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
    let isUpdated = ref(false)

    const updateLocalStorage = (value) => {
      isUpdated.value = value
    }

    return {
      updateLocalStorage,
      isUpdated,
    }
  },
})
</script>

<style lang="scss" scoped>
.content {
  position: relative;

  &__wrapper {
    display: flex;
  }
}
</style>
