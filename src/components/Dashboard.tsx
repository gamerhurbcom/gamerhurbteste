import React from 'react';
import { PostForm } from './dashboard/PostForm';
import { Feed } from './dashboard/Feed';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../store/authStore';
import { LogOut, Bell, Search } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      
      <div className="flex-1">
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-bold text-white md:hidden">GamerHurb</h1>
              
              <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <button className="relative text-gray-400 hover:text-white">
                  <Bell size={24} />
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 text-red-500 hover:text-red-400"
                >
                  <LogOut size={24} />
                  <span className="hidden md:inline">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto px-4 py-6">
          <PostForm />
          <Feed />
        </main>
      </div>
    </div>
  );
};