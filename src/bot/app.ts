require('dotenv').config()
import { Bot } from 'grammy'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import { textRouter } from './routes/'
import { getErrorHandling } from './errorHandling'
import {
    getHelpers,
    getRatelimiter,
    getThrottler,
    getI18n
} from './middlewares'
import type { IContext } from './models'
import { logger } from '../logger'

const bot = new Bot<IContext>(process.env.TOKEN || '')

export async function startBot() {
    bot.use(sequentialize())
        .use(ignoreOld())
        .use(getI18n())
        .use(getRatelimiter())
        .use(hydrateReply)
        .use(getHelpers())

    bot.api.config.use(getThrottler())
    bot.api.config.use(parseMode('HTML'))

    bot.catch(getErrorHandling())

    bot.on('message:text', textRouter)

    run(bot)
    logger.info('Bot started!')
}

export async function stopBot() {
    return bot.stop()
}
