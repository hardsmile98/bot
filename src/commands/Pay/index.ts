import { Markup, Telegraf } from "telegraf";
import { Command } from "../Command";
import { ILogger } from "../../logger";

export class Pay extends Command {
    constructor(bot: Telegraf, logger: ILogger) {
        super(bot, logger);
    }

    handle(): void {
        this.bot.hears('💎 Полный доступ', async (ctx) => {
            this.logger.logAction('Полный доступ', ctx.from)

            await ctx.deleteMessage();
            await ctx.replyWithPhoto(
                "https://i.ibb.co/XDQ1pPC/14.png",
                 {
                   caption: `*👾 Чтобы пользоваться всеми функциями и привилегиями бота, необходимо оплатить доступ*` + "\n \n" +
                   '💵 Стоимость доступа составляет *всего \\- 3500 ₽ в год*' + "\n \n" +
                   'Средства идут на поддержание крупных серверов, разработку ИИ, гипотез новых идей и обновлений бота' + "\n \n" +
                   'В стоимость входит:' + '\n' +
                   '\— Полное открытие всех функций бота \\(Которые сейчас доступны и которые будут доступны после релиза\\)' + '\n' +
                   '\— Годовой доступ к боту' + '\n' +
                   '\— Доступ в закрытый клуб топ дизайнеров',
                   parse_mode: 'MarkdownV2',
                   ...Markup.inlineKeyboard([ 
                    Markup.button.callback('💸 Оплатить - 3500 ₽', 'pay_url'),
                  ]) 
                }
           )
        })
    }
}