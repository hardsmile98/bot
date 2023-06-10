import { type Context, Markup } from 'telegraf'
import { Command } from '../Command'
import { type Bot } from '../../app'

export class Pay extends Command {
  constructor (bot: Bot) {
    super(bot)
  }

  async sendPayUrl (ctx: Context) {
    await ctx.replyWithPhoto(
      'https://i.ibb.co/XDQ1pPC/14.png',
      {
        caption: '*👾 Чтобы пользоваться всеми функциями и привилегиями бота, необходимо оплатить доступ*' + '\n \n' +
            '💵 Стоимость доступа составляет *всего \\- 3500 ₽ в год*' + '\n \n' +
            'Средства идут на поддержание крупных серверов, разработку ИИ, гипотез новых идей и обновлений бота' + '\n \n' +
            'В стоимость входит:' + '\n' +
            '\— Полное открытие всех функций бота \\(Которые сейчас доступны и которые будут доступны после релиза\\)' + '\n' +
            '\— Годовой доступ к боту' + '\n' +
            '\— Доступ в закрытый клуб топ дизайнеров',
        parse_mode: 'MarkdownV2',
        ...Markup.inlineKeyboard([
          Markup.button.callback('💸 Оплатить - 3500 ₽', 'pay_url')
        ])
      }
    )
  }

  handle (): void {
    // Получить доступ
    this.bot.bot.hears('💎 Полный доступ', async (ctx) => {
      this.bot.logger.logAction('Полный доступ', ctx.from)

      try {
        const responsePaid = await this.bot.api?.checkPlan(String(ctx.update.message.from.id))

        await ctx.deleteMessage()

        if (responsePaid.plan === 'pro') {
          await ctx.replyWithPhoto(
            'https://i.ibb.co/zmZHNYM/16.png',
            {
              caption: '*🎉 У вас уже оплачен доступ*' + '\n \n' +
                'Тебе доступны все функции бота и ты запросто можешь ими пользоваться без ограничений',
              parse_mode: 'MarkdownV2'
            }
          )
          return
        }
      } catch (e) {
        this.bot.logger.log(`error in pay: ${e}`, 'error')
        return
      }

      try {
        await this.sendPayUrl(ctx)
      } catch (e) {
        this.bot.logger.log(`error in pay: ${e}`, 'error')
      }
    })

    this.bot.bot.action('go_to_pay', async ctx => {
      this.bot.logger.logAction('Перейти в оплату', ctx.from)
      await this.sendPayUrl(ctx)
    })
  }
}
