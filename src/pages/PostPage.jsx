import { useLoaderData, Link } from 'react-router-dom';

function PostPage() {
  const post = useLoaderData();

  return (
    <article className="post-detail">
      <header className="post-hero">
        <div className="post-info">
          <p className="post-breadcrumb">
            {post.date} · dearpanda · {post.tags.join(' · ')}
          </p>
          <h1>{post.title}</h1>
          <p className="post-summary">{post.summary}</p>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="post-actions">
            <Link className="ghost-btn" to="/blog">
              ← 返回博客主页
            </Link>
            {post.externalLink ? (
              <a className="primary-btn" href={post.externalLink} target="_blank" rel="noreferrer">
                阅读原文
              </a>
            ) : null}
          </div>
        </div>
        <div className="post-meta-grid">
          <div className="meta-card">
            <span>创作时间</span>
            <strong>{post.date}</strong>
          </div>
          <div className="meta-card">
            <span>主题标签</span>
            <strong>{post.tags.join(' · ')}</strong>
          </div>
          <div className="meta-card note">
            <span>现场记录</span>
            <p>{post.heroNote}</p>
          </div>
        </div>
      </header>

      <section className="post-sections">
        {post.sections.map((section) => (
          <article className="post-section" key={section.heading}>
            <div className="section-heading">
              <span>章节</span>
              <h2>{section.heading}</h2>
            </div>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </section>
    </article>
  );
}

export default PostPage;

