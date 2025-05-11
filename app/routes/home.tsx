import NavBar from '@/components/layout/navbar'
import type { Route } from './+types/home'
import CategoryNav from '@/components/pages/home/category-nav'
import GemPin from '@/components/pages/home/gem-pin'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Gems VietNam - Explore' },
    {
      name: 'description',
      content: 'VietNam hidden Gems Location and where to find them',
    },
  ]
}
export default function Home() {
  return (
    <main className="h-full">
      <NavBar />
      <CategoryNav />
      <GemPin />
    </main>
  )
}
