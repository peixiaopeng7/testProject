import { useMemo, useState } from 'react';
import { getProject } from '../data/projects';
import { useToast } from '../hooks/useToast';
import { copyText } from '../utils/export';

const project = getProject('huang-ying')!;

export function StoryboardPage() {
  const { show, Toast } = useToast();
  const [shots, setShots] = useState(project.shots);
  const [activeId, setActiveId] = useState(shots[0]?.id);
  const [tab, setTab] = useState<'image' | 'video'>('image');

  const active = useMemo(() => shots.find((s) => s.id === activeId) ?? shots[0], [shots, activeId]);
  const totalDuration = shots.reduce((sum, s) => sum + s.durationSec, 0);

  const updatePrompt = (key: 'imagePrompt' | 'videoPrompt' | 'action' | 'continuityNotes', value: string) => {
    setShots((prev) => prev.map((s) => (s.id === active.id ? { ...s, [key]: value } : s)));
  };

  return (
    <div className="page">
      <section className="hero-panel">
        <span className="eyebrow">STORYBOARD · 分镜生产</span>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
          七镜成片骨架
        </h1>
        <p className="hero-lead">
          当前合计约 {totalDuration}s / 目标 {project.targetDurationSec}s。每镜含图生提示词与视频运镜提示词，可直接喂给即梦 / 可灵 / Runway。
        </p>
      </section>

      <div className="grid-2">
        <div className="shot-list">
          {shots.map((shot) => (
            <button
              key={shot.id}
              type="button"
              className={`shot-card${shot.id === active.id ? ' active' : ''}`}
              onClick={() => setActiveId(shot.id)}
              style={{ textAlign: 'left', width: '100%' }}
            >
              <div className="shot-index">{String(shot.order).padStart(2, '0')}</div>
              <div>
                <h3 className="shot-title">{shot.title}</h3>
                <div className="shot-meta">
                  {shot.durationSec}s · {shot.shotType} · {shot.cameraMove}
                </div>
                <p className="muted" style={{ marginTop: '0.4rem' }}>
                  {shot.action}
                </p>
              </div>
            </button>
          ))}
        </div>

        <article className="panel">
          <div className="panel-header">
            <div>
              <h2>
                Shot {active.order} · {active.title}
              </h2>
              <p className="muted">
                {active.location} · 情绪：{active.mood}
              </p>
            </div>
            <div className="chip">{active.durationSec}s</div>
          </div>

          <p>
            <span className="strong">旁白：</span>
            {active.narration || '—'}
          </p>
          <p>
            <span className="strong">对白：</span>
            {active.dialogue || '—'}
          </p>

          <label className="label" style={{ marginTop: '0.85rem' }}>
            动作描述
          </label>
          <textarea className="field" value={active.action} onChange={(e) => updatePrompt('action', e.target.value)} />

          <label className="label" style={{ marginTop: '0.85rem' }}>
            连续性备注
          </label>
          <textarea
            className="field"
            style={{ minHeight: 72 }}
            value={active.continuityNotes}
            onChange={(e) => updatePrompt('continuityNotes', e.target.value)}
          />

          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <button type="button" className={`btn${tab === 'image' ? ' btn-primary' : ''}`} onClick={() => setTab('image')}>
              文生图 Prompt
            </button>
            <button type="button" className={`btn${tab === 'video' ? ' btn-primary' : ''}`} onClick={() => setTab('video')}>
              图生视频 Prompt
            </button>
          </div>

          <div className="prompt-box" style={{ marginTop: '0.75rem' }}>
            <div className="btn-row">
              <button
                type="button"
                className="btn"
                onClick={async () => {
                  const text = tab === 'image' ? active.imagePrompt : active.videoPrompt;
                  await copyText(text);
                  show(tab === 'image' ? '已复制文生图提示词' : '已复制视频提示词');
                }}
              >
                复制当前
              </button>
            </div>
            <textarea
              className="field"
              style={{ minHeight: 180 }}
              value={tab === 'image' ? active.imagePrompt : active.videoPrompt}
              onChange={(e) => updatePrompt(tab === 'image' ? 'imagePrompt' : 'videoPrompt', e.target.value)}
            />
          </div>

          <p className="muted" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
            Negative：{active.negativePrompt.slice(0, 80)}…
          </p>
        </article>
      </div>
      {Toast}
    </div>
  );
}
