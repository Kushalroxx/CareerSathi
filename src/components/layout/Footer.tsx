'use client'

import Link from 'next/link'
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Twitter, 
  Linkedin,
  Github,
  Globe,
  Heart,
  ShieldCheck
} from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Roadmap ', href: '/roadmap' },
      { name: 'AI Mentor', href: '/chat' },
    ],
    company: [
      { name: 'About Zelphine', href: 'https://zelphine.com' },
      { name: 'About CareerSathi', href: '/about' },
      { name: 'Contact Support', href: 'mailto:support@zelphine.com' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Zelphine-Tech', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/zelphine', color: 'hover:text-blue-500' },
    { name: 'X (Twitter)', icon: Twitter, href: 'https://x.com/zelphinetech', color: 'hover:text-sky-400' },
    { name: 'Website', icon: Globe, href: 'https://zelphine.com/', color: 'hover:text-purple-400' },
  ]

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Section: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center  mb-6 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center ">
               <div className="w-9 h-9 relative rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                   <Image
                     src="/careerSathi.png"
                     alt="CareerSathi Logo"
                     fill
                     className="object-cover"
                   />
                 </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CareerSathi
              </span>
            </Link>
            
            <p className="text-slate-400 mb-6 leading-relaxed text-sm max-w-sm">
              An intelligent career architecture platform engineered by <strong>Zelphine</strong>. 
              We replace guesswork with data-driven roadmaps and daily execution protocols.
            </p>
            
            <div className="space-y-3 text-sm">
              <a href="mailto:support@zelphine.com" className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>support@zelphine.com</span>
              </a>
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>West Bengal, India</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-blue-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} className="hover:text-blue-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-blue-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-500">
            <p>© {currentYear} Zelphine.</p>
            <span className="hidden md:inline text-slate-700">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-600 fill-red-600" />
              <span>in India</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
               <ShieldCheck className="w-4 h-4 text-green-600" />
               <span>Secure Data</span>
            </div>

            <div className="h-4 w-px bg-slate-800"></div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-400 transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}