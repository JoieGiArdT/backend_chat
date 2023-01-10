class WhatsappService {
  verifyToken (receivedToken: string, challenge: string): string {
    const accessToken = String(process.env.TOKENA)
    return (challenge != null && receivedToken != null && receivedToken === accessToken) ? challenge : 'VERIFICATION_FAILED'
  }
}
export default new WhatsappService()
