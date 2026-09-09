import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Download, Filter, ChevronDown } from 'lucide-react';
import { getLeads } from '../services/api';

const LeadsDashboard = ({ filters, onCallClick, userPlan }) => {
  const [leads, setLeads] = React.useState([
    {
      id: 1,
      name: 'ABC Real Estate',
      category: 'Real Estate',
      city: 'Pune',
      phone: '+91 98765 43210',
      rating: 4.5,
      status: 'New',
    },
    {
      id: 2,
      name: 'The Gourmet Kitchen',
      category: 'Restaurants',
      city: 'Mumbai',
      phone: '+91 98765 43211',
      rating: 4.2,
      status: 'Contacted',
    },
    {
      id: 3,
      name: 'Dr. Sharma Clinic',
      category: 'Clinics',
      city: 'Pune',
      phone: '+91 98765 43212',
      rating: 4.8,
      status: 'Interested',
    },
    {
      id: 4,
      name: 'Elite Interiors',
      category: 'Interior Designers',
      city: 'Nashik',
      phone: '+91 98765 43213',
      rating: 4.6,
      status: 'New',
    },
  ]);

  const [statusFilter, setStatusFilter] = React.useState('');
  const statuses = ['New', 'Contacted', 'Interested', 'Closed'];

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter && lead.status !== statusFilter) return false;
    if (filters?.city && lead.city !== filters.city) return false;
    if (filters?.category && lead.category !== filters.category) return false;
    return true;
  });

  const handleExportCSV = () => {
    if (!['Pro', 'Agency'].includes(userPlan)) {
      alert('CSV Export is available in Pro and Agency plans');
      return;
    }

    const csv = [
      ['Business Name', 'Category', 'City', 'Phone Number', 'Rating', 'Status'],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.category,
        lead.city,
        lead.phone,
        lead.rating,
        lead.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
  };

  return (
    <div className="bg-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Leads Dashboard</h2>
            <p className="text-slate-400 mt-2">Found {filteredLeads.length} leads</p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={!['Pro', 'Agency'].includes(userPlan)}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} />
            <span>Export to CSV</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 sm:flex-none">
            <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Status</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select-field"
              >
                <option value="">All Status</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-700 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Business Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="table-row-hover border-b border-slate-700">
                    <td className="px-6 py-4 text-sm text-white font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{lead.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{lead.city}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{lead.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">⭐ {lead.rating}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lead.status === 'New'
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : lead.status === 'Contacted'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : lead.status === 'Interested'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-500/20 text-slate-300'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onCallClick(lead)}
                          className="p-2 hover:bg-slate-700 rounded-lg transition"
                          title="Log Call"
                        >
                          <Phone size={18} className="text-indigo-500" />
                        </button>
                        <button
                          className="p-2 hover:bg-slate-700 rounded-lg transition"
                          title="Add Note"
                        >
                          <MessageSquare size={18} className="text-emerald-500" />
                        </button>
                        <button
                          className="p-2 hover:bg-slate-700 rounded-lg transition"
                          title="Schedule Follow-up"
                        >
                          <Calendar size={18} className="text-yellow-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                    No leads found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
