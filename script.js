// TechStore - Sistema de E-commerce Frontend
// Arquivo principal JavaScript com todas as funcionalidades

// ===== DADOS DOS PRODUTOS =====
const products = [
    {
        id: 1,
        name: "Smartphone Galaxy Pro",
        price: 2499.99,
        originalPrice: 2799.99,
        image: "https://http2.mlstatic.com/D_Q_NP_666337-MLU77110909080_062024-O.webp",
        description: "Smartphone topo de linha com câmera de 108MP, processador octa-core e 256GB de armazenamento. Tela AMOLED de 6.7 polegadas com refresh rate de 120Hz.",
        category: "smartphones",
        inStock: true,
        features: [
            "Tela AMOLED 6.7'' 120Hz",
            "Câmera principal 108MP",
            "256GB de armazenamento",
            "Processador Snapdragon 888",
            "Bateria 5000mAh",
            "5G Ready"
        ]
    },
    {
        id: 2,
        name: "Notebook UltraBook Pro",
        price: 4299.99,
        originalPrice: 4899.99,
        image: "https://i.zst.com.br/thumbs/12/1/34/-1260046343.jpg",
        description: "Notebook profissional com processador Intel i7, 16GB RAM, SSD 512GB e placa de vídeo dedicada. Ideal para trabalho e games.",
        category: "notebooks",
        inStock: true,
        features: [
            "Processador Intel Core i7",
            "16GB RAM DDR4",
            "SSD 512GB NVMe",
            "Placa de vídeo GTX 1650",
            "Tela 15.6'' Full HD",
            "Teclado retroiluminado"
        ]
    },
    {
        id: 3,
        name: "Fone Bluetooth Premium",
        price: 399.99,
        originalPrice: 499.99,
        image: "https://images.tcdn.com.br/img/img_prod/1330446/headphone_s_fio_bluetooth_premium_2359_1_4f4a989d23ab10c449bd5fe29919b320.jpg",
        description: "Fone de ouvido wireless com cancelamento de ruído ativo, som Hi-Fi e bateria de longa duração. Perfeito para música e chamadas.",
        category: "audio",
        inStock: true,
        features: [
            "Cancelamento de ruído ativo",
            "Som Hi-Fi estéreo",
            "Bateria 30h",
            "Bluetooth 5.0",
            "Resistente à água IPX4",
            "Controles touch"
        ]
    },
    {
        id: 4,
        name: "Smart TV 55'' 4K",
        price: 2199.99,
        originalPrice: 2599.99,
        image: "https://imgs.casasbahia.com.br/1566922171/4xg.jpg?imwidth=1000",
        description: "Smart TV 55 polegadas com resolução 4K Ultra HD, sistema Android TV, HDR e múltiplas entradas HDMI. Entretenimento em alta qualidade.",
        category: "tv",
        inStock: true,
        features: [
            "Tela 55'' 4K Ultra HD",
            "Android TV integrado",
            "HDR10+ e Dolby Vision",
            "3 entradas HDMI",
            "Wi-Fi dual band",
            "Controle por voz"
        ]
    },
    {
        id: 5,
        name: "Tablet Pro 11''",
        price: 1899.99,
        originalPrice: 2199.99,
        image: "https://m.media-amazon.com/images/I/61nshfaBV9L._UF1000,1000_QL80_.jpg",
        description: "Tablet profissional com tela de 11 polegadas, suporte à caneta digital, processador potente e ideal para produtividade e criatividade.",
        category: "tablets",
        inStock: true,
        features: [
            "Tela 11'' Liquid Retina",
            "Suporte à Apple Pencil",
            "Processador M1",
            "128GB de armazenamento",
            "Câmera 12MP",
            "USB-C Thunderbolt"
        ]
    }
];

// ===== UTILITÁRIOS =====
class Utils {
    // Formatar preço para Real brasileiro
    static formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    // Gerar ID único para pedidos
    static generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `TS-${timestamp}-${random}`;
    }

    // Obter data atual formatada
    static getCurrentDate() {
        return new Date().toLocaleDateString('pt-BR');
    }

    // Mostrar alerta flutuante
    static showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-floating alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto remover após 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Simular loading
    static showLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Processando...';
        button.disabled = true;
        
        return () => {
            button.innerHTML = originalText;
            button.disabled = false;
        };
    }
}

