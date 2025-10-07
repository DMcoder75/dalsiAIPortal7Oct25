# DalSi AI Portal

**Artificial Intelligence Made Real**

A comprehensive AI-powered portal featuring text and vision AI models, user authentication, chat management, and subscription-based services.

## 🚀 Live Demo

**Production URL**: [https://innate-temple-337717.web.app](https://innate-temple-337717.web.app)

---

## ✨ Features

### 🔐 Authentication System
- User registration with email verification
- Secure login with persistent sessions
- Guest user support with message migration
- Password reset functionality

### 💬 AI Chat Interface
- **DalSi AI**: Advanced text-based AI engine
- **DalSi AI-Vi**: Multimodal vision AI (subscribers only)
- Real-time streaming responses
- Conversation context management (10 messages)
- Auto-chat creation on first message

### 📁 Chat Management
- Auto-generated chat titles
- Archive/unarchive chats
- Rename chats
- Delete chats with confirmation
- Message limit: 11 per chat

### 👤 User Limits
- **Guest users**: 1 free message
- **Registered users**: 4 free messages total
- **Subscribers**: Unlimited messages + vision AI

### 🎨 UI/UX
- Responsive design (mobile, tablet, desktop)
- Brand color palette (Neo Purple theme)
- Animated icons with hover effects
- Dark mode optimized
- Professional typography

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **shadcn/ui** components

### Backend & Services
- **Supabase** (PostgreSQL database)
- **Firebase Hosting** (deployment)
- **Firebase Functions** (email verification)
- **DalSi AI APIs** (text & vision models)

### Authentication
- Custom authentication system
- Email verification via Firebase Functions
- Session management with Supabase

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase CLI
- Supabase account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/DMcoder75/dalsiAIPortal7Oct25.git
cd dalsiAIPortal7Oct25
```

2. **Install dependencies**
```bash
npm install
cd functions && npm install && cd ..
```

3. **Configure environment variables**

Create `.env` file in the root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Configure Firebase**

Create `innate-temple-337717-firebase-adminsdk-fbsvc-*.json` with your Firebase service account credentials.

Update `firebase.json` and `.firebaserc` with your Firebase project details.

5. **Run development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
```

7. **Deploy to Firebase**
```bash
firebase deploy
```

---

## 📂 Project Structure

```
dalsiAIPortal7Oct25/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── EnhancedChatInterface.jsx
│   │   ├── Navigation.jsx
│   │   ├── AuthModal.jsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   ├── lib/                # Utility libraries
│   │   ├── auth.js
│   │   ├── dalsiAPI.js
│   │   ├── supabase.js
│   │   └── usageTracking.js
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── VerifyEmail.jsx
│   │   └── ...
│   └── main.jsx            # Entry point
├── functions/              # Firebase Functions
│   └── index.js           # Email verification
├── public/                 # Static assets
├── firebase.json          # Firebase configuration
├── tailwind.config.js     # Tailwind configuration
└── vite.config.js         # Vite configuration
```

---

## 🎨 Brand Colors

### Primary Colors
- **Neo Purple**: `#8B5CF6` (Main brand color)
- **Purple**: `#7C3AED` (Secondary)
- **Dark Purple**: `#5B21B6` (Accents)

### Accent Colors
- **Bright Purple**: `#D8B4FE` (DalSi AI-Vi)
- **Red**: `#EF4444` (Healthcare)

### Background
- **Background**: `#0F172A` (Dark navy)
- **Card**: `#1E293B` (Elevated surfaces)

---

## 📊 Database Schema

### Tables

#### `users`
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `first_name` (String)
- `last_name` (String)
- `password_hash` (String)
- `email_verified` (Boolean)
- `created_at` (Timestamp)

#### `chats`
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `title` (String)
- `archived` (Boolean)
- `created_at` (Timestamp)

#### `messages`
- `id` (UUID, Primary Key)
- `chat_id` (UUID, Foreign Key)
- `sender` ('user' | 'ai')
- `content` (Text)
- `created_at` (Timestamp)

#### `user_sessions`
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `session_token` (String)
- `expires_at` (Timestamp)

---

## 🔧 Configuration

### DalSi AI APIs

**Text Model (DalSi AI)**
- Endpoint: `https://dalsiai-106681824395.asia-south2.run.app`
- Features: Text generation, conversation
- Access: Free tier available

**Vision Model (DalSi AI-Vi)**
- Endpoint: `https://dalsiaivi-service-594985777520.asia-south2.run.app`
- Features: Image analysis, multimodal
- Access: Subscription required

### Email Configuration

Firebase Functions use Gmail SMTP:
- Email: `dalsiainoreply@gmail.com`
- App Password: (configured in Firebase Functions)

---

## 🚀 Deployment

### Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Firebase Functions

```bash
# Deploy email verification function
firebase deploy --only functions
```

---

## 📝 Usage Limits

| User Type | Messages | Features |
|-----------|----------|----------|
| **Guest** | 1 | Text AI only |
| **Registered** | 4 total | Text AI, chat history |
| **Subscriber** | Unlimited | Text + Vision AI, all features |

---

## 📱 Pages

- **Home** (`/`) - Main landing page with AI solutions overview
- **Experience** (`/experience`) - Interactive AI chat interface
- **About** (`/about`) - Company information, mission, and values
- **Contact** (`/contact`) - Professional contact form
- **Privacy Policy** (`/privacy-policy`) - Data protection details
- **Terms & Conditions** (`/terms-conditions`) - Legal terms
- **Sitemap** (`/sitemap`) - Complete site navigation

---

## 🤝 Contributing

This is a private project. For questions or collaboration, contact the repository owner.

---

## 📄 License

Proprietary - All rights reserved

---

## 👨‍💻 Author

**Dalsi AI & Automations**
- Website: [https://innate-temple-337717.web.app](https://innate-temple-337717.web.app)
- Email: info@neodalsi.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS
- shadcn/ui for beautiful components
- Lucide for the icon library
- Supabase for the backend infrastructure
- Firebase for hosting and functions

---

**Made with ❤️ by Dalsi AI Team**
