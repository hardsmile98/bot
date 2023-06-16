import { type Context, Markup } from 'telegraf'
import { Command } from '../Command'
import { type Bot } from '../../app'
import { escape } from '../../helpers'

export class Pay extends Command {
  constructor (bot: Bot) {
    super(bot)
  }

  async sendPayUrl (ctx: Context, userId: string, url: string, uuid: string) {
    const message = await ctx.replyWithPhoto(
      'https://i.ibb.co/XDQ1pPC/14.png',
      {
        caption: '*👾 Чтобы пользоваться всеми функциями и привилегиями бота, необходимо оплатить доступ*' + '\n \n' +
            '💵 Стоимость доступа составляет *всего \\- 3500 ₽ в год*' + '\n \n' +
            'Средства идут на поддержание крупных серверов, разработку ИИ, гипотез новых идей и обновлений бота' + '\n \n' +
            'В стоимость входит:' + '\n' +
            '\— Полное открытие всех функций бота \\(Которые сейчас доступны и которые будут доступны после релиза\\)' + '\n' +
            '\— Годовой доступ к боту' + '\n' +
            '\— Доступ в закрытый клуб топ дизайнеров' + '\n\n' +
            '\\* После оплаты нажмите кнопку *"Проверить оплату"*',
        parse_mode: 'MarkdownV2',
        ...Markup.inlineKeyboard([
          [Markup.button.url('💸 Оплатить - 3500 ₽', url)],
          [Markup.button.callback('✅ Проверить оплату', 'check_pay')]
        ])
      }
    )
    await this.bot.api.savePayment(uuid, userId, String(message.message_id))
  }

  handle (): void {
    // Получить доступ
    this.bot.bot.hears('💎 Полный доступ', async (ctx) => {
      this.bot.logger.logAction('Полный доступ', ctx.from)

      try {
        const responsePaid = await this.bot.api?.getProfile(String(ctx.update.message.from.id))

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
        this.bot.logger.log(`error in pay (chekPlan): ${e}`, 'error')
        return
      }

      try {
        const payments = await this.bot.api.createPayment(
          String(ctx.update.message.from.id)
        )

        await this.sendPayUrl(
          ctx,
          String(ctx.update.message.from.id),
          payments.confirmation.confirmation_url,
          payments.id
        )
      } catch (e) {
        this.bot.logger.log(`error in pay (createPayment): ${e}`, 'error')
      }
    })

    this.bot.bot.action('go_to_pay', async ctx => {
      this.bot.logger.logAction('Перейти в оплату', ctx.from)

      try {
        const payments = await this.bot.api.createPayment(
          String(ctx.update.callback_query.from.id)
        )

        await this.sendPayUrl(
          ctx,
          String(ctx.update.callback_query.from.id),
          payments.confirmation.confirmation_url,
          payments.id
        )
      } catch (e) {
        this.bot.logger.log(`error in go to pay: ${e}`, 'error')
      }
    })

    this.bot.bot.action('check_pay', async ctx => {
      this.bot.logger.logAction('Проверка оплаты', ctx.from)

      try {
        const { isPaid, confirmationUrl } = await this.bot.api.checkPayment(
          String(ctx.update.callback_query.from.id),
          String(ctx.update.callback_query.message?.message_id)
        )

        if (isPaid) {
          await ctx.editMessageMedia({
            media: 'https://i.ibb.co/zmZHNYM/16.png',
            type: 'photo',
            caption: '*🎉 У вас уже оплачен доступ*' + '\n \n' +
                'Тебе доступны все функции бота и ты запросто можешь ими пользоваться без ограничений',
            parse_mode: 'MarkdownV2'
          })
        } else {
          await ctx.editMessageMedia({
            media: 'https://i.ibb.co/NL38Bm4/17.png',
            type: 'photo',
            caption: '*❌ Платёж не прошёл или возникли технические неполадки*' + '\n \n' +
                `Попробуй оплатить [заново](${escape(confirmationUrl)})` + '\n \n' +
                'Или обратись в тех\\.поддержку @toqmen',
            parse_mode: 'MarkdownV2'
          })

          await ctx.editMessageReplyMarkup({
            inline_keyboard: [[
              Markup.button.callback('✅ Проверить оплату', 'check_pay')
            ]]
          })
        }
      } catch (e) {
        this.bot.logger.log(`error in check pay: ${e}`, 'error')
      }
    })
  }
}
