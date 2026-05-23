// ============================================
// APLICACIÓN ANTOJATE - PANADERÍA PREMIUM
// Principios SOLID en JavaScript
// ============================================

// ============================================
// 1. INTERFAZ PARA PRODUCTOS
// (Interface Segregation Principle)
// ============================================
class IProductRepository {
    obtenerProductos(tipo) { }
    obtenerProductosPorCategoria(categoria, tipo) { }
    obtenerProductoById(id) { }
}

// ============================================
// 2. REPOSITORIO DE PRODUCTOS
// (Single Responsibility Principle)
// Solo gestiona datos de productos
// ============================================
class ProductRepository extends IProductRepository {
    constructor() {
        super();
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
            // Ofertas al por mayor
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
}

// ============================================
// 3. INTERFAZ PARA CARRITO
// (Interface Segregation Principle)
// ============================================
class ICarritoManager {
    agregarItem(producto, cantidad) { }
    eliminarItem(productoId) { }
    obtenerItems() { }
    calcularTotal() { }
    limpiar() { }
}

// ============================================
// 4. GESTOR DEL CARRITO
// (Single Responsibility Principle)
// Solo gestiona carrito y persistencia
// ============================================
class CarritoManager extends ICarritoManager {
    constructor(storageKey = 'carrito_antojate') {
        super();
        this.storageKey = storageKey;
        this.items = this.cargarDelStorage();
    }

    agregarItem(producto, cantidad = 1) {
        if (cantidad <= 0) return;

        const itemExistente = this.items.find(item => item.id === producto.id);
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                emoji: producto.emoji,
                cantidad: cantidad
            });
        }
        this.guardarAlStorage();
    }

    eliminarItem(productoId) {
        this.items = this.items.filter(item => item.id !== productoId);
        this.guardarAlStorage();
    }

    obtenerItems() {
        return this.items;
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    limpiar() {
        this.items = [];
        this.guardarAlStorage();
    }

    guardarAlStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    cargarDelStorage() {
        try {
            const datos = localStorage.getItem(this.storageKey);
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            console.error('Error cargando carrito:', error);
            return [];
        }
    }

    obtenerCantidadTotal() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }
}

// ============================================
// 5. RENDERIZADOR DE PRODUCTOS
// (Single Responsibility Principle)
// Solo renderiza productos en el DOM
// ============================================
class ProductRenderer {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    crearTarjetaProducto(producto) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto__card';
        tarjeta.dataset.categoria = producto.categoria;

        let descuentoHTML = '';
        if (producto.descuento > 0) {
            descuentoHTML = `<div style="background-color: #E74C3C; color: white; padding: 5px 10px; position: absolute; top: 10px; right: 10px; border-radius: 5px; font-weight: bold;">-${producto.descuento}%</div>`;
        }

        tarjeta.innerHTML = `
            ${descuentoHTML}
            <div class="producto__imagen">${producto.emoji}</div>
            <div class="producto__info">
                <div class="producto__nombre">${this.escaparHTML(producto.nombre)}</div>
                <div class="producto__descripcion">${this.escaparHTML(producto.descripcion)}</div>
                <div class="producto__precio">$${producto.precio.toFixed(2)}</div>
                <div class="producto__cantidad">
                    <label>Cantidad:</label>
                    <input type="number" value="1" min="${producto.unidadMinima}" class="cantidad-input" aria-label="Cantidad de ${producto.nombre}">
                </div>
                <button class="producto__btn" onclick="agregarAlCarrito(${producto.id})" aria-label="Agregar ${producto.nombre} al carrito">
                    Agregar al Carrito 🛒
                </button>
            </div>
        `;
        return tarjeta;
    }

    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    renderizarProductos(productos, contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) {
            console.error(`Contenedor ${contenedorId} no encontrado`);
            return;
        }

        contenedor.innerHTML = '';
        
        if (productos.length === 0) {
            contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No hay productos disponibles</p>';
            return;
        }

        productos.forEach(producto => {
            const tarjeta = this.crearTarjetaProducto(producto);
            contenedor.appendChild(tarjeta);
        });
    }
}

// ============================================
// 6. MANEJADOR DE UI DEL CARRITO
// (Single Responsibility Principle)
// Solo maneja la interfaz del carrito
// ============================================
class UICarritoHandler {
    constructor(carritoManager) {
        this.carritoManager = carritoManager;
        this.modal = document.getElementById('carrito-modal');
    }

