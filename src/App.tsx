import React, { useState } from 'react';
import {
  Terminal, Shield, Server, Database,
  GitBranch, Download, Layers,
  Award, ExternalLink, Cloud,
  Mail, MessageCircle, Menu, X, Lock,
  MapPin, GraduationCap, Code2,
  Braces, FileJson, Boxes, ChevronDown,
} from 'lucide-react';

// IMPORTAÇÃO DA IMAGEM: O Vite precisa disso para processar o arquivo corretamente
import fotoMarcos from './assets/marcos.jpeg';

// ==========================================
// DADOS PESSOAIS — fonte única de verdade
// ==========================================
const PERFIL = {
  nome: 'Marcos Firmino Rodrigues',
  cargo: 'Desenvolvedor Back-end em Formação',
  objetivo: 'Futuro Especialista em Cibersegurança',
  localizacao: 'Leme, São Paulo — Brasil',
};

// Nota de privacidade: o telefone não é exibido em nenhum lugar da interface.
// O WhatsApp é acessível apenas via ícone, que abre a conversa diretamente pelo wa.me.
const CONTATO = {
  email: 'marcosrodrigues.code@gmail.com',
  whatsapp: 'https://wa.me/5519971303777',
  curriculoUrl: '/curriculo-marcos-rodrigues.pdf', // TODO: coloque o PDF em /public com esse nome
  githubUser: 'https://github.com/marcos22-s',
  linkedinUser: 'https://linkedin.com/in/marcos-rodrigues-14391426b/',
};

const FORMACAO = [
  { curso: 'Desenvolvimento de Software Multiplataforma', instituicao: 'FATEC Araras', status: 'Em andamento' },
  { curso: 'Técnico em Desenvolvimento de Sistemas', instituicao: 'ETEC Deputado Salim Sedeh', status: 'Concluído' },
];

const AREAS_INTERESSE = [
  'Desenvolvimento Back-end',
  'APIs REST',
  'Arquitetura de Software',
  'Banco de Dados',
  'Cloud',
  'Cibersegurança',
];

const NAV_LINKS = [
  { href: '#inicio', label: 'INÍCIO' },
  { href: '#sobre', label: 'SOBRE' },
  { href: '#experiencia', label: 'EXPERIÊNCIA' },
  { href: '#stack', label: 'STACK' },
  { href: '#cyber', label: 'CIBERSEGURANÇA' },
  { href: '#projetos', label: 'PROJETOS' },
  { href: '#certificados', label: 'CERTIFICAÇÕES' },
  { href: '#contato', label: 'CONTATO' },
];

// Classe utilitária compartilhada para o efeito "glass" premium
const GLASS = "bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.45)]";

// ==========================================
// ESTILOS GLOBAIS / ANIMAÇÕES CUSTOMIZADAS
// ==========================================
function GlobalStyles() {
  return (
    <style>{`
      @keyframes floatSlow {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(20px, -30px); }
      }
      @keyframes floatSlower {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-25px, 25px); }
      }
      @keyframes gridPan {
        0% { background-position: 0 0; }
        100% { background-position: 64px 64px; }
      }
      @keyframes scanline {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 0.35; }
        90% { opacity: 0.35; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes blinkCursor {
        0%, 45% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .anim-float-a { animation: floatSlow 14s ease-in-out infinite; }
      .anim-float-b { animation: floatSlower 18s ease-in-out infinite; }
      .anim-grid-pan { animation: gridPan 10s linear infinite; }
      .anim-scan { animation: scanline 9s linear infinite; }
      .term-line { opacity: 0; animation: fadeUp 0.5s ease-out forwards; }
      .term-cursor { animation: blinkCursor 1s step-end infinite; }

      @media (prefers-reduced-motion: reduce) {
        .anim-float-a, .anim-float-b, .anim-grid-pan, .anim-scan, .term-cursor {
          animation: none !important;
        }
        .term-line { opacity: 1; animation: none !important; }
      }
    `}</style>
  );
}

