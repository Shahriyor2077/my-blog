# Shahriyor Zaripov - Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern dark theme design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📧 Contact form with Telegram integration
- 🔗 Static projects showcase
- 🎯 SEO optimized with React Helmet
- 🌙 Dark mode by default
- 📊 Smooth scroll navigation

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: React Helmet Async
- **Notifications**: Telegram Bot API

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm
- Telegram Bot Token (for contact form)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

#### Telegram Bot Setup
- Go to [@BotFather](https://t.me/BotFather) on Telegram
- Create a new bot and get your `VITE_TELEGRAM_BOT_TOKEN`
- Get your chat ID from [@userinfobot](https://t.me/userinfobot)
- Add these to `.env`:
```
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
```

### Development

Start the development server:
```bash
pnpm run dev
```

The site will be available at `http://localhost:5173`

### Build

Build for production:
```bash
pnpm run build
```

Preview production build:
```bash
pnpm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with scroll detection
│   ├── Footer.jsx          # Footer with contact info
│   └── LoadingSpinner.jsx  # Loading animation
├── pages/
│   └── LandingPage.jsx     # Main landing page (all sections)
├── data/
│   └── personalData.js     # Personal info, skills, experience, projects
├── hooks/
│   └── useTheme.jsx        # Dark theme provider
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram bot token | ✅ |
| `VITE_TELEGRAM_CHAT_ID` | Telegram chat ID | ✅ |

## Customization

### Update Personal Information
Edit `src/data/personalData.js` to update:
- Personal info
- Social links
- Skills
- Work experience
- Education
- Certificates
- Awards
- Projects

### Update Projects
Edit the `projects` array in `src/data/personalData.js`:
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Title",
    description: "Project description",
    image: "https://example.com/image.jpg",
    url: "https://project-demo.com",
    github: "https://github.com/username/project",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  // Add more projects...
];
```

### Update Styles
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes in JSX

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The `vercel.json` file is configured for Vercel. For other platforms:

1. Build: `pnpm run build`
2. Deploy the `dist` folder

## License

This project is open source and available under the MIT License.

## Contact

- Email: zaripovshahriyor91@gmail.com
- GitHub: [@Shahriyor2077](https://github.com/Shahriyor2077)
- LinkedIn: [Shahriyor Zaripov](https://www.linkedin.com/in/shahriyor-zaripov-51b399346)
- Telegram: [@shahriyorjs](https://t.me/shahriyorjs)

---

Made with ❤️ by Shahriyor Zaripov
