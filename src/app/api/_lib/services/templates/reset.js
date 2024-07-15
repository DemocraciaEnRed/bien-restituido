const resetTemplate = `
  {{> macroText text="¡Hola! 👋"}}
  {{> macroText text="Hemos recibido una solicitud para recuperar la contraseña de tu cuenta."}}
  {{> macroText text="Haz click aquí para generar una nueva:"}}
  {{> macroButton url=url text="Recuperar Contraseña" }}
  {{> macroText text="Si no solicitaste esta recuperación, puedes ignorar este correo electrónico."}}
  {{> macroText text="Equipo de Resurgentes"}}
  `

export default resetTemplate