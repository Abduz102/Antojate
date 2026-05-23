// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

class NotificationService {
    static show(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notificacion';
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        
        if (type === 'warning') {
            notification.style.backgroundColor = CONFIG.COLORS.warning;
        } else if (type === 'error') {
            notification.style.backgroundColor = CONFIG.COLORS.warning;
        } else {
            notification.style.backgroundColor = CONFIG.COLORS.success;
        }
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, CONFIG.NOTIFICATION_TIMEOUT);
    }

    static success(message) {
        this.show(message, 'success');
    }

    static warning(message) {
        this.show(message, 'warning');
    }

    static error(message) {
        this.show(message, 'error');
    }
}