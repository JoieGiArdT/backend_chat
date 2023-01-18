
import { Message } from '../types/message.types'
import axios, { AxiosError } from 'axios'
import {
  Contact,
  ContactMessage,
  ImageMessage,
  InteractiveMessage,
  LocationMessage,
  Media,
  MediaBase,
  MediaMessage,
  TemplateComponent,
  TemplateMessage,
  TextMessage
} from '../types/whatsapp.types'
// import { Request } from 'express'

interface PaylodBase {
  messaging_product: 'whatsapp'
  recipient_type: 'individual'
}

interface OfficialSendMessageResult {
  messaging_product: 'whatsapp'
  contacts: Array<{
    input: string
    wa_id: string
  }>
  messages: Array<{
    id: string
  }>
}

export interface SendMessageResult {
  messageId: string
  phoneNumber: string
  whatsappId: string
}

class WhatsappService {
  payloadBase: PaylodBase = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual'
  }

  verifyToken (
    receivedToken: string,
    challenge: any
  ): string {
    const accessToken = String(process.env.TOKENA)
    return challenge != null &&
      receivedToken != null &&
      receivedToken === accessToken
      ? challenge
      : 'VERIFICATION_FAILED'
  }

  receivedMessageWhatsapp (
    body: any
  ): Message {
    return {
      externals_id: {
        wa_id: body.messages[0].id,
        conversation_wp: body.contacts[0].wa_id
      },
      timestamp: parseInt(body.Timestamp),
      conversation_id: undefined,
      from: body.messages[0].from,
      type: body.messages[0].type,
      content_message: {
        value: true,
        text: {
          preview_url: false,
          body: body.messages[0].text.body
        }
      }
    }
  }

  async sendMessageWhatsapp (
    paramaters: object,
    cb: any,
    fromPhoneNumberId: string,
    accessToken: string
  ): Promise<SendMessageResult> {
    const result = cb(paramaters)
    return await this.sendRequestMessage(
      result,
      fromPhoneNumberId,
      accessToken
    )
  }

  async sendRequestMessage (
    data: any,
    fromPhoneNumberId: string,
    accessToken: string,
    version: string = 'v15.0'
  ): Promise<SendMessageResult> {
    try {
      const { data: rawResult } = await axios({
        method: 'post',
        url: `https://graph.facebook.com/${version}/${fromPhoneNumberId}/messages`,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const result = rawResult as OfficialSendMessageResult

      return {
        messageId: result.messages?.[0]?.id,
        phoneNumber: result.contacts?.[0]?.input,
        whatsappId: result.contacts?.[0]?.wa_id
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if ((err as any).response) {
        throw (err as AxiosError)?.response?.data
        // } else if ((err as any).request) {
        //   throw (err as AxiosError)?.request;
      } else if (err instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw err.message
      } else {
        throw err
      }
    }
  }

  sendText (
    parameters: {
      to: string
      text: string
      options: any
    }
  ): TextMessage {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: parameters.to,
      type: 'text',
      text: {
        body: parameters.text,
        preview_url: parameters.options.preview_url
      }
    }
  }

  sendImage (
    parameters: {
      to: string
      urlOrObjectId: any
      options: any
    }
  ): ImageMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'image',
      image: this.getMediaPayload(parameters.urlOrObjectId, parameters.options)
    }
  }

  sendDocument (
    parameters: {
      to: string
      urlOrObjectId: any
      options: any
    }
  ): MediaMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'document',
      document: this.getMediaPayload(parameters.urlOrObjectId, parameters.options)
    }
  }

  sendAudio (
    parameters: {
      to: string
      urlOrObjectId: any
    }
  ): MediaMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'audio',
      audio: this.getMediaPayload(parameters.urlOrObjectId)
    }
  }

  sendVideo (
    parameters: {
      to: string
      urlOrObjectId: any
      options: any
    }
  ): MediaMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'video',
      video: this.getMediaPayload(parameters.urlOrObjectId, parameters.options)
    }
  }

  sendSticker (
    parameters: {
      to: string
      urlOrObjectId: any
    }
  ): MediaMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'sticker',
      sticker: this.getMediaPayload(parameters.urlOrObjectId)
    }
  }

  sendLocation (
    parameters: {
      to: string
      latitude: number
      longitude: number
      options: any
    }
  ): LocationMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'location',
      location: {
        latitude: parameters.latitude,
        longitude: parameters.longitude,
        name: parameters.options?.name,
        address: parameters.options?.address
      }
    }
  }

  sendTemplate (
    parameters: {
      to: string
      name: string
      languageCode: string
      components: TemplateComponent[]
    }
  ): TemplateMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'template',
      template: {
        name: parameters.name,
        language: {
          code: parameters.languageCode
        },
        components: parameters.components
      }
    }
  }

  sendContacts (
    parameters: {
      to: string
      contacts: Contact[]
    }
  ): ContactMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'contacts',
      contacts: parameters.contacts
    }
  }

  sendReplyButtons (
    parameters: {
      to: string
      bodyText: string
      buttons: string
      options: any
    }
  ): InteractiveMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'interactive',
      interactive: {
        body: {
          text: parameters.bodyText
        },
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        ...(parameters.options?.footerText
          ? {
              footer: { text: parameters.options?.footerText }
            }
          : {}),
        header: parameters.options?.header,
        type: 'button',
        action: {
          buttons: Object.entries(parameters.buttons).map(([key, value]) => ({
            type: 'reply',
            reply: {
              title: value,
              id: key
            }
          }))
        }
      }
    }
  }

  sendList (
    parameters: {
      to: string
      buttonName: string
      bodyText: string
      sections: any[]
      options: any
    }
  ): InteractiveMessage {
    return {
      ...this.payloadBase,
      to: parameters.to,
      type: 'interactive',
      interactive: {
        body: {
          text: parameters.bodyText
        },
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        ...(parameters.options?.footerText
          ? {
              footer: { text: parameters.options?.footerText }
            }
          : {}),
        header: parameters.options?.header,
        type: 'list',
        action: {
          button: parameters.buttonName,
          sections: Object.entries(parameters.sections).map(([key, value]) => ({
            title: key,
            rows: value
          }))
        }
      }
    }
  }

  getMediaPayload (urlOrObjectId: string, options?: MediaBase): Media {
    // ...(isURL(urlOrObjectId) ? { link: urlOrObjectId } : { id: urlOrObjectId }),
    return {
      link: urlOrObjectId,
      caption: options?.caption,
      filename: options?.filename
    }
  }
}

export default new WhatsappService()
