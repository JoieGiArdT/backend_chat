'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.botUtil = void 0
class BotUtil {
  getParameterForAnswerTask (paramaters, typeTask) {
    let callback
    switch (typeTask) {
      case 'Subir imagenes': {
        callback = this.uploadImagesBot
        break
      }
      default:
        return {}
    }
    return Object.assign({}, callback(paramaters))
  }

  uploadImagesBot (parameters) {
    switch (parameters.answer) {
      case 1: {
        return {
          parameters: {
            buttonName: 'Tipo',
            bodyText: 'Seleccione el tipo de subida:',
            sections: {
              tipo: [{
                id: 'DESO',
                title: 'Desocupacion',
                description: 'Seleccione esta opcion...'
              }]
            },
            options: {
              header: {
                type: 'text',
                text: 'Financar Sas'
              }
            }
          },
          type: 'interactive'
        }
      }
      default: {
        return {
          text: 'terminado'
        }
      }
    }
  }
}
const botUtil = new BotUtil()
exports.botUtil = botUtil