// ===== SISTEMA DE CARRINHO =====
class CartSystem {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    // Carregar carrinho do localStorage
    loadCart() {
        const saved = localStorage.getItem('techstore_cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Salvar carrinho no localStorage
    saveCart() {
        localStorage.setItem('techstore_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Adicionar item ao carrinho
    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        Utils.showAlert(`${product.name} adicionado ao carrinho!`);
        return true;
    }

    // Remover item do carrinho
    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            const item = this.items[index];
            this.items.splice(index, 1);
            this.saveCart();
            Utils.showAlert(`${item.name} removido do carrinho!`, 'warning');
            return true;
        }
        return false;
    }

    // Atualizar quantidade de um item
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.saveCart();
            return true;
        }
        return false;
    }

    // Obter total do carrinho
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obter contagem total de itens
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Limpar carrinho
    clear() {
        this.items = [];
        this.saveCart();
    }

    // Atualizar contador do carrinho na navbar
    updateCartCount() {
        const countElements = document.querySelectorAll('#cart-count');
        const count = this.getTotalItems();
        countElements.forEach(element => {
            if (element) element.textContent = count;
        });
    }
}

// Instanciar sistema de carrinho
const cart = new CartSystem();

// ===== FUNCIONALIDADES DA PÁGINA INICIAL =====
class HomePage {
    static init() {
        HomePage.loadProducts();
    }

    static loadProducts() {
        const container = document.getElementById('products-container');
        if (!container) return;

        container.innerHTML = '';
        
        products.forEach(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            
            const productCard = document.createElement('div');
            productCard.className = 'col-lg-4 col-md-6 mb-4';
            productCard.innerHTML = `
                <div class="card product-card h-100">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                        <span class="badge-discount">-${discount}%</span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${product.description.substring(0, 100)}...</p>
                        <div class="price-section mb-3">
                            <div class="product-price">${Utils.formatPrice(product.price)}</div>
                            <small class="product-original-price">${Utils.formatPrice(product.originalPrice)}</small>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="cart.addItem(${product.id})">
                                <i class="fas fa-cart-plus me-2"></i>Adicionar ao Carrinho
                            </button>
                            <a href="produto.html?id=${product.id}" class="btn btn-outline-primary">
                                <i class="fas fa-eye me-2"></i>Ver Detalhes
                            </a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

// ===== FUNCIONALIDADES DA PÁGINA DE PRODUTO =====
class ProductPage {
    static init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        
        if (productId) {
            ProductPage.loadProduct(productId);
            ProductPage.loadRelatedProducts(productId);
            ProductPage.setupControls(productId);
        }
    }

    static loadProduct(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            window.location.href = 'index.html';
            return;
        }

        // Atualizar elementos da página
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = Utils.formatPrice(product.price);
        document.getElementById('product-breadcrumb').textContent = product.name;

        // Carregar características
        const featuresContainer = document.getElementById('product-features');
        featuresContainer.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check text-success me-2"></i>${feature}`;
            featuresContainer.appendChild(li);
        });
    }

    static loadRelatedProducts(currentProductId) {
        const relatedContainer = document.getElementById('related-products');
        if (!relatedContainer) return;

        const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 3);
        
        relatedContainer.innerHTML = '';
        relatedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-lg-4 col-md-6 mb-3';
            productCard.innerHTML = `
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <div class="product-price">${Utils.formatPrice(product.price)}</div>
                        <div class="mt-2">
                            <a href="produto.html?id=${product.id}" class="btn btn-sm btn-outline-primary">Ver Produto</a>
                        </div>
                    </div>
                </div>
            `;
            relatedContainer.appendChild(productCard);
        });
    }

    static setupControls(productId) {
        const quantityInput = document.getElementById('quantity');
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const addToCartBtn = document.getElementById('add-to-cart-btn');

        // Controles de quantidade
        decreaseBtn.addEventListener('click', () => {
            const current = parseInt(quantityInput.value);
            if (current > 1) {
                quantityInput.value = current - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            const current = parseInt(quantityInput.value);
            quantityInput.value = current + 1;
        });

        // Adicionar ao carrinho
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            cart.addItem(productId, quantity);
        });
    }
}

// ===== FUNCIONALIDADES DA PÁGINA DO CARRINHO =====
class CartPage {
    static init() {
        CartPage.loadCartItems();
        CartPage.setupEventListeners();
    }

