// ============================================
// INTERFAZ DE CHECKOUT
// ============================================

class CheckoutUI {
    static currentStep = 1;
    static shippingCost = 4.99;
    static orderData = {};

    static openCheckout() {
        if (!AuthManager.isAuthenticated) {
            NotificationService.warning('Por favor inicia sesión para continuar');
            AuthManager.openModal();
            return;
        }

        const modal = document.getElementById('checkout-modal');
        if (modal) {
            modal.classList.add('activo');
            this.currentStep = 1;
            this.showStep(1);
        }
    }

    static closeCheckout() {
        const modal = document.getElementById('checkout-modal');
        if (modal) {
            modal.classList.remove('activo');
        }
        CartUI.closeCart();
    }

    static showStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('activo');
        });
        const step = document.getElementById(`step-${stepNumber}`);
        if (step) {
            step.classList.add('activo');
        }
    }

    static nextStep(currentStep, event) {
        event.preventDefault();

        if (currentStep === 1) {
            // Guardar datos de envío
            this.orderData.name = document.getElementById('shipping-name').value;
            this.orderData.email = document.getElementById('shipping-email').value;
            this.orderData.address = document.getElementById('shipping-address').value;
            this.orderData.city = document.getElementById('shipping-city').value;
            this.orderData.zip = document.getElementById('shipping-zip').value;
            this.orderData.phone = document.getElementById('shipping-phone').value;
        } else if (currentStep === 2) {
            // Guardar método de envío
            const shippingMethod = document.querySelector('input[name="shipping"]:checked');
            if (shippingMethod) {
                const value = shippingMethod.value;
                this.orderData.shippingMethod = value;
                
                if (value === 'standard') {
                    this.shippingCost = 4.99;
                    this.orderData.shippingText = '📦 Envío Estándar (3-5 días)';
                } else if (value === 'express') {
                    this.shippingCost = 9.99;
                    this.orderData.shippingText = '⚡ Envío Express (1-2 días)';
                } else if (value === 'same-day') {
                    this.shippingCost = 19.99;
                    this.orderData.shippingText = '🚀 Entrega Mismo Día';
                }
            }
        } else if (currentStep === 3) {
            // Guardar método de pago
            const paymentMethod = document.querySelector('input[name="payment"]:checked');
            this.orderData.paymentMethod = paymentMethod ? paymentMethod.value : 'card';
        }

        this.currentStep = currentStep + 1;
        this.showStep(this.currentStep);
        this.updateConfirmation();
    }

    static previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    static updateConfirmation() {
        if (this.currentStep === 4) {
            // Actualizar resumen
            document.getElementById('confirmation-address').textContent = 
                `${this.orderData.address}, ${this.orderData.city}`;
            
            document.getElementById('confirmation-method').textContent = 
                this.orderData.shippingText || '📦 Envío Estándar';

            // Cargar items
            const items = CartManager.getItems();
            const confirmationItems = document.getElementById('confirmation-items');
            confirmationItems.innerHTML = items.map(item => `
                <div class="confirmation-item">
                    <div>
                        <div class="item-name">${item.emoji} ${item.nombre}</div>
                        <div class="item-qty">Cantidad: ${item.quantity}</div>
                    </div>
                    <div class="item-price">$${(item.precio * item.quantity).toFixed(2)}</div>
                </div>
            `).join('');

            // Actualizar totales
            const subtotal = CartManager.getTotal();
            const total = subtotal + this.shippingCost;

            document.getElementById('confirmation-subtotal').textContent = subtotal.toFixed(2);
            document.getElementById('confirmation-shipping').textContent = this.shippingCost.toFixed(2);
            document.getElementById('confirmation-total').textContent = total.toFixed(2);
        }
    }

    static confirmOrder() {
        const items = CartManager.getItems();
        const subtotal = CartManager.getTotal();
        const total = subtotal + this.shippingCost;

        // Crear pedido
        const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            items: items,
            subtotal: subtotal,
            shipping: this.shippingCost,
            total: total,
            status: 'Confirmado',
            shippingInfo: {
                name: this.orderData.name,
                address: this.orderData.address,
                city: this.orderData.city,
                zip: this.orderData.zip,
                phone: this.orderData.phone,
                method: this.orderData.shippingText
            },
            paymentMethod: this.orderData.paymentMethod
        };

        // Guardar en usuario
        if (AuthManager.currentUser) {
            if (!AuthManager.currentUser.orders) {
                AuthManager.currentUser.orders = [];
            }
            AuthManager.currentUser.orders.push(order);
            AuthManager.saveCurrentUser();
            
            // Actualizar en la lista de usuarios
            const userIndex = AuthManager.users.findIndex(u => u.id === AuthManager.currentUser.id);
            if (userIndex !== -1) {
                AuthManager.users[userIndex] = AuthManager.currentUser;
                AuthManager.saveUsers();
            }
        }

        // Limpiar carrito
        CartManager.clear();
        CartUI.updateCartUI();

        // Mostrar confirmación
        alert(`
🎉 ¡Pedido Confirmado!

Número de Pedido: ${order.id}

Totales:
- Subtotal: $${subtotal.toFixed(2)}
- Envío: $${this.shippingCost.toFixed(2)}
- Total: $${total.toFixed(2)}

Enviando a:
${this.orderData.name}
${this.orderData.address}
${this.orderData.city}, ${this.orderData.zip}

Te enviaremos un email de confirmación a ${this.orderData.email}

¡Gracias por tu compra! 🥐
        `);

        this.closeCheckout();
        NotificationService.success('¡Pedido confirmado exitosamente!');
    }
}
