'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogIn, Users, Sparkles } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Header({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Nav items
  const normalNav = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Helps', href: '/how-it-works' },
    { name: 'Your Journey', href: '/#how-it-works' }, // This looks like a hash section
    { name: 'About', href: '/about' },
  ]

  const protectedNav = [
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Talk to AI Mentor', href: '/chat' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Career Simulator', href: '/career_simulate' },
  ]

  const displayedNavItems = session ? protectedNav : normalNav

  // --- FIX: SMART ACTIVE CHECKER ---
  const isActiveLink = (href: string) => {
    // 1. If it's a hash link (e.g., /#features), don't underline it based on path
    // (Hash links usually need a ScrollSpy to work, which is complex)
    if (href.includes('#')) return false;

    // 2. If it's the Home link ('/'), only active if we are exactly at root
    if (href === '/') return pathname === '/';

    // 3. For other pages, check if the path starts with the href
    // (e.g. /roadmap/123 should make /roadmap active)
    return pathname.startsWith(href);
  }

  const linkClasses =
    'text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group'

  const underline =
    'absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300'

  const activeUnderline =
    'absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600'

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
         <Link href="/" className={`${className} flex items-center -space-x-1 group`}>
  <div className="w-9 h-9 relative rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
    <Image
      src="/careerSathi.png"
      alt="CareerSathi Logo"
      fill
      className="object-cover"
    />
  </div>
  <span className="md:text-2xl text-xl font-bold font-display ">CareerSathi</span>
</Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {displayedNavItems.map((item) => (
              <Link key={item.name} href={item.href} className={linkClasses}>
                {item.name}
                {/* USE THE NEW FUNCTION HERE */}
                {isActiveLink(item.href) ? (
                  <span className={activeUnderline}></span>
                ) : (
                  <span className={underline}></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium transition-colors border rounded-2xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center space-x-2 btn-primary"
                >
                  <Users className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen bg-black/30 fixed inset-0 z-40"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden absolute top-16 left-0 right-0 z-50"
            >
              <div className="px-4 py-6 space-y-4">
                {displayedNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors relative"
                  >
                    {item.name}
                    {/* USE THE NEW FUNCTION HERE TOO */}
                    {isActiveLink(item.href) ? (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-blue-600 rounded-r"></span>
                    ) : null}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut()
                          setIsMenuOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        href="/auth/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center space-x-2 btn-primary w-full"
                      >
                        <Users className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}