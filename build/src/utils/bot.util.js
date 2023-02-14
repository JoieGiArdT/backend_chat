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
            case 'Ayuda': {
                callback = this.createTicketBot;
                break;
            }
            default:
                return {};
        }
        return Object.assign({}, callback(paramaters));
    }
    createTicketBot(parameters) {
        switch (parameters.answer) {
            case 1: {
                return {
                    parameters: {
                        buttonName: 'Tipo',
                        bodyText: 'Seleccione el departamento destino:',
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
                    type: 'interactive',
                    response_type: 'wp',
                    status: 'PENDING',
                    validation: 'approved'
                };
            }
            case 2: {
                let booleano = false;
                Object.entries(parameters.response).forEach(([key, value]) => {
                    const objeto = value;
                    if (key === 'text' && objeto.body === 'Subir') {
                        booleano = true;
                    }
                });
                if (booleano) {
                    return {
                        parameters: {
                            text: 'Digite el codigo del Inmueble',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'PENDING',
                        validation: 'approved'
                    };
                }
                else {
                    return {
                        parameters: {
                            text: 'Subir imagenes - Porfavor seleccione un tipo de subida.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'PENDING',
                        validation: 'denied'
                    };
                }
            }
            case 3: {
                let booleano = false;
                Object.entries(parameters.response).forEach(([key, value]) => {
                    const objeto = value;
                    if (key === 'text' && objeto.body === 'Subi') {
                        booleano = true;
                    }
                });
                if (booleano) {
                    return {
                        parameters: {
                            text: 'Las imagenes subidas a continuacion seran montadas al inmueble especificaso.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'DONE',
                        validation: 'approved'
                    };
                }
                else {
                    return {
                        parameters: {
                            text: 'Subir imagenes - Porfavor ingrese un codigo de inmueble.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'PENDING',
                        validation: 'denied'
                    };
                }
            }
            case 4: {
                let booleano = true;
                Object.entries(parameters.response).forEach(([key, value]) => {
                    if (key === 'image' && value !== null) {
                        booleano = false;
                    }
                });
                if (booleano) {
                    return {
                        parameters: {
                            text: 'Las imagenes subidas a continuacion seran montadas al inmueble especificaso.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'DONE'
                    };
                }
                else {
                    return {
                        id_image: parameters.response.image.id,
                        response_type: 'nx'
                    };
                }
            }
            default: {
                return {
                    parameters: {
                        text: 'Tarea - Subir imagenes activa.',
                        options: {
                            preview_url: false
                        }
                    },
                    type: 'text',
                    response_type: 'wp',
                    status: 'PENDING'
                };
            }
        }
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
                    type: 'interactive',
                    response_type: 'wp',
                    status: 'PENDING',
                    validation: 'approved'
                };
            }
            case 2: {
                let booleano = false;
                Object.entries(parameters.response).forEach(([key, value]) => {
                    const objeto = value;
                    if (key === 'text' && objeto.body === 'Subir') {
                        booleano = true;
                    }
                });
                if (booleano) {
                    return {
                        parameters: {
                            text: 'Digite el codigo del Inmueble',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'PENDING',
                        validation: 'approved'
                    };
                }
                else {
                    return {
                        parameters: {
                            text: 'Subir imagenes - Porfavor seleccione un tipo de subida.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'PENDING',
                        validation: 'denied'
                    };
                }
            }
            case 3: {
                let booleano = false;
                Object.entries(parameters.response).forEach(([key, value]) => {
                    const objeto = value;
                    if (key === 'text' && objeto.body === 'Subi') {
                        booleano = true;
                    }
                });
                if (booleano) {
                    return {
                        parameters: {
                            text: 'Las imagenes subidas a continuacion seran montadas al inmueble especificaso.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'DONE',
                        validation: 'approved'
                    };
                }
                else {
                    return {
                        parameters: {
                            text: 'Subir imagenes - Porfavor ingrese un codigo de inmueble.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'PENDING',
                        validation: 'denied'
                    };
                }
            }
            case 4: {
                let booleano = true;
                Object.entries(parameters.response).forEach(([key, value]) => {
                    if (key === 'image' && value !== null) {
                        booleano = false;
                    }
                });
                if (booleano) {
                    return {
                        parameters: {
                            text: 'Las imagenes subidas a continuacion seran montadas al inmueble especificaso.',
                            options: {
                                preview_url: false
                            }
                        },
                        type: 'text',
                        response_type: 'wp',
                        status: 'DONE'
                    };
                }
                else {
                    return {
                        id_image: parameters.response.image.id,
                        response_type: 'nx'
                    };
                }
            }
            default: {
                return {
                    parameters: {
                        text: 'Tarea - Subir imagenes activa.',
                        options: {
                            preview_url: false
                        }
                    },
                    type: 'text',
                    response_type: 'wp',
                    status: 'PENDING'
                };
            }
        }
    }
}
const botUtil = new BotUtil();
exports.botUtil = botUtil;
