import React, { useState } from 'react';
import { ThemeType, SpacingType, PageType, DCAStrategy } from './types';
import NavigationMap from './components/NavigationMap';
import CoreDashboard from './components/CoreDashboard';
import DCAHub from './components/DCAHub';
import AICopilot from './components/AICopilot';
import PortfolioAnalysis from './components/PortfolioAnalysis';
import GovernanceProposals from './components/GovernanceProposals';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles, Shield, User } from 'lucide-react';

export default function App() {
  // Ultra-Premium Hybrid Theme Selector ('quantum-dark' as luxury midnight, 'neo-light' as pristine alabaster)
  const [activeTheme, setActiveTheme] = useState<ThemeType>('quantum-dark');
  const [activeSpacing, setActiveSpacing] = useState<SpacingType>('comfort');

  // Router page state
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  // Multi-plan global storage
  const [strategies, setStrategies] = useState<DCAStrategy[]>([
    {
      id: "st-1",
      name: "Ethereum Smart Accumulator",
      targetAsset: "ETH",
      sourceAsset: "USDT",
      amount: 200,
      frequency: "weekly",
      riskProfile: "balanced",
      status: "active",
      nextRun: "06/15/2026",
    },
    {
      id: "st-2",
      name: "Satoshi Long-term Sovereign Index",
      targetAsset: "BTC",
      sourceAsset: "USDT",
      amount: 50,
      frequency: "daily",
      riskProfile: "conservative",
      status: "active",
      nextRun: "06/09/2026",
    },
    {
      id: "st-3",
      name: "Solana Liquid Surge Speculation",
      targetAsset: "SOL",
      sourceAsset: "USDT",
      amount: 300,
      frequency: "monthly",
      riskProfile: "aggressive",
      status: "paused",
      nextRun: "07/01/2026",
    }
  ]);

  // Translate spacing to high-end negative space layout padding
  const getSpacingClass = () => {
    switch (activeSpacing) {
      case 'compact':
        return 'py-6 px-4 max-w-7xl mx-auto';
      case 'loose':
        return 'py-12 px-8 lg:px-12 max-w-7xl mx-auto';
      case 'comfort':
      default:
        return 'py-8 px-6 lg:px-8 max-w-7xl mx-auto';
    }
  };

  // Modernist Brutalist Theme Variable Injection
  const getThemeVars = () => {
    if (activeTheme === 'neo-light') {
      // Pristine Alabaster & Charcoal
      return 'bg-[#fafaf9] text-[#1c1917] border-[#e7e5e4] [--bg-sidebar:#fafaf9] [--bg-card:#ffffff] [--bg-subcard:#f5f5f4] [--bg-badge:#e7e5e4] [--border-color:#e7e5e4] [--border-accent:rgba(0,0,0,0.15)] [--text-accent:#1c1917] [--color-accent:#1c1917] [--glow-color:rgba(0,0,0,0.02)]';
    } else {
      // Obsidian Graphite & Platinum Silver
      return 'bg-[#09090b] text-[#f4f4f5] border-[#27272a] [--bg-sidebar:#09090b] [--bg-card:#18181b] [--bg-subcard:#27272a] [--bg-badge:#27272a] [--border-color:#27272a] [--border-accent:rgba(255,255,255,0.15)] [--text-accent:#f4f4f5] [--color-accent:#ffffff] [--glow-color:rgba(255,255,255,0.02)]';
    }
  };

  const navTabs = [
    { id: 'dashboard', label: '账户总览 (Dashboard)' },
    { id: 'dca', label: '定投配置 (DCA Control)' },
    { id: 'copilot', label: '投研顾问 (AI Advisor)' },
    { id: 'portfolio', label: '收益预测 (Projections)' },
    { id: 'proposals', label: '改进提案 (Consensus)' },
    { id: 'navmap', label: '架构脉络 (Topology)' },
  ];

  const toggleTheme = () => {
    setActiveTheme(prev => prev === 'quantum-dark' ? 'neo-light' : 'quantum-dark');
  };

  return (
    <div 
      id="aip-root" 
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-neutral-500/20 selection:text-current ${getThemeVars()}`}
    >
      {/* Dynamic luxury structural grid pattern (Extremely faint) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* LUXURY SLICK TOP BAR */}
      <header 
        id="aip-top-bar" 
        className="w-full border-b border-[var(--border-color)] bg-[var(--bg-sidebar)] backdrop-blur-md relative z-10 select-none py-4 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Main Brand with Elegant Minimalist Typography */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('dashboard')} id="topbar-logo-trigger">
            <div className="w-9 h-9 border border-current flex items-center justify-center font-display font-medium text-lg tracking-tighter">
              A
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs font-bold uppercase tracking-[0.25em] font-display text-current leading-none">
                AIP PROTOCOL
              </h1>
              <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] font-mono mt-1">
                QUANTITATIVE ASSET STREAMS
              </span>
            </div>
          </div>

          {/* Secure Node Status (Human-centered, minimal) */}
          <div className="md:hidden flex items-center gap-2 px-2.5 py-1 bg-current/5 border border-current/5 rounded-full" id="mobile-stats">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span className="text-[9px] font-mono opacity-80 uppercase tracking-wider">Secured</span>
          </div>
        </div>

        {/* REFINED LINKS-STYLE TAB NAVIGATION (Zero boxes, pure text tracking, elegant) */}
        <nav 
          id="workspace-nav-tabbar" 
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 select-none"
        >
          {navTabs.map((tab) => {
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                id={`btn-workspace-nav-${tab.id}`}
                onClick={() => setCurrentPage(tab.id as PageType)}
                className="relative py-2 text-xs uppercase tracking-[0.14em] font-medium font-sans cursor-pointer transition-colors duration-300"
              >
                <span className={isActive ? 'text-current font-semibold' : 'text-current/45 hover:text-current/80'}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* UPPER RIGHT SYSTEM ACTIONS */}
        <div className="hidden md:flex items-center gap-5" id="desktop-actions">
          {/* Secured Node Status */}
          <div className="flex items-center gap-2 text-[10px] font-mono opacity-70 border-r border-[var(--border-color)] pr-5">
            <Shield className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold text-emerald-500">Node Sync Active</span>
          </div>

          {/* Layout density adjuster (Discrete icons) */}
          <div className="flex items-center gap-1 bg-current/5 p-0.5 rounded-md border border-[var(--border-color)] text-[8.5px] font-mono" id="size-toggles">
            <button 
              onClick={() => setActiveSpacing('compact')}
              className={`px-2 py-0.5 rounded ${activeSpacing === 'compact' ? 'bg-current text-[var(--bg-sidebar)] font-bold' : 'opacity-55 hover:opacity-100'}`}
              title="Compact View"
            >
              C
            </button>
            <button 
              onClick={() => setActiveSpacing('comfort')}
              className={`px-2 py-0.5 rounded ${activeSpacing === 'comfort' ? 'bg-current text-[var(--bg-sidebar)] font-bold' : 'opacity-55 hover:opacity-100'}`}
              title="Default Spacing"
            >
              M
            </button>
            <button 
              onClick={() => setActiveSpacing('loose')}
              className={`px-2 py-0.5 rounded ${activeSpacing === 'loose' ? 'bg-current text-[var(--bg-sidebar)] font-bold' : 'opacity-55 hover:opacity-100'}`}
              title="Wide Spacing"
            >
              L
            </button>
          </div>

          {/* Luxury Light / Dark Mode Toggle */}
          <button 
            id="theme-toggler-btn"
            onClick={toggleTheme} 
            className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-current/85 hover:text-current hover:bg-current/5 transition-all duration-300 cursor-pointer"
            title={activeTheme === 'neo-light' ? "Midnight Theme" : "Light Gallery Theme"}
          >
            {activeTheme === 'neo-light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* RESPONSIVE SCROLL-CONTAINER WITH FLUID MOTION ROUTER */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10" id="aip-main-workspace-frame">
        <main 
          id="main-viewport-scroller" 
          className="flex-1 overflow-y-auto w-full smooth-scroll"
        >
          <div className={getSpacingClass()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="w-full h-full"
              >
                {currentPage === 'navmap' && (
                  <NavigationMap 
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage} 
                  />
                )}
                
                {currentPage === 'dashboard' && (
                  <CoreDashboard 
                    strategies={strategies} 
                    setStrategies={setStrategies}
                    setCurrentPage={setCurrentPage}
                  />
                )}

                {currentPage === 'dca' && (
                  <DCAHub 
                    strategies={strategies} 
                    setStrategies={setStrategies}
                  />
                )}

                {currentPage === 'copilot' && (
                  <AICopilot />
                )}

                {currentPage === 'portfolio' && (
                  <PortfolioAnalysis />
                )}

                {currentPage === 'proposals' && (
                  <GovernanceProposals />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* SWISS MODERN FOOTER */}
      <footer 
        id="aip-footer" 
        className="w-full py-5 border-t border-[var(--border-color)] px-10 bg-[var(--bg-sidebar)] text-[9px] font-mono text-center flex flex-col sm:flex-row items-center justify-between gap-2 opacity-40 z-10 select-none"
      >
        <span>
          © 2026 AIP PROTOCOL LABS INC. REGULATED AS AN ETH DEV FORUM INDEX.
        </span>
        <span className="tracking-wider text-right">
          LATENCY: MINIMUM INTERPRETATION EDGE ● ETH L1 DELEGATED SECURITY
        </span>
      </footer>
    </div>
  );
}
