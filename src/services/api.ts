import axios from 'axios'
import {
  type IUser,
  type IApi,
  type ServiceName,
  type IRequest,
  type IProfile
} from './types'

export class Api implements IApi {
  apiUrl: string
  login: string
  password: string

  token: string | null = null

  constructor (apiUrl: string, login: string, password: string) {
    this.apiUrl = apiUrl
    this.login = login
    this.password = password
  }

  async request ({ path, method, params, body }: IRequest) {
    const response = await axios({
      url: `${this.apiUrl}/api${path}`,
      method: method ?? 'get',
      params,
      data: body,
      headers: {
        Authorization: this.token && `Bearer ${this.token}`
      }
    })

    return response.data
  }

  async init () {
    const { token } = await this.request({
      path: '/auth/login',
      method: 'post',
      body: {
        login: this.login,
        password: this.password
      }
    })

    if (!token) {
      throw Error('No token')
    }

    this.token = token
  }

  async start (user: IUser) {
    return await this.request({
      path: '/users',
      method: 'post',
      body: user
    })
  }

  async getGift (userId: string) {
    return await this.request({
      path: '/users/getGift',
      params: {
        userId
      }
    })
  }

  async getProfile (userId: string): Promise<IProfile> {
    return await this.request({
      path: '/users/profile',
      params: {
        userId
      }
    })
  }

  async getFile (userId: string, url: string, serviceName: ServiceName) {
    return await this.request({
      path: '/files/file',
      params: {
        userId,
        url,
        serviceName
      }
    })
  }

  async createPayment (userId: string) {
    return await this.request({
      path: '/payments',
      method: 'post',
      body: {
        userId
      }
    })
  }

  async savePayment (uuid: string, userId: string) {
    return await this.request({
      path: '/payments/save',
      method: 'post',
      body: {
        uuid,
        userId
      }
    })
  }

  async checkPayment (userId: string) {
    return await this.request({
      path: '/payments',
      params: {
        userId
      }
    })
  }
}
