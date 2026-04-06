# CareerBridge

串起你的興趣探索、履歷分析與職缺推薦，讓 AI 成為你最懂你的求職導航員——一個為台灣青年打造、結合本地分析與 AI 補強的個人化職涯媒合平台。

## 核心功能

- 探索式 onboarding：用興趣領域、技能與求職目標快速建立個人輪廓
- 分析報告：以本地分析引擎生成優勢、缺口、下一步與推薦職缺
- AI 補強（可選）：若設定 API Key，透過後端 API 進一步整理摘要與行動建議
- 職缺與追蹤：推薦列表、職缺詳情、收藏與投遞紀錄（示範資料）

## 技術棧

- Next.js（App Router）+ React + TypeScript
- framer-motion / recharts / lucide-react
- 後端路由：Next.js Route Handler（/api/analysis）
- 本地狀態：localStorage（分析 Session、收藏職缺）

## 專案結構

- careerbridge_web/：前端與 Next.js 專案本體
  - src/app/：頁面與 API routes
  - src/lib/：分析引擎、Session/收藏工具
  - src/data/：示範職缺、資源、使用者資料

## 開發啟動

1. 安裝相依套件

```bash
cd careerbridge_web
npm install
```

2. 設定環境變數（可選）

- 複製 `careerbridge_web/.env.example` 成 `.env.local`
- 若未設定 `AI_API_KEY`，系統會自動使用本地分析（不會呼叫外部 AI）

3. 啟動開發伺服器

```bash
npm run dev
```

## 安全備註

- 請勿提交任何 API Key、Token 或憑證到 GitHub
- 本專案已忽略 `.agent/` 目錄（開發工具/代理工作區）
