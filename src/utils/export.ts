import type { EpisodeProject } from '../types';

export function buildExportMarkdown(project: EpisodeProject): string {
  const lines: string[] = [];

  lines.push(`# ${project.title} · 生产导出包`);
  lines.push('');
  lines.push(`- 出处：${project.source}`);
  lines.push(`- 时长：${project.targetDurationSec}s`);
  lines.push(`- 画幅：${project.aspectRatio}`);
  lines.push(`- 平台：${project.platform}`);
  lines.push('');
  lines.push('## Logline');
  lines.push(project.logline);
  lines.push('');
  lines.push('## 改编说明');
  lines.push(project.adaptationSummary);
  lines.push('');
  lines.push('## 风格圣经');
  lines.push(project.styleBible.artDirection);
  lines.push('');
  lines.push('### Global Style Prompt');
  lines.push('```');
  lines.push(project.styleBible.globalStylePrompt);
  lines.push('```');
  lines.push('');
  lines.push('### Global Negative Prompt');
  lines.push('```');
  lines.push(project.styleBible.globalNegativePrompt);
  lines.push('```');
  lines.push('');
  lines.push('## 角色设定');
  for (const c of project.characters) {
    lines.push(`### ${c.name}（${c.role}）`);
    lines.push(`- 身份：${c.identity}`);
    lines.push(`- 外形：${c.appearance}`);
    lines.push(`- 服装：${c.costume}`);
    lines.push(`- 性格：${c.personality}`);
    lines.push('- Visual Prompt:');
    lines.push('```');
    lines.push(c.visualPrompt);
    lines.push('```');
    lines.push('');
  }

  lines.push('## 剧本节拍');
  for (const b of project.scriptBeats) {
    lines.push(`### ${b.title}（${b.timeRange}）`);
    lines.push(`- 旁白：${b.narration || '—'}`);
    lines.push(`- 对白：${b.dialogue || '—'}`);
    lines.push(`- 动作：${b.action}`);
    lines.push(`- 情绪：${b.emotion}`);
    lines.push(`- 改编注：${b.adaptationNote}`);
    lines.push('');
  }

  lines.push('## 分镜提示词');
  for (const s of project.shots) {
    lines.push(`### Shot ${s.order} · ${s.title}（${s.durationSec}s）`);
    lines.push(`- 景别：${s.shotType} / 运镜：${s.cameraMove}`);
    lines.push(`- 场景：${s.location}`);
    lines.push(`- 动作：${s.action}`);
    lines.push(`- 旁白：${s.narration || '—'}`);
    lines.push(`- 对白：${s.dialogue || '—'}`);
    lines.push('- Image Prompt:');
    lines.push('```');
    lines.push(s.imagePrompt);
    lines.push('```');
    lines.push('- Video Prompt:');
    lines.push('```');
    lines.push(s.videoPrompt);
    lines.push('```');
    lines.push(`- 连续性：${s.continuityNotes}`);
    lines.push('');
  }

  lines.push('## 质检清单');
  for (const item of project.qualityChecklist) {
    lines.push(`- [ ] ${item}`);
  }
  lines.push('');

  return lines.join('\n');
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyText(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
