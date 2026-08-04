import { Link } from 'react-router-dom';
import { getProject } from '../data/projects';

const project = getProject('huang-ying')!;

export function OverviewPage() {
  return (
    <div className="page">
      <section className="hero-panel">
        <span className="eyebrow">EP 01 · 聊斋短动画生产线</span>
        <h1 className="hero-title">黄英</h1>
        <p className="hero-lead">{project.logline}</p>
        <div className="meta-row">
          <span className="chip">{project.source}</span>
          <span className="chip">{project.targetDurationSec}s</span>
          <span className="chip">{project.aspectRatio}</span>
          <span className="chip">{project.platform}</span>
        </div>
        <div className="home-cta">
          <Link className="btn btn-primary" to="/storyboard">
            进入分镜生产
          </Link>
          <Link className="btn" to="/script">
            查看改编剧本
          </Link>
          <Link className="btn btn-ghost" to="/export">
            导出提示词包
          </Link>
        </div>
      </section>

      <div className="workflow-steps">
        {[
          { n: '01', t: '剧本', d: '节拍、旁白、对白、改编注', to: '/script' },
          { n: '02', t: '角色', d: '外形服装与一致性提示词', to: '/characters' },
          { n: '03', t: '分镜', d: '景别运镜 + 图/视频提示词', to: '/storyboard' },
          { n: '04', t: '风格', d: '全局画风、色板、光影', to: '/style' },
          { n: '05', t: '导出', d: 'Markdown / JSON 生产包', to: '/export' },
        ].map((step) => (
          <Link key={step.n} className="step" to={step.to}>
            <div className="step-num">STEP {step.n}</div>
            <h3>{step.t}</h3>
            <p>{step.d}</p>
          </Link>
        ))}
      </div>

      <div className="grid-2">
        <article className="panel">
          <h2>本集改编策略</h2>
          <p>{project.adaptationSummary}</p>
        </article>
        <article className="panel">
          <h2>质量门禁</h2>
          <p className="muted">每次导出前过一遍，保证系列观感稳定。</p>
          <ul className="checklist" style={{ marginTop: '0.85rem' }}>
            {project.qualityChecklist.slice(0, 4).map((item) => (
              <li key={item}>
                <span style={{ color: 'var(--gold)' }}>●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
