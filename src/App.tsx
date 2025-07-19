import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Instagram, Twitter } from 'lucide-react';
import CollectionPage from './components/CollectionPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'collection'>('home');

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const collections = [
    { name: 'MINIMAL', items: '12 pieces' },
    { name: 'ELECTRIC', items: '8 pieces' },
    { name: 'FUTURE', items: '15 pieces' }
  ];

  if (currentPage === 'collection') {
    return <CollectionPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,102,255,0.03), transparent 50%)`
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-light tracking-widest transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              ALEXANDER SHU
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 p-2 hover:bg-blue-50 rounded-full transition-all duration-300 group"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-blue-600 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 group-hover:text-blue-600 transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 z-40 bg-blue-600 transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            {['Collections', 'About', 'Contact', 'Sustainability'].map((item, index) => (
              <div
                key={item}
                className={`text-6xl md:text-8xl font-light text-white mb-6 cursor-pointer hover:text-blue-200 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className={`text-8xl md:text-9xl font-extralight text-blue-600 mb-8 tracking-tight transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            ELECTRIC
          </h1>
          <p className={`text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            One color. Infinite possibilities. Redefining fashion through minimalist electric blue aesthetics.
          </p>
          <button className={`group relative px-12 py-4 bg-blue-600 text-white font-light text-lg tracking-wider hover:bg-blue-700 transition-all duration-500 transform hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
            <span onClick={() => setCurrentPage('collection')}>EXPLORE COLLECTION</span>
            <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-800 rounded-full animate-pulse delay-500" />
      </section>

      {/* Collections Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-20 tracking-tight">
            COLLECTIONS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div
                key={collection.name}
                className="group relative bg-gray-50 hover:bg-blue-50 transition-all duration-700 cursor-pointer"
                style={{ height: '600px' }}
              >
                <div className="absolute inset-0 bg-blue-600 transform scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-light mb-2 group-hover:text-white transition-colors duration-500">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 group-hover:text-blue-200 transition-colors duration-500">
                      {collection.items}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-12 tracking-tight">
            PHILOSOPHY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              { title: 'SIMPLICITY', desc: 'One color, infinite expressions' },
              { title: 'INNOVATION', desc: 'Pushing boundaries of minimalism' },
              { title: 'SUSTAINABILITY', desc: 'Conscious fashion for the future' }
            ].map((item, index) => (
              <div key={item.title} className="group cursor-pointer">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-light mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-12 tracking-tight">
            CONNECT
          </h2>
          <p className="text-xl font-light mb-12 text-blue-100">
            Join the electric revolution
          </p>
          
          <div className="flex justify-center space-x-8 mb-16">
            {[Instagram, Twitter].map((Icon, index) => (
              <button
                key={index}
                className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            ))}
          </div>
          
          <div className="border-t border-white/20 pt-12">
            <p className="text-sm font-light text-blue-200 tracking-widest">
              © 2025 ALEXANDER SHU. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;