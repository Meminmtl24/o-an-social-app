import { INITIAL_STORIES } from '../data/initialData';

const STORAGE_KEY = 'o_an_stories_v1';
const BOOKMARKS_KEY = 'o_an_bookmarks_v1';
const USER_REACTIONS_KEY = 'o_an_user_reactions_v1';
const CURRENT_USER_KEY = 'o_an_user_profile_v1';

export const getStoredStories = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORIES));
      return INITIAL_STORIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error);
    return INITIAL_STORIES;
  }
};

export const saveStories = (stories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  } catch (error) {
    console.error('LocalStorage kaydetme hatası:', error);
  }
};

export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleBookmarkInStorage = (storyId) => {
  const bookmarks = getBookmarks();
  let updated;
  if (bookmarks.includes(storyId)) {
    updated = bookmarks.filter(id => id !== storyId);
  } else {
    updated = [...bookmarks, storyId];
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return updated;
};

export const getUserReactions = () => {
  try {
    const data = localStorage.getItem(USER_REACTIONS_KEY);
    return data ? JSON.parse(data) : {}; // { [storyId]: 'laugh' | 'mindblown' | 'cringe' | 'heart' }
  } catch {
    return {};
  }
};

export const saveUserReaction = (storyId, reactionType) => {
  const reactions = getUserReactions();
  if (reactions[storyId] === reactionType) {
    delete reactions[storyId]; // Toggle off
  } else {
    reactions[storyId] = reactionType;
  }
  localStorage.setItem(USER_REACTIONS_KEY, JSON.stringify(reactions));
  return reactions;
};

export const addStoryToStorage = (newStory) => {
  const stories = getStoredStories();
  const story = {
    id: `story-${Date.now()}`,
    createdAt: new Date().toISOString(),
    reactions: { laugh: 0, mindblown: 0, cringe: 0, heart: 0 },
    comments: [],
    ...newStory
  };
  const updated = [story, ...stories];
  saveStories(updated);
  return updated;
};

export const addReactionToStory = (storyId, reactionType) => {
  const stories = getStoredStories();
  const userReactions = getUserReactions();
  const previousReaction = userReactions[storyId];

  const updatedStories = stories.map(story => {
    if (story.id === storyId) {
      const newReactions = { ...story.reactions };

      // Önceki tepkiyi eksilt
      if (previousReaction && newReactions[previousReaction] > 0) {
        newReactions[previousReaction] -= 1;
      }

      // Aynı tepkiye basılmadıysa yeni tepkiyi arttır
      if (previousReaction !== reactionType) {
        newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
      }

      return { ...story, reactions: newReactions };
    }
    return story;
  });

  saveStories(updatedStories);
  const updatedUserReactions = saveUserReaction(storyId, reactionType);
  return { updatedStories, updatedUserReactions };
};

export const addCommentToStory = (storyId, commentData) => {
  const stories = getStoredStories();
  const newComment = {
    id: `c-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...commentData
  };

  const updatedStories = stories.map(story => {
    if (story.id === storyId) {
      return {
        ...story,
        comments: [...story.comments, newComment]
      };
    }
    return story;
  });

  saveStories(updatedStories);
  return updatedStories;
};

export const getUserProfile = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : { username: 'GizliGezgin', avatar: '🕵️‍♂️', isAnonymous: true };
  } catch {
    return { username: 'GizliGezgin', avatar: '🕵️‍♂️', isAnonymous: true };
  }
};

export const saveUserProfile = (profile) => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error(err);
  }
};

export const exportAppData = () => {
  const stories = getStoredStories();
  const bookmarks = getBookmarks();
  const profile = getUserProfile();

  const exportData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    stories,
    bookmarks,
    profile
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `o-an-anilar-yedek-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importAppData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data && Array.isArray(data.stories)) {
      saveStories(data.stories);
      if (Array.isArray(data.bookmarks)) localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(data.bookmarks));
      if (data.profile) saveUserProfile(data.profile);
      return true;
    }
    return false;
  } catch (err) {
    console.error('İçe aktarma hatası:', err);
    return false;
  }
};
