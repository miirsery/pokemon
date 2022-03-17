import { AxiosInstance } from 'axios'

declare module 'fastify' {
  interface FastifyInstance {
    axios: AxiosInstance
  }
}
