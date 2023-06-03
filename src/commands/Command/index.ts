import { Context, Markup, Telegraf } from "telegraf";
import { ILogger } from "../../logger";

export abstract class Command {
    constructor(public readonly bot: Telegraf, public readonly logger: ILogger) {}

    abstract handle(): void

    sendMenu(ctx: Context) {
        ctx.reply('↘️ Выберите функцию', Markup.keyboard([
            ['📥 Запросить файл'],
            ['💎 Полный доступ'],
            ['🔐 Функции в разработке'],
          ]).oneTime().resize())
    }
}