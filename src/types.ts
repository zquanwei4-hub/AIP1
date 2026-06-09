export type ThemeType = 'quantum-dark' | 'neo-light' | 'emerald-terminal';
export type SpacingType = 'compact' | 'comfort' | 'loose';
export type PageType = 'dashboard' | 'dca' | 'copilot' | 'portfolio' | 'proposals' | 'navmap';

export interface DCAStrategy {
  id: string;
  name: string;
  targetAsset: string;
  sourceAsset: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  riskProfile: 'conservative' | 'balanced' | 'aggressive';
  status: 'active' | 'paused' | 'completed';
  nextRun: string;
}

export interface Proposal {
  id: string;
  title: string;
  category: 'core' | 'governance' | 'treasury' | 'integration';
  status: 'active' | 'passed' | 'defeated' | 'queued';
  votesFor: number;
  votesAgainst: number;
  voted: boolean;
  author: string;
  description: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
