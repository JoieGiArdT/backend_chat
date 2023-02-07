"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botUtil = void 0;
class BotUtil {
    getParameterForAnswerTask(paramaters, typeTask) {
        let callback;
        switch (typeTask) {
            case 'Subir imagenes': {
                callback = this.uploadImagesBot;
                break;
            }
            default:
                return {};
        }
        return Object.assign({}, callback(paramaters));
    }
    uploadImagesBot(parameters) {
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
                };
            }
            case 2: {
                Object.entries(parameters.response).forEach(([key, value]) => {
                    if (key === 'interactive' && value === 'perro') {
                        return {
                            parameters: {
                                text: '¿Digite el codigo del Inmueble?',
                                options: {
                                    preview_url: false
                                }
                            },
                            type: 'text'
                        };
                    }
                    else {
                        return null;
                    }
                });
                return {
                    parameters: {
                        text: 'Subir imagenes - Porfavor seleccione un tipo de subida.',
                        options: {
                            preview_url: false
                        }
                    },
                    type: 'text'
                };
            }
            case 3: {
                Object.entries(parameters.response).forEach(([key, value]) => {
                    if (key === 'text' && value === 'perro') {
                        return {
                            parameters: {
                                text: 'Las imagenes subidas a continuacion seran montadas al inmueble especificaso.',
                                options: {
                                    preview_url: false
                                }
                            },
                            type: 'text'
                        };
                    }
                    else {
                        return null;
                    }
                });
                return {
                    parameters: {
                        text: 'Subir imagenes - Porfavor seleccione un tipo de subida.',
                        options: {
                            preview_url: false
                        }
                    },
                    type: 'text'
                };
            }
            default: {
                return {
                    parameters: {
                        text: 'Subir imagenes - Puede empezar a subir fotos.',
                        options: {
                            preview_url: false
                        }
                    },
                    type: 'text'
                };
            }
        }
    }
}
const botUtil = new BotUtil();
exports.botUtil = botUtil;
