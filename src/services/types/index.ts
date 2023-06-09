interface IUser {
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

interface IApi {
  start: (user: IUser) => Promise<unknown>
  getGift: (userId: string) => Promise<unknown>
  checkPaid: (userId: string) => Promise<ICheckPaid>
  getFile: (userId: string, url: string) => Promise<IFile>
}

export type {
  IUser,
  ICheckPaid,
  IFile,
  IApi
}
