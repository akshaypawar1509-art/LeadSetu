import React, { useState } from 'react';
import { X, Phone, Calendar } from 'lucide-react';
import { logCall } from '../services/api';

const CallTrackerModal = ({ lead, isOpen, onClose, onSave }) => {
  const [callOutcome, setCallOutcome] = useState('');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('');
  const [loading, setLoading] = useState(false);

  const outcomes = ['Connected', 'No Answer', 'Busy', 'Interested'];

  const handleSave = async () => {
    if (!callOutcome) {
      alert('Please select a call outcome');
      return;
    }

    setLoading(true);
    try {
      const callData = {
        lead_id: lead.id,
        outcome: callOutcome,
        notes,
        follow_up_date: followUpDate,
        follow_up_time: followUpTime,
        created_at: new Date().toISOString(),
      };

      await logCall(lead.id, callData);
      onSave(callData);
      onClose();
    } catch (error) {
      console.error('Error logging call:', error);
      alert('Error logging call. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Phone size={24} className="text-indigo-500" />
            <div>
              <h3 className="text-xl font-bold text-white">Log Call</h3>
              <p className="text-sm text-slate-400">{lead.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Call Outcome */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Call Outcome</label>
            <div className="grid grid-cols-2 gap-3">
              {outcomes.map((outcome) => (
                <button
                  key={outcome}
                  onClick={() => setCallOutcome(outcome)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                    callOutcome === outcome
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {outcome}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add call notes..."
              className="input-field resize-none h-24"
            />
          </div>

          {/* Follow-up Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Follow-up Time</label>
              <input
                type="time"
                value={followUpTime}
                onChange={(e) => setFollowUpTime(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Call'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallTrackerModal;
