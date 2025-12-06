# OAuth Authentication Setup Guide

This guide walks you through setting up Google, Twitch, and Discord OAuth authentication for the Bazaar Companion app.

## Prerequisites

- Supabase project: `https://ulyrkaexhltkbcfclvff.supabase.co`
- Access to Supabase dashboard
- Developer accounts for Google, Twitch, and Discord

## Supabase Configuration

### 1. Access Authentication Settings

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `ulyrkaexhltkbcfclvff`
3. Navigate to **Authentication** → **Providers**

### 2. Note Your Redirect URL

Your Supabase callback URL will be:
```
https://ulyrkaexhltkbcfclvff.supabase.co/auth/v1/callback
```

You'll need this URL when configuring each OAuth provider.

---

## Google OAuth Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Configure:
   - **Name**: Bazaar Companion
   - **Authorized JavaScript origins**:
     - `https://ulyrkaexhltkbcfclvff.supabase.co`
     - `http://localhost:8080` (for local testing)
   - **Authorized redirect URIs**:
     - `https://ulyrkaexhltkbcfclvff.supabase.co/auth/v1/callback`
     - `http://localhost:8080/auth/v1/callback` (for local testing)
7. Click **Create**
8. Copy your **Client ID** and **Client Secret**

### 2. Configure in Supabase

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Enable the provider
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

## Twitch OAuth Setup

### 1. Create Twitch Application

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console)
2. Click **Register Your Application**
3. Configure:
   - **Name**: Bazaar Companion
   - **OAuth Redirect URLs**:
     - `https://ulyrkaexhltkbcfclvff.supabase.co/auth/v1/callback`
     - `http://localhost:8080/auth/v1/callback` (for local testing)
   - **Category**: Website Integration
4. Click **Create**
5. Click **Manage** on your new application
6. Copy your **Client ID**
7. Click **New Secret** to generate a **Client Secret** and copy it

### 2. Configure in Supabase

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Find **Twitch** and click to expand
3. Enable the provider
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

## Discord OAuth Setup

### 1. Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Name it "Bazaar Companion" and click **Create**
4. Navigate to **OAuth2** in the sidebar
5. Under **Redirects**, add:
   - `https://ulyrkaexhltkbcfclvff.supabase.co/auth/v1/callback`
   - `http://localhost:8080/auth/v1/callback` (for local testing)
6. Click **Save Changes**
7. Copy your **Client ID**
8. Click **Reset Secret** to generate a **Client Secret** and copy it

### 2. Configure in Supabase

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Find **Discord** and click to expand
3. Enable the provider
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

## Testing OAuth Flow

### Local Testing

1. Start local server:
   ```bash
   cd ui && python3 -m http.server 8080
   ```

2. Open `http://localhost:8080` in your browser

3. Click the "Sign In / Sign Up" button

4. Try each OAuth provider to ensure:
   - OAuth popup opens correctly
   - User can authorize the app
   - User is redirected back and logged in
   - User profile shows their email

### Production Testing

1. Deploy your app to production
2. Test each OAuth provider
3. Verify user data syncs correctly to Supabase

---

## Troubleshooting

### "Invalid redirect_uri" Error

- Verify the redirect URL in your OAuth provider settings exactly matches:
  `https://ulyrkaexhltkbcfclvff.supabase.co/auth/v1/callback`
- Check for trailing slashes or typos

### OAuth Popup Blocked

- Ensure pop-ups are allowed for your domain
- Some browsers block OAuth popups in incognito mode

### User Not Logged In After OAuth

- Check browser console for errors
- Verify OAuth provider is enabled in Supabase
- Check that `supabaseClient` is properly initialized in `ui/supabase.js`

### CORS Errors

- Ensure your Supabase project allows requests from your domain
- For local testing, add `http://localhost:8080` to allowed origins

---

## Security Best Practices

1. **Never commit secrets**: Client secrets should never be in your code or git repository
2. **Use environment variables**: Store secrets in Supabase dashboard only
3. **HTTPS in production**: Always use HTTPS for production OAuth flows
4. **Rotate secrets regularly**: Periodically regenerate OAuth client secrets
5. **Limit scopes**: Only request the OAuth scopes you actually need

---

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Twitch Authentication Documentation](https://dev.twitch.tv/docs/authentication)
- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
