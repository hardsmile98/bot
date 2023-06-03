import { type Telegraf } from 'telegraf'
import { Command } from '../Command'
import { type ILogger } from '../../logger'

export class InDeveloping extends Command {
  constructor (bot: Telegraf, logger: ILogger) {
    super(bot, logger)
  }

  handle (): void {
    // В разрботке
    this.bot.hears('🔐 Функции в разработке', async (ctx) => {
      this.logger.logAction('Функции в разработке', ctx.from)

      try {
        await ctx.deleteMessage()
        await ctx.replyWithPhoto(
          'https://i.ibb.co/pKB8GyK/15.png',
          {
            caption: '*⚡️ То, над чем мы сейчас работаем, перевернет полностью восприятие дизайн\\-индустрии*' + '\n \n' +
              'Мы работаем на 4 функциями, которые будут доступны уже в ближайшее время' + '\n \n' +
              '*1\\) Поиск клиентов*' + '\n' +
              '\— Ты сможешь запросто находить клиентов под свой запрос, а так же бот раз в неделю будет выдавать список из 100 горячих заказов' + '\n \n' +
              '*2\\) Продвижение*' + '\n' +
              '\— Ты сможешь выдвигать свою работу в топ позиции Behance, тем самым привлекая больше внимания, поднимая свою медийность и приобретая все больше новых клиентов' + '\n \n' +
              '*3\\) Tilda EXCLUSIVE*' + '\n' +
              '\— Ты сможешь воспользоваться всеми кастомизированными приватными элементами которые продаются \\- бесплатно' + '\n \n' +
              '*4\\) Midjourney*' + '\n' +
              '\— Ты сможешь запросто пользоваться midjourney прямо в боте не заплатив за это не рубля\\. Самая обсуждаемая функция, над которой мы трудимся',
            parse_mode: 'MarkdownV2'
          }
        )
      } catch (e) {
        this.logger.log('error in developing', 'error')
      }
    })
  }
}
