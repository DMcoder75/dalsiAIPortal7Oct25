import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { 
  Brain, 
  Heart, 
  GraduationCap, 
  Users, 
  Award, 
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Navigation from './Navigation'
import Footer from './Footer'
import logo from '../assets/DalSiAILogo2.png'

export default function AboutPage() {
  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We push the boundaries of AI technology to create solutions that were previously impossible."
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Every AI solution we build is designed to enhance human capabilities, not replace them."
    },
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "We focus on solving real-world problems in healthcare and education that matter most."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in AI development, security, and user experience."
    }
  ]

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "Former Google AI researcher with 15+ years in machine learning and healthcare AI.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Ex-Microsoft product leader specializing in enterprise AI solutions and user experience.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Emily Watson",
      role: "Medical AI Director",
      bio: "Board-certified physician and AI researcher focused on clinical decision support systems.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "David Kim",
      role: "Chief Technology Officer",
      bio: "Former Tesla AI engineer with expertise in scalable AI infrastructure and deployment.",
      image: "/api/placeholder/150/150"
    }
  ]

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Dalsi AI was founded with a vision to make artificial intelligence accessible and beneficial for healthcare and education."
    },
    {
      year: "2024",
      title: "DalSiAI Launch",
      description: "Released our flagship text-based AI platform, serving over 10,000 healthcare professionals and educators."
    },
    {
      year: "2024",
      title: "DalSiAIVi Release",
      description: "Launched our multimodal AI platform, enabling advanced image and video analysis capabilities."
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanding our AI solutions to serve millions of users across 50+ countries worldwide."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img src={logo} alt="Dalsi AI" className="h-16 w-16" />
              <div className="text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">About Dalsi AI</h1>
                <p className="text-xl text-primary font-semibold">Artificial Intelligence Made Real</p>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to democratize artificial intelligence and make it accessible, 
              reliable, and beneficial for healthcare providers and educational institutions worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower healthcare professionals and educators with cutting-edge AI technology 
                  that enhances human capabilities, improves outcomes, and creates a more intelligent, 
                  compassionate world. We believe AI should augment human expertise, not replace it.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be the world's most trusted AI platform for healthcare and education, 
                  where every interaction leads to better patient outcomes, enhanced learning experiences, 
                  and breakthrough discoveries that benefit humanity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Dalsi AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <value.icon className="h-8 w-8 text-primary group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize AI for healthcare and education.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              World-class experts in AI, healthcare, and education working together to build the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Join Us in Shaping the Future
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a healthcare professional, educator, or technology enthusiast, 
            we invite you to be part of the AI revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              onClick={() => window.navigate('/experience')}
            >
              Experience Our AI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
