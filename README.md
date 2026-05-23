# 🥐 Antojate - Panadería Premium

Una tienda web moderna y responsiva para la venta de productos de panadería, diseñada con principios SOLID y funcionamiento 100% en el navegador (sin servidor).

## 🎯 Características

✨ **Características Principales:**
- 🛍️ Catálogo de productos para clientes individuales
- 🏢 Ofertas especiales para empresas pequeñas
- 🛒 Carrito de compras con persistencia en localStorage
- 📱 Diseño completamente responsivo
- 🎨 Interfaz hermosa y moderna
- ⚡ Sin dependencias externas (HTML/CSS/JavaScript vanilla)
- 🔐 Todo funciona en el cliente (sin servidor)

## 🏗️ Principios SOLID Aplicados

### **S - Single Responsibility**
- `ProductRepository`: Solo gestiona productos
- `CarritoManager`: Solo gestiona el carrito
- `ProductRenderer`: Solo renderiza productos
- `UICarritoHandler`: Solo maneja UI del carrito

### **O - Open/Closed**
- Clases abiertas a extensión (fácil agregar nuevas funcionalidades)
- Cerradas a modificación (no necesita cambiar código existente)

### **L - Liskov Substitution**
- Las subclases mantienen el contrato de la clase base

### **I - Interface Segregation**
- Cada clase tiene una interfaz clara y específica
- No hay métodos innecesarios

### **D - Dependency Inversion**
- Las clases dependen de abstracciones, no de implementaciones concretas
- Inyección de dependencias en constructores

## 📁 Estructura de Archivos

```
Antojate/
├── index.html       # Estructura HTML
├── styles.css       # Estilos CSS responsivos
├── app.js          # Lógica de la aplicación con SOLID
└── README.md       # Este archivo
```

## 🚀 Cómo Usar

### Opción 1: Descarga Los Archivos
1. Descarga los 3 archivos: `index.html`, `styles.css`, `app.js`
2. Colócalos en la misma carpeta
3. Abre `index.html` en tu navegador

### Opción 2: Desde GitHub
```bash
git clone https://github.com/Abduz102/Antojate.git
cd Antojate
# Abre index.html en tu navegador
```

## 💡 Funcionalidades

### Para Clientes Individuales
- Ver catálogo de productos frescos
- Filtrar por categoría (Panes, Dulces, Galletas)
- Agregar productos al carrito
- Ver total de compra en tiempo real
- Procesamiento de compra simulado

### Para Empresas Pequeñas
- Ofertas especiales al por mayor
- Descuentos por volumen
- Paquetes personalizados
- Precios competitivos

### Carrito de Compras
- Agregar/Eliminar productos
- Modificar cantidades
- Persistencia en localStorage (los datos se guardan)
- Ver total actualizado
- Procesar compra

## 🎨 Personalización

### Cambiar Colores
Edita las variables en `styles.css`:
```css
:root {
    --color-primary: #D4845C;      /* Color principal */
    --color-secondary: #F4A460;    /* Color secundario */
    --color-accent: #8B4513;       /* Color de acento */
    --color-light: #FFF8DC;        /* Color claro */
    --color-dark: #2C1810;         /* Color oscuro */
}
```

### Agregar Productos
Edita el arreglo en `app.js` en la clase `ProductRepository`:
```javascript
this.productos = [
    { id: 1, nombre: 'Tu Producto', precio: 2.50, categoria: 'panes', emoji: '🍞', descuento: 0, unidadMinima: 1 },
    // ... más productos
];
```

### Cambiar Información de Contacto
Edita la sección de contacto en `index.html`:
```html
<p>📍 Dirección: Tu Dirección</p>
<p>📞 Teléfono: Tu Teléfono</p>
```

## 📊 Información Técnica

### Stack Tecnológico
- **HTML5**: Estructura semántica
- **CSS3**: Flexbox y Grid para layout responsivo
- **JavaScript Vanilla**: Lógica sin frameworks

### Almacenamiento
- Los datos del carrito se guardan en `localStorage`
- Los datos persisten incluso después de cerrar el navegador

### Compatibilidad
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles (iOS, Android)
- ✅ Tablets

## 🔧 Estructura de Clases

```javascript
ProductRepository        // Gestiona datos de productos
├── obtenerProductos()
├── obtenerProductosPorCategoria()
└── obtenerProductoById()

CarritoManager          // Gestiona carrito y persistencia
├── agregarItem()
├── eliminarItem()
├── calcularTotal()
└── guardarAlStorage()

ProductRenderer         // Renderiza productos en UI
├── crearTarjetaProducto()
└── renderizarProductos()

UICarritoHandler        // Maneja UI del carrito
├── mostrarCarrito()
├── renderizarItems()
└── mostrarNotificacion()

AppController           // Coordinador principal
├── inicializar()
├── filtrarProductos()
└── procesarCompra()
```

## 📱 Responsive Design

- **Desktop**: Grid de 4 columnas
- **Tablet**: Grid de 2-3 columnas
- **Mobile**: Grid de 1 columna
- Navegación adaptativa

## 🎓 Aprendizaje

Este proyecto es perfecto para aprender:
- Principios SOLID en JavaScript
- Arquitectura limpia
- Manejo de estado
- localStorage en navegadores
- CSS Flexbox y Grid
- Diseño responsivo

## 📝 Licencia

Libre para usar y modificar.

## 💬 Contacto

Para preguntas o sugerencias, contacta a:
- **Email**: info@antojate.com
- **GitHub**: Abduz102

---

**Hecho con ❤️ para Antojate - Panadería Premium**
