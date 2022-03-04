import { IContext } from '../models'

export async function startHandler({ from, reply, i18n }: IContext) {
    if (from?.id) {
        reply(i18n.t('hello'))
    }
}
