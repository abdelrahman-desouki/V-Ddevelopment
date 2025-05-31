'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cards = [
  { title: 'Unique Designs', desc: 'We excel in delivering projects that combine architectural creativity with environmental sustainability.' },
  { title: 'Specialized Expertise', desc: 'Our team includes top experts in real estate development and architectural engineering.' },
  { title: 'Commitment to Quality', desc: 'We ensure our projects are executed according to the highest global quality standards.' },
  { title: 'Future Vision', desc: 'We believe in building communities that meet today\'s needs while preserving resources for the future.' },
];

export default function StickyCardsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // الحركة تبدأ بعد 20% وتنتهي عند 80% من التمرير
  const y = useTransform(scrollYProgress, [0.2, 0.8], ['0%', `-${(cards.length - 1) * 100}%`]);

  return (
    <section ref={ref} className="relative h-[250vh] bg-[#fdfcf5]">
      {/* حاوية المحتوى اللاصق */}
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-10 gap-6 lg:gap-10 py-8 lg:py-0">
        {/* النص الثابت */}
        <div className="w-full lg:w-1/2 space-y-4 mb-8 lg:mb-0 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold">Why Choose Vanguard Development?</h2>
          <p className="text-gray-700 text-sm sm:text-base">We solve problems through co–creating digital experiences that are as effective as they are enjoyable.</p>
        </div>

        {/* الكروت المتحركة */}
        {/* تم تعديل ارتفاع الحاوية ليناسب الشاشات الأصغر */}
        <div className="w-full lg:w-1/2 h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden relative">
          <motion.div style={{ y }} className="space-y-6 md:space-y-10 absolute top-0 left-0 w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                // تم تعديل الحشو الداخلي للكروت لتناسب الشاشات الأصغر
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200"
              >
                {/* تم تعديل أحجام الخطوط داخل الكروت */}
                <h3 className="text-md sm:text-lg md:text-xl font-bold">{card.title}</h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}