import { Router } from '@grammyjs/router'
import { startHandler } from '../handlers'
import { IContext } from '../models'

export const textRouter = new Router<IContext>(({ msg }) => {
    if (msg?.text === '/start') {
        return 'start'
    }
})

textRouter.route('start', startHandler)

textRouter.otherwise((ctx) => ctx.reply('Empty route'))
