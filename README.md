# Philosophy & Religion Explorer

An interactive explorer to compare philosophical and religious traditions, with a focus on their perspectives on the meaning of life. Features include a comparison view, timeline filtering, and detailed exploration of each tradition.

## ✨ Features

- **Comparison View**: Click any aspect (e.g., "Nature of Reality") to compare it across all traditions
- **Timeline Navigation**: Filter traditions by time period using the interactive timeline
- **Detailed Exploration**: Drill down into each tradition for in-depth information
- **Responsive Design**: Works on desktop and mobile devices
- **Type-Safe**: Built with TypeScript for better developer experience

## 🚀 Live Demo

Access the live application at: [https://main.philo-explorer.pages.dev](https://main.philo-explorer.pages.dev)

## 🛠 Tech Stack

- ⚡ Vite + React 18 + TypeScript
- 🎨 Tailwind CSS for styling
- 🧩 Minimal UI primitives (card, dialog, tabs, etc.)
- 🔍 Icons: lucide-react
- ☁️ Deploy: Cloudflare Pages with Wrangler

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

## 🏗 Project Structure

- `src/pages/Explorer.tsx` - Main application component with data model and UI logic
- `src/components/ui/*` - Reusable UI components
- `tailwind.config.js` - Tailwind CSS configuration with custom theme
- `vite.config.ts` - Vite configuration
- `package.json` - Project dependencies and scripts

## 🧪 Testing

To run the test suite:

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

For any questions or feedback, please open an issue on GitHub.

---

🌐 **Live Site**: [https://main.philo-explorer.pages.dev](https://main.philo-explorer.pages.dev)  
📂 **GitHub**: [https://github.com/Sum1Solutions/philo-explorer](https://github.com/Sum1Solutions/philo-explorer)
