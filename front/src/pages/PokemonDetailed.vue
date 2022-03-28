<template>
  <div class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <h2 class="pokemon-detailed__title subtitle">
        wigglytuff
        <span>№0040</span>
      </h2>
      <div class="pokemon-detailed__content">
        <div class="pokemon-detailed__content-main">
          <div class="pokemon-detailed__img">
            <img :src="pokemon.url" :alt="name" />
          </div>
          <div class="pokemon-detailed__content-right">
            <div class="pokemon-detailed__pokemon-info">
              <div class="pokemon-detailed__pokemon-info__right">
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-detailed__info-item__title">Height</h4>
                  <p class="pokemon-detailed__info-item--value">0.5m</p>
                </div>
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-detailed__info-item__title">Height</h4>
                  <p class="pokemon-detailed__info-item__value">0.5m</p>
                </div>
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-detailed__info-item__title">Gender</h4>
                  <div class="pokemon-detailed__info-item__value">
                    <span>
                      <icon-template
                        width="24"
                        height="24"
                        name="male-gender"
                      />
                    </span>
                    <span>
                      <icon-template
                        width="24"
                        height="24"
                        name="female-gender"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div class="pokemon-detailed__pokemon-info__left">
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-detailed__info-item__title">Category</h4>
                  <p class="pokemon-detailed__info-item__value">Baloon</p>
                </div>
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-detailed__info-item__title">Height</h4>
                  <p class="pokemon-detailed__info-item__value">0.5m</p>
                </div>
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-detailed__info-item__title">Abilities</h4>
                  <p class="pokemon-detailed__info-item__value">Cute Charm</p>
                  <p class="pokemon-detailed__info-item__value">Competitive</p>
                </div>
              </div>
            </div>
            <div class="pokemon-detailed__pokemon-elements">
              <p class="pokemon-detailed__pokemon-elements__title subtitle">
                Type
              </p>
              <div class="pokemon-detailed__pokemon-elements__actions">
                <button class="pokemon-detailed__pokemon-elements__type">
                  Normal
                </button>
                <button class="pokemon-detailed__pokemon-elements__type">
                  Fairy
                </button>
              </div>
              <p class="pokemon-detailed__pokemon-elements__title subtitle">
                Weakness
              </p>
              <div class="pokemon-detailed__pokemon-elements__actions">
                <button class="pokemon-detailed__pokemon-elements__type">
                  Steel
                </button>
                <button class="pokemon-detailed__pokemon-elements__type">
                  Poison
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pokemon-detailed__stats">
          <h3 class="pokemon-detailed__stats-title">Статистика</h3>
          <ul class="pokemon-detailed__stats-menu">
            <li
              class="pokemon-detailed__stats-item"
              v-for="(item, index) in 6"
              :key="index"
            >
              <ul class="pokemon-detailed__stats-gauge">
                <li class="pokemon-detailed__stats-gauge__meter"></li>
                <li
                  class="pokemon-detailed__stats-gauge__item"
                  v-for="(li_item, li_index) in 15"
                  :key="index"
                ></li>
              </ul>
              <span>HP</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconTemplate from '@/components/IconTemplate.vue'

export default defineComponent({
  name: 'pokemonDetailed',
  components: { IconTemplate },
  setup() {
    return {
      pokemon: {
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png',
      },
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-detailed {
  &__title {
    margin-bottom: 2rem;
    width: 100%;
    font-weight: 700;
    font-size: clamp(18px, 4vw, 36px);
    text-align: center;
    text-transform: capitalize;

    span {
      color: #878787;
    }
  }

  &__img {
    margin-right: clamp(1rem, 4vw, 3rem);
    border-radius: 10px;
    width: 60%;
    background-color: $color-background;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__pokemon-info {
    display: flex;
    margin-bottom: 1rem;
    border-radius: 10px;
    padding: 15px;
    width: 60%;
    max-height: 40%;
    background-color: $color-accent;

    &__right {
      margin-right: clamp(5rem, 10vw, 20rem);
    }
  }

  &__content {
    &-right {
      width: 100%;
      height: 100%;
    }

    &-main {
      display: flex;
      margin-bottom: 2rem;
      padding: 15px;
      background-color: $color-white;
    }
  }

  &__info-item {
    margin-bottom: 1rem;

    &__title {
      margin-bottom: 0.5rem;
      font-weight: 700;
      font-size: 14px;
      color: $color-white;
    }

    &__value {
      font-weight: 500;
      color: $color-dark-gray;

      span:first-child {
        margin-right: 10px;
      }
    }
  }

  &__pokemon-elements {
    margin-bottom: 1rem;

    &__actions {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    &__title {
      margin-bottom: 0.5rem;
    }

    &__type {
      margin-bottom: 0.5rem;
      border-radius: 5px;
      padding: 8px 12px;
      width: 100px;
      font-weight: 700;
      color: $color-dark-gray;
      background-color: $color-light-gray;

      &:not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }

  &__stats {
    margin-bottom: 2rem;
    border-radius: 10px;
    padding: 1rem 2rem;
    width: 37%;
    background-color: $color-background;

    &-menu {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &-title {
      margin-bottom: 0.5rem;
      margin-left: 1rem;
      font-weight: 700;git
      font-size: 1.4rem;
      color: $color-dark-gray;
    }

    &-item {
      display: block;
      width: 15%;
      text-align: center;

      &:not(:last-child) {
        margin: 0 1.5% 1.25rem 0;
      }

      span {
        display: block;
        color: $color-medium-gray;
      }

      &:nth-child(1) {
        .pokemon-detailed__stats-gauge .pokemon-detailed__stats-gauge__meter {
          top: 80%;
        }
      }

      &:nth-child(3) {
        .pokemon-detailed__stats-gauge .pokemon-detailed__stats-gauge__meter {
          top: 50%;
        }
      }

      &:nth-child(7) {
        .pokemon-detailed__stats-gauge .pokemon-detailed__stats-gauge__meter {
          top: 10%;
        }
      }
    }

    &-gauge {
      position: relative;
      overflow: hidden;
      margin-bottom: 0.5rem;
      background-color: $color-white;

      &__item {
        position: relative;
        z-index: 2;
        border-bottom: 0.25em solid #88ceff;
        width: 100%;
        height: 0.5em;
        background: transparent;
      }

      &__meter {
        position: absolute;
        top: 30%;
        z-index: 1;
        border: none;
        width: 100%;
        height: 100%;
        background: $color-accent;
      }
    }
  }
}
</style>
