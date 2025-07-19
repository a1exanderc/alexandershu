import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Heart, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  fabric: string;
  price: string;
  description: string;
  fabricType: 'silk' | 'cotton' | 'wool' | 'linen' | 'cashmere' | 'denim';
}

const products: Product[] = [
  {
    id: 1,
    name: 'ELECTRIC SILK SHIRT',
    fabric: 'Pure Silk',
    price: '$890',
    description: 'Luxurious silk with electric blue luminescence',
    fabricType: 'silk'
  },
  {
    id: 2,
    name: 'ELECTRIC COTTON TEE',
    fabric: 'Organic Cotton',
    price: '$290',
    description: 'Sustainable cotton in electric blue perfection',
    fabricType: 'cotton'
  },
  {
    id: 3,
    name: 'ELECTRIC WOOL COAT',
    fabric: 'Merino Wool',
    price: '$1,890',
    description: 'Premium wool tailoring in electric blue',
    fabricType: 'wool'
  },
  {
    id: 4,
    name: 'ELECTRIC LINEN PANTS',
    fabric: 'Belgian Linen',
    price: '$690',
    description: 'Breathable linen in electric blue elegance',
    fabricType: 'linen'
  },
  {
    id: 5,
    name: 'ELECTRIC CASHMERE SWEATER',
    fabric: 'Mongolian Cashmere',
    price: '$1,290',
    description: 'Ultra-soft cashmere in electric blue luxury',
    fabricType: 'cashmere'
  },
  {
    id: 6,
    name: 'ELECTRIC DENIM JACKET',
    fabric: 'Japanese Denim',
    price: '$790',
    description: 'Premium denim crafted in electric blue',
    fabricType: 'denim'
  }
];

const fabricTextures = {
  silk: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
  cotton: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
  wool: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800',
  linen: 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500',
  cashmere: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
  denim: 'bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900'
};

interface CollectionPageProps {
  onBack: () => void;
}

export default function CollectionPage({ onBack }: CollectionPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ProductCard = ({ product, index }: { product: Product; index: number }) => {
    const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (cardRef) {
        const rect = cardRef.getBoundingClientRect();
        setCardPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
    }, [cardRef, hoveredProduct]);

    const distance = cardRef ? Math.sqrt(
      Math.pow(mousePosition.x - cardPosition.x, 2) + 
      Math.pow(mousePosition.y - cardPosition.y, 2)
    ) : 0;

    const maxDistance = 300;
    const intensity = Math.max(0, 1 - distance / maxDistance);

    return (
      <div
        ref={setCardRef}
        className={`group relative cursor-pointer transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ 
          transitionDelay: `${index * 100}ms`,
          transform: hoveredProduct === product.id ? 'scale(1.02)' : 'scale(1)'
        }}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
        onClick={() => setSelectedProduct(product)}
      >
        {/* Dynamic Background Effect */}
        <div 
          className="absolute inset-0 rounded-lg transition-all duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x - (cardPosition.x - 200)}px ${mousePosition.y - (cardPosition.y - 200)}px, rgba(0,102,255,${intensity * 0.1}), transparent 70%)`,
            transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        
        {/* Product Image Area */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-6">
          <div 
            className={`absolute inset-0 ${fabricTextures[product.fabricType]} transition-all duration-700`}
            style={{
              transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)',
              filter: hoveredProduct === product.id ? 'brightness(1.1)' : 'brightness(1)'
            }}
          />
          
          {/* Fabric Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-30 transition-opacity duration-500"
            style={{
              backgroundImage: product.fabricType === 'silk' ? 
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)' :
                product.fabricType === 'cotton' ?
                'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 4px)' :
                product.fabricType === 'wool' ?
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)' :
                product.fabricType === 'linen' ?
                'linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%), linear-gradient(0deg, rgba(255,255,255,0.1) 50%, transparent 50%)' :
                product.fabricType === 'cashmere' ?
                'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 1px, transparent 1px)' :
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 6px)',
              backgroundSize: product.fabricType === 'silk' ? '40px 40px' :
                product.fabricType === 'cotton' ? '8px 8px' :
                product.fabricType === 'wool' ? '20px 20px' :
                product.fabricType === 'linen' ? '12px 12px' :
                product.fabricType === 'cashmere' ? '15px 15px' :
                '10px 10px',
              opacity: hoveredProduct === product.id ? 0.5 : 0.3
            }}
          />
          
          {/* Interactive Elements */}
          <div className={`absolute top-4 right-4 flex space-x-2 transition-all duration-500 ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Fabric Label */}
          <div className={`absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-500 ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-sm font-light text-blue-900">{product.fabric}</span>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-light tracking-wider group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-light">{product.price}</span>
            <button className={`px-6 py-2 bg-blue-600 text-white text-sm tracking-wider hover:bg-blue-700 transition-all duration-300 transform ${hoveredProduct === product.id ? 'scale-105' : 'scale-100'}`}>
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,102,255,0.02), transparent 50%)`
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-light tracking-wider">BACK</span>
            </button>
            
            <div className="text-2xl font-light tracking-widest">
              ELECTRIC COLLECTION
            </div>
            
            <button className="relative p-2 hover:bg-blue-50 rounded-full transition-all duration-300 group">
              <ShoppingBag className="w-6 h-6 text-gray-900 group-hover:text-blue-600 transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-6xl md:text-8xl font-extralight text-blue-600 mb-6 tracking-tight transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            ELECTRIC
          </h1>
          <p className={`text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Six fabrics. One color. Infinite expressions of electric blue elegance.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-light tracking-wider">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className={`h-96 rounded-lg ${fabricTextures[selectedProduct.fabricType]}`} />
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light mb-2">Fabric</h3>
                    <p className="text-gray-600">{selectedProduct.fabric}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Price</h3>
                    <p className="text-3xl font-light">{selectedProduct.price}</p>
                  </div>
                  <button className="w-full py-4 bg-blue-600 text-white font-light tracking-wider hover:bg-blue-700 transition-colors duration-300">
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 flex items-center justify-center z-40">
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}