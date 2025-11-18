import { Link } from 'react-router-dom';
import {
  LuPen,
  LuSparkles,
  LuFeather,
  LuCalendarClock,
  LuNotebookPen,
  LuLink,
} from 'react-icons/lu';
import { FaBookOpen, FaRegStar } from 'react-icons/fa';
import posts from '../data/posts.js';

const blogStats = [
  { label: '累计文章', value: '68' },
  { label: '年度阅读', value: '129,480' },
  { label: '进行中的草稿', value: '5' },
];

const writingPlans = [
  {
    title: '「粉色留白计划」',
    note: '每周三固定更新长文，把灵感板上的碎片故事慢慢填满。',
  },
  {
    title: '午夜 newsletter',
    note: '用语音 memo + AI 的方式做草稿，第二天早晨整理成 800 字以内的闪念速记。',
  },
];

const timeline = [
  {
    label: '本周主题',
    detail: '调试新的博客封面动画，顺手记录一点 CSS 小技巧。',
  },
  {
    label: '正在阅读',
    detail: '《Designing with Color》 + 《写给大家看的数据分析》',
  },
  {
    label: '灵感摘录',
    detail: '“把日常的细小心跳记录下来，它们会在未来突然发光。”',
  },
];

const inspirations = [
  '写完「城市碎光」系列后想试试声画结合的形式',
  '想把博客导航换成胶囊形态，再加一条滚动的小宇宙动态',
  '做一个“灵感篓子”，让语音和手写草稿都能同步到页面',
];

function BlogPage() {
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="hero-primary">
          <div className="hero-icon">
            <LuPen />
          </div>
          <div>
            <p className="hero-subtitle">dearpanda · 温柔创作中</p>
            <h1 className="hero-title">把生活的碎光，写进粉色的个人博客</h1>
            <p className="hero-description">
              记录城市、代码和深夜写作的闪光时刻，试图用一点点耐心让博客像胶片一样慢慢冲洗成色。
            </p>
            <div className="hero-actions">
              <a
                className="primary-btn"
                href="https://your-blog-link.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaBookOpen />
                进入博客
              </a>
              <button className="ghost-btn" type="button">
                <LuNotebookPen />
                草稿箱
              </button>
            </div>
            <div className="hero-stats">
              {blogStats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-sidecard">
          <div className="sidecard-header">
            <LuFeather />
            一周小记
          </div>
          <ul className="sidecard-list">
            <li>🌙 把夜读心得做成了手写贴纸版</li>
            <li>🧊 新增了滚动渐变的封面图层动画</li>
            <li>🎧 和朋友录了期“写作播客”准备上架</li>
          </ul>
          <a
            className="sidecard-link"
            href="https://your-blog-link.com/highlights"
            target="_blank"
            rel="noreferrer"
          >
            查看完整周记
            <LuLink />
          </a>
        </div>
      </section>

      <section className="blog-sections">
        <div className="blog-section featured-posts">
          <div className="section-title">
            <LuSparkles />
            近期精华
          </div>
          <div className="posts-list">
            {posts.map((post) => (
              <article className="post-card" key={post.title}>
                <div className="post-head">
                  <span className="post-date">{post.date}</span>
                  <FaRegStar />
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <div className="post-meta">
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    阅读更多
                    <LuLink />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="blog-section writing-plans">
          <div className="section-title">
            <LuNotebookPen />
            写作计划
          </div>
          <div className="plans-list">
            {writingPlans.map((plan) => (
              <div className="plan-card" key={plan.title}>
                <h4>{plan.title}</h4>
                <p>{plan.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-sections secondary">
        <div className="blog-section timeline">
          <div className="section-title">
            <LuCalendarClock />
            今日状态
          </div>
          <ul>
            {timeline.map((item) => (
              <li key={item.label}>
                <span className="timeline-label">{item.label}</span>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="blog-section inspirations">
          <div className="section-title">
            <LuFeather />
            灵感盆栽
          </div>
          <ul>
            {inspirations.map((idea, idx) => (
              <li key={idea}>
                <span>{idx + 1 < 9 ? `0${idx + 1}` : idx + 1}</span>
                <p>{idea}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;

