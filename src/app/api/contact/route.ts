import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, project_type, service, budget, timeline, message } = body

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    const targetEmail = process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL || 'codemachan@gmail.com'
    const supabase = await createClient()

    // 2. Get authenticated user session if available
    let userId: string | null = null
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        userId = session.user.id
      }
    } catch {
      // User is not logged in; user_id defaults to null
    }

    const projectType = project_type || service || 'General Inquiry'
    const projectBudget = budget || timeline || 'Flexible'

    // 3. Save submission to Supabase contact_submissions table
    const submissionData = {
      user_id: userId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      project_type: projectType,
      budget: projectBudget,
      message: message.trim(),
      status: 'new',
    }

    let savedSubmission: any = null
    const { error: subError } = await (supabase as any)
      .from('contact_submissions')
      .insert(submissionData)

    if (subError) {
      console.warn("contact_submissions insert notice:", subError.message || subError)
    }

    // Always keep contact_messages in sync
    await (supabase as any).from('contact_messages').insert({
      sender_name: name.trim(),
      sender_email: email.trim().toLowerCase(),
      service: projectType,
      timeline: projectBudget,
      message: message.trim(),
      target_email: targetEmail,
      status: 'received',
    })

    // 4. Verify Resend API Key availability
    const resendApiKey = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.trim() : ''

    if (!resendApiKey) {
      console.error('Server Configuration Error: RESEND_API_KEY environment variable is not configured in .env.local / server environment.')
      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          dbSaved: true,
          error: 'RESEND_API_KEY_MISSING',
          message: "We received your message, but the email notification failed because RESEND_API_KEY is missing in server configuration. Please try again or contact us directly.",
        },
        { status: 500 }
      )
    }

    // 5. Dispatch email via Resend API
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    const recipients = Array.from(new Set([targetEmail, 'aravinthg543@gmail.com'].filter(Boolean)))

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'CodeMachan Contact <onboarding@resend.dev>',
        to: recipients,
        subject: `🚀 New CodeMachan Project Enquiry from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 16px 20px; border-radius: 8px; color: #fff; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 20px;">New Project Enquiry</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">CodeMachan Software Studio</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 130px; color: #64748b;">Name:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0; color: #0f172a;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Project Type:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${projectType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Budget/Timeline:</td>
                <td style="padding: 8px 0; color: #0f172a;">${projectBudget}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Submitted:</td>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
              </tr>
              ${userId ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">User ID:</td>
                <td style="padding: 8px 0; color: #7c3aed; font-family: monospace; font-size: 12px;">${userId}</td>
              </tr>
              ` : ''}
            </table>

            <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <strong style="display: block; font-size: 12px; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">Message:</strong>
              <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">${message}</div>
            </div>

            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
              This is an automated notification from your CodeMachan website.
            </p>
          </div>
        `,
      }),
    })

    const resendData = await resendRes.json().catch(() => ({}))

    if (!resendRes.ok || resendData.error) {
      console.error('Resend API Error details:', {
        status: resendRes.status,
        statusText: resendRes.statusText,
        error: resendData.error || resendData,
      })

      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          dbSaved: true,
          error: resendData.error?.message || `Resend API returned status ${resendRes.status}`,
          message: "We received your message, but the email notification failed. Please try again or contact us directly.",
        },
        { status: 500 }
      )
    }

    // Update status in contact_submissions if saved
    if (savedSubmission?.id) {
      await (supabase as any)
        .from('contact_submissions')
        .update({ status: 'delivered' })
        .eq('id', savedSubmission.id)
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      emailId: resendData.id,
      message: "Message sent successfully! We'll get back to you soon 🚀",
      data: {
        id: savedSubmission?.id || null,
        emailId: resendData.id,
        targetEmail,
      },
    })
  } catch (error: any) {
    console.error('API /api/contact unexpected error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
