import { AxiosRequestConfig } from 'axios'
import { AxiosService } from '@/api/axiosService'

class PokemonAPI extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getPokemonList(offset: number, limit: number) {
    return this.axiosCall({
      method: 'get',
      url: '/api/pokemon',
      params: {
        offset: offset,
        limit: limit,
      },
    })
  }

  public getDetailedPokemon(id: number | string | string[]) {
    return this.axiosCall({
      method: 'get',
      url: `/api/pokemon/${id}`,
    })
  }
}

export const pokemonAPI = new PokemonAPI({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `${process.env.VUE_APP_BASE_URI}`
      : '',
  withCredentials: true,
})
