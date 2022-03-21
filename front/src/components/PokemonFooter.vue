<template>
  <footer class="footer">
    <div class="footer__wrapper footer__container">
      <ul class="footer__right-menu footer__menu">
        <li class="footer__right-menu-item footer__item">
          <router-link class="footer__item--link" to="/">О нас</router-link>
        </li>
        <li class="footer__right-menu-item footer__item">
          <router-link class="footer__item--link" to="/">
            Все покемоны
          </router-link>
        </li>
        <li class="footer__right-menu-item footer__item">
          <router-link class="footer__item--link" to="/">FAQ</router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.footer {
  padding: 12px 0;
  background-color: rgba(0, 0, 0, 0.4);

  &__item {
    margin: 8px 0;
  }

  &__item--link {
    text-decoration: none;
    color: #dedede;

    &:hover {
      color: #eaeaea;
    }
  }
}
</style>
