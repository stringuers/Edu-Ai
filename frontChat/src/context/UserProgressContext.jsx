import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@constants/config';

const UserProgressContext = createContext();

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within UserProgressProvider');
  }
  return context;
};

export const UserProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    chatbotCompleted: 0,
    imageRecognitionCompleted: 0,
    textClassificationCompleted: 0,
    totalExperiments: 0,
    achievements: []
  });

  useEffect(() => {
    // Charger la progression depuis le localStorage
    const savedProgress = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (module, value) => {
    setProgress(prev => {
      const updated = { ...prev, [module]: value };
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updated));
      return updated;
    });
  };

  const incrementExperiments = () => {
    updateProgress('totalExperiments', progress.totalExperiments + 1);
  };

  const addAchievement = (achievement) => {
    if (!progress.achievements.includes(achievement)) {
      setProgress(prev => {
        const updated = {
          ...prev,
          achievements: [...prev.achievements, achievement]
        };
        localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updated));
        return updated;
      });
    }
  };

  const resetProgress = () => {
    const initialProgress = {
      chatbotCompleted: 0,
      imageRecognitionCompleted: 0,
      textClassificationCompleted: 0,
      totalExperiments: 0,
      achievements: []
    };
    setProgress(initialProgress);
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(initialProgress));
  };

  const value = {
    progress,
    updateProgress,
    incrementExperiments,
    addAchievement,
    resetProgress
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};