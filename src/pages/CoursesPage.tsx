import React from 'react';
import { motion } from 'framer-motion';
import { Play, Book, Clock, Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'League of Legends: Do Iniciante ao Pro',
    instructor: 'João Silva',
    duration: '12 horas',
    level: 'Iniciante',
    rating: 4.8,
    students: 1234,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    description: 'Aprenda todas as mecânicas básicas e avançadas para dominar as ranqueadas.'
  },
  {
    id: 2,
    title: 'CS2: Táticas Avançadas',
    instructor: 'Maria Games',
    duration: '8 horas',
    level: 'Avançado',
    rating: 4.9,
    students: 856,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    description: 'Domine estratégias profissionais, smokes e retakes.'
  },
  // Add more courses...
];

export const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Cursos em Destaque</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Aprenda com os melhores jogadores e eleve seu gameplay ao próximo nível
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-purple-600 p-4 rounded-full">
                    <Play className="w-8 h-8" />
                  </div>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-purple-500 text-sm mb-2">
                  <Book size={16} />
                  <span>{course.level}</span>
                  <span className="text-gray-500">•</span>
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-gray-400 text-sm">
                      ({course.students} alunos)
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Começar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};