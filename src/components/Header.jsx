import React from 'react';
import { Search, PlusCircle, Sparkles, User, Sun, Moon } from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  onOpenNewStory,
  onOpenRandomStory,
  onOpenProfile,
  theme,
  toggleTheme,
  userProfile
}) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      zIndex: 100,
      marginBottom: '24px',
      padding: '12px 20px',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setSearchTerm('')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            fontSize: '1.8rem',
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            🤪
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, lineHeight: 1 }} className="gradient-text">
              O An!
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Absürt & Komik Anı Platformu
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1',
          maxWidth: '360px',
          minWidth: '220px'
        }}>
          <Search 
            size={18} 
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} 
          />
          <input
            type="text"
            placeholder="Anılarda veya etiketlerde ara... (#okul, #metrobüs)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.2s'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                fontSize: '0.8rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={onOpenRandomStory}
            title="Sana özel rastgele bir anı getir"
          >
            <Sparkles size={18} color="#f59e0b" />
            <span style={{ display: 'none', minWidth: '700px', inline: 'inline' }}>Rastgele Anı</span>
            <span>Şansımı Dene 🎲</span>
          </button>

          <button className="btn-primary" onClick={onOpenNewStory}>
            <PlusCircle size={18} />
            <span>Anı Paylaş</span>
          </button>

          <button 
            onClick={toggleTheme}
            style={{
              padding: '10px',
              borderRadius: '50%',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={theme === 'dark' ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç'}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          <button 
            onClick={onOpenProfile}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
            title="Profilim & Kaydedilenler"
          >
            <span style={{ fontSize: '1.2rem' }}>{userProfile.avatar || '🕵️‍♂️'}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userProfile.username || 'Profil'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
