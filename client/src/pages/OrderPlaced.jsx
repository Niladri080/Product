import { useState, useEffect } from 'react';
import { CheckCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function OrderPlaced() {
  const navigate=useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Trigger animations on mount
    const timer1 = setTimeout(() => setShowAnimation(true), 300);
    const timer2 = setTimeout(() => setShowConfetti(false), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const FloatingElement = ({ delay, duration, children, className }) => (
    <div 
      className={`absolute animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  );

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {[...Array(60)].map((_, i) => {
        const colors = ['bg-pink-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-red-400'];
        const shapes = ['w-3 h-3 rounded-full', 'w-2 h-4 rounded-sm', 'w-4 h-2 rounded-sm'];
        
        return (
          <div
            key={i}
            className={`absolute ${colors[Math.floor(Math.random() * colors.length)]} ${shapes[Math.floor(Math.random() * shapes.length)]} opacity-80`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animation: `fall ${3 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-pink-400 to-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Icons */}
        <FloatingElement delay={0} duration={3} className="top-1/4 left-1/4">
          <Sparkles className="h-8 w-8 text-yellow-300 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={1} duration={4} className="top-1/3 right-1/4">
          <Sparkles className="h-6 w-6 text-pink-300 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={2} duration={3.5} className="bottom-1/3 left-1/3">
          <Sparkles className="h-7 w-7 text-blue-300 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={4.5} className="top-1/2 right-1/3">
          <Sparkles className="h-5 w-5 text-green-300 opacity-60" />
        </FloatingElement>
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className={`inline-flex items-center justify-center mb-8 transition-all duration-1000 ${
          showAnimation ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
        }`}>
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="h-16 w-16 text-white animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-2 w-28 h-28 bg-green-300 rounded-full opacity-30 animate-ping" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>

        {/* Success Message */}
        <div className={`transition-all duration-1000 delay-300 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Order Placed!
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light">
            🎉 Thank you for your purchase! Your order has been successfully placed.
          </p>
        </div>

        {/* Continue Shopping Button */}
        <div className={`transition-all duration-1000 delay-500 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button onClick={()=>{
            navigate('/user/dashboard');
          }}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1">
            <ShoppingBag className="h-6 w-6 mr-3 transition-transform group-hover:scale-110" />
            Continue Shopping
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className={`mt-16 flex justify-center space-x-4 transition-all duration-1000 delay-700 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"
              style={{animationDelay: `${i * 0.2}s`}}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white opacity-10"></path>
        </svg>
      </div>
    </div>
  );
}