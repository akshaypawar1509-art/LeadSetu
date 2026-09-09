import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import LeadsDashboard from '../components/LeadsDashboard.jsx';
import CallTrackerModal from '../components/CallTrackerModal.jsx';
import Footer from '../components/Footer.jsx';
import { getCurrentUser } from '../services/api.js';

const Dashboard = ({ isAuthenticated, onSignOut }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [userPlan, setUserPlan] = useState('Basic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, navigate]);

  const handleCallClick = (lead) => {
    setSelectedLead(lead);
    setIsCallModalOpen(true);
  };

  const handleCallSave = (callData) => {
    console.log('Call saved:', callData);
    setIsCallModalOpen(false);
    setSelectedLead(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header isAuthenticated={isAuthenticated} onSignOut={onSignOut} />

      <div className="flex-1">
        {/* Dashboard Header */}
        <div className="bg-slate-800 border-b border-slate-700 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, {user?.email?.split('@')[0]}! 👋</h1>
                <p className="text-slate-400 mt-2">Manage your leads and close more deals</p>
              </div>
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-lg px-4 py-2">
                <p className="text-sm text-slate-300">Plan: <span className="font-bold text-indigo-400">{userPlan}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <LeadsDashboard
          filters={{}}
          onCallClick={handleCallClick}
          userPlan={userPlan}
        />
      </div>

      <Footer />

      {/* Call Tracker Modal */}
      <CallTrackerModal
        lead={selectedLead}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onSave={handleCallSave}
      />
    </div>
  );
};

export default Dashboard;