    mostrarCarrito() {
        if (!this.modal) {
            console.error('Modal del carrito no encontrado');
            return;
        }
        this.modal.classList.add('activo');
        this.renderizarItems();
    }

    cerrarCarrito() {
        if (!this.modal) return;
        this.modal.classList.remove('activo');
    }

    renderizarItems() {
        const contenedor = document.getElementById('carrito-items');
        if (!contenedor) return;

        const items = this.carritoManager.obtenerItems();

        if (items.length === 0) {
            contenedor.innerHTML = '<div class="carrito__vazio">Tu carrito está vacío 🛒</div>';
            return;
        }

        contenedor.innerHTML = items.map(item => `
            <div class="carrito__item">
                <div class="carrito__item-info">
                    <div class="carrito__item-nombre">${item.emoji} ${this.escaparHTML(item.nombre)}</div>
                    <div class="carrito__item-precio">$${item.precio.toFixed(2)} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}</div>
                </div>
                <button class="carrito__eliminar" onclick="eliminarDelCarrito(${item.id})" aria-label="Eliminar ${item.nombre}">Eliminar</button>
            </div>
        `).join('');

        const totalElement = document.getElementById('carrito-total');
        if (totalElement) {
            totalElement.textContent = this.carritoManager.calcularTotal().toFixed(2);
        }
    }

    actualizarContador() {
        const contador = document.getElementById('carrito-count');
        if (contador) {
            contador.textContent = this.carritoManager.obtenerCantidadTotal();
        }
    }

    mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        notificacion.setAttribute('role', 'alert');
        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }

    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
}

// ============================================
// 7. CONTROLADOR PRINCIPAL DE LA APLICACIÓN
// (Coordina todas las partes)
// (Dependency Inversion Principle)
// ============================================
class AppController {
    constructor() {
        // Inyección de dependencias
        this.productRepository = new ProductRepository();
        this.carritoManager = new CarritoManager();
        this.productRenderer = new ProductRenderer(this.productRepository);
        this.uiCarritoHandler = new UICarritoHandler(this.carritoManager);
        
        this.tipoClienteActual = 'clientes';
        this.categoriaActual = 'todos';
        
        this.inicializar();
    }

    inicializar() {
        try {
            this.renderizarProductosClientes();
            this.uiCarritoHandler.actualizarContador();
            this.attachEventListeners();
        } catch (error) {
            console.error('Error inicializando app:', error);
        }
    }

