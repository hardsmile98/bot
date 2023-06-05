import { Telegraf, session } from 'telegraf'
import { type IConfigService } from './config/config.interface'
import { ConfigService } from './config/config.service'
import { type Command } from './commands/Command'
import { StartCommand } from './commands/Start'
import { type ILogger, Logger } from './logger'
import { InDeveloping } from './commands/InDeveloping'
import { Pay } from './commands/Pay'
import { Files } from './commands/Files'
import { Api, type IApi } from './services/api'

class Bot {
  bot: Telegraf
  logger: ILogger
  api: IApi
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf(this.configService.get('TOKEN'))
    this.bot.use(session())
    this.logger = new Logger()
    this.api = new Api()
  }

  init () {
    this.commands = [
      new StartCommand(this.bot, this.logger, this.api),
      new InDeveloping(this.bot, this.logger),
      new Pay(this.bot, this.logger, this.api),
      new Files(this.bot, this.logger, this.api)
    ]

    for (const command of this.commands) {
      command.handle()
    }

    void this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())
bot.init()
