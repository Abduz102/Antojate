// ============================================
// GESTOR DE AUTENTICACIÓN
// ============================================

class AuthManager {
    static users = this.loadUsers();
    static currentUser = this.loadCurrentUser();
    static isAuthenticated = this.currentUser !== null;

    static openModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('activo');
        }
    }

    static closeModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('activo');
        }
    }

    static switchTab(tabName) {
        // Ocultar todos los tabs
        document.querySelectorAll('.auth-tab-content').forEach(tab => {
            tab.classList.remove('activo');
        });
        document.querySelectorAll('.auth-tab').forEach(btn => {
            btn.classList.remove('activo');
        });

        // Mostrar tab seleccionado
        const tabContent = document.getElementById(tabName + '-tab');
        if (tabContent) {
            tabContent.classList.add('activo');
        }
        event.target.classList.add('activo');
    }

    static login(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            this.isAuthenticated = true;
            this.saveCurrentUser();
            this.updateUI();
            this.closeModal();
            NotificationService.success(`¡Bienvenido ${user.name}!`);
        } else {
            NotificationService.error('Email o contraseña incorrectos');
        }
    }

    static register(event) {
        event.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;

        // Validaciones
        if (password !== passwordConfirm) {
            NotificationService.error('Las contraseñas no coinciden');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            NotificationService.error('Este email ya está registrado');
            return;
        }

        if (password.length < 6) {
            NotificationService.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            createdAt: new Date().toISOString(),
            orders: []
        };

        this.users.push(newUser);
        this.saveUsers();
        this.currentUser = newUser;
        this.isAuthenticated = true;
        this.saveCurrentUser();
        this.updateUI();
        this.closeModal();
        NotificationService.success(`¡Cuenta creada exitosamente! Bienvenido ${name}`);
    }

    static logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('currentUser');
        this.updateUI();
        CartManager.clear();
        CartUI.updateCartUI();
        NotificationService.success('Sesión cerrada');
    }

    static updateUI() {
        const userToggle = document.getElementById('user-toggle');
        const userName = document.getElementById('user-name');

        if (this.isAuthenticated && this.currentUser) {
            userName.textContent = this.currentUser.name.split(' ')[0];
            userToggle.style.cursor = 'pointer';
        } else {
            userName.textContent = 'Cuenta';
            userToggle.style.cursor = 'pointer';
        }
    }

    static toggleUserMenu(event) {
        event.preventDefault();
        if (!this.isAuthenticated) {
            this.openModal();
        } else {
            const menu = document.getElementById('user-menu');
            if (menu) {
                menu.classList.toggle('activo');
            }
        }
    }

    static showProfile() {
        if (!this.currentUser) return;
        alert(`Perfil de ${this.currentUser.name}\nEmail: ${this.currentUser.email}\nTeléfono: ${this.currentUser.phone}`);
    }

    static showOrders() {
        if (!this.currentUser) return;
        if (this.currentUser.orders.length === 0) {
            alert('No tienes pedidos aún');
        } else {
            let orderText = 'Tus pedidos:\n\n';
            this.currentUser.orders.forEach((order, index) => {
                orderText += `Pedido ${index + 1}: $${order.total}\nEstado: ${order.status}\n\n`;
            });
            alert(orderText);
        }
    }

    static saveUsers() {
        try {
            localStorage.setItem('antojate_users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }

    static loadUsers() {
        try {
            const data = localStorage.getItem('antojate_users');
            // Si no hay usuarios, crear usuarios de demo
            if (!data) {
                const demoUsers = [
                    {
                        id: 1,
                        name: 'Juan Pérez',
                        email: 'juan@example.com',
                        phone: '+1 (555) 123-4567',
                        password: '123456',
                        createdAt: new Date().toISOString(),
                        orders: []
                    }
                ];
                localStorage.setItem('antojate_users', JSON.stringify(demoUsers));
                return demoUsers;
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    static saveCurrentUser() {
        try {
            if (this.currentUser) {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        } catch (error) {
            console.error('Error saving current user:', error);
        }
    }

    static loadCurrentUser() {
        try {
            const data = localStorage.getItem('currentUser');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading current user:', error);
            return null;
        }
    }
}

// Inicializar UI
document.addEventListener('DOMContentLoaded', () => {
    AuthManager.updateUI();
});
