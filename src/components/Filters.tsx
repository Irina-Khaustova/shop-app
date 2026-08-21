import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import { setFilter } from '../store/productsSlice'
import styles from './Filters.module.css'

function Filters() {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.products.filter)

  return (
    <div className={styles.filters}>
      <button
        className={`${styles.btn} ${filter === 'all' ? styles.active : ''}`}
        onClick={() => dispatch(setFilter('all'))}
      >
        Все
      </button>
      <button
        className={`${styles.btn} ${filter === 'liked' ? styles.active : ''}`}
        onClick={() => dispatch(setFilter('liked'))}
      >
        Избранное
      </button>
    </div>
  )
}

export default Filters
