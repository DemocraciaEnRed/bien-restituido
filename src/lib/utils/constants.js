import {
    FaCar,
    FaGears,
    FaMotorcycle,
    FaShop,
    FaTractor,
} from "react-icons/fa6";

export const authTokenKey = process.env.NEXT_PUBLIC_AUTH_TOKENS_KEY

export const oneDay = 24 * 60 * 60 * 1000

export const userRoles = {
    USER: "user",
    MODERATOR: "moderator",
    ADMIN: "admin"
}

export const showCardOptions = {
    ALLWAYS: { value: 'ALLWAYS', name: 'Siempre' },
    EXPANDED: { value: 'EXPANDED', name: 'Ampliado' },
    NO: { value: 'NO', name: 'No' },
}

export const fontAwesomeIcons = [
    { name: "car", icon: <FaCar className="inline-block" size={20} /> },
    { name: "tractor", icon: <FaTractor className="inline-block" size={20} /> },
    { name: "gear", icon: <FaGears className="inline-block" size={20} /> },
    { name: "motorcycle", icon: <FaMotorcycle className="inline-block" size={20} /> },
    { name: "shop", icon: <FaShop className="inline-block" size={20} /> },
];

export const fieldsInputTypes = [
    {
        type: "text",
        friendlyName: "Texto",
        description: "Permite al usuario ingresar texto libre.",
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

];

export const assetDestination = [
    { value: 'auction', name: 'Subasta' },
    { value: 'reuse', name: 'Reutilización' },
    { value: 'Testing', name: 'Objeto de prueba' }
]

export const actorType = [
    { value: 'victim', name: 'Victima' },
    { value: 'civil-actor', name: 'Actor civil' },
]