"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MapPin, Mail, Clock, 
  Menu, X, Zap, Cpu, Globe, 
  Target, CheckCircle2, ArrowUpRight, 
  Share2, Users, Sun, Moon, Database, Network, Truck, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

// --- 1. ТРЕХМЕРНАЯ КАРТОЧКА С ТВОЕЙ АНИМАЦИЕЙ ---
const InteractiveCard = ({ children, className = "", delay = 0, isDark }: { children: React.ReactNode, className?: string, delay?: number, isDark: boolean }) => {
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={`relative group border rounded-[2.5rem] p-10 overflow-hidden transition-all duration-500 ${
        isDark 
        ? "bg-slate-900 border-slate-800 shadow-2xl text-white" 
        : "bg-white border-slate-200 shadow-lg text-slate-900"
      } ${className}`}
      style={{ rotateX: springY, rotateY: springX, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function AtexFinalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'О колледже', href: '#about' },
    { name: 'Специальности', href: '#specialties' },
    { name: 'Контакты', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-blue-600 selection:text-white ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- ШАПКА (ВСЕГДА ЗАКРЕПЛЕНА) --- */}
      <header className={`fixed top-0 left-0 w-full h-[90px] z-[999] flex items-center border-b transition-all duration-500 backdrop-blur-xl ${
        isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="w-10 h-10 bg-[#0047FF] rounded-xl flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className={`text-2xl font-black tracking-tighter uppercase italic leading-none ${isDark ? "text-white" : "text-slate-900"}`}>АТЭКС</span>
                <span className="text-[8px] font-bold tracking-[0.3em] text-[#0047FF] uppercase">College of Communication</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleScrollTo(e, link.href)}
                 className={`text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${
                   isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0047FF]'
                 }`}>
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleTheme}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={28} /></button>
          </div>
        </div>
      </header>

      <main className="pt-[90px]">
        
        {/* --- HERO --- */}
        <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
          <div className="container mx-auto px-6 text-center z-10">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.8 }}>
              <h1 className="text-[12vw] lg:text-[10rem] font-black mb-10 leading-[0.85] tracking-tighter uppercase italic">
                СОЗДАВАЯ <br /> <span className="text-[#0047FF] NOT-italic">ЦИФРОВОЕ БУДУЩЕЕ.</span>
              </h1>
              <p className={`text-xl md:text-3xl max-w-4xl mx-auto font-medium opacity-80 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Главный технический колледж Алматы для тех, кто строит будущее связи и высоких технологий Казахстана.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0047FF]/10 blur-[120px] -z-10" />
        </section>

        {/* --- BENTO ABOUT --- */}
        <section id="about" className="py-32 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* БЛОК С ГАРАНТИРОВАННЫМ ЦВЕТОМ */}
            <InteractiveCard isDark={isDark} className="md:col-span-8 !bg-[#0047FF] border-none !text-white flex flex-col justify-between min-h-[550px]">
              <Globe size={60} className="opacity-20 animate-pulse" />
              <div>
                <h2 className="text-6xl md:text-9xl font-black mb-6 uppercase italic leading-none">25 ЛЕТ <br/> ОПЫТА</h2>
                <p className="text-xl md:text-3xl text-blue-100 max-w-2xl font-light">
                  Мы являемся лидерами в подготовке кадров для АО «Казахтелеком» и ведущих IT-гигантов страны. Наш диплом — ваш пропуск в индустрию.
                </p>
              </div>
            </InteractiveCard>

            <InteractiveCard isDark={isDark} className="md:col-span-4 flex flex-col justify-center items-center text-center">
              <span className="text-8xl font-black text-[#0047FF]">200+</span>
              <span className="text-xs uppercase font-black tracking-widest mt-6 opacity-50">Государственных грантов</span>
            </InteractiveCard>

            <InteractiveCard isDark={isDark} className="md:col-span-4">
              <Users className="text-[#0047FF] mb-8" size={50} />
              <h3 className="text-3xl font-black uppercase mb-4 italic">Комьюнити</h3>
              <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>Среда, где идеи студентов превращаются в работающие прототипы и стартапы.</p>
            </InteractiveCard>

            <InteractiveCard isDark={isDark} className="md:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div><span className="block text-5xl font-black text-[#0047FF] mb-2">12</span><span className="text-[10px] uppercase font-black opacity-40">Тех-лабораторий</span></div>
                <div><span className="block text-5xl font-black text-[#0047FF] mb-2">100%</span><span className="text-[10px] uppercase font-black opacity-40">Трудоустройство</span></div>
                <div><span className="block text-5xl font-black text-[#0047FF] mb-2">TOP 1</span><span className="text-[10px] uppercase font-black opacity-40">Рейтинг в РК</span></div>
              </div>
            </InteractiveCard>
          </div>
        </section>

        {/* --- SPECIALTIES (ПОЛНЫЙ ТЕКСТ) --- */}
        <section id="specialties" className={`py-32 transition-colors ${isDark ? 'bg-slate-900/40' : 'bg-slate-100'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-24">Специальности</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InteractiveCard isDark={isDark} className="min-h-[500px] flex flex-col">
                <Database size={40} className="text-[#0047FF] mb-8" />
                <h3 className="text-3xl font-black uppercase mb-6 italic">Информационные системы</h3>
                <p className={`text-lg mb-10 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Глубокое изучение архитектуры информационных систем, проектирования баз данных и разработки корпоративного софта. Мы обучаем полному циклу разработки: от анализа требований до развертывания AI-решений и облачных инфраструктур. Студенты осваивают Python, SQL, Docker и современные Agile-методологии.
                </p>
                <div className="flex gap-3 mt-auto">
                    {["DevOps", "AI", "Enterprise"].map(t => <span key={t} className="text-[10px] font-black uppercase px-4 py-1.5 bg-[#0047FF]/10 text-[#0047FF] rounded-full border border-[#0047FF]/20">{t}</span>)}
                </div>
              </InteractiveCard>

              <InteractiveCard isDark={isDark} className="min-h-[500px] flex flex-col">
                <Network size={40} className="text-[#0047FF] mb-8" />
                <h3 className="text-3xl font-black uppercase mb-6 italic">Сети связи и системы коммутации</h3>
                <p className={`text-lg mb-10 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Станьте архитектором цифровой инфраструктуры страны. Обучение включает работу с реальным оборудованием уровня Cisco и Huawei, настройку IP-телефонии, проектирование оптоволоконных линий (ВОЛС) и внедрение стандартов связи нового поколения (5G/6G). Выпускники — главная опора телеком-рынка.
                </p>
                <div className="flex gap-3 mt-auto">
                    {["Cisco", "5G", "Optics"].map(t => <span key={t} className="text-[10px] font-black uppercase px-4 py-1.5 bg-[#0047FF]/10 text-[#0047FF] rounded-full border border-[#0047FF]/20">{t}</span>)}
                </div>
              </InteractiveCard>

              <InteractiveCard isDark={isDark} className="min-h-[500px] flex flex-col">
                <Truck size={40} className="text-[#0047FF] mb-8" />
                <h3 className="text-3xl font-black uppercase mb-6 italic">Почтовая связь и логистика</h3>
                <p className={`text-lg mb-10 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Управление глобальными потоками информации и товаров. Студенты изучают автоматизированные логистические системы, интеграцию почтовых сервисов с E-commerce гигантами и международные почтовые конвенции. Мы готовим специалистов, способных оптимизировать доставку любого масштаба.
                </p>
                <div className="flex gap-3 mt-auto">
                    {["Logistics", "E-com", "SCM"].map(t => <span key={t} className="text-[10px] font-black uppercase px-4 py-1.5 bg-[#0047FF]/10 text-[#0047FF] rounded-full border border-[#0047FF]/20">{t}</span>)}
                </div>
              </InteractiveCard>

              <InteractiveCard isDark={isDark} className="min-h-[500px] flex flex-col">
                <BarChart3 size={40} className="text-[#0047FF] mb-8" />
                <h3 className="text-3xl font-black uppercase mb-6 italic">Учет и аудит</h3>
                <p className={`text-lg mb-10 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Финансовый фундамент любого технологического бизнеса. Обучение включает глубокое освоение 1С:Предприятие, международных стандартов финансовой отчетности (МСФО) и налогового планирования. Вы научитесь проводить аудит IT-компаний и управлять бюджетами крупных промышленных объектов.
                </p>
                <div className="flex gap-3 mt-auto">
                    {["IFRS", "1C", "Audit"].map(t => <span key={t} className="text-[10px] font-black uppercase px-4 py-1.5 bg-[#0047FF]/10 text-[#0047FF] rounded-full border border-[#0047FF]/20">{t}</span>)}
                </div>
              </InteractiveCard>
            </div>
          </div>
        </section>

        {/* --- CONTACTS --- */}
        <section id="contact" className="py-40 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}>
              <h2 className="text-8xl font-black uppercase italic mb-16 tracking-tighter">Связь</h2>
              
              <div className="space-y-16">
                <div className="flex gap-10 items-start">
                  <div className="w-20 h-20 rounded-3xl bg-[#0047FF]/10 flex items-center justify-center text-[#0047FF] shrink-0 shadow-2xl shadow-blue-600/10"><MapPin size={32} /></div>
                  <div>
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-3 tracking-widest">Адрес кампуса</span>
                    <p className="text-3xl font-bold italic leading-tight">Алматы, мкр. Мамыр-4, д. 2/1</p>
                  </div>
                </div>
                
                <div className="flex gap-10 items-start">
                  <div className="w-20 h-20 rounded-3xl bg-[#0047FF]/10 flex items-center justify-center text-[#0047FF] shrink-0 shadow-2xl shadow-blue-600/10"><Phone size={32} /></div>
                  <div>
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-3 tracking-widest">Приемная комиссия</span>
                    <a href="tel:+77273012455" className="text-4xl font-black italic hover:text-[#0047FF] transition-colors tracking-tighter">+7 (727) 301-24-55</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <InteractiveCard isDark={isDark} className="!bg-slate-900 !border-slate-800 !text-white !p-16 flex flex-col items-center text-center">
                <Mail size={90} className="text-[#0047FF] mb-12" />
                <h3 className="text-5xl font-black uppercase italic mb-8">info@ateks.kz</h3>
                <a href="tel:+77273012455" className="text-2xl font-black text-slate-400 mb-8 hover:text-white transition-colors tracking-tight italic">+7 (727) 301-24-55</a>
                <p className="text-slate-500 text-sm uppercase tracking-[0.3em] font-bold">Официальные запросы</p>
            </InteractiveCard>
          </div>
        </section>
      </main>

      <footer className={`py-16 border-t ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-black italic tracking-tighter">АТЭКС</div>
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 italic">© 2026 Almaty Technical College of Communication</p>
          <div className="w-12 h-12 rounded-xl bg-[#0047FF]/10 flex items-center justify-center text-[#0047FF] cursor-pointer hover:bg-[#0047FF] hover:text-white transition-all shadow-xl">
            <Share2 size={20} />
          </div>
        </div>
      </footer>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
            className={`fixed inset-0 z-[1000] p-12 flex flex-col ${isDark ? 'bg-slate-950' : 'bg-white'}`}
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-black italic">МЕНЮ</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-[#0047FF] text-white rounded-full"><X /></button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className={`text-6xl font-black uppercase italic ${isDark ? "text-white" : "text-slate-900"}`}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}