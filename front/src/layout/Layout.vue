<template>
  <div class="content">
    <pokemon-header />
    <router-view />
  </div>
  <pokemon-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PokemonHeader from '@/components/PokemonHeader.vue'
import PokemonFooter from '@/components/PokemonFooter.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    PokemonHeader,
    PokemonFooter,
  },
})
</script>

<style lang="scss" scoped>
</style>
