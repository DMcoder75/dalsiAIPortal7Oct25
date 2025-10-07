import { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import logo from '../assets/DalSiAILogo2.png'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isHomePage = window.location.pathname === '/'
  const { user, loading, logout } = useAuth()

  console.log('Navigation render - user:', user, 'loading:', loading)

  const navigate = (path) => {
    if (window.navigate) {
      window.navigate(path)
    } else {
      window.location.href = path
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center min-w-0">
            <img src={logo} alt="Dalsi AI" className="h-8 sm:h-10 w-auto flex-shrink-0" />
            <span className="ml-2 sm:ml-3 text-sm sm:text-xl font-bold text-white">
              <span className="hidden md:inline">Dalsi AI & Automations</span>
              <span className="inline md:hidden">Dalsi AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <a href="/" className="text-white hover:text-primary transition-colors">
              Home
            </a>
            {isHomePage ? (
              <a href="#solutions" className="text-white hover:text-primary transition-colors">
                Solutions
              </a>
            ) : (
              <a href="/#solutions" className="text-white hover:text-primary transition-colors">
                Solutions
              </a>
            )}
            {isHomePage ? (
              <a href="#healthcare" className="text-white hover:text-primary transition-colors">
                Healthcare
              </a>
            ) : (
              <a href="/#healthcare" className="text-white hover:text-primary transition-colors">
                Healthcare
              </a>
            )}
            {isHomePage ? (
              <a href="#education" className="text-white hover:text-primary transition-colors">
                Education
              </a>
            ) : (
              <a href="/#education" className="text-white hover:text-primary transition-colors">
                Education
              </a>
            )}
            <a href="/about" className="text-white hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="text-white hover:text-primary transition-colors">
              Contact
            </a>
            <Button 
              className="bg-[#5E3BEE] hover:bg-[#5E3BEE]/90 text-white rounded-lg px-4 py-2"
              onClick={() => window.navigate('/experience')}
            >
              Experience Dalsi
            </Button>
            
            {/* Authentication Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              {loading ? (
                // Show nothing while loading to prevent flicker
                <div className="w-32 h-9"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground hidden lg:block">
                    {user.first_name || user.email}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-black text-white border border-gray-700 hover:bg-gray-800 rounded-lg px-4 py-2"
                    onClick={() => window.showAuth()}
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-[#9333EA] hover:bg-[#9333EA]/90 text-white rounded-lg px-4 py-2"
                    onClick={() => window.showAuth()}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-4 space-y-2">
              <a 
                to="/" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              {isHomePage ? (
                <a 
                  href="#solutions" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solutions
                </a>
              ) : (
                <a 
                  to="/#solutions" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solutions
                </a>
              )}
              {isHomePage ? (
                <a 
                  href="#healthcare" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Healthcare
                </a>
              ) : (
                <a 
                  to="/#healthcare" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Healthcare
                </a>
              )}
              {isHomePage ? (
                <a 
                  href="#education" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Education
                </a>
              ) : (
                <a 
                  to="/#education" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Education
                </a>
              )}
              <a 
                to="/about" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                to="/contact" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-2 border-t border-border space-y-2">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    window.navigate('/experience')
                    setIsMenuOpen(false)
                  }}
                >
                  Experience Dalsi
                </Button>
                
                {/* Mobile Auth Buttons */}
                {window.user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground text-center">
                      Welcome, {window.user.user_metadata?.first_name || window.user.email}
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        window.logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        window.showAuth()
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={() => {
                        window.showAuth()
                        setIsMenuOpen(false)
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

