// ============================================
// INTERFAZ DEL CARRITO MEJORADA
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
            document.getElementById('carrito-subtotal').textContent = '0.00';
            document.getElementById('carrito-envio').textContent = '0.00';
            document.getElementById('carrito-total').textContent = '0.00';
            document.getElementById('modal-cart-count').textContent = '0';
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

        const subtotal = CartManager.getTotal();
        const shippingCost = 4.99; // Envío estándar por defecto
        const total = subtotal + shippingCost;

        document.getElementById('carrito-subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('carrito-envio').textContent = shippingCost.toFixed(2);
        document.getElementById('carrito-total').textContent = total.toFixed(2);
        document.getElementById('modal-cart-count').textContent = items.length;
    }

    static removeFromCart(productId) {
        CartManager.removeItem(productId);
        this.renderItems();
        this.updateCartUI();
        NotificationService.show('❌ Producto eliminado del carrito', 'warning');
    }

    static updateCartUI() {
        const contador = document.getElementById('carrito-count');
        if (contador) {
            contador.textContent = CartManager.getTotalQuantity();
        }
    }
}
