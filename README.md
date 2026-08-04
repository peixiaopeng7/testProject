# 聊斋工坊 · Liaozhai Studio

把《聊斋志异》短篇改编为「国风手绘短动画」的生产工具。先锁剧本、角色、风格与分镜提示词，再导出投喂文生图 / 图生视频模型。

## 当前进度

- 独立前端项目（Vite + React + TypeScript）
- 首集样例：《黄英》
- 工作流：总览 → 剧本 → 角色 → 分镜 → 风格 → 导出

## 本地启动

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:5173`）。

## 目录结构

```
src/
    data/stories/huang-ying.ts   # 《黄英》完整生产数据
    pages/                       # 各生产步骤页面
    utils/export.ts              # Markdown / JSON 导出
```

## 后续迭代方向

1. 接入文生图 / 图生视频 API，分镜一键出图出片
2. 角色参考图上传与一致性锁定
3. 多篇目故事库（聂小倩、画皮等）
4. 旁白 TTS / 字幕时间轴
5. 质检自动化（时长、画幅、角色关键词覆盖）
