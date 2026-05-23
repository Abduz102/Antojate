// ============================================
// RENDERIZADOR DE PRODUCTOS
// Single Responsibility Principle
// ============================================

class ProductRenderer {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'producto__card';
        card.dataset.categoria = product.categoria;

        let discountHTML = '';
        if (product.descuento > 0) {
            discountHTML = `<div class="producto__descuento">-${product.descuento}%</div>`;
        }

        card.innerHTML = `
            ${discountHTML}
            <div class="producto__imagen">${product.emoji}</div>
            <div class="producto__info">
                <div class="producto__nombre">${escapeHTML(product.nombre)}</div>
                <div class="producto__descripcion">${escapeHTML(product.descripcion)}</div>
                <div class="producto__precio">$${product.precio.toFixed(2)}</div>
                <div class="producto__cantidad">
                    <label>Cantidad:</label>
                    <input type="number" value="1" min="${product.unidadMinima}" class="cantidad-input" aria-label="Cantidad de ${product.nombre}">
                </div>
                <button class="producto__btn" onclick="AppState.addToCart(${product.id})" aria-label="Agregar ${product.nombre} al carrito">
                    Agregar al Carrito 🛒
                </button>
            </div>
        `;
        return card;
    }

    renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        container.innerHTML = '';
        
        if (products.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No hay productos disponibles</p>';
            return;
        }

        products.forEach(product => {
            const card = this.createProductCard(product);
            container.appendChild(card);
        });
    }
}

// Instancia global del renderer
const ProductRenderer = new ProductRenderer(new ProductRepository());