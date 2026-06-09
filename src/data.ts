import { Client, ImageItem, DesignAsset, AdapterConfig, ContentBlock, HistoryLog } from './types';

export const initialClients: Client[] = [
  {
    id: "cl-1",
    name: "阿尔法先进智造",
    company: "Alpha Advanced Labs",
    email: "contact@alphalabs.io",
    phone: "+86 188-0192-3211",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    revenue: 128000,
    projectsCount: 6,
    brief: "提供半导体硅片微操视觉识别软件与算力调优。项目需要生成25套极简风多维度UI界面与暗色控制室主题风格方案。",
    joinedDate: "2026-01-20"
  },
  {
    id: "cl-2",
    name: "西风赛博出行",
    company: "Zephyr CyberDynamics",
    email: "ops@zephyrcd.com",
    phone: "+86 139-4452-9902",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    revenue: 85200,
    projectsCount: 3,
    brief: "自动驾驶多层状态矢量拟和展示舱。深度开发高精度图形适配器，调配生成并去噪全光谱无缝激光贴图。",
    joinedDate: "2026-02-14"
  },
  {
    id: "cl-3",
    name: "深海极核网络",
    company: "DeepSea CoreNet",
    email: "security@deepsea.io",
    phone: "+86 156-9211-5400",
    status: "Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    revenue: 45000,
    projectsCount: 1,
    brief: "智能安全协议感知流沙盘。需要构建深度神经网络自动生成的暗光渐变色系风格指南以及多层适配器参数配置面板。",
    joinedDate: "2026-05-02"
  },
  {
    id: "cl-4",
    name: "墨影国风引擎",
    company: "InkShadow InkCore",
    email: "ink@inkcore.cn",
    phone: "+86 177-8321-0082",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    revenue: 210000,
    projectsCount: 8,
    brief: "传统画卷渲染去燥修复和超级分辨率模型部署。包含水墨飞白纹理的智能无缝贴图、配色以及超分多线程渲染输出。",
    joinedDate: "2025-11-02"
  }
];

export const initialImages: ImageItem[] = [
  {
    id: "img-1",
    name: "hyper_realistic_cyberspace_interior.png",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    size: "1.42 MB",
    resolution: "2048 x 2048",
    mimeType: "image/png",
    uploadDate: "2026-06-08 14:02",
    tags: ["Cyberpunk", "Interface", "Workspace"]
  },
  {
    id: "img-2",
    name: "swiss_modern_grid_composition_yellow.png",
    url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    size: "820 KB",
    resolution: "1920 x 1080",
    mimeType: "image/png",
    uploadDate: "2026-06-09 01:15",
    tags: ["Swiss", "Minimalist", "Typology"]
  },
  {
    id: "img-3",
    name: "abstract_matte_clay_renders_3d.png",
    url: "https://images.unsplash.com/photo-1618005124978-c1122cf282f6?auto=format&fit=crop&w=800&q=80",
    size: "2.11 MB",
    resolution: "4096 x 4096",
    mimeType: "image/png",
    uploadDate: "2026-06-05 18:44",
    tags: ["3D", "Organic", "Clay"]
  }
];

export const initialAssets: DesignAsset[] = [
  {
    id: "ast-1",
    name: "Swiss-Grid Typography System Tokens",
    type: "code",
    size: "12 KB",
    creator: "Admin System",
    version: "v2.4.1",
    downloadCount: 341,
    lastUpdated: "2026-06-07",
    previewUrl: "JSON Schema Specification"
  },
  {
    id: "ast-2",
    name: "Alabaster Neutral 2026 Swatch Palette",
    type: "color-palette",
    size: "4 KB",
    creator: "Design Ops Core",
    version: "v1.0.0",
    downloadCount: 1109,
    lastUpdated: "2026-06-09",
    previewUrl: "#FAFAFA | #1C1917 | #78716C | #E7E5E4"
  },
  {
    id: "ast-3",
    name: "Cyber-Modular Control室 FONT.ttf",
    type: "font",
    size: "1.82 MB",
    creator: "Typography Engine",
    version: "v4.0.0b",
    downloadCount: 88,
    lastUpdated: "2026-05-30",
    previewUrl: "Custom Monospaced Neo-Brutalist Glyphs"
  }
];