    static loadCartItems() {
        const cartItemsList = document.getElementById('cart-items-list');
        const emptyCart = document.getElementById('empty-cart');
        const cartItems = document.getElementById('cart-items');

        if (cart.items.length === 0) {
            emptyCart.style.display = 'block';
            cartItems.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';

        cartItemsList.innerHTML = '';
        
        cart.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    </div>
                    <div class="col-md-4">
                        <h6>${item.name}</h6>
                        <small class="text-muted">Em estoque</small>
                    </div>
                    <div class="col-md-2">
                        <div class="quantity-controls">
                            <button class="btn btn-sm btn-outline-secondary" onclick="CartPage.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="form-control form-control-sm text-center" value="${item.quantity}" min="1" style="width: 60px;" onchange="CartPage.updateQuantity(${item.id}, this.value)">
                            <button class="btn btn-sm btn-outline-secondary" onclick="CartPage.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <strong>${Utils.formatPrice(item.price)}</strong>
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="CartPage.removeItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
        });

        CartPage.updateTotals();
    }

    static updateQuantity(productId, quantity) {
        quantity = parseInt(quantity);
        if (quantity <= 0) {
            CartPage.removeItem(productId);
            return;
        }
        cart.updateQuantity(productId, quantity);
        CartPage.loadCartItems();
    }

    static removeItem(productId) {
        cart.removeItem(productId);
        CartPage.loadCartItems();
    }

    static updateTotals() {
        const subtotal = cart.getTotal();
        const total = subtotal; // Frete grátis
        
        document.getElementById('subtotal').textContent = Utils.formatPrice(subtotal);
        document.getElementById('total').textContent = Utils.formatPrice(total);
    }

    static setupEventListeners() {
        const checkoutBtn = document.getElementById('checkout-btn');
        const applyCouponBtn = document.getElementById('apply-coupon');
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.items.length === 0) {
                    Utils.showAlert('Seu carrinho está vazio!', 'warning');
                    return;
                }
                window.location.href = 'checkout.html';
            });
        }

        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', () => {
                const couponInput = document.getElementById('coupon-input');
                const coupon = couponInput.value.trim().toUpperCase();
                
                if (coupon === 'DESCONTO10') {
                    Utils.showAlert('Cupom aplicado! 10% de desconto concedido.', 'success');
                    couponInput.value = '';
                } else if (coupon) {
                    Utils.showAlert('Cupom inválido!', 'danger');
                } else {
                    Utils.showAlert('Digite um cupom válido!', 'warning');
                }
            });
        }
    }
}

// ===== FUNCIONALIDADES DAS PÁGINAS DE LOGIN/REGISTRO =====
class AuthPages {
    static init() {
        AuthPages.setupEventListeners();
    }

    static setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', AuthPages.handleLogin);
        }

        if (registerForm) {
            registerForm.addEventListener('submit', AuthPages.handleRegister);
        }
    }

    static handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            Utils.showAlert('Preencha todos os campos!', 'warning');
            return;
        }

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const resetLoading = Utils.showLoading(submitBtn);
        
        // Simular requisição
        setTimeout(() => {
            resetLoading();
            Utils.showAlert('Login realizado com sucesso!', 'success');
            
            // Simular redirecionamento após login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    }

    static handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const acceptTerms = document.getElementById('accept-terms').checked;
        
        if (!name || !email || !password || !confirmPassword) {
            Utils.showAlert('Preencha todos os campos!', 'warning');
            return;
        }
        
        if (password !== confirmPassword) {
            Utils.showAlert('As senhas não coincidem!', 'danger');
            return;
        }
        
        if (!acceptTerms) {
            Utils.showAlert('Você deve aceitar os termos de uso!', 'warning');
            return;
        }

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const resetLoading = Utils.showLoading(submitBtn);
        
        // Simular requisição
        setTimeout(() => {
            resetLoading();
            Utils.showAlert('Conta criada com sucesso!', 'success');
            
            // Limpar formulário
            e.target.reset();
            
            // Trocar para aba de login
            document.getElementById('login-tab').click();
        }, 2000);
    }
}

