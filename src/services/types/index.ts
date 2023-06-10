interface IUser {
  firstName: string
  lastName?: string
  userName?: string
  chatId: string
  userId: string
}

type Plan = 'none' | 'free' | 'pro'

interface ICheckPlan {
  plan: Plan
  requestsCount: number
}

interface IStart {
  isNewUser: boolean
}

interface IFile {
  title: string
  price: string
  downloadUrl: string
}

type ServiceName = 'ui8_net' | 'craftwork_design' | 'ls_graphics' | 'uihut_com' | 'pixsellz_io' | 'spline_one'

interface IApi {
  init: () => Promise<unknown>
  start: (user: IUser) => Promise<IStart>
  getGift: (userId: string) => Promise<unknown>
  checkPlan: (userId: string) => Promise<ICheckPlan>
  getFile: (userId: string, url: string, serviceName: ServiceName) => Promise<IFile>
}

interface IRequest {
  path: string
  method?: 'get' | 'post' | 'delete'
  params?: any
  body?: any
}

export type {
  IUser,
  ICheckPlan,
  IFile,
  IApi,
  ServiceName,
  IRequest
}
