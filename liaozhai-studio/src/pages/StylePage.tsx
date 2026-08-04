import { getProject } from '../data/projects';
import { useToast } from '../hooks/useToast';
import { copyText } from '../utils/export';

const project = getProject('huang-ying')!;
const style = project.styleBible;

export function StylePage() {
  const { show, Toast } = useToast();

  return (
    <div className="page">
      <section className="hero-panel">
        <span className="eyebrow">STYLE BIBLE · 风格圣经</span>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
          国风手绘夜园
        </h1>
        <p className="hero-lead">{style.artDirection}</p>
      </section>

      <div className="grid-2">
        <article className="panel">
          <h2>光影与线条</h2>
          <p>
            <span className="strong">光影：</span>
            {style.lighting}
          </p>
          <p>
            <span className="strong">线稿：</span>
            {style.lineWork}
          </p>
          <p>
            <span className="strong">运动感：</span>
            {style.animationFeel}
          </p>
          <div className="meta-row">
            {style.referenceTags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>色板</h2>
          <p className="muted">夜空墨蓝 + 菊金 + 灯笼暖色 + 点缀玫粉，避免通篇紫雾。</p>
          <div className="palette">
            {style.palette.map((color) => (
              <div key={color} className="swatch" style={{ background: color }} title={color} />
            ))}
          </div>
          <div className="meta-row">
            {style.palette.map((color) => (
              <span className="chip" key={`hex-${color}`}>
                {color}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="stack">
        <article className="panel prompt-box">
          <h2>Global Style Prompt</h2>
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={async () => {
                await copyText(style.globalStylePrompt);
                show('已复制全局风格提示词');
              }}
            >
              复制
            </button>
          </div>
          <textarea className="field" readOnly value={style.globalStylePrompt} />
        </article>

        <article className="panel prompt-box">
          <h2>Global Negative Prompt</h2>
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={async () => {
                await copyText(style.globalNegativePrompt);
                show('已复制负向提示词');
              }}
            >
              复制
            </button>
          </div>
          <textarea className="field" readOnly value={style.globalNegativePrompt} />
        </article>
      </div>
      {Toast}
    </div>
  );
}
