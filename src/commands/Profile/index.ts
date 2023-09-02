import { format, addYears } from 'date-fns'
import { Command } from '../Command'
import { type Bot } from '../../app'
import { escape } from '../../helpers'
import { Markup } from 'telegraf'

export class Profile extends Command {
  constructor (bot: Bot) {
    super(bot)
  }

  handle (): void {
    // Мой аккаунт
    this.bot.bot.hears('👾 Мой аккаунт', async (ctx) => {
      this.bot.logger.logAction('Мой аккаунт', ctx.from)

      try {
        await ctx.deleteMessage()

        const {
          savedMoney,
          requestsCount,
          planDate,
          plan
        } = await this.bot.api.getProfile(String(ctx.update.message.from.id))

        const isPaid = plan === 'pro'

        if (!isPaid) {
          await ctx.reply('↘️ Выберите функцию', Markup.keyboard([
            ['📥 Запросить файл'],
            ['💎 Полный доступ'],
            ['🔐 Функции в разработке']
          ]).resize())
        }

        const formattedStartDate = planDate ? format(new Date(planDate), 'dd-MM-yyyy') : ''
        const formattedEndDate = planDate ? format(addYears(new Date(planDate), 1), 'dd-MM-yyyy') : ''

        await ctx.replyWithPhoto(
          'https://i.ibb.co/pKB8GyK/15.png',
          {
            caption: '*💬 Информация о вашей подписке DesignBot*' + '\n\n' +
            `🔋 Начало подписки: ${isPaid ? escape(formattedStartDate) : 'нет подписки'}` + '\n' +
            `⏳ Конец подписки: ${isPaid ? escape(formattedEndDate) : 'нет подписки'}` + '\n\n' +
            '🔎 Статистика запросов:' + '\n' +
            `Выполнено: *${requestsCount}*` + '\n' +
            `Сэкономлено с DesignBot: *${savedMoney}$*`,
            parse_mode: 'MarkdownV2'
          }
        )
      } catch (e) {
        this.bot.logger.log(`error in my account: ${e}`, 'error')
      }
    })
  }
}
