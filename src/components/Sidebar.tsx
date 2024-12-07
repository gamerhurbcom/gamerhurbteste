import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, BookOpen, Users, MessageSquare, Settings } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={24} />, label: 'Início', path: '/dashboard' },
    { icon: <Gamepad2 size={24} />, label: 'Cursos', path: '/courses' },
    { icon: <BookOpen size={24} />, label: 'Biblioteca', path: '/library' },
    { icon: <Users size={24} />, label: 'Comunidade', path: '/community' },
    { icon: <MessageSquare size={24} />, label: 'Mensagens', path: '/messages' },
    { icon: <Settings size={24} />, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 h-screen sticky top-0">
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold text-white">GamerHurb</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};