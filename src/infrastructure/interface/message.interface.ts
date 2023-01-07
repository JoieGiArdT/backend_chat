export interface message {
    message_id: string;
    from: string;
    timestamp: string;
    type: string;
    content: object;
    textMessage: textMessage;
    linkMessage?: linkMessage;
}

interface textMessage {
    body: string;
}

interface linkMessage {
    link: string;
}
