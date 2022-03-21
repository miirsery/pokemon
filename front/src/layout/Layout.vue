<template>
  <div class="content">
    <pokemon-header />
    <router-view />
  </div>
  <pokemon-footer />
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import PokemonHeader from '@/components/PokemonHeader.vue'
import PokemonFooter from '@/components/PokemonFooter.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    PokemonHeader,
    PokemonFooter,
  },
  setup() {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
