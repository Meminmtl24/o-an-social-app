import React, { useState } from 'react';
import { CATEGORIES } from '../data/initialData';
import CommentSection from './CommentSection';
import { MessageSquare, Bookmark, Share2, Shield, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StoryCard({
  story,
  onReaction,
  userReaction,
  isBookmarked,
  onToggleBookmark,
  onAddComment,
  onTagClick,
  userProfile,
  onShowToast
}) {
  const [showComments, setShowComments] = useState(false);

  const categoryObj = CATEGORIES.find(c => c.id === story.category) || {
    label: story.category,
    emoji: '📝',
    color: '#6366f1'
  };

  const handleReactionClick = (type) => {
    onReaction(story.id, type);
    // Konfeti efekti (Gülme veya Kalp basılırsa)
    if (type === 'laugh' || type === 'heart') {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: type === 'laugh' ? ['#f59e0b', '#fbbf24'] : ['#f43f5e', '#ec4899']
      });
    }
  };

  const handleShare = () => {
    const textToShare = `"${story.title}" - O An! Sosyal Platformunda Oku: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: textToShare,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      onShowToast('Anı bağlantısı panoya kopyalandı! 📋');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const reactionsConfig = [
    { type: 'laugh', emoji: '🤣', label: 'Kahkaha', color: '#f59e0b' },
    { type: 'mindblown', emoji: '🤯', label: 'Absürt', color: '#a855f7' },
    { type: 'cringe', emoji: '🤦‍♂️', label: 'Rezillik', color: '#ef4444' },
    { type: 'heart', emoji: '❤️', label: 'Sevdim', color: '#f43f5e' }
  ];

  return (
    <article className="glass-panel animate-fade-in" style={{
      padding: '24px',
      marginBottom: '20px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      position: 'relative'
    }}>
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        {/* Author & Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            fontSize: '1.4rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {story.authorAvatar || '🥷'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {story.authorName}
              </span>
              {story.isAnonymous ? (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  color: 'var(--accent-purple)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontWeight: 600
                }}>
                  <Shield size={10} /> Anonim
                </span>
              ) : (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: '#3b82f6',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontWeight: 600
                }}>
                  <User size={10} /> Üye
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {formatDate(story.createdAt)}
            </span>
          </div>
        </div>

        {/* Category Pill */}
        <span style={{
          fontSize: '0.8rem',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          background: `${categoryObj.color}20`,
          color: categoryObj.color,
          border: `1px solid ${categoryObj.color}40`,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{categoryObj.emoji}</span>
          <span>{categoryObj.label}</span>
        </span>
      </div>

      {/* Title & Body */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
        {story.title}
      </h2>

      <p style={{
        fontSize: '0.98rem',
        color: 'var(--text-muted)',
        whiteSpace: 'pre-line',
        marginBottom: '16px',
        lineHeight: 1.65
      }}>
        {story.content}
      </p>

      {/* Tags */}
      {story.tags && story.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {story.tags.map((tag, idx) => (
            <span
              key={idx}
              onClick={() => onTagClick(tag)}
              style={{
                fontSize: '0.78rem',
                color: 'var(--accent-primary)',
                background: 'rgba(99, 102, 241, 0.1)',
                padding: '3px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Actions: Reactions, Comments, Bookmark, Share */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)'
      }}>
        {/* Reaction Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {reactionsConfig.map(r => {
            const count = story.reactions?.[r.type] || 0;
            const isSelected = userReaction === r.type;

            return (
              <button
                key={r.type}
                onClick={() => handleReactionClick(r.type)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: isSelected ? `${r.color}25` : 'var(--bg-glass)',
                  border: isSelected ? `1.5px solid ${r.color}` : '1px solid var(--border-color)',
                  color: isSelected ? r.color : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 700 : 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all var(--transition-bounce)'
                }}
                title={r.label}
              >
                <span>{r.emoji}</span>
                <span>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Right side buttons: Comment Toggle, Bookmark, Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: showComments ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              color: showComments ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600
            }}
          >
            <MessageSquare size={16} />
            <span>{(story.comments || []).length} Yorum</span>
          </button>

          <button
            onClick={() => onToggleBookmark(story.id)}
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: isBookmarked ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              color: isBookmarked ? '#f59e0b' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={isBookmarked ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          >
            <Bookmark size={16} fill={isBookmarked ? '#f59e0b' : 'none'} />
          </button>

          <button
            onClick={handleShare}
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Anıyı Paylaş"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Expanded Comment Section */}
      {showComments && (
        <CommentSection
          comments={story.comments || []}
          onAddComment={(commentData) => onAddComment(story.id, commentData)}
          userProfile={userProfile}
        />
      )}
    </article>
  );
}
