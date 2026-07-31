import React from 'react';
import { CATEGORIES } from '../data/initialData';
import { Flame, Clock, MessageSquare, Bookmark } from 'lucide-react';

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
  bookmarkCount
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
      {/* Top Bar: Sorts & Bookmark Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Sort Buttons */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-glass)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => { setSortBy('latest'); setShowOnlyBookmarks(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: sortBy === 'latest' && !showOnlyBookmarks ? '#ffffff' : 'var(--text-muted)',
              background: sortBy === 'latest' && !showOnlyBookmarks ? 'var(--accent-primary)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <Clock size={14} />
            <span>En Yeni</span>
          </button>

          <button
            onClick={() => { setSortBy('popular'); setShowOnlyBookmarks(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: sortBy === 'popular' && !showOnlyBookmarks ? '#ffffff' : 'var(--text-muted)',
              background: sortBy === 'popular' && !showOnlyBookmarks ? 'var(--accent-primary)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <Flame size={14} />
            <span>Popüler</span>
          </button>

          <button
            onClick={() => { setSortBy('comments'); setShowOnlyBookmarks(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: sortBy === 'comments' && !showOnlyBookmarks ? '#ffffff' : 'var(--text-muted)',
              background: sortBy === 'comments' && !showOnlyBookmarks ? 'var(--accent-primary)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <MessageSquare size={14} />
            <span>Çok Yorumlanan</span>
          </button>
        </div>

        {/* Bookmarks Toggle */}
        <button
          onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: showOnlyBookmarks ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'var(--bg-glass)',
            color: showOnlyBookmarks ? '#ffffff' : 'var(--text-main)',
            border: '1px solid var(--border-color)',
            boxShadow: showOnlyBookmarks ? '0 4px 12px rgba(245, 158, 11, 0.4)' : 'none'
          }}
        >
          <Bookmark size={15} fill={showOnlyBookmarks ? '#ffffff' : 'none'} />
          <span>Favorilerim</span>
          {bookmarkCount > 0 && (
            <span style={{
              background: showOnlyBookmarks ? 'rgba(0,0,0,0.2)' : 'var(--accent-amber)',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '0.75rem'
            }}>
              {bookmarkCount}
            </span>
          )}
        </button>
      </div>

      {/* Categories Horizontal Pill Scroll */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        scrollbarWidth: 'none'
      }}>
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 'var(--radius-full)',
                whiteSpace: 'nowrap',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isSelected ? cat.color : 'var(--bg-glass)',
                color: isSelected ? '#ffffff' : 'var(--text-muted)',
                border: isSelected ? `1px solid ${cat.color}` : '1px solid var(--border-color)',
                boxShadow: isSelected ? `0 4px 14px ${cat.color}40` : 'none',
                transition: 'all 0.2s'
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
