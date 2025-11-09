import { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'

export default function ExperienceNav({ vertical = false }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const navigate = (path) => {
    window.location.href = path
  }

  return (
    <nav className={vertical ? "flex flex-col space-y-1 w-full bg-gray-700/50 rounded-lg p-3" : "flex items-center space-x-1"}>
      {/* AI Solutions Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className={`text-xs px-2 hover:text-primary transition-all duration-300 hover:scale-105 ${vertical ? 'w-full justify-between' : ''}`}
          onClick={() => toggleDropdown('solutions')}
        >
          <span>AI Solutions</span>
          <ChevronDown className={`${vertical ? '' : 'ml-1'} h-3 w-3 transition-transform duration-200 ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
        </Button>
        {openDropdown === 'solutions' && (
          <div className={`${vertical ? 'relative' : 'absolute top-full left-0'} mt-1 bg-card border border-border rounded-lg shadow-lg py-2 ${vertical ? 'w-full' : 'min-w-[200px]'} z-50`}>
            <button
              onClick={() => navigate('/#healthcare')}
              className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200"
            >
              <div className="font-semibold text-primary">Healthcare</div>
              <div className="text-xs text-muted-foreground">AI-powered medical solutions</div>
            </button>
            <button
              onClick={() => navigate('/#education')}
              className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200"
            >
              <div className="font-semibold text-primary">Education</div>
              <div className="text-xs text-muted-foreground">Transform learning experiences</div>
            </button>
          </div>
        )}
      </div>

      {/* AI Models Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className={`text-xs px-2 hover:text-primary transition-all duration-300 hover:scale-105 ${vertical ? 'w-full justify-between' : ''}`}
          onClick={() => toggleDropdown('models')}
        >
          <span>AI Models</span>
          <ChevronDown className={`${vertical ? '' : 'ml-1'} h-3 w-3 transition-transform duration-200 ${openDropdown === 'models' ? 'rotate-180' : ''}`} />
        </Button>
        {openDropdown === 'models' && (
          <div className={`${vertical ? 'relative' : 'absolute top-full left-0'} mt-1 bg-card border border-border rounded-lg shadow-lg py-2 ${vertical ? 'w-full' : 'min-w-[200px]'} z-50`}>
            <button
              onClick={() => navigate('/models/dalsi-ai')}
              className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200"
            >
              <div className="font-semibold text-primary">DalsiAI</div>
              <div className="text-xs text-muted-foreground">Text AI Engine</div>
            </button>
            <button
              onClick={() => navigate('/models/dalsi-ai-vi')}
              className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-all duration-200"
            >
              <div className="font-semibold text-accent">DalsiAI Vi</div>
              <div className="text-xs text-muted-foreground">Vision AI Engine</div>
            </button>
            <button
              onClick={() => navigate('/models/dalsi-ai-vd')}
              className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm text-white transition-all duration-200"
            >
              <div className="font-semibold text-purple">DalsiAI Vd</div>
              <div className="text-xs text-muted-foreground">Video & Media AI</div>
            </button>
          </div>
        )}
      </div>

      {/* Products Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className={`text-xs px-2 hover:text-primary transition-all duration-300 hover:scale-105 ${vertical ? 'w-full justify-between' : ''}`}
          onClick={() => toggleDropdown('products')}
        >
          <span>Products</span>
          <ChevronDown className={`${vertical ? '' : 'ml-1'} h-3 w-3 transition-transform duration-200 ${openDropdown === 'products' ? 'rotate-180' : ''}`} />
        </Button>
        {openDropdown === 'products' && (
          <div className={`${vertical ? 'relative' : 'absolute top-full left-0'} mt-1 bg-card border border-border rounded-lg shadow-lg py-2 ${vertical ? 'w-full' : 'min-w-[250px]'} z-50 max-h-[400px] overflow-y-auto`}>
            {/* Dalsi AI Products */}
            <div className="px-3 py-1 text-xs font-semibold text-primary">Text AI Products</div>
            <button onClick={() => navigate('/products/writer-pro')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200">
              DalSi Writer Pro
            </button>
            <button onClick={() => navigate('/products/code-genius')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200">
              DalSi Code Genius
            </button>
            <button onClick={() => navigate('/products/business-suite')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200">
              DalSi Business Suite
            </button>
            <button onClick={() => navigate('/products/researcher')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200">
              DalSi Researcher
            </button>
            <button onClick={() => navigate('/products/chatbot-builder')} className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white transition-all duration-200">
              DalSi Chatbot Builder
            </button>

            <div className="border-t border-border my-2"></div>

            {/* Dalsi AI Vi Products */}
            <div className="px-3 py-1 text-xs font-semibold text-accent">Vision AI Products</div>
            <button onClick={() => navigate('/products/vision-scan')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-all duration-200">
              DalSi Vision Scan
            </button>
            <button onClick={() => navigate('/products/medvision')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-all duration-200">
              DalSi MedVision
            </button>
            <button onClick={() => navigate('/products/art-studio')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-all duration-200">
              DalSi Art Studio
            </button>
            <button onClick={() => navigate('/products/inspector')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-all duration-200">
              DalSi Inspector
            </button>
            <button onClick={() => navigate('/products/brand-guard')} className="w-full text-left px-4 py-2 hover:bg-accent/10 text-sm transition-all duration-200">
              DalSi Brand Guard
            </button>

            <div className="border-t border-border my-2"></div>

            {/* Dalsi AI Vd Products */}
            <div className="px-3 py-1 text-xs font-semibold text-purple">Media AI Products</div>
            <button onClick={() => navigate('/products/moviemaker')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm text-white transition-all duration-200">
              DalSi MovieMaker
            </button>
            <button onClick={() => navigate('/products/translate-global')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm text-white transition-all duration-200">
              DalSi Translate Global
            </button>
            <button onClick={() => navigate('/products/music-studio')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm text-white transition-all duration-200">
              DalSi Music Studio
            </button>
            <button onClick={() => navigate('/products/video-ads')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm text-white transition-all duration-200">
              DalSi VideoAds
            </button>
            <button onClick={() => navigate('/products/learning-platform')} className="w-full text-left px-4 py-2 hover:bg-purple/10 text-sm text-white transition-all duration-200">
              DalSi Learning Platform
            </button>
          </div>
        )}
      </div>

      {/* Other Menu Items */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/#pricing')} className={`text-xs px-2 hover:text-primary transition-all duration-300 hover:scale-105 ${vertical ? 'w-full justify-start' : ''}`}>
        Pricing
      </Button>
      <Button variant="ghost" size="sm" onClick={() => navigate('/contact')} className={`text-xs px-2 hover:text-primary transition-all duration-300 hover:scale-105 ${vertical ? 'w-full justify-start' : ''}`}>
        Help & Support
      </Button>
    </nav>
  )
}

