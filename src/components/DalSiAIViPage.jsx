import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { 
  Image, 
  Video, 
  Eye, 
  Palette, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Camera, 
  Film,
  Zap,
  Brain,
  Star,
  Quote,
  CheckCircle
} from 'lucide-react'

export default function DalSiAIViPage() {
  const capabilities = [
    {
      icon: Eye,
      title: "Advanced Computer Vision",
      description: "State-of-the-art image analysis with 99.8% accuracy in object detection, medical imaging, and visual content understanding."
    },
    {
      icon: Palette,
      title: "Creative Content Generation",
      description: "Generate stunning visuals, educational diagrams, and medical illustrations from simple text descriptions."
    },
    {
      icon: Film,
      title: "Video Intelligence",
      description: "Comprehensive video analysis, content extraction, and automated video generation for training and educational purposes."
    },
    {
      icon: Layers,
      title: "Multi-Modal Integration",
      description: "Seamlessly combine text, image, and video processing for comprehensive content understanding and generation."
    },
    {
      icon: Sparkles,
      title: "Real-Time Processing",
      description: "Lightning-fast visual processing with GPU-accelerated inference for immediate results and interactive experiences."
    },
    {
      icon: Brain,
      title: "Contextual Understanding",
      description: "Deep semantic understanding of visual content with context-aware analysis and intelligent content recommendations."
    }
  ]

  const applications = [
    {
      category: "Medical Imaging",
      title: "Diagnostic Image Analysis",
      description: "Advanced analysis of X-rays, MRIs, CT scans, and other medical images with AI-powered diagnostic assistance.",
      features: ["Anomaly detection", "Comparative analysis", "Report generation", "DICOM integration"],
      impact: "85% faster diagnosis"
    },
    {
      category: "Educational Content",
      title: "Interactive Learning Materials",
      description: "Generate custom educational visuals, interactive diagrams, and multimedia content for enhanced learning experiences.",
      features: ["Custom illustrations", "Interactive diagrams", "Video tutorials", "Assessment visuals"],
      impact: "90% engagement increase"
    },
    {
      category: "Clinical Documentation",
      title: "Visual Documentation",
      description: "Automated capture and analysis of clinical images, wound photography, and patient monitoring visuals.",
      features: ["Automated tagging", "Progress tracking", "Compliance reporting", "Secure storage"],
      impact: "70% documentation efficiency"
    },
    {
      category: "Training & Simulation",
      title: "Immersive Training Content",
      description: "Create realistic training scenarios, procedural videos, and interactive simulations for medical and educational training.",
      features: ["Scenario generation", "Interactive simulations", "Progress tracking", "Performance analytics"],
      impact: "95% training effectiveness"
    }
  ]

  const testimonials = [
    {
      name: "Dr. Jennifer Park",
      role: "Radiology Director, University Medical Center",
      content: "DalSiAIVi has transformed our radiology department. The AI-assisted image analysis has significantly improved our diagnostic accuracy and speed.",
      rating: 5,
      specialty: "Medical Imaging"
    },
    {
      name: "Prof. David Thompson",
      role: "Director of Digital Learning, Tech Institute",
      content: "The ability to generate custom educational visuals on-demand has revolutionized our curriculum development process.",
      rating: 5,
      specialty: "Education Technology"
    },
    {
      name: "Dr. Maria Gonzalez",
      role: "Chief of Surgery, Regional Hospital",
      content: "The surgical training simulations created with DalSiAIVi are incredibly realistic and have improved our residents' learning outcomes.",
      rating: 5,
      specialty: "Medical Training"
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-accent/10 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
              <div className="flex space-x-1">
                <Image className="h-4 w-4 text-accent animate-pulse" />
                <Video className="h-4 w-4 text-accent animate-pulse delay-200" />
              </div>
              <span className="text-accent font-semibold">DalSiAIVi - Multimodal AI Vision</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              See, Understand, Create
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Beyond Human Vision
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              DalSiAIVi combines cutting-edge computer vision, image generation, and video intelligence to deliver 
              the most advanced multimodal AI platform for healthcare and education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Visual Capabilities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 group">
              <Camera className="h-8 w-8 text-accent mx-auto mb-3 group-hover:animate-bounce" />
              <div className="text-2xl font-bold text-accent mb-1">50M+</div>
              <div className="text-sm text-muted-foreground">Images Analyzed</div>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 group">
              <Film className="h-8 w-8 text-primary mx-auto mb-3 group-hover:animate-bounce" />
              <div className="text-2xl font-bold text-primary mb-1">1M+</div>
              <div className="text-sm text-muted-foreground">Videos Processed</div>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 group">
              <Sparkles className="h-8 w-8 text-accent mx-auto mb-3 group-hover:animate-bounce" />
              <div className="text-2xl font-bold text-accent mb-1">99.8%</div>
              <div className="text-sm text-muted-foreground">Visual Accuracy</div>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 group">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3 group-hover:animate-bounce" />
              <div className="text-2xl font-bold text-primary mb-1">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Revolutionary Visual AI Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of visual intelligence with our comprehensive suite of AI-powered vision tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-border hover:border-accent/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                    <capability.icon className="h-6 w-6 text-accent group-hover:animate-pulse" />
                  </div>
                  <CardTitle className="text-xl">{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{capability.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Transforming Industries with Visual AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how DalSiAIVi is revolutionizing healthcare and education through advanced visual intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Eye className="h-6 w-6 text-primary group-hover:animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-accent mb-1">{app.category}</div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{app.title}</h3>
                      <p className="text-muted-foreground mb-4">{app.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {app.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="inline-flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-accent">{app.impact}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how professionals are using DalSiAIVi to achieve breakthrough results in their fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs font-medium text-accent mb-2 uppercase tracking-wide">
                    {testimonial.specialty}
                  </div>
                  <Quote className="h-8 w-8 text-accent/30 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Seamless Integration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              DalSiAIVi integrates effortlessly with your existing systems and workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                  <Layers className="h-8 w-8 text-primary group-hover:animate-spin" />
                </div>
                <h3 className="text-xl font-semibold mb-2">API Integration</h3>
                <p className="text-muted-foreground">RESTful APIs with comprehensive documentation and SDKs for popular programming languages.</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                  <Brain className="h-8 w-8 text-accent group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cloud & On-Premise</h3>
                <p className="text-muted-foreground">Flexible deployment options including cloud, hybrid, and on-premise solutions.</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                  <Zap className="h-8 w-8 text-primary group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Processing</h3>
                <p className="text-muted-foreground">WebSocket connections for real-time visual processing and instant results.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Experience the Future of Visual AI
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Transform your visual content workflows with the most advanced multimodal AI platform available today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-300">
              <Play className="mr-2 h-5 w-5" />
              Watch Live Demo
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            30-day free trial • Full feature access • No setup fees
          </p>
        </div>
      </section>
    </div>
  )
}
