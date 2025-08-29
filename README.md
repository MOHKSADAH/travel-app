# 🌍 AI Travel Planner

> **An intelligent travel planning platform that creates personalized itineraries using AI**

A modern, full-stack web application that leverages Google's Gemini AI to generate detailed travel itineraries based on user preferences. Built with React Router v7, TypeScript, and integrated with Appwrite for backend services.

## ✨ Features

### 🤖 AI-Powered Trip Generation

- **Smart Itineraries**: Generate detailed day-by-day travel plans using Google Gemini AI
- **Personalized Recommendations**: Tailored suggestions based on budget, interests, and travel style
- **Budget Breakdown**: Detailed cost analysis including accommodation, meals, activities, and transport
- **Local Insights**: Cultural tips, weather information, and best travel times

### 🗺️ Interactive Experience

- **World Map Integration**: Select destinations on an interactive world map
- **Visual Trip Planning**: Automatic destination image fetching via Unsplash API
- **Responsive Design**: Optimized for desktop and mobile devices

### 👨‍💼 Admin Dashboard

- **Analytics Dashboard**: Comprehensive statistics and charts using Syncfusion components
- **User Management**: View and manage all registered users
- **Trip Management**: Monitor and manage all generated trips
- **Role-Based Access**: Secure admin-only sections with authentication

### 🔐 Authentication & Security

- **Google OAuth**: Seamless sign-in with Google accounts
- **Role-Based Authorization**: Admin and user roles with appropriate permissions
- **Session Management**: Secure session handling with Appwrite
- **Protected Routes**: Authentication guards for sensitive areas

## 🛠️ Tech Stack

### Frontend

- **React Router v7** - Modern routing with SSR support
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Syncfusion Components** - Professional UI components
- **Vite** - Fast build tool and dev server

### Backend & Services

- **Appwrite** - Backend-as-a-Service for authentication and database
- **Google Gemini AI** - Advanced AI for trip generation
- **Unsplash API** - High-quality destination images
- **Node.js** - Server-side JavaScript runtime

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Docker** - Containerization support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Cloud account (for Gemini AI API)
- Appwrite account and project
- Unsplash account (for images)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/travel-app.git
cd travel-app
npm install
```

### 2. Environment Setup

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

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application.

## 📁 Project Structure

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

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite project
2. Set up authentication with Google OAuth
3. Create databases and collections:
    - Users collection
    - Trips collection
4. Configure API keys and permissions

### Google Gemini AI

1. Enable the Gemini API in Google Cloud Console
2. Create an API key
3. Add the key to your environment variables

### Unsplash API

1. Create an Unsplash developer account
2. Create a new application
3. Use the access key in your environment

## 🎯 Usage

### For Users

1. **Sign In**: Use Google OAuth to authenticate
2. **Plan Trip**: Select destination, preferences, and budget
3. **Generate**: Let AI create your personalized itinerary
4. **Explore**: View detailed day-by-day plans and recommendations

### For Admins

1. **Dashboard**: Monitor platform statistics and user activity
2. **Users**: Manage user accounts and permissions
3. **Trips**: View and manage all generated trips
4. **Analytics**: Track platform usage and popular destinations

## 🚢 Deployment

### Docker Deployment

```bash
# Build the image
docker build -t travel-app .

# Run the container
docker run -p 3000:3000 travel-app
```

### Platform Deployment

The application is ready for deployment on:

- **Vercel** (Recommended for React Router apps)
- **Netlify**
- **Railway**
- **Digital Ocean App Platform**
- **AWS/Google Cloud/Azure**

### Production Build

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Router](https://reactrouter.com/) for the excellent routing solution
- [Appwrite](https://appwrite.io/) for backend services
- [Google Gemini AI](https://ai.google.dev/) for intelligent trip generation
- [Unsplash](https://unsplash.com/) for beautiful destination images
- [Syncfusion](https://www.syncfusion.com/) for professional UI components

---

**Built with ❤️ by [Your Name](https://github.com/yourusername)**

_Star ⭐ this repository if you find it helpful!_
