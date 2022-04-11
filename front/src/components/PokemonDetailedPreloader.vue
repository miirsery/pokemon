<template>
  <el-skeleton class="pokemon-detailed-preloader__skeleton">
    <template #template>
      <div class="pokemon-detailed-preloader__skeleton-wrapper">
        <el-skeleton-item
          variant="p"
          class="pokemon-detailed-preloader__name"
        />
        <div class="pokemon-detailed-preloader__content">
          <div class="pokemon-detailed-preloader__left">
            <el-skeleton-item
              class="pokemon-detailed-preloader__image"
              variant="image"
            />
          </div>
          <div class="pokemon-detailed-preloader__right">
            <div class="pokemon-detailed-preloader__right-column">
              <el-skeleton-item
                class="pokemon-detailed-preloader__right-item"
                variant="p"
              />
              <el-skeleton-item
                class="pokemon-detailed-preloader__right-item"
                variant="p"
              />
              <el-skeleton-item
                class="pokemon-detailed-preloader__right-item"
                variant="p"
              />
            </div>
            <div class="pokemon-detailed-preloader__right-column">
              <el-skeleton-item
                class="pokemon-detailed-preloader__right-item"
                variant="p"
              />
              <el-skeleton-item
                class="pokemon-detailed-preloader__right-item"
                variant="p"
              />
              <el-skeleton-item
                class="pokemon-detailed-preloader__right-item"
                variant="p"
              />
            </div>
          </div>
        </div>
        <div class="pokemon-detailed-preloader__stats">
          <el-skeleton-item
            variant="p"
            class="pokemon-detailed-preloader__stats-item"
            v-for="stat in 6"
            :key="stat"
          />
        </div>
        <div class="pokemon-detailed-preloader__evolution">
          <el-skeleton-item
            class="pokemon-detailed-preloader__evolution-circle"
            variant="circle"
          />
          <el-skeleton-item
            class="pokemon-detailed-preloader__evolution-circle"
            variant="circle"
          />
          <el-skeleton-item
            class="pokemon-detailed-preloader__evolution-circle"
            variant="circle"
          />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<style lang="scss" scoped>
.pokemon-detailed-preloader {
  &__skeleton {
    min-height: 100vh;

    &-wrapper {
      margin-left: 16rem;
    }
  }

  &__name {
    position: relative;
    left: 50%;
    margin: 2rem auto;
    width: 300px;
    height: 2rem;
    transform: translateX(-50%);
  }

  &__image {
    width: 340px;
    height: 440px;
  }

  &__content {
    display: flex;
  }

  &__left {
    margin-right: 4rem;
  }

  &__right {
    display: flex;
    max-width: 40%;

    &-column {
      display: flex;
      flex-direction: column;
      margin-right: 3rem;
    }

    &-item {
      margin-bottom: 0.5rem;
      width: 250px;
      height: 20px;
    }
  }

  &__stats {
    display: flex;
    margin-top: 2rem;
    width: 40%;

    &-item {
      margin-right: 0.5rem;
      width: 50px;
      height: 100px;
    }
  }

  &__evolution {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3rem auto;
    width: 50%;

    &-circle {
      margin-right: 2rem;
      width: 140px;
      height: 140px;
    }
  }
}
</style>
