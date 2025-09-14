'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowUp,
  Paperclip,
  Link,
  HelpCircle,
  Github,
  Figma,
  Server,
  Code,
  Zap,
  ChevronDown,
  Bell,
  User,
  Plus,
  MessageCircle,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Fusion</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Enterprise</a>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a>
                <ChevronDown className="w-4 h-4 text-gray-300" />
              </div>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                <MessageCircle className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                <Plus className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                <User className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              INTRODUCING FUSION
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              What should we build?
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              using your existing design & code context
            </p>
          </motion.div>

          {/* Central Input Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="relative">
              {/* Left Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Curved Line */}
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-5">
                <svg width="100" height="20" viewBox="0 0 100 20" className="text-blue-400">
                  <path 
                    d="M0 10 Q50 0 100 10" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none"
                    className="opacity-60"
                  />
                </svg>
              </div>

              {/* Main Input */}
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Fusion to build a complete and production ready CRM |"
                  className="w-full max-w-4xl h-20 px-6 pl-32 pr-20 bg-gray-900/50 border border-gray-700 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                />
                
                {/* Input Icons */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                  <ArrowUp className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </div>

            {/* Bottom Icons */}
            <div className="flex items-center justify-between mt-4 px-6">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Attach</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Integration Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Button 
              variant="outline" 
              className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white h-12 px-6"
            >
              <Github className="w-5 h-5 mr-2" />
              Connect a repo
            </Button>
            <Button 
              variant="outline" 
              className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white h-12 px-6"
            >
              <Figma className="w-5 h-5 mr-2" />
              Figma Import
            </Button>
            <Button 
              variant="outline" 
              className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white h-12 px-6"
            >
              <Server className="w-5 h-5 mr-2" />
              MCP Servers
            </Button>
            <Button 
              variant="outline" 
              className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white h-12 px-6"
            >
              <Code className="w-5 h-5 mr-2" />
              Get Extension
            </Button>
          </motion.div>

          {/* Glowing Arc */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-32 relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-xl"></div>
                {/* Inner Arc */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                {/* Main Arc */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Fusion</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Fusion - All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-white mb-2">Resources</span>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Support <ArrowRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Blog <ArrowRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Gallery <ArrowRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Status <ArrowRight className="w-3 h-3 ml-1" />
                </a>
              </div>
              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-white mb-2">Company</span>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-white mb-2">Social</span>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Linkedin className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Youtube className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Twitter className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Instagram className="w-4 h-4 hover:text-white cursor-pointer" />
                  <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
