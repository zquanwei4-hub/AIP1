import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function PortfolioAnalysis() {
  const [contribution, setContribution] = useState(200); // $200 / month
  const [apy, setApy] = useState(15); // 15% APY
  const [years, setYears] = useState(5); // 5 year model

  // Math compound calculator
  const calculateCompoundInterest = () => {
    let totalsList: { year: number; principal: number; interest: number; total: number }[] = [];
    let currentTotal = 0;
    let totalInvested = 0;

    for (let i = 1; i <= years; i++) {
      // Monthly contributions compounded annually for simplification
      const annualContribution = contribution * 12;
      totalInvested += annualContribution;
      
      // Compute interest rebalanced
      const rate = apy / 100;
      currentTotal = (currentTotal + annualContribution) * (1 + rate);
      const totalAccumulatedInterest = Math.max(0, currentTotal - totalInvested);

      totalsList.push({
        year: i,
        principal: totalInvested,
        interest: totalAccumulatedInterest,
        total: currentTotal,
      });
    }

    return totalsList;
  };

  const compoundData = calculateCompoundInterest();
  const finalScore = compoundData[compoundData.length - 1] || { principal: 0, interest: 0, total: 0 };

  // Asset weights
  const assetSchedules = [
    { name: 'BTC (Sovereign Bitcoin Reserve)', ratio: 40, amt: '$12,420.50', color: 'bg-zinc-400' },
    { name: 'ETH (Ethereum Ecosystem Core)', ratio: 35, amt: '$10,850.10', color: 'bg-zinc-500' },
    { name: 'SOL (High Liquidity Layer1)', ratio: 15, amt: '$4,650.15', color: 'bg-zinc-600' },
    { name: 'USDT (Stable Liquid Pool)', ratio: 10, amt: '$3,100.00', color: 'bg-zinc-700' },
  ];

  return (
    <div id="portfolio-analysis-panel" className="space-y-8 font-sans">
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-6 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            资产敞口与复合增益预测 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ PORTFOLIO ANALYSIS</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            推演长期代币定投链条的本息成长弧线，量化风险对齐以及偏离度智能重平衡。
          </p>
        </div>
        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block select-none">
          COMPOUND MATHEMATICS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn" id="portfolio-bento-grid">
        {/* Left column: Compound interest slider & predictions */}
        <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between gap-6" id="compound-section">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3" id="comp-header">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-current/60">
              资产复合增速模拟器 / Forecasting Dial
            </span>
            <span className="text-[9px] font-mono opacity-30">[Differential Model Activated]</span>
          </div>

          {/* Interactive dial sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="slider-controls-grid">
            {/* Monthly Contribution */}
            <div className="space-y-2.5" id="group-cont">
              <div className="flex justify-between text-xs">
                <span className="text-current/50 uppercase tracking-wider text-[10px] font-bold">每期定资本金 / Capital</span>
                <span className="font-mono font-bold text-current">${contribution} / M</span>
              </div>
              <input
                id="slider-cont"
                type="range"
                min="50"
                max="1000"
                step="50"
                value={contribution}
                onChange={(e) => setContribution(Number(e.target.value))}
                className="w-full h-1 bg-current/10 rounded-none appearance-none cursor-pointer accent-current"
              />
              <span className="text-[9px] font-mono opacity-30 block uppercase text-right">Min $50 / Max $1,000</span>
            </div>

            {/* Expected Annual Yield APY */}
            <div className="space-y-2.5" id="group-apy">
              <div className="flex justify-between text-xs">
                <span className="text-current/50 uppercase tracking-wider text-[10px] font-bold">预期年复合率 / Expected APY</span>
                <span className="font-mono font-bold text-current">{apy}%</span>
              </div>
              <input
                id="slider-apy"
                type="range"
                min="5"
                max="40"
                step="1"
                value={apy}
                onChange={(e) => setApy(Number(e.target.value))}
                className="w-full h-1 bg-current/10 rounded-none appearance-none cursor-pointer accent-current"
              />
              <span className="text-[9px] font-mono opacity-30 block uppercase text-right">Beta adjusted range</span>
            </div>

            {/* Term Timeline Years */}
            <div className="space-y-2.5" id="group-years">
              <div className="flex justify-between text-xs">
                <span className="text-current/50 uppercase tracking-wider text-[10px] font-bold">定投跨度寿命 / Horizon Term</span>
                <span className="font-mono font-bold text-current">{years} 年</span>
              </div>
              <input
                id="slider-years"
                type="range"
                min="2"
                max="10"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1 bg-current/10 rounded-none appearance-none cursor-pointer accent-current"
              />
              <span className="text-[9px] font-mono opacity-30 block uppercase text-right">Horizon parameter limit</span>
            </div>
          </div>

          {/* Computed Output Metrics */}
          <div className="p-5 bg-[var(--bg-subcard)] border border-[var(--border-color)] flex flex-col md:flex-row justify-between items-start md:items-center gap-5" id="computed-comp-totals">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-current/40 font-bold block font-mono">累计划扣总投资 / Contributed sum</span>
              <div className="text-xl font-light font-mono text-current">
                ${finalScore.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-current/40 font-bold block font-mono">复合增益对冲盈额 / Compounded yields</span>
              <div className="text-xl font-mono font-bold text-emerald-500">
                +${finalScore.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="space-y-1 p-4 bg-current/5 border border-current/10 w-full md:w-auto flex-shrink-0">
              <span className="text-[9px] uppercase tracking-widest text-current opacity-70 font-bold block font-mono">终期预期总估值 / Estimated total</span>
              <div className="text-3xl font-light font-mono text-current mt-1">
                ${finalScore.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          {/* Dynamic SVG Projections Graph */}
          <div className="w-full bg-[var(--bg-subcard)] border border-[var(--border-color)] p-5 flex flex-col justify-between" id="visual-projection-graph">
            <span className="text-[9px] font-mono text-current/40 uppercase tracking-widest font-bold block mb-6">
              [ 资产定投预期复利累进轨迹走势 / EXPOSURE LEDGER ]
            </span>

            {/* Custom SVG Bar Chart */}
            <div className="h-44 w-full flex items-end gap-3 md:gap-6 border-b border-[var(--border-color)] pb-3" id="bars-stage">
              {compoundData.map((data, idx) => {
                const totalMax = finalScore.total || 1000;
                const principalPercent = (data.principal / totalMax) * 100;
                const interestPercent = (data.interest / totalMax) * 100;

                return (
                  <div key={data.year} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative transition-all" id={`bar-track-${idx}`}>
                    {/* Glowing floating label */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--bg-card)] text-current p-3 border border-[var(--border-color)] font-mono text-[9px] absolute z-10 -top-14 pointer-events-none text-center min-w-[120px]">
                      本金: ${Math.round(data.principal)}
                      <br />
                      增值: ${Math.round(data.interest)}
                    </div>

                    <div className="w-full flex flex-col justify-end h-full" id={`stacked-bar-${idx}`}>
                      {/* Interest Component (top) */}
                      <div 
                        className="w-full bg-current transition-all duration-300"
                        style={{ height: `${interestPercent}%` }}
                      />
                      {/* Principal Component (bottom) */}
                      <div 
                        className="w-full bg-current/20 transition-all duration-300"
                        style={{ height: `${principalPercent}%` }}
                      />
                    </div>
                    {/* Axis Labels */}
                    <span className="text-[9px] font-mono opacity-50 uppercase">Yr {data.year}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-[10px] font-mono opacity-50" id="graph-legend">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-current/20" />
                <span>累计投入本金 / Invested Capital</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-current" />
                <span>预期利溢积累 / Generated Yields</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Target ratios breakdown */}
        <div className="lg:col-span-4 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between gap-6 relative overflow-hidden" id="ratios-section">
          <div className="border-b border-[var(--border-color)] pb-3" id="weights-header">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-current/60">
              资产最优比重配置 / Target Allocation
            </span>
          </div>

          {/* Allocation bars list */}
          <div className="space-y-5" id="allocation-ratios">
            {assetSchedules.map((asset, index) => (
              <div key={asset.name} className="space-y-2 animate-fadeIn" id={`ratio-box-${index}`}>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-semibold text-current/80 font-sans">{asset.name.split(' (')[0]}</span>
                  <span className="font-bold text-current">{asset.ratio}%</span>
                </div>
                {/* Visual bar */}
                <div className="w-full bg-current/5 border border-[var(--border-color)] h-1.5 overflow-hidden" id={`ratio-bar-bg-${index}`}>
                  <div className={`h-full ${asset.color} opacity-80`} style={{ width: `${asset.ratio}%` }} />
                </div>
                <div className="flex justify-between text-[9px] opacity-40 font-mono">
                  <span>对折价值 / Value Link</span>
                  <span>{asset.amt}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[var(--bg-subcard)] border border-[var(--border-color)] text-[10.5px] leading-relaxed text-current/60 space-y-1.5" id="rebalance-notice">
            <span className="font-bold text-[9px] uppercase tracking-wider block text-current font-mono">Rebalance Trigger Threshold</span>
            <p>
              若行情偏离指定资产敞口 <strong>&gt; 5%</strong>，自动平衡模块将无感整合路由，在未来的下一个执行周期对其快速纠偏对齐。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
