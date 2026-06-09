import React, { useState } from 'react';
import { DCAStrategy } from '../types';
import { TrendingUp, Sparkles, Check, ChevronRight } from 'lucide-react';

interface DCAHubProps {
  strategies: DCAStrategy[];
  setStrategies: React.Dispatch<React.SetStateAction<DCAStrategy[]>>;
}

export default function DCAHub({ strategies, setStrategies }: DCAHubProps) {
  // Simple form state
  const [name, setName] = useState('');
  const [targetAsset, setTargetAsset] = useState('ETH');
  const [amount, setAmount] = useState(150);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Interactive Simulator / Backtester state
  const [backtestMonths, setBacktestMonths] = useState(12);
  const [simulationAsset, setSimulationAsset] = useState('BTC');

  function handleCreateStrategy(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const newStrategicPlan: DCAStrategy = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      targetAsset,
      sourceAsset: 'USDT',
      amount,
      frequency,
      riskProfile,
      status: 'active',
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
    };

    setStrategies((prev) => [newStrategicPlan, ...prev]);
    setName('');
    setSuccessMessage(`“${newStrategicPlan.name}” 定投管线已成功部署，并安全注入非托管链上监听器。`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 6000);
  }

  // Purely mathematical dynamic calculation representing DCA historical returns backtest
  const getSimulatedDcaResults = () => {
    const monthlyRate = 100; // Mock basis unit
    const growthRates: { [key: string]: number } = {
      BTC: 1.84, // 84% return over 12 months, linear-adjusted
      ETH: 1.62,
      SOL: 2.45,
      ADA: 0.95 // Down a bit
    };

    const multiplier = growthRates[simulationAsset] || 1.35;
    // Scale returns by duration parameter
    const durationCoeff = Math.min(2.0, Math.max(0.5, backtestMonths / 12));
    
    const finalAssetsValue = monthlyRate * backtestMonths * multiplier * durationCoeff;
    const totalInvested = monthlyRate * backtestMonths;
    const profitPercentage = ((finalAssetsValue - totalInvested) / totalInvested) * 100;
    
    // Lump Sum comparison
    const lumpSumProfit = profitPercentage * 0.72; // Lump sum typically has highly unstable timings

    return {
      invested: totalInvested,
      finalValue: finalAssetsValue,
      profitPct: profitPercentage,
      lumpSumPct: lumpSumProfit
    };
  };

  const simResult = getSimulatedDcaResults();

  return (
    <div id="dca-hub-viewport" className="space-y-8 font-sans">
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-6 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            量化定投策略中心 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ STRATEGY CONFIGURATION</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            自主编排多链代币划扣任务，非托管密码学定期交割以及智能风险重平衡控制。
          </p>
        </div>
        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block select-none">
          PORTFOLIO DYNAMICS ENGINE
        </span>
      </div>

      {/* Deploy alert banner */}
      {successMessage && (
        <div className="p-4 bg-current/[0.02] border border-current/20 text-current rounded-none flex items-center justify-between gap-3 text-xs font-sans" id="form-success-banner">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
          <span className="text-[10px] opacity-50 uppercase tracking-widest font-mono">Confirmed</span>
        </div>
      )}

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn" id="dca-layout-grid">
        {/* Form panel to Provision new strategy */}
        <div className="lg:col-span-6 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 space-y-6" id="dca-creation-section">
          <h3 className="font-bold text-xs uppercase tracking-widest text-current border-b border-[var(--border-color)] pb-3">
            01 / 部署全新定投管线 (Configure Stream)
          </h3>

          <form onSubmit={handleCreateStrategy} className="space-y-5 text-xs font-sans" id="aip-newplan-form">
            {/* Plan alias */}
            <div className="space-y-1.5" id="form-group-name">
              <label className="text-[10px] uppercase font-bold text-current/50 tracking-wide font-mono block">管线资产简属名称 / Name Pin</label>
              <input
                id="input-plan-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="密码学主流增值、以太坊双周均衡、长期积淀信心等..."
                className="w-full px-4 py-3 bg-[var(--bg-subcard)] border border-[var(--border-color)] rounded-none text-xs text-current focus:border-current outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="form-row-assets">
              {/* Target Coin */}
              <div className="space-y-1.5" id="form-group-target">
                <label className="text-[10px] uppercase font-bold text-current/50 tracking-wide font-mono block">定投目标代币 / Target Asset</label>
                <select
                  id="select-target-asset"
                  value={targetAsset}
                  onChange={(e) => setTargetAsset(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-subcard)] border border-[var(--border-color)] rounded-none text-xs text-current outline-none cursor-pointer focus:border-current"
                >
                  <option value="BTC">BTC (Bitcoin)</option>
                  <option value="ETH">ETH (Ethereum)</option>
                  <option value="SOL">SOL (Solana)</option>
                  <option value="ADA">ADA (Cardano)</option>
                </select>
              </div>

              {/* Purchase Base Amount */}
              <div className="space-y-1.5" id="form-group-amount">
                <label className="text-[10px] uppercase font-bold text-current/50 tracking-wide font-mono block">每期执行限额 / Cycle Amount</label>
                <div className="relative">
                  <input
                    id="input-base-amount"
                    type="number"
                    required
                    min="10"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-4 pr-16 py-3 bg-[var(--bg-subcard)] border border-[var(--border-color)] rounded-none text-xs text-current outline-none focus:border-current"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-40 font-mono font-bold">
                    USDT
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="form-row-params">
              {/* Frequency Selection */}
              <div className="space-y-1.5" id="form-group-frequency">
                <label className="text-[10px] uppercase font-bold text-current/50 tracking-wide font-mono block">划扣执行周期 / Run Interval</label>
                <select
                  id="select-frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="w-full px-4 py-3 bg-[var(--bg-subcard)] border border-[var(--border-color)] rounded-none text-xs text-current outline-none cursor-pointer focus:border-current"
                >
                  <option value="daily">按日交割运行 / Daily Interval</option>
                  <option value="weekly">按周交割运行 / Weekly Interval</option>
                  <option value="biweekly">双周自动轮询 / Bi-Weekly Interval</option>
                  <option value="monthly">按月交割运行 / Monthly Interval</option>
                </select>
              </div>

              {/* Risk rebalancer preset */}
              <div className="space-y-1.5" id="form-group-risk-profile">
                <label className="text-[10px] uppercase font-bold text-current/50 tracking-wide font-mono block">防震控制预设 / Anti-drawdown Spec</label>
                <select
                  id="select-risk-profile"
                  value={riskProfile}
                  onChange={(e) => setRiskProfile(e.target.value as any)}
                  className="w-full px-4 py-3 bg-[var(--bg-subcard)] border border-[var(--border-color)] rounded-none text-xs text-current outline-none cursor-pointer focus:border-current"
                >
                  <option value="conservative">🛡️ 守恒: 自动极值平衡防跌</option>
                  <option value="balanced">⚖️ 均值: 标准资产中性平衡</option>
                  <option value="aggressive">⚡ 进取: 折价主动溢量买入</option>
                </select>
              </div>
            </div>

            {/* Smart assist notice */}
            <div className="p-4 bg-current/[0.02] border border-current/10 text-[11px] leading-relaxed text-current/60 space-y-1" id="rebalance-info-alert">
              <span className="font-bold text-[10px] text-current uppercase tracking-wider block font-mono">AIP Advisory Guidance</span>
              <p>
                选用 <strong>{riskProfile === 'conservative' ? '保守平置型' : riskProfile === 'balanced' ? '均值中和型' : '成长进取型'}</strong> 保障机制。定投管线将根据布林极度偏离模型，决定是否在行情暴跌谷底自动溢量划扣多链储备金进行底部加码购入，从而迅速摊低长期持仓成本。
              </p>
            </div>

            {/* Submit Trigger */}
            <button
              id="submit-provision-plan-btn"
              type="submit"
              className="w-full py-4 bg-current text-[var(--bg-sidebar)] hover:opacity-90 active:translate-y-px transition-all duration-300 font-sans font-bold text-xs uppercase tracking-widest rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>注入并部署策略管线 / BIND DELEGATED STREAM</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Backtester / Historical DCA Returns Simulator */}
        <div className="lg:col-span-6 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 space-y-6" id="dca-backtest-section">
          <h3 className="font-bold text-xs uppercase tracking-widest text-current border-b border-[var(--border-color)] pb-3">
            02 / 累积年化收益拟合回测器 (Simulation Engine)
          </h3>

          <div className="space-y-6 text-xs" id="simulator-controls">
            {/* Target Asset choice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="sim-row-choices">
              <div className="space-y-2" id="sim-group-asset">
                <label className="text-[10px] uppercase font-bold text-current/50 font-mono tracking-wide">核测标的 / Simulated Token</label>
                <div className="flex border border-[var(--border-color)] p-1 bg-[var(--bg-subcard)]" id="sim-token-chips">
                  {['BTC', 'ETH', 'SOL', 'ADA'].map((coin) => (
                    <button
                      key={coin}
                      type="button"
                      id={`btn-sim-token-${coin}`}
                      onClick={() => setSimulationAsset(coin)}
                      className={`flex-1 py-1.5 text-[10px] uppercase font-bold font-mono transition-all duration-200 cursor-pointer ${
                        simulationAsset === coin
                          ? 'bg-current text-[var(--bg-sidebar)] font-bold'
                          : 'text-current/50 hover:text-current'
                      }`}
                    >
                      {coin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tally months slider */}
              <div className="space-y-2" id="sim-group-months">
                <div className="flex justify-between text-[10px] uppercase font-bold text-current/50 font-mono tracking-wide">
                  <span>历史跨度 / Period Span</span>
                  <span className="text-current">{backtestMonths} 个月</span>
                </div>
                <div className="pt-2">
                  <input
                    id="slider-sim-months"
                    type="range"
                    min="3"
                    max="24"
                    value={backtestMonths}
                    onChange={(e) => setBacktestMonths(Number(e.target.value))}
                    className="w-full h-1 bg-current/10 rounded-none appearance-none cursor-pointer accent-current"
                  />
                  <div className="flex justify-between text-[8px] opacity-40 font-mono mt-1">
                    <span>3M</span>
                    <span>12M</span>
                    <span>24M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Math Computations Display Board */}
            <div className="p-5 bg-[var(--bg-subcard)] border border-[var(--border-color)] space-y-6" id="sim-scorecard">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="sim-numbers-grid">
                <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-card)]" id="calc-dca-returns">
                  <span className="text-[9px] uppercase tracking-wider text-current opacity-50 block font-mono">AIP 智能模式终值 (AIP Net)</span>
                  <div className="text-2xl font-light font-mono text-current mt-1.5">
                    ${simResult.finalValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{simResult.profitPct.toFixed(1)}% APY</span>
                  </span>
                </div>

                <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-card)] opacity-80" id="calc-lumpsum-returns">
                  <span className="text-[9px] uppercase tracking-wider text-current opacity-50 block font-mono">传统单次买入本息 (Lump Sum)</span>
                  <div className="text-2xl font-light font-mono text-current mt-1.5">
                    ${(simResult.invested * (1 + simResult.lumpSumPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </div>
                  <span className="text-[10px] text-emerald-500/80 font-bold flex items-center gap-1 mt-2">
                    <span>+{simResult.lumpSumPct.toFixed(1)}% APY</span>
                  </span>
                </div>
              </div>

              {/* Yield visual progress bars comparison */}
              <div className="space-y-3.5 border-t border-[var(--border-color)] pt-5" id="yield-visualizer">
                <span className="text-[9px] uppercase text-current/40 font-bold tracking-widest block font-mono">
                  复合定投积累增长曲线比对 / Yield Growth Contrast
                </span>
                <div className="space-y-3" id="perf-tracks">
                  {/* AIP Track */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-current/80">
                      <span>AIP 平台全智能回撤加力模式</span>
                      <span className="font-bold font-mono">+{simResult.profitPct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-current/5 h-1 border border-current/[0.03]">
                      <div className="bg-current h-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(10, simResult.profitPct))}%` }} />
                    </div>
                  </div>

                  {/* Lump Sum Track */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-current/60">
                      <span>无调节的普通单次时机购入</span>
                      <span className="font-mono">+{simResult.lumpSumPct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-current/5 h-1 border border-current/[0.03]">
                      <div className="bg-current/30 h-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(10, simResult.lumpSumPct))}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backtest info logs footer */}
            <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-subcard)] text-[10.5px] leading-relaxed text-current/60 font-sans" id="backtester-notes">
              基准演算假定在每个约定扣款日的开盘即定划扣 <strong>$100 USDT</strong>。得益于 AIP 的微观闪电集中结算打包，您将在实际链上节省超过 <strong>75% 以上的可变 Gas 摩擦成本</strong>。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
