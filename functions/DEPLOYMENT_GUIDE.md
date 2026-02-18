# Firebase Cloud Functions Backend - Deployment Guide

## Overview
This documentation covers the deployment and configuration of Firebase Cloud Functions that handle:
- User and Admin authentication (email/password)
- Google OAuth authentication
- Stripe payment integration (checkout sessions)
- Stripe webhooks (payment events)

All authentication and payment logic is handled in the backend. Frontend communicates only via HTTP requests to these functions.

## Prerequisites

1. **Node.js 20+** - Required by Firebase Functions
2. **Firebase CLI** - Install with `npm install -g firebase-tools`
3. **Google Cloud Project** - Set up with Firebase
4. **Stripe Account** - For payment integration
5. **Upstash Redis** - For rate limiting and session management

## Environment Variables

### Required in Firebase Functions (`.env` in functions folder)

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# NextAuth
NEXTAUTH_SECRET=your_secret_key_min_32_chars

# Upstash Redis (for Rate Limiting & Sessions)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token

# Environment
NODE_ENV=production
```

### Required in Frontend (.env.local in main folder)

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=adndev-5a2b0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=adndev-5a2b0.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://adndev-5a2b0.firebaseio.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=adndev-5a2b0.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# NextAuth
NEXTAUTH_SECRET=your_secret_key_min_32_chars
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Cloud Functions
NEXT_PUBLIC_CLOUD_FUNCTIONS_URL=http://localhost:5001/adndev-5a2b0/us-central1
```

## Local Development

### 1. Install Dependencies

```bash
# Install main app dependencies
pnpm install

# Install functions dependencies
cd functions
npm install
cd ..
```

### 2. Start Firebase Emulator

```bash
# Start Firebase Functions emulator
firebase emulators:start --only functions
```

This will output URLs like:
```
signinUser: http://localhost:5001/adndev-5a2b0/us-central1/signinUser
signinAdmin: http://localhost:5001/adndev-5a2b0/us-central1/signinAdmin
...
```

### 3. Update env vars for local development

Set in `.env.local`:
```bash
NEXT_PUBLIC_CLOUD_FUNCTIONS_URL=http://localhost:5001/adndev-5a2b0/us-central1
```

### 4. Start Next.js app

```bash
pnpm run dev
```

## Deploying Cloud Functions

### 1. Build Functions

```bash
cd functions
npm run build
cd ..
```

### 2. Set Firebase Environment Variables

```bash
# Set production environment variables
firebase functions:config:set stripe.secret_key="sk_live_xxxxx"
firebase functions:config:set stripe.webhook_secret="whsec_xxxxx"
firebase functions:config:set nextauth.secret="your_secret"
firebase functions:config:set upstash.redis_url="https://xxx.upstash.io"
firebase functions:config:set upstash.redis_token="your_token"
firebase functions:config:set google.client_id="your_google_client_id"
firebase functions:config:set google.client_secret="your_google_client_secret"
firebase functions:config:set app.url="https://yourdomain.com"
```

Or create `functions/.env.production` file and use:
```bash
firebase functions:config:import < functions/.env.production
```

### 3. Deploy to Firebase

```bash
# Deploy functions only
firebase deploy --only functions

# Deploy everything (frontend + functions)
firebase deploy
```

### 4. Verify Deployment

Check the Firebase Console:
- Go to Project Settings → Functions
- Verify all functions are deployed (signinUser, signinAdmin, createCheckoutSession, stripeWebhook, etc.)
- Check function URLs are accessible

## Stripe Webhook Configuration

After deploying, configure the webhook in Stripe Dashboard:

1. Go to **Stripe Dashboard → Webhooks**
2. Click **Add endpoint**
3. Webhook URL: `https://us-central1-adndev-5a2b0.cloudfunctions.net/stripeWebhook`
4. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret and add to Firebase config as `STRIPE_WEBHOOK_SECRET`

## Testing Stripe Webhooks Locally

### Using Stripe CLI

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local function
stripe listen --forward-to http://localhost:5001/adndev-5a2b0/us-central1/stripeWebhook

# In another terminal, trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
```

## API Endpoints

### Authentication Functions

#### POST /signinUser
Sign in as regular user
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

#### POST /signinAdmin
Sign in as admin
```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123"
}
```

#### POST /signupUser
Create new user account
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

#### POST /signupWithGoogle
Google OAuth authentication
```json
{
  "googleIdToken": "eyJhbGciOiJSUzI1NiIs..."
}
```

#### GET /getSession
Verify JWT token and get session
```
Authorization: Bearer <jwt_token>
```

#### POST /signout
Clear session
```
Authorization: Bearer <jwt_token>
```

### Payment Functions

#### POST /createCheckoutSession
Create Stripe checkout session
```
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "priceId": "price_xxxxx",
  "billingCycle": "monthly"
}
```

Returns:
```json
{
  "success": true,
  "sessionId": "cs_xxxxx",
  "url": "https://checkout.stripe.com/pay/cs_xxxxx"
}
```

#### POST /stripeWebhook
Receives webhooks from Stripe (automatically handled)

## Security Considerations

1. **Rate Limiting**: All endpoints are rate-limited using Upstash Redis
   - User login: 10 requests/minute
   - Admin login: Stricter limits
   - Checkout: 10 requests/minute

2. **Input Sanitization**: All inputs are sanitized (email, text, etc.)

3. **CORS**: Configured to allow only specified origins

4. **Security Headers**: All responses include security headers

5. **Audit Logging**: All auth actions logged to Firestore

6. **Token Verification**: All tokens verified before processing

## Monitoring & Logs

### View Cloud Functions Logs

```bash
# Local development
firebase functions:log

# Production
firebase functions:log --region us-central1
```

### View Firestore Security Logs

```
Collection: security_logs
Fields: userId, email, action, status, timestamp, ip, userAgent
```

## Troubleshooting

### Functions not responding locally
- Check emulator is running: `firebase emulators:start`
- Verify env vars are set in `.env` file
- Check ports (5001 for functions)

### 401 Errors
- Verify JWT token is being sent in Authorization header
- Check token hasn't expired (30 days by default)
- Verify token matches the same NEXTAUTH_SECRET used when creating it

### Stripe webhook not firing
- Verify webhook URL is correct in Stripe Dashboard
- Check webhook signing secret is set in Firebase config
- Verify events are selected in Stripe webhook settings
- Check Firebase logs for errors

### Rate limit errors (429)
- Wait 15 minutes for user endpoints to reset
- Check Redis is properly configured
- Verify UPSTASH_REDIS_REST_URL and token are correct

## Next Steps

1. Deploy functions: `firebase deploy --only functions`
2. Update frontend env vars with production URLs
3. Configure Stripe webhooks
4. Test all auth flows
5. Monitor logs and security events
