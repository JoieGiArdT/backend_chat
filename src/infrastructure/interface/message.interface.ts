export interface message {
    message_id: string;
    from: string;
    timestamp: string;
    type: string;
    textMessage?: textMessage;
    linkMessage?: linkMessage;
}

interface textMessage {
    body: string;
}

interface linkMessage {
    link: string;
}

const hola: message = {
    message_id: "hola",
    from: "hl",
    timestamp: "hl",
    type: "hl"
} 

hola.body