// ============================================
// APLICACIÓN PRINCIPAL - ANTOJATE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Cargar productos iniciales
        AppState.mostrarClientes();
        
        // Actualizar contador del carrito
        CartUI.updateCartUI();
        
        // Agregar event listeners
        const carritoToggle = document.getElementById('carrito-toggle');
        if (carritoToggle) {
            carritoToggle.addEventListener('click', (e) => {
                e.preventDefault();
                CartUI.openCart();
            });
        }

        // Cerrar modal del carrito al hacer click fuera
        const carritoModal = document.getElementById('carrito-modal');
        if (carritoModal) {
            carritoModal.addEventListener('click', (e) => {
                if (e.target === carritoModal) {
                    CartUI.closeCart();
                }
            });
        }

        // Cerrar modal de checkout al hacer click fuera
        const checkoutModal = document.getElementById('checkout-modal');
        if (checkoutModal) {
            checkoutModal.addEventListener('click', (e) => {
                if (e.target === checkoutModal) {
                    CheckoutUI.closeCheckout();
                }
            });
        }

        // Cerrar modal de auth al hacer click fuera
        const authModal = document.getElementById('auth-modal');
        if (authModal) {
            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) {
                    AuthManager.closeModal();
                }
            });
        }

        // Cerrar menú de usuario al hacer click fuera
        document.addEventListener('click', (e) => {
            const userMenu = document.getElementById('user-menu');
            const userToggle = document.getElementById('user-toggle');
            if (userMenu && !userMenu.contains(e.target) && !userToggle.contains(e.target)) {
                userMenu.classList.remove('activo');
            }
        });

        console.log('✅ Aplicación Antojate cargada exitosamente');
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
    }
});
