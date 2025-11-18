
import './App.css';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import {
  LuSparkles,
  LuCalendarClock,
  LuCompass,
  LuCalculator,
  LuNotebookPen,
} from 'react-icons/lu';
import BlogPage from './pages/BlogPage.jsx';

const tools = [
  {
    name: '个人博客',
    description: '写字的据点',
    link: 'https://your-blog-link.com',
    icon: <LuSparkles />,
  },
  {
    name: '写作日历',
    description: '灵感补给站',
    link: '#',
    icon: <LuCalendarClock />,
  },
  {
    name: '导航实验室',
    description: '设计草图',
    link: '#',
    icon: <LuCompass />,
  },
  {
    name: '可爱计算器',
    description: '快速算一算',
    link: '#',
    icon: <LuCalculator />,
  },
];

function HomePage() {
  return (
    <div className="page-content">
      <section className="home-hero">
        <div>
          <p className="hero-subtitle">HOME · TOOLBOX</p>
          <h1>dearpanda 的工具台</h1>
          <p>
            这里放着我常用的小工具、灵感草稿和写字捷径，粉色的界面让日常也能亮晶晶。
          </p>
        </div>
        <div className="hero-icon-bubble">
          <LuNotebookPen />
        </div>
      </section>
      <section className="toolbox-container">
        <h2 className="toolbox-title">工具箱</h2>
        <div className="toolbox-grid">
          {tools.map(({ name, link, icon, description }) => (
            <a
              className="toolbox-item"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={name}
            >
              <div className="toolbox-icon">
                {icon}
              </div>
              <span className="toolbox-label">{name}</span>
              {description ? <p className="toolbox-desc">{description}</p> : null}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="logo" to="/">
          dearpanda
        </Link>
        <nav className="site-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            首页
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            个人博客
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
