import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "../Command";
import { ILogger } from "../../logger";

const SERVICES = {
    ui8net: 'ui8net',
    craftwork: 'craftwork',
    ls_graphics: 'ls_graphics',
    uihunt: 'uihunt',
    pixsellz: 'pixsellz',
    spline: 'spline'
}

export class Files extends Command {
    constructor(bot: Telegraf, logger: ILogger) {
        super(bot, logger);
    }

    handle(): void {
        this.bot.hears('📥 Запросить файл', async (ctx) => {
            this.logger.logAction('Запросить файл', ctx.from)
    
            await ctx.deleteMessage();
            await ctx.replyWithPhoto(
                "https://i.ibb.co/bJkm6w4/4.png",
                 {
                   caption: `*⚡️ Ты сможешь запросто скачать платный файл \\- бесплатно*` + "\n \n" +
                   '*Общая сумма файлов составляет более 150\\.000$*' + "\n \n" +
                   '1\\) Выбери сервис из которого необходим файл' + "\n \n" +
                   '2\\) Перейди на сайт сервиса и найди нужный файл' + "\n \n" +
                   '3\\) Скопируй ссылку на файл и вставь в бота' + "\n \n" +
                   '4\\) Готово\\! бот вышлет ссылку на скачивание',
                   parse_mode: 'MarkdownV2',
                   ...Markup.inlineKeyboard([ 
                    [
                        Markup.button.callback('UI8NET', SERVICES.ui8net),
                        Markup.button.callback('CRAFTWORK', SERVICES.craftwork)
                    ],
                    [
                        Markup.button.callback('LS. Graphics', SERVICES.ls_graphics),
                        Markup.button.callback('UIHUNT', SERVICES.uihunt)
                    ],
                    [
                        Markup.button.callback('Pixsellz', SERVICES.pixsellz),
                        Markup.button.callback('Spline.one', SERVICES.spline),
                    ],
                    [Markup.button.callback('Назад', 'menu')]
                  ]) 
                }
           )
        })

        this.bot.action([
            SERVICES.ui8net,
            SERVICES.craftwork,
            SERVICES.ls_graphics,
            SERVICES.uihunt,
            SERVICES.pixsellz,
            SERVICES.spline,
        ], ctx => {
            console.log('SELECT SERVICE')
        })

        this.bot.action('menu', async (ctx) => {
            this.sendMenu(ctx)
        })
    }
}