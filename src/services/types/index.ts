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

type ServiceName = 'ui8_net' | 'craftwork_design' | 'ls_graphics' | 'uihut_com' | 'pixsellz_io' | 'spline_one'

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
