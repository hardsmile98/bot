import {
  type ICheckPaid,
  type IUser,
  type IApi,
  type ServiceName
} from './types'

export class Api implements IApi {
  apiUrl: string
  token: string | null = null

  constructor (apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async init () {
    console.log('Запрос на получение токена')
    const token = '12312321'

    if (!token) {
      throw Error('No token')
    }

    this.token = token
  }

  async start (user: IUser) {
    console.log(`start: ${JSON.stringify(user)}`)
  }

  async getGift (userId: string) {
    console.log(`getGift: ${JSON.stringify(userId)}`)
  }

  async checkPaid (userId: string): Promise<ICheckPaid> {
    console.log(`checkPaid: ${JSON.stringify(userId)}`)

    return {
      isPaid: true
    }
  }

  async getFile (userId: string, url: string, serviceName: ServiceName) {
    console.log(`getFile: ${JSON.stringify(userId)}`)

    return {
      title: 'Hand-hand Handsome',
      price: '10$',
      downloadUrl: 'https://ui8.net'
    }
  }
}
