import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { 
  Home, 
  Info, 
  Mail, 
  FileText, 
  Shield, 
  Newspaper,
  Bot,
  Brain,
  Eye,
  DollarSign,
  Users,
  ExternalLink
} from 'lucide-react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function SitemapPage() {
  const siteStructure = [
    {
      category: "Main Pages",
      icon: Home,
      pages: [
        { name: "Home", path: "/", description: "Welcome to Dalsi AI - Artificial Intelligence Made Real" },
        { name: "About Us", path: "/about", description: "Learn about our mission, vision, and team" },
        { name: "Contact", path: "/contact", description: "Get in touch with our team" },
        { name: "Pricing", path: "/pricing", description: "View our subscription plans and pricing" }
      ]
    },
    {
      category: "AI Products",
      icon: Brain,
      pages: [
        { name: "Experience Dalsi", path: "/experience", description: "Interactive AI chat interface" },
        { name: "DalSiAI", path: "/products/dalsi-ai", description: "Text-based AI assistant for healthcare and education" },
        { name: "DalSiAIVi", path: "/products/dalsi-aivi", description: "Multimodal AI platform with image and video capabilities" }
      ]
    },
    {
      category: "Legal & Policies",
      icon: Shield,
      pages: [
        { name: "Terms and Conditions", path: "/terms", description: "Terms of service and usage policies" },
        { name: "Privacy Policy", path: "/privacy", description: "How we protect and handle your data" }
      ]
    },
    {
      category: "Resources",
      icon: FileText,
      pages: [
        { name: "Newsletter", path: "/newsletter", description: "Subscribe to our AI insights newsletter" },
        { name: "Sitemap", path: "/sitemap", description: "Complete site navigation and structure" }
      ]
    }
  ]

  const quickLinks = [
    { name: "Try AI Assistant", path: "/experience", icon: Bot, color: "text-primary" },
    { name: "View Pricing", path: "/pricing", icon: DollarSign, color: "text-green-600" },
    { name: "Contact Sales", path: "/contact", icon: Mail, color: "text-blue-600" },
    { name: "Subscribe Newsletter", path: "/newsletter", icon: Newspaper, color: "text-purple-600" }
  ]

  const handleNavigate = (path) => {
    window.navigate(path)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Site Map
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Navigate through all pages and sections of the Dalsi AI portal. 
              Find exactly what you're looking for with our complete site structure.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-muted-foreground">Jump to our most popular sections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleNavigate(link.path)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100 group-hover:bg-primary/20 transition-colors`}>
                    <link.icon className={`h-6 w-6 ${link.color} group-hover:text-primary transition-colors`} />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Site Structure */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Complete Site Structure</h2>
            <p className="text-muted-foreground">All pages organized by category</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {siteStructure.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{section.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.pages.map((page, pageIndex) => (
                      <div 
                        key={pageIndex}
                        className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                        onClick={() => handleNavigate(page.path)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                              {page.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {page.description}
                            </p>
                            <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                              {page.path}
                            </code>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-3 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Info className="h-5 w-5 text-primary" />
                  <span>About This Site</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Built with:</strong> React, Tailwind CSS, and Supabase
                  </p>
                  <p>
                    <strong className="text-foreground">AI Integration:</strong> Real-time streaming with DalSi AI API
                  </p>
                  <p>
                    <strong className="text-foreground">Security:</strong> HTTPS, data encryption, and privacy protection
                  </p>
                  <p>
                    <strong className="text-foreground">Accessibility:</strong> WCAG 2.1 compliant design
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for? We're here to help!
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => handleNavigate('/contact')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => handleNavigate('/experience')}
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      Ask Our AI Assistant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
