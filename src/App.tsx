import { Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CreateProductPage from './pages/CreateProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
    </Routes>
  )
}

export default App