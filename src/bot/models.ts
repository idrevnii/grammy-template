import type { Context as BaseContext } from 'grammy'
import type { I18nContextFlavor } from '@grammyjs/i18n/dist/source'
import type { ParseModeContext } from '@grammyjs/parse-mode'
import type { User as TelegramUser } from '@grammyjs/types'
import type { User } from '@prisma/client'

type HelpersContext = {
    whois: (from?: TelegramUser) => string
}

type DatabseContext = {
    user: User
}

export type IContext = BaseContext &
    I18nContextFlavor &
    ParseModeContext &
    HelpersContext &
    DatabseContext
