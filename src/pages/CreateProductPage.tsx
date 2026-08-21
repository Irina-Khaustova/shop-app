import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addCustomProduct } from '../store/productsSlice'
import type { ProductCardData } from '../types/product'
import styles from './CreateProductPage.module.css'

const schema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  description: z.string().min(10, 'Минимум 10 символов'),
  price: z.number().min(1, 'Цена должна быть больше 0'),
  category: z.string().min(2, 'Укажите категорию'),
  imageUrl: z.string().url('Введите корректный URL').optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

function CreateProductPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const newProduct: ProductCardData = {
      id: `custom-${crypto.randomUUID()}`,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      imageUrl: data.imageUrl || 'https://via.placeholder.com/200',
      isLiked: false,
      isCustom: true,
    }
    console.log(data)
    dispatch(addCustomProduct(newProduct))
    navigate('/products')
  }

  return (
    <div className={styles.page}>
      <h1>Добавить продукт</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label>Название *</label>
          <input {...register('name')} placeholder="Введите название" />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>
        <div className={styles.field}>
          <label>Описание *</label>
          <textarea {...register('description')} placeholder="Введите описание" rows={4} />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>
        <div className={styles.field}>
          <label>Цена *</label>
          <input 
  {...register('price', { valueAsNumber: true })} 
  type="number" 
  placeholder="0" 
  min="1"
/>
          {errors.price && <span className={styles.error}>{errors.price.message}</span>}
        </div>
        <div className={styles.field}>
          <label>Категория *</label>
          <input {...register('category')} placeholder="Введите категорию" />
          {errors.category && <span className={styles.error}>{errors.category.message}</span>}
        </div>
        <div className={styles.field}>
          <label>URL картинки</label>
          <input {...register('imageUrl')} placeholder="https://..." />
          {errors.imageUrl && <span className={styles.error}>{errors.imageUrl.message}</span>}
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={() => navigate('/products')}>Отмена</button>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProductPage