import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-blue/30 selection:text-brand-blue">
      {/* Aqui futuramente ficará nossa Navbar fixa */}
      <header className="w-full py-4 px-6 border-b border-brand-card/50 bg-brand-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-xl text-brand-blue">MF.dev</span>
          <span className="text-xs text-brand-muted">Menu em breve...</span>
        </div>
      </header>

      {/* Conteúdo dinâmico da página */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Nosso Footer base */}
      <footer className="w-full py-6 mt-12 border-t border-brand-card/50 text-center text-sm text-brand-muted">
        <p>© {new Date().getFullYear()} Marcos Firmino. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}