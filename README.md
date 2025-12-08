# COF - Controle Orçamentário Familiar v2.0

Sistema completo de controle de gastos familiares com interface moderna e funcionalidades avançadas.

## 🚀 Melhorias Implementadas

### ✅ Correções
- **Bug da tela em branco corrigido**: Após salvar um gasto, redireciona corretamente para o dashboard
- **Subcategoria agora é opcional**: Campo não obrigatório com autocomplete das subcategorias já usadas

### 🎨 Interface (UX/UI)
- Design System com variáveis CSS
- Dark Mode completo (toggle no header)
- Toast notifications (substitui alert())
- Loading skeletons
- Animações suaves de transição
- Responsivo para mobile
- Menu hamburguer em telas pequenas

### 📱 PWA (Progressive Web App)
- Manifest.json configurado
- Service Worker para cache offline
- Instalável no celular
- Ícones em múltiplos tamanhos

### 💡 Funcionalidades
- Dashboard com resumo completo
- Indicadores de limite com alertas visuais (50%, 80%, 100%)
- Comparativo com mês anterior
- Média diária de gastos
- Gráficos avançados (evolução, categorias, fixos vs variáveis, responsáveis)
- Pesquisa avançada com filtros
- Exportação Excel e PDF
- Backup/Restore de dados
- Logs de todas as ações

### 🔧 Técnico
- Código modularizado (shared.js)
- CSS organizado com variáveis
- Melhor gerenciamento de estado
- Validações aprimoradas

## 📁 Estrutura de Arquivos

```
cof/
├── index.html          # Login
├── dashboard.html      # Painel principal
├── adicionar.html      # Adicionar/Editar gastos
├── graficos.html       # Gráficos e análises
├── historico.html      # Lista de gastos
├── pesquisa.html       # Pesquisa avançada
├── config.html         # Configurações
├── manifest.json       # PWA manifest
├── service-worker.js   # Cache offline
├── css/
│   └── styles.css      # Estilos compartilhados
├── js/
│   └── shared.js       # JavaScript compartilhado
├── icons/
│   └── icon.svg        # Ícone base (gerar PNGs)
└── README.md           # Este arquivo
```

## 🔑 Como Usar

1. Faça upload de todos os arquivos para seu repositório GitHub
2. Substitua os arquivos existentes na pasta `/cof/`
3. Commit e push
4. Acesse pelo GitHub Pages

## 🖼️ Gerar Ícones PNG

Para gerar os ícones PNG a partir do SVG, você pode usar ferramentas online como:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

Ou via linha de comando com ImageMagick:
```bash
convert icons/icon.svg -resize 72x72 icons/icon-72.png
convert icons/icon.svg -resize 96x96 icons/icon-96.png
convert icons/icon.svg -resize 128x128 icons/icon-128.png
convert icons/icon.svg -resize 144x144 icons/icon-144.png
convert icons/icon.svg -resize 152x152 icons/icon-152.png
convert icons/icon.svg -resize 192x192 icons/icon-192.png
convert icons/icon.svg -resize 384x384 icons/icon-384.png
convert icons/icon.svg -resize 512x512 icons/icon-512.png
```

## 🔐 Segurança

**IMPORTANTE**: As credenciais do Firebase estão expostas no código. Para produção, recomenda-se:

1. Configurar Firebase Security Rules:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

2. Implementar Firebase Authentication real (substituir sessionStorage)

## 📝 Changelog v2.0

- Nova interface com design moderno
- Dark mode
- Toast notifications
- Subcategoria opcional
- Correção bug tela em branco
- Indicadores de limite aprimorados
- Pesquisa avançada
- Exportação PDF/Excel
- PWA completo
- Backup/Restore
- Logs de ações

---

Desenvolvido com ❤️ para a família César
