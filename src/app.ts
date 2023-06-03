import { Telegraf, session } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service"
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { ILogger, Logger } from "./logger";

class Bot {
    bot: Telegraf
    logger: ILogger
    commands: Command[] = []

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf(this.configService.get('TOKEN'));
        this.bot.use(session());
        this.logger = new Logger();
    }

    init() {
        
        this.commands = [
            new StartCommand(this.bot, this.logger),
        ]

        for(const command of this.commands) {
            command.handle()
        }

        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService())
bot.init();