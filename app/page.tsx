"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Lenis from "lenis";

import Navbar from './components/Navbar';
import LineAnimation from "./components/lineanimat";
import CustomCursor from "./components/CustomCursor";
import InfoCard from "./components/InfoCard";
import StickyCardsSection from "./components/StickyCardsSection";
import AnimatedSlider from "./components/animatedslider";


export default function Home(): JSX.Element {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenisInstance(lenis);

    function raf(time: DOMHighResTimeStamp): void { // DOMHighResTimeStamp هو النوع الصحيح لـ time
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const frameId = requestAnimationFrame(raf); // حفظ الـ ID لإلغائه

    return () => {
      cancelAnimationFrame(frameId); // إلغاء requestAnimationFrame
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <main className="bg-[#f8f5ed]">
      <CustomCursor />
      <Navbar />
      <LineAnimation />
      <h1
        className="text-3xl md:text-4xl lg:text-5xl text-[#1C1C1C] font-normal leading-tight max-w-4xl mx-auto px-4 mt-16 mb-16 bg-transparent text-center md:text-left md:pl-20 lg:pl-28"
      >
        شركة ناشئة مقرها القاهرة تعيد تعريف الفخامة والاستدامة في التطوير الحضري من خلال دمج الطبيعة مع التصاميم الحديثة.
      </h1>

      <AnimatedSlider />
      <LineAnimation />


    {/* السكشن مع النص الثابت والكروت */}
      <StickyCardsSection />
      <LineAnimation />
      

 {/* السكشن المخصص للملئ <Newarc />*/}
      
      
      

      <div className="w-full flex flex-col items-center gap-12 md:gap-20 mt-12 px-4">
        <InfoCard
          imageSrc="/image1.jpg"
          title="عش في تناغم مع الفخامة العصرية"
          description="اكتشف مجتمعات مصممة للارتقاء بأسلوب حياتك من خلال الهندسة المعمارية المبتكرة والأناقة المستدامة."
          direction="right"
        />
        <InfoCard
          imageSrc="/image2.jpg"
          title="حيث تلتقي الرقي الحضري بالطبيعة"
          description="نحن نخلق مساحات نابضة بالحياة توازن بين الراحة والتصميم والمسؤولية البيئية."
          direction="left"
        />
        <InfoCard
          imageSrc="/image3.jpg"
          title="الفخامة تلتقي بالطبيعة: تصميم مساحات سكنية"
          description="نحن نؤمن بأن الفخامة الحقيقية هي الانسجام مع الطبيعة. مجتمعاتنا الصديقة للبيئة تعزز العافية وجودة الحياة."
          direction="right"
        />
      </div>

      <div className="relative z-20 w-full bg-gray-100 py-12 md:py-16 mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          جرب الحياة الحضرية في وئام مع الطبيعة
        </h2>
        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto text-sm md:text-base">
          أنيقة ومستدامة ومتطورة — تعيد فانجارد للتطوير تصور الفخامة من خلال مزج التصميم المبتكر مع المسؤولية البيئية. تقدم مجتمعاتنا الحصرية مزيجًا سلسًا من الهندسة المعمارية الحديثة والجمال الطبيعي، مما يوفر أسلوب حياة استثنائي في كل التفاصيل.
        </p>
      </div>



      
      <div className="flex justify-center items-center mt-10 mb-5">
        <Image
          src="/logo1.png"
          alt="Vanguard Development Logo"
          className="w-auto h-16 md:h-20 object-contain rounded-md"
        />
      </div>

      <div style={{ backgroundColor: "gray", height: "40px" }}></div>
    </main>
  );
}
