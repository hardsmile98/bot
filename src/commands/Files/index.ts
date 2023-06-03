import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "../Command";
import { ILogger } from "../../logger";
import { services, data } from "./constants";

export class Files extends Command {
    constructor(bot: Telegraf, logger: ILogger) {
        super(bot, logger);
    }

    servicesButtons() {
        return [ 
            [
                Markup.button.callback('UI8NET', services.ui8net),
                Markup.button.callback('CRAFTWORK', services.craftwork)
            ],
            [
                Markup.button.callback('LS. Graphics', services.ls_graphics),
                Markup.button.callback('UIHUNT', services.uihunt)
            ],
            [
                Markup.button.callback('Pixsellz', services.pixsellz),
                Markup.button.callback('Spline.one', services.spline),
            ],
            [Markup.button.callback('⬅️ Назад', 'menu')]
          ]
    }

    async selectServices(ctx: Context) {
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
               reply_markup: {
                inline_keyboard: this.servicesButtons()
               }
            }
       )
    }

    handle(): void {
        this.bot.hears('📥 Запросить файл', async (ctx) => {
            this.logger.logAction('Запросить файл', ctx.from)
    
            await ctx.deleteMessage();
            await this.selectServices(ctx)
        })

        this.bot.action([
            services.ui8net,
            services.craftwork,
            services.ls_graphics,
            services.uihunt,
            services.pixsellz,
            services.spline,
        ], async (ctx) => {
            const serviceName = ctx.match[0];
            this.logger.logAction(serviceName, ctx.from)

            const info = data[serviceName];

            if(!info) {
                this.logger.log('Info not search', 'error')
            }
            
            await ctx.editMessageMedia({
                media: info.image,
                type: 'photo',
                caption: `*Ты выбрал сервис ${info.title}*` + "\n \n" +
                `[Перейдите на сайт](${info.url}) и скопируй ссылку файла` + "\n \n" +
                '📄 Далее вставь ссылку в чат бота и пошли ее',
                parse_mode: 'MarkdownV2',
            })

            await ctx.editMessageReplyMarkup({
                inline_keyboard: [
                  [Markup.button.callback('⬅️ Выбрать другой сервис', 'select_services')]
                ],
            });
        })

        this.bot.action('select_services', async (ctx) => {
            await ctx.editMessageMedia({
                media: "https://i.ibb.co/bJkm6w4/4.png",
                type: 'photo',
                caption: `*⚡️ Ты сможешь запросто скачать платный файл \\- бесплатно*` + "\n \n" +
                '*Общая сумма файлов составляет более 150\\.000$*' + "\n \n" +
                '1\\) Выбери сервис из которого необходим файл' + "\n \n" +
                '2\\) Перейди на сайт сервиса и найди нужный файл' + "\n \n" +
                '3\\) Скопируй ссылку на файл и вставь в бота' + "\n \n" +
                '4\\) Готово\\! бот вышлет ссылку на скачивание',
                parse_mode: 'MarkdownV2',
            })

            await ctx.editMessageReplyMarkup({
                inline_keyboard: this.servicesButtons(),
            })
        })

        this.bot.action('menu', async (ctx) => {
            this.sendMenu(ctx)
        })
    }
}