require('dotenv').config()
import { Bot } from 'grammy'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import { autoRetry } from '@grammyjs/auto-retry'
import { textRouter } from './routes/'
import { getErrorHandling } from './errorHandling'
import { getHelpers, getI18n } from './middlewares'
import type { IContext } from './models'
import { logger } from '../logger'

const bot = new Bot<IContext>(process.env.TOKEN || '')

export async function startBot() {
    // @ts-ignore
    bot.use(sequentialize())
    // @ts-ignore
        .use(ignoreOld())
        .use(getI18n())
        .use(hydrateReply)
        .use(getHelpers())

    bot.api.config.use(parseMode('HTML'))
    bot.api.config.use(autoRetry())

    bot.catch(getErrorHandling())

    bot.on('message:text', textRouter)

    bot.start()
    logger.info('Bot started!')
}

export async function stopBot() {
    return bot.stop()
}