// Fundo com profundidade: grid tecnológico, glows e scanline — fixo atrás de todo o site
function BackgroundFX() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[#050507]">
      {/* Wash radial de base para dar profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(88,28,135,0.18),transparent),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(14,116,199,0.12),transparent)]" />

      {/* Grid tecnológico sutil */}
      <div
        className="absolute inset-0 opacity-[0.14] anim-grid-pan"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 20%, transparent 75%)',
        }}
      />

      {/* Glows flutuantes */}
      <div className="absolute top-[8%] left-[6%] w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-[140px] anim-float-a" />
      <div className="absolute top-[35%] right-[4%] w-[380px] h-[380px] bg-sky-500/15 rounded-full blur-[140px] anim-float-b" />
      <div className="absolute bottom-[5%] left-[30%] w-[320px] h-[320px] bg-emerald-500/10 rounded-full blur-[130px] anim-float-a" />

      {/* Linha de scan vertical, sutil, atravessando a tela */}
      <div className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-sky-400/10 to-transparent anim-scan" />

      {/* Vinheta para focar o conteúdo central */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_0%,transparent_40%,#050507_100%)]" />
    </div>
  );
}

// Cabeçalho de seção reutilizável, com "eyebrow" no estilo terminal
function SectionEyebrow({ icon, index, label, sublabel }: { icon: React.ReactNode; index: string; label: string; sublabel?: string }) {
  return (
    <div className="mb-10 md:mb-12 flex items-end justify-between gap-6 flex-wrap">
      <div>
        <span className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-purple-400/80 tracking-[0.2em] mb-3">
          {icon} {index}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
          {label}
        </h2>
        {sublabel && <p className="text-slate-500 font-['JetBrains_Mono'] text-xs md:text-sm mt-3">{sublabel}</p>}
      </div>
      <div className="hidden md:block h-px flex-1 max-w-xs bg-gradient-to-r from-slate-700/50 to-transparent" />
    </div>
  );
}

