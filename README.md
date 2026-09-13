# Karen Store — E-commerce de moda feminina

Web app mobile-first de vendas de roupas femininas, com painel administrativo completo, construído em React + TypeScript + Vite + Tailwind CSS.

## Como rodar o projeto

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Acesso ao painel administrativo

Acesse `/admin`. A senha de desenvolvimento padrão é `karenstore123`.

Essa autenticação é apenas local (guarda uma flag no navegador) e **não é segura para produção** — veja os comentários em `src/services/authService.ts`. Antes de a loja receber pedidos reais, substitua por um login real com backend.

Para trocar a senha localmente, crie um arquivo `.env` na raiz com:

```
VITE_ADMIN_DEV_PASSWORD=sua_senha_aqui
```

## Estrutura do projeto

```
src/
  components/   componentes reutilizáveis (ui, produto, carrinho, checkout, admin...)
  pages/        páginas públicas e páginas de admin (pages/admin)
  layouts/      layout público (header/rodapé/nav) e layout do admin
  context/      estado global: carrinho, favoritos, autenticação, dados da loja
  services/     camada de dados (produtos, categorias, banners, pedidos, config, whatsapp)
  data/         dados iniciais de demonstração (seed)
  types/        tipos TypeScript do domínio (Product, Category, Order...)
  hooks/        hooks reutilizáveis
  utils/        funções utilitárias
```

## Sobre os dados

O catálogo, categorias, banners e configurações da loja usam **dados de demonstração** (arquivos em `src/data/`) como valor inicial, e todas as edições feitas pelo painel `/admin` são salvas no `localStorage` do navegador — uma camada de prototipagem, não um banco de dados real (veja `src/services/storage.ts`). A arquitetura de serviços foi pensada para que essa camada possa ser trocada por chamadas de API reais no futuro sem alterar as telas.

Os 19 produtos iniciais são fictícios, criados apenas para a loja não começar vazia — edite, duplique ou exclua qualquer um deles em `/admin/produtos`.

## Configuração pendente

Alguns dados da loja (WhatsApp, Instagram, TikTok, e-mail, endereço, horário, políticas) ainda não foram informados e aparecem como `[Configure no painel administrativo]`. Preencha-os em `/admin/configuracoes`.
