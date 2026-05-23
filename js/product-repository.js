// ============================================
// REPOSITORIO DE PRODUCTOS
// Single Responsibility Principle
// ============================================

class ProductRepository {
    constructor() {
        this.productos = [
            // Panes
            { 
                id: 1, 
                nombre: 'Pan Integral', 
                precio: 2.50, 
                categoria: 'panes', 
                emoji: '🍞', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Pan integral 100% natural'
            },
            { 
                id: 2, 
                nombre: 'Pan Francés', 
                precio: 3.00, 
                categoria: 'panes', 
                emoji: '🥖', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Auténtico pan francés crujiente'
            },
            { 
                id: 3, 
                nombre: 'Pan de Ajo', 
                precio: 3.50, 
                categoria: 'panes', 
                emoji: '🧄', 
                descuento: 5, 
                unidadMinima: 1,
                descripcion: 'Pan con ajo natural'
            },
            
            // Dulces
            { 
                id: 4, 
                nombre: 'Croissant', 
                precio: 2.75, 
                categoria: 'dulces', 
                emoji: '🥐', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Croissant de hojaldre perfecto'
            },
            { 
                id: 5, 
                nombre: 'Donut de Chocolate', 
                precio: 1.50, 
                categoria: 'dulces', 
                emoji: '🍩', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Delicioso donut cubierto de chocolate'
            },
            { 
                id: 6, 
                nombre: 'Muffin de Arándanos', 
                precio: 2.00, 
                categoria: 'dulces', 
                emoji: '🧁', 
                descuento: 10, 
                unidadMinima: 1,
                descripcion: 'Muffin casero con arándanos frescos'
            },
            
            // Galletas
            { 
                id: 7, 
                nombre: 'Galletas de Avena', 
                precio: 1.25, 
                categoria: 'galletas', 
                emoji: '🍪', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Galletas crujientes de avena'
            },
            { 
                id: 8, 
                nombre: 'Galletas de Chocolate', 
                precio: 1.50, 
                categoria: 'galletas', 
                emoji: '🍫', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Galletas con chips de chocolate'
            },
            { 
                id: 9, 
                nombre: 'Galletas Integrales', 
                precio: 1.75, 
                categoria: 'galletas', 
                emoji: '🌾', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Galletas integrales saludables'
            }
        ];

        this.productosEmpresas = [
            { 
                id: 10, 
                nombre: 'Pack Pan Integral x12', 
                precio: 25.00, 
                categoria: 'panes', 
                emoji: '📦', 
                descuento: 15, 
                unidadMinima: 1,
                descripcion: 'Caja de 12 panes integrales'
            },
            { 
                id: 11, 
                nombre: 'Pack Croissant x24', 
                precio: 55.00, 
                categoria: 'dulces', 
                emoji: '📦', 
                descuento: 20, 
                unidadMinima: 1,
                descripcion: 'Caja de 24 croissants frescos'
            },
            { 
                id: 12, 
                nombre: 'Pack Galletas x50', 
                precio: 45.00, 
                categoria: 'galletas', 
                emoji: '📦', 
                descuento: 25, 
                unidadMinima: 1,
                descripcion: 'Caja de 50 galletas surtidas'
            },
            { 
                id: 13, 
                nombre: 'Surtido Premium x30', 
                precio: 75.00, 
                categoria: 'todos', 
                emoji: '🎁', 
                descuento: 18, 
                unidadMinima: 1,
                descripcion: 'Surtido de 30 productos premium'
            }
        ];
    }

    obtenerProductos(tipo = 'clientes') {
        return tipo === 'clientes' ? this.productos : this.productosEmpresas;
    }

    obtenerProductosPorCategoria(categoria, tipo = 'clientes') {
        const productos = this.obtenerProductos(tipo);
        if (categoria === 'todos') return productos;
        return productos.filter(p => p.categoria === categoria);
    }

    obtenerProductoById(id) {
        const todos = [...this.productos, ...this.productosEmpresas];
        return todos.find(p => p.id === id);
    }

    obtenerTodosProductos() {
        return [...this.productos, ...this.productosEmpresas];
    }
}