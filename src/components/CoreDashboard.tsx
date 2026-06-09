import React, { useState } from 'react';
import { DCAStrategy } from '../types';
import { TrendingUp, TrendingDown, Target, Shield, ArrowUpRight, ArrowDownRight, Sparkles, Filter } from 'lucide-react';

interface CoreDashboardProps {
  strategies: DCAStrategy[];
  setStrategies: React.Dispatch<React.SetStateAction<DCAStrategy[]>>;
  setCurrentPage: (page: string) => void;
}

export default function CoreDashboard({ strategies, setStrategies, setCurrentPage }: CoreDashboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused'>('all');

  const filteredStrategies = strategies.filter((plan) => {
    if (activeTab === 'all') return true;
    return plan.status === activeTab;
  });

  const aiSentimentValue = 74; 
  const aiSafetyIndex = 98; 

  return (
    <div id="core-dashboard-panel" className="space-y-8 font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-6 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            资产状态总览 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ OVERVIEW</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            多层去中心化自动定投管线、智能对冲指数以及低滑点交割状况的极简可视化透视。
          </p>
        </div>
        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block select-none">
          SECURE QUANTITATIVE ENVIRONMENT
        </span>
      </div>

      {/* 1. Metric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" id="dashboard-bento">
        {/* Metric 1: Portfolio Asset Aggregator */}
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col justify-between transition-all duration-300 hover:border-current/25" id="metric-aggregator-box">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-50 uppercase tracking-wider">
            <span>多链折算净值 / Total Vault</span>
            <span className="text-emerald-500 font-bold">● LIVE</span>
          </div>
          <div className="my-5">
            <h3 className="text-3xl font-light font-sans tracking-tight text-current" id="metric-balance-text">
              $94,152.85
            </h3>
            <span className="text-[10px] text-emerald-500 flex items-center gap-1.5 mt-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>今日增幅 (24h) +14.82%</span>
            </span>
          </div>
          <p className="text-[9px] opacity-30 font-mono tracking-wide uppercase">
            Sovereign collateral ratio: 154%
          </p>
        </div>

        {/* Metric 2: AI Sentiment Gauge */}
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col justify-between transition-all duration-300 hover:border-current/25" id="metric-sentiment-box">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-50 uppercase tracking-wider">
            <span>自适应吸纳偏心因子 / Buy Factor</span>
            <span className="text-current/60 font-mono text-[9px] flex items-center gap-1">
              Balanced Pool
            </span>
          </div>
          <div className="flex items-center gap-4 my-4">
            <div className="relative w-12 h-12 flex-shrink-0" id="circular-sentiment-meter">
              <svg className="w-full h-full -rotate-90">
                <circle cx="24" cy="24" r="20" className="stroke-current/5 fill-none" strokeWidth="2.5" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-current/80 fill-none transition-all duration-1000"
                  strokeWidth="2.5"
                  strokeDasharray={126}
                  strokeDashoffset={126 - (126 * aiSentimentValue) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10.5px] font-mono font-bold text-current">
                {aiSentimentValue}%
              </div>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold tracking-tight text-current">上行分配加权 (Bullish Weighing)</h4>
              <p className="text-[10px] text-current/50 leading-relaxed">平台当前根据离散多因子指标，配置充足的现货承托占比。</p>
            </div>
          </div>
          <span className="text-[9px] opacity-30 font-mono tracking-wide uppercase">DCA Multiplier: 1.28x</span>
        </div>

        {/* Metric 3: Active AIP Plans count */}
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col justify-between transition-all duration-300 hover:border-current/25" id="metric-active-plans">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-50 uppercase tracking-wider">
            <span>安全托管计划 / Active Pools</span>
            <span className="text-emerald-500 font-mono text-[9px]">HEALTHY</span>
          </div>
          <div className="my-5">
            <h3 className="text-3xl font-light font-sans tracking-tight text-current">
              {strategies.filter(s => s.status === 'active').length} <span className="text-xs opacity-50 font-normal">plans active</span>
            </h3>
            <span className="text-[10px] text-current/60 flex items-center gap-1 mt-2 font-medium">
              <Target className="w-3.5 h-3.5 opacity-60" />
              <span>全协议多维度重平衡防震已开启</span>
            </span>
          </div>
          <p className="text-[9px] opacity-30 font-mono tracking-wide uppercase">
            Active polling: daily audit
          </p>
        </div>

        {/* Metric 4: System Rebalance Coefficent */}
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col justify-between transition-all duration-300 hover:border-current/25" id="metric-system-sec">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-50 uppercase tracking-wider">
            <span>协议安防风控评级 / Safety Core</span>
            <span className="text-current/80 font-bold flex items-center gap-1 text-[9px] font-mono">
              <Shield className="w-3 h-3" /> Audit Verified
            </span>
          </div>
          <div className="my-5">
            <h3 className="text-3xl font-light font-sans tracking-tight text-current">
              {aiSafetyIndex}% <span className="text-xs opacity-50 font-normal">rating</span>
            </h3>
            <span className="text-[10px] text-emerald-500 flex items-center gap-1 mt-2 font-medium">
              <span>零智能合约执行漏洞资产保障</span>
            </span>
          </div>
          <p className="text-[9px] opacity-30 font-mono tracking-wide uppercase">
            Max asset slippage barrier: 0.1%
          </p>
        </div>
      </div>

      {/* 2. Live Market Grid (Custom SVG Analytics & Price Feeds) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-main-section">
        {/* Left Col: High-Tech Ticker Tapes & Mini Charts */}
        <div className="lg:col-span-8 space-y-6" id="dashboard-left">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 space-y-6" id="live-prices-panel">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border-color)] pb-4 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-current opacity-50 tracking-widest font-semibold block">
                  主流数字金仓价格 / Market Prices
                </span>
                <h3 className="text-sm font-semibold text-current font-display">
                  平台主流对标代币现价与变动走势自适应点拨
                </h3>
              </div>
              <span className="text-[9px] font-mono opacity-30">Realtime Indexing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="tickers-grid">
              {/* Asset Box 1: Bitcoin */}
              <div className="p-5 border border-[var(--border-color)] hover:border-current/20 transition-all duration-300 flex items-center justify-between bg-[var(--bg-card)]" id="feed-btc">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs tracking-tight text-current font-display">BTC / USDT</span>
                    <span className="text-[8px] font-mono bg-current/5 border border-current/10 text-current px-1.5 py-0.5 uppercase">具备优质定投资质</span>
                  </div>
                  <h4 className="text-lg font-light font-mono text-current mt-1">$68,412.30</h4>
                  <p className="text-[10px] font-mono text-emerald-500 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> +2.85% (今日)
                  </p>
                </div>
                {/* Minimalist Premium Sparkline */}
                <svg className="w-20 h-10 stroke-current opacity-55 fill-none" strokeWidth="1" id="sparkline-btc">
                  <path d="M 0 30 Q 10 32 20 8 T 40 35 T 60 12 T 80 8" />
                </svg>
              </div>

              {/* Asset Box 2: Ethereum */}
              <div className="p-5 border border-[var(--border-color)] hover:border-current/20 transition-all duration-300 flex items-center justify-between bg-[var(--bg-card)]" id="feed-eth">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs tracking-tight text-current font-display">ETH / USDT</span>
                    <span className="text-[8px] font-mono bg-current/5 border border-current/10 text-current px-1.5 py-0.5 uppercase">活跃守护中</span>
                  </div>
                  <h4 className="text-lg font-light font-mono text-current mt-1">$3,520.15</h4>
                  <p className="text-[10px] font-mono text-rose-500 flex items-center gap-0.5">
                    <ArrowDownRight className="w-3 h-3" /> -0.84% (今日)
                  </p>
                </div>
                {/* Minimalist Premium Sparkline */}
                <svg className="w-20 h-10 stroke-current opacity-55 fill-none" strokeWidth="1" id="sparkline-eth">
                  <path d="M 0 8 Q 10 38 20 28 T 40 8 T 60 32 T 80 28" />
                </svg>
              </div>
            </div>
          </div>

          {/* AIP Execution List */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 space-y-6" id="plans-table-panel">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-80 font-display">
                  目前已部署的自动定投管线配置
                </h3>
                <p className="text-[11px] text-current/50 font-sans">
                  已对齐智能防跌机制、按固定排期自动执行并由智能合约自主托管的安全账户。
                </p>
              </div>

              {/* Filtering Toggles */}
              <div className="flex items-center gap-1.5 self-start" id="plan-filters">
                {([
                  { id: 'all', label: '全部' },
                  { id: 'active', label: '运行中' },
                  { id: 'paused', label: '暂停' }
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    id={`tab-filter-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 text-[10px] border font-sans tracking-wide transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-current bg-current text-[var(--bg-sidebar)] font-medium'
                        : 'border-[var(--border-color)] text-current/50 hover:text-current hover:bg-current/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List rendered */}
            {filteredStrategies.length === 0 ? (
              <div className="p-12 border border-dashed border-current/10 text-center text-xs opacity-60 flex flex-col items-center gap-3" id="empty-plans-indicator">
                <span>未检索到匹配当前条件的的定投策略方案。</span>
                <button
                  id="create-strategy-btn"
                  onClick={() => setCurrentPage('dca')}
                  className="px-4 py-2 border border-current text-[10px] uppercase tracking-widest font-mono font-bold hover:bg-current hover:text-[var(--bg-sidebar)] transition-all cursor-pointer"
                >
                  去往配置面板合成策略
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto" id="plans-table-container">
                <table className="w-full text-left border-collapse text-xs" id="plans-table">
                  <thead>
                    <tr className="border-b border-current/10 text-current/40 uppercase text-[9px] tracking-widest font-mono">
                      <th className="py-3 font-semibold">名称与交易对 / Details</th>
                      <th className="py-3 font-semibold">周期 / Schedule</th>
                      <th className="py-3 text-right font-semibold w-32">单期本金 / Principal</th>
                      <th className="py-3 text-right font-semibold">抗跌策略 / Risk</th>
                      <th className="py-3 text-right font-semibold">运行状态 / Stat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStrategies.map((plan) => (
                      <tr key={plan.id} className="border-b border-current/5 last:border-0 hover:bg-current/2 transition-all" id={`plan-row-${plan.id}`}>
                        <td className="py-4 pr-2">
                          <div className="font-semibold text-current text-xs tracking-tight">{plan.name}</div>
                          <div className="text-[10px] text-current/40 mt-1 font-mono">
                            {plan.sourceAsset} → <span className="text-current font-bold">{plan.targetAsset}</span>
                          </div>
                        </td>
                        <td className="py-4 text-current/70 font-mono text-[11px]">
                          {plan.frequency === 'daily' ? 'DAILY' : plan.frequency === 'weekly' ? 'WEEKLY' : plan.frequency === 'biweekly' ? 'BI-WEEKLY' : 'MONTHLY'}
                        </td>
                        <td className="py-4 text-right font-mono text-[11px]">
                          <div className="font-bold text-current">{plan.amount} {plan.sourceAsset}</div>
                          <div className="text-[9px] opacity-40 mt-0.5">次期: {plan.nextRun}</div>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`inline-block px-2 py-0.5 border text-[9px] uppercase font-bold tracking-wider ${
                            plan.riskProfile === 'aggressive'
                              ? 'border-rose-500/10 text-rose-500 bg-rose-500/5'
                              : plan.riskProfile === 'balanced'
                              ? 'border-emerald-500/10 text-emerald-500 bg-emerald-500/5'
                              : 'border-neutral-500/10 text-current opacity-70 bg-current/5'
                          }`}>
                            {plan.riskProfile === 'aggressive' ? '折价追加买入' : plan.riskProfile === 'balanced' ? '均衡重平衡' : '稳健平置抗跌'}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] ${
                            plan.status === 'active' ? 'text-emerald-500 font-medium' : 'text-current/35'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${plan.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-current/40'}`} />
                            <span className="uppercase text-[9px] tracking-wider font-mono">{plan.status === 'active' ? 'Active' : 'Stopped'}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Interactive Sentiment rebalancer & AIP system notes */}
        <div className="lg:col-span-4 space-y-6" id="dashboard-right-sidebar">
          {/* Box 1: Rebalance System specifications */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 space-y-6" id="system-rebalance-panel">
            <span className="text-[10px] uppercase font-mono text-current opacity-55 tracking-widest font-bold block">
              智能套利控制机制 / Safe Engine
            </span>
            
            <div className="space-y-4 text-xs" id="intel-bullet-points">
              <div className="p-4 bg-current/[0.02] border border-current/10 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-current">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>智能防跌策略已连接</span>
                </div>
                <p className="text-[10px] leading-relaxed text-current/60">
                  当主流代币深度跌破移动均线或布林带宽时，托管管线将智能调配底层冷仓准备金进行底部加码购入，平滑长期买入成本。
                </p>
              </div>

              <div className="p-4 bg-current/[0.02] border border-current/10 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-current">
                  <Shield className="w-3.5 h-3.5" />
                  <span>高安全性多签机制</span>
                </div>
                <p className="text-[10px] leading-relaxed text-current/60">
                  平台不对外留存或保管任何用户的钱包私钥资产。每一份定投方案的运行及自适应调整均完全交由审计透明的非托管密码学智能合约负责。
                </p>
              </div>
            </div>

            <button
              id="btn-goto-advisor"
              onClick={() => setCurrentPage('copilot')}
              className="w-full py-3 border border-current/10 hover:border-current/40 text-current text-xs font-mono font-bold tracking-widest rounded-none uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>联系 AI 顾问顾问 / CONSULT ADVISOR</span>
            </button>
          </div>

          {/* Quick Stats Module */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 text-xs font-mono space-y-4" id="quick-stats-side">
            <div className="border-b border-[var(--border-color)] pb-3 text-[10px] text-current/40 uppercase tracking-widest font-bold">
              环境与链上参数 / Core Network Constants
            </div>
            <div className="space-y-2.5 text-[10.5px] opacity-80" id="stats-log text">
              <div className="flex justify-between">
                <span className="font-sans text-current/50">当前结算网络 (Default):</span>
                <span className="text-current font-medium">以太坊 L1 主网</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-current/50">基础成交 Gas (Base Fee):</span>
                <span className="text-current font-bold">14 Gwei / 极度宽松</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-current/50">当前最高交割量 (Collateral):</span>
                <span className="text-current font-medium">12.4 ETH ／ 0.45 BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-current/50">滑点冗余限制 (Slippage max):</span>
                <span className="text-emerald-500 font-bold">自适应 ≤ 0.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
