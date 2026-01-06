'use client';

import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <div className="w-full absolute bg-neutral-900/90 top-0 left-0 z-[60] overflow-hidden text-white/90 font-bold text-xs">
      <motion.div
        className="flex whitespace-nowrap "
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: 'linear',
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        <span className="mx-6">
          CareerSathi is in Beta, expect rapid improvements, not perfection.
        </span>
        
      </motion.div>
    </div>
  );
}
