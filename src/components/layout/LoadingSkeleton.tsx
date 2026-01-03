import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Cpu, FunctionSquare, Play, Search, BrainCircuit, PenTool, ImageIcon, Sparkles, FileText, CheckCircle } from 'lucide-react';

const Shimmer = ({ delay = 0 }) => (
  <motion.div
    className="absolute top-0 left-0 right-0 bottom-0"
    style={{
      background: `linear-gradient(to right, 
        transparent 0%, 
        rgba(249, 250, 251, 0.6) 50%, 
        transparent 100%
      )`,
    }}
    initial={{ transform: 'translateX(-100%)' }}
    animate={{ transform: 'translateX(100%)' }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear', 
      delay: delay, 
    }}
  />
);

const pulseAnimation = {
  animate: { opacity: [0.6, 1, 0.6] },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

const dotAnimation = {
  animate: { opacity: [0.3, 1, 0.3] },
  transition: {
    duration: 1.4, 
    repeat: Infinity,
    ease: "easeInOut",
  }
};

const BlinkingDots = () => (
  <motion.div
    className="flex ml-1" 
    variants={{
      start: { transition: { staggerChildren: 0.2 } } 
    }}
    initial="start"
    animate="start"
  >
    {/* @ts-ignore */}
    <motion.span variants={dotAnimation} className="text-xl">.</motion.span>
    {/* @ts-ignore */}
    <motion.span variants={dotAnimation} className="text-xl">.</motion.span>
    {/* @ts-ignore */}
    <motion.span variants={dotAnimation} className="text-xl">.</motion.span>
  </motion.div>
);

const loadingStates = [
  { text: "Analyzing your profile context", icon: <Search className="w-5 h-5 mr-2" /> },
  { text: "Identifying key career gaps", icon: <BrainCircuit className="w-5 h-5 mr-2" /> },
  { text: "Constructing realistic scenarios", icon: <PenTool className="w-5 h-5 mr-2" /> },
  { text: "Calibrating difficulty levels", icon: <Cpu className="w-5 h-5 mr-2" /> },
  { text: "Generating workspace visualization", icon: <ImageIcon className="w-5 h-5 mr-2" /> }, 
  { text: "Rendering photorealistic details", icon: <Sparkles className="w-5 h-5 mr-2" /> }, 
  { text: "Structuring your Daily 5 tasks", icon: <FileText className="w-5 h-5 mr-2" /> },
  { text: "Finalizing simulation", icon: <CheckCircle className="w-5 h-5 mr-2" /> },
];


export const LoadingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingStates.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 flex  text-lg font-medium text-blue-600">
      <AnimatePresence mode="wait">
        <motion.div
          key={index} 
          className="flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {loadingStates[index].icon}
          <span>{loadingStates[index].text}</span>
          <BlinkingDots />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LoadingSkeleton = () => (
  <>    
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <LoadingText />
          <motion.p
            className="text-sm text-gray-500 -mt-4" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            This is a complex simulation and may take a moment. Thanks for your patience!
          </motion.p>

          <motion.div
            className="w-full h-64 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.05} />
          </motion.div>
          <div className="space-y-3">
            <motion.div
              className="h-4 bg-gray-300 rounded-lg relative overflow-hidden"
              {...pulseAnimation}
            >
              <Shimmer delay={0.1} />
            </motion.div>
            <motion.div
              className="h-4 bg-gray-300 rounded-lg relative overflow-hidden"
              {...pulseAnimation}
            >
              <Shimmer delay={0.15} />
            </motion.div>
            <motion.div
              className="h-4 w-5/6 bg-gray-300 rounded-lg relative overflow-hidden"
              {...pulseAnimation}
            >
              <Shimmer delay={0.2} />
            </motion.div>
          </div>
          <motion.div
            className="h-24 w-full bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.25} />
          </motion.div>
          <motion.div
            className="h-24 w-full bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.3} />
          </motion.div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            className="w-full h-32 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.0} />
          </motion.div>
          <motion.div
            className="w-full h-32 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.05} />
          </motion.div>
          <motion.div
            className="w-full h-32 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.1} />
          </motion.div>
        </div>
      </div>
    </div>
  </>
);

export default LoadingSkeleton;

