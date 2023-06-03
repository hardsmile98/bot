import { Telegraf, session } from 'telegraf'
import { type IConfigService } from './config/config.interface'
import { ConfigService } from './config/config.service'
import { type Command } from './commands/Command'
import { StartCommand } from './commands/Start'
import { type ILogger, Logger } from './logger'
import { InDeveloping } from './commands/InDeveloping'
import { Pay } from './commands/Pay'
import { Files } from './commands/Files'

class Bot {
  bot: Telegraf
  logger: ILogger
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf(this.configService.get('TOKEN'))
    this.bot.use(session())
    this.logger = new Logger()
  }

  init () {
    this.commands = [
      new StartCommand(this.bot, this.logger),
      new InDeveloping(this.bot, this.logger),
      new Pay(this.bot, this.logger),
      new Files(this.bot, this.logger)
    ]

    for (const command of this.commands) {
      command.handle()
    }

    void this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())
bot.init()
