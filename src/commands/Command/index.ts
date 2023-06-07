import { type Bot } from '../../app'

export abstract class Command {
  constructor (
    public readonly bot: Bot
  ) {}

  abstract handle (): void
}
