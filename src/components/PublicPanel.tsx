import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertCircle, RefreshCw, FileText, Check } from 'lucide-react';

interface PublicPanelProps {
  onBack: () => void;
}

export default function PublicPanel({ onBack }: PublicPanelProps) {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authHash, setAuthHash] = useState('');

  // Password strength checker computation
  const passwordStrength = regPass.length > 8 ? 'High' : regPass.length > 5 ? 'Med' : 'Low';

  const publicTabs = [
    { id: 'login', label: 'login (登录页)' },
    { id: 'register', label: 'register (注册页)' },
    { id: 'forgot-password', label: 'forgot-password (找回密码)' },
    { id: 'privacy', label: 'privacy (隐私政策)' },
    { id: 'terms', label: 'terms (服务条款)' },
    { id: '404', label: '404 (错误引导页)' }
  ];

  return (
    <div id="public-auth-panel-root" className="border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-6">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-5 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            公共及安全鉴权模块 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ PUBLIC & AUTH PORTAL</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            提供由 256 位物理对称式单向散列加密支持的鉴权、服务条款签署与 404 引导路由测试模型。
          </p>
        </div>
        <button 
          id="btn-return-topology-from-public"
          onClick={onBack}
          className="px-3 py-1.5 border border-current text-[10px] tracking-widest lowercase opacity-60 hover:opacity-100 hover:bg-current/5 transition-all cursor-pointer font-bold font-mono"
        >
          [ back to topology / 返回拓扑 ]
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="public-layout-grid">
        
        {/* Left selector sidebar */}
        <div className="lg:col-span-3 border border-[var(--border-color)] p-4 bg-[var(--bg-subcard)] space-y-3" id="public-tabs-nav">
          <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-current/40 block">鉴权与规则页切换器 / Select Gateway</span>
          <nav className="space-y-1" id="public-nav-list">
            {publicTabs.map((tab) => (
              <button
                key={tab.id}
                id={`btn-select-public-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAuthHash('');
                }}
                className={`w-full text-left px-3 py-2 text-[11px] font-sans transition-all border ${
                  activeTab === tab.id 
                    ? 'bg-current text-[var(--bg-sidebar)] border-current font-bold' 
                    : 'border-current/10 hover:border-current/30 text-current/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right main interactive form block */}
        <div className="lg:col-span-9 border border-[var(--border-color)] p-6 bg-[var(--bg-card)] min-h-[400px] flex items-center justify-center relative" id="public-display-stage">
          <div className="absolute top-2 right-4 text-[9px] font-mono text-current/30 uppercase">[ SIMULATED ROUTE PORTAL ]</div>

          {/* ==================== LOGIN ==================== */}
          {activeTab === 'login' && (
            <div className="w-full max-w-sm space-y-5 animate-fadeIn" id="auth-login-form">
              <div className="text-center space-y-1">
                <Lock className="w-6 h-6 mx-auto opacity-70" />
                <h3 className="text-sm font-bold uppercase tracking-widest">登录到 DESIGN-AI-OPS</h3>
                <p className="text-[10px] text-current/50">使用系统初始主控账号校验入驻权限。</p>
              </div>

              <form 
                id="form-login-core"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email.trim() || !password.trim()) return;
                  setLoading(true);
                  setTimeout(() => {
                    setAuthHash('0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''));
                    setLoading(false);
                  }, 900);
                }} 
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label htmlFor="login-email-input" className="text-[9px] text-current/40 uppercase block font-mono">1. 操作者邮箱 / Operator Email</label>
                  <input 
                    id="login-email-input"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="zquanwei4@gmail.com"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="login-password-input" className="text-[9px] text-current/40 uppercase block font-mono">2. 访问秘钥 / Access Token</label>
                  <input 
                    id="login-password-input"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入鉴权登录密码"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                    required
                  />
                </div>
                <button 
                  id="btn-submit-login"
                  type="submit" 
                  disabled={loading}
                  className="w-full py-2.5 bg-current text-[var(--bg-sidebar)] font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>验证并取得接入哈希验权</span>
                </button>
              </form>

              {authHash && (
                <div className="p-3 border border-dashed border-emerald-500/30 bg-emerald-500/[0.02] space-y-2" id="login-auth-success">
                  <span className="text-[9px] font-mono font-bold text-emerald-500 block uppercase">✓ AUTHENTICATION HAS BEEN DEPOSITED</span>
                  <p className="text-[10px] text-emerald-500/80 font-mono select-all break-all bg-emerald-500/5 p-2">
                    {authHash}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ==================== REGISTER ==================== */}
          {activeTab === 'register' && (
            <div className="w-full max-w-sm space-y-5 animate-fadeIn" id="auth-register-form">
              <div className="text-center space-y-1">
                <Shield className="w-6 h-6 mx-auto opacity-70" />
                <h3 className="text-sm font-bold uppercase tracking-widest">开端新契约账号 / Create Account</h3>
                <p className="text-[10px] text-current/50">自主组网并托管定制的算能缓存。</p>
              </div>

              <form 
                id="form-register-core"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (regPass !== regPassConfirm) {
                    alert('两次输入的口令密匙无法匹配，请校对。');
                    return;
                  }
                  alert(`[注册成功] 安全节点 ${regEmail} 开辟成功！请使用找回密码完成二次绑定。`);
                }} 
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label htmlFor="register-email-input" className="text-[9px] text-current/40 uppercase block font-mono">1. 操作者邮箱 / Register Email</label>
                  <input 
                    id="register-email-input"
                    type="email" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="输入协作主理人 Email"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="register-password-input" className="text-[9px] text-current/40 uppercase block font-mono">2. 设置密钥 / Password Key</label>
                  <input 
                    id="register-password-input"
                    type="password" 
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    placeholder="强密码 (8位以上英文及符号)"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                    required
                  />
                  {regPass && (
                    <div className="flex items-center justify-between text-[9px] font-mono" id="m-pw-strength">
                      <span>安全强度:</span>
                      <span className={passwordStrength === 'High' ? 'text-emerald-500 font-bold' : passwordStrength === 'Med' ? 'text-amber-500' : 'text-red-500'}>
                        {passwordStrength.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="register-password-confirm-input" className="text-[9px] text-current/40 uppercase block font-mono">3. 核对密钥 / Confirm Password</label>
                  <input 
                    id="register-password-confirm-input"
                    type="password" 
                    value={regPassConfirm}
                    onChange={(e) => setRegPassConfirm(e.target.value)}
                    placeholder="重复新口令"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                    required
                  />
                </div>
                <button 
                  id="btn-submit-register"
                  type="submit" 
                  className="w-full py-2.5 bg-current text-[var(--bg-sidebar)] font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                >
                  注册该主理人账户
                </button>
              </form>
            </div>
          )}

          {/* ==================== FORGOT-PASSWORD ==================== */}
          {activeTab === 'forgot-password' && (
            <div className="w-full max-w-sm space-y-5 animate-fadeIn" id="auth-forgot-form">
              <div className="text-center space-y-1">
                <AlertCircle className="w-6 h-6 mx-auto opacity-70" />
                <h3 className="text-sm font-bold uppercase tracking-widest">找回鉴权密钥 / Reset Key</h3>
                <p className="text-[10px] text-current/50">向已核验的操作者信箱发放单次对账验证链接。</p>
              </div>

              <form 
                id="form-forgot-core"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`[已分发邮件] 重置令牌已封包至信关，请在 zquanwei4@gmail.com 的收件箱查询重置说明。`);
                  setForgotEmail('');
                }} 
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label htmlFor="forgot-email-input" className="text-[9px] text-current/40 uppercase block font-mono">找回信箱 / Verified Email Address</label>
                  <input 
                    id="forgot-email-input"
                    type="email" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="zquanwei4@gmail.com"
                    className="w-full px-3 py-2 border border-[var(--border-color)] text-xs bg-transparent outline-none text-current"
                    required
                  />
                </div>
                <button 
                  id="btn-submit-forgot"
                  type="submit" 
                  className="w-full py-2.5 bg-current text-[var(--bg-sidebar)] font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                >
                  分发重放重置信件 TON ACCESS
                </button>
              </form>
            </div>
          )}

          {/* ==================== PRIVACY ==================== */}
          {activeTab === 'privacy' && (
            <div className="w-full max-w-xl space-y-4 animate-fadeIn" id="auth-privacy-policy">
              <div className="border-b pb-2">
                <h3 className="text-sm font-bold uppercase tracking-widest">DESIGN-AI-OPS 隐私保障准则 / Privacy Policy</h3>
                <span className="text-[9px] font-mono opacity-40">版本修订: 2026-06-09</span>
              </div>
              <div className="text-[10.5px] text-current/75 leading-relaxed space-y-2 h-[260px] overflow-y-auto pr-1" id="privacy-policy-scroller">
                <p><strong>[算能与隐私申明]</strong></p>
                <p>
                  1. 本控制系统严格支持<strong>脱机安全数据本地化</strong>。您的任何 Figma 样式变量、算力排程表格、客户基本背景皆通过物理端点进行局域处理，绝对杜绝未经多签核准的外流行为。
                </p>
                <p>
                  2. 外部 SD / Midjourney 适配器请求的 API 令牌基于 AES-256 私钥屏蔽隔离。
                </p>
                <p>
                  3. 当您勾选下方的同意条款，系统将开始向局域存储空间中写入必要的主控端 Session 哈希，该缓存具备 72 小时自衰变性质，超时物理销毁。
                </p>
              </div>

              <div className="pt-2 border-t flex items-center justify-between" id="m-privacy-action">
                <label className="flex items-center gap-2 text-xs text-current cursor-pointer select-none">
                  <input 
                    id="chk-agree-privacy"
                    type="checkbox" 
                    checked={agreedPrivacy} 
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="accent-current w-4 h-4" 
                  />
                  <span>我已知悉并确认遵守该隐私保障条款</span>
                </label>
              </div>
            </div>
          )}

          {/* ==================== TERMS ==================== */}
          {activeTab === 'terms' && (
            <div className="w-full max-w-xl space-y-4 animate-fadeIn" id="auth-terms-policy">
              <div className="border-b pb-2">
                <h3 className="text-sm font-bold uppercase tracking-widest">系统算力及许可执照契约书 / Terms of Service</h3>
                <span className="text-[9px] font-mono opacity-40">版本修订: 2026-06-09</span>
              </div>
              <div className="text-[10.5px] text-current/75 leading-relaxed space-y-2 h-[260px] overflow-y-auto pr-1" id="terms-policy-scroller">
                <p><strong>[托管执照许可规定]</strong></p>
                <p>
                  本平台执照契约受<strong>瑞士极简主义排版规范与 AIGC 物理合规法度</strong>管辖约束。任何接入本系统的设计师成员需无差别保证：
                </p>
                <p>
                  - 不得以不正当的多线程超分流量或者伪造节点攻击本地 ComfyUI 底层算力总线。
                </p>
                <p>
                  - 用于高带宽公共图床存储的图片必须符合版权合规审计，并经过本平台的 <code>Style-Genome</code> 色彩基因对齐方可入驻。
                </p>
                <p>
                  - 违反此规则会导致多签密钥被全域拉黑并在 404 自救引导器外限制浏览权限。
                </p>
              </div>
            </div>
          )}

          {/* ==================== 404 ==================== */}
          {activeTab === '404' && (
            <div className="w-full max-w-md text-center space-y-5 animate-fadeIn" id="auth-404-error">
              <div className="space-y-1">
                <span className="text-4xl font-light tracking-widest font-display text-current/80">404</span>
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-500">
                  ROUTE NOT FOUND / 拓扑断定此路由脱轨
                </h3>
                <p className="text-[10.5px] text-current/50 max-w-xs mx-auto">
                  该页面常数坐标当前处于算力纠偏池以外，或者是该分支适配器暂未激活多签寻址。
                </p>
              </div>

              {/* broken geometry modernist illustration */}
              <div className="w-24 h-24 mx-auto border border-current/25 flex items-center justify-center relative bg-current/5 hover:rotate-12 transition-all duration-500 rounded-none cursor-pointer" id="404-geo-illustration">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-2 right-2 animate-pulse" />
                <span className="font-mono text-[9px] opacity-40">DISRUPTED</span>
              </div>

              <div className="pt-2">
                <button
                  id="btn-return-home-404"
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2 border border-current text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-current/5 transition-all cursor-pointer"
                >
                  重回主鉴权大门
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
