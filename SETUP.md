# LeadSetu - Full-Stack SaaS Setup Guide

## 📋 Prerequisites

- Node.js 16 or higher
- npm or yarn package manager
- Supabase account (https://supabase.com)
- Razorpay account (https://razorpay.com)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/akshaypawar1509-art/LeadSetu.git
cd LeadSetu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### a. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - Name: LeadSetu
   - Database Password: Create a secure password
   - Region: Choose your region (e.g., ap-south-1 for India)
4. Click "Create new project" and wait for it to complete

#### b. Set Up Database Schema

1. Go to the SQL Editor in Supabase
2. Copy the entire contents of `supabase/schema.sql`
3. Paste it in the SQL Editor and execute
4. This will create all necessary tables, indexes, and Row Level Security policies

#### c. Get Your Credentials

1. Go to Settings > API
2. Copy your Project URL (VITE_SUPABASE_URL)
3. Copy your anon public key (VITE_SUPABASE_ANON_KEY)

### 4. Set Up Razorpay

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to Settings > API Keys
3. Copy your Key ID (VITE_RAZORPAY_KEY_ID)
4. Keep your Key Secret safe (use it on the backend only)

### 5. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your credentials:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

### 6. Enable Email Authentication in Supabase

1. Go to Authentication > Providers
2. Enable "Email" if not already enabled
3. Configure email settings under "Email" > "Email Provider Settings"
4. (Optional) Enable SMS OTP under "Phone" provider

### 7. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
LeadSetu/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navigation header
│   │   ├── Hero.jsx             # Landing page hero section
│   │   ├── LeadsDashboard.jsx    # Main leads table
│   │   ├── CallTrackerModal.jsx  # Call logging modal
│   │   ├── Pricing.jsx           # Pricing section
│   │   └── Footer.jsx            # Footer
│   ├── pages/
│   ��   ├── Home.jsx             # Landing page
│   │   ├── Login.jsx            # Auth page
│   │   └── Dashboard.jsx        # User dashboard
│   ├── services/
│   │   ├── supabaseClient.js    # Supabase client initialization
│   │   └── api.js              # API functions
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── supabase/
│   └── schema.sql               # Database schema
├── public/                       # Static assets
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── package.json                 # Dependencies
└── README.md                    # Documentation
```

## 🎯 Key Features Implementation

### 1. Authentication
- Email/Password signup and login via Supabase Auth
- Session management with JWT tokens
- Protected routes with authentication checks

### 2. Lead Management
- Search and filter leads by city and category
- Display lead information in a responsive table
- Status tracking (New, Contacted, Interested, Closed)
- Real-time updates via Supabase Realtime

### 3. Call Tracking
- Modal-based call logging interface
- Record call outcomes (Connected, No Answer, Busy, Interested)
- Add detailed notes for each call
- Schedule follow-ups with date and time
- Automatic lead status updates

### 4. Subscription Management
- Three tier pricing plans
- Razorpay payment integration
- Plan-based feature access (CSV export for Pro/Agency)
- Subscription status tracking in database

### 5. User Interface
- Modern dark theme with indigo/emerald accents
- Fully responsive mobile-first design
- Smooth animations and transitions
- Accessible form controls and buttons

## 📱 Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| **Basic** | ₹499/mo | 50 leads/month, Call logging, Notes, Email support |
| **Pro** | ₹999/mo | Unlimited leads, CSV export, Advanced filters, Priority support |
| **Agency** | ₹2,499/mo | Unlimited everything, Bulk export, Multi-city pipelines, Dedicated support |

## 🔐 Security Features

- Row Level Security (RLS) on all tables
- User data isolation at database level
- HTTPS-only API communication
- Secure password hashing via Supabase
- Protected API endpoints with authentication
- Environment variables for sensitive credentials

## 📊 Database Schema

### Tables

1. **leads** - Business lead information
2. **call_logs** - Call tracking and history
3. **subscriptions** - User subscription management
4. **user_profiles** - User profile information

See `supabase/schema.sql` for detailed schema.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Build command: `npm run build`
5. Publish directory: `dist`

## 🐛 Troubleshooting

### "Supabase connection error"
- Verify your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
- Ensure your Supabase project is active
- Check your internet connection

### "Razorpay payment not working"
- Verify your VITE_RAZORPAY_KEY_ID is correct
- Ensure you're using test mode keys for development
- Check browser console for errors

### "Can't access dashboard after login"
- Clear browser cookies and cache
- Check that RLS policies are properly enabled
- Verify user_id is correctly stored in session

## 📚 API Documentation

See `src/services/api.js` for available functions:
- `signUpWithEmail(email, password)`
- `signInWithEmail(email, password)`
- `signOut()`
- `getCurrentUser()`
- `getLeads(filters)`
- `createLead(leadData)`
- `updateLead(leadId, updates)`
- `logCall(leadId, callData)`
- `getCallLogs(leadId)`
- `getUserSubscription(userId)`
- `createSubscription(subscriptionData)`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues and support:
- Open an issue on GitHub
- Email: support@leadsetu.com
- Discord: [Join our community](https://discord.gg/leadsetu)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Razorpay Integration Guide](https://razorpay.com/docs/)
- [Lucide Icons](https://lucide.dev)

---

**Made with ❤️ for Indian entrepreneurs and sales teams**
