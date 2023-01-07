export interface Message {
    message_id: string;
    from: string;
    timestamp: string;
    type: string;
    content: object;

}

interface textMessage {
    body: string;
}
