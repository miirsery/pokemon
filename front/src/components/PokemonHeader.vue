<template>
  <header class="header">
    <div class="header__wrapper header__container">
      <div class="header__logo">
        <router-link to="/" alt="Pokemon">
          <img src="../assets/images/logo.png" alt="Pokemon logo" />
        </router-link>
      </div>
      <ul class="header__menu">
        <li class="header__item">
          <div class="header__item-profile">
            <router-link
              to="/"
              title="Profile"
              class="header__item-profile--img"
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
.header {
  padding: 1rem 0;

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    width: 48px;
    height: 48px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__item {
    &-profile {
      width: 36px;
      height: 36px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
