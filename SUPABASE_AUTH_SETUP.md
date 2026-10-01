# CodeMachan — Supabase Auth & Google Login Setup Guide

This document explains how to complete the Supabase Auth and Google OAuth setup for CodeMachan.

---

## 1. Environment Variables Configuration (`.env.local`)

Ensure your `.env.local` file contains the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://shgjafpflodxumpulpwn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Transactional Email Notification Config
CONTACT_EMAIL=codemachan@gmail.com
ADMIN_EMAIL=codemachan@gmail.com
RESEND_API_KEY=re_your_resend_api_key_here
```

---

## 2. Supabase Database Setup

1. Open your **[Supabase Dashboard](https://supabase.com/dashboard)**.
2. Select your existing CodeMachan project (`shgjafpflodxumpulpwn`).
3. Click on **SQL Editor** in the left sidebar.
4. Open the provided `supabase_schema.sql` file in this workspace.
5. Copy its contents, paste them into the SQL Editor, and click **Run**.

This creates the `profiles` and `contact_submissions` tables, enables Row Level Security (RLS), and configures the automatic profile trigger for new user signups.

---

## 3. Google OAuth Setup Instructions

To enable **"Continue with Google"**:

### Step 1: Google Cloud Console Setup
1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Create a new project or select your existing project.
3. Go to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**.
5. Select **Web application** as application type.
6. Under **Authorized redirect URIs**, add your Supabase Auth callback URI:
   ```text
   https://shgjafpflodxumpulpwn.supabase.co/auth/v1/callback
   ```
7. Copy the generated **Client ID** and **Client Secret**.

### Step 2: Supabase Dashboard Provider Setup
1. Open **Supabase Dashboard > Authentication > Providers**.
2. Locate **Google** and toggle it **Enabled**.
3. Paste your **Client ID** and **Client Secret**.
4. Click **Save**.

### Step 3: URL Configuration & Redirect URIs
1. Open **Supabase Dashboard > Authentication > URL Configuration**.
2. Set **Site URL**:
   - Development: `http://localhost:3000`
   - Production: `https://codemachan.vercel.app`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback`
   - `https://codemachan.vercel.app/auth/callback`
   - `http://localhost:3000/reset-password`

---

## 4. Auth Routes Available

| Path | Description | Access |
|---|---|---|
| `/login` | CodeMachan Login Page ("Welcome back, Machan 👋") | Public |
| `/signup` | Registration Page ("Welcome to CodeMachan 🚀") | Public |
| `/forgot-password` | Request password reset email | Public |
| `/reset-password` | Password reset form | Auth Callback |
| `/account` | User Profile & Account Management | Protected (Logged-in users) |
| `/admin/messages` | Contact Submissions Dashboard | Admin / Auth |
| `/contact` | Project Inquiry Form (saves to Supabase & emails `codemachan@gmail.com`) | Public |
