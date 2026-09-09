import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">LS</span>
              </div>
              <h3 className="text-xl font-bold text-white">LeadSetu</h3>
            </div>
            <p className="text-slate-400 text-sm">Find, track, and close local business leads faster.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
              <li><a href="#" className="hover:text-white transition">Status</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; 2024 LeadSetu. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
