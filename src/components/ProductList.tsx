import type { ProductCardData } from '../types/product'
import ProductCard from './ProductCard'
import styles from './ProductList.module.css'

interface Props {
  products: ProductCardData[]
}

function ProductList({ products }: Props) {
  if (products.length === 0) {
    return <p style={{ padding: '20px' }}>Ничего не найдено...</p>
  }

  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
