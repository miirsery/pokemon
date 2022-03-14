import axios from 'axios'
import fp from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'

type PluginOptions = {
  url: string,
  timeout: number
}

const axiosPlugin: FastifyPluginCallback<PluginOptions> = (
  fastify,
  _opts,
  done
) => {
  const instance = axios.create({
    timeout: _opts.timeout,
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  fastify.decorate('axios', instance)
  done()
}

export default fp(axiosPlugin, { name: 'axios' })
