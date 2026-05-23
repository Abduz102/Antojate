// ============================================
// APLICACIÓN PRINCIPAL - ANTOJATE
// ============================================

class CartUI {
    static openCart() {
        const modal = document.getElementById('carrito-modal');
        if (modal) {
            modal.classList.add('activo');
            this.renderItems();
        }
    }

    static closeCart() {
        const modal = document.getElementById('carrito-modal');
        if (modal) {
            modal.classList.remove('activo');
        }
    }

    static renderItems() {
        const container = document.getElementById('carrito-items');
        if (!container) return;

        const items = CartManager.getItems();

        if (items.length === 0) {
            container.innerHTML = '<div class="carrito__vazio">Tu carrito está vacío 🛒</div>';
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="carrito__item">
                <div class="carrito__item-info">
                    <div class="carrito__item-nombre">${item.emoji} ${escapeHTML(item.nombre)}</div>
                    <div class="carrito__item-precio">$${item.precio.toFixed(2)} x ${item.quantity} = $${(item.precio * item.quantity).toFixed(2)}</div>
                </div>
                <button class="carrito__eliminar" onclick="CartUI.removeFromCart(${item.id})" aria-label="Eliminar ${item.nombre}">Eliminar</button>
            </div>
        `).join('');

        const totalElement = document.getElementById('carrito-total');
        if (totalElement) {
            totalElement.textContent = CartManager.getTotal().toFixed(2);
        }
    }

    static removeFromCart(productId) {
        CartManager.removeItem(productId);
        this.renderItems();
        AppState.updateCartUI();
        NotificationService.show('❌ Producto eliminado del carrito', 'warning');
    }

    static checkout() {
        const items = CartManager.getItems();
        if (items.length === 0) {
            NotificationService.warning(CONFIG.MESSAGES.CART_EMPTY);
            return;
        }

        const total = CartManager.getTotal();
        const summary = items.map(item => `${item.nombre} (${item.quantity})`).join(', ');
        
        const mensaje = `
🎉 ¡Compra procesada con éxito!

Productos: ${summary}
Total: $${total.toFixed(2)}

Gracias por comprar en Antojate 🥐
Te contactaremos pronto para confirmar tu entrega.
        `;

        alert(mensaje);

        CartManager.clear();
        this.renderItems();
        AppState.updateCartUI();
        this.closeCart();
        NotificationService.success(CONFIG.MESSAGES.CHECKOUT_SUCCESS);
    }
}

// Exponer CartUI globalmente para HTML
window.CartManager = {
    openCart: () => CartUI.openCart(),
    closeCart: () => CartUI.closeCart(),
    removeFromCart: (id) => CartUI.removeFromCart(id),
    checkout: () => CartUI.checkout()
};

// ============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Cargar productos iniciales
        AppState.mostrarClientes();
        
        // Actualizar contador del carrito
        AppState.updateCartUI();
        
        // Agregar event listeners
        const carritoToggle = document.getElementById('carrito-toggle');
        if (carritoToggle) {
            carritoToggle.addEventListener('click', (e) => {
                e.preventDefault();
                CartUI.openCart();
            });
        }

        // Cerrar modal al hacer click fuera
        const modal = document.getElementById('carrito-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    CartUI.closeCart();
                }
            });
        }

        console.log('✅ Aplicación Antojate cargada exitosamente');
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
    }
});