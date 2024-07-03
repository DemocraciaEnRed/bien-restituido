import React from 'react';
import {
    ArchiveRestore,
    HandCoins,
    LayoutPanelLeft,
    Recycle,
    Settings,
    SquareKanban,
    SquarePlus,
    User,
} from "lucide-react";


export const authTokenKey = process.env.NEXT_PUBLIC_AUTH_TOKENS_KEY


export const oneDay = 24 * 60 * 60 * 1000


export const userRoles = {
    USER: "user",
    MODERATOR: "moderator",
    ADMIN: "admin"
}


export const drawerList = [
    { url: "/bien", icon: <HandCoins />, text: "Bienes" },
    { url: "/subasta", icon: <SquareKanban />, text: "Subasta" },
    { url: "/reitilización", icon: <Recycle />, text: "Reitilización" },
    { url: "/archivados", icon: <ArchiveRestore />, text: "Archivados" },

    /* { url: "/usuarios", text: "Usuario" },
      */
];
export const settingDrawerList = [
    { url: "/categoria", icon: <SquarePlus />, text: "Categorias" },
    { url: "/perfil", icon: <User />, text: "Perfil" },
    { url: "/configuracion", icon: <Settings />, text: "Configuración" },
]

export const initialNewFieldState = {
    typeNewAttr: "",
    nameNewAttr: "",
    descriptionNewAttr: "",
    requiredNewAttr: false,
};

export const fieldsInputTypes = [
    {
        type: "text",
        friendlyName: "Texto",
        description: "Permite al usuario ingresar texto libre.",
    },
    {
        type: "password",
        friendlyName: "Contraseña",
        description: "Oculta el texto ingresado, ideal para contraseñas.",
    },
    {
        type: "email",
        friendlyName: "Email",
        description:
            "Valida que el texto ingresado sea una dirección de correo electrónico.",
    },
    {
        type: "number",
        friendlyName: "Numero",
        description:
            "Permite ingresar solo números, con opciones para definir un rango.",
    },
    {
        type: "tel",
        friendlyName: "Teléfono",
        description: "Permite ingresar un número de teléfono.",
    },
    {
        type: "url",
        friendlyName: "Dirección URL",
        description: "Valida que el texto ingresado sea una URL.",
    },
    {
        type: "date",
        friendlyName: "Fecha",
        description: "Proporciona un selector de fecha.",
    },
    {
        type: "time",
        friendlyName: "Hora",
        description: "Permite seleccionar una hora.",
    },
    {
        type: "color",
        friendlyName: "Color",
        description: "Proporciona un selector de color.",
    },
    {
        type: "search",
        friendlyName: "Busqueda",
        description: "Similar al texto, pero con diseño optimizado para búsquedas.",
    },
    {
        type: "file",
        friendlyName: "Archivo",
        description: "Permite al usuario seleccionar un archivo para cargar.",
    },
    {
        type: "checkbox",
        friendlyName: "si/no",
        description: "Permite seleccionar múltiples opciones.",
    },
    {
        type: "range",
        friendlyName: "rango",
        description: "Permite seleccionar un valor dentro de un rango definido.",
    },
    {
        type: "hidden",
        friendlyName: "oculto",
        description:
            "Campo que no es visible para el usuario pero que se envía con el formulario.",
    },
];