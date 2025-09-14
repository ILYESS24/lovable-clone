'use client';

import { Button } from "@/components/ui/button";
import { 
  ChevronDown,
  MessageCircle,
  Linkedin,
  Twitter,
  Github,
  Figma,
  Link,
  Sparkles,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">bolt</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Community</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Enterprise</a>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Resources</a>
                <ChevronDown className="w-4 h-4 text-white" />
              </div>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Careers</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Pricing</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer" />
                <Twitter className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer" />
                <MessageCircle className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white">
              What should we build today?
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Create stunning apps & websites by chatting with AI.
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
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your idea and we'll build it together."
                className="w-full max-w-4xl h-16 px-6 bg-gray-900/30 border border-gray-700 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
              />
              
              {/* Input Icons */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                <Link className="w-4 h-4 text-gray-400" />
                <Sparkles className="w-4 h-4 text-gray-400" />
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </motion.div>

          {/* Import Options */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <p className="text-gray-400 mb-4">or import from</p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="bg-gray-900/30 border-gray-700 text-white hover:bg-gray-800 hover:text-white h-12 px-6"
              >
                <Figma className="w-5 h-5 mr-2" />
                Figma
              </Button>
              <Button 
                variant="outline" 
                className="bg-gray-900/30 border-gray-700 text-white hover:bg-gray-800 hover:text-white h-12 px-6"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Glowing Arc - Exactement comme dans l'image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden"
        >
          <div className="relative w-full h-full">
            {/* Arc principal - courbe exacte comme dans l'image */}
            <svg 
              className="absolute bottom-0 left-0 w-full h-full" 
              viewBox="0 0 1200 200" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="20%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="80%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="20%" stopColor="rgba(59, 130, 246, 0.6)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
                  <stop offset="80%" stopColor="rgba(59, 130, 246, 0.6)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              
              {/* Arc principal blanc avec glow bleu */}
              <path 
                d="M0,150 Q300,50 600,100 T1200,80 L1200,200 L0,200 Z" 
                fill="url(#arcGradient)"
                className="animate-pulse"
              />
              
              {/* Glow bleu en arrière-plan */}
              <path 
                d="M0,160 Q300,60 600,110 T1200,90 L1200,200 L0,200 Z" 
                fill="url(#arcGlow)"
                className="blur-sm opacity-60"
              />
            </svg>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/20 backdrop-blur-sm py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-lg font-semibold text-white">bolt</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 StackBlitz - All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-white mb-2">Resources</span>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Support <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Blog <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Gallery <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Status <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </div>
              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-white mb-2">Company</span>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Careers <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Privacy <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  Terms <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </div>
              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-white mb-2">Social</span>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Linkedin className="w-4 h-4 hover:text-white cursor-pointer" />
                  <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Twitter className="w-4 h-4 hover:text-white cursor-pointer" />
                  <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
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
