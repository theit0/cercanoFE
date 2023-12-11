
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
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

      <ToastContainer  position="top-right" style={{ marginTop: "80px" }}/>
      
    </>
  )
}

export default App
