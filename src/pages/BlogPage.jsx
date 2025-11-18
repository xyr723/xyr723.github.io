import { Link } from 'react-router-dom';
import {
  LuSquarePen,
  LuBookOpenCheck,
  LuClock4,
  LuLink,
  LuBookmark,
  LuTag,
  LuRss,
  LuCalendarRange,
} from 'react-icons/lu';
import { FaArrowRight } from 'react-icons/fa';
import posts from '../data/posts.js';

const profileStats = [
  { label: '文章', value: '27' },
  { label: '标签', value: '64' },
  { label: '系列', value: '8' },
];

const quickLinks = [
  { label: '友链', href: 'https://your-blog-link.com/friends' },
  { label: 'Newsletter', href: 'https://your-blog-link.com/newsletter' },
  { label: '归档', href: 'https://your-blog-link.com/archive' },
];

const readingQueue = [
  { title: '设计系统的语气与网格', note: '正在做标注梳理' },
  { title: 'Whitted-Style 光线追踪', note: '补一篇图形学学习札记' },
  { title: '写作与产品的武器库', note: '拆掉老稿子的结构' },
];

function BlogPage() {
  return (
    <div className="blog-page dark-theme">
      <div className="blog-layout">
        <section className="blog-main">
          <header className="blog-list-header">
            <div>
              <p className="eyebrow">dearpanda · logbook</p>
              <h1>写一点真实的路程与代码</h1>
              <p>记录产品、写作和深夜学习的交界地，尽量把每篇文章写成能立即复用的手册。</p>
            </div>
            <div className="list-meta">
              <LuClock4 />
              最近更新 · {posts[0]?.date}
            </div>
          </header>

          <div className="posts-feed">
            {posts.map((post) => (
              <article className="feed-card" key={post.slug}>
                <div className="feed-card__meta">
                  <span className="meta-item">
                    <LuCalendarRange />
                    {post.date}
                  </span>
                  <span className="meta-item">
                    <LuTag />
                    {post.tags.join(' / ')}
                  </span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <div className="feed-card__footer">
                  <div className="feed-card__tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-link">
                    阅读全文 <FaArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="blog-sidebar">
          <div className="sidebar-card profile-card">
            <div className="avatar">dp</div>
            <h3>dearpanda</h3>
            <p className="subtitle">一个热爱写作的前端设计师，分享正在做的实验。</p>
            <div className="profile-stats">
              {profileStats.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.value}</span>
                  <small>{stat.label}</small>
                </div>
              ))}
            </div>
            <a className="primary-btn block" href="https://your-blog-link.com" target="_blank" rel="noreferrer">
              <LuRss />
              订阅 RSS
            </a>
          </div>

          <div className="sidebar-card">
            <h4>
              <LuSquarePen />
              正在写
            </h4>
            <ul className="stacked-list">
              {readingQueue.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-card">
            <h4>
              <LuBookOpenCheck />
              快捷入口
            </h4>
            <div className="link-grid">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  <LuLink />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h4>
              <LuBookmark />
              最新文章
            </h4>
            <ul className="stacked-list compact">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  <small>{post.date}</small>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BlogPage;

