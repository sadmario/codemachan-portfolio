import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, service, timeline, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const targetEmail = process.env.ADMIN_EMAIL || 'codemachan@gmail.com'

    // 1. Get or create individual store for this user by email
    let storeId: string | null = null
    const userStoresTable = supabase.from('user_stores' as any) as any
    const contactMessagesTable = supabase.from('contact_messages' as any) as any

    const { data: existingStore } = await userStoresTable
      .select('id')
      .eq('user_email', email.trim().toLowerCase())
      .single()

    if (existingStore && existingStore.id) {
      storeId = existingStore.id
    } else {
      const storeName = `${name.trim()}'s Workspace`
      const { data: newStore, error: storeError } = await userStoresTable
        .insert({
          user_email: email.trim().toLowerCase(),
          store_name: storeName,
          settings: { source: 'contact_form' },
        })
        .select('id')
        .single()

      if (!storeError && newStore && newStore.id) {
        storeId = newStore.id
      }
    }

    // 2. Save incoming contact message in Supabase
    const { data: savedMessage, error: msgError } = await contactMessagesTable
      .insert({
        store_id: storeId,
        sender_name: name.trim(),
        sender_email: email.trim().toLowerCase(),
        service: service || 'General Inquiry',
        timeline: timeline || 'Not specified',
        message: message.trim(),
        target_email: targetEmail,
        status: 'received',
        email_sent: false,
      })
      .select()
      .single()

    if (msgError) {
      console.error('Supabase contact_messages insert error:', msgError)
      return NextResponse.json(
        { error: 'Failed to save message in Supabase backend.' },
        { status: 500 }
      )
    }

    // 3. Attempt to send email notification to codemachan@gmail.com
    let emailSentSuccess = false
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'CodeMachan Contact Form <onboarding@resend.dev>',
            to: [targetEmail],
            subject: `🚀 New Project Message from ${name} (${email})`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
                <h2 style="color: #d946ef;">New CodeMachan Contact Message</h2>
                <p><strong>Sender Name:</strong> ${name}</p>
                <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Service Requested:</strong> ${service || 'General Inquiry'}</p>
                <p><strong>Timeline:</strong> ${timeline || 'Flexible'}</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #666;">This message is saved in Supabase store ID: ${storeId || 'N/A'}</p>
              </div>
            `,
          }),
        })

        if (resendRes.ok) {
          emailSentSuccess = true
        }
      } catch (err) {
        console.error('Email sending error:', err)
      }
    }

    // Update email_sent status in Supabase if sent
    if (emailSentSuccess && savedMessage && savedMessage.id) {
      await contactMessagesTable
        .update({ email_sent: true, status: 'delivered' })
        .eq('id', savedMessage.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Message received and saved in backend successfully.',
      data: {
        id: savedMessage?.id,
        storeId,
        targetEmail,
        emailSent: emailSentSuccess,
      },
    })
  } catch (error) {
    console.error('API /api/contact error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
