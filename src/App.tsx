
import Header from "./components/Header/Header"
import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard"
import CallbackPage from "./components/auth0/CallbackPage"
import AdminPage from "./pages/AdminPage"
import ClientProfilePage from "./pages/ClienteProfilePage"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import { Route,Routes } from "react-router-dom"
import './App.css'
import ABMCategorias from "./pages/ABMCategorias"
import ABMProductos from "./pages/ABMProductos"
import { CartProvider } from "./context/CartProvider"
import Categoria from "./pages/Categoria"
import { CategoriaProvider } from "./context/CategoriaProvider"


const App: React.FC = () => {
  

  return (
    <CartProvider>
      <CategoriaProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/categoria/:nombreCategoria" element={<Categoria />}/>
            <Route
              path="/pedidos"
              element={<AuthenticationGuard component={AdminPage} />}
            />
            <Route
              path="/admin/perfil"
              element={<AuthenticationGuard component={ClientProfilePage} />}
            />
            <Route
              path="/categorias"
              element={<AuthenticationGuard component={ABMCategorias} />}
            />
            <Route
              path="/productos"
              element={<AuthenticationGuard component={ABMProductos} />}
            />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </CategoriaProvider>
    </CartProvider>
  )
}

export default App
