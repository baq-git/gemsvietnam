import React, { useEffect, useState } from 'react'
import {
  Umbrella,
  Mountain,
  Castle,
  Landmark,
  Waves,
  MapPin,
  Droplet,
  TreePine,
  SlidersHorizontal,
  Zap,
  Compass,
  Anchor,
  Camera,
  Ship,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { GemCategory } from '@/types/home'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/categories.service'

const iconMap: Record<GemCategory['category_name'], LucideIcon> = {
  All: Globe,
  Waterfalls: Droplet,
  Beaches: Umbrella,
  Caves: Zap,
  Castles: Castle,
  'Scenic points': MapPin,
  Adventure: Compass,
  'Historical landmarks': Landmark,
  Coves: Anchor,
  'Tourist attractions': Camera,
  'Sea pools': Waves,
  'Wild swimming': Ship,
  Reservoirs: Droplet,
  Lakes: Waves,
  'Nature reserves': TreePine,
  Mountains: Mountain,
}

interface GemCategoryNavItem extends GemCategory {
  icon?: LucideIcon
}

interface GemCategoryNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CategoryNav({}: GemCategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState<string>()
  const { data: gemCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const categories = gemCategories?.map((item: GemCategoryNavItem) => {
    const icon = iconMap[item.category_name]
    return {
      ...item,
      icon,
    }
  })

  useEffect(() => {
    if (categories && categories.length > 0 && activeCategory === undefined) {
      setActiveCategory(categories[0].id)
    }
  }, [categories, activeCategory])

  return (
    <div className="flex items-center relative border-b bg-white min-h-[84px]">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full justify-between items-center px-2">
          {categories?.map((category: GemCategoryNavItem) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-colors',
                activeCategory === category.id
                  ? 'text-rose-500'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <div
                className={cn(
                  'mb-1 flex h-10 w-10 items-center justify-center rounded-full',
                  activeCategory === category.id ? 'bg-rose-100' : 'bg-gray-100'
                )}
              >
                {category.icon ? <category.icon size={24} /> : null}
              </div>
              <span>{category.category_name}</span>
              {activeCategory === category.id && (
                <div className="mt-1 h-0.5 w-full rounded-full bg-rose-500" />
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      {/* Filters button */}
      <div className="relative flex h-full items-center bg-gradient-to-l from-white from-70% pr-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 rounded-full border-gray-200 bg-white px-3 py-1 text-xs font-medium shadow-sm"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </Button>
      </div>
    </div>
  )
}
