# ShipOrSkip

AI 驱动的独立产品想法验证工具。

## 技术栈

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email/Password)
- **Payment**: Creem (一次性付款)
- **AI**: OpenRouter API (GPT-4o-mini + Claude Sonnet)
- **Deployment**: GitHub Actions + Cloudflare Workers (via @opennextjs/cloudflare)

## 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建项目
npm run lint         # 运行 ESLint
```

## 项目结构

```
/app                    # Next.js App Router 页面
  /api/roast            # Basic Roast API (免费)
  /api/deep-validation  # Deep Validation API (付费)
  /api/checkout         # Creem checkout session
  /api/webhook          # Creem payment webhook
  /auth/callback        # 邮箱确认回调
  /login                # 登录/注册页面
  /dashboard            # 用户仪表盘
  /report/[id]          # 报告页面 (支持 report ID 和 idea ID)
/components             # React 组件
/lib                    # 工具函数和客户端
/types                  # TypeScript 类型定义
/supabase               # 数据库 Schema
```

## 环境变量

复制 `.env.example` 到 `.env.local` 并填写：

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase 匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase 服务角色密钥
- `OPENROUTER_API_KEY` - OpenRouter API 密钥
- `CREEM_API_KEY` - Creem API 密钥
- `CREEM_WEBHOOK_SECRET` - Creem Webhook 签名密钥
- `CREEM_DEEP_REPORT_PRODUCT_ID` - Deep Report 产品 ID
- `NEXT_PUBLIC_APP_URL` - 应用 URL (https://shiporskip.org)

## 数据库设置

1. 在 Supabase 创建新项目
2. 运行 `supabase/schema.sql` 创建表结构
3. 在 Supabase Dashboard → Authentication → Email Templates 更新确认邮件模板
4. 在 Supabase Dashboard → Authentication → URL Configuration 添加 redirect URL

## 部署流程

1. 推送代码到 GitHub master 分支
2. GitHub Actions 自动构建 (ubuntu-latest)
3. `npx @opennextjs/cloudflare build` 构建
4. `wrangler deploy --keep-vars` 部署到 Cloudflare Workers
5. 环境变量通过 Cloudflare Workers secrets 管理

## 注意事项

- AI 模型通过 OpenRouter 调用，支持灵活切换
- 免费用户每月 3 次 Basic Roast
- Deep Validation 需付费 $9 (一次性)
- Creem webhook 处理支付回调，签名验证使用 HMAC-SHA256
- middleware.ts 处理 Supabase session 刷新
