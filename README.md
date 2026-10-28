# Chat GPT

A modern, responsive AI chat web application inspired by ChatGPT. Built with React, Vite, and modern CSS.

## Features

- Clean and minimal user interface
- Light and dark theme support
- Responsive design for desktop, tablet, and mobile
- Create and manage multiple conversations
- Search conversations
- Rename and delete conversations
- Mock AI responses (ready for API integration)
- LocalStorage persistence
- Typing indicators and loading states
- Auto-resizing message composer
- Copy message functionality
- Suggested prompt cards

## Tech Stack

- React 18
- Vite
- React Router DOM
- Lucide React (icons)
- CSS3 with CSS Variables
- LocalStorage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Chat-GPT
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Connecting to a Real AI Backend

This application currently uses mock responses from `src/services/chatService.js`. To connect to a real AI API:

1. Create a backend service to handle API calls securely (never expose API keys in frontend)
2. Update `src/services/chatService.js` to make HTTP requests to your backend
3. Handle authentication and error cases appropriately

Example integration:
```javascript
export const sendMessage = async (message) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return data.response;
};
```

## Project Structure

See the source files for detailed organization. The app uses:
- `components/` - Reusable UI components
- `pages/` - Page components
- `hooks/` - Custom React hooks
- `context/` - React Context for state management
- `services/` - API and storage services
- `utils/` - Utility functions
- `styles/` - CSS stylesheets

## License

MIT
