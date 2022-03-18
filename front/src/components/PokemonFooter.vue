<template>
  <footer class="footer">
    <div class="footer__wrapper footer__container">
      <ul class="footer__right-menu footer__menu">
        <li class="footer__right-menu-item footer__item">
          <router-link class="footer__item--link" to="/">lorem</router-link>
        </li>
        <li class="footer__right-menu-item footer__item">
          <router-link class="footer__item--link" to="/">lorem</router-link>
        </li>
        <li class="footer__right-menu-item footer__item">
          <router-link class="footer__item--link" to="/">lorem</router-link>
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
  background-color: rgba(0, 0, 0, 0.4);

  &__item {
    margin: 8px 0;
  }

  &__item--link {
    text-decoration: none;
    color: #fff;
  }
}
</style>
