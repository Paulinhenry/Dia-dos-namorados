import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Calendar, ChevronDown } from 'lucide-react';

// === IMPORTAÇÃO DAS SUAS FOTOS ===
import fotoHero from './assets/hero.png';
import foto1 from './assets/foto1.jpeg';
import foto2 from './assets/foto2.jpeg';
import foto3 from './assets/foto3.jpeg';
import foto4 from './assets/foto4.jpeg';
import foto5 from './assets/foto5.jpeg';
import foto6 from './assets/foto6.jpeg';
import foto7 from './assets/foto7.jpeg';
import foto8 from './assets/foto8.jpeg';

// --- CONFIGURAÇÃO DE ESTILOS ---
const styles = {
  fontPlayfair: { fontFamily: "'Playfair Display', serif" },
  fontInter: { fontFamily: "'Inter', sans-serif" }
};

export default function ParaCamyla() {
  const [showSplash, setShowSplash] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [timeLeft, setCountdown] = useState({ anos: 0, meses: 0, dias: 0, horas: 0 });
  const canvasRef = useRef(null);

  // --- TRANSIÇÃO AUTOMÁTICA DA TELA INICIAL ---
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); 

    return () => clearTimeout(splashTimer);
  }, []);

  // --- Função para o Clique do Scroll ---
  const fazerScrollParaConteudo = () => {
    const secaoHistoria = document.getElementById('nossa-historia');
    if (secaoHistoria) {
      secaoHistoria.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Efeito do Canvas de Estrelas ---
  useEffect(() => {
    if (showSplash) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      speed: 0.01 + Math.random() * 0.02
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctx.fillStyle = `rgba(197, 202, 233, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showSplash]);

  // --- Contador Regressivo ---
  useEffect(() => {
    const startDate = new Date('2022-12-16T21:00:00');

    const updateCountdown = () => {
      const now = new Date();
      let anos = now.getFullYear() - startDate.getFullYear();
      let meses = now.getMonth() - startDate.getMonth();
      let dias = now.getDate() - startDate.getDate();
      let horas = now.getHours() - startDate.getHours();

      if (horas < 0) { horas += 24; dias--; }
      if (dias < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        dias += prevMonth.getDate();
        meses--;
      }
      if (meses < 0) { meses += 12; anos--; }

      setCountdown({ anos, meses, dias, horas });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); 
    return () => clearInterval(interval);
  }, []);

  // --- Fechar Fotos com a tecla ESC ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImg) setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  return (
    <div className="min-h-screen text-[#e8eaf6] bg-[#03061a] relative overflow-x-hidden select-none" style={styles.fontInter}>
      
      {/* Tela de Splash Automática */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 bg-[#03061a] z-50 flex flex-col items-center justify-center text-center p-8 overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-40">
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-white rounded-full animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                  }}
                />
              ))}
            </div>

            <motion.div 
              animate={{ scale: [1, 1.15, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="mb-6 filter drop-shadow-[0_0_25px_rgba(121,134,203,0.8)]"
            >
              <Heart size={64} className="fill-[#7986cb] text-[#7986cb]" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight" style={styles.fontPlayfair}>
              Para a minha <br />
              <span className="text-[#7986cb] italic">Camyla</span>
            </h1>
            <p className="text-xs md:text-sm tracking-[0.2em] text-[#7986cb]/80 uppercase mb-4">
              feliz dia dos namorados
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />}

      {!showSplash && (
        <main className="relative z-10">
          
          {/* Seção Hero */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#7986cb] mb-4 font-semibold"
            >
              — desde 16 de dezembro de 2022 —
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold text-center leading-tight mb-4 drop-shadow-[0_0_40px_rgba(121,134,203,0.4)]"
              style={styles.fontPlayfair}
            >
              Você é o meu <br />
              <span className="text-[#7986cb] italic">universo</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base text-[#ffd54f] tracking-[0.25em] uppercase mb-12 font-medium"
            >
              ✦ Camyla ✦
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, delay: 0.6 }}
              className="w-[280px] md:w-[340px] h-[380px] md:h-[440px] rounded-2xl overflow-hidden relative shadow-[0_0_60px_rgba(121,134,203,0.3),_0_30px_60px_rgba(0,0,0,0.6)] border border-[#7986cb]/20"
            >
              <img 
                src={foto8} 
                alt="Nós os dois" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03061a]/40 to-transparent" />
            </motion.div>

            {/* BOTÃO DE SCROLL */}
            <div 
              onClick={fazerScrollParaConteudo}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 animate-bounce cursor-pointer hover:opacity-100 transition-opacity"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7986cb]">Scroll</span>
              <ChevronDown size={16} className="text-[#7986cb]" />
            </div>
          </section>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#7986cb] to-transparent mx-auto my-12" />

          {/* Âncoragem para o scroll suave */}
          <div id="nossa-historia"></div>

          {/* Seção de Citação / Poema - 100% CORRIGIDA */}
          <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-transparent via-[#1a237e]/10 to-transparent">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7986cb] mb-6">Nossos Sentimentos</span>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative max-w-2xl px-8 md:px-12 py-6">
                {/* Aspas de Abertura (Garantido por inline-style) */}
                <span 
                  className="absolute pointer-events-none select-none" 
                  style={{ ...styles.fontPlayfair, top: '-20px', left: '-10px', fontSize: '120px', color: 'rgba(121, 134, 203, 0.15)', lineHeight: 1 }}
                >
                  “
                </span>
                
                <p className="text-xl md:text-3xl italic leading-relaxed text-slate-200 relative z-10" style={styles.fontPlayfair}>
                  No vasto céu do meu mundo, você é a estrela mais brilhante, aquela que guia os meus passos e dá sentido ao meu caminhar.
                </p>
                
                {/* Aspas de Fechamento (Garantido por inline-style) */}
                <span 
                  className="absolute pointer-events-none select-none" 
                  style={{ ...styles.fontPlayfair, bottom: '-50px', right: '75px', fontSize: '120px', color: 'rgba(121, 134, 203, 0.15)', lineHeight: 1 }}
                >
                  ”
                </span>
              </div>
              
              {/* Assinatura */}
              <p className="text-xs text-[#ffd54f] tracking-[0.2em] uppercase mt-8 font-semibold relative z-10">— O nosso amor</p>
            </motion.div>
          </section>

          {/* Seção Galeria de Memórias */}
          <section className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-2" style={styles.fontPlayfair}>Fragmentos de Nós</h2>
              <p className="text-xs md:text-sm text-[#7986cb] tracking-wider">Momentos guardados para sempre no lado esquerdo do peito.</p>
            </div>

            {/* As suas 7 fotos */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {[
                { id: 1, tall: true, url: foto1, label: "Nosso início" },
                { id: 2, tall: false, url: foto2, label: "Nós" },
                { id: 3, tall: false, url: foto3, label: "Cumplicidade" },
                { id: 4, tall: true, url: foto4, label: "Amo-te" },
                { id: 5, tall: false, url: foto5, label: "Alegria" },
                { id: 6, tall: true, url: foto6, label: "Paz" },
                { id: 7, tall: false, url: foto7, label: "Nosso amor" },
              ].map((photo) => (
                <motion.div
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  key={photo.id}
                  onClick={() => setLightboxImg(photo.url)}
                  className={`rounded-2xl overflow-hidden relative cursor-pointer group shadow-lg border border-[#7986cb]/10 ${photo.tall ? 'row-span-2 h-[320px]' : 'h-[150px]'}`}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03061a]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-medium tracking-wide text-white/90">{photo.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Seção Contador de Tempo */}
          <section className="py-24 px-6 text-center bg-gradient-to-b from-transparent via-[#283593]/10 to-transparent">
            <h2 className="text-2xl md:text-4xl font-bold mb-2" style={styles.fontPlayfair}>Nossa Linha do Tempo</h2>
            <p className="text-xs text-[#7986cb] tracking-widest uppercase mb-10">Cada momento ao teu lado conta</p>

            <div className="flex gap-4 justify-center flex-wrap max-w-xl mx-auto">
              {[
                { label: "Anos", value: timeLeft.anos },
                { label: "Meses", value: timeLeft.meses },
                { label: "Dias", value: timeLeft.dias },
                { label: "Horas", value: timeLeft.horas },
              ].map((item, i) => (
                <div key={i} className="bg-[#1a237e]/20 border border-[#7986cb]/20 rounded-2xl p-4 min-w-[90px] backdrop-blur-md shadow-md">
                  <span className="block text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(121,134,203,0.5)]" style={styles.fontPlayfair}>
                    {item.value}
                  </span>
                  <span className="text-[10px] text-[#7986cb] tracking-widest uppercase font-medium mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Seção Mensagem Especial */}
          <section className="py-20 px-6 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a237e]/30 to-[#283593]/10 border border-[#7986cb]/20 rounded-3xl p-8 max-w-md w-full backdrop-blur-lg shadow-2xl relative text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7986cb] to-transparent" />
              <Calendar className="mx-auto mb-4 text-[#7986cb] animate-pulse" size={36} />
              <p className="text-base md:text-lg italic leading-relaxed text-slate-100" style={styles.fontPlayfair}>
                "Desde 16 de dezembro de 2022, o meu coração encontrou um porto seguro em ti. Amo-te não apenas pelo que és, mas por quem sou quando estou contigo."
              </p>
              <p className="text-xs text-[#ffd54f] tracking-wider mt-6 font-medium">— Do teu eterno namorado</p>
            </motion.div>
          </section>

          {/* Seção Final */}
          <section className="py-24 text-center px-6">
            <div className="flex gap-2 justify-center mb-6">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}>
                  <Heart className="text-[#7986cb] fill-[#7986cb]" size={28} />
                </motion.span>
              ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={styles.fontPlayfair}>Para todo o sempre.</h2>
            <p className="text-sm text-[#7986cb]/80 max-w-xs mx-auto leading-relaxed">
              Obrigado por seres a minha melhor escolha todos os dias.
            </p>
          </section>

        </main>
      )}

      {/* Lightbox para visualização de fotos */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors duration-200 cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              src={lightboxImg} alt="Visualização ampliada" 
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-[0_0_50px_rgba(121,134,203,0.3)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}