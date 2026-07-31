import React, { useState } from 'react';
import { AVATARS } from '../data/initialData';
import { X, Save, Download, Upload, Bookmark, BookOpen, Award } from 'lucide-react';
import { exportAppData, importAppData } from '../services/storage';

export default function UserProfileModal({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  userStories = [],
  bookmarkedStories = [],
  onRefreshData,
  onShowToast
}) {
  if (!isOpen) return null;

  const [username, setUsername] = useState(userProfile.username || 'GizliGezgin');
  const [avatar, setAvatar] = useState(userProfile.avatar || '🕵️‍♂️');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'my_stories' | 'bookmarks'

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile({ username: username.trim(), avatar });
    onShowToast('Profil bilgileriniz kaydedildi! ✨');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content) {
        const success = importAppData(content);
        if (success) {
          onRefreshData();
          onShowToast('Yedek veriler başarıyla içe aktarıldı! 🎉');
        } else {
          onShowToast('Geçersiz yedek dosyası formatı! ❌');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>{avatar}</span>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{username}</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Profilim & İstatistiklerim</span>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: activeTab === 'profile' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'profile' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Profil Ayarları
          </button>
          <button
            onClick={() => setActiveTab('my_stories')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: activeTab === 'my_stories' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'my_stories' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Paylaşımlarım ({userStories.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: activeTab === 'bookmarks' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'bookmarks' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Favorilerim ({bookmarkedStories.length})
          </button>
        </div>

        {activeTab === 'profile' && (
          <div>
            {/* Badges / Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <BookOpen size={18} color="#6366f1" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{userStories.length}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Anı Paylaştın</div>
              </div>
              <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <Bookmark size={18} color="#f59e0b" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{bookmarkedStories.length}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Kaydedilen Anı</div>
              </div>
              <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <Award size={18} color="#a855f7" style={{ marginBottom: '4px' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Absürt Usta</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rozet Seviyesi</div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                  Kullanıcı Adınız
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                  Avatarınızı Seçin
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {AVATARS.map(a => (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => setAvatar(a.emoji)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1.3rem',
                        background: avatar === a.emoji ? 'rgba(99, 102, 241, 0.3)' : 'var(--bg-input)',
                        border: avatar === a.emoji ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)'
                      }}
                    >
                      {a.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} /> Kaydet
              </button>
            </form>

            {/* Data Export / Import Section */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Veri Yönetimi & Yedekleme</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Paylaştığınız anıları ve kaydedilenlerinizi başka bir cihazda kullanmak üzere dışa/içe aktarabilirsiniz.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button type="button" className="btn-secondary" onClick={exportAppData}>
                  <Download size={15} /> Verileri İndir (JSON)
                </button>
                
                <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                  <Upload size={15} /> Veri Yükle
                  <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my_stories' && (
          <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {userStories.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>
                Henüz kendi adınızla bir anı paylaşmadınız.
              </p>
            ) : (
              userStories.map(story => (
                <div key={story.id} style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '10px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0' }}>{story.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{story.content.slice(0, 100)}...</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {bookmarkedStories.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>
                Kaydedilen hiçbir anı bulunamadı.
              </p>
            ) : (
              bookmarkedStories.map(story => (
                <div key={story.id} style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '10px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0' }}>{story.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{story.content.slice(0, 100)}...</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
