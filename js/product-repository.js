// ============================================
// REPOSITORIO DE PRODUCTOS MEJORADO
// ============================================

class ProductRepository {
    constructor() {
        this.productos = [
            { 
                id: 1, 
                nombre: 'Pan Integral', 
                precio: 2.50, 
                categoria: 'panes', 
                emoji: '🍞', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Pan integral 100% natural, hecho con granos enteros frescos. Perfecto para desayunar.'
            },
            { 
                id: 2, 
                nombre: 'Pan Francés', 
                precio: 3.00, 
                categoria: 'panes', 
                emoji: '🥖', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Auténtico pan francés crujiente por fuera, suave por dentro. Elaborado artesanalmente.'
            },
            { 
                id: 3, 
                nombre: 'Pan de Ajo', 
                precio: 3.50, 
                categoria: 'panes', 
                emoji: '🧄', 
                descuento: 5, 
                unidadMinima: 1,
                descripcion: 'Pan con ajo natural, mantequilla fresca y hierbas aromáticas. ¡Irresistible!'
            },
            { 
                id: 4, 
                nombre: 'Croissant', 
                precio: 2.75, 
                categoria: 'dulces', 
                emoji: '🥐', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Croissant de hojaldre perfecto, crujiente y mantecoso. Ideal para el desayuno.'
            },
            { 
                id: 5, 
                nombre: 'Donut de Chocolate', 
                precio: 1.50, 
                categoria: 'dulces', 
                emoji: '🍩', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Delicioso donut cubierto de chocolate derretido. La tentación perfecta.'
            },
            { 
                id: 6, 
                nombre: 'Muffin de Arándanos', 
                precio: 2.00, 
                categoria: 'dulces', 
                emoji: '🧁', 
                descuento: 10, 
                unidadMinima: 1,
                descripcion: 'Muffin casero con arándanos frescos. Suave, húmedo y delicioso.'
            },
            { 
                id: 7, 
                nombre: 'Galletas de Avena', 
                precio: 1.25, 
                categoria: 'galletas', 
                emoji: '🍪', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Galletas crujientes de avena con toque de miel. Saludable y sabrosa.'
            },
            { 
                id: 8, 
                nombre: 'Galletas de Chocolate', 
                precio: 1.50, 
                categoria: 'galletas', 
                emoji: '🍫', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Galletas con chips de chocolate belga. El clásico favorito de todos.'
            },
            { 
                id: 9, 
                nombre: 'Galletas Integrales', 
                precio: 1.75, 
                categoria: 'galletas', 
                emoji: '🌾', 
                descuento: 0, 
                unidadMinima: 1,
                descripcion: 'Galletas integrales saludables. Con fibra y sabor natural.'
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
                descripcion: 'Caja de 12 panes integrales frescos. Ideal para cafeterías y negocios.'
            },
            { 
                id: 11, 
                nombre: 'Pack Croissant x24', 
                precio: 55.00, 
                categoria: 'dulces', 
                emoji: '📦', 
                descuento: 20, 
                unidadMinima: 1,
                descripcion: 'Caja de 24 croissants frescos. Perfectos para eventos y reuniones.'
            },
            { 
                id: 12, 
                nombre: 'Pack Galletas x50', 
                precio: 45.00, 
                categoria: 'galletas', 
                emoji: '📦', 
                descuento: 25, 
                unidadMinima: 1,
                descripcion: 'Caja de 50 galletas surtidas. Variedad y cantidad para satisfacer.'
            },
            { 
                id: 13, 
                nombre: 'Surtido Premium x30', 
                precio: 75.00, 
                categoria: 'todos', 
                emoji: '🎁', 
                descuento: 18, 
                unidadMinima: 1,
                descripcion: 'Surtido de 30 productos premium. Lo mejor de cada categoría.'
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
