import React, { useMemo, useState } from 'react';
import { Plus, Search, MessageSquare } from 'lucide-react';
import Input from '@components/common/Input';

const formatTimestamp = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  try {
    return sameDay
      ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString();
  } catch {
    return d.toISOString().slice(0, 10);
  }
};

const ChatListItem = ({ chat, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-3 rounded-xl transition border
        ${selected ? 'bg-brand-mint/60 border-brand-mint ring-2 ring-brand-mint/50' : 'bg-white border-transparent hover:bg-brand-mint/20'}
        focus:outline-none focus:ring-2 focus:ring-brand-slate/40`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center 
          ${selected ? 'bg-brand-mint text-brand-slate' : 'bg-white border border-brand-grey text-brand-slate'}`}>
          <MessageSquare className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className={`font-semibold truncate ${selected ? 'text-text-primary' : 'text-text-primary'}`}>
              {chat.title || 'Nouvelle conversation'}
            </p>
            <span className="text-xs text-text-secondary whitespace-nowrap">
              {formatTimestamp(chat.updatedAt)}
            </span>
          </div>
          <p className="text-sm text-text-secondary truncate">
            {chat.lastMessage || 'Aucun message'}
          </p>
        </div>
      </div>
    </button>
  );
};

const SkeletonItem = () => (
  <div className="px-3 py-3 rounded-xl border border-brand-grey/40 bg-white animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-brand-grey/40" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-3 bg-brand-grey/50 rounded w-1/2" />
        <div className="h-3 bg-brand-grey/50 rounded w-3/4" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ onNewChat }) => (
  <div className="h-full flex flex-col items-center justify-center text-center px-6 py-10">
    <div className="w-12 h-12 rounded-xl bg-brand-mint flex items-center justify-center text-brand-slate mb-4 shadow-card">
      <MessageSquare className="w-6 h-6" />
    </div>
    <h3 className="text-sm font-semibold text-text-primary mb-1">Aucune conversation</h3>
    <p className="text-sm text-text-secondary mb-4">Commence une nouvelle discussion pour la voir apparaître ici.</p>
    <button
      type="button"
      onClick={onNewChat}
      className="inline-flex items-center px-3 py-2 rounded-lg bg-brand-accent text-white shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-brand-accent"
    >
      <Plus className="w-4 h-4 mr-2" />
      Nouvelle conversation
    </button>
  </div>
);

const ChatHistorySidebar = ({
  chats = [],
  selectedChatId,
  onSelectChat = () => {},
  onNewChat = () => {},
  className = '',
  loading = false
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = Array.isArray(chats) ? [...chats] : [];
    list.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    if (!q) return list;
    return list.filter((c) =>
      (c.title || '').toLowerCase().includes(q) ||
      (c.lastMessage || '').toLowerCase().includes(q)
    );
  }, [chats, query]);

  return (
    <aside className={`h-full bg-white border-r border-brand-grey flex flex-col w-full sm:w-80 md:w-96 ${className}`}>
      <div className="p-4 border-b border-brand-grey space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-text-primary">Conversations</h2>
          <button
            type="button"
            onClick={onNewChat}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-brand-accent text-white shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau
          </button>
        </div>
        <Input
          placeholder="Rechercher une conversation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth p-2 space-y-2">
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonItem key={i} />
            ))}
          </>
        ) : filtered.length === 0 ? (
          <EmptyState onNewChat={onNewChat} />
        ) : (
          filtered.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              selected={chat.id === selectedChatId}
              onClick={() => onSelectChat && onSelectChat(chat.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
};

export default ChatHistorySidebar;
