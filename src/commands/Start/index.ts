import { Markup } from 'telegraf'
import { Command } from '../Command'
import { type Bot } from '../../app'

export class StartCommand extends Command {
  constructor (bot: Bot) {
    super(bot)
  }

  handle (): void {
    // Старт
    this.bot.bot.start(async (ctx) => {
      this.bot.logger.logAction('Старт', ctx.update.message.from)

      const name = ctx.update.message.from.first_name
      try {
        void this.bot.api?.start({
          chatId: String(ctx.update.message.chat.id),
          firstName: ctx.update.message.from.first_name,
          lastName: ctx.update.message.from.last_name,
          userName: ctx.update.message.from.username
        })

        await ctx.replyWithPhoto(
          'https://i.ibb.co/4jk1tyM/1.png',
          {
            caption: `*Добро пожаловать, ${name}*` + '\n \n' +
                '👾 C этой минуты ты, твои навыки и твоя жизнь не будет прежней' + '\n \n' +
                'Ты попал в удивительный и уникальный в своем роде проект, который позволяет:' + '\n \n' +
                '\— Повысить чек на свои услуги' + '\n' +
                '\— Начать зарабатывать от 150 тыс' + '\n' +
                '\— Иметь доступ к премиум материалам' + '\n' +
                '\— Иметь классное окружение' + '\n \n' +
                'Можно еще много перечислять, но самое важное с помощью этого бота ты улучишь свою жизнь через его функции',
            parse_mode: 'MarkdownV2',
            ...Markup.inlineKeyboard([
              Markup.button.callback('Открыть функции', 'open_functions')
            ])
          }
        )
      } catch (e) {
        this.bot.logger.log('error in start', 'error')
      }
    })

    // Открыть функции
    this.bot.bot.action('open_functions', async (ctx) => {
      this.bot.logger.logAction('Открыть функции', ctx.from)

      try {
        await ctx.replyWithPhoto(
          'https://i.ibb.co/68xZ109/2.png',
          {
            caption: '*На связи DesignBot*' + '\n \n' +
                   'Теперь тебе доступны мои функции' + '\n \n' +
                   '🎁 Только тсс\\.\\.\\. давай договоримся, нажав на кнопку ниже я даю тебе подарок в виде тестирования функций, а взамен получаю от тебя подписку' + '\n \n' +
                   '💜 Твоя поддержка улучшит меня и сэкономит тебе кучу денег и сил',
            parse_mode: 'MarkdownV2',
            ...Markup.inlineKeyboard([
              Markup.button.callback('🎁 Получить подарок', 'get_gift')
            ])
          }
        )

        await ctx.reply('↘️ Выберите функцию', Markup.keyboard([
          ['📥 Запросить файл'],
          ['💎 Полный доступ'],
          ['🔐 Функции в разработке']
        ]).resize())
      } catch (e) {
        this.bot.logger.log(`error in open functions: ${e}`, 'error')
      }
    })

    // Получить подарок
    this.bot.bot.action('get_gift', async (ctx) => {
      this.bot.logger.logAction('Получить подарок', ctx.from)

      try {
        void this.bot.api?.getGift(String(ctx.update.callback_query.from.id))

        await ctx.editMessageMedia({
          media: 'https://i.ibb.co/Hq2VBvt/3.png',
          type: 'photo',
          caption: '*Отлично\\! 🎉*' + '\n \n' +
              'Твой подарок открыт \\- тебе доступны 3 попытки использовать функции' + '\n \n' +
              '👾 Буду рад оказать их максимально круто' + '\n \n' +
              '\\*На данный момент доступна функция запроса файла',
          parse_mode: 'MarkdownV2'
        })
      } catch (e) {
        this.bot.logger.log(`error in get gift: ${e}', 'error`)
      }
    })
  }
}
