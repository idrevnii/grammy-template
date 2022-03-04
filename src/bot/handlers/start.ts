import { IContext } from '../models'

export async function startHandler(ctx: IContext) {
    if (ctx.from?.id) {
        ctx.reply(ctx.i18n.t('hello'))
    }
}
