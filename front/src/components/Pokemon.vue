<template>
  <div class="pokemon">
    <div class="pokemon__wrapper">
      <router-link
        :to="{
          name: 'pokemonDetailed',
          params: { id, img, name, types },
        }"
        class="catalog__item-read"
      >
        <div class="pokemon__img">
          <img :src="img" :alt="name" />
        </div>
      </router-link>
      <div class="pokemon__info">
        <p class="pokemon__info-title subtitle">
          {{ name }}
          <span>#00{{ id }}</span>
        </p>
        <div class="pokemon__abilities">
          <p v-for="ability in types">
            {{ ability.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Pokemon',
  props: {
    name: String,
    id: Number,
    img: String,
    types: Array,
  },
})
</script>

<style scoped lang="scss">
.pokemon {
  &__abilities {
    display: flex;
    align-content: center;

    p {
      padding: 8px 12px;
      color: #fff;
      background-color: #247201;

      &:first-child {
        margin-right: 1rem;
      }
    }
  }

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
