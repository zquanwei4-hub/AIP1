import React, { useState } from 'react';
import { Proposal } from '../types';
import { Shield, Check, Filter } from 'lucide-react';

export default function GovernanceProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "AIP-001",
      title: "自适应重平衡流动性缓冲池协议 (Liquidity Buffer Pool)",
      category: 'core',
      status: 'passed',
      votesFor: 18450100,
      votesAgainst: 1240200,
      voted: true,
      author: "aip_architect_eth",
      description: "本提案旨在建立自适应对冲交易缓冲机制，用以缓解第三方机器人在定投扣款交割时产生的抢跑套利（Front-running）影响。此特性可减少由于主网拥堵导致的成交滑点摩擦，预计于弱市震荡谷底为用户挽回 30-45 个基点的隐藏无形资产磨损。"
    },
    {
      id: "AIP-002",
      title: "将高速 L2 执行矩阵集成至底层触发引擎 (L2 Execution Rails)",
      category: 'integration',
      status: 'active',
      votesFor: 12402100,
      votesAgainst: 8412900,
      voted: false,
      author: "chain_operator_l2",
      description: "将定投自动执行管线横向延展至低开销、高并发的以太坊扩容网络。底层触发器直接对接高性能去中心化中继，配合主流智能打包通道一并成交，允许用户以近乎零 Gas 摩擦的体验，自定义多重长周期资产轮动和积叠。"
    },
    {
      id: "AIP-003",
      title: "连续周期定投用户的国库返利加油补贴方案 (Treasury Gas rebate)",
      category: 'treasury',
      status: 'queued',
      votesFor: 0,
      votesAgainst: 0,
      voted: false,
      author: "treasury_steward",
      description: "计划由生态治理基金拨款对连续定投计划满 180 天以上的活跃地址提供专属 Gas 摩擦补贴。该补贴制度能够在协议交割层面减少长期守信代币积淀者的持仓负担，从而持续稳健地改善主网上行时的买盘流动性充沛性。"
    },
    {
      id: "AIP-004",
      title: "DAO 自治表决改用统一第 7 Epoch 投票制 (7-Day Epoch Window)",
      category: 'governance',
      status: 'passed',
      votesFor: 22410300,
      votesAgainst: 410200,
      voted: true,
      author: "governance_advocate",
      description: "标准化共识表决视察的时效边界。将所有投票窗口固定归口至 7 层的 Epoch 周期内，以确保来自不同司法辖区、具有重要权重的机构质押参与方和跨链多签节点能有妥帖宽裕的时间审定底层审计报告，避免突发链上拥堵错失共识。"
    }
  ]);

  const [selectedProposalId, setSelectedProposalId] = useState<string | null>("AIP-002");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'core' | 'governance' | 'treasury' | 'integration'>('all');
  const [votingNotice, setVotingNotice] = useState<string | null>(null);

  const filteredProposals = proposals.filter((prop) => {
    if (activeCategoryFilter === 'all') return true;
    return prop.category === activeCategoryFilter;
  });

  const selectedProposal = proposals.find(p => p.id === selectedProposalId);

  function handleVote(voteType: 'for' | 'against') {
    if (!selectedProposalId) return;

    let alreadyVoted = false;
    setProposals((prev) =>
      prev.map((prop) => {
        if (prop.id === selectedProposalId) {
          if (prop.voted) {
            alreadyVoted = true;
            return prop;
          }
          return {
            ...prop,
            voted: true,
            votesFor: voteType === 'for' ? prop.votesFor + 5000000 : prop.votesFor,
            votesAgainst: voteType === 'against' ? prop.votesAgainst + 5000000 : prop.votesAgainst,
          };
        }
        return prop;
      })
    );

    if (alreadyVoted) {
      setVotingNotice("签名验证错误: 您的 AIP 凭证已经参与过此修正案的表决。");
    } else {
      setVotingNotice(`投票共识已被系统链条接收: 在线增加 5,000,000 AIP 权重至 [${voteType === 'for' ? '赞成立场' : '反对立场'}]。`);
    }

    setTimeout(() => {
      setVotingNotice(null);
    }, 6000);
  }

  return (
    <div id="governance-proposal-panel" className="space-y-8 font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-6 gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-light tracking-[0.1em] text-current uppercase font-display leading-tight">
            共识决策大厅 <span className="font-sans font-normal text-xs opacity-50 lowercase">/ COMMUNITY CONSENSUS</span>
          </h2>
          <p className="text-xs text-current/50 max-w-xl">
            对自动定投逻辑、资产重平衡对冲缓冲器及多生态模块集成发起表决与提案审计。
          </p>
        </div>
        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block select-none">
          DAO SYNC INTERFACE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="gov-layout-grid">
        {/* Left Side: Index list with category filters */}
        <div className="lg:col-span-7 space-y-5" id="gov-list-side">
          {/* Minimalist filters row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4 text-xs">
            <span className="text-[10px] font-mono text-current/50 uppercase tracking-widest block">Core Classifiers</span>
            <div className="flex flex-wrap gap-1.5" id="filter-chips">
              {([
                { id: 'all', label: '全部' },
                { id: 'core', label: '核心技术' },
                { id: 'governance', label: '政治协商' },
                { id: 'treasury', label: '国库预算' },
                { id: 'integration', label: '跨链接口' }
              ] as const).map((catName) => (
                <button
                  key={catName.id}
                  id={`btn-filter-category-${catName.id}`}
                  onClick={() => setActiveCategoryFilter(catName.id)}
                  className={`px-3 py-1 text-[11px] border font-sans tracking-wide transition-all cursor-pointer ${
                    activeCategoryFilter === catName.id
                      ? 'border-current bg-current text-[var(--bg-sidebar)] font-medium'
                      : 'border-[var(--border-color)] text-current/50 hover:text-current hover:bg-current/5'
                  }`}
                >
                  {catName.label}
                </button>
              ))}
            </div>
          </div>

          {/* Render index lists */}
          <div className="space-y-4" id="proposals-list-container">
            {filteredProposals.map((proposal) => {
              const isActive = selectedProposalId === proposal.id;
              const totalVotes = proposal.votesFor + proposal.votesAgainst;
              const forRatio = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

              return (
                <div
                  key={proposal.id}
                  id={`proposal-card-row-${proposal.id}`}
                  onClick={() => setSelectedProposalId(proposal.id)}
                  className={`p-5 border transition-all duration-300 cursor-pointer select-none space-y-3 relative overflow-hidden group ${
                    isActive
                      ? 'bg-[var(--bg-card)] border-current/35'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-current/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-current/50">
                        <span className="font-bold text-current">{proposal.id}</span>
                        <span>•</span>
                        <span>
                          {proposal.category === 'core' ? 'CORE' : proposal.category === 'governance' ? 'GOV' : proposal.category === 'treasury' ? 'TREASURY' : 'CROSS-CHAIN'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm tracking-tight text-current leading-snug group-hover:text-current transition-colors">
                        {proposal.title}
                      </h4>
                    </div>

                    <span className={`inline-block px-1.5 py-0.5 border text-[8px] uppercase tracking-wider font-bold shrink-0 ${
                      proposal.status === 'passed'
                        ? 'border-emerald-500/10 text-emerald-500 bg-emerald-500/5'
                        : 'border-current/10 text-current/60 bg-current/5'
                    }`}>
                      {proposal.status === 'passed' ? '已达成共识' : proposal.status === 'active' ? '在线表决中' : '排期等待'}
                    </span>
                  </div>

                  <p className="text-xs text-current/55 line-clamp-2 leading-relaxed">
                    {proposal.description}
                  </p>

                  {/* Summary Bar */}
                  {totalVotes > 0 && (
                    <div className="space-y-1.5 font-mono text-[9px] pt-3 border-t border-[var(--border-color)]" id={`tally-row-${proposal.id}`}>
                      <div className="flex justify-between text-current/50">
                        <span>赞同权重 (Consensus Index):</span>
                        <span className="text-current font-bold">{forRatio.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-current/5 h-1 border border-current/[0.03]">
                        <div className="bg-current h-full" style={{ width: `${forRatio}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[9px] font-mono opacity-40 pt-1" id={`row-footer-${proposal.id}`}>
                    <span>Author: {proposal.author}</span>
                    {proposal.voted && <span className="text-emerald-500 font-bold">✓ 签名代币凭证已锁定录入</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: High-fidelity details & active Voting ballot */}
        <div className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 space-y-6" id="gov-ballot-side">
          {selectedProposal ? (
            <div className="space-y-6" id="governance-proposal-detailed-view">
              <div className="border-b border-[var(--border-color)] pb-4 space-y-2" id="governance-details-header">
                <span className="text-[10px] uppercase font-mono text-current opacity-45 tracking-widest font-bold block">
                  AIP Technical Inquiry
                </span>
                <h3 className="text-sm font-semibold font-sans leading-snug" id="desc-proposal-title">
                  {selectedProposal.id} : {selectedProposal.title}
                </h3>
                <div className="flex justify-between text-[9px] font-mono opacity-50 pt-1">
                  <span>Author: {selectedProposal.author}</span>
                  <span>Category: {selectedProposal.category.toUpperCase()}</span>
                </div>
              </div>

              {/* Proposal core text block */}
              <div className="space-y-2 text-xs" id="desc-narrative-block">
                <span className="text-[9px] uppercase font-mono font-bold text-current/40 block">原案大纲技术说明 / Detailed Narrative</span>
                <p className="text-current/70 font-sans whitespace-pre-wrap leading-relaxed border-l border-current/25 pl-4">
                  {selectedProposal.description}
                </p>
              </div>

              {/* Voting box */}
              {selectedProposal.status === 'active' ? (
                <div className="p-5 border border-current/10 space-y-4" id="active-voting-ballot">
                  <div className="flex items-center gap-1.5 border-b border-[var(--border-color)] pb-3">
                    <span className="text-xs uppercase font-bold text-current tracking-widest font-mono">
                      治理表决舱 / Ballot Gateway
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-current/60 leading-relaxed">
                    行使您锁仓托管中的 AIP 凭证以修改系统。经多签算法分布式上链确认后，该投票数据将不可逆锁定。
                  </p>

                  {votingNotice && (
                    <div className="p-3 bg-current/[0.02] border border-current/20 text-current text-[10px] leading-relaxed font-mono" id="vote-notice-banner">
                      {votingNotice}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2" id="vote-triggers">
                    <button
                      id="btn-vote-for"
                      disabled={selectedProposal.voted}
                      onClick={() => handleVote('for')}
                      className={`py-3 border text-xs tracking-wider font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                        selectedProposal.voted
                          ? 'border-[var(--border-color)] text-current/20 pointer-events-none'
                          : 'border-current bg-current text-[var(--bg-sidebar)] hover:bg-transparent hover:text-current'
                      }`}
                    >
                      赞成 Agreed
                    </button>

                    <button
                      id="btn-vote-against"
                      disabled={selectedProposal.voted}
                      onClick={() => handleVote('against')}
                      className={`py-3 border text-xs tracking-wider font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                        selectedProposal.voted
                          ? 'border-[var(--border-color)] text-current/20 pointer-events-none'
                          : 'border-rose-500/40 text-rose-500 hover:border-rose-500'
                      }`}
                    >
                      反对 Reject
                    </button>
                  </div>

                  {selectedProposal.voted && !votingNotice && (
                    <div className="p-3 border border-emerald-500/20 text-emerald-500 text-[10.5px] font-mono bg-emerald-500/5" id="vote-receipt">
                      ✓ 提案投票回执存备成功。安全共识验证无误。
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 border border-current/10 text-[11px] font-sans leading-relaxed text-current/50" id="governance-closed-notice">
                  本提案修订排期已正式闭仓并封盖归档，由于 Epoch 计数轮换完毕，该议案的共识判定结果已被智能合约自主锁定。
                </div>
              )}

              {/* Vote statistics breakdown graph */}
              {selectedProposal.votesFor + selectedProposal.votesAgainst > 0 && (
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]" id="detailed-vote-tally">
                  <span className="text-[10px] uppercase font-mono font-bold text-current/40 block">治理表决分布探针 / Consensus Distribution</span>
                  <div className="space-y-3 font-mono text-[10.5px]" id="voting-tally-meters">
                    {/* For */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-sans text-current/60 text-[10.5px]">
                        <span>累计赞成权重</span>
                        <span className="text-current font-bold">{selectedProposal.votesFor.toLocaleString()} Tickets</span>
                      </div>
                      <div className="w-full bg-current/5 h-1 border border-current/[0.03]">
                        <div className="bg-current h-full" style={{ width: `${(selectedProposal.votesFor / (selectedProposal.votesFor + selectedProposal.votesAgainst)) * 100}%` }} />
                      </div>
                    </div>

                    {/* Against */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-sans text-current/60 text-[10.5px]">
                        <span>累计反对权重</span>
                        <span className="text-current font-bold/60 opacity-60">{selectedProposal.votesAgainst.toLocaleString()} Tickets</span>
                      </div>
                      <div className="w-full bg-current/5 h-1 border border-current/[0.03]">
                        <div className="bg-rose-500 h-full" style={{ width: `${(selectedProposal.votesAgainst / (selectedProposal.votesFor + selectedProposal.votesAgainst)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-10 border border-dashed border-current/10 text-center text-xs opacity-50 font-sans" id="empty-select-notice">
              请选择一个左侧资产改进提案来审度完整的技术说明和开始行使共识。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
