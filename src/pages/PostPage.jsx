import { useLoaderData, Link } from 'react-router-dom';

function PostPage() {
  const post = useLoaderData();

  return (
    <article className="blog-page post-detail">
      <header className="blog-hero">
        <div className="hero-primary">
          <p className="hero-subtitle">{post.date} · dearpanda</p>
          <h1 className="hero-title">{post.title}</h1>
          <p className="hero-description">{post.summary}</p>
          <div className="hero-actions">
            <Link className="ghost-btn" to="/blog">
              ← 返回博客主页
            </Link>
            {post.externalLink ? (
              <a className="primary-btn" href={post.externalLink} target="_blank" rel="noreferrer">
                阅读原文
              </a>
            ) : null}
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">{post.date}</span>
              <span className="stat-label">创作时间</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{post.tags.join(' · ')}</span>
              <span className="stat-label">主题标签</span>
            </div>
          </div>
        </div>
        <div className="hero-sidecard">
          <div className="sidecard-header">现场记录</div>
          <p>{post.heroNote}</p>
        </div>
      </header>

      {post.sections.map((section) => (
        <section className="post-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </article>
  );
}

export default PostPage;

