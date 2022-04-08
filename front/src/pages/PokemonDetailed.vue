<template>
  <pokemon-detailed-preloader v-if="isLoading" />
  <div v-else class="pokemon-detailed">
    <div class="pokemon-detailed__container pokemon-detailed__wrapper">
      <h2 class="pokemon-detailed__title subtitle">
        {{ detailedPokemon.name }}
        <span class="pokemon-detailed__id">
          №{{ filteredId(detailedPokemon.id) }}
        </span>
      </h2>
      <div class="pokemon-main">
        <div class="pokemon-main__wrapper">
          <div class="pokemon-main__img">
            <pokemon-empty-image
              :font-size="26"
              v-if="detailedPokemon.image === 'no-image'"
            />
            <img
              v-else
              :src="detailedPokemon.image"
              :alt="detailedPokemon.name"
            />
          </div>
          <div class="pokemon-main__right">
            <pokemon-detailed-ability
              @close="toggleDetailedAbility"
              v-if="showDetailedAbility"
              :name="nameOfAbility"
            />
            <div class="pokemon-info" v-else>
              <div class="pokemon-info__item-left">
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Height</h4>
                  <p class="pokemon-info__item-value">
                    {{ detailedPokemon.height }} m
                  </p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Weight</h4>
                  <p class="pokemon-info__item-value">
                    {{ detailedPokemon.weight }} kg
                  </p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Gender</h4>
                  <div class="pokemon-info__item-value">
                    <span v-for="gender in detailedPokemon.genders">
                      <icon-template :name="gender" width="24" height="24" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="pokemon-info__item-right">
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Category</h4>
                  <p class="pokemon-info__item-value">
                    {{ detailedPokemon.genera }}
                  </p>
                </div>
                <div class="pokemon-info__item">
                  <h4 class="pokemon-info__item-title">Abilities</h4>
                  <p
                    class="pokemon-info__item-value ability"
                    v-for="ability in detailedPokemon.abilities"
                    :key="ability.name"
                    @click="toggleDetailedAbility(ability.name)"
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
                  v-for="type in detailedPokemon.types"
                  :key="type"
                  :class="`type-${type}`"
                >
                  {{ type }}
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
              v-for="(item, index) in detailedPokemon.stats"
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
              <span class="pokemon-stats__item-name">
                {{ item.name.replace('-', ' ') }}
              </span>
            </li>
          </ul>
        </div>
        <div class="pokemon-evolution">
          <h2 class="pokemon-evolution__title subtitle">Стадии эволюции</h2>
          <div class="pokemon-evolution__content">
            <div
              class="pokemon-item__stage"
              v-for="(pokemonStage, index) in detailedPokemon?.evolution"
              :key="pokemonStage.stage.name"
              :class="{
                'pokemon-item__stage-small':
                  detailedPokemon?.evolution[index].stage.length > 3,
              }"
            >
              <div
                v-if="detailedPokemon?.evolution[index].stage.length > 3"
                class="pokemon-item__arrow"
              ></div>
              <div
                class="pokemon-item__wrapper"
                v-for="pokemon in pokemonStage.stage"
                :key="pokemon.name"
              >
                <router-link
                  :to="`/pokemon/${pokemon.id}`"
                  class="pokemon-item__image"
                  :class="{
                    'pokemon-item__image-small': pokemonStage.length > 2,
                  }"
                >
                  <img :src="pokemon.image" :alt="pokemon.name" />
                </router-link>
                <h3 class="pokemon-item__name">
                  {{ pokemon?.name.replace('-', ' ') }}
                </h3>
                <p class="pokemon-item__id">№{{ filteredId(pokemon.id) }}</p>
                <div class="pokemon-item__types">
                  <p
                    class="pokemon-item__type"
                    v-for="type in pokemon.types"
                    :key="type"
                    :class="`type-${type}`"
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
import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue'
import { pokemonAPI } from '@/api/pokemon.api'
import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'PokemonDetailed',
  emits: ['update'],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    PokemonDetailedAbility: defineAsyncComponent(
      () => import('@/components/PokemonDetailedAbility.vue')
    ),
    PokemonDetailedPreloader: defineAsyncComponent(
      () => import('@/components/PokemonDetailedPreloader.vue')
    ),
    PokemonEmptyImage: defineAsyncComponent(
      () => import('@/components/PokemonEmptyImage.vue')
    ),
  },
  setup(props, { emit }) {
    type LocalStoragePokemonType = {
      id: number
      image: string
      name: string
    }

    type StatsType = {
      baseStat: number
      name: string
    }

    type AbilitiesType = {
      name: string
      url: string
    }

    type EvolutionType = {
      id: number
      name: string
      image: string
      types: string[]
      stage: number
    }

    type DetailedPokemonType = {
      id: number
      name: string
      image: string
      height: number
      weight: number
      types: string[]
      stats: StatsType[]
      abilities: AbilitiesType[]
      genders: string[]
      genera: string
      evolution: EvolutionType[]
    }

    const detailedPokemon = ref<DetailedPokemonType>()
    const localStoragePokemon = ref<LocalStoragePokemonType>()
    const showDetailedAbility = ref(false)
    const nameOfAbility = ref('')
    const isLoading = ref(true)

    const setDetailedAbilityName = (name): void => {
      nameOfAbility.value = name
    }

    const toggleDetailedAbility = (name): void => {
      showDetailedAbility.value = !showDetailedAbility.value
      if (name !== undefined) {
        setDetailedAbilityName(name)
      }
    }

    const oldPokemonList: LocalStoragePokemonType[] = JSON.parse(
      localStorage.getItem('pokemon-list')
    )

    const clearPage = (): void => {
      isLoading.value = true
      detailedPokemon.value = null
    }

    const updateLocalStorage = async (): Promise<void> => {
      emit('update', true)
    }

    const setPokemonListInLocalStorage = async (): Promise<void> => {
      if (oldPokemonList) {
        const newPokemonList = oldPokemonList
        newPokemonList.forEach((pokemon, index) => {
          if (pokemon.id === localStoragePokemon.value['id']) {
            newPokemonList.splice(index, 1)
          }
        })

        newPokemonList.unshift(localStoragePokemon.value)
        if (newPokemonList.length > 5) {
          newPokemonList.pop()
        }

        localStorage.setItem('pokemon-list', JSON.stringify(newPokemonList))
      } else {
        localStorage.setItem(
          'pokemon-list',
          JSON.stringify([localStoragePokemon.value])
        )
      }
    }

    const filteredId = (id): string => id?.toString().padStart(4, '0')

    const getDetailedPokemon = async (id): Promise<void> => {
      clearPage()

      const [_, detailedPokemonData] = await pokemonAPI.getDetailedPokemon(id)
      detailedPokemon.value = detailedPokemonData.pokemon

      localStoragePokemon.value = {
        id: detailedPokemon.value.id,
        name: detailedPokemon.value.name,
        image: detailedPokemon.value.image,
      }

      isLoading.value = false
      await setPokemonListInLocalStorage()
      await updateLocalStorage()
    }

    onBeforeRouteUpdate(async (to): Promise<void> => {
      await getDetailedPokemon(to.params.id)
    })

    onMounted((): void => {
      getDetailedPokemon(props.id)
    })
    return {
      showDetailedAbility,
      detailedPokemon,
      nameOfAbility,
      isLoading,
      toggleDetailedAbility,
      getDetailedPokemon,
      filteredId,
    }
  },
})
</script>

