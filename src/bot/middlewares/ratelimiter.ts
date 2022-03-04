import { limit } from '@grammyjs/ratelimiter'
import { IContext } from '../models'

const options = {
    timeFrame: 500,

    limit: 1,

    // TODO
    onLimitExceeded: (ctx: IContext) => {
        ctx?.reply('Please refrain from sending too many requests!')
    },

    keyGenerator: (ctx: IContext) => {
        return ctx.from?.id.toString()
    }
}

export function getRatelimiter() {
    return limit(options)
}
