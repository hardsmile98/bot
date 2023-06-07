interface IUser {
  userId: string
  firstName: string
  lastName?: string
  userName?: string
  chatId: string
}

interface ICheckPaid {
  isPaid: boolean
}

interface IFile {
  title: string
  price: string
  downloadUrl: string
}

export interface IApi {
  start: (user: IUser) => Promise<unknown>
  getGift: (userId: string) => Promise<unknown>
  checkPaid: (userId: string) => Promise<ICheckPaid>
  getFile: (userId: string, url: string) => Promise<IFile>
}

export class Api implements IApi {
  constructor () {}

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
