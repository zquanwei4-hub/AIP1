import React, { useState, useMemo } from 'react';
import { Client, ImageItem, DesignAsset, AdapterConfig, ContentBlock, HistoryLog } from '../types';
import { initialClients, initialImages, initialAssets, initialAdapters, initialContents, initialHistory, docsPages } from '../data';
import { 
  Briefcase, Users, Image as ImageIcon, LineChart, Layout, Share2, FileCode, Clock, PlayCircle, 
  Sparkles, DollarSign, BarChart2, Radio, Search, FileText, Settings, Sliders, FileSpreadsheet, 
  MessageSquare, Hash, HelpCircle, ArrowLeft, Plus, Check, ShieldAlert, ChevronRight, RefreshCw, Trash2
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  // Admin internal routing
  const [adminPage, setAdminPage] = useState<string>('today');
  const [selectedClientId, setSelectedClientId] = useState<string>('cl-1');
  const [selectedAdapterSlug, setSelectedAdapterSlug] = useState<string>('stable-diffusion-webui');
  const [selectedDocSlug, setSelectedDocSlug] = useState<string>('system-intro');

  // Dynamic state stores
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [assets, setAssets] = useState<DesignAsset[]>(initialAssets);
  const [adapters, setAdapters] = useState<AdapterConfig[]>(initialAdapters);
  const [contents, setContents] = useState<ContentBlock[]>(initialContents);
  const [logs, setLogs] = useState<HistoryLog[]>(initialHistory);

  // Filter text state for Global Search page
  const [globalQuery, setGlobalQuery] = useState('');

  // Local Form states
  const [newClientName, setNewClientName] = useState('');
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientBrief, setNewClientBrief] = useState('');

  const [newImageName, setNewImageName] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadedTag, setUploadedTag] = useState('');

  const [workspaceElements, setWorkspaceElements] = useState<{id: string, name: string, type: string, size: string}[]>([
    { id: 'we-1', name: 'Master Header Panel', type: 'Header', size: 'w-full h-12 border-b' },
    { id: 'we-2', name: 'Ambient Vector Canvas', type: 'Canvas', size: 'w-full h-64 border bg-[var(--bg-subcard)]' }
  ]);
  const [workspacePadding, setWorkspacePadding] = useState<number>(16);

  const [newShareName, setNewShareName] = useState('');
  const [newShareExpiry, setNewShareExpiry] = useState('2026-06-30');

  const [tasksToday, setTasksToday] = useState([
    { id: 't-1', text: '阿尔法项目视觉方案导出：拉高3.5%饱和度', done: false, priority: 'High' },
    { id: 't-2', text: '检测ComfyUI适配器可用通道及底层缓存', done: true, priority: 'Med' },
    { id: 't-3', text: '去噪贴图模型图层多线程合并测试', done: false, priority: 'High' },
    { id: 't-4', text: '审核最新 AIGC 提示字生成器模板 presets', done: false, priority: 'Low' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState<{id: string, author: string, content: string, date: string}[]>([
    { id: 'cmt-1', author: 'zquanwei4@gmail.com', content: 'Figma 适配器怎么无法获取样式？', date: '10:14 PM' },
    { id: 'cmt-2', author: 'AI 投研顾问', content: '请在 Settings 终端校验您的 Figma 开发者令牌权限，系统当前显示连接由于API秘钥出错导致异常断开。', date: '10:18 PM' }
  ]);

  const [earnings, setEarnings] = useState<{id: string, client: string, amount: number, date: string, status: string}[]>([
    { id: 'e-1', client: '阿尔法先进智造', amount: 128000, date: '2026-05-18', status: 'Paid' },
    { id: 'e-2', client: '西风赛博出行', amount: 85200, date: '2026-06-01', status: 'Pending' }
  ]);
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<string>('');

  // Advanced analysis result reports
  const [analysisReport, setAnalysisReport] = useState<string>('暂未计算。点击上方“生成分析报告”以获取评估数据。');
  const [analyzing, setAnalyzing] = useState(false);

  // Search Results computed properties
  const globalSearchResults = useMemo(() => {
    if (!globalQuery.trim()) return [];
    const query = globalQuery.toLowerCase();
    
    const matchedClients = clients.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.company.toLowerCase().includes(query) || 
      c.brief.toLowerCase().includes(query)
    ).map(c => ({ id: c.id, label: `客户: ${c.name} (${c.company})`, page: 'clients', action: () => { setSelectedClientId(c.id); setAdminPage('client-detail'); } }));

    const matchedImages = images.filter(i => 
      i.name.toLowerCase().includes(query) || 
      i.tags.some(t => t.toLowerCase().includes(query))
    ).map(i => ({ id: i.id, label: `图床图片: ${i.name}`, page: 'imgbed', action: () => setAdminPage('imgbed') }));

    const matchedAssets = assets.filter(a => 
      a.name.toLowerCase().includes(query) || 
      a.type.toLowerCase().includes(query)
    ).map(a => ({ id: a.id, label: `资产: ${a.name} [${a.type}]`, page: 'assets', action: () => setAdminPage('assets') }));

    return [...matchedClients, ...matchedImages, ...matchedAssets];
  }, [globalQuery, clients, images, assets]);

  // Handle addition functions
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasksToday([...tasksToday, {
      id: `t-${Date.now()}`,
      text: newTaskText,
      done: false,
      priority: 'High'
    }]);
    setNewTaskText('');
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newClientCompany.trim()) return;
    const newCl: Client = {
      id: `cl-${clients.length + 1}`,
      name: newClientName,
      company: newClientCompany,
      email: `${newClientCompany.toLowerCase().replace(/\s+/g, '')}@designops.io`,
      phone: "+86 133-XXXX-XXXX",
      status: 'Active',
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
      revenue: 0,
      projectsCount: 0,
      brief: newClientBrief || '新创建的客户档案。',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setClients([...clients, newCl]);
    setNewClientName('');
    setNewClientCompany('');
    setNewClientBrief('');
    setSelectedClientId(newCl.id);
    setAdminPage('client-detail');
  };

  const handleImageUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageName.trim() || !newImageUrl.trim()) return;
    const newImg: ImageItem = {
      id: `img-${images.length + 1}`,
      name: newImageName,
      url: newImageUrl,
      size: "420 KB",
      resolution: "1024 x 1024",
      mimeType: "image/jpeg",
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tags: uploadedTag ? uploadedTag.split(',').map(t => t.trim()) : ["Custom"]
    };
    setImages([newImg, ...images]);
    setNewImageName('');
    setNewImageUrl('');
    setUploadedTag('');
  };

  const handleSimulateLog = () => {
    const actions = [
      "环境贴图超级缩放 (2x) 激活",
      "Style-Genome: 导入调色盘规格完成",
      "DAO Presets: 更新默认 CSS 网格密度为 24px",
      "账户结算: 确认接收阿尔法先进智造第一笔托管预付金"
    ];
    const targetAction = actions[Math.floor(Math.random() * actions.length)];
    const newLog: HistoryLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString().replace(/\//g, '-'),
      operator: "zquanwei4@gmail.com",
      action: targetAction,
      module: "Simulated Backend Trigger",
      status: "success",
      payloadSize: "4 KB"
    };
    setLogs([newLog, ...logs]);
  };

  const clientDetail = clients.find(c => c.id === selectedClientId) || clients[0];
  const adapterDetail = adapters.find(a => a.slug === selectedAdapterSlug) || adapters[0];
  const docDetail = docsPages.find(d => d.slug === selectedDocSlug) || docsPages[0];

  // System menu sidebar lists
  const sidebarGroups = [
    {
      title: "DAILY 工作",
      items: [
        { id: 'today', label: '今日工作 / Tasks', icon: Briefcase },
        { id: 'dashboard', label: '核心仪表盘 / Dashboard', icon: LineChart },
        { id: 'search', label: '全局快速搜索 / Search', icon: Search }
      ]
    },
    {
      title: "CLIENTS & SHARES",
      items: [
        { id: 'clients', label: '客户管理 / Clients', icon: Users },
        { id: 'share', label: '外发分享管理 / Shares', icon: Share2 },
        { id: 'income', label: '收入账目审计 / Ledger', icon: DollarSign },
        { id: 'discuss', label: '团队议事共识 / Forum', icon: MessageSquare }
      ]
    },
    {
      title: "CREATIVE 生产力",
      items: [
        { id: 'workspace', label: '智能设计工作台 / Workspace', icon: Layout },
        { id: 'playground', label: '沙盒拟合游乐场 / Sandbox', icon: PlayCircle },
        { id: 'moodboard', label: '风格灵感板 / Moodboard', icon: ImageIcon },
        { id: 'style-genome', label: '色彩风格基因 / Style Genome', icon: Hash }
      ]
    },
    {
      title: "OPS 运营中心",
      items: [
        { id: 'imgbed', label: '高带宽公共图床 / ImgBed', icon: ImageIcon },
        { id: 'assets', label: '团队核心资产库 / Assets', icon: FileCode },
        { id: 'history', label: '全局变更志 / Action Logs', icon: Clock },
        { id: 'analytics', label: '多源分析及导入 / Analytics', icon: BarChart2 },
        { id: 'adapters', label: '外部生成适配器 / Adapters', icon: Radio },
        { id: 'presets', label: '样式预设配方 / Presets', icon: Sliders },
        { id: 'analysis', label: '战略分析简报 / Strategic', icon: FileText },
        { id: 'docs', label: '内置协议说明书 / Manual', icon: FileText },
        { id: 'settings', label: '控制台全局设定 / Config', icon: Settings }
      ]
    }
  ];

  return (
    <div id="admin-routes-core" className="min-h-[600px] grid grid-cols-1 lg:grid-cols-12 border border-[var(--border-color)] bg-[var(--bg-card)]">
      
      {/* SIDEBAR NAVIGATION GRID */}
      <aside className="lg:col-span-3 border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] flex flex-col justify-between" id="admin-sidemenu">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase flex items-center gap-1">
                ● INTERNAL ADMIN MODE
              </span>
              <span className="text-[8px] font-mono opacity-50 mt-1">DESIGN-AI-OPS MASTER</span>
            </div>
            <button 
              id="back-to-topology-btn"
              onClick={onBack}
              className="px-2 py-1 border border-current text-[9px] hover:bg-current/5 transition-all cursor-pointer font-bold uppercase tracking-wider"
            >
              返回拓扑
            </button>
          </div>

          <div className="space-y-5 h-[380px] overflow-y-auto pr-1 select-none scrollbar-thin">
            {sidebarGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5" id={`sidebar-group-${gIdx}`}>
                <span className="text-[8.5px] font-mono font-bold tracking-wider text-current/40 block px-2">
                  {group.title}
                </span>
                <nav className="space-y-0.5" id={`sidebar-subnav-${gIdx}`}>
                  {group.items.map((item) => {
                    const isActive = adminPage === item.id || (item.id === 'clients' && adminPage === 'client-detail') || (item.id === 'adapters' && adminPage === 'adapter-detail') || (item.id === 'docs' && adminPage === 'doc-detail');
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`sidebar-link-${item.id}`}
                        onClick={() => setAdminPage(item.id)}
                        className={`w-full text-left px-2.5 py-1.5 text-[10.5px] font-sans flex items-center gap-2 transition-all rounded-none border border-transparent ${
                          isActive 
                            ? 'bg-current text-[var(--bg-sidebar)] font-bold' 
                            : 'text-current/60 hover:text-current hover:bg-current/[0.03]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 opacity-80" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Console Operator Profile Badge */}
        <div className="p-4 border-t border-[var(--border-color)] bg-current/[0.01] flex items-center gap-2.5" id="admin-operator-footer">
          <div className="w-6 h-6 rounded-full border border-current/20 bg-current/5 flex items-center justify-center font-display text-[9px] text-current font-bold">
            QW
          </div>
          <div className="flex flex-col">
            <span className="text-[9.5px] font-bold text-current leading-tight">zquanwei4@gmail.com</span>
            <span className="text-[8px] font-mono opacity-40 uppercase tracking-widest mt-0.5">Primary Architect</span>
          </div>
        </div>
      </aside>

      {/* COMPONENT BODY AREA */}
      <section className="lg:col-span-9 p-6 overflow-y-auto max-h-[660px]" id="admin-viewscreen">
        
        {/* ==================== TODAY VIEW ==================== */}
        {adminPage === 'today' && (
          <div className="space-y-5 animate-fadeIn" id="admin-today-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[01] TODAY / 今日工作协同</h3>
              <p className="text-[11px] text-current/50 mt-1">跟踪和分配智能设计管线内的即时协作、校对和去噪贴图进度。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="today-brief-metrics">
              <div className="border border-[var(--border-color)] p-3 space-y-1 bg-[var(--bg-subcard)]">
                <span className="text-[9px] font-mono opacity-40 block uppercase">DCA Pipeline Streak</span>
                <span className="text-xl font-bold text-current">28 天连续递增</span>
              </div>
              <div className="border border-[var(--border-color)] p-3 space-y-1 bg-[var(--bg-subcard)]">
                <span className="text-[9px] font-mono opacity-40 block uppercase">Remaining Tasks Today</span>
                <span className="text-xl font-bold text-current">
                  {tasksToday.filter(t => !t.done).length} 项待处理
                </span>
              </div>
              <div className="border border-[var(--border-color)] p-3 space-y-1 bg-[var(--bg-subcard)]">
                <span className="text-[9px] font-mono opacity-40 block uppercase">Core System Stability</span>
                <span className="text-xl font-bold text-emerald-500 font-mono">100.0% SECURE</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <form onSubmit={handleAddTask} className="flex gap-2" id="task-entry-form">
                <input 
                  id="task-input-field"
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="追加高优协作项... (如：'阿尔法控制台饱和度再升1%')"
                  className="flex-1 px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                />
                <button 
                  id="btn-add-today-task"
                  type="submit" 
                  className="px-4 py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
                >
                  添加 Task
                </button>
              </form>

              <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]" id="tasks-list">
                {tasksToday.map((task) => (
                  <div key={task.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-current/[0.01]" id={`task-row-${task.id}`}>
                    <div className="flex items-center gap-3">
                      <button 
                        id={`btn-toggle-task-${task.id}`}
                        onClick={() => {
                          setTasksToday(tasksToday.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
                        }}
                        className={`w-4.5 h-4.5 border flex items-center justify-center cursor-pointer transition-all ${
                          task.done ? 'border-current bg-current text-[var(--bg-sidebar)]' : 'border-current/30 hover:border-current'
                        }`}
                      >
                        {task.done && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <span className={`transition-all ${task.done ? 'line-through opacity-40' : 'text-current font-medium'}`}>
                        {task.text}
                      </span>
                    </div>
                    <span className={`px-1.5 py-0.5 text-[8.5px] font-mono uppercase ${
                      task.priority === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-current/5 text-current/65'
                    }`}>
                      {task.priority || 'Normal'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== DASHBOARD VIEW ==================== */}
        {adminPage === 'dashboard' && (
          <div className="space-y-5 animate-fadeIn" id="admin-dashboard-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[02] DASHBOARD / 系统运行中枢</h3>
              <p className="text-[11px] text-current/50 mt-1">全局性能指标、流量归算及算力排程监视面板。</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" id="dashboard-metric-bento">
              <div className="border border-[var(--border-color)] p-4 space-y-1">
                <span className="text-[9px] font-mono text-current/40 block">今日活跃适配器 / Active</span>
                <span className="text-2xl font-bold">2 / 3 Connected</span>
              </div>
              <div className="border border-[var(--border-color)] p-4 space-y-1">
                <span className="text-[9px] font-mono text-current/40 block">托管总资产估值 / Equity</span>
                <span className="text-2xl font-bold font-mono">¥468,200</span>
              </div>
              <div className="border border-[var(--border-color)] p-4 space-y-1">
                <span className="text-[9px] font-mono text-current/40 block">托管图床图片 / Images</span>
                <span className="text-2xl font-bold font-mono">{images.length} 张</span>
              </div>
              <div className="border border-[var(--border-color)] p-4 space-y-1">
                <span className="text-[9px] font-mono text-current/40 block">API 总调用延迟 / Latency</span>
                <span className="text-2xl font-bold font-mono text-amber-500">165 ms</span>
              </div>
            </div>

            <div className="border border-[var(--border-color)] p-5 space-y-3" id="dashboard-chart-section">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">30天设计资源流出量模拟趋势图 (AIGC Pipeline Downloads)</span>
              {/* Custom SVG line-chart fit */}
              <div className="h-44 w-full flex items-end gap-1.5 pt-4">
                {[10, 15, 8, 22, 34, 45, 60, 52, 48, 70, 85, 90, 82, 95, 110, 95, 115, 130, 125, 148, 160, 142, 175, 180, 162, 190, 210, 201, 230, 245].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      style={{ height: `${(val / 260) * 110}px` }} 
                      className="w-full bg-current opacity-25 hover:opacity-100 transition-all cursor-pointer"
                      title={`第 ${idx+1} 天: ${val} 次调用`}
                    />
                    {idx % 5 === 0 && (
                      <span className="text-[8px] font-mono opacity-40">{idx+1}d</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== GLOBAL SEARCH VIEW ==================== */}
        {adminPage === 'search' && (
          <div className="space-y-5 animate-fadeIn" id="admin-search-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[03] GLOBAL SEARCH / 面板全局模糊检索</h3>
              <p className="text-[11px] text-current/50 mt-1">检索系统内的所有客户文件、托管图片资产标识符以及配色主题基因。</p>
            </div>

            <div className="space-y-4">
              <input 
                id="global-query-input"
                type="text"
                value={globalQuery}
                aria-label="请输入客户、图床资产名或样式标识符进行检索..."
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="键入关键字搜寻... (例如 '阿尔法'、'png'、'Clay' 或 'Palette')"
                className="w-full px-4 py-3 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
              />

              {globalQuery.trim() ? (
                <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]" id="search-matches">
                  {globalSearchResults.length > 0 ? (
                    globalSearchResults.map((res) => (
                      <button
                        key={res.id}
                        id={`search-result-btn-${res.id}`}
                        onClick={res.action}
                        className="w-full text-left p-3 text-xs font-sans hover:bg-current/[0.02] flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-current font-medium">{res.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-55" />
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs opacity-40" id="search-no-results">
                      未发现可匹配的记录标识，支持智能容错纠正，建议尝试减少约束条件。
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-dashed border-[var(--border-color)] p-12 text-center text-xs opacity-50 space-y-2" id="search-idle-fallback">
                  <p>准备就绪，欢迎以此单点索引调取本系统21个控制面板内的全量对象。</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== CLIENTS LIST VIEW ==================== */}
        {adminPage === 'clients' && (
          <div className="space-y-5 animate-fadeIn" id="admin-clients-page">
            <div className="border-b border-[var(--border-color)] pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[04] CLIENTS / 客户信息名录</h3>
                <p className="text-[11px] text-current/50 mt-1">配置多方合作机构，调控设计合约款项分配及需求方案草案。</p>
              </div>
            </div>

            {/* Quick Creation Form */}
            <form onSubmit={handleAddClient} className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3" id="client-create-form">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">开辟全新合作客户档案 (Create Client)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  id="client-name-input"
                  type="text" 
                  value={newClientName} 
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="项目客户对接负责人"
                  className="px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                />
                <input 
                  id="client-company-input"
                  type="text" 
                  value={newClientCompany} 
                  onChange={(e) => setNewClientCompany(e.target.value)}
                  placeholder="客户协作企业全名"
                  className="px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                />
              </div>
              <textarea 
                id="client-brief-textarea"
                value={newClientBrief}
                onChange={(e) => setNewClientBrief(e.target.value)}
                placeholder="客户专项设计及算法接入需求描述..."
                rows={2}
                className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
              />
              <button 
                id="btn-save-new-client"
                type="submit" 
                className="px-4 py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
              >
                新建并锁定客户
              </button>
            </form>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="clients-card-grid">
              {clients.map((cli) => (
                <div key={cli.id} className="border border-[var(--border-color)] p-4 flex flex-col justify-between hover:border-current/30 transition-all bg-[var(--bg-card)] gap-4" id={`client-card-${cli.id}`}>
                  <div className="flex items-start gap-3">
                    <img src={cli.avatar} alt={cli.name} className="w-10 h-10 object-cover border border-current/10" referrerPolicy="no-referrer" />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-semibold block">{cli.status}</span>
                      <h4 className="text-xs font-bold text-current">{cli.name}</h4>
                      <p className="text-[10px] text-current/50 font-mono">{cli.company}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-current/60 line-clamp-2 leading-relaxed">
                    {cli.brief}
                  </p>
                  <div className="border-t border-[var(--border-color)] pt-3 flex items-center justify-between text-[10px] font-mono" id={`client-card-meta-${cli.id}`}>
                    <span className="opacity-50">合同额: ¥{cli.revenue.toLocaleString()}</span>
                    <button
                      id={`client-detail-drilldown-btn-${cli.id}`}
                      onClick={() => { setSelectedClientId(cli.id); setAdminPage('client-detail'); }}
                      className="px-2 py-1 border border-current hover:bg-current/5 text-[9px] font-bold tracking-widest cursor-pointer"
                    >
                      微观透视 CLIENT DETAILS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== CLIENT DETAIL SUBPAGE ==================== */}
        {adminPage === 'client-detail' && (
          <div className="space-y-5 animate-fadeIn" id="admin-client-detail-drilldown">
            <button 
              id="back-to-clients-catalog-btn"
              onClick={() => setAdminPage('clients')}
              className="text-xs text-current/60 hover:text-current flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回客户名录 / Back to Client Roster</span>
            </button>

            <div className="border border-[var(--border-color)] p-5 space-y-4 bg-[var(--bg-subcard)]">
              <div className="flex items-center gap-4">
                <img src={clientDetail.avatar} alt={clientDetail.name} className="w-14 h-14 object-cover border" referrerPolicy="no-referrer" />
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 bg-current/5 text-[10px] font-mono text-current">ID: {clientDetail.id}</span>
                  <h3 className="text-sm font-bold text-current">{clientDetail.name}</h3>
                  <p className="text-xs text-current/50">{clientDetail.company} ● {clientDetail.email}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-current/40 uppercase block">设计协作大纲 / Designer Project Brief</span>
                <p className="text-xs text-current/80 leading-relaxed bg-[var(--bg-card)] p-4 border block whitespace-pre-wrap">
                  {clientDetail.brief}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-[var(--border-color)]" id="client-internal-stats">
                <div>
                  <span className="text-[9px] font-mono text-current/40 block">项目累积 / Done</span>
                  <span className="text-sm font-bold text-current">{clientDetail.projectsCount} 项</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-current/40 block">往来款 / Total Revenue</span>
                  <span className="text-sm font-bold text-current">¥{clientDetail.revenue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-current/40 block">合作期 / Joined Since</span>
                  <span className="text-sm font-bold text-current font-mono">{clientDetail.joinedDate}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-current/40 block">服务等级 / Sla Level</span>
                  <span className="text-sm font-bold text-emerald-500 uppercase">HIGH VIP</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== IMGBED (IMAGE BED) ==================== */}
        {adminPage === 'imgbed' && (
          <div className="space-y-5 animate-fadeIn" id="admin-imgbed-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[05] IMGBED / 多维智能高带宽存储图床</h3>
              <p className="text-[11px] text-current/50 mt-1">本地拖拽上传、智能格式收敛适配、大类别去燥输出及 CDN 加速宿主库。</p>
            </div>

            {/* Quick Upload drop simulator */}
            <form onSubmit={handleImageUpload} className="border border-dashed border-current/30 p-6 text-center space-y-4" id="imgbed-uploader-panel">
              <div className="space-y-1">
                <span className="text-xs text-current font-bold block">拖曳或双击上传矢量贴图/概念渲染片</span>
                <span className="text-[10px] text-current/40 block">支持 PNG, JPEG, WEBP, SVG 以及 COM WORKSPACE 素材块</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                <input 
                  id="img-name-field"
                  type="text" 
                  value={newImageName} 
                  onChange={(e) => setNewImageName(e.target.value)}
                  placeholder="请输入图片名称 (例如 abstract_layout.png)"
                  className="px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                />
                <input 
                  id="img-url-field"
                  type="text" 
                  value={newImageUrl} 
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="网络图片 URL 地址 (供模拟拉取)"
                  className="px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                />
              </div>
              <input 
                id="img-tag-field"
                type="text" 
                value={uploadedTag} 
                onChange={(e) => setUploadedTag(e.target.value)}
                placeholder="标签分类，以逗号分隔 (如 'Layout, Clay, Swiss')"
                className="w-full max-w-xl px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
              />
              <button 
                id="btn-upload-image-to-bed"
                type="submit" 
                className="px-5 py-2.5 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
              >
                交割上传并应用 CDN
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="imgbed-renders-grid">
              {images.map((img) => (
                <div key={img.id} className="border border-[var(--border-color)] p-3 space-y-3 bg-[var(--bg-subcard)] hover:border-current/30 transition-all rounded-none" id={`imgbed-photo-card-${img.id}`}>
                  <div className="aspect-square w-full overflow-hidden border">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-current truncate leading-none">{img.name}</h5>
                    <p className="text-[9px] text-current/40 font-mono">尺寸: {img.resolution} ● 容量: {img.size}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {img.tags.map((tg, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 bg-current/5 border border-current/10 text-[8.5px] font-mono text-current/60 uppercase">
                        {tg}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between" id={`imgbed-actions-${img.id}`}>
                    <span className="text-[8px] font-mono text-current/40">{img.uploadDate}</span>
                    <button
                      id={`btn-optimize-image-bed-${img.id}`}
                      onClick={() => alert(`[智能收缩] 已成功为该图片应用 AIGC 去噪与压缩算法，加载延时缩短了 32%。`)}
                      className="px-2 py-1 bg-current text-[var(--bg-sidebar)] text-[8.5px] font-bold font-sans uppercase rounded-none hover:opacity-90 cursor-pointer"
                    >
                      AI 去噪优化
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== WORKSPACE (DESIGNER CANVAS) ==================== */}
        {adminPage === 'workspace' && (
          <div className="space-y-5 animate-fadeIn" id="admin-workspace-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[06] WORKSPACE / 物理创意智能绘图工作台</h3>
              <p className="text-[11px] text-current/50 mt-1">控制布局极简常数、自适应间距，实时添加组件并向客户预览展示成果。</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="workspace-interactive-editor">
              <div className="lg:col-span-1 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-4" id="workspace-controls-sidebar">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">图形及间距调优参数 / Grid Params</span>
                
                <div className="space-y-1.5">
                  <label htmlFor="spacing-slider" className="text-[10px] font-mono text-current/60 block py-1.5">元素边距 (Padding): {workspacePadding}px</label>
                  <input 
                    id="spacing-slider"
                    type="range" 
                    min={4} 
                    max={48} 
                    value={workspacePadding} 
                    onChange={(e) => setWorkspacePadding(Number(e.target.value))}
                    className="w-full accent-current"
                  />
                </div>

                <div className="space-y-1.5 pt-3 border-t border-[var(--border-color)]">
                  <span className="text-[9.5px] font-bold text-current">快速引入布局微组件:</span>
                  <div className="grid grid-cols-1 gap-1" id="widgets-insertion-btns">
                    {['AIP Brand Card', '3-Column Grid Block', 'Interactive Terminal Badge', 'Geometric Hero Vector'].map((wName) => (
                      <button
                        key={wName}
                        id={`btn-add-layout-${wName.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => {
                          setWorkspaceElements([...workspaceElements, {
                            id: `we-${Date.now()}`,
                            name: wName,
                            type: 'Element',
                            size: 'w-full h-16 border bg-current/5'
                          }]);
                        }}
                        className="w-full text-left p-1.5 text-[9.5px] font-sans border border-current/15 hover:border-current cursor-pointer text-current/80 hover:text-current transition-all"
                      >
                        + 引入 {wName}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  id="btn-clear-workspace"
                  onClick={() => setWorkspaceElements([])}
                  className="w-full py-2 border border-red-500/30 text-red-500 bg-red-400/5 text-[9px] font-bold font-mono tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all cursor-pointer rounded-none"
                >
                  清空工作台
                </button>
              </div>

              {/* Central Mock Canvas Visualizer */}
              <div className="lg:col-span-3 border border-[var(--border-color)] p-6 bg-[var(--bg-card)] flex flex-col gap-4 relative" id="workspace-main-board">
                <div className="text-[9px] font-mono text-current/40 uppercase tracking-widest absolute top-2 right-4">
                  [ SIMULATED DEVICE STAGE ]
                </div>

                <div 
                  className="border border-current/10 flex-1 min-h-[300px] flex flex-col gap-3 transition-all duration-300 relative overflow-hidden"
                  style={{ padding: `${workspacePadding}px` }}
                  id="workspace-paint-board"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#80808020_0.8px,transparent_0.8px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {workspaceElements.length > 0 ? (
                    workspaceElements.map((el) => (
                      <div 
                        key={el.id} 
                        id={`workspace-rect-${el.id}`}
                        className={`p-3 relative group transition-all flex items-center justify-between ${el.size}`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-mono text-current/40 uppercase tracking-widest block leading-none">{el.type}</span>
                          <span className="text-[10px] font-bold tracking-tight text-current">{el.name}</span>
                        </div>
                        <button
                          id={`btn-delete-layout-el-${el.id}`}
                          onClick={() => setWorkspaceElements(workspaceElements.filter(x => x.id !== el.id))}
                          className="opacity-0 group-hover:opacity-100 p-1 bg-red-500 text-white rounded-none transition-all cursor-pointer hover:scale-105"
                          title="移除"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-12" id="workspace-empty-stage">
                      <Layout className="w-8 h-8 opacity-40 mb-2" />
                      <p className="text-[11px] font-sans">绘图画布处于初始未激活常态。请使用左侧微调面板引入 AIGC 网格微组件。</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SHARE (SHARING CONTROL) ==================== */}
        {adminPage === 'share' && (
          <div className="space-y-5 animate-fadeIn" id="admin-shares-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[07] SHARES / 外部交付通道及有效性控制</h3>
              <p className="text-[11px] text-current/50 mt-1">生成带有过期机制的高阶协作共享安全秘钥链接，提供外协客户多向回执。</p>
            </div>

            <form 
              id="share-creation-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!newShareName.trim()) return;
                alert(`[成功生成外链] 校验共享网关正常已开通！共享标识: s/${Date.now().toString().substring(6)}。有效交割日期至 ${newShareExpiry} 12:00 UTC。`);
                setNewShareName('');
              }}
              className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3"
            >
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">定制全新的交付共享链接 (Generate Security Link)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  id="share-name-input"
                  type="text" 
                  value={newShareName} 
                  onChange={(e) => setNewShareName(e.target.value)}
                  placeholder="项目成果名称或是客户标签 (如 'Alpha-v2-Review')"
                  className="px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                />
                <input 
                  id="share-expiry-input"
                  type="date" 
                  value={newShareExpiry} 
                  onChange={(e) => setNewShareExpiry(e.target.value)}
                  className="px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                />
              </div>
              <button 
                id="btn-save-new-share-link"
                type="submit" 
                className="px-4 py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
              >
                生成加密链接 GENERATE SHARED URL
              </button>
            </form>

            <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]" id="shares-table">
              <div className="bg-current/[0.02] p-3 text-[10px] font-mono tracking-wider font-bold text-current/40 grid grid-cols-12 gap-2" id="shares-table-header">
                <div className="col-span-4">交付成果名称 / Item</div>
                <div className="col-span-3">临时外发地址 / Shared Router</div>
                <div className="col-span-3">有效期 / Expiration</div>
                <div className="col-span-2 text-right">状态 / Status</div>
              </div>
              <div className="p-3 text-xs grid grid-cols-12 gap-2 items-center hover:bg-current/[0.01]" id="share-row-1">
                <div className="col-span-4 font-bold text-current">阿尔法半导体缺陷视觉草案 v1</div>
                <div className="col-span-3 font-mono text-[10px] text-current/60 selection:bg-neutral-500/15">s/alpha-v1-review</div>
                <div className="col-span-3 text-current/60 font-mono text-[11px]">2026-06-30</div>
                <div className="col-span-2 text-right">
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8.5px] font-mono uppercase">Active</span>
                </div>
              </div>
              <div className="p-3 text-xs grid grid-cols-12 gap-2 items-center hover:bg-current/[0.01]" id="share-row-2">
                <div className="col-span-4 font-bold text-current">西风Cyber出行高精状态舱3D贴图</div>
                <div className="col-span-3 font-mono text-[10px] text-current/60 selection:bg-neutral-500/15">s/zephyr-texture-set</div>
                <div className="col-span-3 text-current/60 font-mono text-[11px]">2026-06-15</div>
                <div className="col-span-2 text-right">
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8.5px] font-mono uppercase">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ASSETS ==================== */}
        {adminPage === 'assets' && (
          <div className="space-y-5 animate-fadeIn" id="admin-assets-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[08] ASSETS / 团队核心数字资产库</h3>
              <p className="text-[11px] text-current/50 mt-1">存储协作体系内的所有系统样式JSON tokens、特定字体包、颜色方案及预设规则。</p>
            </div>

            <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]" id="assets-table-list">
              <div className="bg-current/[0.02] p-3 text-[10px] font-mono tracking-wider font-bold text-current/40 grid grid-cols-12 gap-2" id="assets-list-header">
                <div className="col-span-4">资产名称 / File Name</div>
                <div className="col-span-2">类型 / Format</div>
                <div className="col-span-2">大小 / Size</div>
                <div className="col-span-2">创建人 / Creator</div>
                <div className="col-span-2 text-right">调用频次 / Hits</div>
              </div>
              {assets.map((ast) => (
                <div key={ast.id} className="p-3 text-xs grid grid-cols-12 gap-2 items-center hover:bg-current/[0.01]" id={`asset-row-${ast.id}`}>
                  <div className="col-span-4 font-bold text-current">
                    {ast.name}
                    <span className="block text-[8.5px] font-mono opacity-40 font-normal mt-0.5">{ast.previewUrl}</span>
                  </div>
                  <div className="col-span-2 font-mono text-[10px] uppercase text-current/60">{ast.type}</div>
                  <div className="col-span-2 text-current/60 font-mono text-[11px]">{ast.size}</div>
                  <div className="col-span-2 text-current/60">{ast.creator}</div>
                  <div className="col-span-2 text-right font-mono text-[11px] text-current">{ast.downloadCount} 次</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ACTION LOGS HISTORY ==================== */}
        {adminPage === 'history' && (
          <div className="space-y-5 animate-fadeIn" id="admin-history-logs-page">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[09] HISTORY / 系统层日志变更记录</h3>
                <p className="text-[11px] text-current/50 mt-1">跟踪算力引擎及多端操作者向系统存储做出的参数下拔轨迹。</p>
              </div>
              <button 
                id="btn-simulate-history-log"
                onClick={handleSimulateLog}
                className="px-3 py-1.5 border border-current text-[10px] font-mono font-bold tracking-widest hover:bg-current/5 cursor-pointer uppercase flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>模拟生成底层变动日志</span>
              </button>
            </div>

            <div className="border border-[var(--border-color)] font-mono text-[10.5px] bg-[#09090B] text-[#f4f4f5] divide-y divide-[#27272a] p-4" id="cli-terminal-logs-panel">
              <div className="text-emerald-400 font-bold mb-3 uppercase tracking-widest">[ SYSTEM DIAGNOSTIC CORE SYNCED ]</div>
              <div className="space-y-2 h-[260px] overflow-y-auto pr-1" id="terminal-scroller">
                {logs.map((log) => (
                  <div key={log.id} className="leading-relaxed hover:bg-white/5 p-1 transition-all" id={`terminal-raw-log-${log.id}`}>
                    <span className="text-amber-400 font-bold">[{log.timestamp}]</span>
                    <span className="text-blue-300 ml-1">({log.module})</span>
                    <span className="text-[#a1a1aa] ml-2">[{log.operator}]</span>
                    <span className="text-[#f4f4f5] ml-2 font-sans">{log.action}</span>
                    <span className="text-emerald-500 float-right font-bold">SUCCESS {log.payloadSize || ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== PLAYGROUND (SANDBOX) ==================== */}
        {adminPage === 'playground' && (
          <div className="space-y-5 animate-fadeIn" id="admin-playground-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[10] PLAYGROUND / 创意样式动态调优沙盒</h3>
              <p className="text-[11px] text-current/50 mt-1">零代码调试物理圆角过渡、字距拉伸、网格比例并导出 CSS 样式基因变量组。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="playground-bento">
              {/* Sliders panel */}
              <div className="border border-[var(--border-color)] p-4 space-y-4 bg-[var(--bg-subcard)]" id="playground-sliders">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">布局骨架常数 / Skeleton Params</span>
                
                <div className="space-y-1">
                  <label htmlFor="p-rounded" className="control-label text-[10px] font-mono text-current/60 block">1. 视窗卡片圆角 (Radius): {workspacePadding}px</label>
                  <input 
                    id="p-rounded"
                    type="range" 
                    min={0} 
                    max={24} 
                    value={workspacePadding} 
                    onChange={(e) => setWorkspacePadding(Number(e.target.value))}
                    className="w-full accent-current shadow-inner"
                  />
                </div>
              </div>

              {/* Dynamic Preview panel */}
              <div className="border border-[var(--border-color)] p-5 md:col-span-2 flex flex-col justify-between min-h-[300px] relative bg-[var(--bg-card)]" id="playground-preview-board">
                <div className="text-[9px] font-mono text-current/40 uppercase tracking-widest self-end">
                  [ HIGH-FIDELITY PREVIEW CARD ]
                </div>

                <div 
                  className="p-8 border border-current/25 bg-[var(--bg-subcard)] transition-all duration-300 self-center w-full max-w-md select-none shadow-sm flex flex-col gap-3"
                  style={{ borderRadius: `${workspacePadding}px` }}
                  id="playground-mockup-card"
                >
                  <h4 className="text-sm font-bold uppercase tracking-widest text-current leading-none">A AIP DESIGN PROTOCOL</h4>
                  <p className="text-xs text-current/60 leading-relaxed font-sans mt-1">
                    当前圆角尺寸设定为 {workspacePadding}px。此设定对于高端商务暗仓系统提供完美平滑收卷度。
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-current text-[var(--bg-sidebar)] text-[9px] font-mono rounded-none font-bold">EXCELLENCY ACTIVE</span>
                    <span className="px-2 py-1 bg-current/10 text-current text-[9px] font-mono rounded-none">SWISS MODERN</span>
                  </div>
                </div>

                <div className="space-y-1 pt-4 border-t border-[var(--border-color)]">
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">生成的 CSS 属性样式参数 / Dynamic Styles Exports</span>
                  <code className="text-[10px] font-mono font-bold text-current block truncate animate-pulse bg-current/5 p-2 selection:bg-neutral-500/20">
                    border-radius: {workspacePadding}px; padding: 2rem; border-color: rgba(0,0,0,0.15); transition: cubic-bezier(0.16,1,0.3,1);
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== MOODBOARD ==================== */}
        {adminPage === 'moodboard' && (
          <div className="space-y-5 animate-fadeIn" id="admin-moodboard-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[11] MOODBOARD / 品牌多维灵感拼贴画卷</h3>
              <p className="text-[11px] text-current/50 mt-1">汇聚精巧无缝纹理、多向灰度概念图与传统墨绘艺术意境卡。</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" id="moodboard-masonry-gallery">
              <div className="border border-[var(--border-color)] p-2 space-y-2 bg-[var(--bg-subcard)] hover:scale-101 transition-all" id="mood-tile-1">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" alt="Space Abstract" className="w-full object-cover filter contrast-125" referrerPolicy="no-referrer" />
                <span className="text-[9px] font-mono text-current/50 block">#SpaceNoir Ambient</span>
              </div>
              <div className="border border-[var(--border-color)] p-2 space-y-2 bg-[var(--bg-subcard)] hover:scale-101 transition-all" id="mood-tile-2">
                <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80" alt="Modular Composition" className="w-full object-cover" referrerPolicy="no-referrer" />
                <span className="text-[9px] font-mono text-current/50 block">#SwissComposition Minimal</span>
              </div>
              <div className="border border-[var(--border-color)] p-2 space-y-2 bg-[var(--bg-subcard)] hover:scale-101 transition-all" id="mood-tile-3">
                <img src="https://images.unsplash.com/photo-1618005124978-c1122cf282f6?auto=format&fit=crop&w=400&q=80" alt="Clay Render" className="w-full object-cover filter grayscale" referrerPolicy="no-referrer" />
                <span className="text-[9px] font-mono text-current/50 block">#OrganicClay matte</span>
              </div>
              <div className="border border-[var(--border-color)] p-2 space-y-2 bg-[var(--bg-subcard)] hover:scale-101 transition-all" id="mood-tile-4">
                <div className="aspect-square bg-gradient-to-br from-neutral-900 to-black border p-4 flex flex-col justify-between" id="gradient-card">
                  <span className="text-[9px] font-mono text-white/50 block">Gradation Specimen</span>
                  <p className="text-xs text-white font-bold tracking-wide">Obsidian Noir #060608</p>
                </div>
                <span className="text-[9px] font-mono text-current/50 block">#ObsidianDark Slate</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== INCOME / LEDGER AUDIT ==================== */}
        {adminPage === 'income' && (
          <div className="space-y-5 animate-fadeIn" id="admin-income-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[12] INCOME / 财务款项及交割明细审计</h3>
              <p className="text-[11px] text-current/50 mt-1">记录往来定存账款，生成标准化设计托管账款电子发票。</p>
            </div>

            <form 
              id="invoice-creation-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!newInvoiceAmount.trim() || isNaN(Number(newInvoiceAmount))) return;
                alert(`[发票生成成功] 关联客户：${clientDetail.name}，交付账款金额 ¥${Number(newInvoiceAmount).toLocaleString()} 已确认上报！`);
                setNewInvoiceAmount('');
              }}
              className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3"
            >
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">拉存并生成客户专用电子发票 (Emit Invoice)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="invoice-client-select" className="text-[9px] text-current/40 uppercase block font-mono">选择关联项目客户</label>
                  <select 
                    id="invoice-client-select"
                    value={selectedClientId} 
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="invoice-amount-input" className="text-[9px] text-current/40 uppercase block font-mono">款项金额 (¥)</label>
                  <input 
                    id="invoice-amount-input"
                    type="text" 
                    value={newInvoiceAmount} 
                    onChange={(e) => setNewInvoiceAmount(e.target.value)}
                    placeholder="例如: 85200"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                  />
                </div>
              </div>
              <button 
                id="btn-submit-invoice-form"
                type="submit" 
                className="px-4 py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
              >
                生成并分发该发票券
              </button>
            </form>

            <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]" id="ledger-earnings-table">
              <div className="bg-current/[0.02] p-3 text-[10px] font-mono tracking-wider font-bold text-current/40 grid grid-cols-12 gap-2" id="ledger-header">
                <div className="col-span-4">相关客户全称 / Debtor</div>
                <div className="col-span-3">出款日期 / Emission Date</div>
                <div className="col-span-3">款额 / Amount</div>
                <div className="col-span-2 text-right">结算标志 / State</div>
              </div>
              {earnings.map((ear) => (
                <div key={ear.id} className="p-3 text-xs grid grid-cols-12 gap-2 items-center hover:bg-current/[0.01]" id={`earning-row-${ear.id}`}>
                  <div className="col-span-4 font-bold text-current">{ear.client}</div>
                  <div className="col-span-3 text-current/60 font-mono text-[11px]">{ear.date}</div>
                  <div className="col-span-3 text-current font-bold font-mono">¥{ear.amount.toLocaleString()}</div>
                  <div className="col-span-2 text-right">
                    <span className={`px-1.5 py-0.5 text-[8.5px] font-mono uppercase ${
                      ear.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {ear.status === 'Paid' ? 'PAID' : 'PENDING'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ANALYTICS & DATA IMPORT ==================== */}
        {adminPage === 'analytics' && (
          <div className="space-y-5 animate-fadeIn" id="admin-analytics-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[13] ANALYTICS / 动态统计与外部 JSON/CSV 数据导入</h3>
              <p className="text-[11px] text-current/50 mt-1">导入外设 csv/json 文本配方资产，秒级重画系统 AIGC 产量曲线。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="analytics-grid">
              <div className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3" id="import-data-box">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">导入外部格式数据 (Import CSV/JSON)</span>
                <textarea 
                  id="data-import-textarea"
                  rows={6}
                  placeholder='[{"day": 1, "ops": 12}, {"day": 2, "ops": 30}] 或 csv 列表'
                  className="w-full px-3 py-2 border border-[var(--border-color)] text-[10px] font-mono bg-[var(--bg-card)] outline-none text-current"
                />
                <button 
                  id="btn-import-analytics-data"
                  onClick={() => alert(`[CSV/JSON 解析成功] 导入了 4 组外部排程常数，正在更新系统控制面板折线精度...`)}
                  className="w-full py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
                >
                  解析并重组核心资产
                </button>
              </div>

              {/* System summary display */}
              <div className="border border-[var(--border-color)] p-5 md:col-span-2 space-y-4 bg-[var(--bg-card)]" id="analyzed-summary">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40">多链算力负荷及折算综合大类 / Composite Analytics Summary</span>
                <div className="space-y-3" id="composite-progress-indicators">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Stable Diffusion 适配器利用负载 / SD Loader</span>
                      <span className="font-mono font-bold">82%</span>
                    </div>
                    <div className="w-full h-1 bg-current/10 overflow-hidden">
                      <div className="h-full bg-current w-[82%]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Midjourney 队列拥堵比值 / Discord Buffer</span>
                      <span className="font-mono font-bold">34%</span>
                    </div>
                    <div className="w-full h-1 bg-current/10 overflow-hidden">
                      <div className="h-full bg-current w-[34%]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>图床高负载状态占比 / CDN Load factor</span>
                      <span className="font-mono font-bold">45%</span>
                    </div>
                    <div className="w-full h-1 bg-current/10 overflow-hidden">
                      <div className="h-full bg-current w-[45%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ADAPTERS CATALOG & DETAIL ==================== */}
        {adminPage === 'adapters' && (
          <div className="space-y-5 animate-fadeIn" id="admin-adapters-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[14] ADAPTERS / 外部 AIGC 模型多签适配器</h3>
              <p className="text-[11px] text-current/50 mt-1">校验外接 Stable Diffusion WebUI、Midjourney 及 Figma 同步流常数状态。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="adapters-cards-panel">
              {adapters.map((adp) => (
                <button
                  key={adp.slug}
                  id={`btn-select-adapter-${adp.slug}`}
                  onClick={() => { setSelectedAdapterSlug(adp.slug); setAdminPage('adapter-detail'); }}
                  className="text-left border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] hover:border-current transition-all flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-current/40 uppercase">{adp.provider}</span>
                      <span className={`w-2 h-2 rounded-full ${adp.status === 'connected' ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                    </div>
                    <h4 className="text-xs font-bold text-current">{adp.name}</h4>
                  </div>
                  <div className="border-t border-[var(--border-color)] pt-3 flex items-center justify-between text-[9px] font-mono" id={`adapter-btn-meta-${adp.slug}`}>
                    <span>延迟: {adp.latency}ms</span>
                    <span className="underline">参数调配 PARAM DETAILS</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ADAPTER DETAIL DRILLDOWN ==================== */}
        {adminPage === 'adapter-detail' && (
          <div className="space-y-5 animate-fadeIn" id="admin-adapter-detail-page">
            <button 
              id="back-to-adapters-btn"
              onClick={() => setAdminPage('adapters')}
              className="text-xs text-current/60 hover:text-current flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回适配器列表 / Back to Adapters</span>
            </button>

            <div className="border border-[var(--border-color)] p-5 space-y-4 bg-[var(--bg-subcard)]">
              <div className="flex items-center justify-between border-b pb-3" id="adapter-detail-header-row">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-current/50 uppercase">{adapterDetail.provider}</span>
                  <h3 className="text-sm font-bold text-current">{adapterDetail.name}</h3>
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-mono uppercase ${
                  adapterDetail.status === 'connected' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {adapterDetail.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3" id="adapter-props-spec">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-current/40 uppercase block">API Endpoint 宿主路由</span>
                  <code className="text-xs text-current font-mono bg-[var(--bg-card)] p-2.5 border block truncate selection:bg-neutral-500/15">
                    {adapterDetail.apiEndpoint}
                  </code>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-current/40 uppercase block">加密配对私钥 / API key credentials</span>
                  <input 
                    id="adapter-key-input"
                    type="password" 
                    value={adapterDetail.apiKeyMasked} 
                    disabled 
                    className="w-full text-xs text-current font-mono bg-[var(--bg-card)] p-2.5 border outline-none cursor-not-allowed"
                  />
                  <span className="text-[8.5px] text-current/40 block">该秘钥已基于 AES-256 全周期安全物理加密（禁止明文输出）。</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[var(--border-color)] text-[10.5px]" id="adapter-usage-stats">
                <div>
                  <span className="text-[9px] font-mono text-current/40 block">当前调用延时 / Node Latency</span>
                  <span className="text-sm font-bold font-mono text-current">{adapterDetail.latency} ms</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-current/40 block">累计交割图像数 / Completed Generation Hits</span>
                  <span className="text-sm font-bold font-mono text-current">{adapterDetail.usageCount} 次生成</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== CONTENTS FEED ==================== */}
        {adminPage === 'contents' && (
          <div className="space-y-5 animate-fadeIn" id="admin-contents-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[15] CONTENTS / 设计团队业务公告文案管理</h3>
              <p className="text-[11px] text-current/50 mt-1">管理内部研发公告、需求微修改文录以及对外发布的风格标准。</p>
            </div>

            <div className="space-y-4" id="contents-blocks">
              {contents.map((cnt) => (
                <div key={cnt.id} className="border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3" id={`content-row-box-${cnt.id}`}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-current">{cnt.title}</h4>
                    <span className="px-1.5 py-0.5 bg-current/5 text-[9px] font-mono uppercase text-current/60">
                      {cnt.category}
                    </span>
                  </div>
                  <p className="text-xs text-current/70 leading-relaxed font-sans">{cnt.body}</p>
                  <div className="border-t border-[var(--border-color)] pt-2.5 flex items-center justify-between text-[9px] font-mono" id={`content-meta-${cnt.id}`}>
                    <span className="opacity-45">起草人: {cnt.author}</span>
                    <button 
                      id={`btn-archive-content-${cnt.id}`}
                      onClick={() => alert(`[公告归档] 成功将文案标识 ${cnt.id} 从活跃渲染看板移除。`)}
                      className="px-2 py-0.5 border border-current hover:bg-current/5 font-bold cursor-pointer font-sans text-[8.5px] uppercase"
                    >
                      存档并下线
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== PRESETS DESIGN TOKENS ==================== */}
        {adminPage === 'presets' && (
          <div className="space-y-5 animate-fadeIn" id="admin-presets-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[16] PRESETS / AIGC 创意样式预设模板</h3>
              <p className="text-[11px] text-current/50 mt-1">管理和锁定一键风格对齐的底料样式方案（如纯净白阁、无尽暗盒等）。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="presets-bento">
              {['Swiss Modernist pure', 'High-Contrast Cyber Obsidian', 'Organic Clay Minimal', 'Nordic Alabaster Warmth'].map((prsName) => (
                <div key={prsName} className="border border-[var(--border-color)] p-4 space-y-3 hover:border-current transition-all bg-[var(--bg-subcard)]" id={`preset-card-${prsName.replace(/\s+/g, '-').toLowerCase()}`}>
                  <h4 className="text-xs font-bold text-current">{prsName} Spec</h4>
                  <p className="text-[11px] text-current/50 leading-relaxed">
                    定义完美的 CSS 局部参数配方。配置包含高对比度字字配对、1.618 黄金几何间距比以及防短时冲击微圆角设计。
                  </p>
                  <div className="flex gap-2">
                    <button
                      id={`btn-apply-preset-${prsName.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => alert(`[应用样式配方] 成功载入预设：[${prsName}]。画布边间距与调色谱已自动更新兼容！`)}
                      className="px-3 py-1.5 bg-current text-[var(--bg-sidebar)] text-[9px] font-sans font-bold uppercase rounded-none hover:opacity-90 cursor-pointer"
                    >
                      应用该 CSS 配方
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== STRATEGIC ANALYSIS REPORT ==================== */}
        {adminPage === 'analysis' && (
          <div className="space-y-5 animate-fadeIn" id="admin-analysis-page">
            <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[17] ANALYSIS / 创意及算力战略分析简报</h3>
                <p className="text-[11px] text-current/50 mt-1">自动审计当前所有的客户、图床占用与适配器时延，产出量化决策报告。</p>
              </div>
              <button 
                id="btn-trigger-analysis-report"
                onClick={() => {
                  setAnalyzing(true);
                  setAnalysisReport("计算引擎正常工作中，校验拓扑深度关联关系...");
                  setTimeout(() => {
                    setAnalysisReport(`### [DESIGN-AI-OPS STRATEGIC REPORT]
报告生成时间: 2026-06-09 10:51 (UTC)

**1. 资产高负载诊断:**
当前高带宽图床 CDN 状态健康，共有 ${images.length} 张核心影像宿主，月累计算力负荷节流 34.5%。

**2. 适配器调用时延排行:**
*   Stable Diffusion Adapter: ${adapters[0].latency}ms (Connected / 超高效)
*   Midjourney Sync Node: ${adapters[1].latency}ms (Connected / 普通拥塞)
*   Figma Global Sync: 0ms (Disconnected / 秘钥验证失效)

**3. 优化与整顿建议:**
由于 Figma Sync Webhook 当前离线断开，系统已自动限制局部样式更新的发布权限，防止破坏设计基因。建议重新检测 settings 并锁定 Figma 安全 Key。`);
                    setAnalyzing(false);
                  }, 1200);
                }}
                className="px-4 py-2 bg-current text-[var(--bg-sidebar)] text-xs font-sans font-bold tracking-widest hover:opacity-90 transition-all cursor-pointer uppercase flex items-center gap-1.5"
              >
                {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>一键生成战略分析报告 GEN REPORT</span>}
              </button>
            </div>

            <div className="border border-[var(--border-color)] p-5 bg-[var(--bg-subcard)] whitespace-pre-wrap text-xs text-current font-mono leading-relaxed" id="report-view-content">
              {analysisReport}
            </div>
          </div>
        )}

        {/* ==================== DISCUSSION FORUM ==================== */}
        {adminPage === 'discuss' && (
          <div className="space-y-5 animate-fadeIn" id="admin-discuss-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[18] DISCUSS / 局域设计协作议事共识讨论区</h3>
              <p className="text-[11px] text-current/50 mt-1">团队研发人员或 AI 顾问针对特定配色或适配器阻塞问题展开微观辩解。</p>
            </div>

            <div className="space-y-4">
              <div className="border border-[var(--border-color)] p-4 bg-[var(--bg-card)] max-w-xl mx-auto space-y-3" id="discuss-post-form">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">发表协作议事纪要 / Publish Message</span>
                <div className="grid grid-cols-1 gap-2">
                  <input
                    id="discuss-author-input"
                    type="text"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    placeholder="请输入发言者邮箱 (例如 developer@designops.ai)"
                    className="px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                  />
                  <textarea
                    id="discuss-comment-textarea"
                    rows={3}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="键入核心讨论提案。涉及 Figma 样式、DCA定存或者 ComfyUI 参数常数的优化说明..."
                    className="px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                  />
                  <button
                    id="btn-submit-discuss-comment"
                    onClick={() => {
                      if (!newCommentAuthor.trim() || !newCommentText.trim()) return;
                      setComments([...comments, {
                        id: `cmt-${Date.now()}`,
                        author: newCommentAuthor,
                        content: newCommentText,
                        date: 'Just Now'
                      }]);
                      setNewCommentAuthor('');
                      setNewCommentText('');
                    }}
                    className="px-4 py-2 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-sans text-xs font-bold uppercase cursor-pointer"
                  >
                    提交该共识笔记
                  </button>
                </div>
              </div>

              <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]" id="comments-timeline">
                {comments.map((cmt) => (
                  <div key={cmt.id} className="p-4 space-y-2 hover:bg-current/[0.01]" id={`comment-bubble-${cmt.id}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-current">{cmt.author}</span>
                      <span className="text-[9px] font-mono opacity-40">{cmt.date}</span>
                    </div>
                    <p className="text-xs text-current/75 leading-relaxed">{cmt.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== STYLE GENOME ANALYZER ==================== */}
        {adminPage === 'style-genome' && (
          <div className="space-y-5 animate-fadeIn" id="admin-style-genome-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[19] STYLE GENOME / AIGC 色彩与几何对齐基因提取器</h3>
              <p className="text-[11px] text-current/50 mt-1">自动识别目标客户图片的明暗比值、色彩覆盖广度，提取色值代词组作为开发基因。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="genome-layout">
              <div className="border border-[var(--border-color)] p-4 space-y-3 bg-[var(--bg-subcard)]" id="genome-selectors">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block font-bold">请选择待提取分析的灵感原片</span>
                <div className="grid grid-cols-2 gap-2" id="genome-image-select-options">
                  {images.map((img) => (
                    <button
                      key={img.id}
                      id={`btn-select-genome-img-${img.id}`}
                      onClick={() => alert(`[基因提纯] 针对 ${img.name} 的色彩光谱分析：
提取色值: #0D0E11, #F1F3F5, #7A28CB, #150050
对比度 compliance 评级: AAA
建议布局圆角常数: 12px`)}
                      className="border p-2 bg-[var(--bg-card)] hover:border-current text-left flex flex-col gap-1.5 cursor-pointer"
                    >
                      <img src={img.url} alt={img.name} className="w-full h-12 object-cover" referrerPolicy="no-referrer" />
                      <span className="text-[8px] font-mono text-current/60 truncate block">{img.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-[var(--border-color)] p-5 space-y-4 bg-[var(--bg-card)]" id="extracted-genome-result">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">当前激活的品牌样式基因信息 / Active DNA Spec</span>
                <div className="space-y-3" id="active-dna-visuals">
                  <div className="flex items-center gap-2" id="active-colors-swatch">
                    <span className="w-5 h-5 bg-[#FAFAFA] border block" title="#FAFAFA" />
                    <span className="w-5 h-5 bg-[#1C1917] border block" title="#1C1917" />
                    <span className="w-5 h-5 bg-[#FA8A00] border block" title="#FA8A00" />
                    <span className="w-5 h-5 bg-[#00E5BC] border block" title="#00E5BC" />
                    <span className="text-[10px] font-mono text-current/50">#FAFAFA | #1C1917 | #FA8A00 | #00E5BC</span>
                  </div>
                  <div className="text-[10.5px] text-current/60 leading-relaxed font-sans" id="style-genome-compliance">
                    <strong>几何对齐指标:</strong> 系统网格定长 16px，各多端视域均已适配 12px 自适应紧绷无缝圆角设定。对比度遵循 W3C 极安全范围要求。
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== INNER MANUAL & DOCUMENTATION ==================== */}
        {adminPage === 'docs' && (
          <div className="space-y-5 animate-fadeIn" id="admin-manual-docs-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[20] MANUAL / 内置设计交付契约与操作说明书</h3>
              <p className="text-[11px] text-current/50 mt-1">查阅 Design-AI-Ops 全谱组件路由规范、适配器配置常数定义指南。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="docs-routing-bento">
              <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)] md:col-span-1" id="docs-sidebar">
                {docsPages.map((doc) => (
                  <button
                    key={doc.slug}
                    id={`btn-select-doc-${doc.slug}`}
                    onClick={() => { setSelectedDocSlug(doc.slug); setAdminPage('doc-detail'); }}
                    className="w-full text-left p-3 text-xs font-sans hover:bg-current/[0.02] block cursor-pointer transition-all"
                  >
                    <span className="text-current font-bold block">{doc.title}</span>
                    <span className="text-[9.5px] text-current/50 mt-1 block truncate font-normal">{doc.brief}</span>
                  </button>
                ))}
              </div>

              <div className="border border-[var(--border-color)] p-5 md:col-span-2 bg-[var(--bg-subcard)] leading-relaxed text-xs text-current font-mono" id="docs-summary-preview">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block mb-3">使用说明建议 / Hints</span>
                <p>点击左侧文档大纲以在微观控制台内渲染出高格式说明。阅读这些指南有利于您理清 **Admin, AI Tools, Mobile** 这三大分支下的路由依存关系。</p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== DOCUMENTATION DRILLDOWN ==================== */}
        {adminPage === 'doc-detail' && (
          <div className="space-y-5 animate-fadeIn" id="admin-doc-drilldown-page">
            <button 
              id="back-to-docs-btn"
              onClick={() => setAdminPage('docs')}
              className="text-xs text-current/60 hover:text-current flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回系统操作说明书 / Back to Documentation</span>
            </button>

            <div className="border border-[var(--border-color)] p-6 bg-[var(--bg-subcard)] space-y-4" id="focused-doc-renderer">
              <div className="border-b border-[var(--border-color)] pb-3">
                <h3 className="text-sm font-bold text-current">{docDetail.title}</h3>
                <p className="text-xs text-current/50 mt-1 font-mono">{docDetail.brief}</p>
              </div>

              <div className="text-xs leading-relaxed text-current/80 whitespace-pre-wrap font-sans selection:bg-neutral-500/20" id="markdown-doc-container">
                {docDetail.content}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SYSTEM SETTINGS ==================== */}
        {adminPage === 'settings' && (
          <div className="space-y-5 animate-fadeIn" id="admin-settings-page">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="text-sm font-semibold tracking-wide text-current uppercase">[21] CONFIG / 控制台全局底层常数设定</h3>
              <p className="text-[11px] text-current/50 mt-1">修缮您的研发安全绑定、更换系统多签域证书及 Figma 监听端口号。</p>
            </div>

            <form 
              id="settings-metadata-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`[安全存储已落盘] 成功对平台系统元参数、安全防沙盒及局域网端口完成校验及重新编译！`);
              }}
              className="border border-[var(--border-color)] p-5 bg-[var(--bg-subcard)] space-y-4"
            >
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">底层编译及 API Tunnels 路由设定</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="settings-host" className="text-[9px] text-current/40 uppercase block font-mono">平台访问主页域名 (Custom Domain)</label>
                  <input 
                    id="settings-host"
                    type="text" 
                    defaultValue="https://design-ai-ops.cloud"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="settings-port" className="text-[9px] text-current/40 uppercase block font-mono">API Proxy 监听端口 (Auto Binding)</label>
                  <input 
                    id="settings-port"
                    type="text" 
                    defaultValue="3000" 
                    disabled
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-[var(--bg-card)] outline-none text-current opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-color)]">
                <button 
                  id="btn-save-control-settings"
                  type="submit" 
                  className="px-5 py-2.5 bg-current text-[var(--bg-sidebar)] hover:opacity-90 font-bold font-sans text-xs uppercase cursor-pointer"
                >
                  编译并保存当前常数
                </button>
              </div>
            </form>
          </div>
        )}

      </section>
    </div>
  );
}
