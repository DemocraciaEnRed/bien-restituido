import {
    ArchiveRestore,
    HandCoins,
    LayoutPanelLeft,
    Recycle,
    Settings,
    SquareKanban,
    User,
} from "lucide-react";


export const authTokenKey = process.env.NEXT_PUBLIC_AUTH_TOKENS_KEY
export const authTokenUser = "RES_USER";


export const userRoles = {
    USER: "user",
    MODERATOR: "moderator",
    ADMIN: "admin"
}

export const drawerList = [
    { url: "/bien", icon: <HandCoins />, text: "Bienes" },
    { url: "/tipo-bien", icon: <LayoutPanelLeft />, text: "Tipos de bien" },
    { url: "/subasta", icon: <SquareKanban />, text: "Subasta" },
    { url: "/reitilización", icon: <Recycle />, text: "Reitilización" },
    { url: "/archivados", icon: <ArchiveRestore />, text: "Archivados" },

    /* { url: "/usuarios", text: "Usuario" },
      */
];
export const settingDrawerList = [
    { url: "/perfil", icon: <User />, text: "Perfil" },
    { url: "/configuracion", icon: <Settings />, text: "Configuración" },
]