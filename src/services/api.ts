import { type ICheckPaid, type IFile, type IUser } from './types'

export interface IApi {
  start: (user: IUser) => Promise<unknown>
  getGift: (userId: string) => Promise<unknown>
  checkPaid: (userId: string) => Promise<ICheckPaid>
  getFile: (userId: string, url: string) => Promise<IFile>
}

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
