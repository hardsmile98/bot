import { type Telegraf } from 'telegraf'
import { type ILogger } from '../../logger'
import { type IApi } from '../../services/api'

export abstract class Command {
  constructor (
    public readonly bot: Telegraf,
    public readonly logger: ILogger,
    public readonly api?: IApi
  ) {}

  abstract handle (): void
}
