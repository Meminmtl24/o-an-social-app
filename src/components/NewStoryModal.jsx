import React, { useState } from 'react';
import { CATEGORIES, AVATARS } from '../data/initialData';
import { X, Sparkles, Shield, User, Eye, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NewStoryModal({ isOpen, onClose, onSubmitStory, userProfile }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('absurd');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [authorName, setAuthorName] = useState(userProfile.username || 'GizliGezgin');
  const [authorAvatar, setAuthorAvatar] = useState(userProfile.avatar || '🕵️‍♂️');
  const [tagsInput, setTagsInput] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Etiketleri parse et (# koyarak)
    const formattedTags = tagsInput
      .split(/[\s,]+/)
      .filter(t => t.trim().length > 0)
      .map(t => t.startsWith('#') ? t : `#${t}`);

    onSubmitStory({
      title: title.trim(),
      content: content.trim(),
      category,
      isAnonymous,
      authorName: isAnonymous ? 'Anonim Yolcu' : (authorName.trim() || 'Gizli Üye'),
      authorAvatar: isAnonymous ? '🥷' : authorAvatar,
      tags: formattedTags
    });

    // Kutlama konfetisi
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              ✍️
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }} className="gradient-text">
                O Anı Paylaş!
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Başından geçen absürt veya komik bir olayı anlat, herkes okusun.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ color: 'var(--text-muted)', padding: '6px', borderRadius: '50%', background: 'var(--bg-glass)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Toggle: Düzenle vs Önizleme */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          <button
            type="button"
            onClick={() => setIsPreviewMode(false)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: !isPreviewMode ? 'var(--accent-primary)' : 'transparent',
              color: !isPreviewMode ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <Edit3 size={14} /> Düzenle
          </button>
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isPreviewMode ? 'var(--accent-primary)' : 'transparent',
              color: isPreviewMode ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <Eye size={14} /> Canlı Önizleme
          </button>
        </div>

        {isPreviewMode ? (
          /* PREVIEW BOX */
          <div style={{
            background: 'var(--bg-input)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>{isAnonymous ? '🥷' : authorAvatar}</span>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>{isAnonymous ? 'Anonim Yolcu' : (authorName || 'Üye')}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Şimdi</span>
              </div>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{title || '(Başlık Buraya Gelecek)'}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
              {content || '(Anı metniniz burada görünecek...)'}
            </p>
          </div>
        ) : (
          /* EDIT FORM */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Anonymous Toggle */}
            <div style={{
              background: 'var(--bg-input)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isAnonymous ? <Shield size={20} color="#a855f7" /> : <User size={20} color="#3b82f6" />}
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {isAnonymous ? 'Anonim Olarak Paylaş' : 'Kullanıcı Adı İle Paylaş'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {isAnonymous ? 'Kimliğin gizli kalır, ismin görünmez.' : 'Belirlediğin isim ve avatar görünür.'}
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* If Not Anonymous: Select Username & Avatar */}
            {!isAnonymous && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Takma adın..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                    Avatar Seç
                  </label>
                  <select
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {AVATARS.map(a => (
                      <option key={a.id} value={a.emoji}>{a.emoji} {a.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Category Select */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                Kategori Seç
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: category === cat.id ? cat.color : 'var(--bg-input)',
                      color: category === cat.id ? '#ffffff' : 'var(--text-muted)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                Anı Başlığı
              </label>
              <input
                type="text"
                placeholder="Örn: Otobüste Başımı Yakan O An..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Story Content Textarea */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                Anı Detayı
              </label>
              <textarea
                placeholder="Ne oldu, nerede oldu, kimler vardı? Detaylarıyla anlat..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Tags Input */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                Etiketler (Virgülle veya boşlukla ayır)
              </label>
              <input
                type="text"
                placeholder="okul, metrobüs, komik, düğün"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            {/* Submit & Cancel Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Vazgeç
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={!title.trim() || !content.trim()}
                style={{
                  opacity: (!title.trim() || !content.trim()) ? 0.5 : 1,
                  cursor: (!title.trim() || !content.trim()) ? 'not-allowed' : 'pointer'
                }}
              >
                <Sparkles size={16} /> Paylaş!
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
