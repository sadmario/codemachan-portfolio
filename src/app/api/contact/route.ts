import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

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

    let savedSubmissionId: string | null = null

    try {
      const { data: subData, error: subError } = await (supabase as any)
        .from('contact_submissions')
        .insert(submissionData)
        .select('id')
        .single()

      if (subError) {
        console.warn('contact_submissions insert notice:', subError.message || subError)
      } else {
        savedSubmissionId = subData?.id || null
      }
    } catch (dbErr: any) {
      console.warn('contact_submissions DB error (non-fatal):', dbErr?.message)
    }

    // Always keep contact_messages in sync (non-fatal)
    try {
      await (supabase as any).from('contact_messages').insert({
        sender_name: name.trim(),
        sender_email: email.trim().toLowerCase(),
        service: projectType,
        timeline: projectBudget,
        message: message.trim(),
        target_email: targetEmail,
        status: 'received',
      })
    } catch (msgErr: any) {
      console.warn('contact_messages insert notice (non-fatal):', msgErr?.message)
    }

    // 4. Verify Resend API Key
    const resendApiKey = process.env.RESEND_API_KEY?.trim()

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured in environment variables.')
      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          dbSaved: true,
          error: 'Email service not configured. Your message was saved — we will follow up shortly.',
        },
        { status: 500 }
      )
    }

    // 5. Send email via Resend SDK
    // NOTE: "from" MUST be a verified Resend domain/sender.
    // onboarding@resend.dev only works for sending to the account owner email,
    // NOT to external addresses like Gmail.
    // Using resend.dev test domain — can only deliver to verified email on free plan.
    // For production delivery to codemachan@gmail.com, verify a custom domain in Resend.
    const resend = new Resend(resendApiKey)

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const { data: emailData, error: emailError } = await resend.emails.send({
      // Use onboarding@resend.dev for Resend free-tier test mode.
      // IMPORTANT: On Resend free plan, this sender can ONLY deliver to
      // the verified account email. To send to any Gmail, verify a custom
      // domain at resend.com/domains and change this to:
      // 'CodeMachan <hello@yourdomain.com>'
      from: 'CodeMachan Contact <onboarding@resend.dev>',
      to: [targetEmail],
      replyTo: email.trim().toLowerCase(),
      subject: `🚀 New Project Enquiry from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 20px 24px; border-radius: 10px; color: #fff; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 800;">📬 New Project Enquiry</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.85;">CodeMachan Software Studio · ${timestamp} IST</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; width: 130px; color: #64748b; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #0f172a;">${phone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; vertical-align: top;">Project Type</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${projectType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; vertical-align: top;">Timeline</td>
              <td style="padding: 10px 0; color: #0f172a;">${projectBudget}</td>
            </tr>
            ${userId ? `
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #64748b; vertical-align: top;">User ID</td>
              <td style="padding: 10px 0; color: #7c3aed; font-family: monospace; font-size: 12px;">${userId}</td>
            </tr>` : ''}
          </table>

          <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
            <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
            <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.7; color: #1e293b;">${message}</div>
          </div>

          <div style="background: #7c3aed10; border: 1px solid #7c3aed30; border-radius: 8px; padding: 14px 16px; margin-bottom: 16px;">
            <p style="margin: 0; font-size: 13px; color: #7c3aed; font-weight: 600;">
              💡 Hit Reply to respond directly to ${name} at ${email}
            </p>
          </div>

          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
            Automated notification from CodeMachan portfolio contact form.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.error('Resend email error:', {
        name: emailError.name,
        message: emailError.message,
      })

      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          dbSaved: true,
          // Safe user-facing message — no internal details exposed
          error: 'Your message was saved, but the email notification failed. We will still follow up. You can also reach us directly at codemachan@gmail.com',
        },
        { status: 500 }
      )
    }

    // 6. Update submission status to delivered
    if (savedSubmissionId) {
      try {
        await (supabase as any)
          .from('contact_submissions')
          .update({ status: 'delivered' })
          .eq('id', savedSubmissionId)
      } catch {
        // Non-fatal — email already sent
      }
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      emailId: emailData?.id,
      message: "Message sent successfully! We'll get back to you soon 🚀",
      data: {
        id: savedSubmissionId,
        emailId: emailData?.id,
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
