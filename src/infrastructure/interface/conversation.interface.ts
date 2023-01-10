export interface Conversation {
  conversation_id: string
  exterals_id: IdExternal | null
  advisers_id: string[]
  client_id: string
  last_message_id: string
}
interface IdExternal {
  wa_id: string
}