export const initialAdapters: AdapterConfig[] = [
  {
    slug: "stable-diffusion-webui",
    name: "Stable Diffusion API Router",
    provider: "Automatic1111 / ComfyUI Server Backend",
    status: "connected",
    latency: 88,
    apiEndpoint: "https://api.design-ops.ai/sd/v1/txt2img",
    apiKeyMasked: "*****************************3ab9",
    usageCount: 4210,
    description: "提供基础画幅超分、智能去杂噪以及智能图层遮罩融合计算。"
  },
  {
    slug: "midjourney-v6-agent",
    name: "Midjourney V6 Real-time Sync",
    provider: "Discord Bot Tunneling Middleware",
    status: "connected",
    latency: 242,
    apiEndpoint: "https://api.design-ops.ai/mj/v6/imagine",
    apiKeyMasked: "*****************************df88",
    usageCount: 9340,
    description: "支持高保真环境概念草图及高层本息积累多维风格转译。"
  },
  {
    slug: "figma-design-tokens",
    name: "Figma Sync Webhook Listener",
    provider: "Figma Developer Platform Token Integration",
    status: "disconnected",
    latency: 0,
    apiEndpoint: "https://api.figma.com/v1/files/workspace",
    apiKeyMasked: "*****************************9021",
    usageCount: 120,
    description: "自动监听协作团队发布的颜色、字重、间距变量配置并映射上载系统风格基因。"
  }
];

export const initialContents: ContentBlock[] = [
  {
    id: "cnt-1",
    title: "阿尔法项目第一阶段视觉对齐公告",
    category: "internal",
    status: "published",
    body: "为了保证半导体主板缺陷检测控制台在暗光环境中的视认度，我们将核心指示器背景拉高3.5%饱和度，并将全局默认背景限定在#09090B的纯 Obsidian 灰度梯度中。",
    author: "项目设计总监",
    tags: ["Alpha", "Dashboard", "Standards"]
  },
  {
    id: "cnt-2",
    title: "赛博出行交互滑动阻尼常数配置",
    category: "marketing",
    status: "draft",
    body: "针对高端物理车载屏幕的惯性惯例，建议H5端模拟滑块使用cubic-bezier(0.16, 1, 0.3, 1)超大指数级缓动函数，实现无损物理级舒适响应。",
    author: "UI-UX 精尖专家",
    tags: ["Zephyr", "UX-Formula"]
  }
];

export const initialHistory: HistoryLog[] = [
  {
    id: "log-1",
    timestamp: "2026-06-09 10:44:12",
    operator: "AI Co-pilot Server",
    action: "风格基因提纯 - 高阶配色矩阵计算",
    module: "Style-genome",
    status: "success",
    payloadSize: "18.4 KB"
  },
  {
    id: "log-2",
    timestamp: "2026-06-09 10:11:05",
    operator: "zquanwei4@gmail.com",
    action: "超分辨率放大 (4x) 请求交割",
    module: "AI-tools/upscale",
    status: "success",
    payloadSize: "4.8 MB"
  },
  {
    id: "log-3",
    timestamp: "2026-06-09 09:30:15",
    operator: "Figma Webhook",
    action: "拉取最新配色规范失败 - Token 检验异常",
    module: "Adapters/figma-sync",
    status: "fail",
    payloadSize: "0.2 KB"
  }
];

export const docsPages = [
  {
    slug: 'system-intro',
    title: '系统整体概述 / Overview',
    brief: '探究 Design AI-Ops 设计系统协作、算法调优的核心中枢。',
    content: `## 什么是 Design AI-Ops ?

Design AI-Ops 是一个面向高端创意工坊和智能制造业设计团队的**一体化人工智能创研与数据运营平台**。系统通过轻量化的响应模块，将底层的模型能力 (超分, 配色, ComfyUI, 橡皮擦等) 与核心的客户面板、图床、资产分享、适配器完美结合。

### 核心设计理论：
*   **瑞士简约派 (Swiss Minimalism):** 精细度、比例、空间就是最好的包装。我们严格剥除无用的色块拼贴，改用纯粹线框网格以及极具秩序感的数据层级。
*   **零摩擦交互 (Frictional Zero):** 自适应间距、丝滑的Motion过渡，并支持在同一主控台内同时调试**桌面端管理后台**、**AI专属工具集**以及**智能移动端配套视图**。`
  },
  {
    slug: 'api-integration',
    title: 'API 与外部适配器机制 / Adapters',
    brief: '配置三方生成模型与同步流的契约规整方案。',
    content: `## 适配器配置规范

为了保障业务数据隐私，所有的模型 API Keys 均通过本地安全加密。系统采用 API Router 实现请求的安全代理转发，确保客户端永远不会出现泄露。

- **Stable Diffusion API**: 支持TXT2IMG与IMG2IMG算子，可同步拉取ComfyUI底层的工作流。
- **Midjourney Sync**: 依托 Discord 内部网关进行异步流监听。
- **Figma Webhook**: 读取 Figma Tokens 触发局域样式更新。`
  }
];
