# ShipOrSkip

AI 驱动的独立产品想法验证工具。

## 技术栈

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payment**: Lemon Squeezy
- **AI**: OpenRouter API
- **Deployment**: GitHub + Cloudflare Pages (自动部署)

## 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建项目
npm run lint         # 运行 ESLint
```

## 项目结构

```
/app                    # Next.js App Router 页面
  /api/roast            # Basic Roast API
  /api/deep-validation  # Deep Validation API
  /api/webhook          # Lemon Squeezy webhook
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
- `LEMONSQUEEZY_API_KEY` - Lemon Squeezy API 密钥
- `LEMONSQUEEZY_STORE_ID` - Lemon Squeezy 商店 ID
- `LEMONSQUEEZY_WEBHOOK_SECRET` - Lemon Squeezy Webhook 密钥

## 数据库设置

1. 在 Supabase 创建新项目
2. 运行 `supabase/schema.sql` 创建表结构
3. 配置 Auth 设置（启用 Email 登录）

## 部署流程

1. 推送代码到 GitHub
2. Cloudflare Pages 连接 GitHub 仓库
3. 配置构建设置和环境变量
4. 每次 push 自动部署

## 注意事项

- AI 模型通过 OpenRouter 调用，支持灵活切换
- 免费用户每月 3 次 Basic Roast
- Deep Validation 需付费 $9
- Lemon Squeezy webhook 处理支付回调
