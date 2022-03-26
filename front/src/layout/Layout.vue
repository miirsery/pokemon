<template>
  <div class="content">
    <pokemon-header />
    <div class="toggle-sidebar-icon" @click="toggleSidebar">
      <transition name="animation-pokemon-sidebar">
        <icon-template name="arrow-left" width="48" height="48" />
      </transition>
    </div>
    <pokemon-sidebar @close="toggleSidebar" v-if="showSidebar" />
    <router-view />
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
  setup() {
    const showSidebar = ref(false)
    const toggleSidebar = () => (showSidebar.value = !showSidebar.value)
    return {
      toggleSidebar,
      showSidebar,
    }
  },
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
}

.toggle-sidebar-icon {
  position: fixed;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
