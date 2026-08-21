import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductByIdQuery } from '../store/productsApi'
import styles from './ProductPage.module.css'

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetProductByIdQuery(id ?? '')

  if (isLoading) return <p>Загрузка...</p>
  if (isError || !data) return <p>Продукт не найден 😿</p>

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/products')}>
        ← Назад
      </button>
      <div className={styles.content}>
        <img src={data.image} alt={data.title} className={styles.image} />
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.category}>{data.category}</p>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Цена:</span>
            <span className={styles.price}>${data.price}</span>
          </div>
          <div className={styles.descriptionBlock}>
            <span className={styles.descriptionLabel}>Описание:</span>
            <p className={styles.description}>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