// Função para simular login social
function simulateLogin(provider) {
    Utils.showAlert(`Login com ${provider} simulado com sucesso!`, 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// ===== FUNCIONALIDADES DA PÁGINA DE CHECKOUT =====
class CheckoutPage {
    static init() {
        CheckoutPage.loadOrderSummary();
        CheckoutPage.setupEventListeners();
    }

    static loadOrderSummary() {
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutTotal = document.getElementById('checkout-total');

        if (!checkoutItems) return;

        if (cart.items.length === 0) {
            window.location.href = 'carrinho.html';
            return;
        }

        checkoutItems.innerHTML = '';
        
        cart.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'd-flex justify-content-between align-items-center mb-2';
            itemDiv.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded me-2">
                    <div>
                        <small class="d-block">${item.name}</small>
                        <small class="text-muted">Qtd: ${item.quantity}</small>
                    </div>
                </div>
                <small>${Utils.formatPrice(item.price * item.quantity)}</small>
            `;
            checkoutItems.appendChild(itemDiv);
        });

        const subtotal = cart.getTotal();
        checkoutSubtotal.textContent = Utils.formatPrice(subtotal);
        checkoutTotal.textContent = Utils.formatPrice(subtotal);
    }

    static setupEventListeners() {
        const checkoutForm = document.getElementById('checkoutForm');
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
        
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', CheckoutPage.handleCheckout);
        }

        // Alternar campos de pagamento
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const creditCardFields = document.getElementById('credit-card-fields');
                if (method.value === 'credit' && method.checked) {
                    creditCardFields.style.display = 'block';
                } else if (method.value === 'pix' && method.checked) {
                    creditCardFields.style.display = 'none';
                }
            });
        });
    }

    static handleCheckout(e) {
        e.preventDefault();
        
        // Validar campos obrigatórios
        const requiredFields = e.target.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (!isValid) {
            Utils.showAlert('Preencha todos os campos obrigatórios!', 'warning');
            return;
        }

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const resetLoading = Utils.showLoading(submitBtn);
        
        // Simular processamento do pedido
        setTimeout(() => {
            resetLoading();
            
            // Gerar dados do pedido
            const orderData = {
                id: Utils.generateOrderId(),
                date: Utils.getCurrentDate(),
                total: cart.getTotal(),
                items: [...cart.items]
            };
            
            // Salvar dados do pedido para a página de sucesso
            localStorage.setItem('last_order', JSON.stringify(orderData));
            
            // Limpar carrinho
            cart.clear();
            
            // Redirecionar para página de sucesso
            window.location.href = 'sucesso.html';
        }, 3000);
    }
}

// ===== FUNCIONALIDADES DA PÁGINA DE SUCESSO =====
class SuccessPage {
    static init() {
        SuccessPage.loadOrderDetails();
    }

    static loadOrderDetails() {
        const orderData = localStorage.getItem('last_order');
        
        if (!orderData) {
            window.location.href = 'index.html';
            return;
        }

        const order = JSON.parse(orderData);
        
        // Atualizar elementos da página
        document.getElementById('order-number').textContent = order.id;
        document.getElementById('order-date').textContent = order.date;
        document.getElementById('order-total').textContent = Utils.formatPrice(order.total);

        // Carregar itens para impressão
        const printOrderItems = document.getElementById('print-order-items');
        if (printOrderItems) {
            printOrderItems.innerHTML = '';
            
            order.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'd-flex justify-content-between mb-2';
                itemDiv.innerHTML = `
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>${Utils.formatPrice(item.price * item.quantity)}</span>
                `;
                printOrderItems.appendChild(itemDiv);
            });
        }
    }
}

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Determinar qual página está sendo carregada e inicializar funcionalidades correspondentes
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    
    switch(currentPage) {
        case 'index':
        case '':
            HomePage.init();
            break;
        case 'produto':
            ProductPage.init();
            break;
        case 'carrinho':
            CartPage.init();
            break;
        case 'login':
            AuthPages.init();
            break;
        case 'checkout':
            CheckoutPage.init();
            break;
        case 'sucesso':
            SuccessPage.init();
            break;
    }
    
    // Funcionalidades globais
    cart.updateCartCount();
    
    // Aplicar máscaras em campos de formulário (se existirem)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            e.target.value = value;
        });
    });
    
    const zipInputs = document.querySelectorAll('#zipCode');
    zipInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d{3}).*/, '$1-$2');
            e.target.value = value;
        });
    });
    
    const cardInputs = document.querySelectorAll('#cardNumber');
    cardInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4}).*/, '$1 $2 $3 $4');
            e.target.value = value;
        });
    });
    
    const expiryInputs = document.querySelectorAll('#cardExpiry');
    expiryInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d{2}).*/, '$1/$2');
            e.target.value = value;
        });
    });
});

// Exportar funcionalidades para uso global
window.TechStore = {
    cart,
    Utils,
    HomePage,
    ProductPage,
    CartPage,
    AuthPages,
    CheckoutPage,
    SuccessPage
};