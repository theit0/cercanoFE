
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
import EstadoPedido from "./pages/EstadoPedido"


const App: React.FC = () => {
  return (
    <CartProvider>
      <CategoriaProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/categoria/:nombreCategoria"
            element={
              <>
                <Header />
                <Categoria />
              </>
            }
          />
          {/* Agregar encabezado a rutas específicas */}
          <Route
            path="/pedidos"
            element={
              <>
                <Header />
                <AuthenticationGuard component={AdminPage} />
              </>
            }
          />
          <Route
            path="/admin/perfil"
            element={
              <>
                <Header />
                <AuthenticationGuard component={ClientProfilePage} />
              </>
            }
          />
          <Route
            path="/categorias"
            element={
              <>
                <Header />
                <AuthenticationGuard component={ABMCategorias} />
              </>
            }
          />
          <Route
            path="/productos"
            element={
              <>
                <Header />
                <AuthenticationGuard component={ABMProductos} />
              </>
            }
          />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="*" element={<ErrorPage />} />
          
          <Route path="/estado-pedido/:id" element={<EstadoPedido />} />
        </Routes>
      </CategoriaProvider>
    </CartProvider>
  );
};

export default App;

