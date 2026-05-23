// ============================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ============================================

class AppState {
    static productRepository = new ProductRepository();
    static currentClientType = 'clientes';
    static currentCategory = 'todos';

    static mostrarClientes() {
        this.currentClientType = 'clientes';
        this.currentCategory = 'todos';
        const productos = this.productRepository.obtenerProductos('clientes');
        ProductRenderer.renderProducts(productos, 'productos-grid');
        this.updateFilters();
        const section = document.getElementById('productos');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    static mostrarEmpresas() {
        this.currentClientType = 'empresas';
        this.currentCategory = 'todos';
        const productos = this.productRepository.obtenerProductos('empresas');
        ProductRenderer.renderProducts(productos, 'productos-empresas-grid');
        this.updateFilters();
        const section = document.getElementById('empresas');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    static filtrarProductos(categoria) {
        this.currentCategory = categoria;
        const productos = this.productRepository.obtenerProductosPorCategoria(
            categoria, 
            this.currentClientType
        );
        const containerId = this.currentClientType === 'clientes' ? 'productos-grid' : 'productos-empresas-grid';
        ProductRenderer.renderProducts(productos, containerId);
        this.updateFilters();
    }

    static updateFilters() {
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('activo');
        });

        const filterText = this.currentCategory === 'todos' ? 'Todos' : 
                          this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1);
        
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            if (btn.textContent.includes(filterText)) {
                btn.classList.add('activo');
            }
        });
    }

    static addToCart(productId) {
        const product = this.productRepository.obtenerProductoById(productId);
        if (!product) {
            console.error('Producto no encontrado:', productId);
            return;
        }

        const buttons = document.querySelectorAll(`[onclick="AppState.addToCart(${productId})"]`);
        let quantity = 1;

        if (buttons.length > 0) {
            const quantityInput = buttons[0]?.parentElement?.querySelector('.cantidad-input');
            if (quantityInput) {
                quantity = parseInt(quantityInput.value) || 1;
            }
        }

        if (quantity < product.unidadMinima) {
            NotificationService.warning(`${CONFIG.MESSAGES.MIN_QUANTITY}: ${product.unidadMinima}`);
            return;
        }

        CartManager.addItem(product, quantity);
        this.updateCartUI();
        NotificationService.success(`${CONFIG.MESSAGES.ADDED_TO_CART} - ${product.nombre}`);
    }

    static updateCartUI() {
        const contador = document.getElementById('carrito-count');
        if (contador) {
            contador.textContent = CartManager.getTotalQuantity();
        }
    }
}

// Función global para acceso desde HTML
const AppState = AppState;