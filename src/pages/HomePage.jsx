import Navigation from '../components/Navigation'
import QuickMenu from '../components/QuickMenu'
import HeroSection from '../components/HeroSection'
import SolutionsSection from '../components/SolutionsSection'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'
import { BookOpen, UserCheck, FileText, Activity, Scan, Stethoscope } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark"
         style={{
           background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
           minHeight: '100vh'
         }}>
      {/* Navigation */}
      <Navigation />
      
      {/* Quick Menu */}
      <QuickMenu />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Solutions Section */}
        <SolutionsSection />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Healthcare Section */}
        <section id="healthcare" className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-6 sm:mb-8">Healthcare Solutions</h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary AI-powered healthcare solutions coming soon. Experience the future of medical technology 
              with our advanced diagnostic tools, patient care systems, and clinical decision support.
            </p>
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 bg-card rounded-lg border border-border hover:border-red/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-red/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                  <Activity className="w-7 h-7 text-red group-hover:animate-pulse" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Remote Monitoring</h3>
                <p className="text-muted-foreground text-sm">24/7 patient monitoring with AI-powered insights</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border hover:border-red/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-red/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-spin">
                  <Scan className="w-7 h-7 text-red" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Diagnostic AI</h3>
                <p className="text-muted-foreground text-sm">Advanced image analysis and diagnostic assistance</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border hover:border-red/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-red/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-bounce">
                  <Stethoscope className="w-7 h-7 text-red" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Clinical Support</h3>
                <p className="text-muted-foreground text-sm">Intelligent decision support for healthcare professionals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Education & Training</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform learning experiences with our intelligent education platform. Personalized learning paths, 
              automated assessments, and comprehensive knowledge management systems.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-bounce">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personalized Learning</h3>
                <p className="text-muted-foreground text-sm">AI-driven adaptive learning experiences</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Tutoring</h3>
                <p className="text-muted-foreground text-sm">Intelligent tutoring systems with real-time feedback</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-spin">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Content Generation</h3>
                <p className="text-muted-foreground text-sm">Automated content creation and curriculum development</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">About Dalsi AI & Automations</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                At Dalsi AI & Automations, we believe that <strong className="text-primary">Artificial Intelligence Made Real</strong> 
                is not just our tagline—it's our mission. We are pioneering the next generation of AI solutions that bridge 
                the gap between cutting-edge technology and practical, real-world applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="text-center p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-primary mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To revolutionize how organizations interact with artificial intelligence, making advanced AI capabilities 
                    accessible, practical, and transformative for healthcare and education sectors worldwide.
                  </p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-accent mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To develop and deploy intelligent automation solutions that enhance human capabilities, improve outcomes, 
                    and create meaningful impact in the lives of patients, students, and professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Ready to transform your organization with AI? Contact our team of experts to discuss how 
              Dalsi AI can revolutionize your healthcare or education initiatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg border border-border hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4">General Inquiries</h3>
                <p className="text-muted-foreground mb-4">Questions about our AI solutions and services</p>
                <p className="text-primary font-medium">info@neodalsi.com</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4">Technical Support</h3>
                <p className="text-muted-foreground mb-4">Get help with implementation and technical questions</p>
                <p className="text-primary font-medium">info@neodalsi.com</p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4">Partnerships</h3>
                <p className="text-muted-foreground mb-4">Explore collaboration opportunities with our team</p>
                <p className="text-primary font-medium">info@neodalsi.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
