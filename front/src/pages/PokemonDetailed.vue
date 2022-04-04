<template>
  <div class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <h2 class="pokemon-detailed__title subtitle">
        {{ detailedPokemon['name'] }}
        <span class="pokemon-detailed__id">
          №{{ detailedPokemon['id']?.toString().padStart(4, '0') }}
        </span>
      </h2>
      <div class="pokemon-main">
        <div class="pokemon-main__wrapper">
          <div class="pokemon-main__img">
            <img
              :src="detailedPokemon['image']"
              :alt="detailedPokemon['name']"
            />
          </div>
          <div class="pokemon-main__right">
            <div class="pokemon-info">
              <div class="pokemon-info__item-left">
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Height</h4>
                  <p class="pokemon-info__item-value">
                    {{ detailedPokemon['height'] }} m
                  </p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Weight</h4>
                  <p class="pokemon-info__item-value">
                    {{ detailedPokemon['weight'] }} kg
                  </p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Gender</h4>
                  <div class="pokemon-info__item-value">
                    <span v-for="gender in detailedPokemon['genders']">
                      <icon-template :name="gender" width="24" height="24" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="pokemon-info__item-right">
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Category</h4>
                  <p class="pokemon-info__item-value">
                    {{ detailedPokemon['category'] }}
                  </p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Abilities</h4>
                  <p
                    class="pokemon-info__item-value ability"
                    v-for="ability in detailedPokemon['abilities']"
                    :key="ability.name"
                  >
                    {{ ability.name.replace('-', ' ') }}
                  </p>
                </div>
              </div>
            </div>
            <div class="pokemon-elements">
              <p class="pokemon-elements__title subtitle">Type</p>
              <div class="pokemon-elements__actions">
                <button
                  class="pokemon-elements__type"
                  v-for="type in detailedPokemon['types']"
                  :key="type"
                  :class="`type-${type.name}`"
                >
                  {{ type.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pokemon-stats">
          <h3 class="pokemon-stats__title">Статистика</h3>
          <ul class="pokemon-stats__menu">
            <li
              class="pokemon-stats__item"
              v-for="(item, index) in detailedPokemon['stats']"
              :key="item.name"
            >
              <ul class="pokemon-stats__gauge">
                <li
                  :style="{ top: `${100 - item.baseStat / 2}%` }"
                  class="pokemon-stats__gauge-meter"
                ></li>
                <li
                  class="pokemon-stats__gauge-item"
                  v-for="(pokemonItem, pokemonIndex) in 15"
                  :key="pokemonIndex"
                ></li>
              </ul>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="pokemon-evolution">
          <h2 class="pokemon-evolution__title subtitle">Стадии эволюции</h2>
          <div class="pokemon-evolution__content">
            <div class="pokemon-evolution__first-item evolution-pokemon">
              <router-link
                :to="{
                  path: `/pokemon/${detailedPokemon?.evolution?.[0]?.id}`,
                }"
                @click="getDetailedPokemon"
              >
                <div
                  class="pokemon-evolution__first-image evolution-pokemon__image"
                >
                  <img
                    :src="detailedPokemon?.evolution?.[0]?.image"
                    :alt="detailedPokemon?.evolution?.[0]?.name"
                  />
                </div>
              </router-link>

              <h3
                class="pokemon-evolution__first-title evolution-pokemon__name"
              >
                {{ detailedPokemon?.evolution?.[0]?.name }}
                <span class="evolution-pokemon__id">
                  #{{
                    detailedPokemon?.evolution?.[0]?.id
                      .toString()
                      .padStart(4, '0')
                  }}
                </span>
              </h3>
              <div
                class="pokemon-evolution__first-types evolution-pokemon__types"
              >
                <p
                  v-for="type in detailedPokemon?.evolution?.[0]?.types"
                  :key="type"
                  :class="`type-${type}`"
                  class="evolution__first-type evolution-pokemon__type"
                >
                  {{ type }}
                </p>
              </div>
            </div>
            <div
              class="pokemon-evolution__small"
              v-if="detailedPokemon['evolution']?.length <= 3"
            >
              <div
                v-for="pokemon in detailedPokemon['evolution']?.slice(1)"
                :key="pokemon.name"
                class="pokemon-evolution__first-item evolution-pokemon"
              >
                <router-link
                  :to="{
                    path: `/pokemon/${pokemon.id}`,
                  }"
                  @click="getDetailedPokemon(pokemon.id)"
                >
                  <div class="evolution__first-image evolution-pokemon__image">
                    <img :src="pokemon.image" :alt="pokemon.name" />
                  </div>
                </router-link>
                <h3 class="evolution__first-title evolution-pokemon__name">
                  {{ pokemon.name }}
                  <span class="evolution-pokemon__id">
                    №{{ pokemon.id.toString().padStart(4, '0') }}
                  </span>
                </h3>
                <div class="evolution__first-types evolution-pokemon__types">
                  <p
                    v-for="type in pokemon.types"
                    :key="type"
                    :class="`type-${type}`"
                    class="evolution__first-type evolution-pokemon__type"
                  >
                    {{ type }}
                  </p>
                </div>
              </div>
            </div>
            <div class="evolution-more" v-else>
              <div
                v-for="pokemon in detailedPokemon['evolution']
                  ?.slice(1)
                  .reverse()"
                :key="pokemon.name"
                class="evolution-more__item"
              >
                <router-link
                  :to="{
                    path: `/pokemon/${pokemon.id}`,
                  }"
                >
                  <div class="evolution-more__image evolution-pokemon__image">
                    <img
                      :src="pokemon.image"
                      :alt="pokemon.name"
                      @click="getDetailedPokemon(pokemon.id)"
                    />
                  </div>
                </router-link>

                <h3 class="evolution-more__name evolution-pokemon__name">
                  {{ pokemon.name }}
                </h3>
                <p class="evolution-more__id evolution-pokemon__id">
                  №{{ pokemon.id.toString().padStart(4, '0') }}
                </p>
                <div class="evolution-more__types evolution-pokemon__types">
                  <p
                    v-for="type in pokemon.types"
                    :key="type"
                    :class="`type-${type}`"
                    class="evolution-more__type evolution-pokemon__type"
                  >
                    {{ type }}
                  </p>
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
import { defineComponent, onMounted, reactive } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PokemonDetailed',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
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
      id: 53,
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

    type toExcludeFieldsType = 'abilities' | 'stats'

    const localStoragePokemon: Partial<
      Omit<DetailedPokemonType, toExcludeFieldsType>
    > = {
      id: pokemonDetailed.id,
      name: pokemonDetailed.name,
      img: pokemonDetailed.img,
    }

    const oldPokemonList: typeof localStoragePokemon[] = JSON.parse(
      localStorage.getItem('pokemon-list')
    )
    let detailedPokemon = reactive({})
    // let filteredIdData = ref<string>('')
    const route = useRoute()

    const getDetailedPokemon = async (id) => {
      //let currentId = ref(props.id)
      console.log(id)
      const [_, detailedPokemonData] = await pokemonAPI.getDetailedPokemon(id)
      //detailedPokemon = detailedPokemonData
      detailedPokemon['id'] = detailedPokemonData.pokemon.id
      detailedPokemon['name'] = detailedPokemonData.pokemon.name
      detailedPokemon['image'] = detailedPokemonData.pokemon.image
      detailedPokemon['height'] = detailedPokemonData.pokemon.height / 10
      detailedPokemon['weight'] = detailedPokemonData.pokemon.weight / 10
      detailedPokemon['types'] = detailedPokemonData.pokemon.types
      detailedPokemon['stats'] = detailedPokemonData.pokemon.stats
      detailedPokemon['category'] =
        detailedPokemonData.pokemon.genera[0].genus.replace('Pokémon', '')
      detailedPokemon['abilities'] = detailedPokemonData.pokemon.abilities
      detailedPokemon['genders'] = detailedPokemonData.pokemon.genders
      detailedPokemon['stats'] = detailedPokemonData.pokemon.stats
      detailedPokemon['evolution'] =
        detailedPokemonData.pokemon.evolution.reverse()
    }
    const setPokemonListInLocalStorage = () => {
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
    }

    onMounted(() => {
      getDetailedPokemon(props.id)
      setPokemonListInLocalStorage()
    })
    return {
      pokemonDetailed,
      detailedPokemon,
      getDetailedPokemon,
      // filteredIdData,
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
      text-transform: capitalize;
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
    align-items: flex-start;
    justify-content: center;
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
      border: 1px solid #fff;
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
      transition: all 0.9s ease-in;
    }
  }
}

.pokemon-evolution {
  position: relative;
  margin: 2rem auto;
  border-radius: 10px;
  padding: 30px;
  min-height: 310px;
  max-width: 80%;
  background: center/ cover url('../assets/images/evolution-bg.png');

  &__item {
    &-name {
      margin-bottom: 1rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: $color-white;
    }
  }

  &__small {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:not(:last-child) {
    margin-right: 10rem;
  }

  &__first-item {
    &:not(:last-child) {
      margin-right: 10rem;
    }
  }
}

.evolution-pokemon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image {
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

  &__name {
    margin-right: 0.3rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: $color-white;
  }

  &__id {
    font-size: 0.9rem;
    color: $color-gray;
  }

  &__types {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  &__type {
    border-radius: 5px;
    padding: 4px 0;
    width: 90px;
    box-shadow: -6px 5px 11px $color-dark-gray;
    text-align: center;
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

.evolution-more {
  display: flex;
  flex-wrap: wrap;
  max-width: 55%;
  gap: 40px;

  &__image {
    width: 100px;
    height: 100px;
  }

  &__type {
    margin: 0 auto;
    width: 70px;
  }

  &__name {
    text-align: center;
  }

  &__id {
    text-align: center;
  }
}
</style>
