<template>
  <header class="pokemon-header">
    <div class="pokemon-header__wrapper pokemon-header__container">
      <div class="pokemon-header__logo">
        <router-link to="/" alt="Pokemon">
          <img src="../assets/images/logo.png" alt="Pokemon logo" />
        </router-link>
      </div>
      <div class="pokemon-header__text">Pokedex</div>
      <ul class="pokemon-header__menu">
        <li class="pokemon-header__item">
          <div class="pokemon-header__item-random-pokemon">
            <button
              title="Random pokemon"
              class="pokemon-header__item-profile--img"
            >
              <img
                src="../assets/images/random-pokemon.png"
                alt="random-pokemon"
              />
            </button>
          </div>
        </li>
        <li class="pokemon-header__item">
          <div class="pokemon-header__item--all-pokemon">
            <router-link
              to="/"
              title="Random pokemon"
              class="pokemon-header__item-profile--img"
            >
              <img src="../assets/images/all-pokemon.png" alt="all-pokemon" />
            </router-link>
          </div>
        </li>
        <li class="pokemon-header__item">
          <div class="pokemon-header__item--profile">
            <router-link
              to="/"
              title="Profile"
              class="pokemon-header__item-profile--img"
            >
              <img src="../assets/images/profile.png" alt="profile" />
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.pokemon-header {
  padding: 1rem 0;

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__text {
    font-weight: 300;
    font-size: 36px;
  }

  &__logo {
    width: 48px;
    height: 48px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__menu {
    display: flex;
    align-items: center;
  }

  &__item {
    width: 36px;
    height: 36px;

    &-random-pokemon {
      width: 100%;
      height: 100%;
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
