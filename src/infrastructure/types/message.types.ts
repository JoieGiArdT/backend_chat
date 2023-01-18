export interface Message {
  // message_id: string
  externals_id: IdExternal | undefined
  conversation_id: string | undefined
  from: string
  type: string
  timestamp: number
  content_message: ContentMessage
};

interface IdExternal {
  wa_id: string | undefined
  conversation_wp: string | undefined
}

interface ContentMessage {
  value: boolean
  text?: Text
  interactive?: Interactive
  image?: Image
  audio?: Audio
  video?: Video
  document?: Document
  sticker?: Sticker
  location?: Location
}

interface Text {
  preview_url: boolean
  body: string
}

interface Interactive {
  name: string
}

interface Image {
  link: string
  caption?: string
}

interface Audio {
  link: string
}

interface Video {
  link: string
  caption?: string
}

interface Document {
  link: string
  caption?: string
}

interface Sticker {
  link: string
}

interface Location {
  latitude: number
  longitude: number
  name: string
  address: string
}
