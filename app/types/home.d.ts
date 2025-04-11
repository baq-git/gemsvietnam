export interface Gem {
  id: string
  gemName: string
  description: string
  instruction: string
  gemCategoryId: string
  coordinates: number[]
  createdAt?: Date
  updatedAt?: Date
}

export interface GemCategory {
  id: string
  category_name: CategoryName
  slug: string
  description: string
  created_at: Date
  updated_at: Date
}

export type GemCategoryName =
  | 'All'
  | 'Waterfalls'
  | 'Beaches'
  | 'Caves'
  | 'Castles'
  | 'Scenic points'
  | 'Adventure'
  | 'Historical landmarks'
  | 'Coves'
  | 'Tourist attractions'
  | 'Sea pools'
  | 'Wild swimming'
  | 'Reservoirs'
  | 'Lakes'
  | 'Nature reserves'
  | 'Mountains'
