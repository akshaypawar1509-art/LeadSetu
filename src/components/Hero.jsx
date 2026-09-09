import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [city, setCity] = React.useState('');
  const [category, setCategory] = React.useState('');

  const cities = ['Pune', 'Mumbai', 'Solapur', 'Nashik'];
  const categories = ['Real Estate', 'Restaurants', 'Clinics', 'Interior Designers'];

  const handleSearch = () => {
    if (city && category) {
      onSearch({ city, category });
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find local business leads.
            <br />
            <span className="text-indigo-500">Call them. Close them.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Access verified local business contacts across India. Track calls, manage follow-ups, and close more deals.
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
          {/* City Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select City</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="select-field"
              >
                <option value="">Choose a city</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-field"
              >
                <option value="">Choose a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={!city || !category}
              className="btn-secondary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={20} />
              <span>Search Leads</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-500">50K+</div>
            <div className="text-slate-400 text-sm">Verified Leads</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-500">4.8★</div>
            <div className="text-slate-400 text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-500">24/7</div>
            <div className="text-slate-400 text-sm">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
