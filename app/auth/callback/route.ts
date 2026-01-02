import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user has completed their profile (has business_name)
      const userMetadata = data.user.user_metadata
      const hasBusinessName = userMetadata?.business_name

      // If user signed up via OAuth and hasn't set business name, redirect to complete profile
      if (!hasBusinessName && data.user.app_metadata?.provider !== 'email') {
        return NextResponse.redirect(`${origin}/complete-profile`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to login page with an error if something went wrong
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
