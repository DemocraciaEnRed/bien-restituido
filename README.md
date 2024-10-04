![Header](./docs/der-logo.png)

# Bien Restituido

![Node Version](https://img.shields.io/badge/node-v18-red)
![License](https://img.shields.io/github/license/DemocraciaEnRed/bien-restituido)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Version](https://img.shields.io/github/v/release/DemocraciaEnRed/bien-restituido)

Bien Restituido es un proyecto desarrollado para el desmantelamiento patrimonial del crimen organizado y el fortalecimiento de la sociedad civil.

## ⚒️ Guía de instalación y ejecución

Hay 2 maneras de preparar el entorno para desarrollo. A través de Docker, o configurando el entorno de Node

### Docker

> #### ⚠️ Prerequisito
>
> Este entorno virtual requiere de tener [Docker](https://docs.docker.com/) instalado

#### Instalación

Abrí una terminal del sistema en el directorio raiz del proyecto y construí la imagen de docker

```bash
$ docker compose build
```

#### Ejecución

Abrí una terminal del sistema en el directorio raiz del proyecto y ejecutá la imagen en un contenedor

```bash
$ docker compose up
```

### Entorno de Node

> #### ⚠️ Prerequisitos
>
> Este entorno virtual requiere de:
>
> - [Node.js v18.0.0](https://nodejs.org/en/blog/release/v18.0.0/).

#### Instalación y Ejecución

Abrí una terminal del sistema en el directorio raiz del proyecto y ejecutá el proyecto.

```bash
$ npm install
$ npm run dev
```

## Estructura del Proyecto

```ruby
bien-restituido/
│
├── public/             # Archivos estáticos
├── src/                # Código fuente
│   ├── components/     # Componentes React
│   ├── utils/          # Utilidades y helpers
│   ├── middleware      # middleware Next.js
│   └── app/            # Páginas Next.js
│       └──api/         # api del proyecto
├── .eslintrc.json      # Configuración de ESLint
├── .gitignore          # Archivos y carpetas a ignorar por Git
├── next.config.mjs     # Configuración de Next.js
├── package.json        # Dependencias y scripts
├── README.md           # Documentación del proyecto
└── tailwind.config.js  # Configuración de Tailwind CSS
```

## 👷‍♀️ Cómo colaborar

Las contribuciones siempre son bienvenidas. Si te interesa contribuir a este proyecto y no estás seguro de por dónde empezar, preparamos esta [guía de colaboración](https://github.com/DemocraciaEnRed/.github/blob/main/docs/CONTRIBUTING.md).

## 📖 Documentación

Consulta la [documentación y estado del software](./docs) para obtener información detallada sobre el proyecto, estructura de archivos, y otros aspectos importantes.

## ⚖️ Licencia

El software se encuentra licensiado bajo [GPL-v3](./LICENSE). Creemos en la importancia del código abierto para la transformación social y fomentamos que la comunidad aporte de manera activa.

---

⌨️ con ❤️ por [DER](https://github.com/DemocraciaEnRed/)
