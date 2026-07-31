import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RandomStoryModal({ isOpen, onClose, stories, onShowStoryDetails }) {
  if (!isOpen || stories.length === 0) return null;

  const [randomStory, setRandomStory] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * stories.length);
      setRandomStory(stories[idx]);
      setIsSpinning(false);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5 }
      });
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      pickRandom();
    }
  }, [isOpen]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          maxWidth: '550px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem' }}>🎲</span>
            <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }} className="gradient-text">
              Rastgele Absürt Anı
            </h2>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {isSpinning || !randomStory ? (
          <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>
            <RefreshCw size={32} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>Absürt anı çekiliyor...</p>
          </div>
        ) : (
          <div className="animate-fade-in" style={{
            background: 'var(--bg-input)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>{randomStory.authorAvatar || '🥷'}</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{randomStory.authorName}</span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
              {randomStory.title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxHeight: '200px', overflowY: 'auto' }}>
              {randomStory.content}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            className="btn-secondary" 
            onClick={pickRandom}
            disabled={isSpinning}
          >
            <RefreshCw size={16} /> Bir Tane Daha Çek 🎲
          </button>

          <button 
            className="btn-primary" 
            onClick={onClose}
          >
            Kapat & Akışa Dön
          </button>
        </div>
      </div>
    </div>
  );
}
