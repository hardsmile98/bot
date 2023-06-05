import { Markup, type Telegraf } from 'telegraf'
import { Command } from '../Command'
import { type ILogger } from '../../logger'
import { type IApi } from '../../services/api'

export class StartCommand extends Command {
  constructor (bot: Telegraf, logger: ILogger, api: IApi) {
    super(bot, logger, api)
  }

  handle (): void {
    // Старт
    this.bot.start(async (ctx) => {
      this.logger.logAction('Старт', ctx.update.message.from)

      const name = ctx.update.message.from.first_name
      try {
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
        this.logger.log('error in start', 'error')
      }
    })

    // Открыть функции
    this.bot.action('open_functions', async (ctx) => {
      this.logger.logAction('Открыть функции', ctx.from)

      try {
        await ctx.replyWithPhoto(
          'https://i.ibb.co/68xZ109/2.png',
          {
            caption: '*На связи DesignBot*' + '\n \n' +
                   'Теперь тебе доступны мои функции' + '\n \n' +
                   '🎁 Только тсс\\.\\.\\. давай договоримся, нажав на кнопку ниже я даю тебе подарок в виде тестирования функций по 1 разу, а взамен получаю от тебя подписку' + '\n \n' +
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
        this.logger.log(`error in open functions: ${e}`, 'error')
      }
    })

    // Получить подарок
    this.bot.action('get_gift', async (ctx) => {
      this.logger.logAction('Получить подарок', ctx.from)

      try {
        await ctx.editMessageMedia({
          media: 'https://i.ibb.co/Hq2VBvt/3.png',
          type: 'photo',
          caption: '*Отлично\\! 🎉*' + '\n \n' +
              'Твой подарок открыт \\- используй каждую мою функцию 1 раз' + '\n \n' +
              '👾 Буду рад оказать их максимально круто' + '\n \n' +
              '\\*На данный момент доступна функция запроса файла',
          parse_mode: 'MarkdownV2'
        })
      } catch (e) {
        this.logger.log(`error in get gift: ${e}', 'error`)
      }
    })
  }
}
