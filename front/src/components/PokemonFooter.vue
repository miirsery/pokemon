<template>
  <footer class="pokemon-footer">
    <div class="pokemon-footer__wrapper pokemon-footer__container">
      <div class="pokemon-footer__menu">
        <ul class="pokemon-footer__left-menu pokemon-footer__menu">
          <li class="pokemon-footer__right-menu-item pokemon-footer__item">
            <router-link class="pokemon-footer__item-link" to="/">
              О нас
            </router-link>
          </li>
          <li class="pokemon-footer__right-menu-item pokemon-footer__item">
            <router-link class="pokemon-footer__item-link" to="/">
              Все покемоны
            </router-link>
          </li>
          <li class="pokemon-footer__right-menu-item pokemon-footer__item">
            <router-link class="pokemon-footer__item-link" to="/">
              FAQ
            </router-link>
          </li>
        </ul>
        <ul class="pokemon-footer__right-menu pokemon-footer__menu">
          <li class="pokemon-footer__right-menu-item pokemon-footer__item">
            <router-link class="pokemon-footer__item-link" to="/">
              Мы находимся здесь
            </router-link>
          </li>
          <li class="pokemon-footer__right-menu-item pokemon-footer__item">
            <router-link class="pokemon-footer__item-link" to="/">
              Смотреть сериал
            </router-link>
          </li>
        </ul>
      </div>
      <div class="pokemon-footer__socials">
        <icon-template
          class="pokemon-footer__socials-item"
          name="vk"
          width="28"
          height="28"
        />
        <icon-template
          class="pokemon-footer__socials-item"
          name="instagram"
          width="28"
          height="28"
        />
        <icon-template
          class="pokemon-footer__socials-item"
          name="telegram"
          width="28"
          height="28"
        />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {}
</script>

<style scoped lang="scss">
.pokemon-footer {
  padding: 12px 0;
  background-color: rgba(0, 0, 0, 0.4);

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__menu {
    display: flex;
  }

  &__left-menu {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
  }

  &__right-menu {
    display: flex;
    flex-direction: column;
  }

  &__item {
    margin: 8px 0;
  }

  &__item-link {
    text-decoration: none;
    color: #dedede;

    &:hover {
      color: #eaeaea;
    }
  }

  &__socials-item {
    margin-right: 2rem;
  }
}
</style>
