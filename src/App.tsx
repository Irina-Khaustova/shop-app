import { Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CreateProductPage from './pages/CreateProductPage'
import EditProductPage from './pages/EditProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/shop-app/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />
    </Routes>
  )
}

export default App
