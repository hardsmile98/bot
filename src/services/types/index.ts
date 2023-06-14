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

interface IPayment {
  id: string
  status: string
  amount: {
    value: string
    currency: string
  }
  description: string
  recipient: {
    account_id: string
    gateway_id: string
  }
  payment_method: {
    type: string
    id: string
    saved: boolean
  }
  created_at: string
  confirmation: {
    type: string
    return_url: string
    confirmation_url: string
  }
  test: boolean
  paid: boolean
  refundable: boolean
}

interface ICheckPayment {
  isPaid: boolean
}

type ServiceName = 'ui8_net' | 'craftwork_design' | 'ls_graphics' | 'uihut_com' | 'pixsellz_io' | 'spline_one'

interface IApi {
  init: () => Promise<unknown>
  start: (user: IUser) => Promise<IStart>
  getGift: (userId: string) => Promise<unknown>
  checkPlan: (userId: string) => Promise<ICheckPlan>
  getFile: (userId: string, url: string, serviceName: ServiceName) => Promise<IFile>
  createPayment: (userId: string) => Promise<IPayment>
  checkPayment: (userId: string, messageId: string) => Promise<ICheckPayment>
  savePayment: (uuid: string, userId: string, messageId: string) => Promise<unknown>
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
