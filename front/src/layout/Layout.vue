<template>
  <div class="content">
    <pokemon-header />
    <div class="content__wrapper">
      <router-view />
      <pokemon-sidebar />
    </div>
  </div>
  <pokemon-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
})
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  min-height: 160vh;

  &__wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
