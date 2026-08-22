import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProduct } from '../store/productsSlice'
import type { RootState } from '../store'
import styles from './CreateProductPage.module.css'

const schema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  description: z.string().min(10, 'Минимум 10 символов'),
  price: z.number().min(1, 'Цена должна быть больше 0'),
  category: z.string().min(2, 'Укажите категорию'),
  imageUrl: z
    .string()
    .url('Введите корректный URL')
    .optional()
    .or(z.literal('')),
})

type FormData = z.infer<typeof schema>

function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const product = useSelector((state: RootState) =>
    state.products.customProducts.find((p) => p.id === id)
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
        }
      : undefined,
  })

  if (!product) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Редактирование доступно только для созданных вами продуктов.</p>
        <button onClick={() => navigate(-1)}>← Назад</button>
      </div>
    )
  }

  const onSubmit = (data: FormData) => {
    dispatch(
      updateProduct({
        ...product,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl || product.imageUrl,
      })
    )
    alert('Изменения сохранены!')
    navigate(`/products/${id}`)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Редактировать продукт</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label>Название *</label>
          <input {...register('name')} placeholder="Введите название" />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label>Описание *</label>
          <textarea
            {...register('description')}
            placeholder="Введите описание"
            rows={4}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label>Цена *</label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            placeholder="0"
            min="1"
          />
          {errors.price && (
            <span className={styles.error}>{errors.price.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label>Категория *</label>
          <input {...register('category')} placeholder="Введите категорию" />
          {errors.category && (
            <span className={styles.error}>{errors.category.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label>URL картинки</label>
          <input {...register('imageUrl')} placeholder="https://..." />
          {errors.imageUrl && (
            <span className={styles.error}>{errors.imageUrl.message}</span>
          )}
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={() => navigate(-1)}>
            Отмена
          </button>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage
