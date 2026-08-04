import { useMemo, useState } from 'react';
import { getProject } from '../data/projects';
import { useToast } from '../hooks/useToast';
import { buildExportMarkdown, copyText, downloadTextFile } from '../utils/export';

const project = getProject('huang-ying')!;

export function ExportPage() {
  const { show, Toast } = useToast();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const markdown = useMemo(() => buildExportMarkdown(project), []);
  const json = useMemo(() => JSON.stringify(project, null, 2), []);
  const allChecked = project.qualityChecklist.every((item) => checked[item]);

  const toggle = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="page">
      <section className="hero-panel">
        <span className="eyebrow">EXPORT · 生产导出</span>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
          一键打包投喂模型
        </h1>
        <p className="hero-lead">先过质检清单，再导出 Markdown（给人看）或 JSON（给流水线/后续 API 用）。</p>
      </section>

      <div className="grid-2">
        <article className="panel">
          <h2>质检清单</h2>
          <ul className="checklist">
            {project.qualityChecklist.map((item) => (
              <li key={item}>
                <input type="checkbox" checked={!!checked[item]} onChange={() => toggle(item)} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: '0.85rem' }}>
            {allChecked ? '质检通过，可以导出。' : '建议全部勾选后再导出，保证系列稳定性。'}
          </p>
        </article>

        <article className="panel">
          <h2>导出动作</h2>
          <p className="muted">文件名以《黄英》为前缀，方便系列归档。</p>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                downloadTextFile('huang-ying-production-pack.md', markdown, 'text/markdown;charset=utf-8');
                show('已下载 Markdown 生产包');
              }}
            >
              下载 Markdown
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadTextFile('huang-ying-production-pack.json', json, 'application/json;charset=utf-8');
                show('已下载 JSON 生产包');
              }}
            >
              下载 JSON
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={async () => {
                await copyText(markdown);
                show('已复制 Markdown 到剪贴板');
              }}
            >
              复制 Markdown
            </button>
          </div>
        </article>
      </div>

      <article className="panel" style={{ marginTop: '1rem' }}>
        <h2>预览 · Markdown</h2>
        <textarea className="field" style={{ minHeight: 360, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }} readOnly value={markdown} />
      </article>
      {Toast}
    </div>
  );
}
