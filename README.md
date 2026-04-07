# portfolio-front

ヘッドレス CMS と Next.js で構成したポートフォリオサイトのフロントエンドです。

**Live:** [www.mi-goya.com](https://www.mi-goya.com)

## Architecture

```
┌─────────────────────┐       Public API        ┌──────────────────────┐
│   headless CMS      │ ──────────────────────▶  │   Next.js Frontend   │
│   (self-built)      │  /contents, /settings,   │   (this repo)        │
│   EC2 / Apache      │  /chat                   │   Vercel             │
└─────────────────────┘                          └──────────────────────┘
         │                                                │
         │  Webhook (revalidateTag)                       │
         └────────────────────────────────────────────────┘
```

- **CMS (別リポジトリ):** Laravel ベースの自作ヘッドレス CMS。マルチテナント対応で、コンテンツ管理・メディア管理・AI チャット API を提供
- **Frontend (本リポジトリ):** CMS の Public API からデータを取得して描画する Next.js アプリケーション
- **キャッシュ戦略:** CMS 側の更新時に Webhook で `revalidateTag` を呼び出し、On-demand Revalidation で即時反映

## Features

- **Works / News / Pages** -- CMS から取得したコンテンツを動的に描画
- **AI チャットボット** -- ポートフォリオの内容をコンテキストにした AI アシスタント。CMS 側の `/chat` API を SSE ストリーミングで呼び出し、リアルタイムに応答を表示
- **On-demand Revalidation** -- CMS でコンテンツを更新すると、Webhook 経由でフロントのキャッシュを即時パージ
- **スクロールアニメーション** -- Intersection Observer ベースのスクロール連動アニメーション
- **カテゴリフィルター** -- Works をカテゴリ (Freelance / Corporate) で絞り込み

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |
| CMS | Self-built headless CMS (Laravel / EC2) |
| CI | GitHub Actions (tsc, ESLint, next build) |

## Development

```bash
cd frontend
npm ci
npm run dev
```

CMS API への接続には環境変数が必要です:

| Variable | Description |
|---|---|
| `CMS_API_BASE_URL` | CMS Public API のベース URL (サーバーサイド) |
| `NEXT_PUBLIC_CMS_API_URL` | CMS Public API のベース URL (クライアントサイド) |
| `REVALIDATE_SECRET` | On-demand Revalidation 用の共有シークレット |

## Verification

```bash
cd frontend
npx tsc --noEmit   # 型チェック
npm run lint        # ESLint
npm run build       # ビルド確認
```

## License

All rights reserved.
