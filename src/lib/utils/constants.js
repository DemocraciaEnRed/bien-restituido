import {
    ArchiveRestore,
    HandCoins,
    LayoutPanelLeft,
    Recycle,
    Settings,
    SquareKanban,
    User,
} from "lucide-react";

import crypto from 'crypto'

export const authTokenKey = process.env.NEXT_PUBLIC_AUTH_TOKENS_KEY


export const oneDay = 24 * 60 * 60 * 1000

export const userRoles = {
    USER: "user",
    MODERATOR: "moderator",
    ADMIN: "admin"
}
