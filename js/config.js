// ============================================
// CONFIGURACIÓN ACTUALIZADA
// ============================================

const CONFIG = {
    STORAGE_KEY: 'carrito_antojate',
    ANIMATION_DURATION: 300,
    NOTIFICATION_TIMEOUT: 3000,
    
    MESSAGES: {
        ADDED_TO_CART: '✅ Agregado al carrito',
        REMOVED_FROM_CART: '❌ Eliminado del carrito',
        CART_EMPTY: '⚠️ El carrito está vacío',
        CHECKOUT_SUCCESS: '🎉 ¡Compra exitosa!',
        MIN_QUANTITY: '⚠️ Cantidad mínima',
    },
    
    COLORS: {
        primary: '#D4845C',
        secondary: '#F4A460',
        accent: '#8B4513',
        success: '#27AE60',
        warning: '#E74C3C',
    }
};

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
