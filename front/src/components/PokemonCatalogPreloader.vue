<template>
  <div class="pokemon-catalog-preloader">
    <el-skeleton class="pokemon-catalog-preloader__skeleton">
      <template #template>
        <div
          class="pokemon-catalog-preloader__skeleton-wrapper"
          v-for="item in 10"
          :key="item"
        >
          <el-skeleton-item
            class="pokemon-catalog-preloader__image"
            variant="image"
          />
          <el-skeleton-item class="pokemon-catalog-preloader__id" variant="p" />
          <div>
            <el-skeleton-item
              class="pokemon-catalog-preloader__name"
              variant="p"
            />
            <div class="pokemon-catalog-preloader__text">
              <el-skeleton-item
                class="pokemon-catalog-preloader__text-item"
                variant="text"
              />
              <el-skeleton-item
                class="pokemon-catalog-preloader__text-item"
                variant="text"
              />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<style lang="scss" scoped>
.pokemon-catalog-preloader {
  height: 140vh;

  &__skeleton {
    position: absolute;
    left: 7%;
    top: 12%;
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    gap: 65px;

    &-wrapper {
      height: 280px;
    }
  }

  &__image {
    margin-bottom: 0.5rem;
    width: 200px;
    height: 200px;
  }

  &__id {
    margin-bottom: 1.2rem;
    width: 20%;
  }

  &__name {
    margin-bottom: 1rem;
    width: 60%;
  }

  &__text {
    display: flex;
    width: 50%;

    &-item {
      margin-right: 2rem;
      width: 77%;
    }
  }
}
</style>