<style scoped lang="scss">
.pokemon-detailed {
  width: 80%;
  min-height: 110vh;

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
    position: relative;
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

    &-name {
      display: block;
      text-transform: capitalize;
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

  &__title {
    margin-bottom: 2rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: $color-white;
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

.pokemon-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;

    &::before {
      content: '';
      position: absolute;
      left: -7rem;
      top: 36%;
      border-top: 6px solid $color-white;
      border-right: 6px solid $color-white;
      width: 60px;
      height: 60px;
      background-color: transparent;
      transform: translateY(-50%) rotate(45deg);
    }
  }

  &__image {
    position: relative;
    display: block;
    margin-bottom: 1rem;
    border: 5px solid $color-white;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    box-shadow: -2px 6px 15px $color-dark-gray;
    background-color: $color-medium-gray;

    &-small {
      width: 100px;
      height: 100px;
    }

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
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: capitalize;
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

  &__arrow {
    position: absolute;
    left: -11rem;
    top: 36%;
    border-top: 6px solid $color-white;
    border-right: 6px solid $color-white;
    width: 60px;
    height: 60px;
    background-color: transparent;
    transform: translateY(-50%) rotate(45deg);
  }

  &__stage {
    position: relative;
    max-width: 70%;
    gap: 30px;

    &-small {
      display: flex;
      flex-wrap: wrap;
      margin: 0 0 0 5rem !important;

      .pokemon-item__image {
        width: 100px;
        height: 100px;
      }

      .pokemon-item__wrapper {
        &::before {
          display: none;
        }
      }
    }

    &:not(:last-child) {
      margin-right: 8rem;
    }

    &:first-child {
      .pokemon-item__wrapper {
        &::before {
          display: none;
        }
      }
    }
  }
}

.circle {
  width: 100px;
}
</style>
