'use client'

import { motion } from 'framer-motion'
import { useId } from 'react'
const mainPaths = [
  
  { 
    id: 'path-past',
    d: "M10 100 C 10 80, 15 65, 20 50", 
    type: "completed" 
  },
 
  { 
    id: 'path-present',
    d: "M20 50 C 25 35, 75 55, 85 35", 
    type: "active" 
  },

  { 
    id: 'path-future',
    d: "M85 35 C 90 20, 80 10, 60 5", 
    type: "future" 
  }
]

const echoPaths = [
  { d: "M15 100 C 15 85, 10 70, 5 60", opacity: 0.1 },
  { d: "M85 35 C 92 30, 96 20, 98 10", opacity: 0.1 },
  { d: "M20 50 C 10 45, 5 40, 0 35", opacity: 0.05 }
]

const nodes = [
  { id: 'n1', x: 20, y: 50, status: 'completed', label: 'Foundation' },
  { id: 'n2', x: 85, y: 35, status: 'active',    label: 'Current' },
  { id: 'n3', x: 60, y: 5,  status: 'locked',    label: 'Goal' },
]


const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.4, type: "spring", duration: 3, bounce: 0 },
      opacity: { duration: 1 }
    }
  })
}

const rippleEffect = {
  animate: {
    scale: [1, 2.5],
    opacity: [0.5, 0],
    strokeWidth: ["0.5px", "0px"],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeOut"
    }
  }
}

export default function HeroSkillTree() {
  const id = useId()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet" 
      >
        <defs>
          <linearGradient id={`${id}-grad-completed`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={`${id}-grad-active`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter
  id={`${id}-glow`}
  x="-50%"
  y="-50%"
  width="200%"
  height="200%"
  filterUnits="objectBoundingBox"
>
  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
  <feMerge>
    <feMergeNode in="coloredBlur" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>

        </defs>
        {echoPaths.map((path, i) => (
          <path
            key={`echo-${i}`}
            d={path.d}
            fill="none"
            stroke="#64748b" 
            strokeWidth="0.1"
            strokeOpacity={path.opacity}
            strokeDasharray="1 1"
          />
        ))}
        {mainPaths.map((path, i) => (
          <g key={path.id}>
            <motion.path
              d={path.d}
              fill="none"
              stroke={
                path.type === 'completed' ? `url(#${id}-grad-completed)` :
                path.type === 'active' ? `url(#${id}-grad-active)` :
                "#cbd5e1" 
              }
              strokeWidth={path.type === 'future' ? "0.2" : "0.35"}
              strokeDasharray={path.type === 'future' ? "1 2" : "none"}
              strokeLinecap="round"
              strokeOpacity={path.type === 'future' ? 0.5 : 1}
              variants={drawLine}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            />
            {path.type !== 'future' && (
              <circle r="0.6" fill="white">
                <animateMotion 
                  dur={path.type === 'active' ? "4s" : "6s"} 
                  repeatCount="indefinite" 
                  path={path.d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
                <animate 
                    attributeName="opacity" 
                    values="0;1;0" 
                    dur={path.type === 'active' ? "4s" : "6s"} 
                    repeatCount="indefinite" 
                />
              </circle>
            )}
          </g>
        ))}
        {nodes.map((node, i) => {
          const isActive = node.status === 'active';
          const isCompleted = node.status === 'completed';

          return (
            <motion.g 
              key={`node-${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + (i * 0.3), type: "spring" }}
            >
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="2"
                  fill="none"
                  stroke={`url(#${id}-grad-active)`}
                  strokeOpacity="0.5"
                  variants={rippleEffect}
                  animate="animate"
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 2 : 1.2}
                fill={isCompleted ? "#10b981" : isActive ? "#8b5cf6" : "#e2e8f0"}
                stroke="white"
                strokeWidth="0.3"
                filter={(isActive || isCompleted) ? `url(#${id}-glow)` : undefined}
              />
              {isActive && (
                <circle cx={node.x} cy={node.y} r="0.8" fill="white" />
              )}
            </motion.g>
          )
        })}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0)_70%)]"></div>
    </div>
  )
}