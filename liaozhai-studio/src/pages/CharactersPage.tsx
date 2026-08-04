import { useState } from 'react';
import { getProject } from '../data/projects';
import { useToast } from '../hooks/useToast';
import { copyText } from '../utils/export';

const project = getProject('huang-ying')!;

export function CharactersPage() {
  const { show, Toast } = useToast();
  const [activeId, setActiveId] = useState(project.characters[0].id);
  const active = project.characters.find((c) => c.id === activeId) ?? project.characters[0];

  return (
    <div className="page">
      <section className="hero-panel">
        <span className="eyebrow">CHARACTERS · 角色圣经</span>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
          定装与一致性
        </h1>
        <p className="hero-lead">每集先锁角色 prompt，再进分镜，避免「同人不同脸」。后续可接参考图 embedding / 角色卡。</p>
      </section>

      <div className="grid-3" style={{ marginTop: '1.25rem' }}>
        {project.characters.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`panel character-card${c.id === active.id ? '' : ''}`}
            onClick={() => setActiveId(c.id)}
            style={{
              textAlign: 'left',
              borderColor: c.id === active.id ? 'var(--line-strong)' : undefined,
              cursor: 'pointer',
            }}
          >
            <h3>{c.name}</h3>
            <div className="tagline">{c.role}</div>
            <p>{c.identity}</p>
          </button>
        ))}
      </div>

      <article className="panel" style={{ marginTop: '1rem' }}>
        <div className="panel-header">
          <div>
            <h2>
              {active.name}
              <span className="muted" style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>
                {active.role}
              </span>
            </h2>
            <p className="muted">{active.personality}</p>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: 0 }}>
          <div>
            <p>
              <span className="strong">外形：</span>
              {active.appearance}
            </p>
            <p>
              <span className="strong">服装：</span>
              {active.costume}
            </p>
            <p>
              <span className="strong">声线：</span>
              {active.voiceNote}
            </p>
          </div>
          <div className="prompt-box">
            <label className="label">角色 Visual Prompt</label>
            <div className="btn-row">
              <button
                type="button"
                className="btn"
                onClick={async () => {
                  await copyText(active.visualPrompt);
                  show(`已复制 ${active.name} 提示词`);
                }}
              >
                复制
              </button>
            </div>
            <textarea className="field" readOnly value={active.visualPrompt} />
          </div>
        </div>
      </article>
      {Toast}
    </div>
  );
}
