# 🥐 Antojate - Panadería Premium

Una tienda web moderna de panadería desarrollada con principios SOLID y arquitectura limpia. La aplicación funciona 100% en el navegador sin requerer un servidor backend.

## ✨ Características Principales

### Para Clientes Individuales
- 🛍️ Catálogo de 9 productos diferentes
- 🔍 Filtrado por categoría (Panes, Dulces, Galletas)
- 🛒 Carrito de compras con localStorage
- 💰 Precios competitivos
- 📱 Diseño responsivo

### Para Empresas Pequeñas
- 📦 Ofertas al por mayor (x12, x24, x50)
- 💵 Descuentos por volumen (hasta 30%)
- 🎁 Paquetes personalizados
- 🚚 Entregas especiales

### Características Generales
- ✅ Notificaciones visuales
- ✅ Carrito persistente (localStorage)
- ✅ Validación de datos
- ✅ Interfaz accesible
- ✅ Animaciones suaves
- ✅ Módulos JavaScript separados
- ✅ CSS organizado en carpeta

## 📁 Estructura del Proyecto

```
Antojate/
├── index.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   ├── config.js
│   ├── product-repository.js
│   ├── cart-manager.js
│   ├── product-renderer.js
│   ├── notification.js
│   ├── app-state.js
│   └── app.js
├── README.md
└── .gitignore
```

## 🚀 Cómo Usar

### 1. Local (Recomendado)
```bash
git clone https://github.com/Abduz102/Antojate.git
cd Antojate
# Abre index.html en tu navegador
```

### 2. Servidor Local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
http-server

# Luego abre: http://localhost:8000
```

## 🏗️ Arquitectura SOLID

### Single Responsibility (S)
- `ProductRepository` - Solo gestiona productos
- `CartManager` - Solo gestiona carrito
- `ProductRenderer` - Solo renderiza en UI
- `NotificationService` - Solo maneja notificaciones
- `AppState` - Solo maneja estado global

### Open/Closed (O)
- Código abierto a extensión
- Cerrado a modificación

### Liskov Substitution (L)
- Clases pueden reemplazarse correctamente

### Interface Segregation (I)
- Interfaces específicas
- Solo métodos necesarios

### Dependency Inversion (D)
- Inyección de dependencias
- Desacoplamiento de módulos

## 🎨 Personalización

### Cambiar Colores
Edita `css/styles.css`:
```css
:root {
    --color-primary: #D4845C;      /* Tu color */
    --color-secondary: #F4A460;    /* Tu color */
    /* ... más colores */
}
```

### Agregar Productos
Edita `js/product-repository.js`:
```javascript
this.productos = [
    { 
        id: 1, 
        nombre: 'Tu Producto', 
        precio: 2.50, 
        categoria: 'panes', 
        emoji: '🍞', 
        descuento: 0, 
        unidadMinima: 1,
        descripcion: 'Descripción'
    },
    // ... más productos
];
```

## 📊 Módulos JavaScript

- **config.js** - Configuración global
- **product-repository.js** - Gestión de productos
- **cart-manager.js** - Gestión del carrito
- **product-renderer.js** - Renderización de productos
- **notification.js** - Sistema de notificaciones
- **app-state.js** - Estado global
- **app.js** - Lógica principal

## 🛠️ Tecnologías

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript ES6+
- LocalStorage API

## 📱 Responsivo

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (480px - 768px)
- ✅ Pequeños (< 480px)

## 🐛 Troubleshooting

### El carrito no guarda datos
- Verifica que localStorage está habilitado
- En modo incógnito no funciona

### Los estilos no se ven
- Verifica que `css/styles.css` existe
- Recarga la página (Ctrl+Shift+R)

### JavaScript no funciona
- Abre la consola (F12)
- Verifica que los scripts están en `js/`

## 📞 Soporte

- **Email:** info@antojate.com
- **GitHub:** https://github.com/Abduz102/Antojate
- **Issues:** https://github.com/Abduz102/Antojate/issues

## 📄 Licencia

Libre para usar y modificar.

## ✍️ Autor

**Abduz102** - Desarrollador Full Stack

**Hecho con ❤️ para Antojate - Panadería Premium**