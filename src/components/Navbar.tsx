import React from 'react';
import { Compass, Sparkles, BookOpen, MessageSquareText, LayoutDashboard, Map } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkedCount: number;
  enrolledCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, bookmarkedCount, enrolledCount }) => {
  const navItems = [
    { id: 'careers', label: 'Career Explorer', icon: Compass },
    { id: 'match', label: 'AI Career Match', icon: Sparkles },
    { id: 'roadmap', label: 'Roadmap Generator', icon: Map },
    { id: 'coach', label: 'AI Career Coach', icon: MessageSquareText },
    { id: 'courses', label: 'EdTech Courses', icon: BookOpen },
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('careers')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-violet-800 bg-clip-text text-transparent">
                EdVenture
              </span>
              <span className="block text-xs font-medium text-slate-500 tracking-wider uppercase">
                Career & EdTech Hub
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.id === 'dashboard' && (bookmarkedCount > 0 || enrolledCount > 0) && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                      {bookmarkedCount + enrolledCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Mobile menu trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('match')}
              className="hidden sm:inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get AI Match</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom / Secondary Nav */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/80 space-x-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
