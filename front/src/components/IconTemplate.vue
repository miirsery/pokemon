<template>
  <svg
    class="app-icon"
    :class="[iconClass, newClass]"
    :width="width"
    :height="height"
    aria-hidden="true"
  >
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="href" />
  </svg>
</template>

<script>
import { computed, reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
  name: 'IconTemplate',
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 14,
    },
    height: {
      type: [Number, String],
      default: 14,
    },
    newClass: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const data = reactive({
      href: computed(() => `#${props.name}`),
      iconClass: computed(() => `app-icon--${props.name}`),
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss" scoped>
.app-icon {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
}
</style>
