<template>
  <div class="pokemon-card">
    <div class="pokemon-card__wrapper">
      <router-link
        :to="{
          name: 'PokemonDetailed',
          params: { id },
        }"
        class="catalog__item-read"
      >
        <div class="pokemon-card__img">
          <img :src="img" :alt="name" />
        </div>
      </router-link>
      <div class="pokemon-card__info">
        <div class="pokemon-card__info-id subtitle">
          <span>№{{ filteredId }}</span>
        </div>
        <p class="pokemon-card__info-title subtitle">
          {{ name }}
        </p>
        <div class="pokemon-card__types">
          <p
            class="pokemon-card__type"
            v-for="type in types"
            :key="type"
            :class="`type-${type}`"
          >
            {{ type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'PokemonCard',
  props: {
    name: String,
    id: Number,
    img: String,
    types: Array,
  },
  setup(props) {
    const filteredId = computed((): string =>
      props.id.toString().padStart(4, '0')
    )
    return { filteredId }
  },
})
</script>

<style scoped lang="scss">
.pokemon-card {
  &__types {
    display: flex;
    align-content: center;
  }

  &__type {
    margin-right: 0.3rem;
    border-radius: 5px;
    padding: 4px;
    width: 33%;
    font-size: 12px;
    text-align: center;
    transition: background-color 0.2s ease-out;
    cursor: pointer;

    &:hover {
      background-color: #228eb7;
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
      margin-bottom: 0.5rem;
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
