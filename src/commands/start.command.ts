import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { ILogger } from "../logger";

export class StartCommand extends Command {
    constructor(bot: Telegraf, logger: ILogger) {
        super(bot, logger);
    }

    handle(): void {
        this.bot.start(async (ctx) => {
            this.logger.logAction('Старт', ctx.update.message.from)

            const name = ctx.update.message.from.first_name;

            ctx.replyWithPhoto(
               "https://i.ibb.co/4jk1tyM/1.png",
                {
                  caption: `*Добро пожаловать, ${name}*` + "\n \n" +
                  '👾 C этой минуты ты, твои навыки и твоя жизнь не будет прежней' + "\n \n" +
                  'Ты попал в удивительный и уникальный в своем роде проект, который позволяет:' + "\n \n" +
                  '\\- Повысить чек на свои услуги' + "\n"  +
                  '\\- Начать зарабатывать от 150 тыс' + "\n" +
                  '\\- Иметь доступ к премиум материалам' + "\n" + 
                  '\\- Иметь классное окружение' + "\n \n" +
                  'Можно еще много перечислять, но самое важное с помощью этого бота ты улучишь свою жизнь через его функции',
                  parse_mode: 'MarkdownV2',
                  ...Markup.inlineKeyboard([ 
                    Markup.button.callback('Открыть функции', 'open_functions'), 
                  ]) 
                }
            )
        })

        this.bot.action('open_functions', async (ctx) => {
            this.logger.logAction('Открыть функции', ctx.from)

            ctx.replyWithPhoto(
                "https://i.ibb.co/68xZ109/2.png",
                 {
                   caption: '*На связи DesignBot*' + "\n \n" +
                   'Теперь тебе доступны мои функции' + "\n \n" +
                   '🎁 Только тсс\\.\\.\\. давай договоримся, нажав на кнопку ниже я даю тебе подарок в виде тестирования функций по 1 разу, а взамен получаю от тебя подписку' + "\n \n" +
                   '💜 Твоя поддержка улучшит меня и сэкономит тебе кучу денег и сил',
                   parse_mode: 'MarkdownV2',
                   ...Markup.inlineKeyboard([ 
                        Markup.button.callback('🎁 Получить подарок', 'get_gift')
                   ]) 
                 }
            )
        })
    }
}


