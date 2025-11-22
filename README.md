# ⚡ Elias.Dev | Portfólio Pessoal

![Elias Santos](https://img.shields.io/badge/Elias-Santos-black?style=for-the-badge&logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

Bem-vindo ao repositório oficial do meu portfólio: **[elias.dev](https://elias.dev)**.

Sou o **Elias Santos**, Desenvolvedor Fullstack. Este projeto foi concebido não apenas para apresentar os meus trabalhos, mas para servir, por si só, como uma demonstração das minhas competências em engenharia de software, design de interfaces e otimização de performance.

---

## 👨‍💻 Sobre o Projeto

A minha filosofia é **unir performance técnica a um design impecável**. Este site reflete isso através de uma estética minimalista "Dark Mode", micro-interações fluidas e uma arquitetura robusta.

### ✨ Destaques da Implementação
- **Identidade Visual:** Design monocromático (Alvinegro) inspirado na minha identidade pessoal e na simbologia da **âncora** (estabilidade e navegação).
- **Engenharia de Ponta:** Construído sobre **Next.js 16 (App Router)** e **React Server Components** para uma velocidade instantânea.
- **Experiência Nativa:** Utilização de scroll inercial e gestos de arrastar (*drag-to-dismiss*) para uma sensação de aplicação nativa na web.

---

## 🛠️ Stack Tecnológica

As tecnologias escolhidas representam o estado da arte no desenvolvimento web moderno:

- **Core:** [Next.js 16](https://nextjs.org/) & [React 19](https://react.dev/)
- **Estilo:** [Tailwind CSS v4](https://tailwindcss.com/) (Configuração CSS-first)
- **Animações:** [Framer Motion](https://www.framer.com/motion/) (Layouts partilhados e gestos)
- **UX & Scroll:** [Lenis Scroll](https://lenis.darkroom.engineering/) (Rolagem suave)
- **Validação:** [Zod](https://zod.dev/) & React Hook Form
- **Deploy:** [Vercel](https://vercel.com/)

---

## 🚀 Funcionalidades Exclusivas

### 1. Modal "Magic Motion"
Uma transição contínua onde o cartão do projeto se expande para ocupar o ecrã.
- **Scroll Lock Inteligente:** O fundo bloqueia suavemente, impedindo a rolagem da página principal.
- **Drag-to-Dismiss:** No telemóvel, basta arrastar o modal para baixo para fechar.
- **Scroll Isolado:** O conteúdo interno rola independentemente, sem conflitos com o scroll da página.

### 2. Fundo Tecnológico Reactivo
Um canvas HTML5 personalizado (`TechBackground.tsx`) que renderiza uma rede neural de partículas.
- **Interativo:** As conexões reagem à proximidade do cursor.
- **Dinâmico:** A rede "estica" e as partículas aceleram conforme o utilizador faz scroll entre as secções.

### 3. SEO Programático
Geração automática de *assets* estáticos via código:
- **Favicon Dinâmico:** Uma âncora dourada/branca gerada em SVG.
- **Open Graph Images:** Cartões de partilha social gerados dinamicamente para cada rota.

### 4. Micro-interações Premium
- **Botões Magnéticos:** Os botões atraem subtilmente o cursor.
- **HyperText:** O meu nome "descodifica" ao carregar a página (efeito *hacker*).
- **Cursor Personalizado:** Um cursor que inverte as cores do fundo (efeito *blend-mode*).

---

## 📂 Estrutura do Projeto

```bash
src/
├── app/                  # Rotas e Layouts (App Router)
│   ├── globals.css       # Configuração do Tailwind v4 e Temas (@theme)
│   ├── icon.tsx          # Geração do Favicon (Âncora)
│   └── opengraph-image.tsx # Social Card dinâmico
├── components/
│   ├── ui/               # Componentes de Design System (ProjectModal, MagneticButton, etc.)
│   ├── ClientProviders.tsx # Contextos do Cliente (Lenis, Toaster)
│   └── ...               # Secções (Hero, Projects, Contact, etc.)
├── hooks/                # Hooks personalizados (ex: useScrollLock)
└── contexts/             # Gestão de estado global (LenisContext)
```

## 🚀 Como Executar Localmente

Clone o repositório:

```bash
git clone https://github.com/Eliazynho/portfolio.git
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Aceda a [http://localhost:3000](http://localhost:3000).

## 📄 Contato

Se é um recrutador, cliente ou programador e gostou do resultado, sinta-se à vontade para entrar em contacto. Estou disponível para projetos desafiantes.

<div align="center">

[![Email](https://img.shields.io/badge/Email-Entre_em_Contato-white?style=for-the-badge&logo=gmail&logoColor=black)](mailto:m10elias10@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/eliassantos1)
[![GitHub](https://img.shields.io/badge/GitHub-Ver_Perfil-181717?style=for-the-badge&logo=github)](https://github.com/Eliazynho)

</div>

Desenvolvido por Elias Santos.