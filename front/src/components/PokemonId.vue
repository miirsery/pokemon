<template>
  <span class="pokemon-id">№{{ filteredId }}</span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'PokemonId',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const filteredId = computed(() => props.id.toString().padStart(4, '0'))
    return {
      filteredId,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-id {
  color: $color-gray;
}
</style>
