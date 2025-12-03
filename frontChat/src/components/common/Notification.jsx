import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Composant de notification
 * @param {string} type - success | error | warning | info
 * @param {string} message - Message à afficher
 * @param {Function} onClose - Fonction de fermeture
 */
const Notification = ({ type = 'info', message, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const styles = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-lg border-l-4 shadow-lg
        ${styles[type]} animate-slide-up
      `}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <p className="font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-70 transition"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

/**
 * Conteneur de notifications
 */
export const NotificationContainer = ({ notifications = [], onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </div>
  );
};

export default Notification;