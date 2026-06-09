import React, { useState } from 'react';
import { PageType } from '../types';
import { Shield, Layers, HelpCircle } from 'lucide-react';

interface NavigationMapProps {
  setCurrentPage: (page: PageType) => void;
  currentPage: PageType;
}

export default function NavigationMap({ setCurrentPage, currentPage }: NavigationMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // High-fidelity architectural topology data nodes
  const nodes = [
    {
      id: 'dashboard',
      title: '01 / 核心数据控制台 (Dashboard Hub)',
      brief: '集成多链资产综合折算、决策因子监视以及主流代币价格跟踪的中央看板。',
      inputs: ['多链钱包状态快照 (Wallets)', '活跃定投管线数组 (DCAs)', '去中心化基准喂价 (Prices)'],
      outputs: ['融合全网折算总资产 (Total Equity)', '下期定投排期交割因子'],
      tech: '中性网格布局 / 微型 SVG 折线拟合器',
      color: 'border-current/10 text-current hover:border-current/30 bg-current/[0.01]',
    },
    {
      id: 'dca',
      title: '02 / 定投支配策略管线 (DCA Rules Node)',
      brief: '设定并部署周期性划扣买入计划，包含风险对齐中继器与回测回归拟合。',
      inputs: ['定时执行频率步进', '代币比重资产权重分配', '抗回撤智能风险预置'],
      outputs: ['写入自动托管合约列表', '模拟周期年化复利走势'],
      tech: 'DCA 数值模拟解算引擎 / HTML5 交互滑块轨道',
      color: 'border-current/10 text-current hover:border-current/30 bg-current/[0.01]',
    },
    {
      id: 'copilot',
      title: '03 / AI 决策投研秘书 (AI Co-Pilot Hub)',
      brief: '绑定高性能 Google Gemini AI 引擎，提供多视角量化对冲及提案解读咨询。',
      inputs: ['用户量化及宏观诉求', '上下文对话历史序列缓存'],
      outputs: ['Gemini 2.5 集成响应层', '实时反跌持仓配方修正建议'],
      tech: '服务器 API 代理请求 / @google/genai 框架 SDK 调配',
      color: 'border-current/10 text-current hover:border-current/30 bg-current/[0.01]',
    },
    {
      id: 'portfolio',
      title: '04 / 复合资产溢值拟合 (Compound Projections)',
      brief: '基于长期几何累进模型的复合增利数值模拟器，并直观描绘敞口目标。',
      inputs: ['预期滚动投资周期 (Years)', '年度折算增利收益 APY %', '固定定本保证金'],
      outputs: ['多层本息积累梯度走势', '主要大类币仓占比柱图'],
      tech: '自适应分叠矢量柱形图渲染器',
      color: 'border-current/10 text-current hover:border-current/30 bg-current/[0.01]',
    },
    {
      id: 'proposals',
      title: '05 / 协议共识治理投票 (DAO Decision Portal)',
      brief: '协同社区审定改进草案 (AIP) 并行使权利，具备分布票数审计监视。',
      inputs: ['正在激活的技术提案 AIP', '安全锁仓治理股权凭证'],
      outputs: ['共识签名对决上链日志', '赞同与反对票权即刻变动状态'],
      tech: 'DAO 原子决策模型状态机 / 多维投票分布仪表盘',
      color: 'border-current/10 text-current hover:border-current/30 bg-current/[0.01]',
    },
  ];

  const activeNode = hoveredNode 
    ? nodes.find(n => n.id === hoveredNode) 
    : nodes.find(n => n.id === currentPage);

  return (
    <div id="navigation-map-view" className="space-y-8 font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-6 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            平台系统模块拓扑 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ SYSTEM TOPOLOGY</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            提供平台多功能视窗在微服务与数据契约之间的低延时信息流动全景图谱。
          </p>
        </div>
        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block select-none">
          INTERFACE ROUTING SCHEMA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="nav-grid">
        {/* Left Col: Blueprint interactive SVG circle map */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between min-h-[420px] relative overflow-hidden" id="interactive-diagram-container">
          <div className="text-[9px] font-mono text-current/40 uppercase tracking-widest block mb-4">
            [ 软件内核微组件路由模型 / Telemetry Topology map ]
          </div>

          <div className="flex-1 flex items-center justify-center py-6" id="svg-flow-chart">
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              {/* Central Singularity Control Hub */}
              <div 
                className="w-24 h-24 rounded-full border border-current/25 bg-[var(--bg-subcard)] flex flex-col items-center justify-center z-20 text-center relative group"
                id="central-routing-brain-box"
              >
                <span className="text-[9px] font-mono tracking-widest uppercase font-semibold text-current opacity-85">Core State</span>
                <span className="text-[8px] font-mono text-current opacity-40 tracking-wider mt-1">[AIP STACK]</span>
              </div>

              {/* Orbiting Component Nodes */}
              {nodes.map((node, i) => {
                const angle = (i * 2 * Math.PI) / nodes.length - Math.PI / 2;
                const radius = 120; // Radius sizing suitable for elegant alignment
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const isActive = currentPage === node.id;
                const isHovered = hoveredNode === node.id;

                return (
                  <div key={node.id} id={`orbit-node-container-${node.id}`} className="absolute">
                    {/* SVG Connector vector */}
                    <svg className="absolute inset-0 w-[400px] h-[400px] pointer-events-none z-0 -translate-x-[200px] -translate-y-[200px]">
                      <line 
                        x1="200" 
                        y1="200" 
                        x2={200 + x} 
                        y2={200 + y} 
                        className={`stroke-current/10 ${
                          isHovered || isActive ? 'stroke-current/45 stroke-[1.5px]' : 'stroke-dotted'
                        } transition-all duration-300`} 
                      />
                    </svg>

                    <button
                      id={`node-circle-btn-${node.id}`}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setCurrentPage(node.id as PageType)}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className={`absolute -ml-11 -mt-11 w-22 h-22 rounded-none border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 z-10 hover:border-current hover:scale-103 cursor-pointer ${node.color} ${
                        isActive ? 'border-current font-bold bg-current/5' : ''
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-widest">
                        {node.id.toUpperCase()}
                      </span>
                      <span className="text-[8px] opacity-40 uppercase tracking-widest mt-1">
                        {isActive ? 'Active' : 'Preview'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-[var(--bg-subcard)] border border-[var(--border-color)] text-[11px] leading-relaxed text-current/50 flex items-center gap-2" id="router-hint-box">
            <HelpCircle className="w-4 h-4 opacity-50 shrink-0" />
            <span>鼠标轻抚周围各模块轨道，右侧可同步抓取数据依赖矩阵，点击可完成视域路由切换。</span>
          </div>
        </div>

        {/* Right Col: Diagnostics schema contract payload */}
        <div className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between gap-6" id="nav-diagnostics-side">
          <div className="border-b border-[var(--border-color)] pb-4 space-y-2" id="diagnostic-header-section">
            <span className="text-[10px] font-mono uppercase tracking-widest text-current opacity-45 font-bold block">
              Data Contract & Interface Specs
            </span>
            <h3 className="text-sm font-semibold font-sans mt-2 text-current leading-relaxed">
              {activeNode?.title}
            </h3>
            <p className="text-xs text-current/50 mt-2 leading-relaxed">
              {activeNode?.brief}
            </p>
          </div>

          <div className="space-y-5 flex-1" id="schema-payload-spec-group">
            {/* Inputs */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">依赖及入口输入载荷 / Inputs Payload</span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode?.inputs.map((str, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-current/[0.02] border border-current/10 font-sans text-[10.5px] text-current/70">
                    {str}
                  </span>
                ))}
              </div>
            </div>

            {/* Outputs */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">平台集成与输出参数 / Outputs Payload</span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode?.outputs.map((str, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-current/[0.02] border border-current/10 font-sans text-[10.5px] text-current/70">
                    {str}
                  </span>
                ))}
              </div>
            </div>

            {/* Engine tech */}
            <div className="space-y-1.5 pt-3 border-t border-[var(--border-color)]">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">底层渲染与逻辑解算器 / Engine Link</span>
              <span className="text-xs font-mono font-bold block text-current">
                {activeNode?.tech}
              </span>
            </div>
          </div>

          {/* Page switch gateway */}
          <button
            id="btn-navigate-to-selected-page"
            onClick={() => {
              if (activeNode) {
                setCurrentPage(activeNode.id as PageType);
              }
            }}
            className="w-full py-4 bg-current text-[var(--bg-sidebar)] hover:opacity-90 active:translate-y-px transition-all duration-300 font-sans font-bold text-xs uppercase tracking-widest rounded-none flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>进入该控制视域 / ENTER SELECTED MODULE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
