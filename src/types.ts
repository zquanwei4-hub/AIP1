export type ThemeType = 'quantum-dark' | 'neo-light';
export type SpacingType = 'compact' | 'comfort' | 'loose';

export type PageType = 
  | 'dashboard' 
  | 'dca' 
  | 'copilot' 
  | 'portfolio' 
  | 'proposals' 
  | 'navmap'
  | 'admin-panel'
  | 'ai-tools-panel'
  | 'mobile-panel'
  | 'public-panel';

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

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface Proposal {
  id: string;
  title: string;
  category: 'core' | 'parameter' | 'community';
  status: 'open' | 'passed' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  voted: boolean;
  author: string;
  description: string;
}

// Main Navigation Routes
export type ActiveModule = 'admin' | 'ai-tools' | 'mobile' | 'public_docs';

// Admin Subpages (21 pages!)
export type AdminSubPage = 
  | 'today' 
  | 'clients' 
  | 'client-detail' 
  | 'imgbed' 
  | 'dashboard' 
  | 'workspace' 
  | 'share' 
  | 'assets' 
  | 'history' 
  | 'playground' 
  | 'moodboard' 
  | 'income' 
  | 'analytics' 
  | 'analytics-import' 
  | 'adapters' 
  | 'adapter-detail' 
  | 'search' 
  | 'contents' 
  | 'settings' 
  | 'presets' 
  | 'analysis' 
  | 'discuss' 
  | 'style-genome' 
  | 'docs' 
  | 'doc-detail';

// AI Tool Subpages (8 pages!)
export type AIToolSubPage = 
  | 'home' 
  | 'upscale' 
  | 'comfy' 
  | 'seamless' 
  | 'retouch' 
  | 'recolor' 
  | 'prompt-gen' 
  | 'erase';

// Mobile Subpages (15 pages!)
export type MobileSubPage = 
  | 'today' 
  | 'clients' 
  | 'client-detail' 
  | 'prompts' 
  | 'dashboard' 
  | 'assets' 
  | 'weekly-report' 
  | 'me' 
  | 'contents' 
  | 'analytics' 
  | 'pricing' 
  | 'image' 
  | 'settings' 
  | 'suggestions' 
  | 'presets' 
  | 'calculator';

// Public/Auth Subpages (4 pages)
export type PublicSubPage = 
  | 'login' 
  | 'register' 
  | 'showcase' 
  | 'shared-link';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'Lead' | 'Completed' | 'Suspended';
  avatar: string;
  revenue: number;
  projectsCount: number;
  brief: string;
  joinedDate: string;
}

export interface ImageItem {
  id: string;
  name: string;
  url: string;
  size: string;
  resolution: string;
  mimeType: string;
  uploadDate: string;
  optimizedUrl?: string;
  tags: string[];
}

export interface DesignAsset {
  id: string;
  name: string;
  type: 'vector' | 'raster' | 'code' | 'font' | 'color-palette';
  size: string;
  creator: string;
  version: string;
  downloadCount: number;
  lastUpdated: string;
  previewUrl: string;
}

export interface AdapterConfig {
  slug: string;
  name: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  latency: number;
  apiEndpoint: string;
  apiKeyMasked: string;
  usageCount: number;
  description: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  category: 'social' | 'ad' | 'marketing' | 'internal';
  status: 'draft' | 'published' | 'archived';
  body: string;
  author: string;
  tags: string[];
}

export interface HistoryLog {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  module: string;
  status: 'success' | 'warn' | 'fail';
  payloadSize?: string;
}

export interface ProposalAIP {
  id: string;
  title: string;
  votesFor: number;
  votesAgainst: number;
  status: 'open' | 'passed' | 'rejected';
}

export interface Suggestion {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  rating: number;
}
