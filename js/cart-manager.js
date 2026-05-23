// ============================================
// GESTOR DEL CARRITO
// Single Responsibility Principle
// ============================================

class CartManager {
    constructor() {
        this.items = this.loadFromStorage();
    }

    addItem(product, quantity = 1) {
        if (quantity <= 0) return false;

        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                emoji: product.emoji,
                quantity: quantity
            });
        }
        
        this.saveToStorage();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
    }

    getItems() {
        return this.items;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.quantity), 0);
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }

    getTotalQuantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    saveToStorage() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(CONFIG.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }
}

// Instancia global del carrito
const CartManager = new CartManager();