import { type Context, Markup, type Telegraf } from 'telegraf'
import { Command } from '../Command'
import { type ILogger } from '../../logger'
import { services, data, regexUrl } from './constants'
import { type IApi } from '../../services/api'

export class Files extends Command {
  constructor (bot: Telegraf, logger: ILogger, api: IApi) {
    super(bot, logger, api)
  }

  // Кнопки сервисов
  servicesButtons () {
    return [
      [
        Markup.button.callback('UI8NET', services.ui8net),
        Markup.button.callback('CRAFTWORK', services.craftwork)
      ],
      [
        Markup.button.callback('LS. GRAPHICS', services.ls_graphics),
        Markup.button.callback('UIHUNT', services.uihunt)
      ],
      [
        Markup.button.callback('PIXSELLZ', services.pixsellz),
        Markup.button.callback('SPLINE.ONE', services.spline)
      ]
    ]
  }

  //  Выбор сервиса
  async selectServices (ctx: Context): Promise<void> {
    await ctx.replyWithPhoto(
      'https://i.ibb.co/bJkm6w4/4.png',
      {
        caption: '*⚡️ Ты сможешь запросто скачать платный файл \\- бесплатно*' + '\n \n' +
          '*Общая сумма файлов составляет более 150\\.000$*' + '\n \n' +
          '1\\) Выбери сервис из которого необходим файл' + '\n \n' +
          '2\\) Перейди на сайт сервиса и найди нужный файл' + '\n \n' +
          '3\\) Скопируй ссылку на файл и вставь в бота' + '\n \n' +
          '4\\) Готово\\! бот вышлет ссылку на скачивание',
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: this.servicesButtons()
        }
      }
    )
  }

  async checkPaid (ctx: Context) {
    return true
  }

  handle (): void {
    // Запросить файлы
    this.bot.hears('📥 Запросить файл', async (ctx) => {
      this.logger.logAction('Запросить файл', ctx.from)

      try {
        await ctx.deleteMessage()
      } catch (e) {
        this.logger.log(`error in get files: ${e}`, 'error')
      }

      try {
        const isPaid = await this.checkPaid(ctx)

        if (!isPaid) return
      } catch (e) {
        this.logger.log(`error checkPaid in get files: ${e}`, 'error')
        return
      }

      try {
        await this.selectServices(ctx)
      } catch (e) {
        this.logger.log(`error in get files: ${e}`, 'error')
      }
    })

    // Кнопка сервиса
    this.bot.action([
      services.ui8net,
      services.craftwork,
      services.ls_graphics,
      services.uihunt,
      services.pixsellz,
      services.spline
    ], async (ctx) => {
      const serviceName = ctx.match[0]
      this.logger.logAction(serviceName, ctx.from)

      const info = data[serviceName]

      if (info === undefined) {
        this.logger.log('Info not search', 'error')
      }

      try {
        await ctx.editMessageMedia({
          media: info.image,
          type: 'photo',
          caption: `*Ты выбрал сервис ${info.title}*` + '\n \n' +
            `[Перейдите на сайт](${info.url}) и скопируй ссылку файла` + '\n \n' +
            '📄 Далее вставь ссылку в чат бота и пошли ее',
          parse_mode: 'MarkdownV2'
        })

        await ctx.editMessageReplyMarkup({
          inline_keyboard: [
            [Markup.button.callback('⬅️ Выбрать другой сервис', 'select_services')]
          ]
        })
      } catch (e) {
        this.logger.log(`error in ${serviceName}, ${e}`, 'error')
      }
    })

    // Кнопка назад (выбор сервисов)
    this.bot.action('select_services', async (ctx) => {
      try {
        await ctx.editMessageMedia({
          media: 'https://i.ibb.co/bJkm6w4/4.png',
          type: 'photo',
          caption: '*⚡️ Ты сможешь запросто скачать платный файл \\- бесплатно*' + '\n \n' +
            '*Общая сумма файлов составляет более 150\\.000$*' + '\n \n' +
            '1\\) Выбери сервис из которого необходим файл' + '\n \n' +
            '2\\) Перейди на сайт сервиса и найди нужный файл' + '\n \n' +
            '3\\) Скопируй ссылку на файл и вставь в бота' + '\n \n' +
            '4\\) Готово\\! бот вышлет ссылку на скачивание',
          parse_mode: 'MarkdownV2'
        })

        await ctx.editMessageReplyMarkup({
          inline_keyboard: this.servicesButtons()
        })
      } catch (e) {
        this.logger.log('error in select services', 'error')
      }
    })

    // Ответ на ссылку
    this.bot.hears(regexUrl, async (ctx) => {
      try {
        const isPaid = await this.checkPaid(ctx)

        if (!isPaid) return
      } catch (e) {
        this.logger.log(`error checkPaid in get url: ${e}`, 'error')
        return
      }

      const match = ctx.match[0]
      console.log(match)

      const isFound = false

      try {
        if (!isFound) {
          await ctx.replyWithPhoto(
            'https://i.ibb.co/C2GvWmt/13.png',
            {
              caption: '*📂 По вашему запросу файл не найден*' + '\n \n' +
                'Мы взяли в работу данный файл, бот автоматически выдаст его как только мы добавим его в нашу базу или решим проблему с ним' + '\n \n' +
                '\\(обновление происходит каждый день\\)' + '\n \n' +
                '↘️ Вы можете скачать другой файл, вставив новую ссылку',
              parse_mode: 'MarkdownV2'
            }
          )

          return
        }
      } catch (e) {
        this.logger.log(`error in get url: ${e}`, 'error')
        return
      }

      try {
        await ctx.replyWithPhoto(
          'https://i.ibb.co/MNspL88/12.png',
          {
            caption: '*По вашему запросу найден файл*' + '\n \n' +
              '*Hand\\-hand Handsome*' + '\n' +
              'Стоимость файла на сайте: 10$' + '\n \n' +
              '📥 Скачать: [Выполнить загрузку](https://ui8.net)' + '\n \n' +
              '↘️ Вы можете скачать еще файл, вставив новую ссылку',
            parse_mode: 'MarkdownV2'
          }
        )
      } catch (e) {
        this.logger.log(`error in get url: ${e}`, 'error')
      }
    })
  }
}
