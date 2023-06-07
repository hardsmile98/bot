import {
  type ICheckPaid,
  type IUser,
  type IApi
} from './types'

export class Api implements IApi {
  apiUrl: string
  secretKey: string

  constructor (apiUrl: string, secretKey: string) {
    this.apiUrl = apiUrl
    this.secretKey = secretKey
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

  async getFile (userId: string, url: string) {
    console.log(`getFile: ${JSON.stringify(userId)}`)

    return {
      title: 'Hand-hand Handsome',
      price: '10$',
      downloadUrl: 'https://ui8.net'
    }
  }
}
