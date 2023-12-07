
import Header from "./components/Header/Header"
import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard"
import CallbackPage from "./components/auth0/CallbackPage"
import AdminPage from "./pages/AdminPage"
import ClientePage from "./pages/ClientePage"
import ClientProfilePage from "./pages/ClienteProfilePage"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import { Route,Routes } from "react-router-dom"

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cliente"
          element={<AuthenticationGuard component={ClientePage} />}
        />
        <Route
          path="/admin"
          element={<AuthenticationGuard component={AdminPage} />}
        />
        <Route
          path="/cliente/perfil"
          element={<AuthenticationGuard component={ClientProfilePage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
