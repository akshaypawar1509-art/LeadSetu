import React from 'react';
import { Check, Zap } from 'lucide-react';

const Pricing = ({ onSubscribe }) => {
  const plans = [
    {
      name: 'Basic',
      price: 499,
      description: 'Perfect for individuals',
      features: [
        '50 leads/month',
        'Call logging & notes',
        'Basic filters',
        'Email support',
        'Single user',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
      planId: 'basic',
    },
    {
      name: 'Pro',
      price: 999,
      description: 'For growing teams',
      features: [
        'Unlimited leads',
        'CSV export',
        'Advanced filters',
        'Priority support',
        'Up to 3 users',
        'Call analytics',
      ],
      cta: 'Upgrade to Pro',
      highlighted: true,
      planId: 'pro',
    },
    {
      name: 'Agency',
      price: 2499,
      description: 'Enterprise solution',
      features: [
        'Unlimited everything',
        'Bulk export',
        'Multi-city pipelines',
        'Dedicated support',
        'Unlimited users',
        'Custom integrations',
        'API access',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      planId: 'agency',
    },
  ];

  const handleSubscribe = (plan) => {
    if (plan.planId === 'agency') {
      alert('Please contact our sales team for enterprise pricing.');
      return;
    }
    onSubscribe(plan);
  };

  return (
    <div id="pricing" className="bg-slate-900 py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-400">Choose the plan that fits your needs. All plans include a 7-day free trial.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-indigo-500 bg-slate-800 ring-2 ring-indigo-500 transform md:scale-105'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-indigo-600 text-white py-2 px-4 text-center text-sm font-semibold flex items-center justify-center space-x-2">
                  <Zap size={16} />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">₹{plan.price}</span>
                  <span className="text-slate-400 ml-2">/month</span>
                  <p className="text-slate-500 text-xs mt-2">Billed monthly. First 7 days free.</p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition mb-8 ${
                    plan.highlighted
                      ? 'btn-secondary'
                      : 'btn-primary'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 pt-12 border-t border-slate-700 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Can I cancel anytime?</h4>
            <p className="text-slate-400 text-sm">Yes, cancel your subscription at any time with no questions asked. No long-term contracts.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Do you offer refunds?</h4>
            <p className="text-slate-400 text-sm">Absolutely. 30-day money-back guarantee if you're not satisfied with our service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
