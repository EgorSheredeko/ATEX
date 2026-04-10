"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MapPin, Mail, Cpu, Globe, 
  Share2, Sun, Moon, Database, Network, Truck, BarChart3
} from 'lucide-react';
import { motion, useSpring } from 'framer-motion';

// --- ИНТЕРАКТИВНАЯ КАРТОЧКА ---
const InteractiveCard = ({ children, className = "", delay = 0, isDark, forceDark = false }: { children: React.ReactNode, className?: string, delay?: number, isDark: boolean, forceDark?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setRotation({ x, y });
  };

  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    springX.set(isHovered ? rotation.x : 0);
    springY.set(isHovered ? rotation.y : 0);
  }, [rotation, isHovered, springX, springY]);

  const currentIsDark = forceDark || isDark;
  const themeClasses = currentIsDark
    ? "bg-slate-950 border-slate-800 shadow-2xl text-white"
    : "bg-white border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-slate-900";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.7, delay }}
      className={`relative group border rounded-[3rem] p-12 overflow-hidden transition-all duration-500 ${themeClasses} ${className}`}
      style={{ rotateX: springY, rotateY: springX, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

export default function AtexFinalScale100() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scale, setScale] = useState(1);
  const [wrapperHeight, setWrapperHeight] = useState('auto');
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const BASE_WIDTH = 1440;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // МАСШТАБ 100% — ТЕПЕРЬ БЕЗ ПОНИЖАЮЩИХ КОЭФФИЦИЕНТОВ
      const newScale = width < BASE_WIDTH ? (width / BASE_WIDTH) : 1;
      setScale(newScale);

      if (containerRef.current) {
        const contentHeight = containerRef.current.offsetHeight;
        setWrapperHeight(`${contentHeight * newScale}px`);
      }
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 300); 
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [theme]);

  return (
    <div 
      className={`relative transition-colors duration-700 ${isDark ? 'bg-[#020617]' : 'bg-slate-50'}`}
      style={{ 
        height: wrapperHeight, 
        minHeight: '100vh', 
        overflowY: 'visible', 
        overflowX: 'hidden' 
      }}
    >
      <div 
        ref={containerRef}
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          width: `${BASE_WIDTH}px`, 
          position: 'absolute',
          left: '50%',
          marginLeft: `-${(BASE_WIDTH * scale) / 2 / scale}px`,
        }}
      >
        {/* HEADER */}
        <header className={`fixed top-0 left-0 w-full h-[110px] z-[999] flex items-center border-b backdrop-blur-xl transition-all ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
        }`}>
          <div className="container mx-auto px-12 flex justify-between items-center">
            <div className="flex items-center gap-5 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-14 h-14 bg-[#0047FF] rounded-2xl flex items-center justify-center shadow-lg">
                <Cpu className="text-white w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className={`text-4xl font-black italic tracking-tighter leading-none ${isDark ? "text-white" : "text-slate-900"}`}>АТЭКС</span>
                <span className="text-[11px] font-bold text-[#0047FF] uppercase tracking-[0.4em]">College Almaty</span>
              </div>
            </div>
            <nav className="flex items-center space-x-14">
              {['Главная', 'О колледже', 'Специальности', 'Контакты'].map((name) => (
                <a key={name} href="#" className={`text-[13px] uppercase font-black tracking-[0.2em] transition-all hover:text-[#0047FF] ${isDark ? 'text-white opacity-40 hover:opacity-100' : 'text-slate-900 opacity-50 hover:opacity-100'}`}>{name}</a>
              ))}
              <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-yellow-400 shadow-lg' : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}>
                {isDark ? <Sun size={26} /> : <Moon size={26} />}
              </button>
            </nav>
          </div>
        </header>

        <main className="pt-[110px]">
          {/* HERO */}
          <section className="h-[800px] flex flex-col justify-center items-center text-center px-10">
            <motion.h1 className={`text-[170px] font-black leading-[0.8] italic uppercase tracking-tighter mb-12 ${isDark ? "text-white" : "text-slate-900"}`}>
              СОЗДАВАЯ <br /> <span className="text-[#0047FF] NOT-italic">БУДУЩЕЕ.</span>
            </motion.h1>
            <p className={`text-3xl max-w-5xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Главный технический колледж Алматы для тех, кто строит будущее высоких технологий.</p>
          </section>

          {/* BENTO */}
          <section className="py-24 px-12 grid grid-cols-12 gap-10">
            <InteractiveCard isDark={isDark} forceDark={true} className="col-span-8 border-none min-h-[580px] flex flex-col justify-between !text-white">
              <Globe size={90} className="opacity-20 animate-spin-slow" />
              <div>
                <h2 className="text-[120px] font-black mb-8 uppercase italic leading-none tracking-tighter">25 ЛЕТ <br/> ОПЫТА</h2>
                <p className="text-3xl text-slate-300 max-w-3xl font-light">Лидеры в подготовке кадров для АО «Казахтелеком» и IT-гигантов Казахстана.</p>
              </div>
            </InteractiveCard>
            <InteractiveCard isDark={isDark} delay={0.2} className="col-span-4 flex flex-col justify-center items-center text-center">
              <span className="text-[130px] font-black text-[#0047FF] leading-none mb-4">200+</span>
              <span className={`text-lg uppercase font-black tracking-widest italic ${isDark ? 'opacity-30 text-white' : 'opacity-40 text-slate-900'}`}>Грантов в год</span>
            </InteractiveCard>
          </section>

          {/* SPECIALTIES */}
          <section className="py-32 px-12">
            <h2 className={`text-[130px] font-black uppercase italic mb-24 tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Направления</h2>
            <div className="grid grid-cols-2 gap-12">
              {[
                { t: "Информационные системы", d: "Архитектура систем, базы данных и разработка софта. Обучаем полному циклу: от анализа до AI-решений.", icon: <Database size={50}/> },
                { t: "Сети связи", d: "Архитектура цифровой инфраструктуры. Работа с оборудованием Cisco и Huawei, настройка IP-телефонии и 5G/6G.", icon: <Network size={50}/> },
                { t: "Логистика", d: "Управление глобальными потоками информации и товаров. Автоматизированные системы и интеграция с E-commerce.", icon: <Truck size={50}/> },
                { t: "Учет и аудит", d: "Финансовый фундамент бизнеса. 1С:Предприятие, МСФО и налоговое планирование. Аудит IT-компаний.", icon: <BarChart3 size={50}/> }
              ].map((spec, i) => (
                <InteractiveCard key={i} isDark={isDark} delay={i * 0.1} className="min-h-[480px]">
                  <div className="text-[#0047FF] mb-10">{spec.icon}</div>
                  <h3 className="text-5xl font-black uppercase mb-8 italic">{spec.t}</h3>
                  <p className={`text-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{spec.d}</p>
                </InteractiveCard>
              ))}
            </div>
          </section>

          {/* CONTACTS */}
          <section className="py-48 px-12 grid grid-cols-2 gap-24">
            <div>
              <h2 className={`text-[150px] font-black uppercase italic mb-20 tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>Связь</h2>
              <div className="space-y-14">
                <div className="flex gap-10 items-center">
                  <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-[#0047FF] ${isDark ? 'bg-[#0047FF]/10' : 'bg-[#0047FF]/5'}`}><MapPin size={40}/></div>
                  <p className={`text-5xl font-bold italic ${isDark ? 'text-white' : 'text-slate-900'}`}>Алматы, Мамыр-4, д. 2/1</p>
                </div>
                <div className="flex gap-10 items-center">
                  <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-[#0047FF] ${isDark ? 'bg-[#0047FF]/10' : 'bg-[#0047FF]/5'}`}><Phone size={40}/></div>
                  <p className="text-7xl font-black text-[#0047FF] italic">+7 (727) 301-24-55</p>
                </div>
              </div>
            </div>
            <InteractiveCard isDark={isDark} className="!bg-slate-950 flex flex-col items-center justify-center text-center p-24 !text-white border-none">
                <Mail size={120} className="text-[#0047FF] mb-14" />
                <span className="text-6xl font-black italic tracking-tight underline decoration-[#0047FF]">info@ateks.kz</span>
            </InteractiveCard>
          </section>

          <footer className={`py-24 border-t flex justify-between px-12 items-center ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
             <div className={`text-6xl font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>АТЭКС</div>
             <p className={`text-sm font-bold uppercase tracking-[0.5em] opacity-40 ${isDark ? 'text-white' : 'text-slate-900'}`}>© 2026 Almaty Technical College</p>
             <div className="w-16 h-16 rounded-2xl bg-[#0047FF]/10 flex items-center justify-center text-[#0047FF]"><Share2 size={28} /></div>
          </footer>
        </main>
      </div>
    </div>
  );
}