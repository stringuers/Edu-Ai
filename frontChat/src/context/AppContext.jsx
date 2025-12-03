import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@constants/config';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Charger les données utilisateur depuis le localStorage
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setUser(settings);
    }
  }, []);

  const updateUserSettings = (settings) => {
    setUser(prev => ({ ...prev, ...settings }));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...user, ...settings }));
  };

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto-remove après 5 secondes
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value = {
    user,
    loading,
    setLoading,
    updateUserSettings,
    notifications,
    addNotification,
    removeNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};