# Philosophy & Religion Explorer

🌍 **Educational Philosophy Learning Platform** - An interactive explorer designed to help students compare philosophical and religious traditions from around the world, with a focus on understanding their perspectives on life's biggest questions.

## 🎓 For Students

This app is designed to be user-friendly and accessible for learners of all backgrounds. Navigate through centuries of human wisdom with:

- **Simple, Clear Explanations**: All content is written in accessible language
- **Interactive Timeline**: Explore how ideas developed over time
- **Three-Pane Dashboard**: Compare traditions side-by-side without confusing popups
- **Educational Tooltips**: Hover over terms like "BCE" or "Abrahamic" for instant definitions

### How to Use This App

1. **Start on the Welcome Screen**: Read the numbered instructions to understand the layout
2. **Browse Tradition Cards**: Click on any philosophy or religion card on the left
3. **Explore Details**: The center pane shows detailed information about your selected tradition
4. **Compare Aspects**: Click any aspect (like "Nature of Reality") to see how all traditions approach that topic
5. **Use the Timeline**: Filter traditions by time period to see historical development

## ✨ Features

- **Three-Pane Dashboard**: No confusing modal popups - everything visible at once
- **Aspect Comparison**: Click any aspect to compare across all 15 traditions
- **Interactive Timeline**: Filter traditions by historical periods (3000 BCE to present)
- **Educational Tooltips**: Hover explanations for technical terms
- **Student-Friendly Design**: Clear language and intuitive navigation
- **Comprehensive Coverage**: 15 major world traditions included
- **Responsive Design**: Works perfectly on tablets and phones
- **Type-Safe Development**: Built with TypeScript for reliability

## 🌐 Live Application

**For Students & Educators**: [https://main.philo-explorer.pages.dev](https://main.philo-explorer.pages.dev)

## 📚 Included Traditions

Our comprehensive collection covers 15 major philosophical and religious traditions:

### Ancient Foundations (3000-500 BCE)
- **Judaism** (c. 2000 BCE) - Monotheism and ethical living
- **Hinduism** (c. 1500 BCE) - Dharma, karma, and spiritual liberation
- **Buddhism** (c. 500 BCE) - Four Noble Truths and the Middle Way
- **Confucianism** (c. 500 BCE) - Social harmony and virtue ethics
- **Jainism** (c. 600 BCE) - Non-violence and spiritual purification

### Classical Period (500 BCE - 500 CE)
- **Stoicism** (c. 300 BCE) - Virtue, wisdom, and emotional resilience
- **Christianity** (c. 30 CE) - Love, salvation, and divine grace
- **Taoism** (c. 400 BCE) - Natural harmony and effortless action

### Medieval & Renaissance (500-1500 CE)
- **Islam** (c. 610 CE) - Submission to Allah and social justice
- **Sikhism** (c. 1500 CE) - Devotion, equality, and service

### Modern Era (1500-Present)
- **Secular Humanism** (c. 1400 CE) - Human dignity and rational ethics
- **Existentialism** (c. 1840 CE) - Individual authenticity and responsibility
- **Utilitarianism** (c. 1780 CE) - Greatest good for the greatest number

### Timeless Wisdom
- **Indigenous Wisdom** (Ongoing) - Connection to nature and community
- **Nihilism** (c. 1860 CE) - Questioning meaning and traditional values

## 👨‍🏫 For Educators

This tool is perfect for:
- **Philosophy Courses**: Comparative religion and ethics classes
- **History Classes**: Understanding cultural and intellectual development
- **Critical Thinking**: Analyzing different approaches to life's big questions
- **World Cultures**: Exploring diverse human perspectives
- **Independent Study**: Student research projects on world wisdom traditions

### Curriculum Integration
- Aligns with world history and philosophy standards
- Supports comparative analysis assignments
- Enables timeline-based historical study
- Facilitates cross-cultural understanding

## 🛠 Technical Details

### Frontend Stack
- ⚡ **React 18 + TypeScript** - Modern, type-safe development
- 🎨 **Tailwind CSS** - Responsive, utility-first styling
- 🧩 **shadcn/ui Components** - Accessible, professional UI elements
- 🔍 **Lucide React Icons** - Consistent, beautiful iconography
- ⚡ **Vite** - Lightning-fast development and builds

### Infrastructure
- ☁️ **Cloudflare Pages** - Global CDN deployment
- 🚀 **Wrangler CLI** - Seamless deployment workflow
- 📱 **Responsive Design** - Mobile-first, works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for deployment)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Sum1Solutions/philo-explorer.git
cd philo-explorer

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5174 in your browser
```

### Build for Production

```bash
# Create production build
npm run build
# Output will be in the dist/ directory
```

## 🚀 Deployment

### Deploy to Cloudflare Pages

1. Install Wrangler CLI (if not already installed):
   ```bash
   npm install -g wrangler@latest
   ```

2. Log in to your Cloudflare account:
   ```bash
   npx wrangler login
   ```

3. Build and deploy:
   ```bash
   npm run build
   npx wrangler pages deploy dist
   ```

## 🏗 Project Architecture

```
philo-explorer/
├── src/
│   ├── pages/
│   │   └── Explorer.tsx      # Main app (1,149 lines) - Three-pane dashboard
│   ├── components/ui/        # Reusable UI components (cards, tooltips, etc.)
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and CSS variables
├── tailwind.config.js       # Tailwind configuration with color safelist
├── vite.config.ts          # Vite build configuration
├── wrangler.jsonc          # Cloudflare Pages deployment config
├── CLAUDE.md               # Developer documentation for AI assistants
└── package.json            # Dependencies and scripts
```

### Key Components
- **Three-Pane Layout**: Replaced modal dialogs with intuitive dashboard
- **Tradition Cards**: Left pane with color-coded philosophical families
- **Detail View**: Center pane with comprehensive tradition information
- **Comparison Panel**: Right pane for aspect-by-aspect analysis
- **Interactive Timeline**: Bottom component for historical filtering
- **Educational Tooltips**: Contextual help throughout the interface

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server (localhost:5174)
npm run build        # Create production build
npm run preview      # Preview production build locally

# Deployment
npx wrangler pages deploy dist  # Deploy to Cloudflare Pages

# Code Quality
npm run lint         # Run ESLint (if configured)
npm run typecheck    # TypeScript type checking
```

## 🎨 Design Philosophy

### Student-Centered UX
- **No Modal Popups**: Three-pane dashboard keeps everything visible
- **Clear Navigation**: Numbered instructions on welcome screen
- **Educational Tooltips**: Hover explanations for technical terms
- **Color Coding**: Visual families help organize traditions
- **Responsive Design**: Works on school tablets and phones

### Educational Approach
- **Accessible Language**: Clear, understandable explanations
- **Comparative Learning**: Side-by-side tradition analysis
- **Historical Context**: Timeline shows development over time
- **Comprehensive Coverage**: 15 major world traditions
- **Cultural Sensitivity**: Respectful, balanced presentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

For any questions or feedback, please open an issue on GitHub.

---

🌐 **Live Site**: [https://main.philo-explorer.pages.dev](https://main.philo-explorer.pages.dev)  
📂 **GitHub**: [https://github.com/Sum1Solutions/philo-explorer](https://github.com/Sum1Solutions/philo-explorer)
