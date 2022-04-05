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
    const showSidebar = ref(true)
    const handleToggleSidebar = (): void => {
      showSidebar.value = !showSidebar.value
    }
    return {
      handleToggleSidebar,
      showSidebar,
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

.toggle-sidebar-icon {
  position: fixed;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
