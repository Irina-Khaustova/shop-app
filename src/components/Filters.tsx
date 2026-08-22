import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import { setFilter } from '../store/productsSlice'
import styles from './Filters.module.css'

interface Props {
  onFilterChange?: () => void
}

function Filters({ onFilterChange }: Props) {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.products.filter)

    const handleFilter = (value: 'all' | 'liked') => {
    dispatch(setFilter(value))
    onFilterChange?.()
  }


  return (
    <div className={styles.filters}>
      <button
        className={`${styles.btn} ${filter === 'all' ? styles.active : ''}`}
        onClick={() => handleFilter('all')}
      >
        Все
      </button>
      <button
        className={`${styles.btn} ${filter === 'liked' ? styles.active : ''}`}
        onClick={() => handleFilter('liked')}
      >
        Избранное
      </button>
    </div>
  )
}

export default Filters
