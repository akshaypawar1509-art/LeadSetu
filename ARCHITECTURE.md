# Architecture Documentation

## System Overview

LeadSetu is a full-stack SaaS application built with:

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth)
- **Payments**: Razorpay
- **Deployment**: Vercel/Netlify

## Technology Stack

### Frontend
- **React 18**: UI framework
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Vite**: Module bundler and dev server
- **date-fns**: Date formatting and manipulation
- **axios**: HTTP client (optional, can use fetch)

### Backend
- **Supabase**: 
  - PostgreSQL database
  - Authentication (JWT-based)
  - Realtime subscriptions
  - Row Level Security
  - Storage (file uploads)
  - Edge Functions (serverless functions)

### Payment Gateway
- **Razorpay**: Payment processing for India

## Application Flow

### 1. Authentication Flow

```
User → Sign In/Sign Up → Supabase Auth → JWT Token → Local Storage → Protected Routes
```

- Users create account or login via email/password
- Supabase handles password hashing and token generation
- JWT token stored in browser local storage
- Token sent with every authenticated request
- Session validated via `getCurrentUser()`

### 2. Lead Discovery Flow

```
User → Hero Section (Search Filters) → Query Leads → Display Dashboard → Actions
```

- User selects city and category
- Frontend calls `getLeads(filters)` via Supabase
- Leads table queries database with RLS enforcement
- Results displayed in LeadsDashboard component
- User can perform actions (Log Call, Add Note, Schedule Follow-up)

### 3. Call Tracking Flow

```
User → Click "Log Call" → Modal Opens → Fill Details → Save → Database Update
```

- `CallTrackerModal` component opens when "Log Call" is clicked
- User selects outcome, adds notes, schedules follow-up
- Form data sent to `logCall()` function
- Data inserted into `call_logs` table
- Lead status automatically updated
- Notification sent to user

### 4. Subscription Flow

```
User → Choose Plan → Razorpay Checkout → Payment → Success → Update Subscription → Unlock Features
```

- User selects pricing plan
- Razorpay checkout opened with plan details
- User completes payment
- Razorpay callback handler receives payment ID
- Subscription record created/updated in database
- User can now access features based on plan

## Database Schema

### Leads Table
```sql
leads {
  id: bigint (PK)
  user_id: uuid (FK)
  business_name: string
  category: string (Real Estate, Restaurants, Clinics, Interior Designers)
  city: string (Pune, Mumbai, Solapur, Nashik)
  phone_number: string
  email: string
  google_rating: decimal
  status: string (New, Contacted, Interested, Closed)
  notes: text
  created_at: timestamp
  updated_at: timestamp
}
```

### Call Logs Table
```sql
call_logs {
  id: bigint (PK)
  lead_id: bigint (FK)
  user_id: uuid (FK)
  outcome: string (Connected, No Answer, Busy, Interested)
  notes: text
  follow_up_date: date
  follow_up_time: time
  duration_minutes: integer
  created_at: timestamp
}
```

### Subscriptions Table
```sql
subscriptions {
  id: bigint (PK)
  user_id: uuid (FK, UNIQUE)
  plan_name: string (Basic, Pro, Agency)
  status: string (active, cancelled, expired)
  razorpay_subscription_id: string
  razorpay_payment_id: string
  price_amount: decimal
  billing_cycle_start: timestamp
  billing_cycle_end: timestamp
  created_at: timestamp
  updated_at: timestamp
}
```

### User Profiles Table
```sql
user_profiles {
  id: uuid (PK, FK to auth.users)
  full_name: string
  company_name: string
  phone_number: string
  city: string
  state: string
  pincode: string
  avatar_url: string
  created_at: timestamp
  updated_at: timestamp
}
```

## Row Level Security (RLS) Policies

### Leads
- **SELECT**: Users can only view leads they created
- **INSERT**: Users can only create leads for themselves
- **UPDATE**: Users can only update leads they created
- **DELETE**: Users can only delete leads they created (if policy added)

### Call Logs
- **SELECT**: Users can only view call logs they created
- **INSERT**: Users can only log calls on leads they own
- **UPDATE**: Users can only update call logs they created

### Subscriptions
- **SELECT**: Users can only view their own subscription
- **INSERT**: Users can only create their own subscription
- **UPDATE**: Users can only update their own subscription

## Component Hierarchy

```
App
├── Home Page
│   ├── Header
│   ├── Hero
│   ├── LeadsDashboard
│   ├── Pricing
│   └── Footer
├── Login Page
│   └── Auth Forms
└── Dashboard Page
    ├── Header
    ├── LeadsDashboard
    ├── CallTrackerModal
    └── Footer
```

## State Management

### Global State (Context API)
- User authentication state
- User subscription plan
- Current user profile

### Local State (useState)
- Modal open/close states
- Form inputs (email, password, etc.)
- Loading states
- Error messages
- Filter selections

## API Integration Points

### Supabase Client
- Initialized in `src/services/supabaseClient.js`
- Provides auth and database access
- Handles real-time subscriptions

### API Functions (src/services/api.js)
- Wraps Supabase client calls
- Handles error management
- Provides consistent error/data responses

### Razorpay Integration
- Checkout script loaded in `index.html`
- Payment handler in `Pricing.jsx` component
- Success callback updates subscription

## Security Considerations

1. **Authentication**
   - JWT tokens stored in localStorage
   - Token validated on protected routes
   - Session refresh on app load

2. **Data Access**
   - RLS policies enforce user data isolation
   - Users can only access their own data
   - Server-side validation of all requests

3. **Environment Variables**
   - Sensitive keys stored in `.env.local`
   - Never committed to version control
   - Public keys (Supabase anon key, Razorpay key) safe to expose

4. **HTTPS**
   - All API calls use HTTPS
   - No sensitive data in URLs
   - Secure cookies (HttpOnly not available in SPA)

## Performance Optimization

1. **Code Splitting**
   - React Router lazy loading
   - Component-based code splitting

2. **Lazy Loading**
   - Images lazy loaded
   - Components lazy loaded on routes

3. **Caching**
   - Static assets cached by browser
   - Vite handles cache busting

4. **Database Queries**
   - Indexed columns (city, category, status, user_id)
   - RLS policies optimized
   - Pagination ready (can be added)

## Scalability Considerations

1. **Database**
   - Supabase auto-scaling
   - Connection pooling configured
   - Indexes on frequently filtered columns

2. **Backend**
   - Serverless functions via Supabase Edge Functions
   - No server maintenance required
   - Auto-scaling based on load

3. **Frontend**
   - Vite provides fast builds
   - React lazy loading
   - CDN delivery via Vercel/Netlify

## Monitoring & Analytics

### Recommended Tools
- **Supabase Dashboard**: Monitor database performance
- **Vercel Analytics**: Track deployment and performance
- **Sentry**: Error tracking and monitoring
- **Mixpanel/Amplitude**: User analytics

## Testing Strategy

### Unit Tests
- Component rendering
- API function behavior

### Integration Tests
- Auth flow
- Lead CRUD operations
- Subscription updates

### E2E Tests
- Complete user journeys
- Payment flow
- Data persistence

## Deployment Pipeline

1. **Development**: `npm run dev`
2. **Build**: `npm run build` → Creates optimized bundle
3. **Preview**: `npm run preview`
4. **Production**: Push to GitHub → Vercel/Netlify auto-deploys

---

For detailed implementation questions, refer to component files and `SETUP.md`.
