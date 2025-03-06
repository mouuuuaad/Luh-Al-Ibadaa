import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const animationFrameId = useRef(null);
  
  const particlesRef = useRef(
    Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.2
    }))
  );

  const [features] = useState([
    { 
      icon: "🔄", 
      title: "Real-time Sync", 
      description: "Changes propagate instantly across all devices" 
    },
    { 
      icon: "🔌", 
      title: "API Integration", 
      description: "Connect with your preferred tools seamlessly", 
      comingSoon: true 
    },
    { 
      icon: "🧩", 
      title: "Custom Components", 
      description: "Build reusable diagram elements for your team" 
    },
    { 
      icon: "🤖", 
      title: "AI Assistant", 
      description: "Generate diagrams from text descriptions", 
      comingSoon: true 
    }
  ]);

  const [currentFeature, setCurrentFeature] = useState(0);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const animateParticles = () => {
      particlesRef.current = particlesRef.current.map(particle => {
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;

        if (newX > 100 || newX < 0) particle.speedX *= -1;
        if (newY > 100 || newY < 0) particle.speedY *= -1;

        return { 
          ...particle,
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY))
        };
      });

      controls.start({ opacity: 1 });
      animationFrameId.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [controls]);

  // Feature carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-b from-slate-950 to-slate-900 relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Particles */}
      <div className="absolute inset-0 mix-blend-screen">
        {particlesRef.current.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            animate={{ 
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              scale: isHovering ? 1.3 : 1
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/50 to-blue-500/50"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: "blur(12px)"
            }}
          />
        ))}
      </div>

      {/* Dynamic 3D Grid */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        animate={{
          rotateX: mousePosition.y * 10 - 5,
          rotateY: mousePosition.x * 10 - 5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px]" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl h-full flex flex-col justify-center px-4">
        {/* Feature Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="px-6 py-2 rounded-full border border-blue-500/30 bg-black/30 backdrop-blur-xl flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-sm">
              Introducing AI Diagrams
            </span>
          </div>
        </motion.div>

        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6 mt-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
            Unleash Your Creativity with
            </span>
            <br />
            <span className="text-white/90">Luh Al-Ibdaa</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Bring your vision to life with seamless collaboration and AI-enhanced tools.
          </p>
        </motion.div>

        {/* Feature Carousel */}
        <div className="mt-12 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl text-2xl">
                  {features[currentFeature].icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-3">
                    {features[currentFeature].title}
                    {features[currentFeature].comingSoon && (
                      <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </h3>
                  <p className="text-white/70">
                    {features[currentFeature].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentFeature === index ? 'bg-blue-400' : 'bg-white/20'
                }`}
                onClick={() => setCurrentFeature(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.a
            href='dashboard'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-medium text-white shadow-xl hover:shadow-blue-500/30 transition-all"
          >
            Start Free Trial
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-lg font-medium text-white hover:bg-white/10 transition-all"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>
    </section>
  );
}

export default Hero;