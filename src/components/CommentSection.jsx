import React, { useState } from 'react';
import { Send, UserCheck, ShieldAlert } from 'lucide-react';

export default function CommentSection({ comments = [], onAddComment, userProfile }) {
  const [commentText, setCommentText] = useState('');
  const [isAnon, setIsAnon] = useState(userProfile.isAnonymous ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment({
      content: commentText.trim(),
      isAnonymous: isAnon,
      authorName: isAnon ? 'Anonim Yorumcu' : (userProfile.username || 'Kullanıcı'),
      authorAvatar: isAnon ? '🥷' : (userProfile.avatar || '😊')
    });

    setCommentText('');
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Existing Comments List */}
      {comments.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center', padding: '10px' }}>
          Henüz yorum yapılmamış. İlk yorumu sen yap! 💬
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comments.map((comment) => (
            <div 
              key={comment.id}
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1rem' }}>{comment.authorAvatar || '👤'}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {comment.authorName}
                  </span>
                  {comment.isAnonymous && (
                    <span style={{
                      fontSize: '0.68rem',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: 'var(--accent-primary)',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      Anonim
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, wordBreak: 'break-word' }}>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input 
              type="checkbox"
              checked={isAnon}
              onChange={(e) => setIsAnon(e.target.checked)}
              style={{ accentColor: 'var(--accent-primary)' }}
            />
            {isAnon ? <ShieldAlert size={14} color="#a855f7" /> : <UserCheck size={14} color="#10b981" />}
            <span>{isAnon ? 'Anonim Olarak Yorum Yap' : `Kullanıcı adıyla yorum yap (${userProfile.username})`}</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Ne düşünüyorsun? Saygılı ve eğlenceli yorum yaz..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={!commentText.trim()}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              opacity: commentText.trim() ? 1 : 0.5,
              cursor: commentText.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
