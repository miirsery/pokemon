<template>
  <div class="pokemon">
    <div class="pokemon__wrapper">
      <router-link
        :to="{
          name: 'PokemonDetailed',
          params: { id },
        }"
        class="catalog__item-read"
      >
        <div class="pokemon__img">
          <img :src="img" :alt="name" />
        </div>
      </router-link>
      <div class="pokemon__info">
        <p class="pokemon__info-id subtitle">{{ id }}</p>
        <p class="pokemon__info-title subtitle">
          {{ name }}
        </p>
        <div class="pokemon__types">
          <p v-for="type in types">
            {{ type }}
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
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.pokemon {
  &__types {
    display: flex;
    align-content: center;

    p {
      margin-right: 0.3rem;
      border-radius: 5px;
      padding: 4px;
      width: 33%;
      font-size: 12px;
      text-align: center;
      color: $color-white;
      background-color: $color-accent;
      transition: background-color 0.2s ease-out;
      cursor: pointer;

      &:hover {
        background-color: #228eb7;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__info {
    padding: 0 0.5rem;
    text-transform: capitalize;

    &-id {
      margin: 0.3rem 0 1rem;
      font-size: 0.9rem;
      color: $color-gray;
    }

    &-title {
      margin-bottom: 0.4rem;
      font-weight: 700;
    }
  }

  &__img {
    border-radius: 10px;
    width: 100%;
    background-color: $color-light-gray;
    transition: filter 0.2s ease-in;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
}
</style>
