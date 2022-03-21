<template>
  <div class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <div class="pokemon-detailed__img">
        <img :src="img" :alt="name" />
      </div>
      <div class="pokemon-detailed-info">
        <h2 class="pokemon-detailed__title subtitle">
          {{ name }}
          <span>{{ id }}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'pokemonDetailed',
  props: ['id'],
})
</script>

<style scoped lang="scss">
.pokemon-detailed {
  &__wrapper {
    display: flex;
    width: 100%;
  }

  &__img {
    max-width: 300px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