    attachEventListeners() {
        // Carrito toggle
        const carritoToggle = document.getElementById('carrito-toggle');
        if (carritoToggle) {
            carritoToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.uiCarritoHandler.mostrarCarrito();
            });
        }

        // Cerrar modal al hacer click fuera
        if (this.uiCarritoHandler.modal) {
            this.uiCarritoHandler.modal.addEventListener('click', (e) => {
                if (e.target === this.uiCarritoHandler.modal) {
                    this.uiCarritoHandler.cerrarCarrito();
                }
            });
        }
    }

    renderizarProductosClientes() {
        this.tipoClienteActual = 'clientes';
        this.categoriaActual = 'todos';
        const productos = this.productRepository.obtenerProductos('clientes');
        this.productRenderer.renderizarProductos(productos, 'productos-grid');
        this.actualizarFiltros();
    }

    renderizarProductosEmpresas() {
        this.tipoClienteActual = 'empresas';
        this.categoriaActual = 'todos';
        const productos = this.productRepository.obtenerProductos('empresas');
        this.productRenderer.renderizarProductos(productos, 'productos-empresas-grid');
        this.actualizarFiltros();
    }

    filtrarProductos(categoria) {
        this.categoriaActual = categoria;
        const productos = this.productRepository.obtenerProductosPorCategoria(
            categoria, 
            this.tipoClienteActual
        );
        const contenedorId = this.tipoClienteActual === 'clientes' ? 'productos-grid' : 'productos-empresas-grid';
        this.productRenderer.renderizarProductos(productos, contenedorId);
        this.actualizarFiltros();
    }

    actualizarFiltros() {
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('activo');
        });

        // Activar el filtro correcto
        const filtroTexto = this.categoriaActual === 'todos' ? 'Todos' : 
                          this.categoriaActual.charAt(0).toUpperCase() + this.categoriaActual.slice(1);
        
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            if (btn.textContent.includes(filtroTexto)) {
                btn.classList.add('activo');
            }
        });
    }

    agregarAlCarrito(productoId) {
        const producto = this.productRepository.obtenerProductoById(productoId);
        if (!producto) {
            console.error('Producto no encontrado:', productoId);
            return;
        }

        // Buscar el input de cantidad cercano al botón clickeado
        const botones = document.querySelectorAll(`[onclick="agregarAlCarrito(${productoId})"]`);
        let cantidad = 1;

        if (botones.length > 0) {
            const cantidadInput = botones[0]?.parentElement?.querySelector('.cantidad-input');
            if (cantidadInput) {
                cantidad = parseInt(cantidadInput.value) || 1;
            }
        }

        // Validar cantidad
        if (cantidad < producto.unidadMinima) {
            this.uiCarritoHandler.mostrarNotificacion(`⚠️ Cantidad mínima: ${producto.unidadMinima}`);
            return;
        }

        this.carritoManager.agregarItem(producto, cantidad);
        this.uiCarritoHandler.actualizarContador();
        this.uiCarritoHandler.mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
    }

    eliminarDelCarrito(productoId) {
        this.carritoManager.eliminarItem(productoId);
        this.uiCarritoHandler.renderizarItems();
        this.uiCarritoHandler.actualizarContador();
        this.uiCarritoHandler.mostrarNotificacion('❌ Producto eliminado del carrito');
    }

    procesarCompra() {
        const items = this.carritoManager.obtenerItems();
        if (items.length === 0) {
            this.uiCarritoHandler.mostrarNotificacion('⚠️ El carrito está vacío');
            return;
        }

        const total = this.carritoManager.calcularTotal();
        const resumen = items.map(item => `${item.nombre} (${item.cantidad})`).join(', ');
        
        const mensaje = `
🎉 ¡Compra procesada con éxito!

Productos: ${resumen}
Total: $${total.toFixed(2)}

Gracias por comprar en Antojate 🥐
Te contactaremos pronto para confirmar tu entrega.
        `;

        alert(mensaje);

        // Limpiar carrito
        this.carritoManager.limpiar();
        this.uiCarritoHandler.renderizarItems();
        this.uiCarritoHandler.actualizarContador();
        this.uiCarritoHandler.cerrarCarrito();
        this.uiCarritoHandler.mostrarNotificacion('🎉 ¡Compra exitosa!');
    }
}

// ============================================
// 8. INSTANCIA GLOBAL Y FUNCIONES PÚBLICAS
// ============================================
let appController;

// Inicializar cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    try {
        appController = new AppController();
    } catch (error) {
        console.error('Error fatal al inicializar:', error);
    }
});

// ============================================
// FUNCIONES PÚBLICAS PARA HTML
// ============================================

/**
 * Muestra productos para clientes individuales
 */
function mostrarClientes() {
    if (!appController) return;
    appController.renderizarProductosClientes();
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Muestra productos para empresas
 */
function mostrarEmpresas() {
    if (!appController) return;
    appController.renderizarProductosEmpresas();
    const empresasSection = document.getElementById('empresas');
    if (empresasSection) {
        empresasSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Filtra productos por categoría
 * @param {string} categoria - Categoría a filtrar
 */
function filtrarProductos(categoria) {
    if (!appController) return;
    appController.filtrarProductos(categoria);
}

/**
 * Agrega producto al carrito
 * @param {number} productoId - ID del producto
 */
function agregarAlCarrito(productoId) {
    if (!appController) return;
    appController.agregarAlCarrito(productoId);
}

/**
 * Elimina producto del carrito
 * @param {number} productoId - ID del producto
 */
function eliminarDelCarrito(productoId) {
    if (!appController) return;
    appController.eliminarDelCarrito(productoId);
}

/**
 * Cierra el modal del carrito
 */
function cerrarCarrito() {
    if (!appController) return;
    appController.uiCarritoHandler.cerrarCarrito();
}

/**
 * Procesa la compra
 */
function procesarCompra() {
    if (!appController) return;
    appController.procesarCompra();
}
