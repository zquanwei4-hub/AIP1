import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Shield, Sparkles, Send, HelpCircle, ArrowRight } from 'lucide-react';

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "您好，欢迎使用 **AIP 自动策略投研顾问终端。** 我是您的专属链上定期定额投资和风险资产配置助手。\n\n您可以随时向我咨询关于 **定期买入 (DCA)**、**智能极低滑点交割**、**跨链组合分配权重** 或 **DAO 治理改进提案 (AIP-001/002)**。我将融合最新量化风控理论，为您研判方案配方与纠偏因子。",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "Smart Rebalancing volatility calculation", label: "自适应抗跌大额加码算法" },
    { text: "Explain AIP-001 Proposal core specs", label: "AIP-001 对冲对决设计标准" },
    { text: "Optimize Portfolio Weights on volatile markets", label: "波段振荡周期内的资金加权建议" },
  ];

  // Auto-scroll logic
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSendMessage(promptText: string) {
    if (!promptText.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-6).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Server proxy request
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, history: chatHistory }),
      });

      const data = await response.json();

      const assistantMsg: Message = {
        role: 'model',
        content: data.text || "⚠️ 远端解算异常: 无法为您提取 AI 套利大模型输出，请检查后台环境常数关联。",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const assistantMsg: Message = {
        role: 'model',
        content: "💡 **[量化常态离线模拟激活]**\n\n您可校验应用根目录下的 `.env.example`，并将正确的 `GEMINI_API_KEY` 环境变量配置写入运行环境以唤起真实的在线大模型互动。当前状态下，我们推荐本金配比设定为: 40% BTC, 35% ETH, 15% SOL, 10% 稳定冷仓，以平抑主网短时冲击。",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div id="ai-advisor-panel" className="space-y-8 font-sans max-w-4xl mx-auto">
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-6 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            AI 智能策略投研顾问 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ CO-PILOT EXPERT</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            提供由 Google Gemini 高性能人工智能技术支持的定投风险平衡咨询与资产敞口改良测算。
          </p>
        </div>
        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block select-none">
          INTELLIGENT KERNEL
        </span>
      </div>

      {/* Main chat viewport */}
      <div className="grid grid-cols-1 gap-6 animate-fadeIn" id="copilot-grid-layout">
        <div 
          id="copilot-scroller-viewport"
          className="h-[420px] overflow-y-auto border border-[var(--border-color)] p-5 bg-[var(--bg-card)] space-y-6 text-xs leading-relaxed"
        >
          {messages.map((msg, index) => (
            <div 
              key={index} 
              id={`message-bubble-wrapper-${index}`}
              className={`flex flex-col max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              {/* Message Meta */}
              <span className="text-[9px] font-mono opacity-40 mb-1.5" id={`msg-metadata-${index}`}>
                {msg.role === 'user' ? 'CLIENT REQUEST / 用户提问' : 'AIP DECISION NODE / 顾问决断'} ● {msg.timestamp}
              </span>

              {/* Message Box */}
              <div 
                id={`msg-content-container-${index}`}
                className={`p-4 border text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'border-current bg-current text-[var(--bg-sidebar)] font-medium rounded-none'
                    : 'border-[var(--border-color)] bg-[var(--bg-subcard)] text-current rounded-none'
                }`}
              >
                <div className="font-sans selection:bg-neutral-500/20">{msg.content}</div>
              </div>
            </div>
          ))}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start max-w-[80%] space-y-2" id="thinking-indicator">
              <span className="text-[9px] font-mono opacity-30">AI Strategy Core is calculating matrix...</span>
              <div className="px-4 py-3 bg-[var(--bg-subcard)] border border-[var(--border-color)] flex items-center gap-1.5" id="glowing-thinking-dots">
                <span className="w-1.5 h-1.5 bg-current animate-bounce" />
                <span className="w-1.5 h-1.5 bg-current animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-current animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          <div ref={chatScrollRef} />
        </div>

        {/* Suggested Chips Panel */}
        <div className="space-y-2.5" id="quick-prompt-suggestions">
          <span className="text-[10px] text-current/40 uppercase font-mono tracking-wider font-bold block">
            快速咨询常见方案 / Quick Query Tips
          </span>
          <div className="flex flex-wrap gap-2" id="prompt-chips">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                id={`btn-quick-prompt-chip-${idx}`}
                onClick={() => handleSendMessage(chip.text)}
                className="px-3.5 py-2 border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-current text-[11px] font-sans transition-all text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>{chip.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Text Area form entry */}
        <form 
          id="copilot-message-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMsg);
          }}
          className="relative flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden focus-within:border-current transition-all"
        >
          <input
            id="input-copilot"
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="以此提问关于底层多签机制、对冲阻抗参数及投资权重改良建议..."
            className="w-full px-4 py-4 bg-transparent border-none text-[12px] text-current outline-none placeholder:text-current/35 font-sans"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2" id="entry-tools-container">
            <button
              id="submit-copilot-msg-btn"
              type="submit"
              disabled={!inputMsg.trim() || isLoading}
              className="px-4 py-2 border border-current text-[10px] font-mono tracking-wider uppercase bg-current text-[var(--bg-sidebar)] hover:opacity-90 disabled:opacity-30 transition-all cursor-pointer font-bold"
            >
              发送 Ask
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
