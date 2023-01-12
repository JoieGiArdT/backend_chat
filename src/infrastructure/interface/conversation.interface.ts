export interface Conversation {
  // conversation_id: string
  externals_id: IdExternal | null
  advisers_id: string[]
  client_id: string
  last_message_id: string
}
interface IdExternal {
  wa_id: string
}
