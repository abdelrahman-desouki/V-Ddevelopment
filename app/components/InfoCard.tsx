'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface InfoCardProps {
  imageSrc: string;
  title: string;
  description: string;
  direction: 'left' | 'right';
}

const InfoCard: React.FC<InfoCardProps> = ({ imageSrc, title, description, direction }) => {
  const isRight = direction === 'right';

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl px-4 ${
        isRight ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <motion.img
  src={imageSrc}
  alt={title}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 0.95 }} // زوم أوت عند الوقوف
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true }}
  className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg cursor-pointer"
/>


      <div className="md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default InfoCard;