// ==========================================
// 1. SUBCOMPONENTES ESTRUTURAIS FIXOS
// ==========================================

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 md:px-8 pt-4 sticky top-0 z-50">
      <div className={`max-w-[1440px] mx-auto flex justify-between items-center rounded-2xl px-5 md:px-7 py-3.5 transition-all duration-300 ${GLASS}`}>
        <a
          href="#inicio"
          className="flex items-center gap-2 font-mono group cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <Terminal className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-black text-xl tracking-tight text-white font-['Space_Grotesk']">
            Marcos<span className="text-purple-500 font-bold group-hover:text-purple-400 transition-colors">.root</span>
          </span>
        </a>

        {/* Navegação desktop */}
        <nav className="hidden lg:flex gap-5 xl:gap-7 text-[11px] font-['JetBrains_Mono'] tracking-wider text-slate-400">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white hover:-translate-y-0.5 transition-all duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              // {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden lg:inline-flex items-center gap-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        >
          Vamos conversar
        </a>

        {/* Botão do menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          className="lg:hidden text-slate-300 hover:text-white p-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navegação mobile (colapsável) */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className={`lg:hidden flex flex-col gap-1 mt-2 p-3 rounded-2xl text-sm font-['JetBrains_Mono'] tracking-wider text-slate-400 max-w-[1440px] mx-auto ${GLASS}`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-3 rounded-xl hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              // {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  const terminalLines = [
    { prompt: '$ whoami', output: PERFIL.nome },
    { prompt: '$ foco', output: 'Back-end • APIs REST • Cibersegurança' },
    { prompt: '$ atualmente', output: 'Estudante de Desenvolvimento de Software Multiplataforma — FATEC Araras' },
    { prompt: '$ localização', output: 'Leme • São Paulo • Brasil' },
  ];

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center pt-16 pb-20 md:pt-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">

          {/* Coluna de texto — ocupa mais espaço horizontal */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up duration-1000">
            <span className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 text-xs font-['JetBrains_Mono'] px-4 py-2 rounded-full border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-sky-400 motion-safe:animate-pulse" />
              {PERFIL.cargo} · {PERFIL.objetivo}
            </span>

            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[0.94] font-['Space_Grotesk'] bg-gradient-to-br from-white via-slate-100 to-slate-500 bg-clip-text text-transparent drop-shadow-sm select-none">
              Marcos <br />
              Firmino <br />
              <span className="text-slate-400">Rodrigues</span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Desenvolvedor Back-end focado em <span className="text-white font-semibold">Python</span>,{' '}
              <span className="text-white font-semibold">Django</span> e{' '}
              <span className="text-white font-semibold">Java</span>, construindo{' '}
              <span className="text-white font-semibold">APIs REST</span> e arquiteturas de dados sólidas.
              Em formação contínua rumo à <span className="text-white font-semibold">Cibersegurança</span>.
            </p>

            <div className="flex items-center gap-5 text-slate-400 text-sm font-['JetBrains_Mono']">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-purple-400" /> {PERFIL.localizacao}</span>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 group"
              >
                Ver Projetos
                <Layers className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href={CONTATO.curriculoUrl}
                download
                className="inline-flex items-center gap-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-bold text-sm px-6 py-4 rounded-2xl border border-sky-500/30 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Download className="w-5 h-5" />
                Currículo
              </a>

              <a
                href={CONTATO.githubUser}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${GLASS}`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>

              <a
                href={CONTATO.linkedinUser}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${GLASS}`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Coluna da imagem — maior, com profundidade e cards flutuantes */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[470px] xl:max-w-[515px] aspect-[4/5] relative group p-2">
              <div className="absolute inset-0 bg-purple-500/5 rounded-[40px] border border-purple-500/10 backdrop-blur-md transition-all duration-500 group-hover:bg-purple-500/10 group-hover:border-purple-500/20" />
              <div className="absolute -inset-2 -z-10 bg-gradient-to-tr from-sky-500/25 to-purple-500/25 rounded-[44px] blur-3xl group-hover:scale-105 transition-all duration-500" />

              <div className="w-full h-full rounded-[36px] p-[1.5px] bg-slate-800 group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-purple-500 transition-all duration-500">
                <div className="w-full h-full rounded-[34px] overflow-hidden bg-slate-950 transition-all duration-300 group-hover:scale-[1.015]">
                  <img
                    src={fotoMarcos}
                    alt="Marcos Firmino Rodrigues, desenvolvedor back-end, em frente a dois monitores com código"
                    loading="eager"
                    decoding="async"
                    width={515}
                    height={644}
                    className="w-full h-full object-cover transition-all duration-500 filter brightness-95 group-hover:brightness-105 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Painel flutuante: mini-terminal com dados pessoais (assinatura visual) */}
              <div className={`hidden lg:block absolute -left-12 -bottom-8 w-64 p-4 rounded-[28px] ${GLASS}`}>
                <div className="flex items-center gap-1.5 mb-3.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                </div>
                <div className="space-y-2 font-['JetBrains_Mono'] text-[11px] leading-snug">
                  {terminalLines.map((line, idx) => (
                    <div key={idx}>
                      <p
                        className="term-line text-purple-400 font-medium"
                        style={{ animationDelay: `${idx * 300}ms` }}
                      >
                        {line.prompt}
                      </p>
                      <p
                        className="term-line text-slate-200 pl-2.5 mt-0.5"
                        style={{ animationDelay: `${idx * 300 + 130}ms` }}
                      >
                        &gt; {line.output}
                      </p>
                    </div>
                  ))}
                  <span className="inline-block w-1.5 h-3 bg-sky-400 term-cursor align-middle ml-2.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="hidden md:flex justify-center mt-16">
          <a href="#sobre" aria-label="Rolar para a próxima seção" className="text-slate-600 hover:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full p-2">
            <ChevronDown className="w-6 h-6 motion-safe:animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8">
      <SectionEyebrow icon={<Terminal className="w-3.5 h-3.5" />} index="01" label="Sobre Mim" sublabel="// perfil e áreas de atuação" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bio — bloco principal, altura enxuta e alinhada ao painel lateral */}
        <div className={`lg:col-span-7 rounded-3xl p-6 md:p-7 flex flex-col justify-center ${GLASS}`}>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed font-light">
            Sou <span className="text-white font-semibold">{PERFIL.nome}</span>, {PERFIL.cargo.toLowerCase()},
            construindo uma base sólida em desenvolvimento back-end enquanto avanço rumo a me tornar{' '}
            <span className="text-white font-semibold">{PERFIL.objetivo.toLowerCase()}</span>. Gosto de entender
            sistemas de ponta a ponta: da modelagem do banco de dados à segurança da infraestrutura que os sustenta.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {AREAS_INTERESSE.map((area) => (
              <span
                key={area}
                className="text-[11px] font-['JetBrains_Mono'] text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.08] px-3 py-1.5 rounded-full transition-all duration-200 cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Coluna lateral — painel único de fatos rápidos, compacto */}
        <div className={`lg:col-span-5 rounded-3xl p-6 md:p-7 flex flex-col divide-y divide-white/[0.06] ${GLASS}`}>
          <div className="flex items-center gap-4 pb-4">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 flex-shrink-0">
              <MapPin className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-['JetBrains_Mono'] text-slate-500 uppercase tracking-wider">Localização</p>
              <p className="text-white font-semibold text-sm mt-0.5">{PERFIL.localizacao}</p>
            </div>
          </div>

          {FORMACAO.map((f) => (
            <div key={f.curso} className="flex items-center gap-4 py-4 last:pb-0">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-snug truncate">{f.curso}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{f.instituicao}</p>
                </div>
                <span className={`flex-shrink-0 text-[10px] font-['JetBrains_Mono'] px-2.5 py-1 rounded-full border ${f.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-purple-500/10 text-purple-300 border-purple-500/20'}`}>
                  {f.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const skills = ["Atendimento técnico", "Diagnóstico de problemas", "Redes", "Infraestrutura", "Segurança preventiva"];
  return (
    <section id="experiencia" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8">
      <SectionEyebrow icon={<Terminal className="w-3.5 h-3.5" />} index="02" label="Experiência Profissional" sublabel="// trajetória no mercado de TI" />

      <div className="relative border-l border-white/10 ml-4 pl-8 md:pl-12 group">
        <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-sky-400 shadow-[0_0_16px_#38bdf8]" />

        <div className={`rounded-3xl p-8 md:p-10 max-w-4xl space-y-5 hover:border-sky-500/20 hover:scale-[1.005] transition-all duration-300 ${GLASS}`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-['Space_Grotesk']">Estagiário de Suporte Técnico TI</h3>
              <p className="text-sm font-['JetBrains_Mono'] text-purple-400 mt-1.5">Labstar Tecnologia</p>
            </div>
            <span className="self-start text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-purple-300 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
              2026 · Atualmente
            </span>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Responsável pelo atendimento técnico, diagnóstico de problemas, gerenciamento de infraestrutura de redes locais e aplicação de medidas de segurança preventiva nos terminais e acessos corporativos.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-white/[0.04] text-slate-300 text-xs font-['JetBrains_Mono'] px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-200 cursor-default">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechStack() {
  const stack = [
    { name: "Python", icon: Code2, featured: true },
    { name: "Django", icon: Server, featured: true },
    { name: "Java", icon: Braces, featured: true },
    { name: "React", icon: Layers, featured: true },
    { name: "JavaScript", icon: FileJson },
    { name: "TypeScript", icon: FileJson },
    { name: "Node.js", icon: Server },
    { name: "C#", icon: Braces },
    { name: "PHP", icon: Code2 },
    { name: "SQL", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Git/GitHub", icon: GitBranch },
    { name: "Docker", icon: Boxes },
    { name: "Linux", icon: Terminal },
    { name: "AWS", icon: Cloud },
    { name: "Azure", icon: Cloud },
  ];

  return (
    <section id="stack" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8">
      <SectionEyebrow icon={<Layers className="w-3.5 h-3.5" />} index="03" label="Stack Tecnológica" sublabel="// ferramentas e linguagens do dia a dia" />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
        {stack.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className={`group relative rounded-2xl px-3 py-4 flex flex-col items-center justify-center gap-2 text-center overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:border-purple-400/30 ${GLASS} ${tech.featured ? 'ring-1 ring-purple-400/20' : ''}`}
            >
              <Icon className="w-5 h-5 text-purple-400 group-hover:text-sky-400 transition-colors" aria-hidden="true" />
              <span className="font-semibold text-white text-xs font-['Space_Grotesk'] leading-tight">{tech.name}</span>
              {tech.featured && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-400" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CyberSecurity() {
  const conhecimentos = [
    { name: "Redes de Computadores", desc: "Infraestrutura de pacotes e tráfego." },
    { name: "TCP/IP", desc: "Protocolos fundamentais de comunicação." },
    { name: "Firewall", desc: "Regras de filtragem e segurança de perímetro." },
    { name: "SIEM", desc: "Gerenciamento e análise centralizada de logs." },
    { name: "Threat Intelligence", desc: "Mapeamento analítico de ameaças de rede." },
    { name: "MITRE ATT&CK", desc: "Framework de técnicas e táticas de ataque." },
    { name: "Vulnerabilidades", desc: "Identificação e análise de brechas em sistemas." },
    { name: "Gestão de Incidentes", desc: "Resposta estruturada contra vazamentos ou ataques." },
    { name: "Segurança em Cloud", desc: "Políticas de identidade e segurança de nuvem." }
  ];

  return (
    <section id="cyber" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8 overflow-hidden">
      {/* Marca d'água cibernética de fundo (decorativa) */}
      <div
        aria-hidden="true"
        className="absolute right-4 bottom-4 opacity-[0.025] text-[10px] font-['JetBrains_Mono'] text-red-500 select-none pointer-events-none uppercase tracking-widest hidden xl:block w-1/3 leading-tight"
      >
        {`01000011 01011001 01000010 01000101 01010010
        [SYSTEM_FAILURE_PREVENTION_ACTIVE]
        [PORT_SCANNING_DETECTED_WARNING]
        ID: 0x9FFAD341B
        CORE: ACTIVE
        REDE: MONITORADA
        THREAT_LEVEL: MINIMAL
        KERNEL_SHIELD: ON`}
      </div>

      <SectionEyebrow icon={<Shield className="w-3.5 h-3.5 text-red-400" />} index="04" label="Cibersegurança" sublabel="// monitoramento e blindagem de infraestrutura" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {conhecimentos.map((c, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-7 rounded-3xl flex gap-5 items-start hover:border-red-500/30 hover:scale-[1.02] transition-all duration-300 group ${GLASS}`}
            >
              <div className="p-3 bg-red-500/10 rounded-2xl text-red-400 flex-shrink-0 group-hover:bg-red-500/20 transition-colors duration-300 group-hover:rotate-6">
                <Shield className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-white font-['Space_Grotesk'] group-hover:text-red-400 transition-colors duration-200">
                  {c.name}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Painel do Laboratório — estilo janela de terminal */}
        <div className={`rounded-3xl p-7 space-y-6 h-fit hover:border-red-500/20 transition-all duration-300 relative overflow-hidden ${GLASS}`}>
          <div className="flex items-center gap-1.5 pb-4 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <h3 className="ml-3 text-sm font-bold text-white font-['JetBrains_Mono'] flex items-center gap-2">
              lab_cyber.sh
            </h3>
          </div>

          <div className="space-y-4 text-sm font-['JetBrains_Mono']">
            <div className="space-y-2">
              <span className="text-red-400 font-bold block text-xs tracking-wider">// ESTUDOS CONCLUÍDOS</span>
              <div className="bg-black/30 p-5 rounded-2xl border border-white/[0.06] space-y-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                <div className="hover:text-red-400 hover:translate-x-1 transition-all duration-200 pl-1 cursor-default">✓ Cisco: Introduction to Cybersecurity</div>
                <div className="hover:text-red-400 hover:translate-x-1 transition-all duration-200 pl-1 cursor-default">✓ Cisco: Networking Basics</div>
                <div className="hover:text-red-400 hover:translate-x-1 transition-all duration-200 pl-1 cursor-default">✓ Fortinet: Getting Started in Cybersecurity</div>
                <div className="hover:text-red-400 hover:translate-x-1 transition-all duration-200 pl-1 cursor-default">✓ Fortinet: Threat Landscape</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-slate-500 font-bold block text-xs tracking-wider">// LABS PRÁTICOS (EM BREVE)</span>
              <div className="bg-black/20 p-5 rounded-2xl border border-dashed border-white/10 text-slate-500 text-xs leading-relaxed">
                TryHackMe, HackTheBox ou write-ups de CTF entrarão aqui assim que forem concluídos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Projeto {
  id: number;
  titulo: string;
  contexto: string;
  problema: string;
  solucao: string;
  atuacao: string;
  desafio: string;
  features: string[];
  tags: string[];
  githubUrl: string;
}

export function Projects({ lista }: { lista: Projeto[] }) {
  return (
    <section id="projetos" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8">
      <SectionEyebrow icon={<Layers className="w-3.5 h-3.5" />} index="05" label="Estudos de Caso Acadêmicos" sublabel="// projetos aplicados na FATEC Araras" />

      <div className="space-y-8">
        {lista?.map((p, idx) => (
          <div
            key={p.id}
            className={`rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-purple-400/25 hover:scale-[1.005] transition-all duration-300 group ${GLASS} ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
          >
            <div className="lg:col-span-4 bg-white/[0.02] p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between gap-8 [direction:ltr]">
              <div>
                <span className="text-xs font-['JetBrains_Mono'] text-purple-400 block mb-2">{p.contexto}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight font-['Space_Grotesk'] group-hover:text-purple-400 transition-colors duration-300">{p.titulo}</h3>
              </div>
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-sm py-3.5 rounded-2xl border border-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                Ver Código no GitHub <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-8 p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 [direction:ltr]">
              <div className="text-sm space-y-5 leading-relaxed">
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-red-400 uppercase font-bold text-xs">// Problema</h4>
                  <p className="text-slate-300 mt-2">{p.problema}</p>
                </div>
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-emerald-400 uppercase font-bold text-xs">// Solução</h4>
                  <p className="text-slate-300 mt-2">{p.solucao}</p>
                </div>
              </div>

              <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/[0.06] flex flex-col justify-between gap-4">
                <div>
                  <h4 className="text-xs font-['JetBrains_Mono'] text-slate-500 uppercase font-bold mb-3">Funcionalidades</h4>
                  <ul className="space-y-2.5 text-sm text-slate-300 leading-normal">
                    {p.features?.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 hover:text-white transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                  {p.tags?.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-['JetBrains_Mono'] text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Banner de destaque: futuro projeto de Cibersegurança */}
        <div className={`rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border-dashed hover:border-red-400/40 transition-all duration-300 ${GLASS}`}>
          <div className="p-5 bg-red-500/10 rounded-3xl text-red-400 flex-shrink-0">
            <Lock className="w-10 h-10" aria-hidden="true" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20 mb-3">
              Em breve
            </span>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">Write-up de CTF / Lab de Segurança</h3>
            <p className="text-slate-400 text-sm max-w-2xl">
              Espaço reservado para o primeiro estudo de caso prático em Cibersegurança — TryHackMe, HackTheBox
              ou CTF, com cenário, metodologia e ferramentas utilizadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Curso {
  instituicao: string;
  nome: string;
  status: string;
  ano?: string;
  stack?: string;
}

interface Meta {
  sigla: string;
  nome: string;
  stack: string;
}

export function Certifications({ cursos, metas }: { cursos: Curso[]; metas: Meta[] }) {
  const renderLogo = (instituicao: string) => {
    const cleanName = instituicao.toLowerCase();
    if (cleanName.includes('cisco')) {
      return (
        <svg className="w-8 h-8 fill-sky-400" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.25 15.75h1.5v1.5h-1.5zm3 0h1.5v1.5h-1.5zm3 0h1.5v1.5h-1.5zM3.75 9.75h1.5v7.5h-1.5zm3-3h1.5v10.5h-1.5zm3-3h1.5v13.5h-1.5zm3 0h1.5v13.5h-1.5zm3 3h1.5v10.5h-1.5zm3 3h1.5v7.5h-1.5z"/>
        </svg>
      );
    }
    if (cleanName.includes('fortinet')) {
      return (
        <svg className="w-8 h-8 fill-red-500" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L2 6.5v6c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12v-6L12 2zm0 4.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5S8.5 11.93 8.5 10s1.57-3.5 3.5-3.5z"/>
        </svg>
      );
    }
    if (cleanName.includes('microsoft') || cleanName.includes('azure')) {
      return (
        <svg className="w-8 h-8 fill-blue-500" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z"/>
        </svg>
      );
    }
    return <Award className="w-8 h-8 text-amber-400" aria-hidden="true" />;
  };

  return (
    <section id="certificados" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8">
      <SectionEyebrow icon={<Award className="w-3.5 h-3.5" />} index="06" label="Certificações e Formação" sublabel="// cursos concluídos e próximas metas" />

      <div className="space-y-16">
        {/* Seção de Cursos Concluídos — bento com destaque para os mais recentes */}
        <div>
          <h3 className="text-xs font-['JetBrains_Mono'] text-slate-500 uppercase tracking-wider mb-6">// Cursos Concluídos</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cursos?.map((c, idx) => (
              <div
                key={idx}
                className={`p-7 rounded-3xl flex flex-col justify-between min-h-[210px] hover:border-amber-400/30 hover:scale-[1.02] transition-all duration-300 group ${GLASS} ${idx === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-5">
                    <span className="text-xs font-['JetBrains_Mono'] text-slate-400 block uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                      {c.instituicao}
                    </span>
                    <div className="flex-shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      {renderLogo(c.instituicao)}
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white leading-relaxed font-['Space_Grotesk'] group-hover:text-amber-400 transition-colors duration-200">
                    {c.nome}
                  </h4>
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div>
                    {c.stack && (
                      <span className="text-xs font-['JetBrains_Mono'] text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                        {c.stack}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-['JetBrains_Mono'] px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {c.ano || '2026'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Próximas Metas */}
        <div>
          <h3 className="text-xs font-['JetBrains_Mono'] text-slate-500 uppercase tracking-wider mb-6">// Próximas Metas</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {metas?.map((m, idx) => (
              <div
                key={idx}
                className="bg-white/[0.015] border border-dashed border-white/10 p-7 rounded-3xl flex flex-col justify-between min-h-[190px] hover:border-purple-400/30 hover:bg-white/[0.03] hover:scale-[1.02] transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-5">
                    <span className="text-xs font-['JetBrains_Mono'] text-slate-500 block uppercase tracking-wider">{m.sigla}</span>
                    <div className="flex-shrink-0 opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300">
                      {renderLogo(m.stack)}
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {m.nome}
                  </h4>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs font-['JetBrains_Mono'] text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                    {m.stack}
                  </span>
                  <span className="text-xs font-['JetBrains_Mono'] px-3 py-1.5 rounded-full bg-white/[0.04] text-slate-500 border border-white/10">
                    Foco
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contato" className="relative py-16 md:py-24 max-w-[1440px] mx-auto px-4 md:px-8">
      <div className={`rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden ${GLASS}`}>
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/15 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <SectionEyebrow icon={<Mail className="w-3.5 h-3.5" />} index="07" label="Vamos Conversar?" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a
              href={`mailto:${CONTATO.email}`}
              className="group flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-sky-400/40 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:bg-sky-500/20 transition-colors flex-shrink-0">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-['JetBrains_Mono'] text-slate-500 uppercase tracking-wider">E-mail</p>
                <p className="text-white font-bold text-sm truncate">{CONTATO.email}</p>
              </div>
            </a>

            <a
              href={CONTATO.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir conversa no WhatsApp"
              title="Conversar no WhatsApp"
              className="group flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-400/40 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-white font-bold text-sm font-['JetBrains_Mono'] tracking-wide">WhatsApp</span>
            </a>

            <a
              href={CONTATO.curriculoUrl}
              download
              className="group flex items-center gap-4 bg-purple-600 hover:bg-purple-500 p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
            >
              <div className="p-3 bg-white/10 rounded-2xl text-white flex-shrink-0">
                <Download className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-['JetBrains_Mono'] text-purple-200 uppercase tracking-wider">Currículo</p>
                <p className="text-white font-bold text-sm">Baixar PDF</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-10 mt-6 text-xs text-slate-500 font-['JetBrains_Mono']">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
        <div className="text-center md:text-left">
          <p className="text-slate-300 font-bold text-sm">{PERFIL.nome}</p>
          <p className="text-purple-400 text-xs mt-1">{PERFIL.cargo} · {PERFIL.objetivo}</p>
          <p className="text-slate-600 text-[11px] mt-2">© {year} — Todos os direitos reservados.</p>
        </div>
        <a
          href="#inicio"
          className="text-slate-500 hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          ↑ Voltar ao topo
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  const meusProjetosReais: Projeto[] = [
    {
      id: 1,
      titulo: "Projeto Constrular",
      contexto: "Projeto Integrador desenvolvido na FATEC Araras",
      problema: "Falta de centralização e controle manual de materiais de construção, gerando furos de estoque.",
      solucao: "Sistema de gerenciamento para loja de materiais de construção, integrando o controle de estoque, cadastros e relatórios financeiros em uma única aplicação.",
      atuacao: "Desenvolvimento da lógica Back-end com Django e integração com o banco de dados MongoDB.",
      desafio: "Aprender a conectar o Django a um banco de dados NoSQL (MongoDB).",
      features: ["Controle de estoque básico", "Cadastro de funcionários, usuários e produtos"],
      tags: ["Python", "Django", "MongoDB"],
      githubUrl: "https://github.com/orgs/Constrular-Material-de-Construcao/projects/2/views/1"
    },
    {
      id: 2,
      titulo: "Pet & Pet",
      contexto: "Trabalho de Conclusão / Projeto desenvolvido na FATEC Araras",
      problema: "Desorganização de agendamentos e prontuários médicos em pet shops.",
      solucao: "Sistema de gerenciamento interno para um pet shop, com foco na organização de agendamentos e prontuários.",
      atuacao: "Desenvolvimento do Back-end em PHP e estruturação das tabelas no MySQL.",
      desafio: "Modelar o banco de dados relacional para relacionar corretamente os clientes.",
      features: ["Cadastro de clientes e animais", "Sistema de agendamento de banho e tosa"],
      tags: ["PHP", "MySQL"],
      githubUrl: "https://github.com/marcos22-s/PI-2--Semestre-2025"
    }
    // Para adicionar um novo projeto, basta incluir mais um objeto neste array
    // seguindo a mesma estrutura (id, titulo, contexto, problema, solucao, features, tags, githubUrl).
  ];

  const cursosConcluidos: Curso[] = [
    { instituicao: "Cisco Networking Academy", nome: "Networking Basics", status: "Concluído", ano: "2026", stack: "Redes & Infra" },
    { instituicao: "Cisco Networking Academy", nome: "Introduction to Cybersecurity", status: "Concluído", ano: "2026", stack: "Cibersegurança" },
    { instituicao: "Fortinet Training Institute", nome: "Getting Started in Cybersecurity 3.0", status: "Concluído", ano: "2026", stack: "Segurança de Redes" },
    { instituicao: "Fortinet Training Institute", nome: "Introduction to the Threat Landscape 3.0", status: "Concluído", ano: "2026", stack: "Análise de Ameaças" }
  ];

  const metasCertificacoes: Meta[] = [
    { sigla: "AZ-900", nome: "Microsoft Azure Fundamentals", stack: "Microsoft" }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-['Inter'] selection:bg-purple-500/30 antialiased scroll-smooth relative">
      <GlobalStyles />
      <BackgroundFX />

      {/* Link de acessibilidade: pular para o conteúdo */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Pular para o conteúdo
      </a>

      {/* LADO ESQUERDO: Redes Sociais Verticais (apenas telas XL) */}
      <div className="hidden xl:flex flex-col items-center gap-6 fixed bottom-0 left-8 z-40">
        <a
          href={CONTATO.githubUser}
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          title="GitHub"
          aria-label="Abrir perfil do GitHub"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href={CONTATO.linkedinUser}
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          title="LinkedIn"
          aria-label="Abrir perfil do LinkedIn"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <div aria-hidden="true" className="w-[5px] h-32 bg-gradient-to-t from-transparent via-slate-800 to-slate-800" />
      </div>

      {/* LADO DIREITO: HUD de Monitoramento (decorativo, apenas telas XL) */}
      <div aria-hidden="true" className="hidden xl:flex flex-col items-center gap-4 fixed bottom-0 right-8 z-40 font-['JetBrains_Mono'] text-[10px] text-slate-600 select-none">
        <div className="tracking-widest [writing-mode:vertical-lr] uppercase space-y-2">
          <span className="text-purple-500/60 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 motion-safe:animate-pulse inline-block" />
            BACKEND_DEV_CORE // ON
          </span>
          <span className="text-slate-700">LOC: LEME_SP // BR</span>
        </div>
        <div className="w-[5px] h-32 bg-gradient-to-t from-transparent via-slate-800 to-slate-800" />
      </div>

      {/* ========================================================================= */}
      {/* CONTEÚDO PRINCIPAL DO SITE */}
      {/* ========================================================================= */}
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <CyberSecurity />
        <Projects lista={meusProjetosReais} />
        <Certifications cursos={cursosConcluidos} metas={metasCertificacoes} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
