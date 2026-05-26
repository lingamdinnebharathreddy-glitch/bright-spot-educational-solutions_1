import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', delay = 0, hoverGlow = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hoverGlow ? { 
        y: -5,
        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
        borderColor: 'rgba(212, 175, 55, 0.4)'
      } : {}}
      className={`glass-panel border-white/20 dark:border-slate-800/40 rounded-2xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
