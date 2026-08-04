import { useMemo, useState } from 'react';
import { getProject } from '../data/projects';
import { useToast } from '../hooks/useToast';
import { copyText } from '../utils/export';

const project = getProject('huang-ying')!;

export function ScriptPage() {
  const { show, Toast } = useToast();
  const [beats, setBeats] = useState(project.scriptBeats);
  const [activeId, setActiveId] = useState(beats[0]?.id);

  const active = useMemo(() => beats.find((b) => b.id === activeId) ?? beats[0], [beats, activeId]);

  const updateActive = (key: 'narration' | 'dialogue' | 'action' | 'adaptationNote', value: string) => {
    setBeats((prev) => prev.map((b) => (b.id === active.id ? { ...b, [key]: value } : b)));
  };

  return (
    <div className="page">
      <section className="hero-panel">
        <span className="eyebrow">SCRIPT · 改编剧本</span>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
          《黄英》节拍板
        </h1>
        <p className="hero-lead">按短视频节奏切成 5 个节拍。可在右侧改旁白/对白，后续迭代会接到自动分镜生成。</p>
      </section>

      <div className="grid-2">
        <div className="stack" style={{ marginTop: 0 }}>
          {beats.map((beat, index) => (
            <button
              key={beat.id}
              type="button"
              className={`shot-card${beat.id === active.id ? ' active' : ''}`}
              onClick={() => setActiveId(beat.id)}
              style={{ textAlign: 'left', width: '100%' }}
            >
              <div className="shot-index">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="shot-title">{beat.title}</h3>
                <div className="shot-meta">
                  {beat.timeRange} · {beat.emotion}
                </div>
                <p className="muted" style={{ marginTop: '0.45rem' }}>
                  {beat.narration}
                </p>
              </div>
            </button>
          ))}
        </div>

        <article className="panel">
          <div className="panel-header">
            <div>
              <h2>{active.title}</h2>
              <p className="muted">
                {active.timeRange} · 情绪：{active.emotion}
              </p>
            </div>
          </div>

          <label className="label">旁白</label>
          <textarea className="field" value={active.narration} onChange={(e) => updateActive('narration', e.target.value)} />

          <label className="label" style={{ marginTop: '0.85rem' }}>
            对白
          </label>
          <textarea className="field" value={active.dialogue} onChange={(e) => updateActive('dialogue', e.target.value)} />

          <label className="label" style={{ marginTop: '0.85rem' }}>
            动作
          </label>
          <textarea className="field" value={active.action} onChange={(e) => updateActive('action', e.target.value)} />

          <label className="label" style={{ marginTop: '0.85rem' }}>
            改编注
          </label>
          <textarea
            className="field"
            value={active.adaptationNote}
            onChange={(e) => updateActive('adaptationNote', e.target.value)}
          />

          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={async () => {
                await copyText(`【${active.title}】\n旁白：${active.narration}\n对白：${active.dialogue}\n动作：${active.action}`);
                show('已复制本节拍文本');
              }}
            >
              复制本节拍
            </button>
          </div>
        </article>
      </div>
      {Toast}
    </div>
  );
}
