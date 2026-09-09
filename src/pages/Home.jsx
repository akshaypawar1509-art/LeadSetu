import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import LeadsDashboard from '../components/LeadsDashboard.jsx';
import Pricing from '../components/Pricing.jsx';
import Footer from '../components/Footer.jsx';

const Home = ({ isAuthenticated, onSignOut }) => {
  const [searchFilters, setSearchFilters] = useState(null);
  const [showLeads, setShowLeads] = useState(false);
  const userPlan = 'Basic'; // Mock user plan

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setShowLeads(true);
    // Scroll to leads section
    setTimeout(() => {
      const leadsSection = document.getElementById('leads');
      if (leadsSection) {
        leadsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCallClick = (lead) => {
    console.log('Call clicked for:', lead);
    // This will be handled by App.jsx
  };

  const handleSubscribe = (plan) => {
    // Initialize Razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: plan.price * 100, // Convert to paise
      currency: 'INR',
      name: 'LeadSetu',
      description: `${plan.name} Plan Subscription`,
      handler: function (response) {
        console.log('Payment successful:', response);
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        email: 'user@example.com',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header isAuthenticated={isAuthenticated} onSignOut={onSignOut} />
      <Hero onSearch={handleSearch} />
      {showLeads && (
        <div id="leads">
          <LeadsDashboard
            filters={searchFilters}
            onCallClick={handleCallClick}
            userPlan={userPlan}
          />
        </div>
      )}
      <Pricing onSubscribe={handleSubscribe} />
      <Footer />
    </div>
  );
};

export default Home;
