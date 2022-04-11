<template>
  <transition name="pokemon-detailed-ability">
    <div class="pokemon-detailed-ability">
      <div class="pokemon-detailed-ability__top">
        <h3 class="pokemon-detailed-ability__title">Ability info</h3>
        <div
          class="pokemon-detailed-ability__close"
          @click="handleCloseDetailedAbility"
        >
          <i class="pokemon-detailed-ability__close-icon">X</i>
          <span class="pokemon-detailed-ability__close-text">Close</span>
        </div>
      </div>
      <p class="pokemon-detailed-ability__text">
        {{ description }}
      </p>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'

export default defineComponent({
  name: 'PokemonDetailedAbility',
  emits: ['close'],
  props: {
    name: String,
  },

  setup(props, { emit }) {
    const description = ref('')

    const handleCloseDetailedAbility = (): void => {
      emit('close')
    }

    const getDescriptionOfAbility = async (): Promise<void> => {
      const [_, descriptionData] = await pokemonAPI.getDescriptionOfAbility(
        props.name
      )
      description.value = descriptionData.description
    }

    onMounted((): void => {
      getDescriptionOfAbility()
    })

    return {
      handleCloseDetailedAbility,
      description,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-detailed-ability {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 10px;
  padding: 15px;
  width: 60%;
  min-height: 171px;
  background-color: $color-before-dark-gray;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    margin-bottom: 1rem;
    font-weight: 300;
    font-size: 0.9rem;
    color: $color-light-gray;
  }

  &__text {
    color: $color-white;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    margin-top: -10px;
    margin-right: -10px;
    border-top-right-radius: 10px;
    padding: 10px 14px;
    font-weight: 700;
    font-size: 0.9rem;
    color: $color-white;
    background: $color-black;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 18px;
      height: 18px;
      background: center/ cover no-repeat
        url('../assets/images/cut-corner-ability.png');
    }

    &-icon {
      margin-left: 0.5rem;
    }

    &-text {
      display: inline-block;
      margin-left: 0.5rem;
    }
  }
}
</style>
