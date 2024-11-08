import debug from 'debug';

const logger = (nameSpace, msj) => {
  const log = debug(`bien-restituido:${nameSpace}`)
  log(msj)
}

export default logger