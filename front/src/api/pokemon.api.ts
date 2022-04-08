import { AxiosRequestConfig } from 'axios'
import { AxiosService } from '@/api/axiosService'

class PokemonAPI extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getPokemonList(offset, limit) {
    return this.axiosCall({
      method: 'get',
      url: '/api/pokemon',
      params: {
        offset: offset,
        limit: limit,
      },
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
