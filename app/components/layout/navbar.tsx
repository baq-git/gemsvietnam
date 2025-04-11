import { MapPin, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'

export default function NavBar() {
  return (
    <div className="w-full">
      {/* Main Navbar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-1.5">
              <MapPin className="h-5 w-5 text-rose-500" />
              <span className="text-lg font-semibold">PinIt</span>
            </a>

            {/* Search Bar */}
            <div className="relative mx-4 hidden flex-1 max-w-md md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search locations..."
                className="w-full pl-10 pr-4"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Link to="/" className="cursor-pointer">
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
              </Link>

              <Link to="/auth" className="cursor-pointer">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/auth" className="cursor-pointer">
                <Button
                  size="sm"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search (shown only on mobile) */}
      <div className="border-b p-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search locations..."
            className="w-full pl-10 pr-4"
          />
        </div>
      </div>
    </div>
  )
}
