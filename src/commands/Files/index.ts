import { type Context, Markup } from 'telegraf'
import { Command } from '../Command'
import { escape } from '../../helpers'
import {
  services,
  dataServices,
  regexUrl,
  type IKeyMatchSevice
} from './constants'
import { type Bot } from '../../app'
import { type ServiceName } from '../../services/types'

export class Files extends Command {
  constructor (bot: Bot) {
    super(bot)
  }

  // Кнопки сервисов
  servicesButtons () {
    return [
      [
        Markup.button.callback('UI8NET', services['ui8.net']),
        Markup.button.callback('CRAFTWORK', services['craftwork.design'])
      ],
      [
        Markup.button.callback('LS. GRAPHICS', services['ls.graphics']),
        Markup.button.callback('UIHUNT', services['uihut.com'])
      ],
      [
        Markup.button.callback('PIXSELLZ', services['pixsellz.io']),
        Markup.button.callback('SPLINE.ONE', services['spline.one'])
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

  handle (): void {
    // Запросить файлы
    this.bot.bot.hears('📥 Запросить файл', async (ctx) => {
      this.bot.logger.logAction('Запросить файл', ctx.from)

      try {
        await ctx.deleteMessage()
        await this.selectServices(ctx)
      } catch (e) {
        this.bot.logger.log(`error in get files: ${e}`, 'error')
      }
    })

    // Кнопка сервиса
    this.bot.bot.action([
      services['ui8.net'],
      services['craftwork.design'],
      services['ls.graphics'],
      services['uihut.com'],
      services['pixsellz.io'],
      services['spline.one']
    ], async (ctx) => {
      const serviceName = ctx.match[0]
      this.bot.logger.logAction(serviceName, ctx.from)

      const info = dataServices[serviceName]

      if (info === undefined) {
        this.bot.logger.log('Info not search', 'error')
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
        this.bot.logger.log(`error in ${serviceName}, ${e}`, 'error')
      }
    })

    // Кнопка назад (выбор сервисов)
    this.bot.bot.action('select_services', async (ctx) => {
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
        this.bot.logger.log('error in select services', 'error')
      }
    })

    // Ответ на ссылку
    this.bot.bot.hears(regexUrl, async (ctx) => {
      const userId = String(ctx.update.message.from.id)

      const match = (ctx.match[0] as IKeyMatchSevice)
      const serviceName = match.replace('.', '_') as ServiceName
      const { image } = dataServices[match]

      try {
        const responsePlan = await this.bot.api?.getProfile(userId)

        const isPaid = responsePlan.plan === 'pro' || (responsePlan.plan === 'free' && responsePlan.requestsCount < 3)

        if (!isPaid) {
          await ctx.replyWithPhoto(
            image,
            {
              caption: '*⌛️У вас не оплачен доступ*' + '\n \n' +
              'Чтобы пользоваться всеми функциями и привилегиями бота, перейди в раздел оплаты бота и оплати тариф',
              parse_mode: 'MarkdownV2',
              ...Markup.inlineKeyboard([
                Markup.button.callback('Оплатить доступ', 'go_to_pay')
              ])
            }
          )
          return
        }
      } catch (e) {
        this.bot.logger.log(`error checkPaid in get url: ${e}`, 'error')
        return
      }

      try {
        const responseFile = await this.bot.api?.getFile(userId, ctx.update.message.text, serviceName)

        const { title, price, downloadUrl } = responseFile ?? {}

        await ctx.replyWithPhoto(
          'https://i.ibb.co/MNspL88/12.png',
          {
            caption: '*По вашему запросу найден файл*' + '\n \n' +
              `*${escape(title)}*` + '\n' +
              `Стоимость файла на сайте: ${escape(price)}` + '\n \n' +
              `📥 Скачать: [Выполнить загрузку](${escape(downloadUrl)})` + '\n \n' +
              '↘️ Вы можете скачать еще файл, вставив новую ссылку',
            parse_mode: 'MarkdownV2'
          }
        )
      } catch (e) {
        this.bot.logger.log(`error in get url: ${e}`, 'error')

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
      }
    })
  }
}
