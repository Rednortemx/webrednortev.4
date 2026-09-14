import Link from 'next/link';

export default function InsightAuthor({ author }) {
  if (!author) return null;

  return (
    <aside className="insight-author">
      <div>
        <p className="insight-small-label">SOBRE EL AUTOR</p>
        <h2>{author.name}</h2>
        <p className="insight-author-role">{author.role}</p>
        <p>{author.bio}</p>
      </div>
      <div className="insight-author-actions">
        <Link href={author.profileHref}>Ver perfil</Link>
        {author.linkedin && (
          <a href={author.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        )}
      </div>
    </aside>
  );
}
