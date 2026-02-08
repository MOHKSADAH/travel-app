# AI Travel Planner

<img width="1841" height="2302" alt="screencapture-localhost-5173-dashboard-2025-08-30-00_46_53" src="https://github.com/user-attachments/assets/0c772fd1-8225-46c0-9075-d9f22e312371" />
<img width="1524" height="1895" alt="screencapture-localhost-5173-trips-create-2025-08-30-00_48_13" src="https://github.com/user-attachments/assets/a2613929-11fe-43d3-b5d1-9d42ab7f1629" />
<img width="1741" height="4107" alt="screencapture-localhost-5173-trips-68b21eb500253ed84e76-2025-08-30-00_43_55" src="https://github.com/user-attachments/assets/042a332b-116d-49d1-8b18-0ffb38104b6b" />

A travel planning application that generates personalized itineraries using Google's Gemini AI. Built with React Router v7, TypeScript, and Appwrite.

## Features

### AI-Powered Trip Generation

- Generate detailed day-by-day travel plans using Google Gemini AI
- Personalized recommendations based on budget, interests, and travel style
- Budget breakdown including accommodation, meals, activities, and transport
- Cultural tips, weather information, and best travel times

### Interactive Experience

- World map integration for destination selection
- Automatic destination image fetching via Unsplash API
- Responsive design for desktop and mobile devices

### Admin Dashboard

- Analytics dashboard with statistics and charts using Syncfusion components
- User management interface
- Trip monitoring and management
- Role-based access control

### Authentication & Security

- Google OAuth integration
- Role-based authorization (admin and user roles)
- Session management with Appwrite
- Protected routes for authenticated areas

## Tech Stack

### Frontend

- **React Router v7** - Routing with SSR support
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Syncfusion Components** - UI components
- **Vite** - Build tool and dev server

### Backend & Services

- **Appwrite** - Authentication and database
- **Google Gemini AI** - Trip generation
- **Unsplash API** - Destination images
- **Node.js** - Server-side runtime

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Docker** - Containerization

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Cloud account (for Gemini AI API)
- Appwrite account and project
- Unsplash account (for images)

### Installation

```bash
git clone https://github.com/yourusername/travel-app.git
cd travel-app
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Unsplash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Appwrite Configuration
VITE_APPWRITE_API_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_API_KEY=your_api_key
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
VITE_APPWRITE_TRIPS_COLLECTION_ID=your_trips_collection_id
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
travel-app/
├── app/                          # Main application code
│   ├── routes/                   # Route components
│   │   ├── admin/               # Admin-only routes
│   │   ├── root/                # Public routes
│   │   └── api/                 # API endpoints
│   ├── appwrite/                # Backend service integrations
│   ├── components/              # Reusable UI components
│   ├── constants/               # App constants and configurations
│   └── lib/                     # Utility functions
├── components/                   # Shared components
├── public/                      # Static assets
└── ...config files
```

## Configuration

### Appwrite Setup

1. Create an Appwrite project
2. Set up authentication with Google OAuth
3. Create databases and collections (Users, Trips)
4. Configure API keys and permissions

### Google Gemini AI

1. Enable the Gemini API in Google Cloud Console
2. Create an API key
3. Add the key to your environment variables

### Unsplash API

1. Create an Unsplash developer account
2. Create a new application
3. Use the access key in your environment

## Usage

### For Users

1. Sign in with Google OAuth
2. Select destination, preferences, and budget
3. Generate personalized itinerary with AI
4. View detailed day-by-day plans and recommendations

### For Admins

1. Access dashboard to monitor statistics and activity
2. Manage user accounts and permissions
3. View and manage all generated trips
4. Track platform usage and popular destinations

## Deployment

### Docker

```bash
# Build the image
docker build -t travel-app .

# Run the container
docker run -p 3000:3000 travel-app
```

### Production Build

```bash
npm run build
```

Deployment platforms: Vercel, Netlify, Railway, Digital Ocean, AWS, Google Cloud, Azure

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Router](https://reactrouter.com/)
- [Appwrite](https://appwrite.io/)
- [Google Gemini AI](https://ai.google.dev/)
- [Unsplash](https://unsplash.com/)
- [Syncfusion](https://www.syncfusion.com/)
