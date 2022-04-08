<template>
  <div class="pokemon-empty-image">
    <p class="pokemon-empty-image__text" :style="{ fontSize: fontSize }">
      Image not found.
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
export default defineComponent({
  props: {
    fontSize: {
      type: [Number, String],
      default: 18,
    },
  },
  setup(props) {
    const data = reactive({
      fontSize: computed(() => `${props.fontSize}px`),
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
<style lang="scss" scoped>
.pokemon-empty-image {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: $color-dark-gray;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 48%;
    width: 101%;
    height: 8px;
    background-color: #fff;
    transform: rotate(135deg) scale(0.5);
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 48%;
    width: 101%;
    height: 8px;
    background-color: #fff;
    transform: rotate(-135deg) scale(0.5);
  }

  &__text {
    position: absolute;
    bottom: 1rem;
    font-weight: 700;
    color: $color-white;
  }
}
</style>
