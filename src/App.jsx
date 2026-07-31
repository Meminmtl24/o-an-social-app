import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StoryCard from './components/StoryCard';
import NewStoryModal from './components/NewStoryModal';
import RandomStoryModal from './components/RandomStoryModal';
import UserProfileModal from './components/UserProfileModal';
import {
  getStoredStories,
  addStoryToStorage,
  addReactionToStory,
  addCommentToStory,
  getBookmarks,
  toggleBookmarkInStorage,
  getUserReactions,
  getUserProfile,
  saveUserProfile
} from './services/storage';
import { Sparkles, TrendingUp, Info, Laugh, ShieldAlert, Heart, Github } from 'lucide-react';

export default function App() {
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [userReactions, setUserReactions] = useState({});
  const [userProfile, setUserProfile] = useState({ username: 'GizliGezgin', avatar: '🕵️‍♂️', isAnonymous: true });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'popular' | 'comments'
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Modals state
  const [isNewStoryOpen, setIsNewStoryOpen] = useState(false);
  const [isRandomStoryOpen, setIsRandomStoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Initial Load
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setStories(getStoredStories());
    setBookmarks(getBookmarks());
    setUserReactions(getUserReactions());
    setUserProfile(getUserProfile());
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Reactions
  const handleReaction = (storyId, reactionType) => {
    const { updatedStories, updatedUserReactions } = addReactionToStory(storyId, reactionType);
    setStories(updatedStories);
    setUserReactions(updatedUserReactions);
  };

  // Bookmarks
  const handleToggleBookmark = (storyId) => {
    const updated = toggleBookmarkInStorage(storyId);
    setBookmarks(updated);
    if (updated.includes(storyId)) {
      showToast('Anı favorilere eklendi! ⭐');
    } else {
      showToast('Anı favorilerden çıkarıldı.');
    }
  };

  // Comments
  const handleAddComment = (storyId, commentData) => {
    const updatedStories = addCommentToStory(storyId, commentData);
    setStories(updatedStories);
    showToast('Yorumunuz başarıyla gönderildi! 💬');
  };

  // New Story Submit
  const handleNewStorySubmit = (newStory) => {
    const updatedStories = addStoryToStorage(newStory);
    setStories(updatedStories);
    showToast('Anınız toplulukla paylaşıldı! 🎉');
  };

  // Save Profile
  const handleSaveProfile = (newProfile) => {
    const updated = { ...userProfile, ...newProfile };
    setUserProfile(updated);
    saveUserProfile(updated);
  };

  // Filter & Sort Logic
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      // Category filter
      if (selectedCategory !== 'all' && story.category !== selectedCategory) {
        return false;
      }
      // Bookmark filter
      if (showOnlyBookmarks && !bookmarks.includes(story.id)) {
        return false;
      }
      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const inTitle = story.title?.toLowerCase().includes(query);
        const inContent = story.content?.toLowerCase().includes(query);
        const inAuthor = story.authorName?.toLowerCase().includes(query);
        const inTags = story.tags?.some(t => t.toLowerCase().includes(query));
        if (!inTitle && !inContent && !inAuthor && !inTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        const totalReactionsA = Object.values(a.reactions || {}).reduce((acc, curr) => acc + curr, 0);
        const totalReactionsB = Object.values(b.reactions || {}).reduce((acc, curr) => acc + curr, 0);
        return totalReactionsB - totalReactionsA;
      }
      if (sortBy === 'comments') {
        return (b.comments?.length || 0) - (a.comments?.length || 0);
      }
      // Default: Latest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [stories, selectedCategory, showOnlyBookmarks, bookmarks, searchTerm, sortBy]);

  // Top Tags Computation
  const topTags = useMemo(() => {
    const tagCounts = {};
    stories.forEach(s => {
      (s.tags || []).forEach(t => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [stories]);

  const userStories = useMemo(() => {
    return stories.filter(s => !s.isAnonymous && s.authorName === userProfile.username);
  }, [stories, userProfile]);

  const bookmarkedStoriesList = useMemo(() => {
    return stories.filter(s => bookmarks.includes(s.id));
  }, [stories, bookmarks]);

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenNewStory={() => setIsNewStoryOpen(true)}
        onOpenRandomStory={() => setIsRandomStoryOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        userProfile={userProfile}
      />

      {/* Main Container Layout: Left Content (Feed) & Right Sidebar */}
      <div className="main-content">
        {/* Left Side: Story Feed */}
        <main>
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showOnlyBookmarks={showOnlyBookmarks}
            setShowOnlyBookmarks={setShowOnlyBookmarks}
            bookmarkCount={bookmarks.length}
          />

          {/* Stories List */}
          {filteredStories.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Hiç Anı Bulunamadı</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                Arama kriterlerinize veya seçili kategoriye uygun anı yok.
              </p>
              <button 
                className="btn-primary" 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setShowOnlyBookmarks(false); }}
              >
                Tüm Filtreleri Temizle
              </button>
            </div>
          ) : (
            filteredStories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                onReaction={handleReaction}
                userReaction={userReactions[story.id]}
                isBookmarked={bookmarks.includes(story.id)}
                onToggleBookmark={handleToggleBookmark}
                onAddComment={handleAddComment}
                onTagClick={(tag) => setSearchTerm(tag)}
                userProfile={userProfile}
                onShowToast={showToast}
              />
            ))
          )}
        </main>

        {/* Right Sidebar: Trends, Info, & Rules */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Share Banner */}
          <div className="glass-panel" style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15))',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} color="#a855f7" /> Başından Garip Bir Şey mi Geçti?
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Anonim kalarak kimliğin gizli şekilde anını toplulukla paylaş, binlerce kişiyi güldür!
            </p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsNewStoryOpen(true)}>
              Anı Anlat ✍️
            </button>
          </div>

          {/* Trending Tags */}
          {topTags.length > 0 && (
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} color="#f59e0b" /> Popüler Etiketler
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {topTags.map(tag => (
                  <span
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Community Rules & Stats */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={16} color="#3b82f6" /> Platform Kuralları
            </h3>
            <ul style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '16px', lineHeight: 1.6 }}>
              <li>Kullanıcı isimleri ve özel kişisel veriler ifşa edilmez.</li>
              <li>Saygılı ve mizahi dille paylaşım yapılır.</li>
              <li>Tüm verileriniz tarayıcınızda güvendedir.</li>
            </ul>

            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
              O An! © 2026 • GitHub Pages üzerinde Canlıda 🚀
            </div>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <NewStoryModal
        isOpen={isNewStoryOpen}
        onClose={() => setIsNewStoryOpen(false)}
        onSubmitStory={handleNewStorySubmit}
        userProfile={userProfile}
      />

      <RandomStoryModal
        isOpen={isRandomStoryOpen}
        onClose={() => setIsRandomStoryOpen(false)}
        stories={stories}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
        userStories={userStories}
        bookmarkedStories={bookmarkedStoriesList}
        onRefreshData={refreshData}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
