import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: '总览', end: true },
  { to: '/script', label: '剧本' },
  { to: '/characters', label: '角色' },
  { to: '/storyboard', label: '分镜' },
  { to: '/style', label: '风格' },
  { to: '/export', label: '导出' },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">聊斋工坊</span>
          <span className="brand-sub">Liaozhai Studio</span>
        </div>
        <nav className="nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
