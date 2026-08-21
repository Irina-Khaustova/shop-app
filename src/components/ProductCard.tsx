import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store'
import { toggleLike, deleteProduct } from '../store/productsSlice'
import type { ProductCardData } from '../types/product'
import styles from './ProductCard.module.css'

interface Props {
  product: ProductCardData
}

function ProductCard({ product }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const likedIds = useSelector((state: RootState) => state.products.likedIds)
  const isLiked = likedIds.includes(product.id)

  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleLike(product.id))
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(deleteProduct(product.id))
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.description}>{product.name}</h3>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={handleLike}>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isLiked ? '#e53935' : 'none'}
    stroke={isLiked ? '#e53935' : '#333'}
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
</button>
          <button className={styles.btn} onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard