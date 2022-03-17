<template>
  <div class="pokemon">
    <div class="pokemon__wrapper">
      <router-link
        :to="{ name: 'pokemonDetailed', params: { id: 1 } }"
        class="catalog__item-read"
      >
        <div class="pokemon__img">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            alt="pokemon"
          />
        </div>
      </router-link>
      <div class="pokemon__info">
        <p class="pokemon__info-title subtitle">
          Pikachu
          <span>#001</span>
        </p>
        <p class="pokemon__info-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          debitis, ea eius fuga maiores nemo ut. A alias cupiditate doloribus
          ipsum laborum minus mollitia voluptatem! Dolorum laborum quia repellat
          reprehenderit.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pokemon',
})
</script>

<style scoped lang="scss">
.pokemon {
  &__wrapper {
    display: flex;
    width: 100%;
  }

  &__info {
    max-width: 60%;
  }

  &__img {
    max-width: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
