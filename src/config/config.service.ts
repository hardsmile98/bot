import { type DotenvParseOutput, config } from 'dotenv'
import { type IConfigService } from './config.interface'

export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput

  constructor () {
    const { error, parsed } = config()

    if (error != null) {
      throw new Error('No read env')
    }

    if (parsed == null) {
      throw new Error('env is empty')
    }

    this.config = parsed
  }

  get (key: string): string {
    const res = this.config[key]

    if (res.length === 0) {
      throw new Error('Not exist key')
    }

    return res
  }
}
