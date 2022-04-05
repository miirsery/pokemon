<template>
  <div class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <h2 class="pokemon-detailed__title subtitle">
        wigglytuff
        <span class="pokemon-detailed__id">№{{ filteredId }}</span>
      </h2>
      <div class="pokemon-main">
        <div class="pokemon-main__wrapper">
          <div class="pokemon-main__img">
            <img :src="pokemonDetailed.img" :alt="name" />
          </div>
          <div class="pokemon-main__right">
            <div class="pokemon-info">
              <div class="pokemon-info__item-left">
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Height</h4>
                  <p class="pokemon-info__item-value">0.5m</p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Height</h4>
                  <p class="pokemon-info__item-value">0.5m</p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Gender</h4>
                  <div class="pokemon-info__item-value">
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
              <div class="pokemon-info__item-right">
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Category</h4>
                  <p class="pokemon-info__item-value">Baloon</p>
                </div>
                <div class="pokemon-detailed__info-item">
                  <h4 class="pokemon-info__item-title">Height</h4>
                  <p class="pokemon-info__item-value">0.5m</p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Abilities</h4>
                  <p class="pokemon-info__item-value ability">Cute Charm</p>
                  <p class="pokemon-info__item-value ability">Competitive</p>
                </div>
              </div>
            </div>
            <div class="pokemon-elements">
              <p class="pokemon-elements__title subtitle">Type</p>
              <div class="pokemon-elements__actions">
                <button class="pokemon-elements__type">Normal</button>
                <button class="pokemon-elements__type">Fairy</button>
              </div>
              <p class="pokemon-elements__title subtitle">Weakness</p>
              <div class="pokemon-elements__actions">
                <button class="pokemon-elements__type">Steel</button>
                <button class="pokemon-elements__type">Poison</button>
              </div>
            </div>
          </div>
        </div>
        <div class="pokemon-stats">
          <h3 class="pokemon-stats__title">Статистика</h3>
          <ul class="pokemon-stats__menu">
            <li
              class="pokemon-stats__item"
              v-for="(item, index) in 6"
              :key="index"
            >
              <ul class="pokemon-stats__gauge">
                <li class="pokemon-stats__gauge-meter"></li>
                <li
                  class="pokemon-stats__gauge-item"
                  v-for="(pokemonItem, pokemonIndex) in 15"
                  :key="pokemonIndex"
                ></li>
              </ul>
              <span>HP</span>
            </li>
          </ul>
        </div>
        <div class="pokemon-evolution">
          <h2 class="pokemon-evolution__title subtitle">Стадии эволюции</h2>
          <div class="pokemon-evolution__items">
            <div class="pokemon-evolution__item">
              <router-link to="#">
                <div class="pokemon-evolution__item-img">
                  <img :src="pokemonDetailed.img" alt="pokemon" />
                </div>
                <h3 class="pokemon-evolution__item-title">
                  Wigglytuff
                  <span class="pokemon-evolution__item-id">
                    №{{ filteredId }}
                  </span>
                </h3>
              </router-link>
              <div class="pokemon-evolution__item-types">
                <div class="pokemon-evolution__item-type">
                  <router-link to="#">Grass</router-link>
                </div>
                <div class="pokemon-evolution__item-type">
                  <router-link to="#">Poison</router-link>
                </div>
              </div>
            </div>
            <div class="pokemon-evolution__item">
              <router-link to="#">
                <div class="pokemon-evolution__item-img">
                  <img :src="pokemonDetailed.img" alt="pokemon" />
                </div>
                <h3 class="pokemon-evolution__item-title">
                  Wigglytuff
                  <span class="pokemon-evolution__item-id">
                    №{{ filteredId }}
                  </span>
                </h3>
              </router-link>
              <div class="pokemon-evolution__item-types">
                <div class="pokemon-evolution__item-type">
                  <router-link to="#">Grass</router-link>
                </div>
                <div class="pokemon-evolution__item-type">
                  <router-link to="#">Poison</router-link>
                </div>
              </div>
            </div>
            <div class="pokemon-evolution__item">
              <router-link to="#">
                <div class="pokemon-evolution__item-img">
                  <img :src="pokemonDetailed.img" alt="pokemon" />
                </div>
                <h3 class="pokemon-evolution__item-title">
                  Wigglytuff
                  <span class="pokemon-evolution__item-id">
                    №{{ filteredId }}
                  </span>
                </h3>
              </router-link>
              <div class="pokemon-evolution__item-types">
                <div class="pokemon-evolution__item-type">
                  <router-link to="#">Grass</router-link>
                </div>
                <div class="pokemon-evolution__item-type">
                  <router-link to="#">Poison</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'PokemonDetailed',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    type DetailedPokemonStatsType = {
      stat: number
      name: string
    }

    type DetailedPokemonType = {
      id: number
      name: string
      img: string
      abilities: string[]
      stats: DetailedPokemonStatsType[]
    }

    const pokemonDetailed: DetailedPokemonType = {
      id: 56,
      name: 'Pokemon4ik',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png',
      abilities: ['fire', 'storm'],
      stats: [
        {
          stat: 48,
          name: 'hp',
        },
      ],
    }

    type ToExcludeFieldsType = 'abilities' | 'stats'

    const localStoragePokemon: Partial<
      Omit<DetailedPokemonType, ToExcludeFieldsType>
    > = {
      id: pokemonDetailed.id,
      name: pokemonDetailed.name,
      img: pokemonDetailed.img,
    }

    const oldPokemonList: typeof localStoragePokemon[] = JSON.parse(
      localStorage.getItem('pokemon-list')
    )

    onMounted((): void => {
      if (oldPokemonList) {
        let newPokemonList = oldPokemonList
        newPokemonList.forEach((pokemon, index) => {
          if (pokemon.id === localStoragePokemon.id) {
            newPokemonList.splice(index, 1)
          }
        })

        newPokemonList.unshift(localStoragePokemon)
        if (newPokemonList.length > 5) {
          newPokemonList.pop()
        }
        localStorage.setItem('pokemon-list', JSON.stringify(newPokemonList))
      } else {
        localStorage.setItem(
          'pokemon-list',
          JSON.stringify([localStoragePokemon])
        )
      }
    })
    return {
      pokemonDetailed,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-detailed {
  width: 80%;

  &__title {
    margin-bottom: 2rem;
    width: 100%;
    font-weight: 700;
    font-size: clamp(18px, 4vw, 36px);
    text-align: center;
    text-transform: capitalize;
  }

  &__id {
    color: $color-gray;
  }

  &__content {
    padding: 2rem;
    background-color: $color-white;
  }
}

.pokemon-info {
  display: flex;
  margin-bottom: 1rem;
  border-radius: 10px;
  padding: 15px;
  width: 60%;
  max-height: 40%;
  background-color: $color-accent;

  &__item {
    margin-bottom: 1rem;
    width: 50%;

    &-title {
      margin-bottom: 0.5rem;
      font-weight: 700;
      font-size: 14px;
      color: $color-white;
    }

    &-right {
      width: 50%;
    }

    &-left {
      width: 50%;
    }

    &-value {
      position: relative;
      font-weight: 600;
      font-size: 1.1rem;
      color: $color-dark-gray;

      span:first-child {
        margin-right: 10px;
      }
    }

    .ability {
      position: relative;
      margin-bottom: 0.5rem;
      cursor: pointer;

      &::after {
        content: '?';
        position: absolute;
        right: -28px;
        top: 50%;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        text-align: center;
        color: $color-accent;
        background-color: #e8e8e8;
        transform: translateY(-50%);
      }
    }
  }
}

.pokemon-elements {
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

.pokemon-main {
  &__wrapper {
    display: flex;
    margin-bottom: 2rem;
    padding: 15px;
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

  &__right {
    width: 100%;
    height: 100%;
  }
}

.pokemon-stats {
  margin-bottom: 2rem;
  border-radius: 10px;
  padding: 1rem 2rem;
  width: 37%;
  background-color: $color-background;

  &__menu {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__title {
    margin-bottom: 1rem;
    margin-left: 1rem;
    font-weight: 800;
    font-size: 1.5em;
    letter-spacing: 0.1rem;
    color: $color-dark-gray;
  }

  &__item {
    display: block;
    width: 15%;
    text-align: center;

    span {
      display: block;
      color: $color-medium-gray;
    }

    &:nth-child(1) {
      .pokemon-stats__gauge .pokemon-stats__gauge-meter {
        top: 80%;
      }
    }

    &:nth-child(3) {
      .pokemon-stats__gauge .pokemon-stats__gauge-meter {
        top: 50%;
      }
    }

    &:nth-child(5) {
      .pokemon-stats__gauge .pokemon-stats__gauge-meter {
        top: 10%;
      }
    }
  }

  &__gauge {
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5rem;
    background-color: $color-white;

    &-item {
      position: relative;
      z-index: 2;
      border-bottom: 0.25em solid transparent;
      width: 100%;
      height: 0.5em;
      background: transparent;
    }

    &-meter {
      position: absolute;
      top: 30%;
      z-index: 1;
      border: none;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(0, 212, 255, 1) 23%,
        rgba(20, 112, 199, 1) 49%,
        rgba(29, 63, 172, 1) 69%,
        rgba(7, 49, 113, 1) 99%
      );
      opacity: 0.9;
    }
  }
}

.pokemon-evolution {
  position: relative;
  margin: 2rem auto;
  border-radius: 10px;
  padding: 10px 15px;
  min-height: 310px;
  max-width: 80%;
  background: center/ cover url('../assets/images/evolution-bg.png');

  &::after {
    content: ' ';
    position: absolute;
    left: -1px;
    bottom: -1px;
    z-index: 3;
    width: 2em;
    height: 2em;
    background: center/ cover no-repeat url('../assets/images/cut-corner.png');
    backface-visibility: hidden;
    transform: rotate(-90deg);
  }

  &__title {
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: $color-white;
  }

  &__items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 100%;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:not(:last-child) {
      &::after {
        content: '';
        position: absolute;
        right: -55%;
        top: 41%;
        border-top: 5px solid #fff;
        border-right: 5px solid #fff;
        width: 60px;
        height: 60px;
        background: none;
        transform: rotate(45deg) translateY(-50%);
      }
    }

    &-img {
      position: relative;
      margin-bottom: 1rem;
      border: 5px solid $color-white;
      border-radius: 50%;
      width: 160px;
      height: 160px;
      box-shadow: -2px 6px 15px $color-dark-gray;
      background-color: $color-medium-gray;

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 80%;
        height: 80%;
        object-fit: cover;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease-in;

        &:hover {
          width: 90%;
        }
      }
    }

    &-title {
      margin-right: 0.3rem;
      font-weight: 700;
      font-size: 1.1rem;
      color: $color-white;
    }

    &-id {
      font-size: 0.9rem;
      color: $color-gray;
    }

    &-types {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
    }

    &-type {
      border-radius: 5px;
      padding: 4px 0;
      width: 90px;
      box-shadow: -6px 5px 11px $color-dark-gray;
      text-align: center;
      color: $color-dark-gray;
      background-color: $color-accent;
      transition: background-color 0.3s ease-out;

      &:hover {
        color: $color-light-gray;
        background-color: $color-dark-accent;
      }

      &:first-child {
        margin-right: 1rem;
      }
    }
  }
}
</style>
