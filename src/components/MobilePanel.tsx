import React, { useState } from 'react';
import { initialClients, initialImages, initialAssets } from '../data';
import { 
  Phone, Sparkles, Smartphone, User, Briefcase, Users, Image as ImageIcon, LineChart, 
  Settings, HelpCircle, ArrowLeft, Send, CheckCircle, Calculator, Percent, ShieldAlert 
} from 'lucide-react';

interface MobilePanelProps {
  onBack: () => void;
}

export default function MobilePanel({ onBack }: MobilePanelProps) {
  const [mobilePage, setMobilePage] = useState<string>('today');
  const [calcComplexity, setCalcComplexity] = useState<number>(2); // 1-Basic, 2-Medium, 3-Expert
  const [calcDays, setCalcDays] = useState<number>(5);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedMobileClientId, setSelectedMobileClientId] = useState<string>('cl-1');

  // Quotation quotation computation
  const calculatedQuotation = calcComplexity * calcDays * 3500;

  const mobileScreens = [
    { id: 'today', label: 'm/today (移动端今日)', icon: Briefcase },
    { id: 'clients', label: 'm/clients (移动端客户)', icon: Users },
    { id: 'prompts', label: 'm/prompts (移动端提示语)', icon: Sparkles },
    { id: 'dashboard', label: 'm/dashboard (移动仪表盘)', icon: LineChart },
    { id: 'assets', label: 'm/assets (移动端资产库)', icon: ImageIcon },
    { id: 'weekly-report', label: 'm/weekly-report (移动端周报)', icon: LineChart },
    { id: 'me', label: 'm/me (个人中心)', icon: User },
    { id: 'contents', label: 'm/contents (内容)', icon: ImageIcon },
    { id: 'analytics', label: 'm/analytics (移动分层统计)', icon: LineChart },
    { id: 'pricing', label: 'm/pricing (价格配置)', icon: Percent },
    { id: 'image', label: 'm/image (移动端图片)', icon: ImageIcon },
    { id: 'settings', label: 'm/settings (移动端设定)', icon: Settings },
    { id: 'suggestions', label: 'm/suggestions (反馈意见)', icon: Send },
    { id: 'presets', label: 'm/presets (移动端预设)', icon: Sparkles },
    { id: 'calculator', label: 'm/calculator (计算报价器)', icon: Calculator }
  ];

  const clientDetail = initialClients.find(c => c.id === selectedMobileClientId) || initialClients[0];

  return (
    <div id="mobile-companion-panel-root" className="border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-6">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-5 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            移动端模块模拟系统 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ MOBILE COMPANION APP</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            提供由物理智能手机骨架搭载的 15 个移动端专属微型功能页面，支持即时交互与算力绑定反馈。
          </p>
        </div>
        <button 
          id="btn-return-topology"
          onClick={onBack}
          className="px-3 py-1.5 border border-current text-[10px] tracking-widest lowercase opacity-60 hover:opacity-100 hover:bg-current/5 transition-all cursor-pointer font-bold font-mono"
        >
          [ back to topology / 返回拓扑 ]
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="mobile-dual-col">
        
        {/* Left Side: Controller select directory */}
        <div className="lg:col-span-5 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="mobile-views-browser">
          <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">模拟宿主切换选项 / Select Router (15 pages)</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[380px] overflow-y-auto pr-1" id="mobile-routers-list">
            {mobileScreens.map((screen) => {
              const Icon = screen.icon;
              const isActive = mobilePage === screen.id || (screen.id === 'clients' && mobilePage === 'client-detail');
              return (
                <button
                  key={screen.id}
                  id={`btn-select-mobile-${screen.id}`}
                  onClick={() => {
                    setMobilePage(screen.id);
                    setSubmittedFeedback(false);
                  }}
                  className={`w-full text-left p-2 text-[10px] font-sans flex items-center gap-2 transition-all border ${
                    isActive 
                      ? 'bg-current text-[var(--bg-sidebar)] border-current font-bold' 
                      : 'border-current/10 hover:border-current/30 text-current/75'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: High-fidelity virtual device frame */}
        <div className="lg:col-span-7 flex justify-center py-4" id="device-mockup-wrapper">
          <div 
            id="virtual-smartphone-shell"
            className="w-[310px] h-[610px] border-[10px] border-neutral-900 rounded-[34px] bg-[#09090B] text-neutral-200 relative shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Top sensor notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-b-xl z-20 flex items-center justify-center">
              <span className="w-12 h-1 bg-neutral-800 rounded-full" />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-900/40 border border-blue-500/20 ml-2" />
            </div>

            {/* Simulated System status bar */}
            <div className="pt-8 px-5 pb-2 text-[9px] font-mono flex justify-between items-center opacity-65 z-10 border-b border-neutral-800/40">
              <span>09:51 UTC</span>
              <span className="font-bold tracking-widest text-[8px] text-emerald-400">● 5G / SECURED</span>
            </div>

            {/* SCREEN VIEWPORT AREA */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4" id="mobile-scroller-view">
              
              {/* === m/today === */}
              {mobilePage === 'today' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-today-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/today / 今日计划</span>
                    <h3 className="text-xs font-bold uppercase tracking-widest">阿尔法项目进度盯防</h3>
                  </div>
                  <div className="border border-neutral-800 p-3 bg-neutral-900/50 space-y-3" id="m-tasks">
                    {['拉高核心指示器饱和度', 'COMFYUI K-Sampler 线程检测', '去噪材质合并'].map((vText, vIdx) => (
                      <div key={vIdx} className="flex items-center gap-2 text-[11px]" id={`m-task-wrapper-${vIdx}`}>
                        <div className="w-4 h-4 border border-neutral-700 flex items-center justify-center text-[8px] text-emerald-400" id={`m-task-checkbox-${vIdx}`}>
                          ✓
                        </div>
                        <span className="text-neutral-300">{vText}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 text-[10px] text-emerald-400 flex items-center gap-1.5" id="m-today-info">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>算力池当前极速运转，稳定度 100%。</span>
                  </div>
                </div>
              )}

              {/* === m/clients === */}
              {mobilePage === 'clients' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-clients-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/clients / 客户档案组</span>
                    <h3 className="text-xs font-bold">合作方通讯快卡</h3>
                  </div>
                  <div className="space-y-2.5" id="m-clients-catalog">
                    {initialClients.map((cli) => (
                      <button
                        key={cli.id}
                        id={`btn-m-client-card-${cli.id}`}
                        onClick={() => { setSelectedMobileClientId(cli.id); setMobilePage('client-detail'); }}
                        className="w-full text-left p-3 border border-neutral-800 bg-neutral-900/40 hover:border-neutral-600 transition-all flex items-center gap-2.5 cursor-pointer"
                      >
                        <img src={cli.avatar} alt="Avatar" className="w-7 h-7 object-cover rounded-full" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-bold text-neutral-100 truncate">{cli.name}</h4>
                          <p className="text-[9px] text-neutral-400 truncate">{cli.company}</p>
                        </div>
                        <span className="text-[8px] font-mono text-emerald-400 uppercase">ACTIVE</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* === m/client-detail === */}
              {mobilePage === 'client-detail' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-client-detail-body">
                  <button 
                    id="back-to-m-clients"
                    onClick={() => setMobilePage('clients')}
                    className="text-[10px] text-neutral-400 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>返回客户名录 / m/clients</span>
                  </button>
                  <div className="border border-neutral-800 p-3 bg-neutral-900/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <img src={clientDetail.avatar} alt="Cli Avatar" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-[11px] font-bold text-neutral-100">{clientDetail.name}</h4>
                        <p className="text-[9px] text-neutral-400 font-mono">{clientDetail.company}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-normal block whitespace-pre-wrap translate-y-1">
                      {clientDetail.brief}
                    </p>
                  </div>
                </div>
              )}

              {/* === m/prompts === */}
              {mobilePage === 'prompts' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-prompts-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/prompts / 移动端提示词</span>
                    <h3 className="text-xs font-bold">微型短语调优工具</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2" id="m-prompts-chips">
                    {['Swiss Minimal', 'Noir Ambient', 'Clay Render', 'Mono Typo'].map((chip) => (
                      <button 
                        key={chip}
                        id={`btn-m-prompt-chip-${chip.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => alert(`[已选用] ${chip} 组合字组已被追加！`)}
                        className="p-2 border border-neutral-800 bg-neutral-900/60 text-[10px] text-neutral-300 font-mono text-center hover:border-neutral-600 transition-all cursor-pointer"
                      >
                        # {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* === m/dashboard === */}
              {mobilePage === 'dashboard' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-dashboard-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/dashboard / 控制大盘</span>
                    <h3 className="text-xs font-bold uppercase">算力配额微视图</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3" id="m-dashboard-bento">
                    <div className="border border-neutral-850 p-2.5 bg-neutral-900/60 text-center">
                      <span className="text-[8px] opacity-40 block font-mono">DCA APY</span>
                      <span className="text-sm font-bold font-mono">14.8%</span>
                    </div>
                    <div className="border border-neutral-850 p-2.5 bg-neutral-900/60 text-center">
                      <span className="text-[8px] opacity-40 block font-mono">TOTAL CLIENTS</span>
                      <span className="text-sm font-bold font-mono">{initialClients.length}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* === m/assets === */}
              {mobilePage === 'assets' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-assets-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/assets / 移动端资产库</span>
                    <h3 className="text-xs font-bold">系统图像快速引航</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5" id="m-assets-images">
                    {initialImages.map((img) => (
                      <div key={img.id} className="aspect-square border border-neutral-850 overflow-hidden relative" id={`m-asset-img-wrapper-${img.id}`}>
                        <img src={img.url} alt="Mobile asset" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === m/weekly-report === */}
              {mobilePage === 'weekly-report' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-weekly-report-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/weekly-report / 研发周报</span>
                    <h3 className="text-xs font-bold uppercase">本周算力与产值交付</h3>
                  </div>
                  <div className="border border-neutral-800 p-3 bg-neutral-900/80 leading-relaxed text-[10px] text-neutral-300 font-mono" id="m-weekly-info">
                    <p className="font-bold text-emerald-400">Week 24 Report Summary:</p>
                    <p className="mt-1">累计无缝贴合计算: 24次</p>
                    <p>超像素重构交割量: 4.8 GB</p>
                    <p className="border-t border-neutral-800 pt-2 mt-2">系统收益综合累加比上周增加 +12.3%。稳定性良好。</p>
                  </div>
                </div>
              )}

              {/* === m/me === */}
              {mobilePage === 'me' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-me-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/me / 个人安全舱</span>
                    <h3 className="text-xs font-bold">zquanwei4@gmail.com</h3>
                  </div>
                  <div className="border border-neutral-800 p-3 bg-neutral-900/60 space-y-2 text-[10px]" id="m-me-details">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">授权权限:</span>
                      <span className="font-bold">Primary Architect</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">安全密钥状态:</span>
                      <span className="text-emerald-400 font-bold">100% SECURE</span>
                    </div>
                  </div>
                </div>
              )}

              {/* === m/contents === */}
              {mobilePage === 'contents' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-contents-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/contents / 公告推文</span>
                    <h3 className="text-xs font-bold">智能文本同步公告板</h3>
                  </div>
                  <div className="border border-neutral-800 p-3 bg-neutral-900/60 space-y-1 text-[10px]" id="m-contents-info">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-mono px-1 block truncate">阿尔法阶段对齐公告</span>
                    <p className="text-neutral-400 leading-normal block translate-y-1">
                      控制台指示器拉高3.5%饱和度，遵守W3C明亮对比度标准。
                    </p>
                   </div>
                </div>
              )}

              {/* === m/analytics === */}
              {mobilePage === 'analytics' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-analytics-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/analytics / 统计分析</span>
                    <h3 className="text-xs font-bold uppercase">算力占比占比详情</h3>
                  </div>
                  <div className="space-y-2 text-[10.5px] font-mono text-neutral-300" id="m-analytics-details">
                    <div>
                      <div className="flex justify-between text-[9px]">
                        <span>Stable Diffusion Load</span>
                        <span>82%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1 mt-1">
                        <div className="bg-emerald-500 h-full w-[82%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* === m/pricing === */}
              {mobilePage === 'pricing' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-pricing-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/pricing / 价格费率</span>
                    <h3 className="text-xs font-bold">AIGC 服务资费清单</h3>
                  </div>
                  <div className="border border-neutral-800 p-3 bg-neutral-900/60 space-y-1.5 text-[10px]" id="m-pricing-details">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">单组贴图运算:</span>
                      <span className="font-bold">¥12 / 1024px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">超像素重排 (4K):</span>
                      <span className="font-bold">¥35 / 张</span>
                    </div>
                  </div>
                </div>
              )}

              {/* === m/image === */}
              {mobilePage === 'image' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-image-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/image / 图片展示</span>
                    <h3 className="text-xs font-bold">图床移动段对拍</h3>
                  </div>
                  <div className="aspect-video w-full overflow-hidden border border-neutral-850" id="m-image-show-box">
                    <img src={initialImages[1].url} alt="Mobile detail showcase" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                  </div>
                </div>
              )}

              {/* === m/settings === */}
              {mobilePage === 'settings' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-settings-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/settings / 移动端设定</span>
                    <h3 className="text-xs font-bold uppercase">安全绑定选项</h3>
                  </div>
                  <div className="flex items-center justify-between text-[11px] p-2 bg-neutral-900/60" id="m-settings-row">
                    <span>是否开启指纹多签拦截</span>
                    <input id="chk-m-fingerprint" type="checkbox" defaultChecked className="accent-neutral-100" />
                  </div>
                </div>
              )}

              {/* === m/suggestions === */}
              {mobilePage === 'suggestions' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-suggestions-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/suggestions / 意见建议</span>
                    <h3 className="text-xs font-bold">对局域算能改进回执</h3>
                  </div>
                  
                  {submittedFeedback ? (
                    <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 text-center text-[11px] text-emerald-400" id="m-suggestions-success">
                      感谢您的建议，回执哈希已写入系统。
                    </div>
                  ) : (
                    <div className="space-y-3" id="m-suggestions-form animate-fadeIn">
                      <textarea 
                        id="mobile-suggestion-textarea"
                        rows={3}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="请输入改进建议、算法时延纠偏常数描述..."
                        className="w-full bg-neutral-900 border border-neutral-800 p-2 text-[10px] text-neutral-100 outline-none placeholder:text-neutral-500"
                      />
                      <button 
                        id="btn-submit-mobile-suggestion"
                        onClick={() => {
                          if (!feedbackText.trim()) return;
                          setSubmittedFeedback(true);
                        }}
                        className="w-full py-2 bg-neutral-100 text-neutral-900 text-[10px] uppercase font-bold cursor-pointer font-sans"
                      >
                        提交此条回执
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* === m/presets === */}
              {mobilePage === 'presets' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-presets-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/presets / 样式包预设</span>
                    <h3 className="text-xs font-bold uppercase">移动端 CSS 样式包</h3>
                  </div>
                  <div className="p-3 border border-neutral-850 bg-neutral-900 text-[10px] space-y-1" id="m-presets-specs">
                    <span className="font-bold">Pure Alabaster CSS Spec</span>
                    <p className="text-neutral-400">border-radius: 4px; border: 1px solid rgba(0,0,0,0.1)</p>
                  </div>
                </div>
              )}

              {/* === m/calculator === */}
              {mobilePage === 'calculator' && (
                <div className="space-y-4 animate-fadeIn" id="mobile-calculator-body">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono opacity-40 uppercase">m/calculator / 极简工时及算力计算报价器</span>
                    <h3 className="text-xs font-bold">设计算力报价工具</h3>
                  </div>

                  <div className="space-y-2 text-[11px]" id="m-calc-form">
                    <div className="space-y-1">
                      <label htmlFor="complexity-select" className="text-[9px] text-neutral-400">1. 工作复杂度 / Complexity</label>
                      <select 
                        id="complexity-select"
                        value={calcComplexity} 
                        onChange={(e) => setCalcComplexity(Number(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-800 p-2 text-[10px]"
                      >
                        <option value={1}>纯粹配色与圆角调优 (Basic)</option>
                        <option value={2}>去焦去噪与无缝贴图 (Medium)</option>
                        <option value={3}>多节点 ComfyUI 流程部署 (Expert)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="duration-input" className="text-[9px] text-neutral-400">2. 交割周期 (天) / Duration: {calcDays}天</label>
                      <input 
                        id="duration-input"
                        type="range" 
                        min={1} 
                        max={30} 
                        value={calcDays} 
                        onChange={(e) => setCalcDays(Number(e.target.value))}
                        className="w-full accent-neutral-100"
                      />
                    </div>

                    <div className="border-t border-neutral-800 pt-3 mt-2 text-center" id="m-calc-result-box">
                      <span className="text-[9px] text-neutral-500 uppercase block">建议合同额报价 / Final Quotation</span>
                      <span className="text-lg font-bold font-mono text-emerald-400">¥{calculatedQuotation.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

            </main>

            {/* Virtual bottom home drag indicator */}
            <div className="pb-3 flex justify-center" id="phone-nav-footer">
              <span className="w-24 h-1 bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
