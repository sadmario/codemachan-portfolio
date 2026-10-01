import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      // Create/update user profile in profiles table
      const user = data.user
      const profileData = {
        user_id: user.id,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Machan',
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider || 'google',
        updated_at: new Date().toISOString(),
      }

      await (supabase as any)
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' })

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to login with error query param if callback fails
  return NextResponse.redirect(`${origin}/login?error=Could%20not%20authenticate%20user`)
}
