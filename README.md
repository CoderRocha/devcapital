# 📈 Dev Capital

> **Calculadora de Juros Compostos para Desenvolvedores**

![Dev Capital](https://img.shields.io/badge/Dev%20Capital-v1.0.0-5BA32C?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Utilizar](#como-utilizar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Autor](#autor)

## Sobre o Projeto

O **Dev Capital** é uma calculadora de juros compostos desenvolvida especificamente para desenvolvedores que desejam planejar sua aposentadoria e crescimento financeiro ao longo da carreira. A aplicação permite configurar diferentes fases profissionais (Júnior, Pleno, Sênior e Tech Lead) com salários e durações personalizáveis, calculando automaticamente quanto será acumulado considerando os juros compostos.

### Design

O projeto foi desenvolvido com foco em uma UX/UI Friendly, Clean e Moderna, levando como inspiração o design do Airbnb.
Foi utilizada uma paleta de cores verde, com a cor primária sendo o tom de verde (#5BA32C), combinando com a logo e a proposta do projeto.

## Funcionalidades

### 🧮 Calculadora de Juros Compostos

O **Dev Capital** possui as seguintes funcionalidades:

- **Taxa de juros configurável**
- **Aporte inicial**
- **Percentual de economia**
- **Fases da carreira**

  - Júnior
  - Pleno
  - Sênior
  - Tech Lead

- **Cálculo em tempo real**

### Visualizações

- **Timeline da carreira**:

  - Salário mensal
  - Valor guardado por mês
  - Total guardado na fase
  - Valor acumulado ao final da fase

- **Resumo final**:

  - Total guardado
  - Juros ganhos
  - Valor final acumulado

### Idiomas

- **Suporte multilíngue**: Português (PT-BR) e Inglês (EN-US)
- **Moeda de câmbio**: (R$) para português e ($) para inglês

### Tema
- **Modo claro e escuro**: Alternância suave entre temas, respeitando a preferência do sistema

### Exportação

- **Geração de PDF**:

  - Timeline detalhada de todas as fases
  - Resultados finais
  - Informações formatadas conforme o idioma selecionado

### Responsividade

- **Design responsivo**: Otimizado para desktop, tablet e mobile

### Animações~

- **Transições suaves**: Animações fade-in-up ao carregar a página, calcular e exibir resultados

## 🛠 Tecnologias Utilizadas

- **[Next.js 16.0.1](https://nextjs.org/)**
- **[React 19.2.0](https://react.dev/)**
- **[TypeScript 5.0](https://www.typescriptlang.org/)**

- **[Tailwind CSS 4.0](https://tailwindcss.com/)**
- **[Shadcn UI](https://ui.shadcn.com/)**
- **[Lucide React](https://lucide.dev/)**

- **[jsPDF 3.0.4](https://github.com/parallax/jsPDF)**
- **[Radix UI](https://www.radix-ui.com/)**
- **[Class Variance Authority](https://cva.style/)**

- **[PostCSS](https://postcss.org/)**
- **[tw-animate-css](https://www.npmjs.com/package/tw-animate-css)**

## Instalação

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.0+
- **npm** 9.0+ (**yarn** / **pnpm**)

Depois de instalar as dependências, siga o passo a passo abaixo:

1. **Clone o repositório**

   ```bash
   git clone https://github.com/coderrocha/devcapital.git
   cd devcapital
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o projeto localmente**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Acesse a a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Como Utilizar

### 1. Configurar Valores

- **Taxa de Juros**: Selecione entre taxa anual ou mensal e ajuste o valor usando o slider ou input
- **Aporte Inicial**: Digite o valor inicial que você já possui para investir (caso tenha)
- **Percentual de Economia**: Configure quanto do salário será guardado

### 2. Configurar Fases da Carreira

Para cada fase (Júnior, Pleno, Sênior, Tech Lead):

- Ajuste o **salário mensal** do cargo
- Defina a **duração em anos** de cada fase

### 3. Calcular

Clique no botão **"Calcular"** para visualizar os resultados.

### 4. Visualizar Resultados

- **Timeline**: Veja os detalhes de cada fase da carreira

- **Resumo Final**: Confira o total guardado, juros ganhos e valor final

### 5. Exportar PDF

Clique no botão **"Baixar"** para gerar e baixar um PDF com todos os resultados.

## 📁 Estrutura do Projeto

```
devcapital/
├── src/
│   ├── app/                   # Páginas e layouts do Next.js
│   │   ├── assets/            # Assets do Projeto
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Página principal
│   ├── components/            # Componentes (React)
│   │   ├── calculator/        # Componentes da calculadora
│   │   │   ├── CalculatorHeader.tsx
│   │   │   ├── CareerPhasesConfig.tsx
│   │   │   ├── InitialDepositInput.tsx
│   │   │   ├── InterestRateSelector.tsx
│   │   │   ├── PhaseCard.tsx
│   │   │   ├── ResultsSummary.tsx
│   │   │   ├── SavingsPercentageInput.tsx
│   │   │   └── Timeline.tsx
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LanguageSwitch.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── ui/                # Componentes UI (Shadcn)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── slider.tsx
│   ├── contexts/              # Contextos (React)
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   └── lib/                   # Utils e Bibliotecas
│       ├── pdfGenerator.ts
│       └── utils.ts
├── public/                    # Arquivos públicos
├── package.json
├── tailwind.config.ts         # Configuração do Tailwind
├── tsconfig.json              # Configuração do TypeScript
└── README.md
```

## Autor

**Guilherme Rocha (CoderRocha)**

- GitHub: [CoderRocha](https://github.com/coderrocha)
- LinkedIn: [Guilherme Rocha](https://www.linkedin.com/in/guilherme-rocha-da-silva)

---