import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductByIdQuery } from '../store/productsApi'
import styles from './ProductPage.module.css'

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const customProduct = useSelector((state: RootState) =>
  state.products.customProducts.find(p => p.id === id)
)
  const { data, isLoading, isError } = useGetProductByIdQuery(id ?? '', {
  skip: !!customProduct,
})

  if (isLoading) return <p>Загрузка...</p>
if (!customProduct && (isError || !data)) return <p>Продукт не найден 😿</p>

const product = customProduct ? {
  image: customProduct.imageUrl,
  title: customProduct.name,
  category: customProduct.category,
  price: customProduct.price,
  description: customProduct.description,
} : data!

return (
  <div className={styles.page}>
    <button className={styles.back} onClick={() => navigate('/products')}>
      ← Назад
    </button>
    <button className={styles.back} onClick={() => navigate(`/products/${id}/edit`)}>
      ✏️ Редактировать
    </button>
    <div className={styles.content}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>Цена:</span>
          <span className={styles.price}>${product.price}</span>
        </div>
        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionLabel}>Описание:</span>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  </div>
)
}

export default ProductPage
