import { Context, Markup, Telegraf } from "telegraf";
import { ILogger } from "../../logger";

export abstract class Command {
    constructor(public readonly bot: Telegraf, public readonly logger: ILogger) {}

    abstract handle(): void
}