# Registration Issue Analysis

## Current Status: Registration Failing with 401 Error

### What's Working ✅
1. **Firebase Function is deployed and accessible**
   - Tested with curl: Returns 400 (expected - missing fields)
   - CORS is properly configured
   - IAM policy set to allow `allUsers`

2. **Frontend code is correct**
   - Sending proper fields: `email`, `userId`, `firstName`, `verificationUrl`
   - Error handling in place
   - Password hashing working

### What's NOT Working ❌
1. **User creation in Supabase database**
   - No user being created in `users` table
   - Getting 401 Unauthorized error
   - Error appears to be from Supabase, NOT Firebase function

### Root Cause Analysis

The **401 error is likely coming from Supabase Row Level Security (RLS) policies**, not the Firebase function!

**Evidence:**
- Firebase function works with curl (no auth required)
- CORS preflight succeeds
- Error occurs BEFORE Firebase function is even called
- User is not being created in database

**Most Likely Issue:**
Supabase has RLS policies enabled on the `users` table that prevent unauthenticated inserts.

### Solution Required

**Option 1: Disable RLS for user registration (Recommended)**
```sql
-- Allow anyone to insert new users (for registration)
CREATE POLICY "Allow public user registration" ON users
FOR INSERT
TO anon
WITH CHECK (true);
```

**Option 2: Use Supabase service role key**
Update the frontend to use the service role key (with proper security measures) for user creation only.

**Option 3: Create a Supabase Edge Function**
Move user creation logic to a Supabase Edge Function that runs with elevated privileges.

### Next Steps

1. **Check Supabase RLS policies** on the `users` table
2. **Add appropriate policy** to allow public registration
3. **Test registration** again
4. **Verify email sending** works after user creation succeeds

### Testing Checklist

- [ ] User created in `users` table with `email_verified = false`
- [ ] Notification preferences created
- [ ] Firebase function called successfully
- [ ] Verification email sent to user
- [ ] Verification link works and updates `email_verified = true`
- [ ] User can login after verification
- [ ] User cannot login before verification

## Technical Details

### Supabase Configuration
- URL: https://uhgypnlikwtfxnkixjzp.supabase.co
- Using anon key for client operations
- Custom authentication (not Supabase Auth)

### Firebase Configuration
- Project: innate-temple-337717
- Function: sendVerificationEmail (HTTP)
- Region: us-central1
- IAM: allUsers can invoke

### Email Configuration
- Service: Gmail SMTP
- From: dalsiainoreply@gmail.com
- App Password: configured in Firebase config
