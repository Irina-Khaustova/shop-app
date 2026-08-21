export interface ProductCardData {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  isLiked: boolean
  isCustom?: boolean
}