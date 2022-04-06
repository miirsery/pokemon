<template>
  <div class="pokemon-detailed-ability">
    <div
      class="pokemon-detailed-ability__close"
      @click="handleCloseDetailedAbility"
    >
      X
    </div>
    <p class="pokemon-detailed-ability__text">
      {{ description }}
    </p>
  </div>
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
    const handleCloseDetailedAbility = (): void => {
      emit('close')
    }
    const description = ref('')
    const getDescriptionOfAbility = async () => {
      const [_, descriptionData] = await pokemonAPI.getDescriptionOfAbility(
        props.name
      )
      description.value = descriptionData.description
    }
    onMounted(() => {
      getDescriptionOfAbility()
    })
    console.log(description)
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
  height: 171px;
  background-color: $color-dark-gray;

  &__text {
    color: $color-white;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-weight: 700;
    font-size: 1.1rem;
    color: $color-white;
    cursor: pointer;
  }
}
</style>
