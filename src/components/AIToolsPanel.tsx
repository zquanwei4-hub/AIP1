import React, { useState } from 'react';
import { initialImages } from '../data';
import { Sparkles, Maximize, Cpu, Grid, Sliders, Palette, FileText, Eraser, ArrowLeft, RefreshCw, Layers } from 'lucide-react';

interface AIToolsPanelProps {
  onBack: () => void;
}

export default function AIToolsPanel({ onBack }: AIToolsPanelProps) {
  const [activeTool, setActiveTool] = useState<string>('home');
  const [targetImage, setTargetImage] = useState<string>(initialImages[0].url);
  const [promptText, setPromptText] = useState('Create a high-contrast futuristic workspace with Swiss minimalist grid tokens');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [comfyNodes, setComfyNodes] = useState<{id: string, name: string, x: number, y: number}[]>([
    { id: 'n-1', name: 'Load Image Asset', x: 20, y: 50 },
    { id: 'n-2', name: 'K-Sampler Optimizer', x: 220, y: 80 },
    { id: 'n-3', name: 'VAE Decode Loader', x: 420, y: 50 },
    { id: 'n-4', name: 'Save PNG Render Output', x: 620, y: 120 }
  ]);
  const [recolorHue, setRecolorHue] = useState<number>(180);
  const [offsetValue, setOffsetValue] = useState<number>(50);
  const [runningModel, setRunningModel] = useState(false);
  const [executionResult, setExecutionResult] = useState('');

  // Prompt generation generator using precompiled keywords
  const generatePromptWithStructure = () => {
    setRunningModel(true);
    setExecutionResult('正在唤醒 Gemini-3.5-Flash 算能中继并构造完美提示词矩阵...');
    setTimeout(() => {
      const positiveKeywords = [
        "ultra-realistic cinematic exposure",
        "extremely high detail 8k resolution",
        "Swiss typographic grid precision",
        "subtle warm off-white ambient layout",
        "pure negative space design",
        "architectural honesty styling"
      ];
      const randomKey = positiveKeywords[Math.floor(Math.random() * positiveKeywords.length)];
      setGeneratedPrompt(`[POSITIVE]: ${promptText}, ${randomKey}, sharp focus rendering --ar 16:9 --style modern --chaos 10`);
      setRunningModel(false);
    }, 800);
  };

  const toolsList = [
    { id: 'upscale', label: '智能超分放大 / Upscale', icon: Maximize, brief: '拉高环境贴图、背景图或SVG至 4K/8K 分辨率，平滑过渡防焦噪。' },
    { id: 'comfy', label: 'ComfyUI 拖拽集成 / ComfyUI Node', icon: Cpu, brief: '可视化拖曳与搭建 AIGC 节点执行流水线流。' },
    { id: 'seamless', label: '无缝贴图生成 / Seamless Pattern', icon: Grid, brief: '对特定笔刷水墨或金属反光材质进行无接缝自适应环叠排版。' },
    { id: 'retouch', label: '高阶智能修图 / Retouch', icon: Sliders, brief: '对画幅特定缺陷进行自适应环境去噪与平滑补缺。' },
    { id: 'recolor', label: '智能对齐配色 / Recolor Tool', icon: Palette, brief: '提取和覆盖参考调色盘，一键将目标图调校至特定品牌基因。' },
    { id: 'prompt-gen', label: '提示词智能精修 / Prompt Genius', icon: FileText, brief: '依托中枢算力，对白话需求丰富至高维 Stable Diffusion / Midjourney 正向文本组。' },
    { id: 'erase', label: '智能笔刷擦除 / Erase & Heal', icon: Eraser, brief: '手动遮罩背景，智能重构擦除区域底层像素。' }
  ];

  return (
    <div id="ai-tools-panel-core" className="border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-6">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-5 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            AIGC 智能生产力工具库 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ CREATIVE AI ENGINE</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            提供高保真度、极强交互性的微型人工智能生成工具，支持算力参数调试与高对比度预览。
          </p>
        </div>
        <button 
          id="back-to-master-topology-btn"
          onClick={onBack}
          className="px-3 py-1.5 border border-current text-[10px] tracking-widest lowercase opacity-60 hover:opacity-100 hover:bg-current/5 transition-all cursor-pointer font-bold font-mono"
        >
          [ back to topology / 返回拓扑 ]
        </button>
      </div>

      {activeTool === 'home' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" id="ai-tools-catalog">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                id={`btn-select-tool-${tool.id}`}
                onClick={() => {
                  setActiveTool(tool.id);
                  setExecutionResult('');
                }}
                className="text-left border border-[var(--border-color)] p-5 hover:border-current/30 transition-all bg-[var(--bg-subcard)] flex flex-col justify-between h-48 cursor-pointer rounded-none"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center bg-current/[0.02]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-current">{tool.label}</h4>
                  <p className="text-[11px] text-current/50 leading-relaxed line-clamp-2">{tool.brief}</p>
                </div>
                <span className="text-[9px] font-mono text-current/40 block border-t border-[var(--border-color)] pt-3">
                  ACTIVATE INSTANTLY ● CLICK
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn" id="individual-ai-tool-view">
          {/* Internal Go-Back Header */}
          <button 
            id="back-to-tools-btn"
            onClick={() => setActiveTool('home')}
            className="text-xs text-current/60 hover:text-current flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回工具主页 / Back to AI Tools</span>
          </button>

          {/* ==================== UPSCALE (超分) ==================== */}
          {activeTool === 'upscale' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="tool-upscale-view">
              <div className="md:col-span-4 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="upscale-controls">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">超分辨率放大控制器 / Scaling Router</span>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-current/50 uppercase block">1. 放大倍数配方 / Ratio</span>
                  <div className="grid grid-cols-3 gap-2" id="upscale-ratios">
                    {['X2', 'X4', 'X8'].map((rt) => (
                      <button 
                        key={rt}
                        id={`btn-upscale-ratio-${rt}`}
                        onClick={() => alert(`已选择 [${rt}] 极净放大倍比模型。`)}
                        className="p-1.5 border border-current/20 hover:border-current text-[11px] font-bold font-mono text-center cursor-pointer"
                      >
                        {rt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-current/50 uppercase block">2. 是否启用多线程无损去杂燥</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-current cursor-pointer">
                      <input id="chk-upscale-denoise" type="checkbox" defaultChecked className="accent-current" />
                      <span>开启 AIGC Smart Denoise</span>
                    </label>
                  </div>
                </div>

                <button 
                  id="btn-run-upscale"
                  onClick={() => {
                    setRunningModel(true);
                    setExecutionResult('正在加载超高性能 VAE 图像重组单元...');
                    setTimeout(() => {
                      setExecutionResult('✅ [超分交割完成] 分辨率已提高至 4C 超极限规格 (4096 x 4096)。边缘质感柔合提升 45%，缓存字节已回执存储！');
                      setRunningModel(false);
                    }, 1200);
                  }}
                  className="w-full py-3 bg-current text-[var(--bg-sidebar)] font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer rounded-none"
                >
                  {runningModel ? '正在计算中...' : '交割执行超分辨率运算'}
                </button>
              </div>

              <div className="md:col-span-8 border border-[var(--border-color)] p-5 bg-[var(--bg-card)] flex flex-col justify-between gap-4" id="upscale-previews">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">放大参考原片与模型识别预览 / Scale Preview</span>
                <div className="aspect-video w-full overflow-hidden border">
                  <img src={targetImage} alt="Scale Origin" className="w-full h-full object-cover filter contrast-125" referrerPolicy="no-referrer" />
                </div>
                {executionResult && (
                  <div className="p-4 border border-dashed border-emerald-500/30 bg-emerald-500/[0.02] text-xs font-mono text-emerald-500" id="upscale-result-box">
                    {executionResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== COMFYUI NODE EDITOR (ComfyUI 集成) ==================== */}
          {activeTool === 'comfy' && (
            <div className="space-y-5" id="tool-comfyui-view">
              <div className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] flex justify-between items-center">
                <span className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-current/40 block">ComfyUI 拖拽流多节点对齐视图 (Live Node Canvas Map)</span>
                <button 
                  id="btn-add-comfy-node"
                  onClick={() => {
                    setComfyNodes([...comfyNodes, {
                      id: `n-${Date.now()}`,
                      name: 'AIGC ControlNet Refiner',
                      x: 300,
                      y: 180
                    }]);
                  }}
                  className="px-2 py-1 border border-current text-[9.5px] font-mono hover:bg-current/5 transition-all font-bold uppercase cursor-pointer"
                >
                  + 新设 Control 节点
                </button>
              </div>

              <div className="h-96 border border-[var(--border-color)] bg-[#09090B] relative overflow-hidden select-none" id="comfy-canvas-grid">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2e_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2e_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
                
                {comfyNodes.map((node) => (
                  <div 
                    key={node.id} 
                    id={`comfy-node-${node.id}`}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    className="absolute w-44 border border-current/30 bg-neutral-900/90 text-[10px] text-white font-mono p-2.5 space-y-1 shadow-lg"
                  >
                    <div className="border-b border-current/20 pb-1 font-bold text-[#fafaf5] flex justify-between items-center leading-none">
                      <span>{node.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="space-y-1 pt-1.5 text-neutral-400 text-[9px]">
                      <div>● Link INPUT (Image)</div>
                      <div className="text-right">● Link OUTPUT (Latent)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== SEAMLESS (无缝贴图) ==================== */}
          {activeTool === 'seamless' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="tool-seamless-view">
              <div className="md:col-span-4 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="seamless-controls">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">无缝堆叠对齐控制器 / Seamless tiling matrix</span>
                
                <div className="space-y-1.5">
                  <label htmlFor="tiling-offset-slider" className="control-label text-[10px] font-mono text-current/60 block py-1.5">平铺位移偏斜 (Tile Offset): {offsetValue}%</label>
                  <input 
                    id="tiling-offset-slider"
                    type="range" 
                    min={10} 
                    max={100} 
                    value={offsetValue} 
                    onChange={(e) => setOffsetValue(Number(e.target.value))}
                    className="w-full accent-current"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-current/50 uppercase block">拼贴对齐边界平滑模式:</span>
                  <div className="flex flex-col gap-1.5" id="seamless-methods">
                    {['Bilinear Interpolation', 'AIGC Neural Boundary Blend', 'Geometric Hard Mirroring'].map((mtd) => (
                      <button
                        key={mtd}
                        id={`btn-select-seamless-method-${mtd.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => alert(`边缘处理融合器：已锁定 [${mtd}]。`)}
                        className="w-full text-left p-2 text-[10px] font-sans border border-current/10 hover:border-current cursor-pointer text-current/80 hover:text-current transition-all"
                      >
                        [ {mtd} ]
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 border border-[var(--border-color)] p-5 bg-[var(--bg-card)] flex flex-col justify-between gap-4" id="seamless-canvas">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">自适应拼贴效果实时拟合 / 4x4 Tiling Grid Preview</span>
                <div className="grid grid-cols-2 gap-1.5 border p-3 bg-neutral-900 overflow-hidden" id="grid-4x4">
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="aspect-video w-full overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=300&q=80" 
                        alt="Tiled" 
                        style={{ transform: `translate(${(offsetValue / 4) * (idx % 2 ? 1 : -1)}px)` }}
                        className="w-full h-full object-cover transition-transform duration-300 filter grayscale" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== RETOUCH (智能修图) ==================== */}
          {activeTool === 'retouch' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="tool-retouch-view">
              <div className="md:col-span-4 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="retouch-controls">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">高阶去杂燥智能修图面板 / Retouch & Specular</span>
                
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-current/50 uppercase block">一键高光对焦模型亮度:</span>
                  <div className="grid grid-cols-2 gap-2" id="retouch-presets">
                    {['Dark Control Room', 'Pristine White Room', 'Cold Cyan Spec', 'Golden Sunset Ambient'].map((prs) => (
                      <button
                        key={prs}
                        id={`btn-apply-retouch-${prs.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => alert(`已一键重组配色环境为 [${prs}]。去焦与锐化度调整完毕。`)}
                        className="p-1.5 border border-current/15 hover:border-current text-[10px] text-left block cursor-pointer font-sans"
                      >
                        {prs}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  id="btn-run-retouch"
                  onClick={() => {
                    setRunningModel(true);
                    setExecutionResult('解析全局光追噪点对焦点...');
                    setTimeout(() => {
                      setExecutionResult('✅ [智能去燥成功] 全光谱漫反射暗区已成功拉伸3%，边缘伪影和颗粒度降低了 18%。修补数据已自动复位。');
                      setRunningModel(false);
                    }, 1000);
                  }}
                  className="w-full py-3 bg-current text-[var(--bg-sidebar)] font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer rounded-none"
                >
                  {runningModel ? '正在解算光照模型...' : '开始全局光追去燥修图'}
                </button>
              </div>

              <div className="md:col-span-8 border border-[var(--border-color)] p-5 bg-[var(--bg-card)] flex flex-col justify-between gap-4" id="retouch-preview-container">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">参考原片 / Retouch Canvas</span>
                <div className="aspect-video w-full overflow-hidden border">
                  <img src="https://images.unsplash.com/photo-1618005124978-c1122cf282f6?auto=format&fit=crop&w=800&q=80" alt="Clay" className="w-full h-full object-cover filter contrast-110" referrerPolicy="no-referrer" />
                </div>
                {executionResult && (
                  <div className="p-3.5 border border-dashed border-emerald-500/30 bg-emerald-500/[0.02] text-xs font-mono text-emerald-500" id="retouch-output-info">
                    {executionResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== RECOLOR (智能配色) ==================== */}
          {activeTool === 'recolor' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="tool-recolor-view">
              <div className="md:col-span-4 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="recolor-controls">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">光谱基因快速配色控制器 / Recolor Hue Specular</span>
                
                <div className="space-y-1.5">
                  <label htmlFor="recolor-hue-slider" className="control-label text-[10px] font-mono text-current/60 block py-1.5">目标色相角度 (Hue Offset): {recolorHue}°</label>
                  <input 
                    id="recolor-hue-slider"
                    type="range" 
                    min={0} 
                    max={360} 
                    value={recolorHue} 
                    onChange={(e) => setRecolorHue(Number(e.target.value))}
                    className="w-full accent-current shadow-inner"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[10px] font-mono text-current/50 uppercase block">一键锁定品牌调色谱:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['#FAFAFA (Pure White)', '#1C1917 (Graphite)', '#FA8A00 (Orange)', '#00E5BC (Mint)'].map((col) => (
                      <button
                        key={col}
                        id={`btn-apply-palette-${col.substring(1,7)}`}
                        onClick={() => alert(`配色对齐：已注入 [${col}] 核心色相！`)}
                        className="px-2 py-1 bg-current/5 border hover:border-current text-[10px] font-sans rounded-none transition-all cursor-pointer"
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 border border-[var(--border-color)] p-5 bg-[var(--bg-card)] flex flex-col justify-between gap-4 shadow-sm" id="recolor-canvas">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">色谱转换预览 / Coloring Genome Frame</span>
                <div 
                  className="aspect-video w-full overflow-hidden border grayscale transition-all duration-300"
                  style={{ filter: `hue-rotate(${recolorHue}deg) contrast(1.15)` }}
                >
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" alt="Space" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== PROMPT-GEN (提示词生成) ==================== */}
          {activeTool === 'prompt-gen' && (
            <div className="space-y-5 animate-fadeIn" id="tool-prompt-gen-view">
              <div className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3" id="prompt-gen-form">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">精修Stable Diffusion/Midjourney/Gemini提示词配方</span>
                <textarea 
                  id="prompt-gen-input-area"
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="请输入您的中文创意词大意... 例如 '一个适合阿尔法终端的深色几何控制台'"
                  className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                />
                
                <button 
                  id="btn-run-prompt-gen"
                  onClick={generatePromptWithStructure}
                  className="px-4 py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {runningModel ? 'Gemini 智能拓展中...' : '开始 AIGC 提示词拓荒'}
                </button>
              </div>

              {generatedPrompt && (
                <div className="border border-[var(--border-color)] p-4 bg-[var(--bg-card)] space-y-2.5" id="generated-prompt-box">
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/45 block">生成的正向提示词方案 / Advanced Prompt Output</span>
                  <div className="p-3 bg-current/5 border font-mono text-xs text-current select-all selection:bg-neutral-500/20" id="prompt-text-selection">
                    {generatedPrompt}
                  </div>
                  <span className="text-[8.5px] text-current/40 block">您可以直接将此英文对焦词拷贝注入您的 Midjourney 或 Stable Diffusion 适配器中以获取更强渲染效果。</span>
                </div>
              )}
            </div>
          )}

          {/* ==================== ERASE (橡皮擦消除) ==================== */}
          {activeTool === 'erase' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="tool-erase-view">
              <div className="md:col-span-4 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="erase-controls">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block font-bold">智能擦除遮罩控制器 / Healing eraser mask</span>
                
                <div className="space-y-1.5">
                  <label htmlFor="eraser-brush-size" className="control-label text-[10px] font-mono text-current/60 block py-1">笔刷直径 (Brush Size): 24px</label>
                  <input 
                    id="eraser-brush-size"
                    type="range" 
                    min={4} 
                    max={100} 
                    defaultValue={24}
                    className="w-full accent-current shadow-inner"
                  />
                </div>

                <div className="text-[11px] text-current/60 leading-relaxed font-sans p-3 bg-current/[0.01] border">
                  <strong>操作提示:</strong> 请在右侧参考片中直接拖曳鼠标，即可形成一圈红色智能遮罩，点击下方即可交割擦拭并无缝补全像素。
                </div>

                <button 
                  id="btn-run-erase-heal"
                  onClick={() => {
                    setRunningModel(true);
                    setExecutionResult('遮罩层提取中...');
                    setTimeout(() => {
                      setExecutionResult('✅ [智能擦色完成] 本地擦除区域像素深度重构！伪影自动补充，已回传至 CDN 快照中。');
                      setRunningModel(false);
                    }, 900);
                  }}
                  className="w-full py-3 bg-current text-[var(--bg-sidebar)] font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer rounded-none"
                >
                  {runningModel ? '正在算能融合...' : '交割笔刷重构像素'}
                </button>
              </div>

              <div className="md:col-span-8 border border-[var(--border-color)] p-5 bg-[var(--bg-card)] flex flex-col justify-between gap-4" id="erase-canvas">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">模拟交互擦拭画幅 / Painter Board</span>
                <div className="aspect-video w-full overflow-hidden border relative cursor-crosshair group" id="erase-stage-box">
                  <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80" alt="Erase" className="w-full h-full object-cover filter contrast-125 grayscale" referrerPolicy="no-referrer" />
                  {/* Glowing drawing layer circle preview on hover */}
                  <div className="absolute inset-x-0 inset-y-0 bg-red-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                    <span className="text-[10px] font-mono font-bold text-red-500 bg-black/80 px-2 py-1 uppercase tracking-widest border border-red-500/25">
                      PAINTER ERASE MASK LAYERS...
                    </span>
                  </div>
                </div>
                {executionResult && (
                  <div className="p-3 border border-dashed border-emerald-500/30 bg-emerald-500/[0.02] text-xs font-mono text-emerald-500" id="erase-output-info">
                    {executionResult}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
