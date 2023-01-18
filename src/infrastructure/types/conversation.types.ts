export interface Conversation {
  external_id: string
  tarjet_information: TarjetInformation
  last_message_id: string
  last_update: string
  status: 'SIN ASIGNACION' | 'EN PROCESO' | 'CERRADO'
  atention_type: 'BOT' | 'ADVISER'
}

interface TarjetInformation {
  display_name?: string
  photo?: string
  to: string
  type?: string[]
}
