interface IUser {
  firstName: string
  lastName?: string
  userName?: string
  chatId: string
  userId: string
}

interface ICheckPaid {
  isPaid: boolean
}

interface IFile {
  title: string
  price: string
  downloadUrl: string
}

type ServiceName = 'ui8.net' | 'craftwork.design' | 'ls.graphics' | 'uihut.com' | 'pixsellz.io' | 'spline.one'

interface IApi {
  init: () => Promise<unknown>
  start: (user: IUser) => Promise<unknown>
  getGift: (userId: string) => Promise<unknown>
  checkPaid: (userId: string) => Promise<ICheckPaid>
  getFile: (userId: string, url: string, serviceName: ServiceName) => Promise<IFile>
}

export type {
  IUser,
  ICheckPaid,
  IFile,
  IApi,
  ServiceName
}
