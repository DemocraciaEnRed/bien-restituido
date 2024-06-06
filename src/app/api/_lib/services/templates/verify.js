const verifyTemplate =`
{{> macroPreHeader text="Confirmá tu cuenta de correo para participar"}}
{{> macroText text="¡Hola! 👋"}}
{{> macroText text="Si recibiste este mensaje es porque se ha modificado el correo electrónico de tu cuenta"}}
{{> macroText text="Para acceder nuevamente es necesario que confirmes tu dirección de email."}}
{{> macroText text="Haz click aquí para confirmar tu cuenta."}}
{{> macroButton url=url text="Confirmar cuenta" }}
{{> macroText text="Si crees que recibiste este email por error, por favor ignora este mensaje."}}
{{> macroText text="Si tienes alguna pregunta sobre tus credenciales de usuario, no dudes en contactarnos."}}
{{> macroText text="Equipo de Resurgentes"}}

`

export default verifyTemplate