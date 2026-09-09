# LeadSetu - Local Business Lead Management SaaS

A comprehensive SaaS platform for Indian local businesses and sales teams to find, track, and manage leads efficiently.

## Features

- 🔍 **Lead Discovery**: Search and filter local business leads by city and category
- 📞 **Call Tracking**: Log calls with outcomes, notes, and follow-up scheduling
- 💼 **CRM Dashboard**: Manage leads with status tracking and action buttons
- 💳 **Razorpay Integration**: Subscription-based pricing with multiple tiers
- 🔐 **Supabase Auth**: Email/Password and OTP authentication
- 📱 **Responsive Design**: Mobile-first, modern SaaS aesthetic

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS + Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Payment**: Razorpay
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 16+
- Supabase account
- Razorpay account

### Installation

1. Clone the repository
```bash
git clone https://github.com/akshaypawar1509-art/LeadSetu.git
cd LeadSetu
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your Supabase and Razorpay credentials.

4. Start development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── LeadsDashboard.jsx
│   ├── CallTrackerModal.jsx
│   ├── Pricing.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── Login.jsx
├── services/
│   ├── supabaseClient.js
│   └── api.js
├── App.jsx
├── App.css
└── index.css
```

## Pricing

- **Basic**: ₹499/month - 50 leads/month
- **Pro**: ₹999/month - Unlimited leads + CSV Export
- **Agency**: ₹2,499/month - Bulk export + Multi-city pipelines

## License

MIT
