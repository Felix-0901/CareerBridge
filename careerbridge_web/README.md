## CareerBridge

CareerBridge 是一個以 Next.js 建立的青年求職／實習媒合網站，包含探索問答、AI 分析、職缺推薦、技能落差、履歷優化與公共資源導流。

## Getting Started

1. 安裝依賴

```bash
npm install
```

2. 設定環境變數

專案已提供 `.env.local` 與 `.env.example`。你只需要把 `AI_API_KEY` 填進 `.env.local`：

```bash
AI_API_BASE_URL=https://free.v36.cm/v1
AI_API_KEY=你的金鑰
AI_MODEL=gpt-4o-mini
```

3. 啟動開發伺服器

```bash
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000) 即可查看。

## AI 設定說明

- 預設串接 `free_chatgpt_api` 的 OpenAI 相容 `/v1/chat/completions`。
- 若 `AI_API_KEY` 尚未設定，網站仍可正常運行，分析頁會自動退回本地 fallback 分析，不會卡死。
- 完成探索後會直接進入分析頁，職缺推薦也會沿用最近一次分析結果重新排序。

## Available Pages

- `/` 首頁
- `/onboarding` 快速探索
- `/upload` 上傳履歷或手動補充資料
- `/analysis` AI / fallback 分析
- `/jobs` 推薦職缺
- `/skills` 技能落差
- `/resume` 履歷優化
- `/interview` 面試準備
- `/resources` 公共資源
- `/dashboard` 求職進度

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
