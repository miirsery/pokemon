<template>
  <header class="pokemon-header">
    <div class="pokemon-header__wrapper pokemon-header__container">
      <div class="pokemon-header__logo">
        <router-link to="/" alt="Pokemon">
          <icon-template width="40" height="40" name="logo" />
        </router-link>
      </div>
      <div class="pokemon-header__text">Pokedex</div>
      <ul class="pokemon-header__menu">
        <li class="pokemon-header__item">
          <div class="pokemon-header__item-random-pokemon">
            <button
              title="Random pokemon"
              class="pokemon-header__item-profile-img"
            >
              <icon-template width="36" height="36" name="pokemon-random" />
            </button>
          </div>
        </li>
        <li class="pokemon-header__item">
          <div class="pokemon-header__item-all-pokemon">
            <router-link
              to="/"
              title="All pokemon"
              class="pokemon-header__item-profile-img"
            >
              <icon-template width="36" height="36" name="all-pokemon" />
            </router-link>
          </div>
        </li>
        <li class="pokemon-header__item">
          <div class="pokemon-header__item-profile">
            <router-link
              to="/"
              title="Profile"
              class="pokemon-header__item-profile-img"
            >
              <icon-template width="36" height="36" name="profile" />
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
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 1rem 1.5rem;
    height: 70px;
    background: center/ cover no-repeat url('../assets/images/header-bg.png');
  }

  &__text {
    margin-top: 1rem;
    margin-left: 3rem;
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
