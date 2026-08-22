import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetProductsQuery } from '../store/productsApi'
import type { RootState } from '../store'
import type { ProductCardData } from '../types/product'
import ProductList from '../components/ProductList'
import Pagination from '../components/Pagination'
import Filters from '../components/Filters'
import styles from './CatalogPage.module.css'

function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError } = useGetProductsQuery()
  const { customProducts, deletedIds, likedIds, filter } = useSelector(
    (state: RootState) => state.products
  )

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки</p>

  const PAGE_SIZE = 8

  const productsFromApi: ProductCardData[] = (data ?? []).map((product) => ({
    id: String(product.id),
    name: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    imageUrl: product.image,
    isLiked: false,
    isCustom: false,
  }))

  const allProducts = [...productsFromApi, ...customProducts]
    .filter((p) => !deletedIds.includes(p.id))
    .filter((p) => (filter === 'liked' ? likedIds.includes(p.id) : true))

  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE)
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Каталог продуктов</h1>
        <Link to="/create-product" className={styles.createBtn}>
          + Добавить продукт
        </Link>
      </div>
      <Filters onFilterChange={() => setCurrentPage(1)} />
      <ProductList products={paginatedProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page)
          window.scrollTo(0, 0)
        }}
      />
    </div>
  )
}

export default CatalogPage
