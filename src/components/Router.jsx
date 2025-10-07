import { useState, useEffect } from 'react'
import App from '../App'
import EnhancedChatInterface from './EnhancedChatInterface'
import DalSiAIPage from './DalSiAIPage'
import DalSiAIViPage from './DalSiAIViPage'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import TermsPage from './TermsPage'
import PrivacyPage from './PrivacyPage'
import NewsletterPage from './NewsletterPage'
import SitemapPage from './SitemapPage'
import AuthModal from './AuthModal'
import { useAuth } from '../contexts/AuthContext'

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user } = useAuth() // Subscribe to auth changes to trigger re-renders

  console.log('Router render - user:', user)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  const showAuth = () => setShowAuthModal(true)
  const hideAuth = () => setShowAuthModal(false)

  // Make functions globally available
  window.navigate = navigate
  window.showAuth = showAuth

  const renderPage = () => {
    switch (currentPath) {
      case '/chat':
      case '/experience':
        return <EnhancedChatInterface />
      case '/products/dalsi-ai':
        return <DalSiAIPage />
      case '/products/dalsi-aivi':
        return <DalSiAIViPage />
      case '/about':
        return <AboutPage />
      case '/contact':
        return <ContactPage />
      case '/terms':
        return <TermsPage />
      case '/privacy':
        return <PrivacyPage />
      case '/newsletter':
        return <NewsletterPage />
      case '/sitemap':
        return <SitemapPage />
      default:
        return <App />
    }
  }

  return (
    <>
      {renderPage()}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={hideAuth}
      />
    </>
  )
}
