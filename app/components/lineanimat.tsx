import { motion } from 'framer-motion';

const LineAnimation = () => {
  return (
    <div className="relative w-screen overflow-hidden -mx-4 mt-20">
      <motion.div
        className="border-t border-[#333]"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        viewport={{ once: true }}
      />
    </div>
  );
};

export default LineAnimation;
