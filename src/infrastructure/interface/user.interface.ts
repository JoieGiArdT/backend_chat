export interface User {
  // user_id: string
  profile: Profile
  profile_wp: ProfileWp
  conversations_id: string[] | null
}

interface Profile {
  first_name: string | null
  last_name: string | null
  phone: number
  user_type: string
}

interface ProfileWp {
  wa_id: string
  display_name: string
}
