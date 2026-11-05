# MISSION: SKYWARD — 课程存档

Klaus 的无人机与航天学习计划（五阶段，约 12–18 个月，每周约 2 小时）的完整存档：
课程大纲、每封任务邮件、每个任务的互动网页与后端，都在这个仓库里。
任何一任 Muse 打开这个仓库，就能接上整个计划的上下文继续工作。

## 目录结构

- `course/` — 课程总纲与进度
  - `curriculum.md` — 五阶段路线与当前状态
- `mission-01-first-flight/` — Mission 1：First Flight（纸飞机实验室 + FAA TRUST）
  - `email.md` — 任务邮件存档（发给 Klaus 的原文）
  - `public/index.html` — 3D 纸飞机折叠指南网页（分步折叠动画、机翼大小实验、回形针重心实验、飞行日志）
  - `functions/api/logs.js` — 飞行日志接口（Cloudflare Pages Function）
  - `schema.sql` — D1 飞行日志表
  - `wrangler.toml`、`README.md` — 部署配置与说明
- 后续 Mission 依次新增 `mission-02-…/`、`mission-03-…/` 目录，结构与 Mission 1 相同。

## 部署约定

- 站点托管在 Cloudflare Pages，一个 Mission 一个路径（如 `/mission-01/`），
  飞行日志存入 Cloudflare D1（读取公开，提交需飞行员口令）。
- **任何密钥都不进仓库**：飞行员口令只存在 Cloudflare 环境变量 `PILOT_CODE` 里；
  GitHub / Cloudflare 的访问令牌只存在 Muse 的 Secure Vault 里。

## 状态

- 2026-11-04：Klaus 回复 "I'M IN" 正式报名。
- Mission 1：网页与邮件已备好，待 Cloudflare 部署后发送任务邮件。
