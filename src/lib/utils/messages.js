export const messages = {
  "error": {
    "default": "Ocurrió un error inesperado."
  },
  "auth": {
    "error": {
      "invalidCredentials": "El email o contraseña son incorrectos",
      "unverified": "La cuenta aún no ha ha sido verificada",
      "alreadyLoggedIn": "Acceso no autorizado - Ya ha iniciado sesión",
      "unauthorized": "Acceso no autorizado",
      "noToken": "Acceso no autorizado - No se encontró token",
      "forbidden": "Acceso no autorizado - No cuenta con permiso para acceder a este recurso",
      "alreadyVerified": "La cuenta ya ha sido verificada",
      "tokenNotFound": "El token no fue encontrado o pudo haber expirado. Por favor, solicite un nuevo token",
      "userNotFound": "Usuario no encontrado",
      "emailNotFound": "El email no fue encontrado o es incorrecto",
      "emailNotAssociated": "La direccion de email {0} no se encuentra asociada a ninguna cuenta. Por favor, verifique que la dirección sea correcta",
      "emailAssociated": "La dirección de correo electrónico que has ingresado ya está asociada con otra cuenta."
    },
    "success": {
      "login": "Sesión iniciada correctamente",
      "logout": "Sesión cerrada correctamente",
      "signup": "Cuenta creada correctamente",
      "passwordUpdated": "Contraseña actualizada correctamente",
      "verification": "Cuenta verificada correctamente. Por favor, inicie sesión",
      "verificationMailSent": "Un email de verificación ha sido enviado a su dirección de correo {0}",
      "verificationMailResent": "Un nuevo email de verificación ha sido enviado a su dirección de correo {0}",
      "resetMailSent": "Un email con instrucciones para restablecer su contraseña ha sido enviado a su dirección de correo {0}"
    }
  },
  "user": {
    "error": {
      "notFound": "Usuario no encontrado",
      "notAvailable": "El usuario no se encuentra disponible",
      "notAllowed": "No tienes permiso para ver este usuario",
      "invalidPassword": "La contraseña no es válida"
    },
    "success": {
      "updated": "Usuario actualizado correctamente",
      "passwordUpdated": "Contraseña actualizada correctamente",
      "verified": "Usuario verificado correctamente",
      "emailAndUserVerified": "Usuario y email verificados correctamente",
      "emailChanged": "Email cambiado correctamente. Un email de verificación ha sido enviado a su nueva dirección de correo {0}"
    }
  },
  "validationError": {
    "Invalid value": "Valor inválido",
    "mongoId": "El id no es válido",
    "defaultMessage": "Hubo un error validando los datos",
    "projectId": "El id o slug del proyecto no es válido",
    "version": "El numero de version no es válido",
    "email": "El email no es válido",
    "password": "La contraseña no es valida (debe tener al menos 6 caracteres)",
    "name": "El nombre no es valido",
    "date": "La fecha no es válida, debe ser ISO 8601, o sea, YYYY-MM-DD",
    "role": "El rol no es válido",
    "integer": "El valor debe ser un número entero",
    "boolean": "El valor debe ser true o false",
    "string": "El valor debe ser una cadena de caracteres",
    "page": "Debe ser un numero entero mayor o igual a 1",
    "limit": "Debe ser un numero entero entre 1 y 25",
    "query": "El parametro query debe ser un string",
    "text": "El contenido no es un texto valido",
    "text_es": "El contenido en español no es válido",
    "text_pt": "El contenido en portugués no es válido",
    "title_es": "El título en español no es válido",
    "title_pt": "El título en portugués no es válido",
    "about_es": "El resumen en español no es válido",
    "about_pt": "El resumen en portugués no es válido",
    "shortAbout_es": "El resumen corto en español no es válido",
    "shortAbout_pt": "El resumen corto en portugués no es válido",
    "authorNotes_es": "Las notas del autor en español no son válidas",
    "authorNotes_pt": "Las notas del autor en portugués no son válidas",
    "slug": "El slug debe ser una cadena de caracteres alfanuméricos separados por guiones",
    "coverUrl": "La url de la imagen de portada no es válida",
    "stage": "El valor no es valido, debe ser uno de estos: MX, BR, CH, AR",
    "youtubeUrl": "El id del video de youtube no es válido",
    "author": "El autor no es válido",
    "articles": "El valor debe ser un Array de objetos y que no sea vacio",
    "position": "El orden debe ser un numero entero mayor o igual a 1"
  }
}

