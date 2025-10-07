# TechStore - Loja Online Estática

Uma loja online estática completa construída com HTML, CSS, JavaScript e Bootstrap. Perfeita para demonstrações, portfólio ou como base para projetos maiores.

## 🚀 Demonstração

Este projeto simula uma loja de tecnologia com funcionalidades completas de e-commerce, incluindo:

- ✅ Catálogo de produtos
- ✅ Detalhes de produtos individuais
- ✅ Carrinho de compras funcional
- ✅ Sistema de login/registro simulado
- ✅ Processo de checkout completo
- ✅ Página de confirmação de pedido

## 📁 Estrutura do Projeto

```
projeto-loja/
│
├── index.html          # Página inicial com catálogo de produtos
├── produto.html        # Página de detalhes do produto
├── carrinho.html       # Página do carrinho de compras
├── login.html          # Páginas de login e registro
├── checkout.html       # Página de finalização da compra
├── sucesso.html        # Página de confirmação do pedido
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## 🛠 Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Funcionalidades interativas
- **Bootstrap 5.3** - Framework CSS responsivo
- **Font Awesome 6** - Ícones
- **LocalStorage** - Persistência de dados do carrinho

## 🎯 Funcionalidades

### 🏪 Página Inicial (index.html)
- Grid responsivo com 5 produtos de exemplo
- Cards com imagem, nome, preço e desconto
- Botões para adicionar ao carrinho e ver detalhes
- Hero section com apresentação da loja

### 📱 Página de Produto (produto.html)
- Detalhes completos do produto
- Galeria de imagens
- Lista de características
- Controle de quantidade
- Produtos relacionados
- Breadcrumb navigation

### 🛒 Carrinho de Compras (carrinho.html)
- Lista de produtos adicionados
- Controle de quantidade por produto
- Remoção de itens
- Cálculo automático de totais
- Cupom de desconto (use: DESCONTO10)
- Resumo do pedido

### 👤 Login/Registro (login.html)
- Formulário de login simulado
- Formulário de registro com validação
- Login social simulado (Google, Facebook)
- Validação de campos obrigatórios
- Confirmação de senha

### 💳 Checkout (checkout.html)
- Formulário de dados pessoais
- Endereço de entrega completo
- Opções de pagamento (Cartão/PIX)
- Resumo do pedido
- Validação de formulário
- Máscara automática em campos

### ✅ Página de Sucesso (sucesso.html)
- Confirmação do pedido
- Número do pedido gerado
- Detalhes da compra
- Opção de impressão
- Informações de suporte

## 🚀 Como Usar

### 1. Configuração Local

1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em seu navegador
3. Navegue pelas páginas usando os links da navbar

### 2. Deploy no GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos
3. Vá em Settings > Pages
4. Selecione a branch main como source
5. Seu site estará disponível em: `https://seuusuario.github.io/nome-do-repo`

### 3. Testando Funcionalidades

**Produtos:**
- Navegue pela loja e clique em "Ver Detalhes"
- Adicione produtos ao carrinho
- Teste os controles de quantidade

**Carrinho:**
- Veja os produtos adicionados
- Altere quantidades ou remova itens
- Use o cupom: `DESCONTO10`

**Login:**
- Teste o formulário de login (qualquer email/senha)
- Teste o registro com validação de senha
- Experimente o login social

**Checkout:**
- Preencha o formulário completo
- Teste as validações de campo
- Experimente diferentes formas de pagamento

## 🎨 Personalização

### Produtos
Edite o array `products` no arquivo `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Nome do Produto",
        price: 999.99,
        originalPrice: 1199.99,
        image: "URL_da_imagem",
        description: "Descrição do produto",
        category: "categoria",
        features: ["Característica 1", "Característica 2"]
    }
    // Adicione mais produtos aqui
];
```

### Cores e Estilos
Modifique as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    /* Outras cores... */
}
```

### Textos e Conteúdo
- Nome da loja: Altere "TechStore" nos arquivos HTML
- Descrições: Edite os textos nas páginas HTML
- Footer: Modifique as informações de contato

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (até 767px)

## 🔧 Funcionalidades Técnicas

### Sistema de Carrinho
- Persistência com LocalStorage
- Cálculo automático de totais
- Contagem de itens na navbar
- Validações de quantidade

### Simulações
- Login/registro com alertas
- Processamento de pagamento
- Geração de número de pedido
- Envio de formulários

### Validações
- Campos obrigatórios
- Confirmação de senha
- Máscaras de entrada (telefone, CEP, cartão)
- Cupons de desconto

## 🚀 Melhorias Futuras

Para transformar em uma loja real, adicione:

- [ ] Backend com API REST
- [ ] Banco de dados
- [ ] Autenticação real
- [ ] Gateway de pagamento
- [ ] Sistema de estoque
- [ ] Painel administrativo
- [ ] Sistema de avaliações
- [ ] Busca e filtros
- [ ] Wishlist
- [ ] Comparação de produtos

## 📄 Licença

Este projeto é livre para uso pessoal e comercial. Sinta-se à vontade para modificar e distribuir.

## 🤝 Contribuições

Contribuições são bem-vindas! Algumas ideias:

- Novos produtos e categorias
- Melhorias no design
- Novas funcionalidades
- Correção de bugs
- Otimizações de performance

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato:

- Email: contato@techstore.com (simulado)
- GitHub: Crie uma issue no repositório

---

**TechStore** - Uma loja online completa e responsiva! 🛍️