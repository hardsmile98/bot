import { Telegraf, session } from 'telegraf'
import { type IConfigService } from './config/config.interface'
import { ConfigService } from './config/config.service'
import { type Command } from './commands/Command'
import { StartCommand } from './commands/Start'
import { type ILogger, Logger } from './logger'
import { InDeveloping } from './commands/InDeveloping'
import { Pay } from './commands/Pay'
import { Files } from './commands/Files'
import { Api } from './services/api'
import { type IApi } from './services/types'

class Bot {
  bot: Telegraf
  logger: ILogger
  api: IApi
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf(this.configService.get('TOKEN'))
    this.bot.use(session())
    this.logger = new Logger()
    this.api = new Api(
      this.configService.get('API_URL'),
      this.configService.get('SECRET_KEY')
    )
  }

  init () {
    this.commands = [
      new StartCommand(this),
      new InDeveloping(this),
      new Pay(this),
      new Files(this)
    ]

    for (const command of this.commands) {
      command.handle()
    }

    void this.bot.launch()
  }
}

export { Bot }

const bot = new Bot(new ConfigService())
bot.init()
