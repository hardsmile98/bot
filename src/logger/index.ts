import { type User } from 'telegraf/typings/core/types/typegram'
import { format } from 'date-fns'

type ILogType = 'info' | 'error' | 'warning'

export interface ILogger {
  log: (message: string, type?: ILogType) => void
  logAction: (actionName: string, user?: User) => void
}

export class Logger implements ILogger {
  log (message: string, type: ILogType = 'info') {
    console.log(`LOG | ${type} | ${format(new Date(), 'dd-MM-yyyy HH:mm:ss')} |${message}`)
  }

  logAction (actionName: string, user?: User) {
    this.log(`action: ${actionName}, ${(user !== undefined)
      ? `userID: ${user.id}, ${user.first_name} ${user.last_name}`
      : ''}`)
  }
}
